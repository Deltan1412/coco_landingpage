import { useState } from 'react';

/**
 * A red box reading "UNLOCK NEW SKILLS" that splits into two halves when the
 * pointer enters, revealing the illustration (4.png) behind it.
 */
export function UnlockReveal() {
  const [open, setOpen] = useState(false);
  const shift = open ? 100 : 0;

  return (
    <section className="unlock shell" aria-label="Unlock new skills">
      <div
        className="unlock-frame"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <img className="unlock-img" src="/background/4.png" alt="" />
        <div
          className="unlock-slab unlock-slab-top"
          style={{ transform: `translateY(-${shift}%)` }}
        >
          <span className="unlock-label">UNLOCK NEW SKILLS</span>
        </div>
        <div
          className="unlock-slab unlock-slab-bottom"
          style={{ transform: `translateY(${shift}%)` }}
        >
          <span className="unlock-label">UNLOCK NEW SKILLS</span>
        </div>
      </div>
    </section>
  );
}
