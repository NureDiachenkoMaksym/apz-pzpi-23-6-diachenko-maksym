from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List
import os

app = FastAPI(title="Natural Resources Analysis API", version="1.0")

class Indicator(BaseModel):
    resource_type: str
    territory: str
    period: str
    indicator: str
    value: float
    unit: str

DATA = [
    Indicator(resource_type="forest", territory="Kharkiv region", period="2025", indicator="Forest coverage", value=21.4, unit="%"),
    Indicator(resource_type="water", territory="Kharkiv region", period="2025", indicator="Water quality index", value=72.0, unit="score"),
    Indicator(resource_type="land", territory="Kharkiv region", period="2025", indicator="Erosion risk", value=18.2, unit="%"),
]

@app.get("/health")
def health():
    return {"status": "ok", "instance": os.getenv("HOSTNAME", "local")}

@app.get("/api/resources", response_model=List[Indicator])
def get_resources(resource_type: str | None = Query(default=None)):
    if resource_type:
        return [item for item in DATA if item.resource_type == resource_type]
    return DATA

@app.get("/api/reports/summary")
def summary():
    avg = sum(item.value for item in DATA) / len(DATA)
    return {"items": len(DATA), "average_value": round(avg, 2)}
