export type HeadlineStyle = 'highlighted' | 'underline' | 'plain';
export type QrPattern = 'modules' | 'rounded' | 'dots';

export interface Tweaks {
  accent: string;
  headlineStyle: HeadlineStyle;
  showStars: boolean;
  showMarquee: boolean;
  qrPattern: QrPattern;
}

export type SetTweak = <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
