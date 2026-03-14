import { useState } from 'react';
import axios from 'axios';
import useReveal from '../hooks/useReveal';
const API = process.env.REACT_APP_API_URL || '';
export default function Contact({ portfolio }) {
  const ref = useReveal();
  const [form, setForm] = useState({name:'',email:'',subject:'',message:''});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm(f=>({...f,[e.target.name]:e.target.value}));
  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setStatus(null);
    try {
      const res = await axios.post(`${API}/api/contact`, form);
      setStatus({type:'success',msg:res.data.message});
      setForm({name:'',email:'',subject:'',message:''});
    } catch(err) {
      setStatus({type:'error',msg:err.response?.data?.error||'Something went wrong.'});
    }
    setLoading(false);
  };
  if(!portfolio) return null;
  return (
    <section id="contact" ref={ref}>
      <div className="max-w">
        <div className="sec-head center rv"><span className="sec-tag">Let's connect</span><h2 className="sec-title">Contact Me</h2></div>
        <div className="contact-grid">
          <div className="rv left">
            <div className="contact-text">
              <h3>Let's build something together 🌸</h3>
              <p>I'm always open to exciting opportunities, collaborations, or just a friendly chat about tech!</p>
            </div>
            <div className="contact-links">
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="c-link">
                <div className="c-icon" style={{background:'#e8f0fe',color:'#0a66c2'}}><i className="fab fa-linkedin-in"/></div>
                <div><div className="c-lbl">LinkedIn</div><div className="c-val">linkedin.com/in/ivory-roses</div></div>
                <i className="fas fa-arrow-right" style={{marginLeft:'auto',color:'var(--text3)',fontSize:'.78rem'}}/>
              </a>
              <a href={portfolio.github} target="_blank" rel="noreferrer" className="c-link">
                <div className="c-icon" style={{background:'var(--pri-s)',color:'var(--text)'}}><i className="fab fa-github"/></div>
                <div><div className="c-lbl">GitHub</div><div className="c-val">github.com/Mahi-Gupta</div></div>
                <i className="fas fa-arrow-right" style={{marginLeft:'auto',color:'var(--text3)',fontSize:'.78rem'}}/>
              </a>
              <a href={`mailto:${portfolio.email}`} className="c-link">
                <div className="c-icon" style={{background:'var(--acc-s)',color:'var(--accent)'}}><i className="fas fa-envelope"/></div>
                <div><div className="c-lbl">Email</div><div className="c-val">{portfolio.email}</div></div>
                <i className="fas fa-arrow-right" style={{marginLeft:'auto',color:'var(--text3)',fontSize:'.78rem'}}/>
              </a>
              <a href={`tel:${portfolio.phone}`} className="c-link">
                <div className="c-icon" style={{background:'var(--teal-s)',color:'var(--teal)'}}><i className="fas fa-phone"/></div>
                <div><div className="c-lbl">Phone</div><div className="c-val">{portfolio.phone}</div></div>
                <i className="fas fa-arrow-right" style={{marginLeft:'auto',color:'var(--text3)',fontSize:'.78rem'}}/>
              </a>
            </div>
          </div>
          <div className="rv right">
            <div className="contact-form">
              <h4>Send a Message 💌</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="Tell me something exciting..." required/>
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? <><i className="fas fa-spinner fa-spin"/> Sending...</> : <><i className="fas fa-paper-plane"/> Send Message</>}
                </button>
                {status && <div className={status.type==='success'?'form-success':'form-error'}>{status.msg}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
