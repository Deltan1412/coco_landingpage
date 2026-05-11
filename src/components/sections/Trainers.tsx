import { Star } from '@/components/ui/Star';
import { TrainerAvatar } from '@/components/ui/TrainerAvatar';
import { TRAINERS } from '@/data/trainers';
import type { Tweaks } from '@/types/tweaks';

export interface TrainersProps {
  tweaks: Tweaks;
}

export function Trainers({ tweaks }: TrainersProps) {
  return (
    <section className="shell" id="trainers">
      <div className="trainers">
        {tweaks.showStars && (
          <>
            <div className="star-deco tr1">
              <Star size={200} color="#fff26b" stroke="#fff26b" />
            </div>
            <div className="star-deco tr2">
              <Star size={140} color="#fff26b" stroke="#fff26b" />
            </div>
          </>
        )}
        <div className="sec-head">
          <span className="tag">You're not learning alone</span>
          <p>
            Meet the trainers walking with you for the next 4 weeks. Real builders who've shipped
            real products — and now help you ship yours.
          </p>
        </div>
        <div className="trainer-grid">
          {TRAINERS.map((t, i) => (
            <div key={i} className="trainer">
              <TrainerAvatar initials={t.initials} hue={t.hue} />
              <div className="trainer-meta">
                <span className="role-pill">{t.role}</span>
                <h3 className="name">{t.name}</h3>
                <p className="occ">{t.occ}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
