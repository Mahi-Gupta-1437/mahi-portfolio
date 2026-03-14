const items = ['PHP','JavaScript','Java','Python','MySQL','MongoDB','Bootstrap','Cloud Computing','Git & GitHub','Generative AI','Laravel','Networking','Cybersecurity'];
const icons = ['fa-php','fa-js','fa-java','fa-python','fa-database','fa-leaf','fa-bootstrap','fa-cloud','fa-git-alt','fa-robot','fa-laravel','fa-network-wired','fa-shield-alt'];
export default function Marquee() {
  const doubled = [...items,...items];
  return (
    <div className="marquee-sec">
      <div className="marquee-track">
        <div className="marquee-inner">
          {doubled.map((item,i) => (
            <div key={i} className="mq-item"><i className={`fas ${icons[i%icons.length]}`}/>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
