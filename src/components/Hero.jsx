import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data.js';
import { EASE, Magnetic } from './motion.jsx';

const word = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};
const letter = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
};

function SplitWord({ text, className = '', delay = 0 }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
      <motion.span
        className={`inline-block ${className}`}
        variants={word}
        initial="hidden"
        animate="show"
        transition={{ delayChildren: delay }}
      >
        {[...text].map((c, i) => (
          <motion.span key={i} variants={letter} className="inline-block">{c}</motion.span>
        ))}
      </motion.span>
    </span>
  );
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

// CAD title-block rows: [ [key, value, extraClass?], ... ] per row
const titleBlock = [
  [['Title', 'PLM Teamcenter & Full Stack Developer']],
  [['Drawn by', 'D. Deshmukh'], ['Organisation', 'Nextech PLM Solutions']],
  [['Clients', 'ACGL, Goa · Tata Hitachi']],
  [['Experience', `${profile.experience} yr · PLM`], ['TC upgrade', '11.4 → 2506', 'text-acid']],
  [['PLM', 'Teamcenter · BMIDE · ITK · Linux']],
  [['Web', 'React · Django · Python · C++']],
  [['Status', '● In service', 'text-acid'], ['Sheet', '1 / 5'], ['Rev', 'B']],
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBlock = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="hero-bg relative min-h-screen flex items-center px-5 sm:px-8 pt-28 pb-28 overflow-hidden">
      <div className="wrap w-full grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">

        <motion.div className="lg:col-span-7 min-w-0" style={{ y: yText, opacity: fade }}>
          <motion.div className="flex flex-wrap items-center gap-3 mb-8" {...fadeUp(0.2)}>
            <span className="status status-work">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
              </span>
              In service
            </span>
            <span className="label">Teamcenter Solution Developer · {profile.employer}</span>
          </motion.div>

          <h1 className="text-[3.3rem] sm:text-7xl lg:text-[6.2rem] font-bold leading-[0.95] mb-8" aria-label={profile.name}>
            <SplitWord text="Devashish" delay={0.3} />
            <span className="flex items-end">
              <SplitWord text="Deshmukh" className="text-outline" delay={0.55} />
              <motion.span
                className="text-ver inline-block"
                aria-hidden="true"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, type: 'spring', stiffness: 400, damping: 12 }}
              >.</motion.span>
            </span>
          </h1>

          <motion.p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed" {...fadeUp(0.9)}>
            <span className="text-acid font-medium">PLM Teamcenter developer</span> with {profile.experience} years across development,
            administration and upgrades, and a <span className="text-lav">full stack developer</span> building web apps
            with Django, React and Python.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-4" {...fadeUp(1.05)}>
            <Magnetic>
              <a href="#experience" className="btn-primary">
                See my experience <i className="fas fa-arrow-down text-xs" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} download className="btn-ghost">
                <i className="fas fa-download text-xs" aria-hidden="true" /> Download resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className="flex items-center gap-3 mt-10" {...fadeUp(1.2)}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social" aria-label="GitHub"><i className="fab fa-github" aria-hidden="true" /></a>
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social" aria-label="LinkedIn"><i className="fab fa-linkedin-in" aria-hidden="true" /></a>}
            <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="social" aria-label="LeetCode"><i className="fas fa-code" aria-hidden="true" /></a>
            <a href="#contact" className="social" aria-label="Email me"><i className="fas fa-envelope" aria-hidden="true" /></a>
          </motion.div>
        </motion.div>

        {/* CAD title block */}
        <motion.div className="lg:col-span-5 min-w-0" style={{ y: yBlock }}>
          <motion.div
            className="dim mb-3 origin-center"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
          >
            <span>PLM ⟷ WEB</span>
          </motion.div>

          <motion.div
            className="tb frame"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            {titleBlock.map((row, r) => (
              <motion.div
                key={r}
                className="tb-row"
                style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + r * 0.12, ease: EASE }}
              >
                {row.map(([k, v, cls]) => (
                  <div key={k} className="tb-cell">
                    <span className="tb-k">{k}</span>
                    <span className={`tb-v ${cls || ''}`}>{v}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>

          <motion.p className="label mt-3 text-right" {...fadeUp(1.6)}>
            Dwg no. {profile.drawingNo} · Scale 1:1
          </motion.p>
        </motion.div>
      </div>

      {/* Ruler */}
      <motion.div
        className="absolute inset-x-0 bottom-0 px-5 sm:px-8 pointer-events-none"
        aria-hidden="true"
        {...fadeUp(1.4)}
      >
        <div className="wrap">
          <div className="flex justify-between label mb-1.5">
            <span>0</span>
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>Scroll ↓</motion.span>
            <span>1:1</span>
          </div>
          <div className="ruler" />
        </div>
      </motion.div>
    </section>
  );
}
