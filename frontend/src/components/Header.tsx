export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">🕷️</div>

        <div>
          <h1>
            FIND<span>spidey</span>
          </h1>

          <p>AI-powered debugging assistant</p>
        </div>
      </div>

      <div className="status">
        <span className="status-dot" />
        Backend ready
      </div>
    </header>
  );
}