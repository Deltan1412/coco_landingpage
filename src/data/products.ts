import type { Lang } from '@/hooks/useLang';

export type ProductTone = 'paper' | 'lime' | 'dark';
export type ProductMockKey = 'marketing' | 'sales' | 'educators';

interface LocalizedField {
  en: string;
  vi: string;
}

export interface ProductItem {
  role: LocalizedField;
  title: LocalizedField;
  by: LocalizedField;
  tone: ProductTone;
  mock: ProductMockKey;
}

export const PRODUCTS: ProductItem[] = [
  {
    role: { en: 'Module 1 Project', vi: 'Dự án Mô-đun 1' },
    title: { en: 'Slides & Proposal Builder', vi: 'Tạo Slide & Proposal tự động' },
    by: {
      en:
        'Generate polished presentation slides and business proposals in minutes using Claude Artifacts.',
      vi:
        'Tạo slide thuyết trình và đề xuất dự án chuyên nghiệp trong vài phút qua tính năng Artifacts.',
    },
    tone: 'paper',
    mock: 'marketing',
  },
  {
    role: { en: 'Module 3 Project', vi: 'Dự án Mô-đun 3' },
    title: { en: 'Multi-Source Data Workflow', vi: 'Xử lý dữ liệu đa phương tiện' },
    by: {
      en:
        'Build automated workflows that parse images, spreadsheet files, and PDFs to generate custom reports and charts.',
      vi:
        'Xây dựng quy trình tự động phân tích hình ảnh, file Excel và PDF để tạo báo cáo và biểu đồ tùy chỉnh.',
    },
    tone: 'lime',
    mock: 'sales',
  },
  {
    role: { en: 'E-commerce Case Study', vi: 'Dự án Doanh nghiệp' },
    title: { en: 'CR Fashion Fanpage Bot & ERP', vi: 'Hệ thống Fanpage CR Fashion' },
    by: {
      en:
        'Connect Claude with Pancake, Viettel Post, and GHN to automate order tracking, prevent missed messages, and boost retention.',
      vi:
        'Kết nối Claude với Pancake, Viettel Post và GHN để tự động theo dõi đơn hàng, chống sót tin nhắn và giữ chân khách hàng.',
    },
    tone: 'dark',
    mock: 'educators',
  },
];

export const localize = (field: LocalizedField, lang: Lang) => field[lang] ?? field.en;
