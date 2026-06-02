# EcoResource Analytics — final integrated project

EcoResource Analytics is an educational integrated software system for monitoring, validating, analysing and presenting natural resource indicators.

The project combines the results of the previous laboratory works:

- **Lab2**: PostgreSQL database model, REST API, authentication and CRUD endpoints.
- **Lab3**: analytical business logic, admin functions, quality moderation and audit log.
- **Lab4**: IoT client that simulates environmental measurements and sends them to the server.
- **Lab5**: final integrated presentation of the complete system with web dashboard and demo materials.

## Project structure

```text
server/        Node.js + Express REST API, Sequelize models, analytics/admin routes
web_client/    Browser dashboard for users and administrators
iot_client/    Python IoT client simulator that sends measurements to API
database/      PostgreSQL schema and seed data
docker/        Dockerfiles and nginx config
docs/          Architecture, API contract, demo scenario and elevator pitch
k8s/           Kubernetes manifests and HPA example
locust/        Load test scenario
scripts/       Useful PowerShell/curl demo commands
docker-compose.yml
```

## Quick web demo

The web client can be opened independently for video demonstration:

```bash
cd web_client
python -m http.server 8000
```

Open: `http://localhost:8000`.

The web dashboard contains demo data fallback, so it can be presented even without a running backend.

## Full backend launch concept

```bash
docker compose up -d db
cd server
npm install
npm run dev
```

Then API is available at `http://localhost:3000`.

## Main API scenarios

- `POST /api/auth/login` — obtain JWT token.
- `GET /api/regions` — list regions.
- `GET /api/indicators` — list resource indicators.
- `POST /api/measurements` — create measurement.
- `GET /api/measurements` — list/filter measurements.
- `GET /api/analytics/trend` — time series.
- `GET /api/analytics/summary` — aggregated statistics.
- `GET /api/analytics/anomalies` — anomaly detection by z-score.
- `PATCH /api/admin/measurements/:id/quality` — approve/reject measurement.
- `GET /api/admin/audit` — audit log.

## Demo credentials

```text
admin@nure.ua / admin123
analyst@nure.ua / analyst123
operator@nure.ua / operator123
```

## Status

This repository contains an academic final integrated project. Some components are prepared as demonstration-ready modules rather than production services. The important goal of Lab5 is to show the full architecture and how the previous lab results are connected into one system.
