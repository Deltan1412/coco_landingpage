import type { QrPattern } from '@/types/tweaks';

export interface FakeQRProps {
  pattern?: QrPattern;
  size?: number;
}

export function FakeQR({ pattern = 'modules', size = 180 }: FakeQRProps) {
  const cells = 25;
  const cellSize = size / cells;

  const seed = (x: number, y: number): boolean => {
    return ((x * 374761393 + y * 668265263) ^ ((x ^ y) << 5)) % 7 < 3;
  };

  const isFinder = (x: number, y: number): boolean | null => {
    const inBox = (cx: number, cy: number) => x >= cx && x < cx + 7 && y >= cy && y < cy + 7;
    const inInner = (cx: number, cy: number) =>
      x >= cx + 2 && x < cx + 5 && y >= cy + 2 && y < cy + 5;
    const inMid = (cx: number, cy: number) =>
      x >= cx + 1 && x < cx + 6 && y >= cy + 1 && y < cy + 6;
    const corners: Array<[number, number]> = [
      [0, 0],
      [cells - 7, 0],
      [0, cells - 7],
    ];
    for (const [cx, cy] of corners) {
      if (inBox(cx, cy)) {
        if (inInner(cx, cy)) return true;
        if (inMid(cx, cy)) return false;
        return true;
      }
    }
    return null;
  };

  const cellsArr: Array<{ x: number; y: number }> = [];
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      const f = isFinder(x, y);
      const on = f === null ? seed(x, y) : f;
      if (on) cellsArr.push({ x, y });
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="#fff" />
      {cellsArr.map((c, i) => {
        const px = c.x * cellSize;
        const py = c.y * cellSize;
        if (pattern === 'rounded') {
          return (
            <rect
              key={i}
              x={px + 0.5}
              y={py + 0.5}
              width={cellSize - 1}
              height={cellSize - 1}
              rx={cellSize / 3}
              fill="#191A23"
            />
          );
        }
        if (pattern === 'dots') {
          return (
            <circle
              key={i}
              cx={px + cellSize / 2}
              cy={py + cellSize / 2}
              r={cellSize / 2 - 0.5}
              fill="#191A23"
            />
          );
        }
        return (
          <rect key={i} x={px} y={py} width={cellSize} height={cellSize} fill="#191A23" />
        );
      })}
    </svg>
  );
}
