import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { projects } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

// 3D tilt card wrapper
function TiltCard({ children, className, style }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glare: { x: 50, y: 50 } });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const mx = e.clientX - cx;
    const my = e.clientY - cy;
    const rx = -(my / (rect.height / 2)) * 8;
    const ry = (mx / (rect.width / 2)) * 8;
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x: rx, y: ry, glare: { x: gx, y: gy } });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glare: { x: 50, y: 50 } });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,212,0.06) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label mb-4">02 — Projects</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display font-bold leading-tight"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'var(--text-primary)',
              }}
            >
              Things I've
              <br />
              <span className="text-gradient">built & shipped</span>
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed md:text-right"
              style={{ color: 'var(--text-muted)' }}
            >
              A collection of projects ranging from full-stack web apps to UI experiments — each one a new lesson.
            </p>
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <TiltCard
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                  cursor: 'default',
                }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 30%, rgba(15,20,36,0.95) 100%)`,
                    }}
                  />
                  {/* Color accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: project.color }}
                  />

                  {/* Status badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono font-medium"
                    style={{
                      background: project.status === 'Completed'
                        ? 'rgba(0,245,212,0.15)'
                        : 'rgba(251,191,36,0.15)',
                      border: `1px solid ${project.status === 'Completed' ? 'rgba(0,245,212,0.4)' : 'rgba(251,191,36,0.4)'}`,
                      color: project.status === 'Completed' ? '#00f5d4' : '#fbbf24',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {project.status}
                  </div>

                  {/* Number */}
                  <div
                    className="absolute top-4 left-4 text-xs font-mono opacity-50"
                    style={{ color: project.color, fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {project.subtitle}
                  </div>
                  <h3
                    className="text-xl font-display font-bold mb-3"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-muted)',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      whileHover={{ color: 'var(--text-primary)', x: 2 }}
                    >
                      <Github size={15} />
                      Code
                    </motion.a>
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium"
                        style={{ color: project.color }}
                        whileHover={{ x: 2 }}
                      >
                        <ExternalLink size={15} />
                        Live Demo
                        <ArrowUpRight size={12} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a
            href="https://github.com/anilyadav45"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github size={16} />
            More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
