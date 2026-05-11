import { SectionHeader } from '@/components/ui/SectionHeader';
import { Star } from '@/components/ui/Star';
import { ROADMAP } from '@/data/roadmap';
import { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft } from '@/components/ui/ArrowLeft';
import { ArrowRight } from '@/components/ui/ArrowRight';

export function Roadmap() {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Function to scroll to a specific index
  const scrollToCard = useCallback((index: number) => {
    if (roadmapRef.current && itemRefs.current[index]) {
      const card = itemRefs.current[index];
      const container = roadmapRef.current;
      // Calculate scrollLeft to center the card
      const scrollLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, []);

  // Handle scroll event to determine active index
  const handleScroll = useCallback(() => {
    if (roadmapRef.current && itemRefs.current.length > 0) {
      const scrollLeft = roadmapRef.current.scrollLeft;
      const containerWidth = roadmapRef.current.clientWidth;

      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((card, index) => {
        if (card) {
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const containerCenter = scrollLeft + containerWidth / 2;
          const distance = Math.abs(cardCenter - containerCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });
      setActiveIndex(closestIndex);
    }
  }, []);

  useEffect(() => {
    const container = roadmapRef.current;
    if (container) {
      // Set initial active index
      handleScroll();
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  // Click handlers for arrows
  const goToPrev = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex < ROADMAP.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  return (
    <section className="shell" id="roadmap">
      <SectionHeader tag="The 4-week roadmap" tagStyle="lime">
        Four weeks. Four immortal skills. The kind that stay useful even when the tools change names
        again next year.
      </SectionHeader>
      <div className="relative roadmap-carousel-container"> {/* Added relative positioning and class for arrows */}
        <div className="roadmap-grid" ref={roadmapRef}>
          {ROADMAP.map((w, i) => (
            <div
              key={i}
              className={`week ${w.tone}`}
              ref={(el) => (itemRefs.current[i] = el)} // Added ref to each card
            >
              <div className="num-row">
                <span className="week-label">{w.label}</span>
                <Star
                  size={28}
                  color={w.tone === 'lime' ? '#191A23' : '#fff26b'}
                  stroke="#191A23"
                />
              </div>
              <div className="num">{w.n}</div>
              <h3>
                {w.title}
                <br />
                <span style={{ fontWeight: 400, fontSize: 18, opacity: 0.85 }}>{w.sub}</span>
              </h3>
              <p className="desc">{w.desc}</p>
              <span className="deliverable">{w.deliverable}</span>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {activeIndex > 0 && (
          <button
            onClick={goToPrev}
            className="roadmap-carousel-arrow roadmap-carousel-arrow-left" // Added specific classes for styling
            aria-label="Previous week"
          >
            <ArrowLeft />
          </button>
        )}
        {/* Right Arrow */}
        {activeIndex < ROADMAP.length - 1 && (
          <button
            onClick={goToNext}
            className="roadmap-carousel-arrow roadmap-carousel-arrow-right" // Added specific classes for styling
            aria-label="Next week"
          >
            <ArrowRight />
          </button>
        )}
      </div>
    </section>
  );
}
