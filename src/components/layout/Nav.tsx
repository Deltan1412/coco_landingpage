import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <Logo />

      <div className="nav-links">
        <a href="https://www.wildcats.io/" target="_blank" rel="noopener noreferrer">About Wildcats</a>
        <a href="https://www.wildcats.io/about" target="_blank" rel="noopener noreferrer">A Look At Our Team</a>
      </div>

      <a href="#register" className="nav-cta-link">
        <button className="nav-cta lime">Join cohort →</button>
      </a>

      <button
        type="button"
        className={`nav-burger${open ? ' open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div className="mobile-menu-links">
            <a href="https://www.wildcats.io/" target="_blank" rel="noopener noreferrer" onClick={close}>About Wildcats</a>
            <a href="https://www.wildcats.io/about" target="_blank" rel="noopener noreferrer" onClick={close}>A Look At Our Team</a>
          </div>
          <a href="#register" onClick={close}>
            <button className="nav-cta lime">Join cohort →</button>
          </a>
        </div>
      )}
    </nav>
  );
}
