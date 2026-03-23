import useReveal from '../hooks/useReveal';
import { useEffect } from 'react';
export default function Projects({ projects, openPdf }) {
  const ref = useReveal();
  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  useEffect(() => {
    document.querySelectorAll('.proj-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r=card.getBoundingClientRect();
        const x=((e.clientX-r.left)/r.width-.5)*12;
        const y=((e.clientY-r.top)/r.height-.5)*-12;
        card.style.transform=`translateY(-10px) scale(1.01) rotateY(${x}deg) rotateX(${y}deg)`;
      });
      card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
    });
  }, [projects]);

  return (
    <section id="projects" ref={ref}>
      <div className="max-w">
        <div className="sec-head center rv"><span className="sec-tag">What I've built</span><h2 className="sec-title">Projects</h2></div>
        {featured && (
          <div className="proj-feat rv" style={{marginBottom:26}}>
            <div className="feat-badge">✦ Featured</div>
            <div className="proj-feat-grid">
              <div className="proj-feat-l">
                <div className="proj-feat-emoji">{featured.emoji}</div>
                <div className="proj-feat-n">{featured.title}</div>
                <div className="proj-feat-sub">{featured.subtitle}</div>
                <p className="proj-feat-desc">{featured.desc}</p>
                <div className="proj-feats">
                  {featured.highlights.map((h,i)=>(
                    <div key={i} className="proj-feat-row"><span>{h.icon}</span>{h.text}</div>
                  ))}
                </div>
                <div className="tech-row">{featured.tech.map((t,i)=><span key={i} className="tech-tag">{t}</span>)}</div>
                <div className="proj-links-row">
                  <a href={featured.github} target="_blank" rel="noreferrer" className="proj-link"><i className="fab fa-github"/> View on GitHub <i className="fas fa-arrow-right"/></a>
                  {featured.liveDemo && (
                    <a href={featured.liveDemo} target="_blank" rel="noreferrer" className="proj-link proj-link-showcase"><i className="fas fa-external-link-alt"/> Live Demo <i className="fas fa-arrow-right"/></a>
                  )}
                  {featured.showcaseUrl && (
                    <a href={featured.showcaseUrl} target="_blank" rel="noreferrer" className="proj-link proj-link-showcase"><i className="fas fa-eye"/> {featured.showcaseLabel || 'View Showcase'} <i className="fas fa-arrow-right"/></a>
                  )}
                  {featured.showcaseUrl2 && (
                    <a href={featured.showcaseUrl2} target="_blank" rel="noreferrer" className="proj-link proj-link-showcase"><i className="fas fa-eye"/> {featured.showcaseLabel2 || 'View Showcase 2'} <i className="fas fa-arrow-right"/></a>
                  )}
                </div>
              </div>
              <div className="proj-feat-r">
                <div className="hotel-mockup">
                  <div className="hm-bar">
                    <span className="hm-dot" style={{background:'#ff5f57'}}/>
                    <span className="hm-dot" style={{background:'#ffbd2e'}}/>
                    <span className="hm-dot" style={{background:'#28ca41'}}/>
                    <span className="hm-url">aetheria-heights.com</span>
                  </div>
                  <div className="hm-hero-wrap">
                    <HotelStars/>
                    <div className="hm-cnt">
                      <div className="hm-logo">✦ AETHERIA HEIGHTS</div>
                      <div className="hm-tag-txt">Luxury Redefined</div>
                      <div className="hm-btns-row"><div className="hm-btn">Book Now</div><div className="hm-btn2">Explore</div></div>
                    </div>
                  </div>
                  <div className="hm-cards-row">
                    {[['🛎️','AI Concierge','Online'],['🏡','24 Rooms','Available'],['⭐','4.9 Stars','Reviews']].map(([e,t,s],i)=>(
                      <div key={i} className="hm-card">{e}<div><div className="hm-card-t">{t}</div><div className="hm-card-s">{s}</div></div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="proj-grid">
          {rest.map((p,i) => (
            <div key={p.id} className={`proj-card rv d${i+1}`}>
              <div className="proj-hdr">
                <div className="proj-hdr-top"><div className="proj-icon-big">{p.emoji}</div><div className="proj-num">0{i+1}</div></div>
                <div className="proj-card-title">{p.title}</div>
                <div className="proj-card-date">{p.period}</div>
              </div>
              <div className="proj-body">
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-pts">{p.highlights.map((h,j)=><div key={j} className="proj-pt">{h}</div>)}</div>
                <div className="tech-row">{p.tech.map((t,j)=><span key={j} className="tech-tag">{t}</span>)}</div>
                <div className="proj-links-row">
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-link"><i className="fab fa-github"/> GitHub <i className="fas fa-arrow-right"/></a>
                  {p.liveDemo && (
                    <a href={p.liveDemo} target="_blank" rel="noreferrer" className="proj-link proj-link-showcase"><i className="fas fa-external-link-alt"/> Live Demo <i className="fas fa-arrow-right"/></a>
                  )}
                  {p.showcaseUrl && (
                    <a href={p.showcaseUrl} target="_blank" rel="noreferrer" className="proj-link proj-link-showcase"><i className="fas fa-eye"/> {p.showcaseLabel || 'View Showcase'} <i className="fas fa-arrow-right"/></a>
                  )}
                  {p.showcaseUrl2 && (
                    <a href={p.showcaseUrl2} target="_blank" rel="noreferrer" className="proj-link proj-link-showcase"><i className="fas fa-eye"/> {p.showcaseLabel2 || 'View Showcase 2'} <i className="fas fa-arrow-right"/></a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function HotelStars(){
  return <div className="hm-star-container" style={{position:'absolute',inset:0}}>
    {Array.from({length:24},(_,i)=>(
      <div key={i} className="hm-star" style={{left:Math.random()*100+'%',top:Math.random()*100+'%',animationDelay:Math.random()*3+'s',opacity:Math.random()*.8+.1}}/>
    ))}
  </div>;
}
