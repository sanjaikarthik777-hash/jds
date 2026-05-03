import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { trackVisit } from './store';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutShort from './components/AboutShort';
import About from './components/About';
import Materials from './components/Materials';
import Applications from './components/Applications';
import TrustElements from './components/TrustElements';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Intro from './components/Intro';
import AdminRoutes from './routes/AdminRoutes';
import ScrollToTop from './components/ScrollToTop';
import GateTransition from './components/GateTransition';
import Specifications from './components/Specifications';
import WhyUs from './components/WhyUs';

// Lazy Loaded Components
const Gallery = React.lazy(() => import('./components/Gallery'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Contact = React.lazy(() => import('./components/Contact'));

const MainSite = () => {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('jds_intro_seen') === 'true') {
      setIntroFinished(true);
    }
    
    // Track visit using local store
    trackVisit();

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('jds_intro_seen', 'true');
    setIntroFinished(true);
  };

  return (
    <>
      {!introFinished && <Intro onComplete={handleIntroComplete} />}
      <div className={`app-container ${introFinished ? 'intro-ready' : 'intro-loading'}`}>
        <SEO />
        <Navbar />
        <main>
          <Hero />
          <GateTransition />
          <AboutShort />
          <About />
          <Specifications />
          <Materials />
          <Applications />
          <TrustElements />
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Gallery />
            <WhyUs />
            <Testimonials />
          </Suspense>
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>

      {/* Overlays and Floating elements - Fixed to prevent layout shifts */}
      <div className="overlay-layer" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 9999,
        opacity: introFinished ? 1 : 0, 
        transition: 'opacity 0.5s ease' 
      }}>
        <div className="action-hub" style={{ pointerEvents: 'auto' }}>
          <motion.a 
            href="tel:+919894339560"
            className="hub-pill-premium call-hub"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="hub-icon-premium">
              <FaPhoneAlt size={18} />
            </div>
            <span className="hub-label-premium">Call Now</span>
          </motion.a>

          <a href="https://wa.me/919894339560" target="_blank" rel="noopener noreferrer" className="hub-symbol wa-symbol" title="WhatsApp Us">
            <FaWhatsapp size={26} />
          </a>

          <ScrollToTop />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
