import axios from 'axios';

const BASE = 'http://localhost:8000';

// ── Food / Calories ──
export const getFood      = (date)        => axios.get(`${BASE}/food/${date}`);
export const addFood      = (data)        => axios.post(`${BASE}/food`, data);
export const deleteFood   = (id)          => axios.delete(`${BASE}/food/${id}`);

// ── Workouts ──
export const getWorkout        = (date)         => axios.get(`${BASE}/workout/${date}`);
export const getMonthWorkouts  = (year, month)  => axios.get(`${BASE}/workout/month/${year}/${month}`);
export const setWorkout        = (data)         => axios.post(`${BASE}/workout`, data);
export const deleteWorkout     = (date)         => axios.delete(`${BASE}/workout/${date}`);