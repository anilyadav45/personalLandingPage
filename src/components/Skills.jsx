import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data';

const categoryColors = {
  'Frontend': '#00f5d4',
  'Backend': '#7c3aed',
  'Tools & Cloud': '#06b6d4',
};

const categoryGradients = {
  'Frontend': 'linear-gradient(135deg, #00f5d4, #06b6d4)',
  'Backend': 'linear-gradient(135deg, #7c3aed, #f0abfc)',
  'Tools & Cloud': 'linear-gradient(135deg, #06b6d4, #7c3aed)',
};

function SkillBar({ name, level, color, index, inView }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-medium"
          style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
        >
          {name}
        </span>
        <motion.span
          className="text-xs font-mono tabular-nums"
          style={{ color, fontFamily: 'JetBrains Mono, monospace' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.05 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Track */}
      <div
        className="relative h-[3px] rounded-full overflow-hidden"
        style={{ background: 'var(--border-color)' }}
      >
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.3 + index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        {/* Glowing dot at the end */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
          initial={{ left: '0%', opacity: 0 }}
          animate={inView ? { left: `calc(${level}% - 4px)`, opacity: 1 } : {}}
          transition={{
            duration: 1.2,
            delay: 0.3 + index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="skills"
      className="py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background decorative text */}
      <div
        className="absolute left-0 top-0 text-[18vw] font-display font-bold leading-none select-none pointer-events-none opacity-[0.02]"
        style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
      >
        SKILLS
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label mb-4">03 — Skills</div>
          <h2
            className="font-display font-bold leading-tight"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: 'var(--text-primary)',
            }}
          >
            Tools in my
            <br />
            <span className="text-gradient">arsenal</span>
          </h2>
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, skillList], catIndex) => {
            const color = categoryColors[category];
            const gradient = categoryGradients[category];

            return (
              <motion.div
                key={category}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: catIndex * 0.15 }}
                whileHover={{
                  borderColor: color + '60',
                  boxShadow: `0 20px 60px ${color}15`,
                  y: -4,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                    style={{
                      background: gradient,
                      color: '#020308',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {String(catIndex + 1).padStart(2, '0')}
                  </div>
                  <h3
                    className="text-base font-display font-semibold"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    {category}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-5">
                  {skillList.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={color}
                      index={i}
                      inView={inView}
                    />
                  ))}
                </div>

                {/* Decorative corner gradient */}
                <div
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Tech logos strip */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p
            className="text-center text-xs mb-6 tracking-[0.3em] uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            Also familiar with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['EJS', 'Bootstrap', 'Shadcn/UI', 'Vercel', 'Render', 'Framer Motion', 'DSA', 'OOP'].map((tech) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full text-xs font-mono"
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                whileHover={{
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  y: -2,
                  transition: { duration: 0.2 },
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
