import { Star } from '@/components/ui/Star';
import { useDraggable } from '@/hooks/useDraggable';

export function HeroArt() {
  const starRef = useDraggable<HTMLDivElement>();
  const promptRef = useDraggable<HTMLDivElement>();
  const outputRef = useDraggable<HTMLDivElement>();
  const plusRef = useDraggable<HTMLDivElement>();
  const diamondRef = useDraggable<HTMLDivElement>();
  const logoRef = useDraggable<HTMLDivElement>();

  return (
    <div className="hero-art" aria-hidden>
      <div className="hero-art-stage">
        {/* Background composition (not draggable) */}
        <div className="blob blob-lime" />
        <div className="blob blob-ring" />
        <div className="blob blob-dot" />

        {/* Spinning star top-right (drag wrapper + spin inner) */}
        <div ref={starRef} className="star-spin-tr draggable">
          <div className="hero-spin-inner">
            <Star size={120} />
          </div>
        </div>

        {/* Floating chip — prompt */}
        <div ref={promptRef} className="pop pop-prompt draggable">
          <span className="dot" />
          <code className="pop-code">{`/build "your hope and dream"`}</code>
        </div>

        {/* Floating chip — output */}
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

        {/* Diamond accent */}
        <div ref={diamondRef} className="hero-diamond draggable" />

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
