import '@/styles/contact-panel.css';
import { LangFab } from '@/components/ui/LangFab';
import { useLang } from '@/hooks/useLang';
import { CONTACT_EMAIL, WHATSAPP, OFFICE_HOURS } from '@/constants/contact';
import { AI_STUDIO_URL } from '@/constants/links';

export function ContactPage() {
  const { t } = useLang();
  return (
    <>
      <LangFab />
      <div className="register-page">
        <header className="register-page-header shell">
          <a href={AI_STUDIO_URL} className="register-page-back">
            ← {t('form.back')}
          </a>
        </header>
        <section className="shell contact-page-section">
          <div className="contact-panel">
            <h3>{t('contact.title')}</h3>
            <p>{t('contact.body')}</p>

            <div className="contact-info">
              <div className="contact-item">
                <strong>{t('contact.email')}</strong>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.hours')}</strong>
                <span>{OFFICE_HOURS}</span>
              </div>
              <div className="contact-item">
                <strong>{t('contact.whatsapp')}</strong>
                <span>{WHATSAPP}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
