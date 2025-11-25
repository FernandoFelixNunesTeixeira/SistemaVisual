import redis
import requests
import json
import time
from datetime import datetime

# --- Configurações do Redis e API---
REDIS_HOST = "redis"
REDIS_PORT = 6379
STREAM_KEY = "processing_results"
GROUP_NAME = "api_senders"
CONSUMER_NAME = "worker_1"

API_URL = "http://localhost:5000/api/notificacoes"

def connect_redis():
    print("CONECTANDO WORKER")
    r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
    try:

        r.xgroup_create(STREAM_KEY, GROUP_NAME, id="0", mkstream=True)
        print(f"Grupo de consumidores '{GROUP_NAME}' criado.")
    except redis.exceptions.ResponseError as e:
        if "BUSYGROUP" not in str(e):
            raise e
    return r

def calculate_seconds_from_midnight(iso_timestamp):
    try:
        dt = datetime.fromisoformat(iso_timestamp)
        return int(dt.hour * 3600 + dt.minute * 60 + dt.second)
    except (ValueError, TypeError):
        now = datetime.now()
        return int(now.hour * 3600 + now.minute * 60 + now.second)

def format_payload(data):
    iso_ts = data.get("timestamp")
    occurred_at = calculate_seconds_from_midnight(iso_ts)
    porcentagem = str(data.get("porcentagem", "0.0"))
    nome_sala = data.get("sala_nome", data.get("turmas_id", "DESCONHECIDO"))

    return {
        "nome_sala": nome_sala,
        "occurred_at": occurred_at,
        "porcentagem": porcentagem
    }

def process_messages(r):
    print(f"Worker iniciado. Aguardando mensagens no stream '{STREAM_KEY}'...")
    
    while True:
        try:
            # Lê novas mensagens do stream usando consumer group
            # Block=2000: espera até 2 segundos por novas mensagens antes de repetir o loop
            # count=1: pega 1 mensagem por vez
            entries = r.xreadgroup(GROUP_NAME, CONSUMER_NAME, {STREAM_KEY: ">"}, count=1, block=2000)

            if not entries:
                continue

            for stream, messages in entries:
                for message_id, data in messages:
                    print(f"Processando mensagem {message_id}: {data}")
                    
                    try:
                        payload_api = format_payload(data)
                        
                        print(f"Enviando payload para API: {payload_api}")

                        response = requests.post(API_URL, json=payload_api)
                        
                        if response.status_code in [200, 201]:
                            print(f"Sucesso API: {response.status_code}")
                            r.xack(STREAM_KEY, GROUP_NAME, message_id)
                        else:
                            print(f"Erro API: {response.status_code} - {response.text}")
                            # Não recebe ACK aqui, para tentar processar novamente depois 
                            
                    except requests.exceptions.ConnectionError:
                        print(f"Erro de Conexão: Não foi possível conectar a {API_URL}")
                    except Exception as e:
                        print(f"Erro ao processar mensagem individual: {e}")

        except Exception as e:
            print(f"Erro no loop principal do Redis: {e}")
            time.sleep(5)

if __name__ == "__main__":
    redis_conn = connect_redis()
    process_messages(redis_conn)