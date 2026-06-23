import { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang';

// Earlybird window: 72 hours counting down to this fixed deadline.
// Edit DEADLINE to restart/extend the offer.
const DEADLINE = new Date('2026-06-26T23:59:59+07:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = DEADLINE - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: false,
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export function PromoBanner() {
  const { t } = useLang();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: t('promo.days'), value: timeLeft.days },
    { label: t('promo.hours'), value: timeLeft.hours },
    { label: t('promo.minutes'), value: timeLeft.minutes },
    { label: t('promo.seconds'), value: timeLeft.seconds },
  ];

  return (
    <div className="promo-banner" role="region" aria-label={t('promo.label')}>
      <p className="promo-banner__headline">
        <span className="promo-banner__spark" aria-hidden="true">⚡</span>
        <span className="promo-banner__label">{t('promo.label')}</span>
        <span className="promo-banner__amount">{t('promo.amount')}</span>
        <span className="promo-banner__window">{t('promo.window')}</span>
      </p>

      {timeLeft.done ? (
        <p className="promo-banner__ended">{t('promo.ended')}</p>
      ) : (
        <div className="promo-countdown" aria-live="polite">
          {units.map((unit, i) => (
            <div className="promo-countdown__group" key={unit.label}>
              <div className="promo-countdown__unit">
                <span className="promo-countdown__value">{pad(unit.value)}</span>
                <span className="promo-countdown__label">{unit.label}</span>
              </div>
              {i < units.length - 1 && (
                <span className="promo-countdown__sep" aria-hidden="true">:</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
