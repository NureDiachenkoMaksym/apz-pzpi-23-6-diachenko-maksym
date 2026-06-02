# Architecture overview

EcoResource Analytics is built as an integrated client-server system.

## Logical components

1. **Web client**: dashboard, filters, role switching and visual analytics.
2. **REST API server**: authentication, resource dictionaries, measurements, analytics and administration.
3. **PostgreSQL database**: normalized storage of users, roles, regions, indicators, measurements, import jobs and audit logs.
4. **IoT client**: virtual sensor that sends measurements to the REST API.
5. **Admin module**: user management, quality moderation and audit log.
6. **Analytics module**: trend, summary, region comparison and anomaly detection.
7. **Infrastructure**: Docker Compose for local launch; Kubernetes/HPA example for scaling.

## Data flow

IoT client -> API authentication -> POST /api/measurements -> database -> admin quality moderation -> analytics endpoints -> web dashboard.
