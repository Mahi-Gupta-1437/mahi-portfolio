import { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal';

export default function Education({ education }) {
  const ref = useReveal();
  const [certImg, setCertImg] = useState(null);

  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
    },{threshold:.15});
    document.querySelectorAll('.tl-item').forEach((el,i)=>{ el.style.transitionDelay=(i*.12)+'s'; obs.observe(el); });
    return ()=>obs.disconnect();
  },[education]);

  // Close on ESC key
  useEffect(()=>{
    const handler = e => { if(e.key==='Escape') setCertImg(null); };
    window.addEventListener('keydown', handler);
    return ()=>window.removeEventListener('keydown', handler);
  },[]);

  return (
    <section id="education" ref={ref}>
      <div className="max-w">
        <div className="sec-head center rv"><span className="sec-tag">My journey</span><h2 className="sec-title">Education &amp; Experience</h2></div>
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
                {e.certificate && (
                  <button
                    onClick={()=>setCertImg(e.certificate)}
                    style={{marginTop:10,display:'inline-flex',alignItems:'center',gap:6,background:'var(--pri-s)',color:'var(--primary)',border:'1px solid var(--border)',borderRadius:50,padding:'5px 14px',fontSize:'.75rem',fontWeight:700,cursor:'pointer',transition:'all .3s'}}
                    onMouseEnter={ev=>{ev.currentTarget.style.background='var(--primary)';ev.currentTarget.style.color='#fff';}}
                    onMouseLeave={ev=>{ev.currentTarget.style.background='var(--pri-s)';ev.currentTarget.style.color='var(--primary)';}}
                  >
                    <i className="fas fa-certificate"/> View Certificate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox */}
      {certImg && (
        <div
          onClick={()=>setCertImg(null)}
          style={{
            position:'fixed',inset:0,zIndex:90000,
            background:'rgba(0,0,0,.88)',backdropFilter:'blur(10px)',
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
            padding:20,cursor:'pointer'
          }}
        >
          {/* Prominent top-bar with close button */}
          <div
            onClick={ev=>ev.stopPropagation()}
            style={{width:'100%',maxWidth:880,display:'flex',justifyContent:'flex-end',marginBottom:10,cursor:'default'}}
          >
            <button
              onClick={()=>setCertImg(null)}
              style={{
                display:'inline-flex',alignItems:'center',gap:7,
                background:'rgba(255,255,255,.15)',color:'#fff',
                border:'1px solid rgba(255,255,255,.25)',
                borderRadius:50,padding:'7px 16px',
                fontSize:'.8rem',fontWeight:700,cursor:'pointer',
                backdropFilter:'blur(4px)',transition:'background .2s'
              }}
              onMouseEnter={ev=>ev.currentTarget.style.background='rgba(224,127,163,.8)'}
              onMouseLeave={ev=>ev.currentTarget.style.background='rgba(255,255,255,.15)'}
            >
              <i className="fas fa-times"/> Close
            </button>
          </div>

          {/* Certificate image */}
          <div onClick={ev=>ev.stopPropagation()} style={{maxWidth:880,width:'100%',cursor:'default'}}>
            <img
              src={`/${certImg}`}
              alt="Certificate"
              style={{width:'100%',borderRadius:14,boxShadow:'0 24px 80px rgba(0,0,0,.7)',display:'block'}}
            />
          </div>
          <p style={{color:'rgba(255,255,255,.35)',fontSize:'.72rem',marginTop:12}}>Click outside to close</p>
        </div>
      )}
    </section>
  );
}
