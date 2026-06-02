from datetime import date
from statistics import mean
from fastapi import Depends, FastAPI, Query
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from .models import Observation
from .schemas import DashboardSummary, ObservationCreate, ObservationRead

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Natural Resources Analysis API", version="1.0.0")


def seed_if_empty(db: Session):
    if db.query(Observation).count() > 0:
        return
    demo = [
        Observation(resource_type="forest", territory="Харківська область", indicator_name="Лісовий покрив", value=44.8, unit="%", period=date(2025, 4, 10), source="seed", status="verified"),
        Observation(resource_type="water", territory="Харківська область", indicator_name="Індекс забруднення", value=61.4, unit="index", period=date(2025, 4, 12), source="seed", status="verified"),
        Observation(resource_type="soil", territory="Полтавська область", indicator_name="Індекс деградації", value=38.1, unit="index", period=date(2025, 4, 15), source="seed", status="draft"),
        Observation(resource_type="forest", territory="Сумська область", indicator_name="NDVI", value=0.63, unit="ratio", period=date(2025, 4, 18), source="seed", status="verified"),
    ]
    db.add_all(demo)
    db.commit()


@app.get("/health")
def health():
    return {"status": "ok", "service": "natural-resources-api"}


@app.get("/api/observations", response_model=list[ObservationRead])
def list_observations(resource_type: str | None = Query(default=None), db: Session = Depends(get_db)):
    seed_if_empty(db)
    query = db.query(Observation).order_by(Observation.period.desc())
    if resource_type:
        query = query.filter(Observation.resource_type == resource_type)
    return query.limit(200).all()


@app.post("/api/observations", response_model=ObservationRead)
def create_observation(payload: ObservationCreate, db: Session = Depends(get_db)):
    observation = Observation(
        resource_type=payload.resource_type,
        territory=payload.territory,
        indicator_name=payload.indicator_name,
        value=payload.value,
        unit=payload.unit,
        period=payload.period or date.today(),
        source=payload.source,
        latitude=payload.latitude,
        longitude=payload.longitude,
        comment=payload.comment,
        status="draft",
    )
    db.add(observation)
    db.commit()
    db.refresh(observation)
    return observation


@app.get("/api/dashboard/summary", response_model=DashboardSummary)
def dashboard_summary(db: Session = Depends(get_db)):
    seed_if_empty(db)
    observations = db.query(Observation).all()

    def avg(resource_type: str) -> float:
        values = [item.value for item in observations if item.resource_type == resource_type]
        return round(mean(values), 2) if values else 0.0

    forest = avg("forest")
    water = avg("water")
    soil = avg("soil")
    risk = "high" if water > 65 or soil > 50 or forest < 40 else "medium" if water > 55 or forest < 45 else "low"

    return DashboardSummary(
        total_observations=len(observations),
        forest_average=forest,
        water_average=water,
        soil_average=soil,
        risk_level=risk,
    )

