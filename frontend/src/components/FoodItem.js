export default function FoodItem({ item, onDelete }) {
  return (
    <div style={{ display:'flex', alignItems:'center', background:'#1c1c21',
                  borderRadius:8, padding:'10px 14px', gap:12, marginBottom:8 }}>
      <span style={{ flex:1, fontSize:14 }}>{item.food_name}</span>
      <span style={{ fontSize:11, background:'#242429', color:'#888892',
                     padding:'2px 8px', borderRadius:4 }}>{item.meal}</span>
      <span style={{ fontWeight:800, fontSize:16, color:'#e8ff47',
                     marginRight:8 }}>{item.calories} kcal</span>
      <button className="btn-ghost" onClick={() => onDelete(item.id)}>✕</button>
    </div>
  );
}