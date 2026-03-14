import { useEffect } from 'react';
export default function PdfModal({ file, title, onClose }) {
  useEffect(()=>{
    document.body.style.overflow='hidden';
    const onKey = e => { if(e.key==='Escape') onClose(); };
    document.addEventListener('keydown',onKey);
    return ()=>{ document.body.style.overflow=''; document.removeEventListener('keydown',onKey); };
  },[onClose]);
  return (
    <div className="pdf-overlay open" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="pdf-modal">
        <div className="pdf-modal-bar">
          <i className="fas fa-file-pdf" style={{color:'var(--accent)'}}/>
          <div className="pdf-modal-title">{title}</div>
          <a href={file} download className="doc-btn doc-btn-dl" style={{padding:'7px 14px',fontSize:'.74rem',flex:'0 0 auto'}}><i className="fas fa-download"/> Download</a>
          <button className="pdf-close-btn" onClick={onClose}><i className="fas fa-times"/></button>
        </div>
        <iframe className="pdf-frame" src={file} title={title}/>
      </div>
    </div>
  );
}
