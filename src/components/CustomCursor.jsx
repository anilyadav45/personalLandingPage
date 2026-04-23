import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let trailX = -100, trailY = -100;
    let raf;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const animateTrail = () => {
      trailX += (pos.x - trailX) * 0.12;
      trailY += (pos.y - trailY) * 0.12;
      setTrailPos({ x: trailX, y: trailY });
      raf = requestAnimationFrame(animateTrail);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onHoverStart = (e) => {
      if (e.target.matches('a, button, [data-cursor="hover"]')) {
        setHovering(true);
      }
    };
    const onHoverEnd = () => setHovering(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onHoverStart);
    document.addEventListener('mouseout', onHoverEnd);
    raf = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
      cancelAnimationFrame(raf);
    };
  }, [pos.x, pos.y]);

  // Hide on touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);
  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]" style={{ mixBlendMode: 'difference' }}>
      {/* Main dot */}
      <div
        style={{
          position: 'fixed',
          left: pos.x - 4,
          top: pos.y - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#00f5d4',
          transform: `scale(${clicking ? 0.5 : 1})`,
          transition: 'transform 0.1s',
        }}
      />
      {/* Trailing ring */}
      <div
        style={{
          position: 'fixed',
          left: trailPos.x - (hovering ? 22 : 16),
          top: trailPos.y - (hovering ? 22 : 16),
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          borderRadius: '50%',
          border: '1px solid rgba(0,245,212,0.6)',
          transform: `scale(${clicking ? 0.8 : 1})`,
          transition: 'width 0.2s, height 0.2s, transform 0.1s',
        }}
      />
    </div>
  );
}
