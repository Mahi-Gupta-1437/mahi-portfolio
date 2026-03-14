import { useEffect } from 'react';
import useReveal from '../hooks/useReveal';
export default function Education({ education }) {
  const ref = useReveal();
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
    },{threshold:.15});
    document.querySelectorAll('.tl-item').forEach((el,i)=>{ el.style.transitionDelay=(i*.12)+'s'; obs.observe(el); });
    return ()=>obs.disconnect();
  },[education]);
  return (
    <section id="education" ref={ref}>
      <div className="max-w">
        <div className="sec-head center rv"><span className="sec-tag">My journey</span><h2 className="sec-title">Education & Experience</h2></div>
        <div className="timeline">
          {education.map(e=>(
            <div key={e.id} className="tl-item">
              <div className="tl-dot" style={{background:`linear-gradient(135deg,${e.color},${e.color}88)`}}>{e.emoji}</div>
              <div className="tl-body">
                <div className="tl-period">{e.period}</div>
                <div className="tl-title">{e.title}</div>
                <div className="tl-sub">{e.subtitle}</div>
                {e.score && <div className="tl-badge"><i className="fas fa-star"/>{e.score}</div>}
                {e.desc && <p style={{fontSize:'.82rem',color:'var(--text3)',lineHeight:1.7,marginTop:8}}>{e.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
