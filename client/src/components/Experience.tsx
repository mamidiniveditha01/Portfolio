import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const E = [0.16, 1, 0.3, 1] as const;

const items = [
  {
    date: 'Completed',
    role: 'AI Virtual Intern',
    org: 'DecodeLabs',
    highlight: true,
    points: [
      'Worked on frontend development tasks using modern web technologies',
      'Improved skills in UI design, coding practices, and deployment workflows',
      'Gained practical experience in real-world project development cycles',
    ],
  },
  {
    date: '2026 – Present',
    role: 'AI Agent Track Contributor',
    org: 'GirlScript Summer of Code',
    highlight: false,
    points: [
      'Selected as an open-source contributor under the AI Agent Track',
      'Collaborated on development tasks with global maintainers worldwide',
      'Earned badges in open-source contribution and AI engineering tracks',
    ],
  },
  {
    date: '2026',
    role: 'Open Source Contributor',
    org: 'Elite Coders Winter of Code',
    highlight: false,
    points: [
      'Selected as contributor and actively participated in collaborative projects',
      'Contributed to coding tasks, project enhancement, and open-source learning',
      'Strengthened problem-solving and teamwork through real-world contributions',
    ],
  },
  {
    date: '2024 – Present',
    role: 'Project Developer',
    org: 'Academic & Personal Projects',
    highlight: false,
    points: [
      'Built AI-Based Skill Gap Analyzer, Fire Fighting Robot, Milk Detection System',
      'Developed Smart Distance Indicator, Home Farm Tool, and Dexpress Software',
      'Worked across IoT, AI, frontend, and design tools for real-world solutions',
    ],
  },
  {
    date: 'Active',
    role: 'Campus Ambassador',
    org: 'GenzEducate Wing',
    highlight: false,
    points: [
      'Representing GenzEducate Wing at Marri Laxman Reddy Institute of Technology',
      'Bridging student community with learning opportunities and tech initiatives',
    ],
  },
];

function Card({ item, index }: { item: typeof items[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 group"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: E, delay: index * 0.08 }}
      whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(124,92,191,0.14)' }}
    >
      {/* Top accent line reveal */}
      <motion.div
        style={{ height: '2px', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', marginBottom: '1.25rem', originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: E, delay: index * 0.08 + 0.2 }}
      />
      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{item.date}</p>
      <p className="font-bold text-foreground text-base mb-0.5">{item.role}</p>
      <p className="text-primary text-sm font-medium mb-4">— {item.org}</p>
      <ul className="space-y-2">
        {item.points.map((p, i) => (
          <motion.li
            key={i}
            className="flex gap-2 text-muted-foreground text-sm leading-snug"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: E, delay: index * 0.08 + 0.35 + i * 0.07 }}
          >
            <span className="text-primary flex-shrink-0 mt-0.5">›</span>
            <span>{p}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Experience() {
  const titleRef = useRef(null);
  const inView   = useInView(titleRef, { once: true, margin: '-80px' });
  const lineRef  = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: '-40px' });

  return (
    <section id="experience" className="py-32">
      <div className="container">
        <motion.div ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: E }}
          className="mb-16"
        >
          {/* Numbered Section Header */}
          <div className="numbered-section mb-6">
              <div className="section-number">05</div>
            <div className="section-divider" />
          </div>

          <div className="section-tag mb-5">Where I've contributed</div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-fraunces font-black leading-tight heading-lg"
              style={{ letterSpacing: '0.01em' }}
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: E, delay: 0.1 }}
            >
              AI internship, open source,<br />
              <span className="gradient-text font-semibold">and building things that ship.</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Desktop alternating timeline */}
        <div className="relative hidden md:block" ref={lineRef}>
          {/* Animated timeline line draw */}
          <motion.div
            className="tl-line"
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: E, delay: 0.2 }}
            style={{ originY: 0 }}
          />
          <div className="flex flex-col gap-0">
            {items.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: E, delay: i * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-[1fr_auto_1fr] gap-8 items-start py-10"
                style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(124,92,191,0.07)' : 'none' }}
              >
                <div className={i % 2 === 0 ? 'block' : 'invisible'}>
                  {i % 2 === 0 && <Card item={item} index={i} />}
                </div>
                <div className="flex flex-col items-center pt-5">
                  <motion.div
                    className="tl-dot"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: i * 0.1 + 0.2 }}
                  />
                </div>
                <div className={i % 2 !== 0 ? 'block' : 'invisible'}>
                  {i % 2 !== 0 && <Card item={item} index={i} />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile stack */}
        <div className="flex flex-col gap-5 md:hidden">
          {items.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
