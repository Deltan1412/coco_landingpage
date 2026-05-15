import '@/styles/contact-panel.css';
import { CONTACT_EMAIL, WHATSAPP, OFFICE_HOURS } from '@/constants/contact';
import { useLang } from '@/hooks/useLang';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  const { t } = useLang();
  if (!isOpen) return null;

  return (
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-panel" onClick={(e) => e.stopPropagation()}>
        <button className="contact-close" onClick={onClose}>&times;</button>
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

        <button className="btn btn-primary" style={{ width: '100%', marginTop: 20 }} onClick={onClose}>
          {t('contact.gotIt')}
        </button>
      </div>
    </div>
  );
}
