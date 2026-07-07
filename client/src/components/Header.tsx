import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const E = [0.16, 1, 0.3, 1] as const;
const nav = ['About','Skills','Experience','Projects','Contact'];

export default function Header() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: E, delay: 0.2 }}
    >
      <div
        className={`nav-pill w-full max-w-3xl rounded-full px-5 py-3 flex items-center justify-between transition-shadow duration-300 ${
          scrolled ? 'shadow-lg' : ''
        }`}
      >
        {/* Logo */}
        <a href="#home" onClick={e => scrollTo(e, '#home')}
           className="font-fraunces font-black text-lg text-foreground tracking-wide uppercase">
          Niveditha.
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
               onClick={e => scrollTo(e, `#${item.toLowerCase()}`)}
               className="text-[0.8rem] font-medium text-muted-foreground hover:text-primary px-3 py-1.5 rounded-full transition-all hover:bg-primary/8">
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#contact" onClick={e => scrollTo(e, '#contact')}
           className="hidden md:block text-[0.8rem] font-medium px-5 py-2 rounded-full bg-primary text-white hover:shadow-lg hover:shadow-primary/30 transition-all">
          Let's talk
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-1 text-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-20 left-4 right-4 rounded-2xl glass p-5 flex flex-col gap-3"
        >
          {nav.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
               onClick={e => scrollTo(e, `#${item.toLowerCase()}`)}
               className="text-sm font-medium text-foreground hover:text-primary py-2 transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" onClick={e => scrollTo(e, '#contact')}
             className="text-sm font-medium text-center px-5 py-2.5 rounded-full bg-primary text-white mt-1">
            Let's talk
          </a>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.header>
  );
}
