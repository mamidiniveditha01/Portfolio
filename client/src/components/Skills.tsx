import { motion, useScroll, useTransform, useInView, MotionValue } from 'framer-motion';
import { useRef } from 'react';

const E = [0.16, 1, 0.3, 1] as const;

const categories = [
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    body: "Built a Skill Gap Analyzer, contributed to GirlScript's AI Agent Track, and interned at DecodeLabs.",
    tags: ['Python', 'Machine Learning', 'AI Agents', 'Data Analysis', 'SQL', 'Basic R'],
    color: '#9B7EBD',
    bg: 'linear-gradient(145deg,#F0E6FF 0%,#DDD0F5 100%)',
    num: '01',
  },
  {
    id: 'frontend',
    label: 'Frontend & UI/UX',
    body: 'HTML, CSS, JavaScript, and Figma are my canvas. I design first, then build — every screen is thought through before a single line of code ships.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX Design', 'Figma', 'Responsive Web'],
    color: '#6BA3D4',
    bg: 'linear-gradient(145deg,#E0EEFF 0%,#C4DEFA 100%)',
    num: '02',
  },
  {
    id: 'iot',
    label: 'IoT & Embedded',
    body: 'Fire-fighting robots, milk quality detectors — hardware-software systems that interact with the real world.',
    tags: ['IoT Technologies', 'Embedded Systems', 'Hardware Integration', 'C', 'Java'],
    color: '#7DB8A3',
    bg: 'linear-gradient(145deg,#DCF5EE 0%,#B8E8D8 100%)',
    num: '03',
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    body: 'GitHub for collaboration, Fusion 360 for CAD, deployment pipelines for shipping. Open source taught me how real teams work.',
    tags: ['GitHub', 'Open Source', 'Fusion 360', 'AutoDesk', 'Deployment Tools', 'DBMS'],
    color: '#B87EBD',
    bg: 'linear-gradient(145deg,#F5E0FF 0%,#E8C8F0 100%)',
    num: '04',
  },
  {
    id: 'soft',
    label: 'Collaboration',
    body: 'Two open source programmes and an AI internship taught me the best solutions come from teams.',
    tags: ['Communication', 'Teamwork', 'Adaptability', 'Problem Solving', 'Creativity'],
    color: '#6BA3D4',
    bg: 'linear-gradient(145deg,#E8F0FF 0%,#D0E4F8 100%)',
    num: '05',
  },
];

const marqueeRow1 = ['Python', 'Machine Learning', 'AI Agents', 'HTML', 'CSS', 'JavaScript', 'Figma', 'UI/UX Design', 'IoT', 'Embedded Systems'];
const marqueeRow2 = ['GitHub', 'Open Source', 'Fusion 360', 'DBMS', 'Hardware Integration', 'Responsive Web', 'AutoDesk', 'Teamwork', 'Problem Solving', 'C'];

const TOTAL = categories.length;

