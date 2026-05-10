export interface Trainer {
  name: string;
  occ: string;
  role: string;
  initials: string;
  hue: string;
}

export const TRAINERS: Trainer[] = [
  {
    name: 'Mr. Tuan Anh',
    occ: 'AI Studio Leader',
    role: 'Programme Leader',
    initials: 'TA',
    hue: '#B9FF66',
  },
  {
    name: 'Mr. Tony Nguyen',
    occ: 'AI Studio Executive',
    role: 'Trainer',
    initials: 'TN',
    hue: '#FFD9A8',
  },
  {
    name: 'Mr. Davis Pham',
    occ: 'AI Studio Executive',
    role: 'Trainer',
    initials: 'DP',
    hue: '#CFE3FF',
  },
];
