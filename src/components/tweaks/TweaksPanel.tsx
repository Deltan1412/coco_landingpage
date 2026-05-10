import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { TWEAKS_STYLE } from './tweaksStyles';
import { TweakSection } from './TweakSection';
import { TweakToggle } from './TweakToggle';

export interface TweaksPanelProps {
  title?: string;
  noDeckControls?: boolean;
  children?: ReactNode;
}

const PAD = 16;

/**
 * Floating tweaks shell. Owns the host protocol:
 *  - listens for __activate_edit_mode / __deactivate_edit_mode
 *  - posts __edit_mode_available, __edit_mode_dismissed
 *
 * The close button posts __edit_mode_dismissed so the host's toolbar toggle
 * flips off in lockstep; the host echoes __deactivate_edit_mode back which
 * is what actually hides the panel.
 */
export function TweaksPanel({
  title = 'Tweaks',
  noDeckControls = false,
  children,
}: TweaksPanelProps) {
  const [open, setOpen] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);

  const hasDeckStage = useMemo(
    () => typeof document !== 'undefined' && !!document.querySelector('deck-stage'),
    [],
  );

  const [railEnabled, setRailEnabled] = useState<boolean>(() => {
    if (!hasDeckStage) return false;
    const stage = document.querySelector('deck-stage') as
      | (HTMLElement & { _railEnabled?: boolean })
      | null;
    return !!stage?._railEnabled;
  });

  useEffect(() => {
    if (!hasDeckStage || railEnabled) return undefined;
    const onMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === '__omelette_rail_enabled') setRailEnabled(true);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [hasDeckStage, railEnabled]);

  const [railVisible, setRailVisible] = useState<boolean>(() => {
    try {
      return localStorage.getItem('deck-stage.railVisible') !== '0';
    } catch {
      return true;
    }
  });

  const toggleRail = (on: boolean) => {
    setRailVisible(on);
    window.postMessage({ type: '__deck_rail_visible', on }, '*');
  };

  const offsetRef = useRef({ x: 16, y: 16 });

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    try {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    } catch {
      /* noop */
    }
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    } catch {
      /* noop */
    }
  };

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX;
    const sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{TWEAKS_STYLE}</style>
      <div
        ref={dragRef}
        className="twk-panel"
        data-noncommentable=""
        style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}
      >
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button
            className="twk-x"
            aria-label="Close tweaks"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={dismiss}
          >
            ✕
          </button>
        </div>
        <div className="twk-body">
          {children}
          {hasDeckStage && railEnabled && !noDeckControls && (
            <TweakSection label="Deck">
              <TweakToggle label="Thumbnail rail" value={railVisible} onChange={toggleRail} />
            </TweakSection>
          )}
        </div>
      </div>
    </>
  );
}
