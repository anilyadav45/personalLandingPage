import { useEffect, useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { personalInfo } from '../data';

// ── 3D blob in the hero ──────────────────────────────────────────────────────
function HeroBlob() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.18;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.4, 128, 128]}>
        <MeshDistortMaterial
          color="#00f5d4"
          attach="material"
          distort={0.45}
          speed={2.5}
          roughness={0}
          metalness={0.6}
          wireframe={false}
          opacity={0.18}
          transparent
        />
      </Sphere>
      <Sphere args={[1.38, 64, 64]}>
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.38}
          speed={1.8}
          roughness={0.1}
          metalness={0.4}
          wireframe={true}
          opacity={0.07}
          transparent
        />
      </Sphere>
    </Float>
  );
}

// ── Floating ring ─────────────────────────────────────────────────────────────
function Ring() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      ref.current.rotation.z = clock.getElapsedTime() * 0.08;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[2.2, 0.006, 16, 120]} />
      <meshBasicMaterial color="#00f5d4" transparent opacity={0.2} />
    </mesh>
  );
}

// ── Animated typing text ──────────────────────────────────────────────────────
function TypedText({ texts }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index % texts.length];
    let timeout;
    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setDeleting(false);
        setIndex(i => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts]);

  return (
    <span className="cursor" style={{ color: 'var(--accent)' }}>
      {displayed}
    </span>
  );
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ── 3D canvas background ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Stars radius={80} depth={60} count={800} factor={3} saturation={0} fade speed={0.8} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#00f5d4" />
            <pointLight position={[-5, -3, -5]} intensity={0.8} color="#7c3aed" />
            <HeroBlob />
            <Ring />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Radial gradient overlays ── */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,245,212,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 60%, rgba(124,58,237,0.07) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 md:py-32"
      >
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            className="section-label mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="w-8 h-[1px]" style={{ background: 'var(--accent)' }} />
            Hello, World
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-display font-bold mb-4 leading-none"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {personalInfo.name.split(' ').map((word, i) => (
              <span key={i} style={{ display: 'block' }}>
                {i === 1 ? <span className="text-gradient">{word}</span> : word}
              </span>
            ))}
          </motion.h1>

          {/* Dynamic role */}
          <motion.div
            className="text-xl md:text-2xl font-display mb-8"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            I'm a{' '}
            <TypedText texts={personalInfo.roles} />
          </motion.div>

          {/* Short bio line */}
          <motion.p
            className="text-base mb-10 leading-relaxed max-w-lg"
            style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            CS student from Nepal · Building real products with MERN Stack, Java & Cloud technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <button className="btn-primary" onClick={scrollToProjects}>
              View Projects
            </button>
            <button className="btn-secondary" onClick={scrollToContact}>
              Contact Me
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-6 mt-10 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              { value: '7+', label: 'Projects Built' },
              { value: '10+', label: 'Technologies' },
              { value: '2+', label: 'Years Coding' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  className="text-2xl font-display font-bold"
                  style={{ fontFamily: 'Syne, sans-serif', color: 'var(--accent)' }}
                >
                  {value}
                </div>
                <div className="text-xs tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="section-label text-[10px]">Scroll</span>
        <motion.div
          className="w-[1px] h-10"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
