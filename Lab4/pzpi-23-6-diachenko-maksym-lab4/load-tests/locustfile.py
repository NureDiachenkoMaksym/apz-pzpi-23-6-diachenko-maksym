from locust import HttpUser, task, between

class NaturalResourcesUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def get_resources(self):
        self.client.get('/api/resources')

    @task(1)
    def health(self):
        self.client.get('/health')
