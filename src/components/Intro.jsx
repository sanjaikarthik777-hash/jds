import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import useIsMobile from '../hooks/useIsMobile';
import './Intro.css';

/* ─── Mobile lightweight intro (pure CSS, no WebGL) ─────────────── */
const MobileIntro = ({ onComplete, fadingOut }) => {
  useEffect(() => {
    gsap.fromTo('.intro-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });
    gsap.fromTo('.intro-tagline',  { opacity: 0 },         { opacity: 1, duration: 0.8, delay: 0.8 });
  }, []);

  return (
    <div className={`intro-container intro-mobile ${fadingOut ? 'fade-out' : ''}`}>
      <div className="intro-mobile-logo">
        <span className="intro-logo-v">V</span>
        <span className="intro-logo-g">G</span>
        <span className="intro-logo-w">W</span>
      </div>
      <div className="intro-overlay" style={{ top: '62%' }}>
        <h1 className="intro-subtitle">Velmurugan Grill Works</h1>
        <p className="intro-tagline">Built with Strength. Designed with Precision.</p>
      </div>
    </div>
  );
};

/* ─── Desktop 3D intro (Three.js) ───────────────────────────────── */
let DesktopIntro = null;

const Intro = ({ onComplete }) => {
  const isMobile = useIsMobile();
  const [fadingOut, setFadingOut] = useState(false);
  const [DesktopComp, setDesktopComp] = useState(null);

  useEffect(() => {
    // Lazy-load the heavy Three.js intro only on desktop
    if (!isMobile) {
      import('./IntroDesktop').then((mod) => setDesktopComp(() => mod.default));
    }
  }, [isMobile]);

  useEffect(() => {
    const duration = isMobile ? 2000 : 2800;
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(onComplete, 800);
    }, duration);
    return () => clearTimeout(timer);
  }, [isMobile, onComplete]);

  if (isMobile) {
    return <MobileIntro onComplete={onComplete} fadingOut={fadingOut} />;
  }

  if (!DesktopComp) {
    // Show a dark screen while the desktop component loads
    return <div className={`intro-container ${fadingOut ? 'fade-out' : ''}`} />;
  }

  return <DesktopComp fadingOut={fadingOut} />;
};

export default Intro;
