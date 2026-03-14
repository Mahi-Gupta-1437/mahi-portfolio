import useReveal from '../hooks/useReveal';
const API = process.env.REACT_APP_API_URL || '';
export default function Documents({ documents, openPdf }) {
  const ref = useReveal();
  const featured = documents.find(d=>d.featured);
  const rest = documents.filter(d=>!d.featured);
  return (
    <section id="documents" ref={ref}>
      <div className="max-w">
        <div className="sec-head center rv">
          <span className="sec-tag">All my documents</span>
          <h2 className="sec-title">CV & Certificates</h2>
          <p className="docs-intro">View or download every document — CV and all 15 certificates. Click 👁 to preview or ⬇ to download.</p>
        </div>
        <div className="docs-grid">
          {featured && (
            <div className="doc-card featured rv">
              <div className="doc-card-top">
                <div className="doc-file-icon" style={{background:'linear-gradient(135deg,var(--pri-s),var(--acc-s))'}}>{featured.emoji}</div>
                <div><div className="doc-name">{featured.name}</div><div className="doc-meta">{featured.meta}</div></div>
              </div>
              <div className="doc-actions">
                <button className="doc-btn doc-btn-view" onClick={()=>openPdf(`${API}/pdfs/${featured.file}`,featured.name)}><i className="fas fa-eye"/> View CV</button>
                <a href={`${API}/pdfs/${featured.file}`} download className="doc-btn doc-btn-dl"><i className="fas fa-download"/> Download CV</a>
              </div>
            </div>
          )}
          {rest.map((d,i)=>(
            <div key={d.id} className={`doc-card rv d${(i%3)+1}`}>
              <div className="doc-card-top">
                <div className="doc-file-icon" style={{background:'var(--pri-s)'}}>{d.emoji}</div>
                <div><div className="doc-name">{d.name}</div><div className="doc-meta">{d.meta}</div></div>
              </div>
              <div className="doc-actions">
                <button className="doc-btn doc-btn-view" onClick={()=>openPdf(`${API}/pdfs/${d.file}`,d.name)}><i className="fas fa-eye"/> View</button>
                <a href={`${API}/pdfs/${d.file}`} download className="doc-btn doc-btn-dl"><i className="fas fa-download"/> Download</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
