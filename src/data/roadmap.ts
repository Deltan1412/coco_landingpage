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
    title: { en: 'Claude AI Environment', vi: 'Khai phá Môi trường Claude' },
    sub: { en: '3 hours | 100% Practical', vi: '3 giờ | 100% Thực hành' },
    desc: {
      en:
        'Understand how Claude Code and Claude AI process data. Use Artifacts to build slides, proposals, or landing pages.',
      vi:
        'Hiểu cách Claude Code và Claude AI xử lý dữ liệu. Trực tiếp thiết kế Slide thuyết trình, Proposal hoặc Landing Page bằng Artifacts.',
    },
    deliverable: { en: '↪ Slide, Proposal, or Landing Page', vi: '↪ Slide, Proposal, hoặc Landing Page' },
    tone: 'paper',
  },
  {
    n: '02',
    weekNum: 2,
    title: { en: 'Systems & Tokenomics', vi: 'Tư duy Hệ thống & Prompting' },
    sub: { en: '3 hours | 100% Practical', vi: '3 giờ | 100% Thực hành' },
    desc: {
      en:
        'Master tokenomics, prevent memory loss in long documents, and control output quality above 80% using custom prompt frames.',
      vi:
        'Làm chủ ngân sách hiệu năng và Tokenomics, ngăn Claude bị "mất trí nhớ". Xây dựng khung prompt để kiểm soát chất lượng kết quả.',
    },
    deliverable: { en: '↪ Standardized custom prompt frames', vi: '↪ Bộ khung Prompt chuẩn hóa' },
    tone: 'lime',
  },
  {
    n: '03',
    weekNum: 3,
    title: { en: 'Idea to MVP & Projects', vi: 'Từ Ý tưởng đến MVP' },
    sub: { en: '3 hours | 100% Practical', vi: '3 giờ | 100% Thực hành' },
    desc: {
      en:
        'Configure Projects, Custom Instructions, and Knowledge Bases. Let Claude analyze multi-source data (images, sheets, docs) to build a prototype.',
      vi:
        'Thiết lập Claude Projects, Custom Instructions và Knowledge Base. Phân tích dữ liệu đa nguồn để dựng bản chạy thử MVP.',
    },
    deliverable: { en: '↪ Working Prototype & Claude Project', vi: '↪ Claude Project & bản chạy thử MVP' },
    tone: 'dark',
  },
  {
    n: '04',
    weekNum: 4,
    title: { en: 'Business Automation', vi: 'Tự động hóa Quy trình' },
    sub: { en: '3 hours | 100% Practical', vi: '3 giờ | 100% Thực hành' },
    desc: {
      en:
        'Complete and present your AI automation application. Receive expert review and design a long-term roadmap to scale after the cohort.',
      vi:
        'Hoàn thiện và trình bày dự án tự động hóa. Nhận đánh giá chuyên môn từ giảng viên và thiết lập lộ trình phát triển dài hạn.',
    },
    deliverable: { en: '↪ Demo Day & Scaling Roadmap', vi: '↪ Ngày Demo & Lộ trình mở rộng' },
    tone: 'paper',
  },
];
