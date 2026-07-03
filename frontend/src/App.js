import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar           from './components/Navbar';
import CalorieTracker   from './pages/CalorieTracker';
import WorkoutCalendar  from './pages/WorkoutCalendar';
import ExerciseSearch   from './pages/ExerciseSearch';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<CalorieTracker />} />
        <Route path="/calendar"  element={<WorkoutCalendar />} />
        <Route path="/exercises" element={<ExerciseSearch />} />
      </Routes>
    </BrowserRouter>
  );
}