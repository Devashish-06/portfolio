import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

export const EASE = [0.2, 0.7, 0.2, 1];

const usePointerFine = () => {
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(window.matchMedia('(pointer: fine)').matches), []);
  return fine;
};

/** Fades and lifts its children into view the first time they scroll on screen. */
export function Reveal({ as = 'div', delay = 0, y = 28, className = '', children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={`reveal ${className}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Pulls its child slightly toward the cursor. */
export function Magnetic({ children, strength = 0.22, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 });
  const enabled = fine && !reduce;

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (!enabled) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength * 1.4);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}

/** Tilts a card in 3D toward the cursor. */
export function Tilt({ children, className = '', max = 5 }) {
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const enabled = fine && !reduce;

  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (!enabled) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** Counts a number up from 0 when it scrolls into view. */
export function CountUp({ to, decimals = 0, suffix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => v.toFixed(decimals) + suffix);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { value.set(to); return; }
    const controls = animate(value, to, { duration: 1.6, ease: EASE });
    return () => controls.stop();
  }, [inView, reduce, to, value]);

  return <motion.span ref={ref} className={className}>{text}</motion.span>;
}

/** Drawing-sheet header: "SHEET 02 / 05 ──────── EXPERIENCE · REVISION HISTORY" */
export function SheetHead({ no, title }) {
  return (
    <Reveal className="sheet-head">
      <span className="text-acid">Sheet {no} / 05</span>
      <motion.span
        className="flex-1 h-px bg-lav/20 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      />
      <span className="hidden sm:inline">{title}</span>
    </Reveal>
  );
}
