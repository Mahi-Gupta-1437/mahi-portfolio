import { useState, useEffect, useRef } from 'react';
const API = process.env.REACT_APP_API_URL || '';
const phrases = ['beautiful web apps ✨','full-stack systems 💻','clean PHP backends 🐘','AI-powered platforms 🤖','experiences that matter 💜'];
const chipAnims = [
  {top:'-14px',right:'-48px',animationDelay:'0s'},
  {bottom:'28px',right:'-54px',animationDelay:'1.2s'},
  {bottom:'-14px',left:'-34px',animationDelay:'2.4s'},
  {top:'40px',left:'-50px',animationDelay:'.6s'},
];
const chipData = ['CGPA 8.51','💻 Full-Stack','🏆 15+ Certs','☁️ Cloud · AI'];

export default function Hero({ portfolio, openPdf }) {
  const [typed, setTyped] = useState('');
  const [counts, setCounts] = useState({projects:0,certificates:0,cgpa:0});
  const [cmdLines, setCmdLines] = useState([{cmd:'',out:'',visible:false},{cmd:'',out:'',visible:false},{cmd:'',out:'',visible:false}]);
  const [blinkVisible, setBlinkVisible] = useState(false);
  const pi = useRef(0), ci = useRef(0), del = useRef(false);

  useEffect(() => {
    // Typing effect
    const t = () => {
      const ph = phrases[pi.current];
      if(!del.current){ setTyped(ph.slice(0,++ci.current)); if(ci.current===ph.length){del.current=true;setTimeout(t,2000);return;} setTimeout(t,70); }
      else{ setTyped(ph.slice(0,--ci.current)); if(ci.current===0){del.current=false;pi.current=(pi.current+1)%phrases.length;setTimeout(t,400);return;} setTimeout(t,40); }
    };
    setTimeout(t, 2200);
  }, []);

  useEffect(() => {
    // Counter animation
    const animate = (target, key, isFloat) => {
      let start = null;
      const step = ts => {
        if(!start) start=ts;
        const p = Math.min((ts-start)/1600,1);
        const ease = 1-Math.pow(1-p,3);
        setCounts(c => ({...c, [key]: isFloat ? parseFloat((target*ease).toFixed(2)) : Math.floor(target*ease)}));
        if(p<1) requestAnimationFrame(step);
        else setCounts(c=>({...c,[key]:target}));
      };
      requestAnimationFrame(step);
    };
    setTimeout(() => { animate(4,'projects',false); animate(15,'certificates',false); animate(8.51,'cgpa',true); }, 1800);
  }, []);

  useEffect(() => {
    // Terminal animation
    const cmds = [
      {cmd:'whoami', out:'→ Mahi Gupta | Full-Stack Dev | CSE @ LPU'},
      {cmd:'cat skills.json', out:'[ PHP, Java, JS, Python, MySQL, MongoDB... ]'},
      {cmd:'ls projects/', out:'ThesisEase  FileRecovery  Acadex  AetheriaHeights'},
    ];
    const runLine = idx => {
      if(idx>=cmds.length){ setTimeout(()=>setBlinkVisible(true),200); return; }
      let ch=0;
      const typeCmd = () => {
        setCmdLines(prev => { const n=[...prev]; n[idx]={...n[idx],cmd:cmds[idx].cmd.slice(0,++ch),visible:true,out:''}; return n; });
        if(ch<cmds[idx].cmd.length) setTimeout(typeCmd,55);
        else setTimeout(()=>{
          setCmdLines(prev=>{const n=[...prev];n[idx]={...n[idx],out:cmds[idx].out};return n;});
          setTimeout(()=>runLine(idx+1),500);
        },180);
      };
      typeCmd();
    };
    setTimeout(()=>runLine(0), 3200);
  }, []);

  const outColors = ['','teal','gold'];

  return (
    <section id="hero" style={{position:'relative'}}>
      <div className="aurora"/>
      <div className="hero-grid"/>
      <div className="hero-inner max-w">
        <div>
          <div className="hero-greet">Hello, World <span className="wave">👋</span></div>
          <h1 className="hero-name">
            <span className="fill">Mahi</span>
            <span className="stroke">Gupta</span>
          </h1>
          <p className="hero-tagline">Full-Stack Developer &amp; CSE Student</p>
          <div className="typed-wrap">I love building <span className="typed-text">{typed}</span></div>
          <div className="hero-btns">
            <button onClick={() => openPdf(`${API}/pdfs/MyFinalCV.pdf`, 'Mahi Gupta - CV')} className="btn-primary"><i className="fas fa-eye"/> View CV</button>
            <a href="#contact" className="btn-outline"><i className="fas fa-paper-plane"/> Contact Me</a>
            <a href="#projects" className="btn-outline"><i className="fas fa-code"/> Projects</a>
          </div>
          <div className="hero-stats">
            <div className="stat rv d1"><div className="stat-num">{counts.projects}+</div><div className="stat-lbl">Projects</div></div>
            <div className="stat rv d2"><div className="stat-num">{counts.certificates}+</div><div className="stat-lbl">Certificates</div></div>
            <div className="stat rv d3"><div className="stat-num">{counts.cgpa}</div><div className="stat-lbl">CGPA</div></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="orb-wrap">
            <div className="orb-ring-wrap" style={{position:'absolute',inset:'-20px',zIndex:0}}>
              <svg viewBox="0 0 360 360" fill="none" width="100%" height="100%">
                <defs><linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c5cbf"/>
                  <stop offset="33%" stopColor="#e07fa3"/>
                  <stop offset="66%" stopColor="#85b8c8"/>
                  <stop offset="100%" stopColor="#7c5cbf"/>
                </linearGradient></defs>
                <circle cx="180" cy="180" r="170" stroke="url(#rg)" strokeWidth="2.5" strokeDasharray="12 8" fill="none" opacity=".7"/>
              </svg>
            </div>
            <div className="orb">
              <div className="code-terminal">
                <div className="ct-bar">
                  <span className="ct-dot" style={{background:'#ff5f57'}}/>
                  <span className="ct-dot" style={{background:'#ffbd2e'}}/>
                  <span className="ct-dot" style={{background:'#28ca41'}}/>
                  <span className="ct-title-text">mahi@portfolio:~</span>
                </div>
                <div className="ct-body">
                  {cmdLines.map((l,i) => l.visible && (
                    <div key={i}>
                      <div className="ct-line"><span className="ct-prompt">$</span><span className="ct-cmd">{l.cmd}</span></div>
                      {l.out && <div className={`ct-out ${outColors[i]}`}>{l.out}</div>}
                    </div>
                  ))}
                  {blinkVisible && <div className="ct-line"><span className="ct-prompt">$</span><span className="ct-cursor">▋</span></div>}
                </div>
              </div>
            </div>
            {chipData.map((txt,i) => (
              <div key={i} className="chip" style={{...chipAnims[i],animation:`chip-float 3.5s ease-in-out ${chipAnims[i].animationDelay} infinite`}}>
                {i===0 && <div className="chip-dot"/>}{txt}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes chip-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .chip{position:absolute;background:var(--card);border:1px solid var(--border);border-radius:14px;padding:9px 14px;box-shadow:0 8px 24px var(--shadow);font-size:.76rem;font-weight:600;color:var(--primary);display:flex;align-items:center;gap:7px;z-index:2;white-space:nowrap}
      `}</style>
    </section>
  );
}
