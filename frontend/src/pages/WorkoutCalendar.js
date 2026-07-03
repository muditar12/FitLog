import { useState, useEffect } from 'react';
import { getMonthWorkouts, setWorkout, deleteWorkout } from '../services/api';
import WorkoutBadge from '../components/WorkoutBadge';

const TYPES = ['Push Day','Pull Day','Leg Day','Full Body','Cardio','Core','Rest Day'];
const COLORS = { 'Push Day':'#ff4a4a','Pull Day':'#4ab8ff','Leg Day':'#ffd740',
                 'Full Body':'#4aff8c','Cardio':'#ff8c42','Core':'#c084fc','Rest Day':'#555' };
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const today = new Date();

export default function WorkoutCalendar() {
  const [year,     setYear]     = useState(today.getFullYear());
  const [month,    setMonth]    = useState(today.getMonth());
  const [data,     setData]     = useState({});   // { 'YYYY-MM-DD': workout_type }
  const [selected, setSelected] = useState(null); // 'YYYY-MM-DD'

  const load = async (y, m) => {
    const res = await getMonthWorkouts(y, m + 1);
    const map = {};
    res.data.forEach(w => { map[w.date] = w.workout_type; });
    setData(map);
  };

  useEffect(() => { load(year, month); }, [year, month]);

  const changeMonth = (dir) => {
    let m = month + dir, y = year;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setMonth(m); setYear(y);
  };

  const handleAssign = async (type) => {
    if (!selected) return;
    await setWorkout({ date: selected, workout_type: type });
    load(year, month);
  };

  const handleRemove = async () => {
    if (!selected) return;
    await deleteWorkout(selected);
    load(year, month);
  };

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel  = new Date(year, month, 1).toLocaleDateString('en-IN', { month:'long', year:'numeric' });

  const formatDate = (d) => {
    const mm = String(month + 1).padStart(2,'0');
    const dd = String(d).padStart(2,'0');
    return `${year}-${mm}-${dd}`;
  };

  const todayStr = today.toISOString().split('T')[0];

  return (
    <div className="page">
      <div className="page-title">Workout Plan</div>
      <div className="page-sub">Plan your week. Stay consistent.</div>

      <div className="card">
        {/* Month nav */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div style={{ fontSize:22, fontWeight:800, textTransform:'uppercase', letterSpacing:1 }}>
            {monthLabel.toUpperCase()}
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {['‹','›'].map((ch, i) => (
              <button key={ch} onClick={() => changeMonth(i === 0 ? -1 : 1)}
                      style={{ background:'var(--bg3)', border:'1px solid var(--border2)', color:'var(--text)',
                               borderRadius:6, width:32, height:32, cursor:'pointer', fontSize:18 }}>{ch}</button>
            ))}
          </div>
        </div>

        {/* Day headers */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4, marginBottom:6 }}>
          {DAY_NAMES.map(d => (
            <div key={d} style={{ textAlign:'center', fontSize:11, color:'var(--muted)',
                                  textTransform:'uppercase', letterSpacing:0.5, padding:'4px 0' }}>{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4 }}>
          {Array(firstDay).fill(null).map((_,i) => <div key={'e'+i}/>)}
          {Array(daysInMonth).fill(null).map((_,i) => {
            const d    = i + 1;
            const key  = formatDate(d);
            const w    = data[key];
            const isToday    = key === todayStr;
            const isSelected = key === selected;
            const color = w ? COLORS[w] : null;
            return (
              <div key={d} onClick={() => setSelected(key)}
                   style={{ aspectRatio:'1', borderRadius:8, background:'var(--bg3)',
                            display:'flex', flexDirection:'column', alignItems:'center',
                            justifyContent:'center', cursor:'pointer', padding:'4px 2px',
                            border: isSelected ? '1px solid #4ab8ff' : isToday ? '1px solid #e8ff47' : '1px solid transparent',
                            transition:'all 0.15s', minHeight:52 }}>
                <div style={{ fontWeight:700, fontSize:16, lineHeight:1 }}>{d}</div>
                {w && <>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:color, marginTop:3 }}/>
                  <div style={{ fontSize:8, color:color, marginTop:2, textAlign:'center',
                                maxWidth:'100%', overflow:'hidden', whiteSpace:'nowrap',
                                textOverflow:'ellipsis', padding:'0 2px' }}>
                    {w.split(' ')[0]}
                  </div>
                </>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Assign panel */}
      <div className="card">
        {!selected
          ? <div style={{ color:'var(--muted)', fontSize:14 }}>← Click a date to plan your workout</div>
          : <>
              <div style={{ fontWeight:800, fontSize:18, marginBottom:12 }}>
                {new Date(selected + 'T00:00:00').toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' })}
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16 }}>
                {TYPES.map(t => (
                  <button key={t} onClick={() => handleAssign(t)}
                          style={{ padding:'6px 16px', borderRadius:20, border:`1px solid ${COLORS[t]}55`,
                                   background: data[selected]===t ? COLORS[t] : COLORS[t]+'22',
                                   color: data[selected]===t ? '#0d0d0f' : COLORS[t],
                                   fontWeight:700, fontSize:13, textTransform:'uppercase',
                                   letterSpacing:0.3, cursor:'pointer' }}>{t}</button>
                ))}
              </div>
              {data[selected] && (
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <WorkoutBadge type={data[selected]} />
                  <span style={{ fontSize:13, color:'var(--muted)' }}>Scheduled ✓</span>
                  <button className="btn-ghost" onClick={handleRemove}>Remove</button>
                </div>
              )}
            </>
        }
      </div>
    </div>
  );
}