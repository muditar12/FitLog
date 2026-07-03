import { useState, useEffect } from 'react';
import { getFood, addFood, deleteFood } from '../services/api';
import FoodItem from '../components/FoodItem';

const today = () => new Date().toISOString().split('T')[0];

const QUICK = [
  { food_name:'Banana',         calories:89,  protein:1,  carbs:23, fat:0,  meal:'Breakfast' },
  { food_name:'Egg',            calories:78,  protein:6,  carbs:0,  fat:5,  meal:'Breakfast' },
  { food_name:'Rice (1 cup)',   calories:206, protein:4,  carbs:45, fat:0,  meal:'Lunch'     },
  { food_name:'Chicken breast', calories:165, protein:31, carbs:0,  fat:4,  meal:'Lunch'     },
  { food_name:'Roti',           calories:100, protein:3,  carbs:20, fat:1,  meal:'Lunch'     },
  { food_name:'Dal (1 cup)',    calories:230, protein:15, carbs:40, fat:3,  meal:'Lunch'     },
  { food_name:'Paneer (50g)',   calories:133, protein:9,  carbs:0,  fat:11, meal:'Dinner'    },
  { food_name:'Almonds (10)',   calories:69,  protein:2,  carbs:2,  fat:6,  meal:'Snack'     },
];

export default function CalorieTracker() {
  const [log,    setLog]    = useState([]);
  const [date,   setDate]   = useState(today());
  const [goal,   setGoal]   = useState(2000);
  const [form,   setForm]   = useState({ food_name:'', calories:'', meal:'Breakfast' });

  const load = async (d) => {
    const res = await getFood(d);
    setLog(res.data);
  };

  useEffect(() => { load(date); }, [date]);

  const handleAdd = async () => {
    if (!form.food_name || !form.calories) return;
    await addFood({ ...form, calories: parseFloat(form.calories), date });
    setForm({ food_name:'', calories:'', meal:'Breakfast' });
    load(date);
  };

  const handleDelete = async (id) => {
    await deleteFood(id);
    load(date);
  };

  const handleQuick = async (item) => {
    await addFood({ ...item, date });
    load(date);
  };

  const consumed = log.reduce((s, f) => s + f.calories, 0);
  const remaining = Math.max(0, goal - consumed);
  const protein = log.reduce((s, f) => s + (f.protein || 0), 0);
  const carbs   = log.reduce((s, f) => s + (f.carbs   || 0), 0);
  const fat     = log.reduce((s, f) => s + (f.fat     || 0), 0);
  const pct = Math.min(100, (consumed / goal) * 100);

  return (
    <div className="page">
      <div className="page-title">Calorie Tracker</div>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <span style={{ color:'var(--muted)', fontSize:14 }}>Goal:</span>
        <input type="number" value={goal} onChange={e => setGoal(+e.target.value)}
               style={{ width:90 }} />
        <span style={{ color:'var(--muted)', fontSize:14 }}>kcal</span>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:16 }}>
        {[['Consumed', consumed, '#e8ff47'], ['Remaining', remaining, '#4aff8c'], ['Goal', goal, '#4ab8ff']].map(([l,v,c]) => (
          <div key={l} className="card" style={{ textAlign:'center', marginBottom:0 }}>
            <div style={{ fontSize:36, fontWeight:800, color:c }}>{Math.round(v)}</div>
            <div style={{ fontSize:12, color:'var(--muted)', textTransform:'uppercase', letterSpacing:0.5 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="card" style={{ marginBottom:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:13, color:'var(--muted)' }}>
          <span>Daily Progress</span><span>{Math.round(pct)}%</span>
        </div>
        <div style={{ height:8, background:'var(--bg3)', borderRadius:4, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${pct}%`, background: pct>=100 ? '#ff4a4a' : '#e8ff47',
                        borderRadius:4, transition:'width 0.4s' }}/>
        </div>

        {/* Macros */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginTop:16 }}>
          {[['Protein', protein, 50, '#4ab8ff'], ['Carbs', carbs, 200, '#ff8c42'], ['Fat', fat, 65, '#ff4a4a']].map(([l,v,max,c]) => (
            <div key={l}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:4 }}>
                <span>{l}</span><span style={{ color:c }}>{Math.round(v)}g</span>
              </div>
              <div style={{ height:5, background:'var(--bg3)', borderRadius:3, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${Math.min(100,(v/max)*100)}%`,
                              background:c, borderRadius:3 }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add food */}
      <div className="card">
        <div style={{ color:'var(--muted)', fontSize:13, textTransform:'uppercase',
                      letterSpacing:0.5, marginBottom:12 }}>Log Food</div>
        <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
          <input placeholder="Food name" value={form.food_name}
                 onChange={e => setForm({...form, food_name:e.target.value})} style={{ flex:2, minWidth:140 }}/>
          <input placeholder="kcal" type="number" value={form.calories}
                 onChange={e => setForm({...form, calories:e.target.value})} style={{ flex:1, minWidth:70 }}/>
          <select value={form.meal} onChange={e => setForm({...form, meal:e.target.value})}>
            {['Breakfast','Lunch','Dinner','Snack'].map(m => <option key={m}>{m}</option>)}
          </select>
          <button className="btn" onClick={handleAdd}>+ Add</button>
        </div>

        {/* Quick add */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16 }}>
          <span style={{ fontSize:12, color:'var(--muted)', alignSelf:'center' }}>Quick:</span>
          {QUICK.map(q => (
            <button key={q.food_name} onClick={() => handleQuick(q)}
                    style={{ padding:'5px 12px', borderRadius:20, border:'1px solid var(--border2)',
                             background:'var(--bg3)', color:'var(--muted)', fontSize:13,
                             cursor:'pointer', fontWeight:600 }}>
              {q.food_name} <span style={{ color:'var(--accent)' }}>{q.calories}</span>
            </button>
          ))}
        </div>

        {log.length === 0
          ? <div style={{ textAlign:'center', padding:24, color:'var(--muted)' }}>No food logged yet.</div>
          : log.map(item => <FoodItem key={item.id} item={item} onDelete={handleDelete} />)
        }
      </div>
    </div>
  );
}