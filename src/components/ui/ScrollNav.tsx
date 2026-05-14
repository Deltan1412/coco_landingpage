import { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'course', label: 'Welcome' },
  { id: 'products', label: 'Products' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'register', label: 'Register' },
];

export function ScrollNav() {
  const [activeId, setActiveId] = useState('');
  const [expanded, setExpanded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => {
      const mid = window.scrollY + window.innerHeight * 0.5;
      let current = '';
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) current = id;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Pop out for 3s whenever the active section changes
  useEffect(() => {
    if (!activeId) return;
    setExpanded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setExpanded(false), 1500);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [activeId]);

  return (
    <nav className="scroll-nav" aria-label="Section shortcuts">
      <div className={`scroll-nav-track${expanded ? ' expanded' : ''}`}>
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`scroll-nav-item${activeId === id ? ' active' : ''}`}
            aria-label={label}
          >
            <span className="scroll-nav-dot" />
            <span className="scroll-nav-label">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
