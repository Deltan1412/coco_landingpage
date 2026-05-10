import type { ComponentType } from 'react';
import type { ProductMockKey } from '@/data/products';
import { ProductMockMarketing } from './ProductMockMarketing';
import { ProductMockSales } from './ProductMockSales';
import { ProductMockEducators } from './ProductMockEducators';

export { ProductMockMarketing, ProductMockSales, ProductMockEducators };

export const PRODUCT_MOCKS: Record<ProductMockKey, ComponentType> = {
  marketing: ProductMockMarketing,
  sales: ProductMockSales,
  educators: ProductMockEducators,
};
