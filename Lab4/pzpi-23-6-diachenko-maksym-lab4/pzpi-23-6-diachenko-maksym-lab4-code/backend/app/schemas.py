from datetime import date
from pydantic import BaseModel, Field


class ObservationCreate(BaseModel):
    resource_type: str = Field(min_length=2, max_length=32)
    territory: str = Field(min_length=2, max_length=128)
    indicator_name: str = Field(min_length=2, max_length=128)
    value: float
    unit: str = Field(min_length=1, max_length=32)
    period: date | None = None
    source: str = "manual"
    latitude: float | None = None
    longitude: float | None = None
    comment: str | None = None


class ObservationRead(BaseModel):
    id: int
    resource_type: str
    territory: str
    indicator_name: str
    value: float
    unit: str
    period: date
    source: str
    status: str
    latitude: float | None
    longitude: float | None
    comment: str | None

    class Config:
        from_attributes = True


class DashboardSummary(BaseModel):
    total_observations: int
    forest_average: float
    water_average: float
    soil_average: float
    risk_level: str