function SkillCard({ cat, index, scrollYProgress }: {
  cat: typeof categories[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start   = index / TOTAL;
  const end     = (index + 1) / TOTAL;
  const segment = end - start;

  const scale   = useTransform(scrollYProgress, [start, start + segment * 0.2], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [start, start + segment * 0.15], [0, 1]);
  const exitTo  = index % 2 === 0 ? '-115%' : '115%';
  const x = index < TOTAL - 1
    ? useTransform(scrollYProgress, [end - segment * 0.2, end], ['0%', exitTo])
    : useTransform(scrollYProgress, [0, 1], ['0%', '0%']);

  return (
    <motion.div style={{ scale, opacity, x, position: 'absolute', inset: 0, originX: 0.5, originY: 0.5 }}>
      <div
        className="w-full h-full rounded-3xl flex flex-col justify-between overflow-hidden relative"
        style={{
          background: cat.bg,
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 8px 48px rgba(124,92,191,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
          padding: 'clamp(2rem,4vw,3.5rem)',
        }}
      >
        <div className="absolute -right-20 -top-20 rounded-full pointer-events-none"
          style={{ width: 340, height: 340, background: `radial-gradient(circle,${cat.color}18 0%,transparent 70%)` }} />

        <div className="relative z-10">
          <span className="font-fraunces font-black block mb-5"
            style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: cat.color, opacity: 0.6 }}>
            {cat.num} / {String(TOTAL).padStart(2, '0')}
          </span>
          <h3 className="font-fraunces font-black"
            style={{ fontSize: 'clamp(2.6rem,6.5vw,5rem)', color: '#1A1628', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            {cat.label}
          </h3>
        </div>

        <div className="relative z-10">
          <p className="text-muted-foreground leading-relaxed mb-5"
            style={{ fontSize: 'clamp(0.875rem,1.3vw,0.9375rem)', maxWidth: '50ch' }}>
            {cat.body}
          </p>
          <div className="flex flex-wrap gap-2">
            {cat.tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ background: 'rgba(255,255,255,0.72)', color: cat.color, border: `1px solid ${cat.color}28`, backdropFilter: 'blur(10px)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressDot({ index, scrollYProgress }: { index: number; scrollYProgress: MotionValue<number> }) {
  const mid     = (index + 0.5) / TOTAL;
  const opacity = useTransform(scrollYProgress, [index / TOTAL, mid, (index + 1) / TOTAL], [0.25, 1, 0.25]);
  const scale   = useTransform(scrollYProgress, [index / TOTAL, mid, (index + 1) / TOTAL], [1, 1.7, 1]);
  return <motion.div style={{ opacity, scale, width: 6, height: 6, borderRadius: '50%', background: categories[index].color }} />;
}

export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section id="skills" className="py-24">
      <div className="container mb-16" ref={headerRef}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E }}>
          <div className="numbered-section mb-8">
            <div className="section-number">04</div>
            <div className="section-divider" />
          </div>
          <div className="section-tag mb-5">What I can do</div>
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          <motion.h2 className="font-fraunces font-black leading-none heading-xl" style={{ color: '#1A1628' }}
            initial={{ y: '105%' }} animate={headerInView ? { y: 0 } : {}} transition={{ duration: 0.9, ease: E, delay: 0.1 }}>
            My
          </motion.h2>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.h2 className="font-fraunces font-black leading-none gradient-text heading-xl"
            initial={{ y: '105%' }} animate={headerInView ? { y: 0 } : {}} transition={{ duration: 0.9, ease: E, delay: 0.2 }}>
            Toolkit
          </motion.h2>
        </div>

        <motion.p className="text-muted-foreground mt-5 max-w-lg" style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}
          initial={{ opacity: 0, y: 12 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E, delay: 0.38 }}>
          Scroll through — each card slides in as you go.
        </motion.p>
      </div>

      {/* Pinned card deck */}
      <div ref={containerRef} style={{ height: `${TOTAL * 100}vh` }}>
        <div className="sticky top-0 flex items-center justify-center" style={{ height: '100vh' }}>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-10">
            {categories.map((_, i) => <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} />)}
          </div>
          <div className="relative w-full mx-auto" style={{ maxWidth: '860px', height: 'min(540px,68vh)', padding: '0 1.5rem' }}>
            {categories.map((cat, i) => (
              <SkillCard key={cat.id} cat={cat} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 overflow-hidden">
        <div className="marquee-outer">
          <div className="marquee-track">
            {[...marqueeRow1, ...marqueeRow1].map((t, i) => (
              <span key={i} className="flex-shrink-0 px-5 py-2 rounded-full glass text-sm font-medium text-foreground/70 border border-primary/10 whitespace-nowrap">{t}</span>
            ))}
          </div>
        </div>
        <div className="marquee-outer">
          <div className="marquee-track marquee-track-rev">
            {[...marqueeRow2, ...marqueeRow2].map((t, i) => (
              <span key={i} className="flex-shrink-0 px-5 py-2 rounded-full glass text-sm font-medium text-foreground/70 border border-primary/10 whitespace-nowrap">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
