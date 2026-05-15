import { useState } from 'react';
import { Star } from '@/components/ui/Star';
import { FakeQR } from '@/components/ui/FakeQR';
import { ContactPanel } from '@/components/ui/ContactPanel';
import { REGISTER_LINK } from '@/constants/links';
import type { Tweaks } from '@/types/tweaks';
import { useLang } from '@/hooks/useLang';

export interface RegisterProps {
  tweaks: Tweaks;
}

export function Register({ tweaks }: RegisterProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { t } = useLang();

  return (
    <section className="shell register" id="register">
      <div className="register-card">
        <div className="register-left">
          <div className="register-cohort">
            <span className="blink" />
            <span>{t('register.cohort')}</span>
          </div>
          <h2>
            {t('register.title.line1')}
            <br />
            {t('register.title.line2')}
          </h2>
          <p>{t('register.body')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-primary">{t('register.cta.register')}</button>
            </a>
            <button className="btn btn-ghost" onClick={() => setIsContactOpen(true)}>
              {t('register.cta.talk')}
            </button>
          </div>
          <div className="register-perks">
            <span>{t('register.perks.live')}</span>
            <span>{t('register.perks.review')}</span>
            <span>{t('register.perks.group')}</span>
          </div>
        </div>
        <div className="register-right">
          <Star
            size={60}
            color="#fff26b"
            stroke="#fff26b"
            style={{ position: 'absolute', top: 24, right: 24, opacity: 0.7 }}
          />
          <div
            style={{
              fontSize: 13,
              color: '#fff26b',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {t('register.qr.scan')}
          </div>
          <div className="qr-frame">
            <FakeQR pattern={tweaks.qrPattern} size={200} />
          </div>
          <div className="qr-caption">
            <strong>buildwithai.io/cohort-03</strong>
            <br />
            {t('register.qr.caption')}
          </div>
        </div>
      </div>
      <ContactPanel isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
