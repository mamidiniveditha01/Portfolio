import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const hellos = ['Hello', 'Hola', 'నమస్కారం', 'Bonjour', 'こんにちは', 'مرحبا', 'Ciao', '안녕하세요', 'Olá', 'Hej'];

const E = [0.16, 1, 0.3, 1] as const;

export default function Loader({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Cycle through hellos every 260ms
    const interval = setInterval(() => {
      setIndex(i => {
        if (i >= hellos.length - 1) {
          clearInterval(interval);
          // After last word, wait briefly then exit
          setTimeout(() => setExiting(true), 300);
          setTimeout(onDone, 900);
          return i;
        }
        return i + 1;
      });
    }, 260);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#0E0B1F' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: E }}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(155,126,189,0.18) 0%, transparent 70%)' }}
          />

          <div className="relative text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                className="font-fraunces font-black text-white select-none"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                exit={{    opacity: 0, y: -28, filter: 'blur(8px)' }}
                transition={{ duration: 0.22, ease: E }}
              >
                {hellos[index]}
              </motion.p>
            </AnimatePresence>

            {/* Progress bar */}
            <motion.div
              className="mt-8 mx-auto rounded-full overflow-hidden"
              style={{ width: 120, height: 2, background: 'rgba(255,255,255,0.1)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#9B7EBD,#6BA3D4)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${((index + 1) / hellos.length) * 100}%` }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
