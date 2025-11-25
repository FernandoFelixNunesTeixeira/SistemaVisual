FROM python:3.9-slim
WORKDIR /app
ENV REDIS_HOST=redis
COPY worker.py .
RUN pip install redis requests
CMD ["python", "worker.py"]