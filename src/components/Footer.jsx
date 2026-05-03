import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { 
  Phone, Mail, MapPin, User, ChevronRight, Package, 
  ShieldCheck, Award, Factory, Users, Gem, Shield, Truck, Heart, ArrowUp, PhoneCall
} from 'lucide-react';
import logoImg from '../assets/logo.jpg';
import './Footer.css';

const MAPS_LINK = 'https://maps.app.goo.gl/UcwwwsfzdoQ9WFXA8';

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-premium">
      <div className="footer-container">
        
        {/* Main Grid */}
        <div className="footer-main-grid">
          
          {/* Column 1: Brand & Stats */}
          <div className="footer-col brand-col">
            <div className="brand-header">
              <div className="brand-logo-hex">
                <img src={logoImg} alt="JDS" />
              </div>
              <span className="brand-title">JDS <span className="highlight">Iron & Steels</span></span>
            </div>
            <div className="brand-divider"></div>
            <p className="brand-desc">
              Leading suppliers of high-grade tool steels, alloy steels, and precision forgings in Coimbatore with over 20 years of trusted experience.
            </p>
            
            <div className="brand-stats-box">
              <div className="stat-item">
                <ShieldCheck size={18} />
                <span>Premium<br/>Quality</span>
              </div>
              <div className="stat-item">
                <Award size={18} />
                <span>20+ Years<br/>Experience</span>
              </div>
              <div className="stat-item">
                <Factory size={18} />
                <span>Wide Product<br/>Range</span>
              </div>
              <div className="stat-item">
                <Users size={18} />
                <span>Customer<br/>Trust</span>
              </div>
            </div>

            <div className="follow-us">
              <span>Follow Us</span>
              <div className="social-circles">
                <a href="https://ig.me/m/saileshpurohit_" target="_blank" rel="noopener noreferrer"><FaInstagram size={16} /></a>
                <a href="https://wa.me/919894339560" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={16} /></a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col links-col">
            <h3>Quick Links <div className="title-underline"></div></h3>
            <ul>
              <li><a href="#hero"><ChevronRight size={14} /> Home</a></li>
              <li><a href="#about"><ChevronRight size={14} /> About Us</a></li>
              <li><a href="#products"><ChevronRight size={14} /> Our Products</a></li>
              <li><a href="#gallery"><ChevronRight size={14} /> Project Gallery</a></li>
              <li><a href="#contact"><ChevronRight size={14} /> Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div className="footer-col products-col">
            <h3>Our Products <div className="title-underline"></div></h3>
            <ul>
              <li><Package size={14} /> Tool & Alloy Steels</li>
              <li><Package size={14} /> Carbon Steels</li>
              <li><Package size={14} /> Precision Forgings</li>
              <li><Package size={14} /> CNC Profile Cutting</li>
              <li><Package size={14} /> MS Bright Bars</li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col contact-col">
            <h3>Contact Us <div className="title-underline"></div></h3>
            <ul className="contact-info-list">
              <li>
                <div className="icon-circle"><User size={14} /></div>
                <div>
                  <span className="contact-name">Sailesh Purohit</span>
                  <span className="contact-role">Owner</span>
                </div>
              </li>
              <li>
                <div className="icon-circle"><Phone size={14} /></div>
                <a href="tel:+919894339560">+91 9894339560</a>
              </li>
              <li>
                <div className="icon-circle"><Mail size={14} /></div>
                <a href="mailto:jds@gmail.com">jds@gmail.com</a>
              </li>
              <li>
                <div className="icon-circle"><MapPin size={14} /></div>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="address-link">
                  SF.No.275, 223, Sanganoor Main Rd,<br/>
                  11 Street, Ganapathy,<br/>
                  Coimbatore, Tamil Nadu 641006
                </a>
              </li>
            </ul>
            <a href="tel:+919894339560" className="btn-call-now">
              <PhoneCall size={16} /> CALL NOW <ChevronRight size={16} />
            </a>
          </div>

        </div>

        {/* Trust Bar Row */}
        <div className="footer-trust-bar">
          <div className="trust-item">
            <div className="trust-icon"><Gem size={24} /></div>
            <div className="trust-text">
              <strong>Premium Quality</strong>
              <span>Certified & Tested Materials</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><Shield size={24} /></div>
            <div className="trust-text">
              <strong>Trusted Since 2000+</strong>
              <span>Over Two Decades of Excellence</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><Users size={24} /></div>
            <div className="trust-text">
              <strong>500+ Happy Clients</strong>
              <span>Across India & Beyond</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><Truck size={24} /></div>
            <div className="trust-text">
              <strong>On-Time Delivery</strong>
              <span>Every Time, Every Order</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="copyright">
            &copy; {new Date().getFullYear()} <strong>JDS Iron & Steels</strong>. All Rights Reserved.
          </div>
          <div className="credit">
            Designed with <Heart size={12} className="heart-icon" /> for Quality & Trust
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
