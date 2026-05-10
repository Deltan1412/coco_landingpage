import { useCallback, useState } from 'react';

type TweakEdits<T> = Partial<T>;

export type SetTweakFn<T> = {
  <K extends keyof T>(key: K, value: T[K]): void;
  (edits: TweakEdits<T>): void;
};

/**
 * Single source of truth for tweak values. setTweak persists via the host
 * (__edit_mode_set_keys → host rewrites the EDITMODE block on disk) and also
 * dispatches a same-window CustomEvent so in-page peers can react.
 */
export function useTweaks<T extends object>(defaults: T): [T, SetTweakFn<T>] {
  const [values, setValues] = useState<T>(defaults);

  const setTweak = useCallback(((keyOrEdits: unknown, val?: unknown) => {
    const edits =
      typeof keyOrEdits === 'object' && keyOrEdits !== null
        ? (keyOrEdits as TweakEdits<T>)
        : ({ [keyOrEdits as keyof T]: val } as TweakEdits<T>);
    setValues((prev) => ({ ...prev, ...edits }));
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    } catch {
      /* noop */
    }
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }) as SetTweakFn<T>, []);

  return [values, setTweak];
}
