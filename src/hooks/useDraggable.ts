import { useEffect, useRef } from 'react';

/**
 * Makes a DOM element draggable with pointer events.
 * On release, the element springs back to its origin with damped harmonic motion,
 * preserving the velocity at release for a satisfying throw.
 *
 * The hook writes two CSS custom properties on the element:
 *   --dx, --dy  (current translation in px)
 *
 * Consumers must include these in their own `transform` so existing rotation /
 * positioning is preserved, e.g.
 *
 *   transform: translate(var(--dx, 0px), var(--dy, 0px)) rotate(-5deg);
 */
export function useDraggable<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let dragging = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let originX = 0;
    let originY = 0;
    let lastMoveX = 0;
    let lastMoveY = 0;
    let lastMoveT = 0;
    let raf = 0;
    let activePointer: number | null = null;

    const apply = () => {
      el.style.setProperty('--dx', `${x}px`);
      el.style.setProperty('--dy', `${y}px`);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      cancelAnimationFrame(raf);
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* not all elements support capture */
      }
      activePointer = e.pointerId;
      dragging = true;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      originX = x;
      originY = y;
      lastMoveX = e.clientX;
      lastMoveY = e.clientY;
      lastMoveT = performance.now();
      vx = 0;
      vy = 0;
      el.classList.add('is-dragging');
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== activePointer) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastMoveT);
      // px/frame at ~60fps
      vx = ((e.clientX - lastMoveX) / dt) * 16;
      vy = ((e.clientY - lastMoveY) / dt) * 16;
      lastMoveX = e.clientX;
      lastMoveY = e.clientY;
      lastMoveT = now;
      x = originX + (e.clientX - pointerStartX);
      y = originY + (e.clientY - pointerStartY);
      apply();
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== activePointer) return;
      dragging = false;
      activePointer = null;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      el.classList.remove('is-dragging');

      // Damped spring back toward origin (0, 0).
      // Higher stiffness = snappier, higher damping = slower decay.
      const stiffness = 0.08;
      const damping = 0.82;

      const tick = () => {
        const ax = -x * stiffness;
        const ay = -y * stiffness;
        vx = (vx + ax) * damping;
        vy = (vy + ay) * damping;
        x += vx;
        y += vy;
        if (
          Math.abs(x) < 0.3 &&
          Math.abs(y) < 0.3 &&
          Math.abs(vx) < 0.3 &&
          Math.abs(vy) < 0.3
        ) {
          x = 0;
          y = 0;
          apply();
          return;
        }
        apply();
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return ref;
}
