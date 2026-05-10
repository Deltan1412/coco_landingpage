import { Star } from '@/components/ui/Star';

export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden>
      {/* Big lime blob */}
      <div
        className="blob"
        style={{
          width: 380,
          height: 380,
          background: 'var(--lime)',
          border: '1.5px solid var(--ink)',
          top: 30,
          right: 20,
          boxShadow: '0 6px 0 0 var(--ink)',
        }}
      />
      {/* Black ring */}
      <div
        className="blob"
        style={{
          width: 200,
          height: 200,
          border: '16px solid var(--ink)',
          top: 200,
          left: 0,
        }}
      />
      {/* Inner small lime circle */}
      <div
        className="blob"
        style={{
          width: 80,
          height: 80,
          background: 'var(--ink)',
          top: 230,
          left: 50,
        }}
      />

      {/* Spinning star top-right */}
      <div className="star-spin" style={{ top: -10, right: -10 }}>
        <Star size={120} />
      </div>

      {/* Floating chip — prompt */}
      <div className="pop" style={{ top: 60, left: 30, transform: 'rotate(-5deg)' }}>
        <span className="dot" />
        <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 14 }}>
          {`/build "weekly newsletter"`}
        </code>
      </div>

      {/* Floating chip — output */}
      <div
        className="pop"
        style={{
          bottom: 90,
          right: 0,
          transform: 'rotate(4deg)',
          background: '#191A23',
          color: '#fff',
          borderColor: '#191A23',
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--lime)',
            display: 'inline-block',
          }}
        />
        <span style={{ fontSize: 15 }}>
          shipped in <b style={{ color: 'var(--lime)' }}>4 weeks</b>
        </span>
      </div>

      {/* Plus sign */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: 70,
          fontSize: 80,
          lineHeight: 0.6,
          fontWeight: 600,
          color: 'var(--ink)',
          transform: 'rotate(15deg)',
        }}
      >
        +
      </div>

      {/* Diamond accent */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          right: 230,
          width: 28,
          height: 28,
          background: '#fff',
          border: '1.5px solid var(--ink)',
          transform: 'rotate(45deg)',
          boxShadow: '0 3px 0 0 var(--ink)',
        }}
      />
    </div>
  );
}
