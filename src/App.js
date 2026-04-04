function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'sans-serif' }}>
      <h1>DevSecOps Demo App</h1>
      <p>This app is protected by an automated security pipeline.</p>
      <p>Every push is scanned for secrets and vulnerabilities.</p>
    </div>
  );
}

export default App;