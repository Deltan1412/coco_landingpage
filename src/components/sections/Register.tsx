import { Star } from '@/components/ui/Star';
import { RegisterQR } from '@/components/ui/RegisterQR';
import { Countdown } from '@/components/ui/Countdown';
import { REGISTER_PAGE_URL, CONTACT_PAGE_URL } from '@/constants/links';
import type { Tweaks } from '@/types/tweaks';
import { useLang } from '@/hooks/useLang';

export interface RegisterProps {
  tweaks: Tweaks;
}

export function Register({ tweaks }: RegisterProps) {
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
          <div className="register-pricing" style={{
            background: 'var(--ink)',
            color: '#fff',
            padding: '24px',
            borderRadius: 'var(--radius-pill)',
            border: '1.5px solid var(--ink)',
            boxShadow: '4px 4px 0 0 var(--ink)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '480px',
            marginTop: '4px',
            marginBottom: '4px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffe019' }}>
                {t('register.tuition.title')}
              </span>
              <span style={{ fontSize: '11px', opacity: 0.8, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                {t('register.tuition.note')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--lime)', letterSpacing: '-0.02em' }}>
                {t('register.tuition.promo')}
              </span>
              <span style={{ fontSize: '16px', textDecoration: 'line-through', opacity: 0.5 }}>
                {t('register.tuition.original')}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffe019', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ⏳ {t('promo.window')}
              </span>
              <Countdown />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.95 }}>
                🔑 {t('register.requirement')}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.95 }}>
                📹 {t('register.preCourse')}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={REGISTER_PAGE_URL}>
              <button className="btn btn-primary">{t('register.cta.register')}</button>
            </a>
            <a href={CONTACT_PAGE_URL}>
              <button className="btn btn-ghost">{t('register.cta.talk')}</button>
            </a>
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
            color="#ffe019"
            stroke="#ffe019"
            style={{ position: 'absolute', top: 24, right: 24, opacity: 0.7 }}
          />
          <div
            style={{
              fontSize: 13,
              color: '#ffe019',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {t('register.qr.scan')}
          </div>
          <div className="qr-frame">
            <RegisterQR size={200} />
          </div>
          <div className="qr-caption">
            <strong>SCAN HERE</strong>
            <br />
            {t('register.qr.caption')}
          </div>
        </div>
      </div>
    </section>
  );
}
