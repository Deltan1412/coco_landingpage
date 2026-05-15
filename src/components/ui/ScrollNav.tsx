import { useState, useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import type { TranslationKey } from '@/data/translations';

const SECTIONS: { id: string; key: TranslationKey }[] = [
  { id: 'course', key: 'scrollnav.welcome' },
  { id: 'products', key: 'scrollnav.products' },
  { id: 'roadmap', key: 'scrollnav.roadmap' },
  { id: 'trainers', key: 'scrollnav.trainers' },
  { id: 'register', key: 'scrollnav.register' },
];

export function ScrollNav() {
  const [activeId, setActiveId] = useState('');
  const [expanded, setExpanded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t } = useLang();

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

  useEffect(() => {
    if (!activeId) return;
    setExpanded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setExpanded(false), 1500);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [activeId]);

  return (
    <nav className="scroll-nav" aria-label={t('scrollnav.aria')}>
      <div className={`scroll-nav-track${expanded ? ' expanded' : ''}`}>
        {SECTIONS.map(({ id, key }) => {
          const label = t(key);
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`scroll-nav-item${activeId === id ? ' active' : ''}`}
              aria-label={label}
            >
              <span className="scroll-nav-dot" />
              <span className="scroll-nav-label">{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
