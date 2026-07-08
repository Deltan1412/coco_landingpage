import { useEffect, useRef, useState } from 'react';

/**
 * A red box reading "UNLOCK NEW SKILLS" that splits into two halves as the
 * user scrolls, revealing the illustration (4.png) behind it.
 */
export function UnlockReveal() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      // Closed while the box sits low in the viewport (78%), fully open by 45%.
      const start = vh * 0.78;
      const end = vh * 0.45;
      const p = (start - center) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const shift = progress * 100;

  return (
    <section className="unlock shell" aria-label="Unlock new skills">
      <div className="unlock-frame" ref={frameRef}>
        <img className="unlock-img" src="/background/4.png" alt="" />
        <div
          className="unlock-slab unlock-slab-top"
          style={{ transform: `translateY(-${shift}%)` }}
        >
          <span className="unlock-label">UNLOCK NEW SKILLS</span>
        </div>
        <div
          className="unlock-slab unlock-slab-bottom"
          style={{ transform: `translateY(${shift}%)` }}
        >
          <span className="unlock-label">UNLOCK NEW SKILLS</span>
        </div>
      </div>
    </section>
  );
}
