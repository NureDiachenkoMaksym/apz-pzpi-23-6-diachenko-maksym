# Lab4 — Backend Scaling

Навчальний backend для програмної системи аналізу природних ресурсів.

## Склад матеріалів
- `backend/` — FastAPI server;
- `docker-compose.yml` — локальний запуск з Nginx, PostgreSQL, Redis;
- `k8s/` — Kubernetes Deployment, Service та HPA;
- `locust/` — сценарій навантажувального тестування;
- `diagrams/` — ілюстрації масштабування.

## Запуск локально
```bash
docker compose up --build --scale api=3
```

## Навантажувальний тест
```bash
locust -f locust/locustfile.py --host http://localhost:8080
```
