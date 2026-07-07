import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';

const E = [0.16, 1, 0.3, 1] as const;

const info = [
  { Icon: Mail,     label: 'Email',    val: 'mamidiniveditha02@gmail.com', href: 'mailto:mamidiniveditha02@gmail.com' },
  { Icon: MapPin,   label: 'Location', val: 'Hyderabad, India',            href: undefined },
  { Icon: Linkedin, label: 'LinkedIn', val: 'mamidi-niveditha',            href: 'https://www.linkedin.com/in/mamidi-niveditha-140439381' },
  { Icon: Github,   label: 'GitHub',   val: 'MAMIDINIVEDITHA',             href: 'https://github.com/MAMIDINIVEDITHA' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-32">
      <div className="container" ref={ref}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <div className="numbered-section mb-8">
            <div className="section-number">07</div>
            <div className="section-divider" />
          </div>
          <div className="section-tag mb-10">Get in touch</div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — photo in shaped frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: E, delay: 0.1 }}
            className="relative flex justify-center"
          >
            {/* Decorative blob */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(155,126,189,0.15) 0%, transparent 70%)',
              }}
            />

            {/* Photo — sharp rectangle, blurry glow extensions */}
            <div className="relative" style={{ width: '400px', height: '540px', flexShrink: 0 }}>

              {/* Blurred glow — no border-radius, bleeds out naturally */}
              <img src="/niveditha.jpg" aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: '50% 8%',
                  filter: 'blur(36px) saturate(1.5)',
                  transform: 'scale(1.22)',
                  opacity: 0.6,
                  zIndex: 0,
                }}
              />

              {/* Sharp photo — no border-radius */}
              <img
                src="/niveditha.jpg"
                alt="Mamidi Niveditha"
                style={{
                  position: 'relative', zIndex: 1,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: '50% 8%',
                  display: 'block',
                }}
              />
            </div>
          </motion.div>

          {/* RIGHT — headline + contact links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: E, delay: 0.15 }}
          >
            {/* Big headline */}
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="font-fraunces font-black leading-none heading-lg"
                style={{ color: '#1A1628', letterSpacing: '-0.03em' }}
                initial={{ y: '105%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: E, delay: 0.2 }}
              >
                Let's build
              </motion.h2>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="font-fraunces font-black leading-none gradient-text heading-lg"
                style={{ letterSpacing: '-0.03em' }}
                initial={{ y: '105%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: E, delay: 0.28 }}
              >
                together.
              </motion.h2>
            </div>

            <motion.p
              className="text-muted-foreground mt-5 mb-10 max-w-md"
              style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: E, delay: 0.4 }}
            >
              Open to collaborations, internships, and exciting projects. I'd love to hear what you're building.
            </motion.p>

            {/* Contact links */}
            <div className="flex flex-col gap-3">
              {info.map(({ Icon, label, val, href }, i) => (
                <motion.a
                  key={i}
                  href={href ?? '#'}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl group"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(155,126,189,0.12)',
                    backdropFilter: 'blur(16px)',
                    textDecoration: 'none',
                  }}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: E, delay: 0.45 + i * 0.07 }}
                  whileHover={{ x: 6, boxShadow: '0 8px 24px rgba(124,92,191,0.1)' }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center rounded-xl"
                    style={{ width: 38, height: 38, background: 'rgba(155,126,189,0.1)' }}
                  >
                    <Icon size={16} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-foreground truncate">{val}</p>
                  </div>
                  <motion.div
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--primary)', fontSize: '1rem' }}
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
