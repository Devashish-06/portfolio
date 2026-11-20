import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Work from './components/Work.jsx';
import Stack from './components/Stack.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Hud from './components/Hud.jsx';

/** Tracks which section is in the middle of the screen. */
function useActiveSection() {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function App() {
  const active = useActiveSection();

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] btn-primary">
        Skip to content
      </a>
      <Nav active={active} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Hud active={active} />
    </MotionConfig>
  );
}
