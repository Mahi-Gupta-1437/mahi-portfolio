import { useEffect, useRef } from 'react';
import useReveal from '../hooks/useReveal';
export default function Skills({ skills }) {
  const ref = useReveal();
  const obs = useRef();
  useEffect(() => {
    obs.current = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.querySelectorAll('.skl').forEach(s => {
            const f = s.querySelector('.skl-fill');
            if(f) setTimeout(() => { f.style.width = s.dataset.pct + '%'; }, 150);
          });
        }
      });
    }, {threshold:.3});
    document.querySelectorAll('.skill-card').forEach(c => obs.current.observe(c));
    return () => obs.current && obs.current.disconnect();
  }, [skills]);
  const delays = ['d1','d2','d3','d4'];
  return (
    <section id="skills" ref={ref}>
      <div className="max-w">
        <div className="sec-head center rv"><span className="sec-tag">What I work with</span><h2 className="sec-title">Skills</h2></div>
        <div className="skills-wrap">
          {skills.map((grp,i) => (
            <div key={i} className={`skill-card rv ${delays[i]}`}>
              <div className="skill-card-title"><i className={`fas ${grp.icon}`}/> {grp.category}</div>
              {grp.type === 'bubbles' ? (
                <div className="bubble-cloud">
                  {grp.skills.map((s,j) => <div key={j} className="bubble"><i className={`fas ${s.icon}`}/><span>{s.name}</span></div>)}
                </div>
              ) : (
                grp.skills.map((s,j) => (
                  <div key={j} className="skl" data-pct={s.pct}>
                    <div className="skl-top"><span className="skl-name">{s.name}</span><span className="skl-pct">{s.pct}%</span></div>
                    <div className="skl-bar"><div className="skl-fill"/></div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
