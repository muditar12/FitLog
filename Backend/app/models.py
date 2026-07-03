from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base
from datetime import date

class FoodLog(Base):
    __tablename__ = "food_logs"

    id        = Column(Integer, primary_key=True, index=True)
    food_name = Column(String)
    calories  = Column(Float)
    protein   = Column(Float, default=0)
    carbs     = Column(Float, default=0)
    fat       = Column(Float, default=0)
    meal      = Column(String)          # Breakfast / Lunch / Dinner / Snack
    date      = Column(Date, default=date.today)


class WorkoutPlan(Base):
    __tablename__ = "workout_plans"

    id           = Column(Integer, primary_key=True, index=True)
    date         = Column(Date, unique=True, index=True)
    workout_type = Column(String)       # Push Day / Pull Day / Rest etc.