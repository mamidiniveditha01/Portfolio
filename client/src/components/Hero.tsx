import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const E = [0.16, 1, 0.3, 1] as const;

function SpacedText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: E, delay: delay + i * 0.038 }}
        >
          {ch === ' ' ? '\u00A0\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

function NameLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
      <motion.div
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: E, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], reduced ? [1, 1] : [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-dvh flex flex-col justify-center overflow-hidden pt-24 pb-24">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(155,126,189,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        mixBlendMode: 'overlay'
      }} />
      
      <motion.div style={{ y, opacity }} className="container w-full relative z-10">

        {/* ── Availability badge ── */}
        <motion.div
          className="avail-badge mb-10 w-fit shadow-hover"
          initial={{ opacity: 0, x: -16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="avail-dot" />
          Available for opportunities
        </motion.div>

        {/* ── Massive stacked name ── */}
        <h1 style={{ lineHeight: 0.95 }}>
          <NameLine delay={0.3}>
            <span className="font-valentina" style={{ fontSize: 'clamp(4.5rem, 14vw, 10rem)', fontWeight: 400, color: '#1A1628', display: 'block' }}>Mamidi</span>
          </NameLine>
          <NameLine delay={0.46}>
            <span className="font-fraunces font-black gradient-text heading-xl" style={{ display: 'block' }}>Niveditha</span>
          </NameLine>
        </h1>

        {/* ── Spaced-letter intro ── */}
        <motion.p
          className="font-dm mt-10"
          style={{
            fontSize: 'clamp(0.7rem, 1.35vw, 0.95rem)',
            letterSpacing: '0.26em',
            color: 'var(--muted-foreground)',
            textTransform: 'uppercase',
            maxWidth: '72ch',
            lineHeight: 2.2,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          <SpacedText text="Full-Stack Engineer · AI Systems · IoT Builder" delay={1.05} />
          <br />
          <SpacedText text="Open-Source Contributor · Hyderabad" delay={1.45} />
        </motion.p>

        {/* ── Role chips ── */}
        <motion.div
          className="flex flex-wrap gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.85 }}
        >
          {['Full-Stack Engineer', 'AI Intern', 'IoT Builder', 'Open Source Contributor', 'CS Undergraduate'].map((role, i) => (
            <motion.span
              key={role}
              className="px-3 py-1 rounded-full glass text-[0.72rem] font-medium text-muted-foreground border border-primary/10"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: E, delay: 1.9 + i * 0.07 }}
            >
              {role}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="w-[1px] h-10 bg-primary/30"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ originY: 0 }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
        Scroll
      </motion.div>
    </section>
  );
}
