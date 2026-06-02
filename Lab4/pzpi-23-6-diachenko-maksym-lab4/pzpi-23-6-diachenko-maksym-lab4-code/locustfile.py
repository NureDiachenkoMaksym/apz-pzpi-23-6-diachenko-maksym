from locust import HttpUser, task, between

class NaturalResourcesUser(HttpUser):
    wait_time = between(1, 3)

    @task(4)
    def dashboard(self):
        self.client.get("/api/reports/summary?resource=forest&period=2024")

    @task(2)
    def measurements(self):
        self.client.get("/api/measurements?territory=kharkiv&page=1")

    @task(1)
    def create_measurement(self):
        self.client.post("/api/measurements", json={
            "resourceType": "water",
            "territoryId": 1,
            "period": "2024-Q2",
            "value": 72.4,
            "source": "demo"
        })
