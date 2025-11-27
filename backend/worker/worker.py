import redis
import requests
import json
import time
from datetime import datetime
import os

# --- Configurações ---
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
STREAM_KEY = "processing_results"
GROUP_NAME = "api_senders"
CONSUMER_NAME = os.getenv("HOSTNAME", "worker_1") 
API_URL = os.getenv("API_URL", "http://localhost:5000/api/notificacoes")

def connect_redis():
    print(f"--- WORKER INICIADO ---")
    print(f"Redis: {REDIS_HOST}:{REDIS_PORT}")
    print(f"API Alvo: {API_URL}")
    
    r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
    try:
        # id="0" processa todo o histórico se o grupo for novo
        r.xgroup_create(STREAM_KEY, GROUP_NAME, id="0", mkstream=True)
        print(f"Grupo '{GROUP_NAME}' verificado/criado.")
    except redis.exceptions.ResponseError as e:
        if "BUSYGROUP" not in str(e):
            raise e
    return r

def get_unix_timestamp(iso_timestamp):
    try:
        dt = datetime.fromisoformat(iso_timestamp)
        return int(dt.timestamp())
    except (ValueError, TypeError):
        return int(datetime.now().timestamp())

def format_payload(data):
    iso_ts = data.get("timestamp")
    occurred_at = get_unix_timestamp(iso_ts)
    porcentagem = str(data.get("porcentagem", "0.0"))
    nome_sala = data.get("sala_nome", data.get("turmas_id", "DESCONHECIDO"))

    return {
        "nome_sala": nome_sala,
        "occurred_at": occurred_at,
        "porcentagem": porcentagem
    }

def send_to_api(r, message_id, data):
    try:
        payload = format_payload(data)
        print(f"Tentando enviar msg {message_id} para API...")

        response = requests.post(API_URL, json=payload, timeout=5) 
        
        if response.status_code in [200, 201]:
            print(f"Sucesso API ({response.status_code}). Mensagem confirmada.")
            r.xack(STREAM_KEY, GROUP_NAME, message_id)
            return True
        else:
            print(f"Erro API ({response.status_code}): {response.text}")
            return False

    except requests.exceptions.ConnectionError:
        print(f"Falha de Conexão API esta indisponível em {API_URL}")
        return False
    except Exception as e:
        print(f"Erro inesperado ao processar: {e}")

        return False

def process_messages(r):
    print(f"Aguardando mensagens no stream '{STREAM_KEY}'...")
    
    while True:
        try:
            pending = r.xreadgroup(GROUP_NAME, CONSUMER_NAME, {STREAM_KEY: "0"}, count=1, block=None)

            if pending:
                for stream, messages in pending:
                    for message_id, data in messages:
                        print(f"🔄 Retentando mensagem pendente: {message_id}")
                        success = send_to_api(r, message_id, data)
                        
                        if not success:
                            print("API parece estar offline. Aguardando 5s antes de tentar novamente...")
                            time.sleep(5)
                            continue 

            entries = r.xreadgroup(GROUP_NAME, CONSUMER_NAME, {STREAM_KEY: ">"}, count=1, block=2000)

            if not entries:
                continue

            for stream, messages in entries:
                for message_id, data in messages:
                    print(f"📥 Nova mensagem recebida: {message_id}")
                    success = send_to_api(r, message_id, data)
                    
                    if not success:
                        print("Falha ao enviar nova mensagem. Mensagem está pendente.")
                        time.sleep(2) 

        except redis.exceptions.ConnectionError:
            print("Erro de conexão com Redis. Tentando reconectar em 5s...")
            time.sleep(5)
        except Exception as e:
            print(f"Erro crítico no loop principal: {e}")
            time.sleep(5)

if __name__ == "__main__":
    time.sleep(3)
    redis_conn = connect_redis()
    process_messages(redis_conn)