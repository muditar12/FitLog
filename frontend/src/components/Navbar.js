import { NavLink } from 'react-router-dom';

const styles = {
  nav: { display:'flex', alignItems:'center', gap:0, background:'#141417',
         borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'0 24px',
         height:56, position:'sticky', top:0, zIndex:100 },
  logo: { fontWeight:800, fontSize:22, color:'#e8ff47', letterSpacing:1,
          marginRight:32, textDecoration:'none' },
  link: { fontWeight:700, fontSize:13, textTransform:'uppercase', letterSpacing:0.5,
          padding:'8px 16px', borderRadius:6, textDecoration:'none',
          color:'#888892', transition:'all 0.15s' },
};

export default function Navbar() {
  const active = { background:'#e8ff47', color:'#0d0d0f' };
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>FITFORGE</span>
      <NavLink to="/"         style={({isActive}) => ({...styles.link, ...(isActive ? active : {})})} end>🔥 Calories</NavLink>
      <NavLink to="/calendar" style={({isActive}) => ({...styles.link, ...(isActive ? active : {})})}>📅 Workout Plan</NavLink>
      <NavLink to="/exercises"style={({isActive}) => ({...styles.link, ...(isActive ? active : {})})}>🔍 Exercises</NavLink>
    </nav>
  );
}