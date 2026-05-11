import type { CSSProperties } from 'react';

export interface StarProps {
  size?: number;
  color?: string;
  stroke?: string;
  className?: string;
  style?: CSSProperties;
}

export function Star({
  size = 80,
  color = '#fff26b',
  stroke = '#191A23',
  className = '',
  style = {},
}: StarProps) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 0 C52 28, 72 48, 100 50 C72 52, 52 72, 50 100 C48 72, 28 52, 0 50 C28 48, 48 28, 50 0 Z"
        fill={color}
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  );
}
