import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const E = [0.16, 1, 0.3, 1] as const;

/* ── What I do ── */
const services = [
  'AI Development',
  'Machine Learning',
  'IoT Systems',
  'UI/UX Design',
  'Web Development',
  'Open Source',
  'Embedded Systems',
  'Frontend Engineering',
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
  const topRef = useRef(null);
  const topInView = useInView(topRef, { once: true, margin: '-60px' });

  return (
    <section id="identity" className="py-24">
      <div className="container">

        {/* ── Section header with numbering ── */}
        <div className="numbered-section mb-8">
          <div className="section-number">03</div>
          <div className="section-divider" />
        </div>

        {/* ── Top: Role headline + service tags ── */}
        <div ref={topRef} className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16 mb-20">

          {/* Left: big role title */}
          <div className="flex-1 min-w-0">
            <motion.p
              className="section-tag mb-4"
              initial={{ opacity: 0 }}
              animate={topInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              What I do
            </motion.p>

            {/* Big stacked role words — Nithin Warrier style */}
            <div className="flex flex-col gap-0" style={{ lineHeight: 0.9 }}>
              {['AI Intern &', 'CS Developer', '+ Designer'].map((word, i) => (
                <div key={word} style={{ overflow: 'hidden' }}>
                  <motion.span
                    className="font-fraunces font-black block uppercase"
                    style={{
                      fontSize: 'clamp(3.2rem, 7vw, 7rem)',
                      letterSpacing: '-0.03em',
                      color: i === 0 ? 'var(--primary)' : '#1A1628',
                    }}
                    initial={{ y: '105%' }}
                    animate={topInView ? { y: 0 } : {}}
                    transition={{ duration: 0.9, ease: E, delay: 0.1 + i * 0.12 }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: service tags cloud */}
          <div className="flex-1">
            <motion.p
              className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5"
              initial={{ opacity: 0 }}
              animate={topInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Services & Skills
            </motion.p>
            <div className="flex flex-wrap gap-3">
              {services.map((s, i) => (
                <ServiceTag key={s} label={s} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider line ── */}
        <motion.div
          className="divider mb-0"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: E }}
          style={{ originX: 0 }}
        />
      </div>
    </section>
  );
}
