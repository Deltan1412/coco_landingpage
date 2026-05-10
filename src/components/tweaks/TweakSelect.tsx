import { TweakRow } from './TweakRow';

export type TweakOption<T = string> = T | { value: T; label: string };

export interface TweakSelectProps<T extends string | number> {
  label: string;
  value: T;
  options: Array<TweakOption<T>>;
  onChange: (value: T) => void;
}

export function TweakSelect<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: TweakSelectProps<T>) {
  return (
    <TweakRow label={label}>
      <select
        className="twk-field"
        value={String(value)}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : String(o);
          return (
            <option key={String(v)} value={String(v)}>
              {l}
            </option>
          );
        })}
      </select>
    </TweakRow>
  );
}
