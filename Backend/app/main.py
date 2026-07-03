from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date
from . import models
from .database import engine, get_db
from pydantic import BaseModel
from typing import Optional

# Create all tables in the database on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow React (running on port 3000) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Pydantic schemas (what the API expects to receive) ──

class FoodIn(BaseModel):
    food_name: str
    calories:  float
    protein:   Optional[float] = 0
    carbs:     Optional[float] = 0
    fat:       Optional[float] = 0
    meal:      str
    date:      Optional[date] = None

class WorkoutIn(BaseModel):
    date:         date
    workout_type: str


# ── CALORIE ROUTES ──

@app.get("/food/{log_date}")
def get_food_log(log_date: date, db: Session = Depends(get_db)):
    """Get all food entries for a given date"""
    return db.query(models.FoodLog).filter(models.FoodLog.date == log_date).all()

@app.post("/food")
def add_food(food: FoodIn, db: Session = Depends(get_db)):
    """Add a new food entry"""
    entry = models.FoodLog(
        food_name = food.food_name,
        calories  = food.calories,
        protein   = food.protein,
        carbs     = food.carbs,
        fat       = food.fat,
        meal      = food.meal,
        date      = food.date or date.today()
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

@app.delete("/food/{food_id}")
def delete_food(food_id: int, db: Session = Depends(get_db)):
    """Delete a food entry by ID"""
    entry = db.query(models.FoodLog).filter(models.FoodLog.id == food_id).first()
    if entry:
        db.delete(entry)
        db.commit()
    return {"ok": True}


# ── WORKOUT ROUTES ──

@app.get("/workout/{plan_date}")
def get_workout(plan_date: date, db: Session = Depends(get_db)):
    """Get workout plan for a given date"""
    return db.query(models.WorkoutPlan).filter(models.WorkoutPlan.date == plan_date).first()

@app.get("/workout/month/{year}/{month}")
def get_month_workouts(year: int, month: int, db: Session = Depends(get_db)):
    """Get all workout plans for a given month"""
    from sqlalchemy import extract
    return db.query(models.WorkoutPlan).filter(
        extract("year",  models.WorkoutPlan.date) == year,
        extract("month", models.WorkoutPlan.date) == month
    ).all()

@app.post("/workout")
def set_workout(workout: WorkoutIn, db: Session = Depends(get_db)):
    """Add or update a workout for a date"""
    existing = db.query(models.WorkoutPlan).filter(models.WorkoutPlan.date == workout.date).first()
    if existing:
        existing.workout_type = workout.workout_type
        db.commit()
        db.refresh(existing)
        return existing
    entry = models.WorkoutPlan(date=workout.date, workout_type=workout.workout_type)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

@app.delete("/workout/{plan_date}")
def delete_workout(plan_date: date, db: Session = Depends(get_db)):
    """Remove a workout from a date"""
    entry = db.query(models.WorkoutPlan).filter(models.WorkoutPlan.date == plan_date).first()
    if entry:
        db.delete(entry)
        db.commit()
    return {"ok": True}