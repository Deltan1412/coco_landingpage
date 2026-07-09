import type { Translation } from '@/data/translations';

export interface ProjectDemoImage {
  /** Path relative to /public — served from the site root. */
  src: string;
  alt: Translation;
}

export interface ProjectDemo {
  /** Stable key, also used as the anchor id. */
  id: string;
  title: Translation;
  description: Translation;
  images: ProjectDemoImage[];
}

/**
 * Demo projects shown in the #products section, rendered top-to-bottom in this
 * order. To add a project, append an entry — the section grows automatically.
 */
export const PROJECT_DEMOS: ProjectDemo[] = [
  {
    id: 'crm',
    title: {
      en: 'CRM',
      vi: 'CRM',
    },
    description: {
      en:
        'A lightweight customer relationship manager built end-to-end with Claude — contacts, deal pipeline, and follow-up reminders, with no engineering team behind it.',
      vi:
        'Hệ thống quản lý quan hệ khách hàng gọn nhẹ, xây dựng trọn vẹn cùng Claude — danh bạ, pipeline bán hàng và nhắc lịch theo dõi, không cần đội ngũ kỹ thuật.',
    },
    images: [
      {
        src: '/project_demo/CRM/CRM.jpeg',
        alt: { en: 'CRM dashboard overview', vi: 'Tổng quan bảng điều khiển CRM' },
      },
      {
        src: '/project_demo/CRM/CRM2.jpeg',
        alt: { en: 'CRM contact and deal pipeline', vi: 'Danh bạ và pipeline bán hàng trong CRM' },
      },
      {
        src: '/project_demo/CRM/CRM3.jpeg',
        alt: { en: 'CRM reporting view', vi: 'Giao diện báo cáo của CRM' },
      },
    ],
  },
  {
    id: 'wind-todo',
    title: {
      en: 'WindTodo',
      vi: 'WindTodo',
    },
    description: {
      en:
        'A task manager that turns messy notes into a structured plan. Describe the week in plain language and it drafts, groups, and prioritises the work for you.',
      vi:
        'Ứng dụng quản lý công việc biến ghi chú lộn xộn thành kế hoạch rõ ràng. Mô tả tuần làm việc bằng ngôn ngữ thường ngày, ứng dụng sẽ soạn, nhóm và sắp xếp ưu tiên giúp bạn.',
    },
    images: [
      {
        src: '/project_demo/wind_todo/wind_todo.png',
        alt: { en: 'WindTodo task board', vi: 'Bảng công việc WindTodo' },
      },
      {
        src: '/project_demo/wind_todo/wind_todo2.png',
        alt: { en: 'WindTodo task detail view', vi: 'Giao diện chi tiết công việc WindTodo' },
      },
    ],
  },
  {
    id: 'cv-crosscheck',
    title: {
      en: 'CV Crosscheck',
      vi: 'CV Crosscheck',
    },
    description: {
      en:
        'A hiring assistant that reads a stack of CVs against a job description, surfaces the strongest matches, and explains the reasoning behind every score.',
      vi:
        'Trợ lý tuyển dụng đọc hàng loạt CV đối chiếu với mô tả công việc, chọn ra ứng viên phù hợp nhất và giải thích lý do cho từng điểm số.',
    },
    images: [
      {
        src: '/project_demo/CV_crosscheck/CV_crosscheck.png',
        alt: { en: 'CV Crosscheck candidate comparison', vi: 'So sánh ứng viên trong CV Crosscheck' },
      },
      {
        src: '/project_demo/CV_crosscheck/CV_crosscheck2.png',
        alt: { en: 'CV Crosscheck scoring breakdown', vi: 'Chi tiết chấm điểm trong CV Crosscheck' },
      },
    ],
  },
];
