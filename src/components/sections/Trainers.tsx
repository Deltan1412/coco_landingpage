import { Star } from '@/components/ui/Star';
import { TrainerAvatar } from '@/components/ui/TrainerAvatar';
import { TRAINERS } from '@/data/trainers';
import type { Tweaks } from '@/types/tweaks';
import { useLang } from '@/hooks/useLang';

export interface TrainersProps {
  tweaks: Tweaks;
}

export function Trainers({ tweaks }: TrainersProps) {
  const { lang, t } = useLang();

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
          <span className="tag">{t('trainers.tag')}</span>
          <p>{t('trainers.header')}</p>
        </div>
        <div className="trainer-grid">
          {TRAINERS.map((tr, i) => (
            <div key={i} className="trainer">
              <TrainerAvatar initials={tr.initials} hue={tr.hue} photo={tr.photo} name={tr.name} />
              <div className="trainer-meta">
                <span className="role-pill">{tr.role[lang]}</span>
                <h3 className="name">{tr.name}</h3>
                <p className="occ">{tr.occ[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
