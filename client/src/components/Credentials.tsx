import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const E = [0.16, 1, 0.3, 1] as const;

const traitsText = "I'm adaptable, communicative, and a natural problem solver. I bring curiosity to every project, work seamlessly in teams, and believe creativity happens at the intersection of diverse perspectives. Collaboration isn't just how I work—it's where I thrive.";

const education = [
  { period: '2024 – 2028', deg: 'B.Tech, Computer Science', inst: 'MLRIT, Hyderabad' },
  { period: '2022 – 2024', deg: 'Intermediate (MPC)',        inst: 'Sri Chaitanya Junior College' },
  { period: 'Until 2022',  deg: 'Secondary School',          inst: 'Geetanjali High School' },
];

export default function Credentials() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  return (
    <section id="credentials" className="py-24">
      <div className="container">
        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: E }}
          >
            <div className="numbered-section mb-8">
              <div className="section-number">02</div>
              <div className="section-divider" />
            </div>
            <p className="section-tag mb-5">Who I am</p>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          ref={contentRef}
          className="mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: E }}
        >
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: E, delay: 0.1 }}
          >
            <motion.p
              className="text-foreground/95 text-base md:text-lg leading-relaxed tracking-[0.05em]"
              initial={{ opacity: 0, y: 12 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: E, delay: 0.2 }}
              style={{ lineHeight: 1.9, maxWidth: '72ch' }}
            >
              I&apos;m <span className="font-semibold uppercase">adaptable</span>, <span className="font-semibold uppercase">communicative</span>, and a natural <span className="font-semibold uppercase">problem solver</span>. I bring curiosity to every project, work seamlessly in teams, and believe creativity happens at the intersection of diverse perspectives. Collaboration isn&apos;t just how I work — it&apos;s where I thrive.
            </motion.p>

            <div>
              <motion.h4
                className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-4"
                initial={{ opacity: 0, y: 12 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: E, delay: 0.3 }}
              >EDUCATION</motion.h4>
              <div className="grid gap-5">
                {education.map((e, i) => (
                  <motion.div
                    key={i}
                    className="rounded-3xl bg-background/90 p-5 border border-primary/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={contentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: E, delay: 0.35 + i * 0.08 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary mb-2">{e.period}</p>
                    <p className="text-base font-semibold text-foreground">{e.deg}</p>
                    <p className="text-sm text-muted-foreground mt-1">{e.inst}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
