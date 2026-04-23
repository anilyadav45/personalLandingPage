import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=loading, 1=reveal, 2=done

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase(1), 200);
          setTimeout(() => setPhase(2), 1000);
          setTimeout(() => onComplete(), 1400);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = "ANIL YADAV".split('');

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#020308' }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div style={{
              backgroundImage: `
                linear-gradient(rgba(0,245,212,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,212,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              width: '100%',
              height: '100%',
            }} />
          </div>

          {/* Corner decorations */}
          {[['top-8 left-8', 'border-t border-l'], ['top-8 right-8', 'border-t border-r'], ['bottom-8 left-8', 'border-b border-l'], ['bottom-8 right-8', 'border-b border-r']].map(([pos, border], i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-12 h-12 border-[#00f5d4]/60 ${border}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            />
          ))}

          {/* Name reveal */}
          <div className="flex gap-1 mb-12">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-6xl font-display font-bold"
                style={{
                  color: letter === ' ' ? 'transparent' : '#f0f4ff',
                  fontFamily: 'Syne, sans-serif',
                  letterSpacing: '0.05em',
                }}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: 'easeOut' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          {/* Role */}
          <motion.p
            className="text-sm tracking-[0.4em] uppercase mb-16"
            style={{ color: '#00f5d4', fontFamily: 'JetBrains Mono, monospace' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Full Stack Developer
          </motion.p>

          {/* Progress bar */}
          <div className="relative w-64 h-[1px]" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ background: 'linear-gradient(90deg, #00f5d4, #7c3aed)', width: `${Math.min(progress, 100)}%` }}
            />
            {/* Glowing dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background: '#00f5d4',
                boxShadow: '0 0 10px #00f5d4',
                left: `${Math.min(progress, 100)}%`,
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            />
          </div>

          <motion.p
            className="mt-4 text-xs tabular-nums"
            style={{ color: 'rgba(240,244,255,0.4)', fontFamily: 'JetBrains Mono, monospace' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.min(Math.round(progress), 100).toString().padStart(3, '0')}%
          </motion.p>

          {/* Phase 1: curtain reveal */}
          <AnimatePresence>
            {phase === 1 && (
              <>
                <motion.div
                  className="absolute inset-0"
                  style={{ background: '#020308', transformOrigin: 'top' }}
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
