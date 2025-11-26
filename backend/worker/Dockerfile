FROM python:3.9-slim
WORKDIR /app
ENV REDIS_HOST=redis
ENV PYTHONUNBUFFERED=1
ENV API_URL=http://flask:5000/api/notificacoes
COPY worker.py .
RUN pip install redis requests
CMD ["python", "worker.py"]