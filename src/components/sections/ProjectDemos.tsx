import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { ArrowLeft } from '@/components/ui/ArrowLeft';
import { ArrowRight } from '@/components/ui/ArrowRight';
import { PROJECT_DEMOS } from '@/data/projectDemos';
import { useLang } from '@/hooks/useLang';
import '@/styles/project-demos.css';

export function ProjectDemos() {
  const { lang, t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = PROJECT_DEMOS.length;

  const scrollToCard = useCallback((index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: 'smooth',
    });
  }, []);

  // Derive the centred card from scroll position, so native swipe, trackpad,
  // and the arrow buttons all agree on which project is active.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
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
      setActiveIndex(closest);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="pd-section" id="products">
      {/* Not .shell — the rail runs edge to edge; only the header is contained. */}
      <div className="shell">
        <SectionHeader tag={t('products.tag')} tagStyle="lime">
          {t('products.header')}
        </SectionHeader>
      </div>

      <div className="pd-stage">
        <div
          className="pd-rail"
          ref={trackRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={t('products.tag')}
        >
          {PROJECT_DEMOS.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <article
                className={`pd-card${isActive ? ' is-active' : ''}`}
                key={project.id}
                id={project.id}
                ref={(el) => (cardRefs.current[i] = el)}
                aria-roledescription="slide"
                aria-label={`${project.title[lang]} — ${i + 1} / ${count}`}
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

        {activeIndex > 0 && (
          <button
            type="button"
            className="pd-nav pd-nav-left"
            onClick={() => scrollToCard(activeIndex - 1)}
            aria-label={t('projects.prevProject')}
          >
            <ArrowLeft />
          </button>
        )}
        {activeIndex < count - 1 && (
          <button
            type="button"
            className="pd-nav pd-nav-right"
            onClick={() => scrollToCard(activeIndex + 1)}
            aria-label={t('projects.nextProject')}
          >
            <ArrowRight />
          </button>
        )}
      </div>

      <div className="pd-pager">
        {PROJECT_DEMOS.map((project, i) => (
          <button
            type="button"
            key={project.id}
            className={`pd-pager-dot${i === activeIndex ? ' is-active' : ''}`}
            onClick={() => scrollToCard(i)}
            aria-label={`${t('projects.goToProject')} ${project.title[lang]}`}
            aria-current={i === activeIndex}
          />
        ))}
      </div>
    </section>
  );
}
