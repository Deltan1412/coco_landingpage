export function ProductMockSales() {
  return (
    <div className="product-mock">
      <div style={{ fontSize: 11, color: '#191A23', fontWeight: 500, marginBottom: 8 }}>
        25 calls analyzed · 3h ago
      </div>
      <div className="mock-row" style={{ background: '#F3F3F3' }}>
        <span style={{ fontSize: 18 }}>📈</span>
        <span style={{ flex: 1, fontSize: 13 }}>Pricing came up in 18/25 calls</span>
      </div>
      <div className="mock-row" style={{ background: '#191A23', color: '#fff' }}>
        <span style={{ fontSize: 18 }}>🎯</span>
        <span style={{ flex: 1, fontSize: 13 }}>Top objection: integration with Slack</span>
      </div>
      <div className="mock-row" style={{ background: '#B9FF66' }}>
        <span style={{ fontSize: 18 }}>💡</span>
        <span style={{ flex: 1, fontSize: 13 }}>Champion phrase: "saves my Mondays"</span>
      </div>
      <div className="mock-row outline">
        <span className="bar">
          <i style={{ width: '72%' }} />
        </span>
        <span style={{ fontSize: 11 }}>72% close-rate signal</span>
      </div>
    </div>
  );
}
