export const Header = () => (
  <div style={{ paddingBottom: '10px', marginBottom: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src={import.meta.env.BASE_URL + 'icon.png'} alt="Autofill Extension" style={{ width: 28, height: 28 }} />
      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>My Autofill Extension</h3>
    </div>
    <p style={{ fontSize: "11px", fontStyle: "italic", margin: '5px 0 0 0', color: '#6c757d' }}>
      Efficiency Starts with Less Repetition
    </p>
  </div>
);