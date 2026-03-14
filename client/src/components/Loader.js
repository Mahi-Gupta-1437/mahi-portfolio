export default function Loader({ done }) {
  return (
    <div id="loader" className={done ? 'done' : ''}>
      <div className="ld-emoji">🦋</div>
      <div className="ld-name">Mahi Gupta</div>
      <div className="ld-bar"><div className="ld-fill"/></div>
    </div>
  );
}
