import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experience, profile } from '../data.js';
import { EASE, Reveal, SheetHead } from './motion.jsx';

function Status({ kind }) {
  return kind === 'work' ? (
    <span className="status status-work">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-75 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
      </span>
      In work
    </span>
  ) : (
    <span className="status status-rel"><i className="fas fa-check text-[9px]" aria-hidden="true" /> Released</span>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="section bg-panel/40">
      <div className="wrap">
        <SheetHead no="02" title="Experience · Revision history" />
        <Reveal as="h2" className="section-title">Building, running and upgrading Siemens Teamcenter PLM.</Reveal>

        {/* Key parameters */}
        <Reveal className="tb frame grid sm:grid-cols-3 mb-16">
          {[
            ['Param 01 · Experience', <>{profile.experience} yr</>, 'text-acid', 'hands-on PLM Teamcenter experience'],
            ['Param 02 · Upgrade', <>11.4 <span className="text-ver">→</span> 2506</>, 'text-white', 'Teamcenter version upgrade on Linux'],
            ['Param 03 · Scope', 'Dev + Admin', 'text-lav', 'customisation and day-to-day administration'],
          ].map(([k, v, cls, note], i) => (
            <div key={k} className={`min-w-0 p-6 ${i ? 'border-t sm:border-t-0 sm:border-l border-lav/15' : ''}`}>
              <p className="tb-k">{k}</p>
              <p className={`font-display text-4xl sm:text-3xl lg:text-[2.6rem] font-bold whitespace-nowrap mt-2 mb-2 ${cls}`}>{v}</p>
              <p className="text-sm text-gray-400 font-sans">{note}</p>
            </div>
          ))}
        </Reveal>

        {/* Revision table header */}
        <Reveal className="hidden md:grid grid-cols-[110px_1fr_160px] label px-8 pb-3">
          <span>Rev</span><span>Description</span><span className="text-right">Status</span>
        </Reveal>

        <div ref={listRef} className="relative">
          {/* Timeline line that draws as you scroll */}
          <div className="absolute left-[52px] md:left-[60px] top-0 bottom-0 w-px bg-lav/10" aria-hidden="true" />
          <motion.div
            className="absolute left-[52px] md:left-[60px] top-0 bottom-0 w-px bg-acid origin-top"
            style={{ scaleY: line }}
            aria-hidden="true"
          />

          <ol className="space-y-6">
            {experience.map((job, i) => (
              <Reveal as="li" key={job.rev} delay={i * 0.1}>
                <article className="tile md:grid md:grid-cols-[110px_1fr_160px] gap-0 !p-0 overflow-hidden">
                  {/* Rev */}
                  <div className="relative flex md:block items-center gap-4 px-6 pt-6 md:p-8 md:border-r border-lav/10">
                    <motion.span
                      className={`relative z-10 grid place-items-center w-14 h-14 rounded-md border font-display text-2xl font-bold bg-ink ${
                        job.status === 'work' ? 'border-acid/60 text-acid' : 'border-lav/40 text-lav'
                      }`}
                      initial={{ rotate: -90, opacity: 0 }}
                      whileInView={{ rotate: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                    >
                      {job.rev}
                    </motion.span>
                    <div className="md:hidden flex flex-wrap items-center gap-3">
                      <Status kind={job.status} />
                      <span className="label">{job.dates}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold">{job.role}</h3>
                    <p className="text-lav mt-1 mb-4">
                      {job.org}{job.client && <span className="text-gray-500"> · Client: {job.client}</span>}
                    </p>

                    {job.upgrade && (
                      <div className="inline-flex flex-wrap items-center gap-3 font-mono text-sm bg-ink border border-lav/15 rounded-md px-4 py-2.5 mb-5">
                        <span className="text-gray-400">Teamcenter</span>
                        <span className="text-white">{job.upgrade.from}</span>
                        <motion.i
                          className="fas fa-arrow-right-long text-ver"
                          aria-hidden="true"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <span className="text-acid">{job.upgrade.to}</span>
                        <span className="text-gray-500">· {job.upgrade.platform}</span>
                      </div>
                    )}

                    {job.summary && <p className="text-gray-400 mb-5">{job.summary}</p>}

                    <ul className="space-y-2.5 text-sm text-gray-300 mb-6">
                      {job.bullets.map((b, j) => (
                        <motion.li
                          key={j}
                          className="flex gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + j * 0.1, ease: EASE }}
                        >
                          <i className="fas fa-angle-right text-acid text-xs mt-1.5" aria-hidden="true" />
                          <span>{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                      {job.tags.map((t) => <li key={t} className="tag">{t}</li>)}
                    </ul>
                  </div>

                  {/* Status */}
                  <div className="hidden md:flex flex-col items-end gap-3 p-8">
                    <Status kind={job.status} />
                    <span className="label">{job.dates}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
