import { SectionHeader } from '@/components/ui/SectionHeader';
import { PRODUCTS } from '@/data/products';
import { PRODUCT_MOCKS } from '@/components/products';
import { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft } from '@/components/ui/ArrowLeft';
import { ArrowRight } from '@/components/ui/ArrowRight';

export function Products() {
  const productsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Function to scroll to a specific index
  const scrollToCard = useCallback((index: number) => {
    if (productsRef.current && itemRefs.current[index]) {
      const card = itemRefs.current[index];
      const container = productsRef.current;
      // Calculate scrollLeft to center the card
      const scrollLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, []);

  // Handle scroll event to determine active index
  const handleScroll = useCallback(() => {
    if (productsRef.current && itemRefs.current.length > 0) {
      const scrollLeft = productsRef.current.scrollLeft;
      const containerWidth = productsRef.current.clientWidth;

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
    const container = productsRef.current;
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
    if (activeIndex < PRODUCTS.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  return (
    <section className="shell" id="products">
      <SectionHeader tag="Build it yourself" tagStyle="lime">
        Three real products, one cohort. By the end of week 4, you'll have shipped the one that
        matters most for your job.
      </SectionHeader>
      <div className="relative product-carousel-container"> {/* Added relative positioning and class for arrows */}
        <div className="products" ref={productsRef}>
          {PRODUCTS.map((it, i) => {
            const Mock = PRODUCT_MOCKS[it.mock];
            return (
              <div
                key={i}
                className={`product-card ${it.tone}`}
                ref={(el) => (itemRefs.current[i] = el)} // Added ref to each card
              >
                <span className="product-role">{it.role}</span>
                <h3>{it.title}</h3>
                <p className="by">{it.by}</p>
                <Mock />
              </div>
            );
          })}
        </div>

        {/* Left Arrow */}
        {activeIndex > 0 && (
          <button
            onClick={goToPrev}
            className="product-carousel-arrow product-carousel-arrow-left" // Added specific classes for styling
            aria-label="Previous product"
          >
            <ArrowLeft />
          </button>
        )}
        {/* Right Arrow */}
        {activeIndex < PRODUCTS.length - 1 && (
          <button
            onClick={goToNext}
            className="product-carousel-arrow product-carousel-arrow-right" // Added specific classes for styling
            aria-label="Next product"
          >
            <ArrowRight />
          </button>
        )}
      </div>
    </section>
  );
}
