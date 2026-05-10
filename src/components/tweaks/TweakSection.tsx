import type { ReactNode } from 'react';

export interface TweakSectionProps {
  /**
   * Section heading. Either `title` or `label` is supported for back-compat
   * with the original API.
   */
  title?: string;
  label?: string;
  children?: ReactNode;
}

export function TweakSection({ title, label, children }: TweakSectionProps) {
  return (
    <>
      <div className="twk-sect">{title ?? label}</div>
      {children}
    </>
  );
}
