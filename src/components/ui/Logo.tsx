import { ComponentPropsWithoutRef } from 'react';

export function Logo({ className, onClick, ...props }: ComponentPropsWithoutRef<'a'>) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onClick) onClick(e);
  };

  return (
    <a className={`logo ${className || ''}`} href="/" onClick={handleClick} {...props}>
      <span className="logo-mark" aria-hidden>
        <img src="/logo.png" alt="" />
      </span>
      <span>Build with AI</span>
    </a>
  );
}

