import React, { useState } from 'react';
import Magnetic from './Magnetic';

export default function Navbar({ portfolio, theme, setTheme, openPdf }) {
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

  // Fix Google Translate iframe menu scrolling on mobile
  React.useEffect(() => {
    const fixTranslateFrame = () => {
      const frame = document.querySelector('.goog-te-menu-frame');
      if (frame) {
        frame.setAttribute('scrolling', 'yes');
        try {
          const iframeDoc = frame.contentDocument || frame.contentWindow.document;
          if (iframeDoc && iframeDoc.body) {
            iframeDoc.body.style.overflow = 'auto';
            // Also try to fix the menu container inside
            const menu = iframeDoc.querySelector('.goog-te-menu2');
            if (menu) {
              menu.style.maxHeight = '70vh';
              menu.style.overflow = 'auto';
              menu.style.overflowX = 'hidden';
            }
          }
        } catch (e) { /* cross-origin, handled by CSS fallback */ }
      }
    };

    // Use MutationObserver to catch when Google injects the iframe
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1 && (
            node.classList?.contains('goog-te-menu-frame') ||
            node.querySelector?.('.goog-te-menu-frame')
          )) {
            setTimeout(fixTranslateFrame, 100);
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Also run on any click on the translate widget (menu appears on click)
    const handleClick = (e) => {
      if (e.target.closest?.('#google_translate_element') || e.target.closest?.('.goog-te-gadget')) {
        setTimeout(fixTranslateFrame, 300);
      }
    };
    document.addEventListener('click', handleClick, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

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
