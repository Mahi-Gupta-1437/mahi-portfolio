import React from 'react';
export default function Navbar({ portfolio, theme, setTheme, openPdf }) {
  const API = process.env.REACT_APP_API_URL || '';
  if (!portfolio) return null;
  return (
    <nav id="main-nav">
      <div className="nav-logo">Mahi<span className="nav-dot">.</span></div>
      <ul className="nav-links">
        {['about','skills','projects','certifications','education','documents','contact'].map(s => {
            const isCertifications = s === 'certifications';
            return (
              <React.Fragment key={s}>
                <li><a href={`#${s}`}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
                {isCertifications && <li><a href="#about" onClick={() => document.querySelector('.achievement-mini').scrollIntoView({behavior: 'smooth'})}>Achievements</a></li>}
              </React.Fragment>
            )
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
