import { SectionHeader } from '@/components/ui/SectionHeader';
import { PRODUCTS } from '@/data/products';
import { PRODUCT_MOCKS } from '@/components/products';

export function Products() {
  return (
    <section className="shell" id="products">
      <SectionHeader tag="Build it yourself" tagStyle="lime">
        Three real products, one cohort. By the end of week 4, you'll have shipped the one that
        matters most for your job.
      </SectionHeader>
      <div className="products">
        {PRODUCTS.map((it, i) => {
          const Mock = PRODUCT_MOCKS[it.mock];
          return (
            <div key={i} className={`product-card ${it.tone}`}>
              <span className="product-role">{it.role}</span>
              <h3>{it.title}</h3>
              <p className="by">{it.by}</p>
              <Mock />
            </div>
          );
        })}
      </div>
    </section>
  );
}
