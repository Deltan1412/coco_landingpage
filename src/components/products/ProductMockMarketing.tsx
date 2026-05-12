export function ProductMockMarketing() {
  return (
    <div className="product-mock">
      <div
        style={{
          display: 'flex',
          gap: 6,
          marginBottom: 10,
          fontSize: 11,
          fontWeight: 500,
          color: '#898989',
        }}
      >
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
      </div>
      <div className="mock-row lime">
        <span className="swatch" style={{ background: '#191A23' }} />
        <span style={{ flex: 1 }}>LinkedIn: "5 lessons from Q3"</span>
        <span style={{ fontSize: 11 }}>9:00</span>
      </div>
      <div className="mock-row paper">
        <span className="swatch" style={{ background: '#7C5CFA' }} />
        <span style={{ flex: 1 }}>Newsletter: Welcome series</span>
        <span style={{ fontSize: 11 }}>10:30</span>
      </div>
      <div className="mock-row outline">
        <span className="swatch" style={{ background: '#FF8A65' }} />
        <span style={{ flex: 1 }}>Twitter thread: Product launch</span>
        <span style={{ fontSize: 11 }}>14:00</span>
      </div>
      <div style={{ fontSize: 11, color: '#898989', marginTop: 8, textAlign: 'center' }}>
        ⏵ Auto-drafted, queued, ready to review
      </div>
    </div>
  );
}
