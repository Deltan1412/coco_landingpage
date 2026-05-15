import { SectionHeader } from '@/components/ui/SectionHeader';
import { PRODUCTS } from '@/data/products';
import { PRODUCT_MOCKS } from '@/components/products';
import { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft } from '@/components/ui/ArrowLeft';
import { ArrowRight } from '@/components/ui/ArrowRight';
import { useLang } from '@/hooks/useLang';

export function Products() {
  const productsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { lang, t } = useLang();

  const scrollToCard = useCallback((index: number) => {
    if (productsRef.current && itemRefs.current[index]) {
      const card = itemRefs.current[index];
      const container = productsRef.current;
      const scrollLeft = card!.offsetLeft - (container.clientWidth - card!.clientWidth) / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, []);

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
      handleScroll();
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const goToPrev = () => {
    if (activeIndex > 0) scrollToCard(activeIndex - 1);
  };

  const goToNext = () => {
    if (activeIndex < PRODUCTS.length - 1) scrollToCard(activeIndex + 1);
  };

  return (
    <section className="shell" id="products">
      <SectionHeader tag={t('products.tag')} tagStyle="lime">
        {t('products.header')}
      </SectionHeader>
      <div className="relative product-carousel-container">
        <div className="products" ref={productsRef}>
          {PRODUCTS.map((it, i) => {
            const Mock = PRODUCT_MOCKS[it.mock];
            return (
              <div
                key={i}
                className={`product-card ${it.tone}`}
                ref={(el) => (itemRefs.current[i] = el)}
              >
                <span className="product-role">{it.role[lang]}</span>
                <h3>{it.title[lang]}</h3>
                <p className="by">{it.by[lang]}</p>
                <Mock />
              </div>
            );
          })}
        </div>

        {activeIndex > 0 && (
          <button
            onClick={goToPrev}
            className="product-carousel-arrow product-carousel-arrow-left"
            aria-label={t('products.prevAria')}
          >
            <ArrowLeft />
          </button>
        )}
        {activeIndex < PRODUCTS.length - 1 && (
          <button
            onClick={goToNext}
            className="product-carousel-arrow product-carousel-arrow-right"
            aria-label={t('products.nextAria')}
          >
            <ArrowRight />
          </button>
        )}
      </div>
    </section>
  );
}
