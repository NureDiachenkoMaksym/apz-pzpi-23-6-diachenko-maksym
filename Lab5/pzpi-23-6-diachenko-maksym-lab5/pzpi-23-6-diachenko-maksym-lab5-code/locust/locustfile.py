from locust import HttpUser, task, between

class EcoResourceApiUser(HttpUser):
    wait_time = between(1, 3)
    token = None

    def on_start(self):
        response = self.client.post('/api/auth/login', json={'email': 'admin@nure.ua', 'password': 'admin123'})
        if response.status_code == 200:
            self.token = response.json().get('token')

    @property
    def headers(self):
        return {'Authorization': f'Bearer {self.token}'} if self.token else {}

    @task(3)
    def dashboard(self):
        self.client.get('/api/dashboard', headers=self.headers)

    @task(2)
    def measurements(self):
        self.client.get('/api/measurements?regionId=1', headers=self.headers)

    @task(1)
    def summary(self):
        self.client.get('/api/analytics/summary?indicatorId=2&regionId=1&dateFrom=2025-01-01&dateTo=2026-12-31', headers=self.headers)
