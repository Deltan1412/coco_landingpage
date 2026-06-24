import { useLang } from '@/hooks/useLang';

export function LangFab() {
  const { lang, toggle, t } = useLang();

  return (
    <button
      type="button"
      className="lang-fab"
      onClick={toggle}
      aria-label={t('nav.langToggleLabel')}
      title={t('nav.langToggleLabel')}
    >
      <span className="lang-fab__current">{lang === 'en' ? 'EN' : 'VI'}</span>
      <span className="lang-fab__next" aria-hidden="true">{lang === 'en' ? 'VI' : 'EN'}</span>
    </button>
  );
}
