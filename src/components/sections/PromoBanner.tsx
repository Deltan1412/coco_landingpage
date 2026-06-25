import { Countdown } from '@/components/ui/Countdown';
import { useLang } from '@/hooks/useLang';

export function PromoBanner() {
  const { t } = useLang();

  return (
    <div className="promo-banner" role="region" aria-label={t('promo.label')}>
      <p className="promo-banner__brand">{t('promo.brand')}</p>
      <p className="promo-banner__headline">
        <span className="promo-banner__spark" aria-hidden="true">⚡</span>
        <span className="promo-banner__label">{t('promo.label')}</span>
        <span className="promo-banner__amount">{t('promo.amount')}</span>
        <span className="promo-banner__window">{t('promo.window')}</span>
      </p>
      <Countdown />
    </div>
  );
}
