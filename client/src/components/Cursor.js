import { useEffect } from 'react';
const SPARKS = ['✦','🌸','✨','💜','🦋','🌷','⭐'];
export default function Cursor() {
  useEffect(() => {
    const bf = document.getElementById('cur-bf');
    const ring = document.getElementById('cur-ring');
    let mx=0, my=0;
    const move = e => {
      mx=e.clientX; my=e.clientY;
      if(bf){ bf.style.left=mx+'px'; bf.style.top=my+'px'; }
      setTimeout(()=>{ if(ring){ ring.style.left=mx+'px'; ring.style.top=my+'px'; }},80);
    };
    document.addEventListener('mousemove', move);
    document.querySelectorAll('a,button,.cert-card,.proj-card,.stat,.skill-card,.doc-card').forEach(el=>{
      el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
      el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
    });
    document.addEventListener('click', e => {
      for(let i=0;i<6;i++){
        const s=document.createElement('div'); s.className='spk';
        s.textContent=SPARKS[Math.floor(Math.random()*SPARKS.length)];
        s.style.left=(e.clientX+(Math.random()-.5)*70)+'px';
        s.style.top=(e.clientY+(Math.random()-.5)*70)+'px';
        s.style.fontSize=(9+Math.random()*13)+'px';
        document.body.appendChild(s);
        setTimeout(()=>s.remove(),750);
      }
    });
    return () => document.removeEventListener('mousemove', move);
  }, []);
  return (
    <>
      <div id="cur-bf" style={{position:'fixed',zIndex:99999,pointerEvents:'none',transform:'translate(-50%,-50%)'}}>
        <svg viewBox="0 0 64 50" fill="none" width="36" height="36">
          <ellipse cx="20" cy="17" rx="18" ry="13" fill="#b899f0" opacity=".88"/>
          <ellipse cx="15" cy="33" rx="13" ry="9" fill="#f0a0c0" opacity=".82"/>
          <ellipse cx="44" cy="17" rx="18" ry="13" fill="#b899f0" opacity=".88"/>
          <ellipse cx="49" cy="33" rx="13" ry="9" fill="#f0a0c0" opacity=".82"/>
          <ellipse cx="32" cy="26" rx="3" ry="13" fill="#7c5cbf"/>
          <path d="M29 14 Q24 4 19 2" stroke="#7c5cbf" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M35 14 Q40 4 45 2" stroke="#7c5cbf" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="19" cy="2" r="2" fill="#e07fa3"/>
          <circle cx="45" cy="2" r="2" fill="#e07fa3"/>
          <ellipse cx="20" cy="17" rx="8" ry="5.5" fill="#d4b8f8" opacity=".5"/>
          <ellipse cx="44" cy="17" rx="8" ry="5.5" fill="#d4b8f8" opacity=".5"/>
        </svg>
      </div>
      <div id="cur-ring" style={{position:'fixed',zIndex:99998,pointerEvents:'none',transform:'translate(-50%,-50%)'}}/>
    </>
  );
}
