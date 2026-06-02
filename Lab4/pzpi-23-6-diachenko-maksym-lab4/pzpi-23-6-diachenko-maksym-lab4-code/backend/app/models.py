from sqlalchemy import Column, Date, Float, Integer, String, Text
from .database import Base


class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)
    resource_type = Column(String(32), index=True, nullable=False)
    territory = Column(String(128), index=True, nullable=False)
    indicator_name = Column(String(128), nullable=False)
    value = Column(Float, nullable=False)
    unit = Column(String(32), nullable=False)
    period = Column(Date, nullable=False)
    source = Column(String(128), default="manual")
    status = Column(String(32), default="draft")
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    comment = Column(Text, nullable=True)
