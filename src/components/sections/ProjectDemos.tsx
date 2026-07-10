import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { PROJECT_DEMOS } from '@/data/projectDemos';
import { useLang } from '@/hooks/useLang';
import '@/styles/project-demos.css';

const COPIES = 3;

export function ProjectDemos() {
  const { lang, t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const count = PROJECT_DEMOS.length;
  // Render the projects three times so the rail always has real content peeking
  // on both sides. We live in the middle copy and snap back to it whenever the
  // scroll drifts into an edge copy — an invisible jump (identical neighbours),
  // which lets the carousel loop rightwards forever.
  const start = count;
  const slides = Array.from({ length: COPIES * count }, (_, i) => PROJECT_DEMOS[i % count]);

  const [centerIdx, setCenterIdx] = useState(start);
  const posRef = useRef(start);
  const hoverRef = useRef(false);

  const scrollToCard = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Start centred on the middle copy before paint (no flash).
  useLayoutEffect(() => {
    scrollToCard(start, false);
    posRef.current = start;
  }, [scrollToCard, start]);

  // Track the centred card; when the scroll settles in an edge copy, jump by one
  // copy back to the middle — same project, same neighbours, so it's invisible.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let endTimer = 0;
    const measure = () => {
      const centre = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let min = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const distance = Math.abs(card.offsetLeft + card.clientWidth / 2 - centre);
        if (distance < min) {
          min = distance;
          closest = i;
        }
      });
      posRef.current = closest;
      setCenterIdx(closest);
    };
    const recentre = () => {
      const p = posRef.current;
      if (p >= 2 * count) scrollToCard(p - count, false);
      else if (p < count) scrollToCard(p + count, false);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
      clearTimeout(endTimer);
      endTimer = window.setTimeout(recentre, 140);
    };

    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(endTimer);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count, scrollToCard]);

  // Auto-advance one project to the right every 3s. Pauses on hover; disabled
  // under reduced-motion.
  useEffect(() => {
    if (count <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (hoverRef.current) return;
      scrollToCard(posRef.current + 1, true);
    }, 3000);
    return () => clearInterval(id);
  }, [count, scrollToCard]);

  const activeDot = ((centerIdx % count) + count) % count;

  return (
    <section className="pd-section" id="products">
      {/* Only the header is contained; the rail runs edge-to-edge so the
          neighbouring projects peek at the sides. */}
      <div className="shell">
        <SectionHeader tag={t('products.tag')} tagStyle="lime">
          {t('products.header')}
        </SectionHeader>
      </div>

      <div
        className="pd-stage"
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
        }}
      >
        <div
          className="pd-rail"
          ref={trackRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={t('products.tag')}
        >
          {slides.map((project, i) => {
            const isActive = i === centerIdx;
            const isMiddleCopy = Math.floor(i / count) === 1;
            return (
              <article
                className={`pd-card${isActive ? ' is-active' : ''}`}
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                aria-roledescription="slide"
                aria-hidden={!isMiddleCopy || undefined}
                aria-label={`${project.title[lang]} — ${(i % count) + 1} / ${count}`}
              >
                <header className="pd-head">
                  <h3>{project.title[lang]}</h3>
                  <p>{project.description[lang]}</p>
                </header>

                <ImageCarousel
                  paused={!isActive}
                  slides={project.images.map((image) => ({
                    src: image.src,
                    alt: image.alt[lang],
                  }))}
                  labels={{
                    prev: t('projects.prevImage'),
                    next: t('projects.nextImage'),
                    goTo: (n) => `${t('projects.goToImage')} ${n}`,
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>

      <div className="pd-pager">
        {PROJECT_DEMOS.map((project, i) => (
          <button
            type="button"
            key={project.id}
            className={`pd-pager-dot${i === activeDot ? ' is-active' : ''}`}
            onClick={() => scrollToCard(start + i)}
            aria-label={`${t('projects.goToProject')} ${project.title[lang]}`}
            aria-current={i === activeDot}
          />
        ))}
      </div>
    </section>
  );
}
