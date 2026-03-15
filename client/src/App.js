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
  const [certs, setCerts] = useState([]);
  const [education, setEducation] = useState([]);
  const [timeStr, setTimeStr] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Load all data
  useEffect(() => {
    const load = async () => {
      try {
        const [p, s, pr, c, e] = await Promise.all([
          axios.get(`${API}/api/portfolio`),
          axios.get(`${API}/api/skills`),
          axios.get(`${API}/api/projects`),
          axios.get(`${API}/api/certifications`),
          axios.get(`${API}/api/education`),
        ]);
        setPortfolio(p.data); setSkills(s.data); setProjects(pr.data);
        setCerts(c.data); setEducation(e.data);
      } catch(err) { console.error('API error:', err.message); }
      setTimeout(() => setLoaded(true), 1600);
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

  if (!portfolio) return <Loader />;

  return (
    <>
      <Cursor />
      <Loader done={loaded} />
      <AmbientCanvas />
      <div id="scroll-prog" />
      <Navbar portfolio={portfolio} theme={theme} setTheme={setTheme} openPdf={openPdf} />
      <Hero portfolio={portfolio} openPdf={openPdf} />
      <Marquee />
      <About portfolio={portfolio} />
      <Skills skills={skills} />
      <Projects projects={projects} openPdf={openPdf} />
      <Certifications certs={certs} openPdf={openPdf} />
      <Education education={education} />
      <Contact portfolio={portfolio} />
      <Footer portfolio={portfolio} />
      {pdfFile && <PdfModal file={pdfFile} title={pdfTitle} onClose={closePdf} />}
      {timeStr && (
        <div className="visitor-badge" style={{ gap: '8px' }}>
          <i className="far fa-clock" style={{ color: 'var(--primary)', fontSize: '0.9rem' }} />
          {timeStr}
        </div>
      )}
      <button id="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}
