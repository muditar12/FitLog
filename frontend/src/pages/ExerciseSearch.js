import { useState } from 'react';

const EXERCISES = [
  { id:1,  name:'Push-Up',          muscle:'chest',     emoji:'💪', level:'Beginner',     equip:'None',           ytq:'push up tutorial form beginners',
    desc:'Classic bodyweight exercise for chest, shoulders and triceps.',
    steps:['Start in plank, hands shoulder-width apart','Lower chest toward the floor','Keep core tight and back flat','Push back up to full extension'] },
  { id:2,  name:'Bench Press',      muscle:'chest',     emoji:'🏋️', level:'Beginner',     equip:'Barbell',        ytq:'bench press form tutorial beginners',
    desc:'Fundamental chest compound movement for upper body mass.',
    steps:['Lie flat, grip bar slightly wider than shoulders','Lower bar to mid-chest with control','Pause briefly at the bottom','Press bar up explosively to full extension'] },
  { id:3,  name:'Dumbbell Flye',    muscle:'chest',     emoji:'🤲', level:'Intermediate', equip:'Dumbbell',       ytq:'dumbbell flye chest tutorial',
    desc:'Isolation movement that stretches the chest for deep contraction.',
    steps:['Lie on bench, dumbbells above chest','Open arms wide in arc motion','Feel the stretch at the bottom','Bring dumbbells back in a hugging motion'] },
  { id:4,  name:'Pull-Up',          muscle:'back',      emoji:'🧗', level:'Beginner',     equip:'Pull-up Bar',    ytq:'pull up form tutorial beginners',
    desc:'King of back exercises — builds lat width and pulling strength.',
    steps:['Hang with overhand grip, hands shoulder-width','Engage lats, pull elbows toward hips','Bring chin above the bar','Lower slowly to full hang'] },
  { id:5,  name:'Bent-Over Row',    muscle:'back',      emoji:'🚣', level:'Beginner',     equip:'Barbell',        ytq:'bent over row proper form tutorial',
    desc:'Compound pull that builds thickness in the upper and middle back.',
    steps:['Hinge at hips, back flat and parallel to floor','Grip bar shoulder-width','Pull bar toward lower chest','Lower under control, keep back flat'] },
  { id:6,  name:'Lat Pulldown',     muscle:'back',      emoji:'⬇️', level:'Beginner',     equip:'Cable Machine',  ytq:'lat pulldown proper form tutorial',
    desc:'Great for beginners building lat strength before pull-ups.',
    steps:['Sit at cable machine, wide overhand grip','Lean slightly back','Pull bar to upper chest','Slowly return, feeling lat stretch'] },
  { id:7,  name:'Overhead Press',   muscle:'shoulders', emoji:'🙌', level:'Beginner',     equip:'Barbell',        ytq:'overhead press form tutorial beginners',
    desc:'Foundational shoulder press for building upper body strength.',
    steps:['Stand with bar at shoulder height','Brace core and press bar overhead','Fully lock out arms at the top','Lower bar back to shoulders with control'] },
  { id:8,  name:'Lateral Raise',    muscle:'shoulders', emoji:'↔️', level:'Beginner',     equip:'Dumbbell',       ytq:'lateral raise proper form tutorial',
    desc:'Isolates the side deltoid for wider-looking shoulders.',
    steps:['Stand with dumbbells at sides','Raise arms out to the side until parallel','Lead with elbows, not hands','Lower with control'] },
  { id:9,  name:'Bicep Curl',       muscle:'biceps',    emoji:'💪', level:'Beginner',     equip:'Dumbbell',       ytq:'bicep curl proper form tutorial',
    desc:'Classic bicep builder for arm size and peak.',
    steps:['Stand with dumbbells, palms forward','Keep upper arms pinned to sides','Curl weight up contracting bicep','Slowly lower back down'] },
  { id:10, name:'Hammer Curl',      muscle:'biceps',    emoji:'🔨', level:'Beginner',     equip:'Dumbbell',       ytq:'hammer curl form tutorial',
    desc:'Neutral grip variation that builds brachialis for thicker arms.',
    steps:['Hold dumbbells neutral grip','Keep elbows stationary at sides','Curl both weights up','Squeeze at top, lower under control'] },
  { id:11, name:'Tricep Dip',       muscle:'triceps',   emoji:'⬇️', level:'Beginner',     equip:'Parallel Bars',  ytq:'tricep dip proper form tutorial',
    desc:'Bodyweight compound for building tricep size and strength.',
    steps:['Grip parallel bars, arms extended','Lean slightly forward','Lower until upper arms parallel to floor','Push back up, squeeze triceps at top'] },
  { id:12, name:'Skull Crusher',    muscle:'triceps',   emoji:'💀', level:'Intermediate', equip:'Barbell',        ytq:'skull crusher exercise tutorial form',
    desc:'Isolation move for long head tricep mass.',
    steps:['Lie on bench, narrow grip','Lower bar toward forehead, bending elbows only','Keep upper arms perpendicular to floor','Extend arms back, contracting triceps'] },
  { id:13, name:'Squat',            muscle:'legs',      emoji:'🦵', level:'Beginner',     equip:'Barbell',        ytq:'squat proper form tutorial beginners',
    desc:'King of leg exercises — most important movement in fitness.',
    steps:['Bar on upper traps, feet shoulder-width','Brace core, sit back and down','Descend until thighs parallel to floor','Drive through heels to stand, chest tall'] },
  { id:14, name:'Lunges',           muscle:'legs',      emoji:'🚶', level:'Beginner',     equip:'None',           ytq:'lunge exercise proper form tutorial',
    desc:'Unilateral leg exercise that improves balance and strength.',
    steps:['Stand tall, step one foot forward','Lower back knee toward the floor','Both knees at roughly 90 degrees','Push through front heel to stand, alternate legs'] },
  { id:15, name:'Romanian Deadlift',muscle:'legs',      emoji:'🏋️', level:'Intermediate', equip:'Barbell',        ytq:'romanian deadlift RDL form tutorial',
    desc:'Hip hinge movement that hammers hamstrings and glutes.',
    steps:['Stand holding bar at hip height, soft knee bend','Hinge at hips, sending them back','Feel deep hamstring stretch, bar close to legs','Drive hips forward, squeeze glutes'] },
  { id:16, name:'Plank',            muscle:'core',      emoji:'📐', level:'Beginner',     equip:'None',           ytq:'plank exercise tutorial beginners form',
    desc:'Foundational isometric exercise for core stability.',
    steps:['Get into forearm plank position','Keep body straight head to heels','Squeeze glutes and brace abs','Hold, breathing normally'] },
  { id:17, name:'Crunch',           muscle:'core',      emoji:'🌀', level:'Beginner',     equip:'None',           ytq:'crunch exercise proper form tutorial',
    desc:'Targets upper abs for core definition.',
    steps:['Lie on back, knees bent, hands behind head','Curl shoulders off floor using abs — not neck','Bring ribcage toward pelvis','Lower with control, keep tension on abs'] },
  { id:18, name:'Mountain Climber', muscle:'core',      emoji:'⛰️', level:'Beginner',     equip:'None',           ytq:'mountain climbers exercise tutorial',
    desc:'Dynamic core exercise that also elevates heart rate.',
    steps:['Start in high plank, wrists under shoulders','Drive one knee toward chest','Quickly switch legs','Keep hips level, move at a challenging pace'] },
  { id:19, name:'Jumping Jacks',    muscle:'cardio',    emoji:'⚡', level:'Beginner',     equip:'None',           ytq:'jumping jacks exercise tutorial',
    desc:'Full-body cardio movement that gets heart rate up fast.',
    steps:['Stand with feet together, arms at sides','Jump feet out while raising arms overhead','Jump feet back together while lowering arms','Land softly and maintain rhythm'] },
  { id:20, name:'Burpee',           muscle:'cardio',    emoji:'🔥', level:'Intermediate', equip:'None',           ytq:'burpee exercise proper form tutorial',
    desc:'Ultimate full-body cardio — strength and conditioning in one.',
    steps:['Stand tall, drop into squat and place hands on floor','Jump feet back into push-up position','Perform a push-up (optional)','Jump feet to hands, explode upward with arms overhead'] },
  { id:21, name:'High Knees',       muscle:'cardio',    emoji:'🏃', level:'Beginner',     equip:'None',           ytq:'high knees exercise tutorial cardio',
    desc:'Running in place with high knee drive — great warm-up.',
    steps:['Stand feet hip-width apart','Drive one knee to hip height, pump opposite arm','Quickly switch legs','Stay on balls of feet, keep upright posture'] },
];

