import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { LangToggle } from '@/components/ui/LangToggle';
import { useLang } from '@/hooks/useLang';

export function Nav() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

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
        <a href="https://www.wildcats.io/" target="_blank" rel="noopener noreferrer">{t('nav.about')}</a>
        <span className="nav-links-sep" aria-hidden="true">·</span>
        <a href="https://www.wildcats.io/about" target="_blank" rel="noopener noreferrer">{t('nav.team')}</a>
      </div>

      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <LangToggle />
        <a href="#register" className="nav-cta-link">
          <button className="nav-cta lime">{t('nav.cta')}</button>
        </a>
      </div>

      <button
        type="button"
        className={`nav-burger${open ? ' open' : ''}`}
        aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
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
            <a href="https://www.wildcats.io/" target="_blank" rel="noopener noreferrer" onClick={close}>{t('nav.about')}</a>
            <a href="https://www.wildcats.io/about" target="_blank" rel="noopener noreferrer" onClick={close}>{t('nav.team')}</a>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <LangToggle />
            <a href="#register" onClick={close}>
              <button className="nav-cta lime">{t('nav.cta')}</button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
