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
    role: { en: 'For Marketers', vi: 'Dành cho Marketer' },
    title: { en: 'Automatic Posts Planner', vi: 'Lập kế hoạch bài đăng tự động' },
    by: {
      en:
        'Plan and draft a month of social posts, newsletters and threads from one prompt, across every channel you own.',
      vi:
        'Lên kế hoạch và soạn cả tháng bài đăng, newsletter và thread chỉ từ một prompt, cho mọi kênh bạn sở hữu.',
    },
    tone: 'paper',
    mock: 'marketing',
  },
  {
    role: { en: 'For Sellers', vi: 'Dành cho Sales' },
    title: { en: 'Customer Insights Extractor', vi: 'Trích xuất insight khách hàng' },
    by: {
      en:
        'Turn calls, emails and tickets into objections, themes and winning phrases, without listening to a single recording yourself.',
      vi:
        'Biến cuộc gọi, email và ticket thành các phản đối, chủ đề và câu chốt đắt giá mà không cần nghe lại bất kỳ bản ghi nào.',
    },
    tone: 'lime',
    mock: 'sales',
  },
  {
    role: { en: 'For Educators', vi: 'Dành cho Giáo viên' },
    title: { en: 'Educating Materials Generator', vi: 'Tạo tài liệu giảng dạy' },
    by: {
      en:
        "From a single topic, generate lesson plans, worksheets, flashcards and quizzes, tailored to your students' level.",
      vi:
        'Từ một chủ đề duy nhất, tạo giáo án, phiếu bài tập, flashcard và bài kiểm tra phù hợp với trình độ học sinh.',
    },
    tone: 'dark',
    mock: 'educators',
  },
];

export const localize = (field: LocalizedField, lang: Lang) => field[lang] ?? field.en;
