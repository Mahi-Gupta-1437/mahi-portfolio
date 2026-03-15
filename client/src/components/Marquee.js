const items = ['PHP','JavaScript','Java','Python','MySQL','MongoDB','Bootstrap','Cloud Computing','Git & GitHub','Generative AI','Laravel','Networking','Cybersecurity'];
const icons = [
  { cls: 'fab fa-php' },
  { cls: 'fab fa-js' },
  { cls: 'fab fa-java' },
  { cls: 'fab fa-python' },
  { cls: 'fas fa-database' },
  { cls: 'fas fa-leaf' },
  { cls: 'fab fa-bootstrap' },
  { cls: 'fas fa-cloud' },
  { cls: 'fab fa-git-alt' },
  { cls: 'fas fa-robot' },
  { cls: 'fab fa-laravel' },
  { cls: 'fas fa-network-wired' },
  { cls: 'fas fa-shield-alt' },
];
export default function Marquee() {
  const doubled = [...items,...items];
  return (
    <div className="marquee-sec">
      <div className="marquee-track">
        <div className="marquee-inner">
          {doubled.map((item,i) => (
            <div key={i} className="mq-item"><i className={icons[i%icons.length].cls}/>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
