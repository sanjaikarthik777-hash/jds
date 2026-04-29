import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import useIsMobile from '../hooks/useIsMobile';
import './Hero.css';

const GrillStructure = ({ isMobile }) => {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 8) * 0.1;
    group.current.rotation.x = Math.sin(t / 10) * 0.05;
  });

  // Reduce complexity on mobile
  const beamCount = isMobile ? 4 : 6;
  const hBeamCount = isMobile ? 3 : 4;

  return (
    <group ref={group} position={[0, 0, -8]}>
      {[...Array(beamCount)].map((_, i) => (
        <mesh key={`beam-${i}`} position={[(i - (beamCount-1)/2) * 5, 0, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.3, 40, 1]} />
          <meshStandardMaterial 
            color="#1E1E1E" 
            metalness={0.9} 
            roughness={0.4} 
            envMapIntensity={isMobile ? 0.5 : 1}
          />
        </mesh>
      ))}
      {[...Array(hBeamCount)].map((_, i) => (
        <mesh key={`h-beam-${i}`} position={[0, (i - (hBeamCount-1)/2) * 7, -2]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[40, 0.5, 1]} />
          <meshStandardMaterial 
            color="#2C2C2C" 
            metalness={0.8} 
            roughness={0.5} 
            envMapIntensity={isMobile ? 0.4 : 0.8}
          />
        </mesh>
      ))}
    </group>
  );
};



const Hero = () => {
  const isMobile = useIsMobile();
  const [content, setContent] = useState({
    heroTitle: '10+ Years of Trusted',
    heroHighlight: 'Grill & Fabrication',
    heroSubtitle: 'Custom Gates, Railings, and Fabrication Solutions with over 10 years of quality craftsmanship.'
  });
  const [contact, setContact] = useState({ phone: '9043426461' });
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex(prev => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsubHome = onSnapshot(doc(db, 'settings', 'homepage'), (doc) => {
      if (doc.exists()) setContent(prev => ({ ...prev, ...doc.data() }));
    });
    const unsubContact = onSnapshot(doc(db, 'settings', 'contact'), (doc) => {
      if (doc.exists()) setContact(prev => ({ ...prev, ...doc.data() }));
    });
    return () => { unsubHome(); unsubContact(); };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="canvas-container">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]} // Cap pixel ratio on mobile
          gl={{ 
            powerPreference: 'high-performance',
            antialias: !isMobile, // Disable antialiasing on mobile for better performance
            alpha: false
          }}
        >
          <fog attach="fog" args={['#0D0D0F', 5, 20]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          
          {/* Reduced light sources on mobile */}
          <GrillStructure isMobile={isMobile} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="hero-content container">
        <h1 className="hero-title">
          {content.heroTitle} <br/>
          <span className="text-gradient">{content.heroHighlight}</span> <br/>
        </h1>
        <p className="hero-subtitle">
          {content.heroSubtitle}
        </p>
        <div className="hero-cta">
          <a href="#contact" className="btn btn-primary">Get a Free Quote</a>
          <a href="#gallery" className="btn btn-outline">View Our Work</a>
        </div>

        <div className="hero-phrases">
          <AnimatePresence mode="wait">
            <motion.span
              key={phraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="phrase-item"
            >
              {phraseIndex === 0 ? "Built to Last" : "Designed to Impress"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <motion.div 
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="scroll-text">↓ Scroll to explore our work</span>
        <motion.div 
          className="scroll-dot"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
