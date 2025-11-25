import redis
import requests
import json
import time

# Configurações do Redis
REDIS_HOST = "localhost"
REDIS_PORT = 6379
STREAM_KEY = "processing_results"
GROUP_NAME = "notification_workers"
CONSUMER_NAME = "worker_1"

# API de destino
API_URL = "http://localhost:5000/api/notificacoes"

def process_messages():
    try:
        r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
        try:
            r.xgroup_create(STREAM_KEY, GROUP_NAME, id="0", mkstream=True)
        except redis.exceptions.ResponseError as e:
            if "BUSYGROUP" not in str(e):
                raise e
    except Exception as e:
        print(f"Erro ao conectar ao Redis: {e}")
        return

    print(f"Worker iniciado. Escutando stream '{STREAM_KEY}'...")

    while True:
        try:
            messages = r.xreadgroup(GROUP_NAME, CONSUMER_NAME, {STREAM_KEY: ">"}, count=1, block=2000)

            if not messages:
                continue

            for stream, entries in messages:
                for message_id, data in entries:
                    print(f"Processando mensagem {message_id}: {data}")

                    try:
                        porcentagem = data.get("porcentagem", "0")
                        nome_sala = data.get("nome_sala", "1")
                        timestamp_redis = data.get("timestamp")

                        payload = {
                            "id": message_id,  
                            "occurred_at": timestamp_redis if timestamp_redis else None, #
                            "porcentagem": str(porcentagem),
                            "nome_sala": str(nome_sala)
                        }

                        # Envia para a API
                        response = requests.post(API_URL, json=payload)

                        if response.status_code == 200 or response.status_code == 201:
                            print(f"Sucesso: {response.status_code} - {response.text}")
                            # Confirma processamento no Redis (ACK)
                            r.xack(STREAM_KEY, GROUP_NAME, message_id)
                        else:
                            print(f"Falha na API: {response.status_code} - {response.text}")

                    except Exception as api_error:
                        print(f"Erro ao enviar para API: {api_error}")
                        # Não damos ACK aqui para tentar processar novamente depois ou mover para Dead Letter Queue

        except Exception as e:
            print(f"Erro no loop do worker: {e}")
            time.sleep(5)  # Espera um pouco antes de tentar reconectar

if __name__ == "__main__":
    process_messages()