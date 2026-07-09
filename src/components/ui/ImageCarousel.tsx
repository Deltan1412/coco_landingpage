import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft } from '@/components/ui/ArrowLeft';
import { ArrowRight } from '@/components/ui/ArrowRight';

export interface CarouselSlide {
  src: string;
  alt: string;
}

export interface ImageCarouselProps {
  slides: CarouselSlide[];
  /** ms between automatic advances */
  interval?: number;
  /** Externally suspend autoplay — e.g. while this project is off-centre. */
  paused?: boolean;
  labels: {
    prev: string;
    next: string;
    /** Receives the 1-based slide number. */
    goTo: (n: number) => string;
  };
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ImageCarousel({
  slides,
  interval = 4000,
  paused = false,
  labels,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const count = slides.length;
  // Autoplay reads the live index without re-arming the timer on every tick.
  const indexRef = useRef(index);
  indexRef.current = index;

  const goTo = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);
  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);

  useEffect(() => {
    if (count < 2 || paused || held || prefersReducedMotion()) return;
    const id = window.setInterval(() => goTo(indexRef.current + 1), interval);
    return () => window.clearInterval(id);
  }, [count, paused, held, interval, goTo]);

  const hold = () => setHeld(true);
  const release = () => setHeld(false);

  return (
    <div
      className="pd-carousel"
      role="group"
      aria-roledescription="carousel"
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocusCapture={hold}
      onBlurCapture={release}
    >
      <div className="pd-viewport">
        <div className="pd-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, i) => (
            <div
              className="pd-slide"
              key={slide.src}
              aria-hidden={i !== index}
              aria-roledescription="slide"
              aria-label={labels.goTo(i + 1)}
            >
              {/* The opening slide is eager: a peeking, off-centre card is on
                  screen but its images sit outside the clipped viewport, so
                  lazy-loading would leave it visibly blank. Later slides stay
                  lazy — the browser preloads one ahead of the autoplay. */}
              <img
                src={slide.src}
                alt={slide.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              className="pd-arrow pd-arrow-left"
              onClick={prev}
              aria-label={labels.prev}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              className="pd-arrow pd-arrow-right"
              onClick={next}
              aria-label={labels.next}
            >
              <ArrowRight />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="pd-dots">
          {slides.map((slide, i) => (
            <button
              type="button"
              key={slide.src}
              className={`pd-dot${i === index ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={labels.goTo(i + 1)}
              aria-current={i === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
