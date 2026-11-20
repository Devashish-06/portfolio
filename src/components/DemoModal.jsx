import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from './motion.jsx';

/**
 * Pop-up demo player.
 * project.demo can be:
 *   { video: 'demos/file.mp4' }   – a file in public/demos/
 *   { youtube: 'VIDEO_ID' }       – a YouTube video (public or unlisted)
 */
export default function DemoModal({ project, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  // Remember which project's video failed, so a different project starts fresh with no reset effect
  const [failedId, setFailedId] = useState(null);
  const failed = failedId === project?.id;
  const open = Boolean(project);

  // Esc to close, keep Tab focus inside the dialog, lock page scroll, restore focus afterwards
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll('button, a[href], iframe, [tabindex]:not([tabindex="-1"])');
        if (!items.length) { e.preventDefault(); return; }
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={dialogRef}
            id="demoModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demoTitle"
            className="relative w-full max-w-5xl tile frame !p-0 overflow-hidden shadow-2xl shadow-black/60"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-lav/10">
              <div className="min-w-0">
                <p className="label">Item {project.id} · Demo recording</p>
                <h3 id="demoTitle" className="text-lg font-bold truncate">{project.name}</h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="social shrink-0"
                aria-label="Close demo"
              >
                <i className="fas fa-xmark" aria-hidden="true" />
              </button>
            </div>

            {/* Player */}
            <div className="relative bg-black aspect-video">
              {project.demo.youtube ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${project.demo.youtube}?autoplay=1&rel=0&modestbranding=1`}
                  title={`${project.name} demo video`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : failed ? (
                <div className="absolute inset-0">
                  <img src={project.image} alt="" className="w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <i className="fas fa-film text-3xl text-lav mb-4" aria-hidden="true" />
                    <p className="text-white font-semibold mb-1">Demo video coming soon</p>
                    <p className="text-sm text-gray-400">In the meantime, the source code is on GitHub.</p>
                  </div>
                </div>
              ) : (
                <video
                  className="absolute inset-0 w-full h-full"
                  src={project.demo.video}
                  poster={project.image}
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  onError={() => setFailedId(project.id)}
                >
                  <track kind="captions" />
                </video>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {project.tags.map((t) => <li key={t} className="tag">{t}</li>)}
              </ul>
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
                <i className="fab fa-github" aria-hidden="true" /> View code
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
