import { useEffect, useRef } from 'react';
export default function AmbientCanvas() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d');
    let W, H, particles = [], raf;
    const resize = () => { W = c.width = innerWidth; H = c.height = innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const pal = ['#b899f0','#f0a0c0','#88c8d8','#c9a84c','#7c5cbf'];
    for(let i=0;i<55;i++){
      particles.push({ x:Math.random()*1000, y:Math.random()*800,
        r:Math.random()*3+1, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
        a:Math.random()*.6+.1, color:pal[Math.floor(Math.random()*pal.length)] });
    }
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color; ctx.globalAlpha=p.a; ctx.fill();
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<-10||p.x>W+10||p.y<-10||p.y>H+10){
          p.x=Math.random()*W; p.y=Math.random()*H;
        }
      });
      ctx.globalAlpha=1; raf=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas id="amb-canvas" ref={ref} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:.3}}/>;
}
