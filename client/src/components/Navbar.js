import React, { useState } from 'react';
import Magnetic from './Magnetic';

export default function Navbar({ portfolio, theme, setTheme, soundOn, setSoundOn, openPdf }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [translateLoaded, setTranslateLoaded] = useState(false);
  const API = process.env.REACT_APP_API_URL || '';

  React.useEffect(() => {
    if (!translateLoaded && !document.getElementById('g-translate-script')) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        }
      };
      const script = document.createElement('script');
      script.id = 'g-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
      setTranslateLoaded(true);
    }
  }, [translateLoaded]);

  if (!portfolio) return null;
  return (
    <nav id="main-nav">
      <div className="nav-logo">Mahi<span className="nav-dot">.</span></div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        {['about','achievements','skills','projects','certifications','education','contact'].map(s => {
          if (s === 'achievements') {
            return (
              <li key={s}>
                <a href="#about" onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const el = document.getElementById('achievements');
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 100; // offset for navbar
                    window.scrollTo({top: y, behavior: 'smooth'});
                  }
                }}>Achievements</a>
              </li>
            );
          }
          return <li key={s}><a href={`#${s}`} onClick={() => setIsMenuOpen(false)}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>;
        })}
      </ul>
      <div className="nav-right">
        <div id="google_translate_element" className="gt-widget"></div>
        <button className="btn-theme" onClick={() => setSoundOn(!soundOn)} title="Toggle UI Sounds">
          <i className={`fas ${soundOn ? 'fa-volume-up' : 'fa-volume-mute'}`} />
        </button>
        <button className="btn-theme" onClick={() => setTheme(t => t==='light'?'dark':'light')} title="Toggle Theme">
          {theme==='light'?'🌙':'☀️'}
        </button>
        <Magnetic pull={0.25}>
          <button onClick={() => openPdf(`${API}/pdfs/MyFinalCV.pdf`, 'Mahi Gupta - CV')} className="btn-nav"><i className="fas fa-eye"/> CV</button>
        </Magnetic>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"} />
        </button>
      </div>
    </nav>
  );
}
