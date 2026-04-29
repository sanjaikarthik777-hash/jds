import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Phone, Mail, MapPin, User } from 'lucide-react';
import './Footer.css';

const MAPS_LINK = 'https://maps.app.goo.gl/k52oKbc2Tb4xhksq9';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <h2>Velmurugan <span className="highlight">Grill Works</span></h2>
            <p>Providing premium grill and fabrication services in Coimbatore with over 10 years of trusted experience.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/share/1CxmJRjYv4/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebook size={20} /></a>
              <a href="https://ig.me/m/sathishkumar1561" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram size={20} /></a>
              <a href="https://wa.me/919043426461" target="_blank" rel="noopener noreferrer" className="social-icon"><FaWhatsapp size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#gallery">Project Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-services">
            <h3>Our Services</h3>
            <ul>
              <li>Gate Fabrication</li>
              <li>Window Grills</li>
              <li>Stair Railings</li>
              <li>Custom Metal Works</li>
              <li>Industrial Roofing</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <ul className="footer-contact-list">
              <li>
                <User size={15} />
                <span><strong>Sathish Kumar</strong> — Owner</span>
              </li>
              <li>
                <Phone size={15} />
                <a href="tel:+919043426461">+91 9043426461</a>
              </li>
              <li>
                <Phone size={15} />
                <a href="tel:+918778850107">+91 8778850107</a>
              </li>
              <li>
                <Mail size={15} />
                <a href="mailto:sandhyaa.9193@gmail.com">sandhyaa.9193@gmail.com</a>
              </li>
              <li>
                <MapPin size={15} />
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Ulavar Santhai, Gandhiji Rd,<br/>Sundarapuram, Podanur,<br/>Coimbatore – 641023
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Velmurugan Grill Works. All Rights Reserved.</p>
          <p className="footer-credit">Designed by <span style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>SANJAIVISH</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
