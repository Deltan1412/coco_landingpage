import { ComponentPropsWithoutRef } from 'react';

export function Logo({ className, ...props }: ComponentPropsWithoutRef<'a'>) {
  return (
    <a className={`logo ${className || ''}`} href="#top" {...props}>
      <span className="logo-mark" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M4 18 L10 6 L14 14 L20 4"
            stroke="#191A23"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="4" r="1.6" fill="#191A23" />
        </svg>
      </span>
      <span>Build with AI</span>
    </a>
  );
}

