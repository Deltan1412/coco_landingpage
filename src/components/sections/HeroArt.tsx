import { Star } from '@/components/ui/Star';
import { useDraggable } from '@/hooks/useDraggable';

export function HeroArt() {
  const starRef = useDraggable<HTMLDivElement>();
  const promptRef = useDraggable<HTMLDivElement>();
  const outputRef = useDraggable<HTMLDivElement>();
  const plusRef = useDraggable<HTMLDivElement>();
  const diamondRef = useDraggable<HTMLDivElement>();
  const logoRef = useDraggable<HTMLDivElement>();
  const mascotRef = useDraggable<HTMLDivElement>();

  return (
    <div className="hero-art" aria-hidden>
      {/* LEFT cluster */}
      <div className="hero-art-stage hero-art-left">
        {/* Spinning mascot badge */}
        <div ref={mascotRef} className="hero-mascot draggable">
          <div className="hero-spin-inner">
            <img src="/background/cat-mascot.png" alt="" />
          </div>
        </div>

        {/* Ring + dot "eye" (not draggable) */}
        <div className="blob blob-ring" />
        <div className="blob blob-dot" />

        {/* Floating chip, prompt */}
        <div ref={promptRef} className="pop pop-prompt draggable">
          <span className="dot" />
          <code className="pop-code">{`/build "your hope and dream"`}</code>
        </div>

        {/* Diamond accent */}
        <div ref={diamondRef} className="hero-diamond draggable" />
      </div>

      {/* RIGHT cluster */}
      <div className="hero-art-stage hero-art-right">
        {/* Spinning star (drag wrapper + spin inner) */}
        <div ref={starRef} className="star-spin-tr draggable">
          <div className="hero-spin-inner">
            <Star size={120} color="#EF345E" />
          </div>
        </div>

        {/* Floating chip, output */}
        <div ref={outputRef} className="pop pop-output draggable">
          <span className="pop-output-dot" />
          <span className="pop-output-text">
            shipped in <b>4 weeks</b>
          </span>
        </div>

        {/* Plus sign */}
        <div ref={plusRef} className="hero-plus draggable">
          +
        </div>

        {/* Spinning logo (drag wrapper + spin inner) */}
        <div ref={logoRef} className="hero-logo-spin draggable">
          <div className="hero-spin-inner">
            <img src="/logo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
