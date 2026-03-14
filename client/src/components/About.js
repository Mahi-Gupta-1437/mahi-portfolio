import useReveal from '../hooks/useReveal';
export default function About({ portfolio }) {
  const ref = useReveal();
  if(!portfolio) return null;
  return (
    <section id="about" ref={ref}>
      <div className="max-w">
        <div className="sec-head rv"><span className="sec-tag">Get to know me</span><h2 className="sec-title">About Me</h2></div>
        <div className="about-grid">
          <div className="rv left">
            <div className="about-card">
              <div className="about-card-top">
                <div className="avatar-pulse"><img src="/profile.jpg" alt="Mahi Gupta" className="avatar-img" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }} /></div>
                <div className="about-nm">{portfolio.name}</div>
                <div className="about-role-txt">CSE Student · Full-Stack Developer</div>
                <div className="status-pill"><div className="status-dot"/> Open to Opportunities</div>
              </div>
              <div className="about-rows">
                <div className="about-row"><i className="fas fa-map-marker-alt"/> {portfolio.location}</div>
                <div className="about-row"><i className="fas fa-university"/> {portfolio.university}</div>
                <div className="about-row"><i className="fas fa-envelope"/> {portfolio.email}</div>
                <div className="about-row"><i className="fas fa-phone"/> {portfolio.phone}</div>
                <div className="about-row"><i className="fas fa-graduation-cap"/> B.Tech CSE · 2023–Present</div>
              </div>
            </div>
          </div>
          <div className="rv right">
            <div className="about-text">
              <h3>Hi, I'm Mahi 🌸</h3>
              {portfolio.bio.map((p,i) => <p key={i}>{p}</p>)}
              <div className="fact-chips">
                {portfolio.interests.map((item,i) => <div key={i} className="fchip">{item}</div>)}
              </div>
              <div className="bring-grid">
                {portfolio.brings.map((b,i) => (
                  <div key={i} className="bring-card">
                    <div className="bring-icon">{b.icon}</div>
                    <div className="bring-label">{b.label}</div>
                    <div className="bring-sub">{b.sub}</div>
                  </div>
                ))}
              </div>
              
              <div className="achievement-mini" style={{ marginTop: '24px', padding: '16px 20px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-award" style={{ color: 'var(--accent)' }}/> Achievement
                </h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.6' }}>
                  Solved <b>250+ Data Structures and Algorithms</b> problems across LeetCode and GeeksforGeeks, strengthening algorithmic thinking and problem-solving skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
