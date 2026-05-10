import { useRef, useState } from 'react';
import { TweakRow } from './TweakRow';
import { TweakSelect, type TweakOption } from './TweakSelect';

export interface TweakRadioProps<T extends string | number> {
  label: string;
  value: T;
  options: Array<TweakOption<T>>;
  onChange: (value: T) => void;
}

export function TweakRadio<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: TweakRadioProps<T>) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const valueRef = useRef<T>(value);
  valueRef.current = value;

  const labelLen = (o: TweakOption<T>) =>
    String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const segmentCap = ({ 2: 16, 3: 10 } as Record<number, number>)[options.length] ?? 0;
  const fitsAsSegments = maxLen <= segmentCap;

  if (!fitsAsSegments) {
    const resolve = (s: string): T => {
      const m = options.find(
        (o) => String(typeof o === 'object' ? o.value : o) === s,
      );
      if (m === undefined) return s as unknown as T;
      return typeof m === 'object' ? m.value : m;
    };
    return (
      <TweakSelect
        label={label}
        value={value}
        options={options}
        onChange={(s) => onChange(resolve(String(s)))}
      />
    );
  }

  const opts = options.map((o) =>
    typeof o === 'object' ? o : { value: o, label: String(o) },
  );
  const idx = Math.max(
    0,
    opts.findIndex((o) => o.value === value),
  );
  const n = opts.length;

  const segAt = (clientX: number): T => {
    const track = trackRef.current;
    if (!track) return value;
    const r = track.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev: PointerEvent) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div
        ref={trackRef}
        role="radiogroup"
        onPointerDown={onPointerDown}
        className={dragging ? 'twk-seg dragging' : 'twk-seg'}
      >
        <div
          className="twk-seg-thumb"
          style={{
            left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
            width: `calc((100% - 4px) / ${n})`,
          }}
        />
        {opts.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={o.value === value}
          >
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}
