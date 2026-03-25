import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PdfModal from './components/PdfModal';
import AmbientCanvas from './components/AmbientCanvas';

const API = process.env.REACT_APP_API_URL || '';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfTitle, setPdfTitle] = useState('');
  const [portfolio, setPortfolio] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certs, setCerts] = useState([]);
  const [education, setEducation] = useState([]);
  const [timeStr, setTimeStr] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [showTimeBadge, setShowTimeBadge] = useState(true);

  // Load all data
  useEffect(() => {
    // Safety net: never stay stuck on loader longer than 10 seconds
    const safetyTimer = setTimeout(() => setLoaded(true), 10000);

    const load = async () => {
      try {
        const endpoints = [
          { key: 'portfolio', url: `${API}/api/portfolio` },
          { key: 'skills', url: `${API}/api/skills` },
          { key: 'projects', url: `${API}/api/projects` },
          { key: 'achievements', url: `${API}/api/achievements` },
          { key: 'certs', url: `${API}/api/certifications` },
          { key: 'education', url: `${API}/api/education` },
        ];

        const results = await Promise.allSettled(endpoints.map(e => axios.get(e.url)));
        
        results.forEach((res, i) => {
          if (res.status === 'fulfilled') {
            const data = res.value.data;
            const key = endpoints[i].key;
            if (key === 'portfolio') setPortfolio(data);
            else if (key === 'skills') setSkills(data);
            else if (key === 'projects') setProjects(data);
            else if (key === 'achievements') setAchievements(data);
            else if (key === 'certs') setCerts(data);
            else if (key === 'education') setEducation(data);
          } else {
            console.warn(`API failed for ${endpoints[i].key}:`, res.reason.message);
          }
        });
      } catch(err) { 
        console.error('Core API error:', err.message); 
      } finally {
        clearTimeout(safetyTimer);
        setTimeout(() => setLoaded(true), 1600);
      }
    };
    load();
  }, []);

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const str = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
      setTimeStr(`India • ${str}`);
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll progress
  useEffect(() => {
    const bar = document.getElementById('scroll-prog');
    const btt = document.getElementById('btt');
    const nav = document.getElementById('main-nav');
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (bar) bar.style.transform = `scaleX(${pct})`;
      if (btt) btt.classList.toggle('show', window.scrollY > 500);
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openPdf = (file, title) => { setPdfFile(file); setPdfTitle(title); };
  const closePdf = () => { setPdfFile(null); };

  // Do NOT early-return here — if we return a bare <Loader /> without the `done` prop,
  // the loader can never transition to done when the API is slow (cold start, etc.).
  // Instead we let the full render mount and rely on <Loader done={loaded}> below.

  return (
    <>
      <Cursor />
      <Loader done={loaded} />
      <AmbientCanvas />
      <div id="scroll-prog" />
      <Navbar portfolio={portfolio} theme={theme} setTheme={setTheme} openPdf={openPdf} showTimeBadge={showTimeBadge} setShowTimeBadge={setShowTimeBadge} />
      <Hero portfolio={portfolio} openPdf={openPdf} />
      <Marquee />
      <About portfolio={portfolio} />
      <Skills skills={skills} />
      <Projects projects={projects} openPdf={openPdf} />
      <Achievements achievements={achievements} />
      <Certifications certs={certs} openPdf={openPdf} />
      <Education education={education} />
      <Contact portfolio={portfolio} />
      <Footer portfolio={portfolio} />
      {pdfFile && <PdfModal file={pdfFile} title={pdfTitle} onClose={closePdf} />}
      {timeStr && showTimeBadge && (
        <div className="visitor-badge" style={{ gap: '8px' }}>
          <i className="far fa-clock" style={{ color: 'var(--primary)', fontSize: '0.9rem' }} />
          <span>{timeStr}</span>
          <button 
            className="badge-close" 
            onClick={() => setShowTimeBadge(false)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text2)', 
              cursor: 'pointer',
              padding: '2px',
              marginLeft: '4px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.8rem',
              opacity: 0.6
            }}
          >
            <i className="fas fa-times" />
          </button>
        </div>
      )}
      <button id="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}
