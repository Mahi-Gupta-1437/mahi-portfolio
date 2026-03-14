import { useEffect, useRef } from 'react';
export default function useReveal() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting) e.target.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
      });
    }, {threshold:.08});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}
