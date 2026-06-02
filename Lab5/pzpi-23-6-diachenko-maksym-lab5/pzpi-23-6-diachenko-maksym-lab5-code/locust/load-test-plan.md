# Load test plan

Target: `/api/dashboard`, `/api/measurements`, `/api/analytics/summary`.

Scenario:

- 20 users for smoke test.
- 100 users for academic load demonstration.
- 300 users for scaling comparison with increased API replicas.

Expected result: more API replicas increase sustained throughput and reduce average response time under parallel load.
