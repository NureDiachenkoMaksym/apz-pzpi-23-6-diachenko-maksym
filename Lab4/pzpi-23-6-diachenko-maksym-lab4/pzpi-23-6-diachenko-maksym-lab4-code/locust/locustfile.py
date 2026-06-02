from locust import HttpUser, task, between

class NaturalResourcesUser(HttpUser):
    wait_time = between(0.5, 2.0)

    @task(4)
    def open_resources(self):
        self.client.get("/api/resources")

    @task(2)
    def filter_forest(self):
        self.client.get("/api/resources?resource_type=forest")

    @task(1)
    def summary_report(self):
        self.client.get("/api/reports/summary")

    @task(1)
    def health(self):
        self.client.get("/health")
