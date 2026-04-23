import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ dark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{ height: 72 }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: scrolled
              ? dark ? 'rgba(2,3,8,0.85)' : 'rgba(240,244,255,0.85)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3 }}
          style={{
            borderBottom: scrolled ? `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` : 'none',
          }}
        />

        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="relative z-10 flex items-center gap-2"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-display font-bold"
            style={{
              background: 'linear-gradient(135deg, #00f5d4, #7c3aed)',
              color: '#020308',
            }}
          >
            AY
          </div>
          <span
            className="hidden sm:block font-display font-semibold text-sm tracking-wide"
            style={{ color: 'var(--text-primary)' }}
          >
            Anil Yadav
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="relative z-10 hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = active === id;
            return (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="relative px-4 py-2 text-sm font-display transition-colors duration-200"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[1px]"
                    style={{ background: 'var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div className="relative z-10 flex items-center gap-3">
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={dark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {dark
                  ? <Sun size={15} style={{ color: '#00f5d4' }} />
                  : <Moon size={15} style={{ color: '#7c3aed' }} />
                }
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu toggle */}
          <motion.button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            }}
            onClick={() => setMenuOpen(o => !o)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={menuOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen
                  ? <X size={16} style={{ color: 'var(--text-primary)' }} />
                  : <Menu size={16} style={{ color: 'var(--text-primary)' }} />
                }
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{
              background: dark ? 'rgba(2,3,8,0.97)' : 'rgba(240,244,255,0.97)',
              backdropFilter: 'blur(30px)',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="text-3xl font-display font-bold"
                  style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ color: '#00f5d4', x: 10 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
