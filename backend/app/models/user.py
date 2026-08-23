from sqlalchemy import Column, String, Integer, Float, Boolean, JSON, DateTime
import datetime
from app.database import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    education_level = Column(String)
    current_year = Column(String)
    country = Column(String)
    phone = Column(String, nullable=True)
    domain_id = Column(String, default="comp-sci")
    career_id = Column(String, default="fullstack-dev")
    career_title = Column(String, default="Full Stack Developer")
    current_stage = Column(Integer, default=2)
    overall_progress = Column(Integer, default=72)
    total_hours_learned = Column(Integer, default=148)
    current_streak_days = Column(Integer, default=14)
    xp_points = Column(Integer, default=2450)
    semester_name = Column(String, default="Fall Semester 2026")
    semester_start_date = Column(String, default="2026-08-01")
    semester_end_date = Column(String, default="2026-12-15")
    available_hours_per_day = Column(Float, default=3.0)
    available_days_per_week = Column(Integer, default=6)
    skill_level = Column(String, default="Intermediate")
    
    # Complex JSON blobs
    riasec_result = Column(JSON, nullable=True)
    notifications = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class KeyValueStoreModel(Base):
    __tablename__ = "kv_store"

    key = Column(String, primary_key=True, index=True)
    value = Column(JSON, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
