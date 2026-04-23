import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Code2, Layers, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const infoCards = [
    { icon: MapPin, label: 'Based in', value: personalInfo.location },
    { icon: Code2, label: 'Field', value: personalInfo.field },
    { icon: Layers, label: 'Focus', value: personalInfo.focus },
  ];

  return (
    <section
      id="about"
      className="py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large decorative letter */}
      <div
        className="absolute right-0 top-0 text-[20vw] font-display font-bold leading-none select-none pointer-events-none opacity-[0.02]"
        style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
      >
        ABOUT
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-20">
            <div className="section-label mb-4">01 — About</div>
            <h2
              className="font-display font-bold leading-tight"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'var(--text-primary)',
              }}
            >
              Crafting code with
              <br />
              <span className="text-gradient">purpose & precision</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"
          >

            {/* Left: avatar + info cards */}
            <motion.div variants={fadeUp} className="space-y-6">
              {/* Avatar card */}
              <div
                className="relative rounded-2xl overflow-hidden aspect-square max-w-xs mx-auto md:max-w-sm"

                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {/* Animated photo with layered glow rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer rotating gradient ring */}
                  <div
                    className="absolute  rounded-full animate-spin-slow"
                    style={{
                      background: 'conic-gradient(from 0deg, #00f5d4, #7c3aed, #06b6d4, #f0abfc, #00f5d4)',
                      padding: '2px',
                      borderRadius: '50%',
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ background: 'var(--bg-panel)' }}
                    />
                  </div>

                  {/* Inner pulsing glow */}
                  <div
                    className="absolute w-48 h-48 rounded-full animate-pulse-slow"
                    style={{
                      boxShadow: '0 0 40px rgba(0,245,212,0.25), 0 0 80px rgba(124,58,237,0.15)',
                    }}
                  />

                  {/* Photo */}
                  <img
                    src="/profile.jpg"
                    alt="Anil Yadav"
                    className="relative z-10 w-48 h-48 rounded-full object-cover object-[50%_30%] object-center"
                    style={{
                      border: '3px solid rgba(0,245,212,0.5)',
                      boxShadow: '0 0 30px rgba(0,245,212,0.2)',
                    }}
                  />

                  {/* Glass reflection shimmer */}
                  <div
                    className="absolute z-20 w-48 h-48 rounded-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
                    }}
                  />
                </div>

                {/* Corner accents */}
                {[
                  'top-3 left-3 border-t border-l',
                  'top-3 right-3 border-t border-r',
                  'bottom-3 left-3 border-b border-l',
                  'bottom-3 right-3 border-b border-r',
                ].map((cls, i) => (
                  <div
                    key={i}
                    className={`absolute ${cls} w-5 h-5`}
                    style={{ borderColor: 'var(--accent)' }}
                  />
                ))}

                {/* Status badge */}
                <div
                  className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{
                    background: 'rgba(2,3,8,0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,245,212,0.2)',
                  }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00f5d4' }} />
                  <span
                    className="text-xs font-mono"
                    style={{ color: '#00f5d4', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Open to Opportunities
                  </span>
                </div>
              </div>

              {/* Info cards */}
              <div className="space-y-3">
                {infoCards.map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-4 rounded-xl px-5 py-4"
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-color)',
                    }}
                    whileHover={{
                      borderColor: 'var(--accent)',
                      x: 4,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,245,212,0.1)' }}
                    >
                      <Icon size={16} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: bio + highlights */}
            <motion.div variants={fadeUp} className="space-y-8">
              <div>
                <h3
                  className="text-2xl font-display font-semibold mb-5"
                  style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                >
                  Computer Science Student with a Passion for Building Real Products
                </h3>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <p>{personalInfo.bio}</p>
                  <p>
                    I believe the best way to learn is by building. Every project I take on pushes me to solve real problems, understand systems deeply, and write code that actually ships.
                  </p>
                </div>
              </div>

              {/* Highlight boxes */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { num: '7+', text: 'Projects Shipped' },
                  { num: '2+', text: 'Years Building' },
                  { num: '10+', text: 'Technologies' },
                  { num: '∞', text: 'Things to Learn' },
                ].map(({ num, text }) => (
                  <div
                    key={text}
                    className="rounded-xl p-5"
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div
                      className="text-3xl font-display font-bold mb-1"
                      style={{ fontFamily: 'Syne, sans-serif', color: 'var(--accent)' }}
                    >
                      {num}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{text}</div>
                  </div>
                ))}
              </div>

              {/* Resume link */}
              <motion.a
                href="/Anil_resume.pdf"
                className="inline-flex items-center gap-3 text-sm font-display font-semibold group"
                style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}
                whileHover={{ x: 4 }}
              >
                <span
                  className="w-10 h-[1px] transition-all duration-300 group-hover:w-16"
                  style={{ background: 'var(--accent)' }}
                />
                View Resume
                <ArrowUpRight size={15} style={{ color: 'var(--accent)' }} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
