import { Fragment } from 'react';
import { Star } from '@/components/ui/Star';
import { MARQUEE_ITEMS } from '@/data/marquee';

export function Marquee() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
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
