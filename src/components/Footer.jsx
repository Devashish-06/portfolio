import { profile } from '../data.js';

export default function Footer() {
  const year = new Date().getFullYear();
  const cells = [
    ['Drawn by', profile.name],
    ['Copyright', `© ${year}`],
    ['Sheet', '5 / 5 · End'],
  ];

  return (
    <footer className="px-5 sm:px-8 pb-10">
      <div className="wrap tb grid grid-cols-2 sm:grid-cols-4">
        {cells.map(([k, v], i) => (
          <div key={k} className={`tb-cell ${i === 2 ? 'border-t border-lav/15 sm:border-t-0 !border-l-0 sm:!border-l' : ''}`}>
            <span className="tb-k">{k}</span>
            <span className="tb-v">{v}</span>
          </div>
        ))}
        <a href="#top" className="tb-cell group border-t border-lav/15 sm:border-t-0 hover:bg-acid/5 transition-colors">
          <span className="tb-k">Navigate</span>
          <span className="tb-v text-lav group-hover:text-acid transition-colors">
            Back to top <i className="fas fa-arrow-up text-[10px]" aria-hidden="true" />
          </span>
        </a>
      </div>
    </footer>
  );
}
