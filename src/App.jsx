import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);

  // Apply/remove dark class on root <html>
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  const toggleTheme = useCallback(() => setDark(d => !d), []);
  const handleLoaderComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {/* Custom cursor (hidden on touch) */}
      <CustomCursor />

      {/* Intro loader */}
      <AnimatePresence>
        {loading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <>
          <Navbar dark={dark} toggleTheme={toggleTheme} />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
