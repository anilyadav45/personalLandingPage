import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Youtube, Heart } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const socials = [
    { icon: Github, href: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: personalInfo.instagram, label: 'Instagram' },
    { icon: Youtube, href: personalInfo.youtube, label: 'YouTube' },
  ];

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] border-gradient"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-display font-bold"
                style={{
                  background: 'linear-gradient(135deg, #00f5d4, #7c3aed)',
                  color: '#020308',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                AY
              </div>
              <span
                className="font-display font-semibold"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
              >
                Anil Yadav
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              CS student passionate about building real products with modern web technologies.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p
              className="text-xs font-mono tracking-[0.2em] uppercase mb-5"
              style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              Navigate
            </p>
            <div className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <div key={label}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm transition-colors duration-200 hover:text-current"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => { e.target.style.color = 'var(--accent)'; }}
                    onMouseLeave={(e) => { e.target.style.color = 'var(--text-muted)'; }}
                  >
                    {label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p
              className="text-xs font-mono tracking-[0.2em] uppercase mb-5"
              style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              Connect
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                  }}
                  whileHover={{
                    borderColor: 'var(--accent)',
                    color: 'var(--accent)',
                    y: -2,
                    transition: { duration: 0.15 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          <p
            className="text-xs flex items-center gap-1.5"
            style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            © {year} Anil Yadav · Still learning, still building
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {personalInfo.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
