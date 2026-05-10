import { Star } from '@/components/ui/Star';
import { FakeQR } from '@/components/ui/FakeQR';
import type { Tweaks } from '@/types/tweaks';

export interface RegisterProps {
  tweaks: Tweaks;
}

export function Register({ tweaks }: RegisterProps) {
  return (
    <section className="shell register" id="register">
      <div className="register-card">
        <div className="register-left">
          <div className="register-cohort">
            <span className="blink" />
            <span>Cohort 03 · enrolling now · 12 seats left</span>
          </div>
          <h2>
            Register today.
            <br />
            Build by next month.
          </h2>
          <p>
            One registration. Four weekends. A real product in your hands — and the confidence to
            keep building long after the cohort ends.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#">
              <button className="btn btn-primary">Register now →</button>
            </a>
            <a href="#">
              <button className="btn btn-ghost">Talk to us first</button>
            </a>
          </div>
          <div className="register-perks">
            <span>✓ Live sessions</span>
            <span>✓ Project review</span>
            <span>✓ Cohort group</span>
          </div>
        </div>
        <div className="register-right">
          <Star
            size={60}
            color="#B9FF66"
            stroke="#B9FF66"
            style={{ position: 'absolute', top: 24, right: 24, opacity: 0.7 }}
          />
          <div
            style={{
              fontSize: 13,
              color: '#B9FF66',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Scan to enroll
          </div>
          <div className="qr-frame">
            <FakeQR pattern={tweaks.qrPattern} size={200} />
          </div>
          <div className="qr-caption">
            <strong>buildwithai.io/cohort-03</strong>
            <br />
            Or tap "Register now" — same destination.
          </div>
        </div>
      </div>
    </section>
  );
}
