import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const E = [0.16, 1, 0.3, 1] as const;

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2200);
    const t2 = setTimeout(onDone, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#1A1628' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: E }}
        >
          {/* Floating orbs — background art */}
          {[
            { w: 520, h: 520, x: '-18%', y: '-22%', c: 'rgba(155,126,189,0.18)' },
            { w: 380, h: 380, x: '62%',  y: '48%',  c: 'rgba(107,163,212,0.14)' },
            { w: 260, h: 260, x: '78%',  y: '-10%', c: 'rgba(125,184,163,0.12)' },
          ].map((o, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: o.w, height: o.h,
                left: o.x, top: o.y,
                background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4 + i * 1.2, ease: 'easeInOut', repeat: Infinity }}
            />
          ))}

          {/* "Hello" */}
          <motion.p
            className="relative z-10 font-fraunces font-black text-white select-none"
            style={{ fontSize: 'clamp(4rem, 14vw, 9rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
            initial={{ opacity: 0, y: 32, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: E, delay: 0.15 }}
          >
            Hello.
          </motion.p>

          {/* Loading bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(90deg,#9B7EBD,#6BA3D4,#7DB8A3)', originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.1, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
