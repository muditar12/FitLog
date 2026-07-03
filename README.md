# FitForge

FitForge is a full-stack fitness tracking application that helps users monitor daily nutrition, plan workout routines, and explore exercises through a searchable library. It was built as a learning project using a Python backend, React frontend, and SQLite database.

## Features

- **Calorie Tracker** – Log meals, track daily calorie intake, and monitor protein, carbohydrates, and fat against a personalized daily goal.
- **Workout Calendar** – Schedule workouts on a monthly calendar with color-coded workout types including Push, Pull, Legs, Cardio, Full Body, Core, and Rest Day.
- **Exercise Library** – Search exercises by name, muscle group, or equipment, with form instructions and direct links to YouTube tutorials.

## Tech Stack

**Backend**
- Python
- FastAPI
- SQLAlchemy
- SQLite

**Frontend**
- React
- React Router
- Axios

## Project Structure

```text
fitforge/
├── backend/
│   ├── app/
│   ├── run.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # macOS/Linux
# venv\Scripts\activate       # Windows
pip install -r requirements.txt
python run.py
```

### Frontend

```bash
cd frontend
npm install
npm start
```

The backend runs on `http://localhost:8000` and the frontend on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/food/{date}` | Retrieve food entries |
| POST | `/food` | Add a food entry |
| DELETE | `/food/{id}` | Delete a food entry |
| GET | `/workout/{date}` | Retrieve workout for a date |
| GET | `/workout/month/{year}/{month}` | Retrieve monthly workout schedule |
| POST | `/workout` | Create or update a workout |
| DELETE | `/workout/{date}` | Delete a workout |

## License

This project was developed for educational and portfolio purposes.
