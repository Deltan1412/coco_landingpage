interface LocalizedField {
  en: string;
  vi: string;
}

export type WeekTone = 'paper' | 'lime' | 'dark';

export interface RoadmapWeek {
  n: string;
  /** Week number as a digit, label is built from translations + this number */
  weekNum: number;
  title: LocalizedField;
  sub: LocalizedField;
  desc: LocalizedField;
  deliverable: LocalizedField;
  tone: WeekTone;
}

export const ROADMAP: RoadmapWeek[] = [
  {
    n: '01',
    weekNum: 1,
    title: { en: 'Prompting techniques', vi: 'Kỹ thuật prompt' },
    sub: { en: 'From idea to MVP', vi: 'Từ ý tưởng đến MVP' },
    desc: {
      en:
        'Learn how to talk to AI like a builder, not a tourist. Structure prompts that turn rough ideas into working drafts.',
      vi:
        'Học cách trò chuyện với AI như một builder, không phải khách du lịch. Cấu trúc prompt giúp biến ý tưởng thô thành bản nháp hoạt động được.',
    },
    deliverable: { en: '↪ Your first MVP prompt', vi: '↪ Prompt MVP đầu tiên của bạn' },
    tone: 'paper',
  },
  {
    n: '02',
    weekNum: 2,
    title: { en: 'Fundamentals', vi: 'Nền tảng' },
    sub: { en: 'Advantages & limitations of AI', vi: 'Ưu điểm & giới hạn của AI' },
    desc: {
      en:
        "Know when AI is the right tool, and when it isn't. Build mental models that age well as the tools change.",
      vi:
        'Biết khi nào AI là lựa chọn đúng và khi nào không. Xây dựng mô hình tư duy bền vững dù công cụ có thay đổi.',
    },
    deliverable: { en: '↪ Working knowledge map', vi: '↪ Bản đồ kiến thức ứng dụng' },
    tone: 'lime',
  },
  {
    n: '03',
    weekNum: 3,
    title: { en: 'MVP + AI Agents', vi: 'MVP + AI Agents' },
    sub: { en: 'Give your AI tools to work with', vi: 'Trang bị công cụ cho AI của bạn' },
    desc: {
      en:
        'Connect your AI to spreadsheets, emails and APIs. Move from chatbot to coworker that actually does the task.',
      vi:
        'Kết nối AI của bạn với bảng tính, email và API. Từ chatbot trở thành đồng nghiệp thực sự làm được việc.',
    },
    deliverable: { en: '↪ A small, working agent', vi: '↪ Một AI agent nhỏ hoạt động được' },
    tone: 'dark',
  },
  {
    n: '04',
    weekNum: 4,
    title: { en: 'Ship your project', vi: 'Ra mắt dự án của bạn' },
    sub: {
      en: 'Your first personal, functional product',
      vi: 'Sản phẩm cá nhân, hoạt động đầu tiên của bạn',
    },
    desc: {
      en:
        'Polish, test and demo your build to the cohort. Walk away with one real thing you made, and the muscle to make the next one.',
      vi:
        'Hoàn thiện, kiểm thử và demo sản phẩm trước lớp. Mang về một sản phẩm thật do bạn tạo ra và bản lĩnh để làm tiếp sản phẩm sau.',
    },
    deliverable: { en: '↪ Demo day', vi: '↪ Ngày demo' },
    tone: 'paper',
  },
];
