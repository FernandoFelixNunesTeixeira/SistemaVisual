import time
import redis
import os
import json

class RedisEventBus:
    def __init__(self, url: str = None, channel: str = "notificacoes"):
        self._channel = channel
        redis_host = url or os.getenv('REDIS_HOST', 'redis')
        self._redis = redis.Redis(host=redis_host, port=6379, decode_responses=True)

    def publish(self, message):
        if isinstance(message, dict):
            message = json.dumps(message)

        self._redis.publish(self._channel, message)

    def subscribe(self):
        pubsub = self._redis.pubsub()
        pubsub.subscribe(self._channel)

        while True:
            message = pubsub.get_message()  
            if message and message.get("type") == "message":
                yield message.get("data")
            time.sleep(0.1) 
