import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { sections } from '../data.js';

const pad = (v) => String(Math.max(0, Math.round(v))).padStart(4, '0');

/**
 * CAD-style cursor: faint full-screen crosshair lines + a coordinate readout.
 * Desktop with a mouse only; hidden on touch devices and for reduced motion.
 */
export default function Hud({ active }) {
  const [enabled, setEnabled] = useState(false);
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const xText = useTransform(x, pad);
  const yText = useTransform(y, pad);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  const sheet = sections.find((s) => s.id === active)?.no || '00';

  return (
    <div aria-hidden="true">
      {!reduce && (
        <>
          <motion.div className="fixed top-0 bottom-0 w-px bg-lav/[0.07] pointer-events-none z-40" style={{ x: sx }} />
          <motion.div className="fixed left-0 right-0 h-px bg-lav/[0.07] pointer-events-none z-40" style={{ y: sy }} />
        </>
      )}
      <div id="hud" className="fixed left-4 bottom-4 z-40 font-mono text-[10px] tracking-[0.14em] uppercase text-gray-500 bg-ink/80 border border-lav/15 rounded px-3 py-1.5 backdrop-blur pointer-events-none">
        Sheet <span className="text-acid">{sheet}</span> / 05 · X <motion.span className="text-gray-300">{xText}</motion.span> Y{' '}
        <motion.span className="text-gray-300">{yText}</motion.span>
      </div>
    </div>
  );
}
