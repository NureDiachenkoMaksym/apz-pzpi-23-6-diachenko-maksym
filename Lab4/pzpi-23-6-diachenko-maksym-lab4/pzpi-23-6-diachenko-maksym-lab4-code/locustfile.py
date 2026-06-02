from locust import HttpUser, between, task


class NaturalResourcesUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def health(self):
        self.client.get("/health")

    @task(5)
    def dashboard(self):
        self.client.get("/api/dashboard/summary")

    @task(4)
    def observations(self):
        self.client.get("/api/observations")

    @task(1)
    def create_observation(self):
        self.client.post("/api/observations", json={
            "resource_type": "forest",
            "territory": "Тестова область",
            "indicator_name": "NDVI",
            "value": 0.57,
            "unit": "ratio",
            "source": "locust"
        })

