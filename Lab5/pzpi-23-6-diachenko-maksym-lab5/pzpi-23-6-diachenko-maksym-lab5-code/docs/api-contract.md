# API contract

| Method | Path | Purpose | Access |
|---|---|---|---|
| GET | /health | Health check | Public |
| POST | /api/auth/login | JWT authentication | Public |
| GET | /api/regions | Region dictionary | Authorized |
| GET | /api/indicators | Indicator dictionary | Authorized |
| GET | /api/measurements | List and filter measurements | Authorized |
| POST | /api/measurements | Create measurement | Authorized |
| GET | /api/analytics/trend | Time series | Authorized |
| GET | /api/analytics/summary | Aggregated statistics | Authorized |
| GET | /api/analytics/anomalies | Z-score anomaly detection | Authorized |
| GET | /api/admin/users | User management view | Admin |
| PATCH | /api/admin/measurements/:id/quality | Approve/reject measurement | Admin |
| GET | /api/admin/audit | Audit log | Admin |
| POST | /api/admin/backup | Create backup metadata | Admin |
