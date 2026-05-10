import type { Tweaks } from '@/types/tweaks';
import { HeroArt } from './HeroArt';

export interface HeroProps {
  tweaks: Tweaks;
}

export function Hero({ tweaks }: HeroProps) {
  const renderHeadline = () => {
    if (tweaks.headlineStyle === 'underline') {
      return (
        <h1>
          You don't need to code.
          <br />
          You need to <span className="mark-line">build</span> with AI.
        </h1>
      );
    }
    if (tweaks.headlineStyle === 'plain') {
      return (
        <h1>
          You don't need to code.
          <br />
          You need to build with AI.
        </h1>
      );
    }
    return (
      <h1>
        You don't <i>code</i>.
        <br />
        You <span className="mark-lime">build</span> with AI.
      </h1>
    );
  };

  return (
    <section className="hero shell" id="course">
      <div>
        {renderHeadline()}
        <p className="lede">
          A 4-week, hands-on course for marketers, sellers, operators and educators. Walk in with
          an idea. Walk out with a working AI product — built by you, supported by us.
        </p>
        <div className="hero-ctas">
          <a href="#register">
            <button className="btn btn-primary">Reserve your seat</button>
          </a>
          <a href="#roadmap">
            <button className="btn btn-ghost">See the journey ↓</button>
          </a>
        </div>
      </div>
      <HeroArt />
    </section>
  );
}
