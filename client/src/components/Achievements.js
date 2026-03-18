import React from 'react';
import useReveal from '../hooks/useReveal';

export default function Achievements({ achievements }) {
  const ref = useReveal();

  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" ref={ref} style={{ background: 'var(--bg)' }}>
      <div className="max-w">
        <div className="sec-head center rv">
          <span className="sec-tag">Milestones & Recognition</span>
          <h2 className="sec-title">Achievements</h2>
          <p style={{ color: 'var(--text3)', fontSize: '.88rem', marginTop: 13 }}>
            Key highlights of my technical journey 🏆
          </p>
        </div>

        <div className="achievements-grid rv">
          {achievements.map((ach) => (
            <div key={ach.id} className="achievement-card">
              <div className="ach-icon-box" style={{ background: ach.color && ach.color.startsWith('var') ? ach.color : 'var(--pri-s)' }}>
                <i className={`fas ${ach.icon || 'fa-award'}`} />
              </div>
              <h3 className="ach-title">{ach.title}</h3>
              <p 
                className="ach-desc"
                dangerouslySetInnerHTML={{ __html: ach.desc }}
              />
              <div className="ach-emoji">{ach.emoji}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
