const COLORS = {
  'Push Day':'#ff4a4a', 'Pull Day':'#4ab8ff', 'Leg Day':'#ffd740',
  'Full Body':'#4aff8c', 'Cardio':'#ff8c42', 'Core':'#c084fc', 'Rest Day':'#555'
};

export default function WorkoutBadge({ type }) {
  const color = COLORS[type] || '#aaa';
  return (
    <span style={{ padding:'4px 12px', borderRadius:20, fontSize:13,
                   fontWeight:700, textTransform:'uppercase', letterSpacing:0.3,
                   background: color + '22', color, border:`1px solid ${color}55` }}>
      {type}
    </span>
  );
}