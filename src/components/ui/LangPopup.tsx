import { useState, useEffect } from 'react';
import { useLang, type Lang } from '@/hooks/useLang';
import '@/styles/lang-popup.css';

export function LangPopup() {
  const { lang, setLang, t } = useLang();
  const [isVisible, setIsVisible] = useState(true);

  // Check if user has already dismissed or selected a preference
  useEffect(() => {
    const dismissed = localStorage.getItem('coco.langPopupDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleSelectLang = (selectedLang: Lang) => {
    setLang(selectedLang);
  };

  const handleDismiss = () => {
    localStorage.setItem('coco.langPopupDismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    // If dismissed, we can show a small sticky button at the top corner to reopen it, 
    // or just let it stay hidden. The prompt says "the popup should fix to the top of the page all the time",
    // so we can also allow reopening, or keep it always visible.
    // Let's render a very small floating switcher at the top-right if they dismissed the big banner, 
    // so it is always accessible at the top of the page.
    return (
      <button 
        className="lang-popup-trigger" 
        onClick={() => {
          setLang(lang === 'en' ? 'vi' : 'en');
        }}
        aria-label="Change language / Thay đổi ngôn ngữ"
        title="Change language / Thay đổi ngôn ngữ"
      >
        {lang.toUpperCase()}
      </button>
    );
  }

  return (
    <div className="lang-popup-bar">
      <div className="lang-popup-content">
        <span className="lang-popup-text">
          <span className="lang-popup-en-text">Which language do you prefer to read in?</span>
          <span className="lang-popup-sep">|</span>
          <span className="lang-popup-vi-text">Bạn muốn đọc bằng ngôn ngữ nào?</span>
        </span>
        <div className="lang-popup-actions">
          <button
            type="button"
            className={`lang-popup-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => handleSelectLang('en')}
          >
            English
          </button>
          <button
            type="button"
            className={`lang-popup-btn ${lang === 'vi' ? 'active' : ''}`}
            onClick={() => handleSelectLang('vi')}
          >
            Tiếng Việt
          </button>
          <button
            type="button"
            className="lang-popup-close-btn"
            onClick={handleDismiss}
            aria-label={t('langPopup.close')}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
