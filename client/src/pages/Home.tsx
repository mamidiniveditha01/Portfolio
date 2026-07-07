import { useState, useCallback } from 'react';
import Hero from '@/components/Hero';
import Credentials from '@/components/Credentials';
import Identity from '@/components/Identity';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Cursor from '@/components/Cursor';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onDone={onDone} />
      <div className="bg-canvas" />
      <div className="bg-noise" />
      <Cursor />
      <div
        className="min-h-screen"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <Hero />
        <div className="divider" />
        <Credentials />
        <div className="divider" />
        <Identity />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Experience />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Contact />
        <footer className="py-10 border-t border-white/20">
          <div className="container flex items-center justify-between flex-wrap gap-4">
            <span className="font-fraunces font-black text-lg text-foreground/70 uppercase tracking-wide">Niveditha.</span>
            <span className="text-xs text-muted-foreground">Designed & built with care · {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </>
  );
}
