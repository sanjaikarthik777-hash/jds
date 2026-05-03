import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import logoImg from '../assets/logo.jpg';
import horizontalLogo from '../assets/logo-horizontal.png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo">
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src={horizontalLogo} alt="JDS Graphic Logo" style={{ height: '35px', width: 'auto', display: 'block', objectFit: 'contain' }} />
            
            {/* Divider */}
            <div style={{ width: '1px', height: '35px', backgroundColor: 'rgba(0, 242, 255, 0.4)' }}></div>
            
            <div className="logo-info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="logo-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '1px', lineHeight: 1.1, color: '#fff' }}>JDS <span className="highlight" style={{ color: '#00f2ff' }}>Iron & Steels</span></span>
              <span className="logo-tagline" style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#94a3b8', marginTop: '2px', textTransform: 'uppercase' }}>PRECISION • STRENGTH • QUALITY</span>
            </div>
          </a>
        </div>

        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#about" className="active" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#products" onClick={() => setMobileMenuOpen(false)}>Products</a>
          <a href="#materials" onClick={() => setMobileMenuOpen(false)}>Materials</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <a href="#contact" className="nav-contact-btn" onClick={() => setMobileMenuOpen(false)}>
            <Phone size={14} />
            Contact
          </a>
        </nav>

        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
