import { useEffect, useState } from 'react';
import type { Tweaks } from '@/types/tweaks';
import { HeroArt } from './HeroArt';
import { REGISTER_LINK } from '@/constants/links';
import { useLang } from '@/hooks/useLang';

export interface HeroProps {
  tweaks: Tweaks;
}

const TYPE_SPEED_MS = 110;
const DELETE_SPEED_MS = 70;
const HOLD_MS = 1400;

function TypingWord() {
  const { t } = useLang();
  const words = [t('hero.typing.code'), t('hero.typing.ask')];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

  // Reset typing when language changes
  useEffect(() => {
    setWordIndex(0);
    setText('');
    setPhase('typing');
  }, [words[0], words[1]]);

  useEffect(() => {
    const current = words[wordIndex];
    let delay = TYPE_SPEED_MS;

    if (phase === 'typing') {
      if (text === current) {
        delay = HOLD_MS;
        const tm = setTimeout(() => setPhase('deleting'), delay);
        return () => clearTimeout(tm);
      }
      const tm = setTimeout(() => setText(current.slice(0, text.length + 1)), delay);
      return () => clearTimeout(tm);
    }

    if (phase === 'deleting') {
      if (text === '') {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase('typing');
        return;
      }
      const tm = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED_MS);
      return () => clearTimeout(tm);
    }
  }, [text, phase, wordIndex, words]);

  return (
    <i className="typing-word">
      {text}
      <span className="typing-caret" aria-hidden="true">|</span>
    </i>
  );
}

export function Hero({ tweaks }: HeroProps) {
  const { t } = useLang();

  const renderHeadline = () => {
    if (tweaks.headlineStyle === 'underline') {
      return (
        <h1>
          {t('hero.headline.plainTop')}
          <br />
          {t('hero.headline.underlineBottomPre')}
          <span className="mark-line">{t('hero.headline.underlineBuild')}</span>
          {t('hero.headline.underlineBottomPost')}
        </h1>
      );
    }
    if (tweaks.headlineStyle === 'plain') {
      return (
        <h1>
          {t('hero.headline.plainTop')}
          <br />
          {t('hero.headline.plainBottom')}
        </h1>
      );
    }
    return (
      <h1>
        {t('hero.headline.part1')} <TypingWord />.
        <br />
        {t('hero.headline.part2')} <span className="mark-lime">{t('hero.headline.build')}</span> {t('hero.headline.with')}
      </h1>
    );
  };

  return (
    <section className="hero shell" id="course">
      <div>
        {renderHeadline()}
        <p className="lede">{t('hero.lede')}</p>
        <div className="hero-ctas">
          <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-primary">{t('hero.cta.reserve')}</button>
          </a>
          <a href="#products">
            <button className="btn btn-ghost">{t('hero.cta.journey')}</button>
          </a>
        </div>
      </div>
      <HeroArt />
    </section>
  );
}
