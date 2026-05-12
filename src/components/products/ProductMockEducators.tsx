export function ProductMockEducators() {
  return (
    <div className="product-mock">
      <div style={{ fontSize: 11, color: '#898989', fontWeight: 500, marginBottom: 8 }}>
        Topic: Photosynthesis · Grade 7
      </div>
      <div className="mock-row" style={{ background: '#F3F3F3' }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>📄</span>
        <span style={{ flex: 1, fontSize: 13 }}>Lesson plan, 45 min</span>
        <span style={{ fontSize: 11, color: '#4CAF50' }}>✓</span>
      </div>
      <div className="mock-row" style={{ background: '#fff26b' }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>📋</span>
        <span style={{ flex: 1, fontSize: 13 }}>Worksheet (3 levels)</span>
        <span style={{ fontSize: 11 }}>✓</span>
      </div>
      <div className="mock-row outline">
        <span style={{ fontSize: 14, fontWeight: 600 }}>🎴</span>
        <span style={{ flex: 1, fontSize: 13 }}>12 flashcards</span>
        <span style={{ fontSize: 11, color: '#898989' }}>···</span>
      </div>
      <div className="mock-row" style={{ background: '#191A23', color: '#fff' }}>
        <span style={{ fontSize: 14 }}>📝</span>
        <span style={{ flex: 1, fontSize: 13 }}>Quiz with rubric</span>
        <span style={{ fontSize: 11 }}>···</span>
      </div>
    </div>
  );
}
