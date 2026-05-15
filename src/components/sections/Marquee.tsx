import { Fragment } from 'react';
import { Star } from '@/components/ui/Star';
import { MARQUEE_ITEMS } from '@/data/marquee';
import { useLang } from '@/hooks/useLang';

export function Marquee() {
  const { lang } = useLang();
  const items = MARQUEE_ITEMS.map((it) => it[lang]);
  const repeated = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {repeated.map((t, i) => (
          <Fragment key={i}>
            <span>{t}</span>
            <Star size={28} color="#fff26b" stroke="#fff26b" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
