import React from 'react';
export default function Navbar({ portfolio, theme, setTheme, openPdf }) {
  const API = process.env.REACT_APP_API_URL || '';
  if (!portfolio) return null;
  return (
    <nav id="main-nav">
      <div className="nav-logo">Mahi<span className="nav-dot">.</span></div>
      <ul className="nav-links">
        {['about','achievements','skills','projects','certifications','education','contact'].map(s => {
          if (s === 'achievements') {
            return (
              <li key={s}>
                <a href="#about" onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('achievements');
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 100; // offset for navbar
                    window.scrollTo({top: y, behavior: 'smooth'});
                  }
                }}>Achievements</a>
              </li>
            );
          }
          return <li key={s}><a href={`#${s}`}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>;
        })}
      </ul>
      <div className="nav-right">
        <button className="btn-theme" onClick={() => setTheme(t => t==='light'?'dark':'light')}>
          {theme==='light'?'🌙':'☀️'}
        </button>
        <button onClick={() => openPdf(`${API}/pdfs/MyFinalCV.pdf`, 'Mahi Gupta - CV')} className="btn-nav"><i className="fas fa-eye"/> CV</button>
      </div>
    </nav>
  );
}
