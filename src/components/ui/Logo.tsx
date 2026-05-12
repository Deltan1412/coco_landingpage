import { ComponentPropsWithoutRef } from 'react';

export function Logo({ className, onClick, ...props }: ComponentPropsWithoutRef<'a'>) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onClick) onClick(e);
  };

  return (
    <a className={`logo ${className || ''}`} href="/" onClick={handleClick} {...props}>
      <img src="/logo.png" alt="" style={{ width: 32, height: 32, objectFit: 'contain' }} />
      <span>Build with AI</span>
    </a>
  );
}

