import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { profile, sections } from '../data.js';
import { EASE, Magnetic } from './motion.jsx';

export default function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <motion.header
      id="siteNav"
      className={`fixed inset-x-0 top-0 z-50 ${scrolled || open ? 'nav-scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <nav className="wrap px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between" aria-label="Main">
        <a href="#top" className="flex items-center gap-3" aria-label="Devashish Deshmukh, back to top">
          <span className="w-9 h-9 grid place-items-center rounded-md border border-acid/60 font-mono text-xs font-medium text-acid">DD</span>
          <span className="hidden sm:block md:hidden lg:block font-display font-bold text-white">
            Devashish<span className="text-acid">.</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-5 lg:gap-7">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={`nav-link ${active === s.id ? 'active' : ''}`}>
                <span className="text-gray-600 mr-1.5">{s.no}</span>{s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Magnetic className="hidden sm:inline-flex">
            <a href={profile.resume} download className="btn-primary !py-2.5">
              <i className="fas fa-download text-xs" aria-hidden="true" /> Resume
            </a>
          </Magnetic>
          <button
            id="menuBtn"
            type="button"
            className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-md border border-lav/20 text-lav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen((o) => !o)}
          >
            <i className={`fas ${open ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobileMenu"
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="mx-5 mb-4 p-5 rounded-lg bg-panel border border-lav/15 flex flex-col gap-4">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  className="nav-link !text-sm"
                  onClick={(e) => {
                    // Close the menu first, then scroll; the link is removed when the menu closes,
                    // so the browser's default jump would be cancelled.
                    e.preventDefault();
                    setOpen(false);
                    requestAnimationFrame(() => {
                      document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                      history.replaceState(null, '', `#${s.id}`);
                    });
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <span className="text-gray-600 mr-2">{s.no}</span>{s.label}
                </motion.a>
              ))}
              <a href={profile.resume} download className="btn-primary">
                <i className="fas fa-download text-xs" aria-hidden="true" /> Download resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress */}
      <motion.div className="absolute left-0 right-0 bottom-0 h-[2px] bg-acid origin-left" style={{ scaleX: progress }} />
    </motion.header>
  );
}
