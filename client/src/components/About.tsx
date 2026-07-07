import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const E = [0.16, 1, 0.3, 1] as const;

/* ── Each "chapter" of the story scrolls in as a full statement ── */
interface Chapter {
  label: string;
  headline: string[];       // lines split for staggered reveal
  accent?: number;          // which line index gets gradient colour
  body?: string;
}

const chapters: Chapter[] = [
  {
    label: 'The beginning',
    headline: ['I started with', 'curiosity.'],
    accent: 1,
    body: 'Growing up in Hyderabad, I was the person who took things apart to see how they worked — circuits, websites, ideas. That instinct became a Computer Science degree at MLRIT.',
  },
  {
    label: 'The pivot to AI',
    headline: ['Then AI changed', 'everything.'],
    accent: 1,
    body: 'Working as an AI Virtual Intern at DecodeLabs, I got hands-on with real AI workflows — building, shipping, iterating. Selected for the AI Agent Track at GirlScript Summer of Code 2026, I collaborating with global maintainers on intelligent systems that actually work.',
  },
  {
    label: 'The hardware side',
    headline: ['Code with a', 'physical body.'],
    accent: 1,
    body: 'Not just software — I build things you can touch. Fire-fighting robots. Milk quality detectors. Smart distance indicators with IoT sensors. When software meets hardware, engineering feels most alive.',
  },
  {
    label: 'The mission',
    headline: ['Building things', 'that matter.'],
    accent: 1,
    body: '"To grow as an AI engineer and full-stack developer — shipping intelligent solutions, contributing to open source, and crafting interfaces that make someone\'s day genuinely better."',
  },
];

const strengths = ['Adaptability', 'Communication', 'Teamwork', 'Problem Solving', 'Creativity', 'Curiosity'];

const education = [
  { period: '2024 – 2028', deg: 'B.Tech, Computer Science', inst: 'MLRIT, Hyderabad' },
  { period: '2022 – 2024', deg: 'Intermediate (MPC)',        inst: 'Sri Chaitanya Junior College' },
  { period: 'Until 2022',  deg: 'Secondary School',          inst: 'Geetanjali High School' },
];

/* ── Single story chapter ── */
function Chapter({ ch, index }: { ch: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="story-chapter">
      {/* Label */}
      <motion.p
        className="section-tag mb-6"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: E }}
      >
        {ch.label}
      </motion.p>

      {/* Big headline — each line clips up */}
      <h2 className="font-fraunces font-black leading-[0.95] mb-7"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', letterSpacing: '0.01em' }}>
        {ch.headline.map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.span
              className={`block ${i === ch.accent ? 'gradient-text font-semibold' : ''}`}
              initial={{ y: '105%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, ease: E, delay: i * 0.13 }}
            >
              {line}
            </motion.span>
          </div>
        ))}
      </h2>

      {/* Body */}
      {ch.body && (
        <motion.p
          className="text-muted-foreground leading-relaxed max-w-[52ch]"
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: E, delay: 0.35 }}
        >
          {ch.body}
        </motion.p>
      )}

      {/* Chapter index dot */}
      <motion.div
        className="story-dot"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
      >
        <span>{String(index + 1).padStart(2, '0')}</span>
      </motion.div>
    </div>
  );
}

export default function About() {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const eduRef = useRef(null);
  const eduInView = useInView(eduRef, { once: true, margin: '-60px' });

  return (
    <section id="about" className="relative" ref={outerRef}>
      {/* ── Section Header with Number ── */}
      <div className="container pt-12 pb-8" ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="numbered-section mb-4">
            <div className="section-number">05</div>
            <div className="section-divider" />
          </div>
        </motion.div>
      </div>

      {/* Vertical progress spine */}
      <div className="story-spine-track">
        <motion.div className="story-spine-fill" style={{ height: lineH }} />
      </div>

      {/* ── Story chapters ── */}
      <div className="container">
        <div className="story-layout">
          {chapters.map((ch, i) => (
            <Chapter key={i} ch={ch} index={i} />
          ))}
        </div>
      </div>

      {/* ── Strengths + Education footer ── */}
      <div className="container pb-24" ref={eduRef}>
        <motion.div
          className="story-footer-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={eduInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: E }}
        >
          {/* Strengths */}
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">Character</p>
            <div className="flex flex-wrap gap-2">
              {strengths.map((s, i) => (
                <motion.span
                  key={s}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={eduInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, ease: E, delay: i * 0.07 }}
                  whileHover={{ y: -3, scale: 1.06 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">Education</p>
            <div className="flex flex-col gap-5">
              {education.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={eduInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, ease: E, delay: i * 0.1 }}
                  style={{ paddingLeft: '1rem', borderLeft: '2px solid rgba(124,92,191,0.2)' }}
                >
                  <p className="text-[0.7rem] font-bold text-primary uppercase tracking-widest mb-0.5">{e.period}</p>
                  <p className="font-semibold text-foreground text-sm">{e.deg}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{e.inst}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Campus ambassador */}
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">Also</p>
            <motion.div
              className="glass-card p-5"
              initial={{ opacity: 0, y: 16 }}
              animate={eduInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: E, delay: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <p className="font-semibold text-foreground text-sm">Campus Ambassador</p>
              <p className="text-muted-foreground text-xs mt-1">GenzEducate Wing</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
