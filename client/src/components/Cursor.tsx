import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rx = 0, ry = 0, mx = 0, my = 0, raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) { dot.current.style.left = `${mx}px`; dot.current.style.top = `${my}px`; }
    };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current) { ring.current.style.left = `${rx}px`; ring.current.style.top = `${ry}px`; }
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      if (!ring.current) return;
      ring.current.style.width  = '52px';
      ring.current.style.height = '52px';
      ring.current.style.borderColor = 'rgba(124,92,191,0.7)';
    };
    const onLeave = () => {
      if (!ring.current) return;
      ring.current.style.width  = '30px';
      ring.current.style.height = '30px';
      ring.current.style.borderColor = 'rgba(124,92,191,0.5)';
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    const els = document.querySelectorAll('a, button');
    els.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      els.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); });
    };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
