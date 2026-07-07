import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const E = [0.16, 1, 0.3, 1] as const;

const services = [
  'AI Development',
  'Machine Learning',
  'Full-Stack Engineering',
  'IoT Systems',
  'UI/UX Design',
  'Web Development',
  'Open Source',
  'Embedded Systems',
];

function ServiceTag({ label, index }: { label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.span
      ref={ref}
      className="identity-service-tag"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: E, delay: index * 0.06 }}
      whileHover={{ y: -4, scale: 1.05, transition: { duration: 0.2 } }}
    >
      {label}
    </motion.span>
  );
}

export default function Identity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="identity" className="py-24">
      <div className="container">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16">

          {/* Left — big stacked role */}
          <div className="flex-1 min-w-0">
            <motion.p
              className="section-tag mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              What I do
            </motion.p>

            <div className="flex flex-col gap-0" style={{ lineHeight: 0.9 }}>
              {['Full-Stack', 'Engineer &', 'AI Builder'].map((word, i) => (
                <div key={word} style={{ overflow: 'hidden' }}>
                  <motion.span
                    className="font-fraunces italic font-light block"
                    style={{
                      fontSize: 'clamp(3.2rem, 7vw, 7rem)',
                      letterSpacing: '-0.03em',
                      color: i === 1 ? 'var(--primary)' : '#1A1628',
                    }}
                    initial={{ y: '105%' }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ duration: 0.9, ease: E, delay: 0.1 + i * 0.12 }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — service tags */}
          <div className="flex-1">
            <motion.p
              className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Services & Focus Areas
            </motion.p>
            <div className="flex flex-wrap gap-3">
              {services.map((s, i) => (
                <ServiceTag key={s} label={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
