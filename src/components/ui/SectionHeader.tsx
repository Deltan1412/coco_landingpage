import type { ReactNode } from 'react';

export type TagStyle = 'lime' | 'dark' | 'paper';

export interface SectionHeaderProps {
  tag: string;
  tagStyle?: TagStyle;
  children: ReactNode;
}

export function SectionHeader({ tag, tagStyle = 'lime', children }: SectionHeaderProps) {
  const cls = tagStyle === 'dark' ? 'tag dark' : tagStyle === 'paper' ? 'tag paper' : 'tag';
  return (
    <div className="sec-head">
      <span className={cls}>{tag}</span>
      <p>{children}</p>
    </div>
  );
}
