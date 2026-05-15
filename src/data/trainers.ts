interface LocalizedField {
  en: string;
  vi: string;
}

export interface Trainer {
  name: string;
  occ: LocalizedField;
  role: LocalizedField;
  initials: string;
  hue: string;
  photo?: string;
}

export const TRAINERS: Trainer[] = [
  {
    name: 'Mr. Tony Nguyen',
    occ: { en: 'AI Studio Executive', vi: 'Quản lý AI Studio' },
    role: { en: 'Trainer', vi: 'Giảng viên' },
    initials: 'TN',
    hue: '#FFD9A8',
    photo: '/avatar/Tony.jpg',
  },
  {
    name: 'Mr. Tuan Anh',
    occ: { en: 'AI Studio Leader', vi: 'Trưởng AI Studio' },
    role: { en: 'Programme Leader', vi: 'Trưởng chương trình' },
    initials: 'TA',
    hue: '#fff26b',
  },
  {
    name: 'Mr. Davis Pham',
    occ: { en: 'AI Studio Executive', vi: 'Quản lý AI Studio' },
    role: { en: 'Trainer', vi: 'Giảng viên' },
    initials: 'DP',
    hue: '#CFE3FF',
    photo: '/avatar/Davis.jpg',
  },
];