const MUSCLES = ['all','chest','back','shoulders','biceps','triceps','legs','core','cardio'];
const BG_COLORS = { chest:'#1e3a5f', back:'#1a3a2a', shoulders:'#3a1a2a', biceps:'#2a1a3a',
                    triceps:'#3a2a1a', legs:'#3a3a1a', core:'#1a3a3a', cardio:'#3a1a1a' };

export default function ExerciseSearch() {
  const [query,  setQuery]  = useState('');
  const [muscle, setMuscle] = useState('all');
  const [modal,  setModal]  = useState(null);

  const filtered = EXERCISES.filter(e => {
    const mMatch = muscle === 'all' || e.muscle === muscle;
    const q = query.toLowerCase();
    const tMatch = !q || e.name.toLowerCase().includes(q) || e.muscle.includes(q)
                      || e.level.toLowerCase().includes(q) || e.equip.toLowerCase().includes(q);
    return mMatch && tMatch;
  });

  return (
    <div className="page">
      <div className="page-title">Exercise Library</div>
      <div className="page-sub">Search by muscle group, equipment, or exercise name</div>

      {/* Search */}
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        <input placeholder="Search exercises..." value={query}
               onChange={e => setQuery(e.target.value)} style={{ flex:1 }}/>
      </div>

      {/* Muscle filters */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
        {MUSCLES.map(m => (
          <button key={m} onClick={() => setMuscle(m)}
                  style={{ padding:'5px 14px', borderRadius:20, fontSize:13, fontWeight:700,
                           textTransform:'uppercase', letterSpacing:0.3, cursor:'pointer',
                           border:'1px solid var(--border2)',
                           background: muscle===m ? '#e8ff47' : 'var(--bg3)',
                           color:       muscle===m ? '#0d0d0f' : 'var(--muted)' }}>{m}</button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0
        ? <div style={{ textAlign:'center', padding:40, color:'var(--muted)' }}>No exercises found.</div>
        : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))', gap:14 }}>
            {filtered.map(e => (
              <div key={e.id} onClick={() => setModal(e)}
                   style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12,
                            overflow:'hidden', cursor:'pointer', transition:'transform 0.15s, border-color 0.15s' }}
                   onMouseEnter={el => el.currentTarget.style.transform='translateY(-2px)'}
                   onMouseLeave={el => el.currentTarget.style.transform='translateY(0)'}>
                <div style={{ height:120, background: BG_COLORS[e.muscle] || '#1a1a2a',
                              display:'flex', alignItems:'center', justifyContent:'center',
                              fontSize:48, position:'relative' }}>
                  {e.emoji}
                  <span style={{ position:'absolute', top:10, right:10, fontSize:10, fontWeight:700,
                                 textTransform:'uppercase', padding:'3px 8px', borderRadius:4,
                                 background:'rgba(0,0,0,0.5)', color:'#e8ff47',
                                 border:'1px solid rgba(232,255,71,0.3)' }}>{e.muscle}</span>
                </div>
                <div style={{ padding:14 }}>
                  <div style={{ fontWeight:800, fontSize:18, marginBottom:4 }}>{e.name}</div>
                  <div style={{ fontSize:13, color:'var(--muted)', marginBottom:8 }}>{e.desc.slice(0,60)}...</div>
                  <div style={{ display:'flex', gap:6 }}>
                    <span className="tag">{e.level}</span>
                    <span className="tag">{e.equip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }

      {/* Modal */}
      {modal && (
        <div onClick={() => setModal(null)}
             style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:200,
                      display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div onClick={e => e.stopPropagation()}
               style={{ background:'var(--bg2)', border:'1px solid var(--border2)', borderRadius:16,
                        width:'100%', maxWidth:580, overflow:'hidden' }}>
            <div style={{ height:160, background: BG_COLORS[modal.muscle] || '#1a1a2a',
                          display:'flex', alignItems:'center', justifyContent:'center', fontSize:72 }}>
              {modal.emoji}
            </div>
            <div style={{ padding:20 }}>
              <div style={{ fontWeight:800, fontSize:24, marginBottom:6 }}>{modal.name}</div>
              <div style={{ fontSize:14, color:'var(--muted)', lineHeight:1.6, marginBottom:16 }}>{modal.desc}</div>
              <ol style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                {modal.steps.map((s,i) => (
                  <li key={i} style={{ display:'flex', gap:10, fontSize:14, lineHeight:1.5 }}>
                    <span style={{ fontWeight:800, fontSize:16, color:'#e8ff47', minWidth:20 }}>{i+1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                          padding:'14px 20px', borderTop:'1px solid var(--border)' }}>
              <div style={{ display:'flex', gap:16 }}>
                {[['Muscle', modal.muscle],['Level', modal.level],['Equip', modal.equip]].map(([l,v]) => (
                  <div key={l} style={{ fontSize:13, color:'var(--muted)' }}>
                    {l}: <span style={{ color:'var(--text)', fontWeight:600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button className="btn" onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(modal.ytq)}`,'_blank')}>
                  ▶ Watch
                </button>
                <button className="btn-ghost" onClick={() => setModal(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}