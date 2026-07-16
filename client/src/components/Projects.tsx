import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  Variants,
} from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const E = [0.16, 1, 0.3, 1] as const;

const PROJECT_GRADIENTS = [
  'linear-gradient(135deg,#F0D8F5 0%,#C4DEFA 100%)',
  'linear-gradient(135deg,#C2EFE4 0%,#C4DEFA 100%)',
  'linear-gradient(135deg,#F5DCF0 0%,#E2CDEF 100%)',
  'linear-gradient(135deg,#C4DEFA 0%,#C2EFE4 100%)',
  'linear-gradient(135deg,#E2CDEF 0%,#F5DCF0 100%)',
];

interface Project {
  num: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    num: '01',
    name: 'AI-Based Skill Gap Analyzer',
    category: 'Artificial Intelligence · Career Intelligence',
    description:
      "An intelligent system that analyzes users' existing skills, identifies missing competencies, and recommends personalized learning paths to boost employability and career growth.",
    tags: ['AI', 'Machine Learning', 'Career Tech', 'Analytics'],
    image: '/projects/skill-gap-analyzer.png',
    liveUrl: 'https://ai-skill-gap-analyzer-ruby.vercel.app/',
  },
  {
    num: '02',
    name: 'Home Farm Designing Tool',
    category: 'Agritech · Planning Platform',
    description:
      'A software application for planning and designing efficient home farm layouts — helping users visualize space, organize crops, and structure their growing environment intelligently.',
    tags: ['Agritech', 'Planning', 'Design Tool', 'Visualization'],
    image: '/projects/homefarm-planner.png',
    liveUrl: 'https://homefarm-planner.vercel.app',
  },
  {
    num: '03',
    name: 'Sophix Event Management',
    category: 'SaaS · Event Technology',
    description:
      'A comprehensive platform that simplifies event creation, attendee registration, scheduling, and operational coordination — built for teams who need everything in one place.',
    tags: ['SaaS', 'Events', 'Management', 'Operations'],
    image: '/projects/sophix-events.png',
    liveUrl: 'https://sophix.vercel.app/',
  },
  {
    num: '04',
    name: 'Dexpress Deployment Software',
    category: 'DevOps · Deployment Tooling',
    description:
      'A deployment management tool created to simplify and streamline application deployment processes — reducing friction between development and production.',
    tags: ['DevOps', 'Deployment', 'Automation', 'Tooling'],
    image: '/projects/dexpress-deployment.png',
    liveUrl: 'https://zignasa-three.vercel.app/',
  },
];

/* ── Stagger variants ── */
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: E } },
};

/* ── Single project row ── */
function ProjectRow({ project, index, gradient }: { project: Project; index: number; gradient: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  /* Parallax on the image as the row scrolls */
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  /* Magnetic tilt on image block */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 25 });
  const springY = useSpring(my, { stiffness: 200, damping: 25 });
  const rotX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={rowRef}
      className="project-row group"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Thin top rule */}
      <motion.div
        className="project-rule"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: E, delay: 0.1 }}
        style={{ originX: 0 }}
      />

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch`}
        style={{ minHeight: '520px' }}
      >
        {/* ── Image side ── */}
        <motion.div
          className={`relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 1000 }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
          transition={{ duration: 1.1, ease: E, delay: 0.15 }}
        >
          {/* Gradient fallback always present; image overlays if it loads */}
          <div className="absolute inset-0" style={{ background: gradient }} />
          <motion.img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: imgY, scale: 1.12 }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />

          {/* Dark overlay, lightens on hover */}
          <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/25 transition-colors duration-700" />

          {/* Number watermark */}
          <span
            className="absolute top-6 left-6 font-fraunces font-black select-none pointer-events-none"
            style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', color: 'rgba(255,255,255,0.12)', lineHeight: 1 }}
          >
            {project.num}
          </span>

          {/* Category chip at bottom of image */}
          <motion.div
            className="absolute bottom-6 left-6"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: E, delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[0.7rem] font-semibold tracking-widest uppercase">
              {project.category}
            </span>
          </motion.div>
        </motion.div>

        {/* ── Content side ── */}
        <motion.div
          className={`flex flex-col justify-center p-10 md:p-14 bg-white/30 backdrop-blur-sm border-l border-primary/8 ${isEven ? 'md:order-2' : 'md:order-1 border-l-0 border-r border-primary/8'}`}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Project title with clip reveal */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h3
              className="font-fraunces font-black leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.01em', color: '#1A1628' }}
              initial={{ y: '105%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: E, delay: 0.3 }}
            >
              {project.name}
            </motion.h3>
          </div>

          <motion.p
            className="text-muted-foreground leading-relaxed mt-5 mb-7"
            style={{ fontSize: '0.9375rem', maxWidth: '42ch' }}
            variants={slideUp}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div className="flex flex-wrap gap-2 mb-9" variants={stagger}>
            {project.tags.map(tag => (
              <motion.span key={tag} className="skill-tag" variants={slideUp}>
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div className="flex items-center gap-4 flex-wrap" variants={slideUp}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Projects Section ─── */
export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-20">
      {/* ── Header ── */}
      <div className="container mb-16" ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: E }}
        >
          {/* Numbered Section Header */}
          <div className="numbered-section">
            <div className="section-number">06</div>
            <div className="section-divider" />
          </div>

          <div className="section-tag mb-5">Selected work</div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-fraunces font-black leading-tight heading-lg"
              style={{ letterSpacing: '0.01em' }}
              initial={{ y: '110%' }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: E, delay: 0.1 }}
            >
              Projects that{' '}
              <span className="gradient-text font-semibold">solve real problems</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-muted-foreground mt-4 max-w-xl"
            style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: E, delay: 0.35 }}
          >
            Each project is a deep dive — from problem definition through engineering to a polished
            product. Built at the intersection of AI, design, and modern web technology.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Project rows ── */}
      <div className="flex flex-col">
        {projects.map((p, i) => (
          <ProjectRow key={p.num} project={p} index={i} gradient={PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length]} />
        ))}
      </div>

      {/* Bottom rule */}
      <div className="project-rule" style={{ transform: 'none' }} />
    </section>
  );
}
