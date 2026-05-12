import { useEffect, useState } from 'react';
import type { Tweaks } from '@/types/tweaks';
import { HeroArt } from './HeroArt';
import { REGISTER_LINK } from '@/constants/links';

export interface HeroProps {
  tweaks: Tweaks;
}

const TYPING_WORDS = ['code', 'ask'];
const TYPE_SPEED_MS = 110;
const DELETE_SPEED_MS = 70;
const HOLD_MS = 1400;

function TypingWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

  useEffect(() => {
    const current = TYPING_WORDS[wordIndex];
    let delay = TYPE_SPEED_MS;

    if (phase === 'typing') {
      if (text === current) {
        delay = HOLD_MS;
        const t = setTimeout(() => setPhase('deleting'), delay);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setText(current.slice(0, text.length + 1)), delay);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (text === '') {
        setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
        setPhase('typing');
        return;
      }
      const t = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED_MS);
      return () => clearTimeout(t);
    }
  }, [text, phase, wordIndex]);

  return (
    <i className="typing-word">
      {text}
      <span className="typing-caret" aria-hidden="true">|</span>
    </i>
  );
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
        You don't <TypingWord />.
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
          an idea. Walk out with a working AI product, built by you, supported by us.
        </p>
        <div className="hero-ctas">
          <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-primary">Reserve your seat</button>
          </a>
          <a href="#products">
            <button className="btn btn-ghost">See the journey ↓</button>
          </a>
        </div>
      </div>
      <HeroArt />
    </section>
  );
}
