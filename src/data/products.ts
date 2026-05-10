export type ProductTone = 'paper' | 'lime' | 'dark';
export type ProductMockKey = 'marketing' | 'sales' | 'educators';

export interface ProductItem {
  role: string;
  title: string;
  by: string;
  tone: ProductTone;
  mock: ProductMockKey;
}

export const PRODUCTS: ProductItem[] = [
  {
    role: 'For Marketers',
    title: 'Automatic Posts Planner',
    by: 'Plan and draft a month of social posts, newsletters and threads from one prompt — across every channel you own.',
    tone: 'paper',
    mock: 'marketing',
  },
  {
    role: 'For Sellers',
    title: 'Customer Insights Extractor',
    by: 'Turn calls, emails and tickets into objections, themes and winning phrases — without listening to a single recording yourself.',
    tone: 'lime',
    mock: 'sales',
  },
  {
    role: 'For Educators',
    title: 'Educating Materials Generator',
    by: "From a single topic, generate lesson plans, worksheets, flashcards and quizzes — tailored to your students' level.",
    tone: 'dark',
    mock: 'educators',
  },
];
