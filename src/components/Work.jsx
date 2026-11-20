import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import DemoModal from './DemoModal.jsx';
import { profile, projects } from '../data.js';
import { EASE, Magnetic, Reveal, SheetHead, Tilt } from './motion.jsx';

function ItemBar({ id }) {
  return (
    <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-lav/10 label">
      <span>Item {id} · Rev A</span>
      <span className="status status-rel"><i className="fas fa-check text-[9px]" aria-hidden="true" /> Released</span>
    </div>
  );
}

function Spec({ rows }) {
  return (
    <dl className="spec mb-6">
      {rows.map(([k, v, highlight]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{highlight && v.includes(highlight) ? <><span className="text-acid font-semibold">{highlight}</span>{v.replace(highlight, '')}</> : v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Shot({ src, alt, className = '', onPlay }) {
  return (
    <div className={`relative overflow-hidden bg-ink group/shot ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      {onPlay && (
        <button
          type="button"
          onClick={onPlay}
          className="absolute inset-0 grid place-items-center bg-ink/0 hover:bg-ink/35 transition-colors"
          aria-label={`Play demo: ${alt}`}
        >
          <motion.span
            className="w-16 h-16 rounded-full grid place-items-center bg-acid text-ink shadow-lg shadow-black/40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute w-16 h-16 rounded-full bg-acid/40 animate-ping" aria-hidden="true" />
            <i className="fas fa-play text-lg translate-x-0.5" aria-hidden="true" />
          </motion.span>
        </button>
      )}
    </div>
  );
}

function Actions({ project, onDemo }) {
  return (
    <div className="flex flex-wrap gap-3 mt-auto">
      {project.demo && (
        <Magnetic>
          <button type="button" onClick={() => onDemo(project)} className="btn-primary">
            <i className="fas fa-play text-xs" aria-hidden="true" /> Watch demo
          </button>
        </Magnetic>
      )}
      <Magnetic>
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          <i className="fab fa-github" aria-hidden="true" /> View code
        </a>
      </Magnetic>
    </div>
  );
}

export default function Work() {
  const [featured, ...rest] = projects;
  const [demo, setDemo] = useState(null);
  const closeDemo = useCallback(() => setDemo(null), []);
  const playFor = (p) => (p.demo ? () => setDemo(p) : undefined);

  return (
    <section id="work" className="section">
      <div className="wrap">
        <SheetHead no="03" title="Work · Released items" />
        <Reveal as="h2" className="section-title">Projects that solve real problems, in real time.</Reveal>

        {/* Featured */}
        <Reveal className="mb-6">
          <Tilt max={2.5}>
            <article className="tile frame !p-0 overflow-hidden">
              <ItemBar id={featured.id} />
              <div className="grid lg:grid-cols-5">
                <Shot src={featured.image} alt={featured.alt} onPlay={playFor(featured)} className="lg:col-span-3 aspect-video lg:aspect-auto" />
                <div className="lg:col-span-2 p-6 md:p-8 flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-mono text-[10.5px] font-medium tracking-[0.14em] text-ink bg-acid px-2.5 py-1 rounded">FEATURED</span>
                    <span className="font-mono text-xs text-lav">{featured.category}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{featured.name}</h3>
                  <p className="text-gray-400 mb-5">{featured.summary}</p>
                  <Spec rows={featured.spec} />
                  <ul className="flex flex-wrap gap-2 mb-8" aria-label="Technologies">
                    {featured.tags.map((t) => <li key={t} className="tag">{t}</li>)}
                  </ul>
                  <Actions project={featured} onDemo={setDemo} />
                </div>
              </div>
            </article>
          </Tilt>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={0.1 + i * 0.1} className="h-full">
              <Tilt className="h-full">
                <article className="tile !p-0 overflow-hidden flex flex-col h-full">
                  <ItemBar id={p.id} />
                  <Shot src={p.image} alt={p.alt} onPlay={playFor(p)} className="aspect-video" />
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <span className="font-mono text-xs text-lav mb-3">{p.category}</span>
                    <h3 className="text-2xl font-bold mb-4">{p.name}</h3>
                    <Spec rows={p.spec} />
                    <ul className="flex flex-wrap gap-2 mb-8" aria-label="Technologies">
                      {p.tags.map((t) => <li key={t} className="tag">{t}</li>)}
                    </ul>
                    <Actions project={p} onDemo={setDemo} />
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="group font-mono text-sm text-lav hover:text-acid transition-colors">
            More on GitHub <i className="fas fa-arrow-right text-xs inline-block transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
      <DemoModal project={demo} onClose={closeDemo} />
    </section>
  );
}
