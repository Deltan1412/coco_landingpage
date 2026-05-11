import { SectionHeader } from '@/components/ui/SectionHeader';
import { Star } from '@/components/ui/Star';
import { ROADMAP } from '@/data/roadmap';

export function Roadmap() {
  return (
    <section className="shell" id="roadmap">
      <SectionHeader tag="The 4-week roadmap" tagStyle="lime">
        Four weeks. Four immortal skills. The kind that stay useful even when the tools change names
        again next year.
      </SectionHeader>
      <div className="roadmap-grid">
        {ROADMAP.map((w, i) => (
          <div key={i} className={`week ${w.tone}`}>
            <div className="num-row">
              <span className="week-label">{w.label}</span>
              <Star
                size={28}
                color={w.tone === 'lime' ? '#191A23' : '#fff26b'}
                stroke="#191A23"
              />
            </div>
            <div className="num">{w.n}</div>
            <h3>
              {w.title}
              <br />
              <span style={{ fontWeight: 400, fontSize: 18, opacity: 0.85 }}>{w.sub}</span>
            </h3>
            <p className="desc">{w.desc}</p>
            <span className="deliverable">{w.deliverable}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
