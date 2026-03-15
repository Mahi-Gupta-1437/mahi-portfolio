import React, { useState, useRef } from 'react';
import Magnetic from './Magnetic';

const LANGUAGES = [
  { code: '', label: 'Select Language' },
  { code: 'af', label: 'Afrikaans' },
  { code: 'sq', label: 'Albanian' },
  { code: 'am', label: 'Amharic' },
  { code: 'ar', label: 'Arabic' },
  { code: 'hy', label: 'Armenian' },
  { code: 'az', label: 'Azerbaijani' },
  { code: 'eu', label: 'Basque' },
  { code: 'be', label: 'Belarusian' },
  { code: 'bn', label: 'Bengali' },
  { code: 'bs', label: 'Bosnian' },
  { code: 'bg', label: 'Bulgarian' },
  { code: 'ca', label: 'Catalan' },
  { code: 'ceb', label: 'Cebuano' },
  { code: 'zh-CN', label: 'Chinese (Simplified)' },
  { code: 'zh-TW', label: 'Chinese (Traditional)' },
  { code: 'co', label: 'Corsican' },
  { code: 'hr', label: 'Croatian' },
  { code: 'cs', label: 'Czech' },
  { code: 'da', label: 'Danish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'en', label: 'English' },
  { code: 'eo', label: 'Esperanto' },
  { code: 'et', label: 'Estonian' },
  { code: 'fi', label: 'Finnish' },
  { code: 'fr', label: 'French' },
  { code: 'fy', label: 'Frisian' },
  { code: 'gl', label: 'Galician' },
  { code: 'ka', label: 'Georgian' },
  { code: 'de', label: 'German' },
  { code: 'el', label: 'Greek' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'ht', label: 'Haitian Creole' },
  { code: 'ha', label: 'Hausa' },
  { code: 'haw', label: 'Hawaiian' },
  { code: 'he', label: 'Hebrew' },
  { code: 'hi', label: 'Hindi' },
  { code: 'hmn', label: 'Hmong' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'is', label: 'Icelandic' },
  { code: 'ig', label: 'Igbo' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ga', label: 'Irish' },
  { code: 'it', label: 'Italian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'jv', label: 'Javanese' },
  { code: 'kn', label: 'Kannada' },
  { code: 'kk', label: 'Kazakh' },
  { code: 'km', label: 'Khmer' },
  { code: 'rw', label: 'Kinyarwanda' },
  { code: 'ko', label: 'Korean' },
  { code: 'ku', label: 'Kurdish' },
  { code: 'ky', label: 'Kyrgyz' },
  { code: 'lo', label: 'Lao' },
  { code: 'la', label: 'Latin' },
  { code: 'lv', label: 'Latvian' },
  { code: 'lt', label: 'Lithuanian' },
  { code: 'lb', label: 'Luxembourgish' },
  { code: 'mk', label: 'Macedonian' },
  { code: 'mg', label: 'Malagasy' },
  { code: 'ms', label: 'Malay' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'mt', label: 'Maltese' },
  { code: 'mi', label: 'Maori' },
  { code: 'mr', label: 'Marathi' },
  { code: 'mn', label: 'Mongolian' },
  { code: 'my', label: 'Myanmar (Burmese)' },
  { code: 'ne', label: 'Nepali' },
  { code: 'no', label: 'Norwegian' },
  { code: 'ny', label: 'Nyanja (Chichewa)' },
  { code: 'or', label: 'Odia (Oriya)' },
  { code: 'ps', label: 'Pashto' },
  { code: 'fa', label: 'Persian' },
  { code: 'pl', label: 'Polish' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'ro', label: 'Romanian' },
  { code: 'ru', label: 'Russian' },
  { code: 'sm', label: 'Samoan' },
  { code: 'gd', label: 'Scots Gaelic' },
  { code: 'sr', label: 'Serbian' },
  { code: 'st', label: 'Sesotho' },
  { code: 'sn', label: 'Shona' },
  { code: 'sd', label: 'Sindhi' },
  { code: 'si', label: 'Sinhala' },
  { code: 'sk', label: 'Slovak' },
  { code: 'sl', label: 'Slovenian' },
  { code: 'so', label: 'Somali' },
  { code: 'es', label: 'Spanish' },
  { code: 'su', label: 'Sundanese' },
  { code: 'sw', label: 'Swahili' },
  { code: 'sv', label: 'Swedish' },
  { code: 'tl', label: 'Tagalog (Filipino)' },
  { code: 'tg', label: 'Tajik' },
  { code: 'ta', label: 'Tamil' },
  { code: 'tt', label: 'Tatar' },
  { code: 'te', label: 'Telugu' },
  { code: 'th', label: 'Thai' },
  { code: 'tr', label: 'Turkish' },
  { code: 'tk', label: 'Turkmen' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'ur', label: 'Urdu' },
  { code: 'ug', label: 'Uyghur' },
  { code: 'uz', label: 'Uzbek' },
  { code: 'vi', label: 'Vietnamese' },
  { code: 'cy', label: 'Welsh' },
  { code: 'xh', label: 'Xhosa' },
  { code: 'yi', label: 'Yiddish' },
  { code: 'yo', label: 'Yoruba' },
  { code: 'zu', label: 'Zulu' },
];

export default function Navbar({ portfolio, theme, setTheme, openPdf }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [translateLoaded, setTranslateLoaded] = useState(false);
  const selectRef = useRef(null);
  const API = process.env.REACT_APP_API_URL || '';

  // Load Google Translate script (hidden — we drive it programmatically)
  React.useEffect(() => {
    if (!translateLoaded && !document.getElementById('g-translate-script')) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false
          }, 'google_translate_element');
        }
      };
      const script = document.createElement('script');
      script.id = 'g-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
      setTranslateLoaded(true);
    }
  }, [translateLoaded]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    if (!lang) return;

    // Try to use the hidden Google Translate combo box if it exists
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
      return;
    }

    // Fallback: set google translate cookie and reload
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${lang};path=/;domain=${domain}`;
    document.cookie = `googtrans=/en/${lang};path=/`;
    window.location.reload();
  };

  if (!portfolio) return null;
  return (
    <nav id="main-nav">
      <div className="nav-logo">Mahi<span className="nav-dot">.</span></div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        {['about','achievements','skills','projects','certifications','education','contact'].map(s => {
          if (s === 'achievements') {
            return (
              <li key={s}>
                <a href="#about" onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const el = document.getElementById('achievements');
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 100; // offset for navbar
                    window.scrollTo({top: y, behavior: 'smooth'});
                  }
                }}>Achievements</a>
              </li>
            );
          }
          return <li key={s}><a href={`#${s}`} onClick={() => setIsMenuOpen(false)}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>;
        })}
      </ul>
      <div className="nav-right">
        {/* Hidden Google Translate element (drives translation engine) */}
        <div id="google_translate_element" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0, overflow: 'hidden' }}></div>
        {/* Custom language selector — always scrollable on mobile */}
        <div className="gt-widget">
          <select
            ref={selectRef}
            className="custom-lang-select"
            onChange={handleLanguageChange}
            defaultValue=""
            aria-label="Select Language"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
        <button className="btn-theme" onClick={() => setTheme(t => t==='light'?'dark':'light')} title="Toggle Theme">
          {theme==='light'?'🌙':'☀️'}
        </button>
        <Magnetic pull={0.25}>
          <button onClick={() => openPdf(`${API}/pdfs/MyFinalCV.pdf`, 'Mahi Gupta - CV')} className="btn-nav"><i className="fas fa-eye"/> CV</button>
        </Magnetic>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"} />
        </button>
      </div>
    </nav>
  );
}
