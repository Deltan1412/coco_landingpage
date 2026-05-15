import { useLang } from '@/hooks/useLang';

interface LangToggleProps {
  className?: string;
}

export function LangToggle({ className = '' }: LangToggleProps) {
  const { lang, toggle, t } = useLang();

  return (
    <button
      type="button"
      className={`lang-toggle ${className}`.trim()}
      onClick={toggle}
      aria-label={t('nav.langToggleLabel')}
      title={t('nav.langToggleLabel')}
    >
      <span className={`lang-toggle-opt${lang === 'en' ? ' active' : ''}`} aria-hidden="true">EN</span>
      <span className="lang-toggle-sep" aria-hidden="true">/</span>
      <span className={`lang-toggle-opt${lang === 'vi' ? ' active' : ''}`} aria-hidden="true">VI</span>
    </button>
  );
}
