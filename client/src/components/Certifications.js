import { useState } from 'react';
import useReveal from '../hooks/useReveal';
const API = process.env.REACT_APP_API_URL || '';
const groups = [
  {key:'all',label:'All',count:15,emoji:''},
  {key:'ai',label:'AI & Cloud',count:4,emoji:'🤖'},
  {key:'db',label:'Databases',count:3,emoji:'🗄️'},
  {key:'prog',label:'Programming',count:4,emoji:'💻'},
  {key:'net',label:'Networking',count:2,emoji:'🌐'},
  {key:'soft',label:'Soft Skills',count:2,emoji:'🌸'},
];
const groupMeta = {
  ai:{name:'AI, Cloud & Infrastructure',ico:'🤖',bg:'linear-gradient(135deg,#dbeafe,#ede8ff)'},
  db:{name:'Databases & Data Engineering',ico:'🗄️',bg:'linear-gradient(135deg,#d1fae5,#e8f5ee)'},
  prog:{name:'Programming & Tools',ico:'💻',bg:'linear-gradient(135deg,#fce8f0,#ede8ff)'},
  net:{name:'Networking & Systems',ico:'🌐',bg:'linear-gradient(135deg,#deeef4,#e8f5ee)'},
  soft:{name:'Soft Skills & Professional',ico:'🌸',bg:'linear-gradient(135deg,#fce8f0,#fff8e8)'},
};
export default function Certifications({ certs, openPdf }) {
  const [active, setActive] = useState('all');
  const ref = useReveal();
  const grouped = ['ai','db','prog','net','soft'].reduce((acc,g)=>({...acc,[g]:certs.filter(c=>c.group===g)}),{});
  return (
    <section id="certifications" ref={ref}>
      <div className="max-w">
        <div className="sec-head center rv"><span className="sec-tag">Continuous learning</span><h2 className="sec-title">Certifications</h2>
          <p style={{color:'var(--text3)',fontSize:'.88rem',marginTop:13}}>15 certificates · hover to flip for details 🦋</p>
        </div>
        <div className="cert-tabs rv">
          {groups.map(g=>(
            <button key={g.key} className={`cert-tab${active===g.key?' active':''}`} onClick={()=>setActive(g.key)}>
              {g.emoji} {g.label} <span className="cert-cnt">{g.count}</span>
            </button>
          ))}
        </div>
        {Object.entries(grouped).map(([gKey,gCerts])=>{
          if(active!=='all'&&active!==gKey) return null;
          const meta=groupMeta[gKey];
          return (
            <div key={gKey} className="cert-grp">
              <div className="cert-grp-hd">
                <div className="cert-grp-ico" style={{background:meta.bg}}>{meta.ico}</div>
                <div><div className="cert-grp-nm">{meta.name}</div><div className="cert-grp-sub">{gCerts.length} certifications</div></div>
              </div>
              <div className="certs-row">
                {gCerts.map(c=>(
                  <div key={c.id} className="cert-card">
                    <div className="cert-card-inner">
                      <div className="cert-front">
                        <div className="cert-plat" style={{background:'var(--pri-s)',color:'var(--primary)'}}>{c.emoji} {c.platform}</div>
                        <div className="cert-title-txt">{c.title}</div>
                        <div className="cert-date-txt"><i className="fas fa-calendar-alt"/>{c.date}</div>
                      </div>
                      <div className="cert-back">
                        <div className="cert-back-ico">{c.emoji}</div>
                        <div className="cert-back-txt">{c.title}</div>
                        <div className="cert-back-link">{c.platform} · {c.date}</div>
                        {c.file && (
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: 8 }}>
                            <button onClick={()=>openPdf(`${API}/pdfs/${c.file}`,c.title)} style={{background:'rgba(255,255,255,.2)',border:'1px solid rgba(255,255,255,.4)',color:'#fff',borderRadius:50,padding:'4px 12px',fontSize:'.68rem',fontWeight:700}}>
                              👁 View
                            </button>
                            <a href={`${API}/pdfs/${c.file}`} download style={{display:'inline-block',background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.4)',color:'#fff',borderRadius:50,padding:'4px 12px',fontSize:'.68rem',fontWeight:700,textDecoration:'none'}}>
                              ⬇ Download
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
