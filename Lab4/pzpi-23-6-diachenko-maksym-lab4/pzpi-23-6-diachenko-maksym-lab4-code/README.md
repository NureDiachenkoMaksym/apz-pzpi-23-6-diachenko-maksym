# Backend scaling demo — Natural Resources Analysis

This folder contains a scalable backend demo for the Natural Resources Analysis Software System.

## Local run

```bash
docker compose up --build --scale api=3
```

Open:

- API through load balancer: http://localhost:8080/health
- API docs: http://localhost:8080/docs

## Load testing

```bash
locust -f locustfile.py --host=http://localhost:8080
```

## Kubernetes demo

The `k8s` directory contains deployment, service and autoscaling manifests.
