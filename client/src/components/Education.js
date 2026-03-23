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
                    className="tl-cert-btn"
                    style={{marginTop:10,display:'inline-flex',alignItems:'center',gap:6,background:'var(--pri-s)',color:'var(--primary)',border:'1px solid var(--border)',borderRadius:50,padding:'5px 14px',fontSize:'.75rem',fontWeight:700,cursor:'pointer',transition:'all .3s'}}
                    onMouseEnter={e2=>{e2.currentTarget.style.background='var(--primary)';e2.currentTarget.style.color='#fff'}}
                    onMouseLeave={e2=>{e2.currentTarget.style.background='var(--pri-s)';e2.currentTarget.style.color='var(--primary)'}}
                  >
                    <i className="fas fa-certificate"/> View Certificate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Image Lightbox */}
      {certImg && (
        <div
          onClick={()=>setCertImg(null)}
          style={{position:'fixed',inset:0,zIndex:90000,background:'rgba(0,0,0,.82)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:18,cursor:'zoom-out'}}
        >
          <div onClick={e2=>e2.stopPropagation()} style={{position:'relative',maxWidth:900,width:'100%'}}>
            <button
              onClick={()=>setCertImg(null)}
              style={{position:'absolute',top:-14,right:-14,width:34,height:34,borderRadius:'50%',border:'none',background:'var(--accent)',color:'#fff',fontSize:'1rem',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',zIndex:1,boxShadow:'0 4px 14px rgba(0,0,0,.4)'}}
            ><i className="fas fa-times"/></button>
            <img
              src={`/${certImg}`}
              alt="Certificate"
              style={{width:'100%',borderRadius:14,boxShadow:'0 24px 80px rgba(0,0,0,.6)',display:'block'}}
            />
          </div>
        </div>
      )}
    </section>
  );
}
