export default function Footer({ portfolio }) {
  return (
    <footer>
      <div className="foot-text">
        Made with <b>💜</b> by <b>Mahi Gupta</b><br/>
        <small>MERN Stack — MongoDB · Express · React · Node.js ✨</small>
      </div>
      <div className="foot-socials">
        <a href={portfolio?.github} target="_blank" rel="noreferrer" className="fsoc"><i className="fab fa-github"/></a>
        <a href={portfolio?.linkedin} target="_blank" rel="noreferrer" className="fsoc"><i className="fab fa-linkedin-in"/></a>
        <a href={`mailto:${portfolio?.email}`} className="fsoc"><i className="fas fa-envelope"/></a>
      </div>
    </footer>
  );
}
