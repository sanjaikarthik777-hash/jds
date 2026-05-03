import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { getSettings, addLead } from '../store';
import './Contact.css';

const MAPS_LINK = 'https://maps.app.goo.gl/UcwwwsfzdoQ9WFXA8';
const MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.265!2d76.9868!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzAwLjQiTiA3NsKwNTknMTIuNiJF!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [contactData, setContactData] = useState({
    phone: '+91 9894339560',
    whatsapp: '919894339560',
    email: 'jds@gmail.com',
    address: 'SF.No.275, 223, Sanganoor Main Rd, 11 Street, Ganapathy, Coimbatore, Tamil Nadu 641006'
  });

  useEffect(() => {
    const settings = getSettings();
    setContactData(settings.contact);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Log a lead entry to the admin panel
  const trackLead = (source, name = '', phone = '', message = '') => {
    addLead({
      name: name || 'Website Visitor',
      phone: phone || '—',
      source,
      message: message || `Contacted via ${source}`,
      gateType: source,
      material: '—',
      width: '—',
      height: '—',
      complexity: '—',
      priceRange: '—'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log lead before redirecting
    trackLead('WhatsApp Form', formData.name, formData.phone, formData.message);
    const text =
      `Hi, I got your contact from your website.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Project Requirements:*\n${formData.message}`;
    const url = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="contact-grid">
          
          {/* Contact Information Card */}
          <div className="contact-info modern-card">
            <div className="info-items-list">
              <div className="info-row">
                <div className="info-icon-box">
                  <a href={`tel:${contactData.phone}`} onClick={() => trackLead('Phone Call')} style={{ color: 'inherit', display: 'flex' }}>
                    <Phone size={20} />
                  </a>
                </div>
                <div className="info-text-box">
                  <span className="info-label">PHONE</span>
                  <a href={`tel:${contactData.phone}`} onClick={() => trackLead('Phone Call')} className="info-value" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
                    {contactData.phone}
                  </a>
                </div>
              </div>
              
              <div className="info-row">
                <div className="info-icon-box"><Mail size={20} /></div>
                <div className="info-text-box">
                  <span className="info-label">EMAIL</span>
                  <strong className="info-value">{contactData.email}</strong>
                </div>
              </div>
              
              <div className="info-row border-none">
                <div className="info-icon-box"><MapPin size={20} /></div>
                <div className="info-text-box">
                  <span className="info-label">LOCATION</span>
                  <strong className="info-value">
                    {contactData.address.split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}<br/></React.Fragment>
                    ))}
                  </strong>
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-btn"
                  >
                    <Navigation size={14} />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            <div className="social-action-buttons">
              <a
                href={`https://wa.me/${contactData.whatsapp}`}
                target="_blank" rel="noopener noreferrer"
                className="social-btn btn-wa"
                onClick={() => trackLead('WhatsApp Direct')}
              >
                <FaWhatsapp size={20} /> Chat on WhatsApp
              </a>
              <a
                href="https://ig.me/m/saileshpurohit_"
                target="_blank" rel="noopener noreferrer"
                className="social-btn btn-ig"
                onClick={() => trackLead('Instagram DM')}
              >
                <FaInstagram size={20} /> DM on Instagram
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="contact-form-container glass-panel-premium">
            <div className="form-header">
              <h3>Get in <span className="text-gradient">Touch</span></h3>
              <p>Fill out the form and we'll get back to you within 24 hours.</p>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    required placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel" id="phone" name="phone"
                    value={formData.phone} onChange={handleChange}
                    required placeholder="90434XXXXX"
                    pattern="[0-9]{10}" title="Please enter a valid 10-digit number"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange}
                  required placeholder="Describe your requirements (e.g., modern gate design, industrial grill work...)" rows="4"
                ></textarea>
              </div>
              
              <div className="contact-action-group">
                <button type="submit" className="btn btn-primary submit-btn-wa">
                  <FaWhatsapp size={18} /> Chat on WhatsApp
                </button>
                <a
                  href={`mailto:${contactData.email || 'jds@gmail.com'}?subject=${encodeURIComponent('Inquiry from ' + (formData.name || 'Website'))}&body=${encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\n\nRequirements:\n${formData.message}`)}`}
                  className="btn btn-outline submit-btn-email"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                  onClick={() => trackLead('Email', formData.name, formData.phone, formData.message)}
                >
                  <Mail size={18} /> Send Email
                </a>
              </div>
            </form>
          </div>
          
        </div>

        {/* ── Google Maps Embed ── */}
        <div className="map-section">
          <div className="map-header">
            <MapPin size={18} />
            <span>Find Us on the Map</span>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="map-open-link">
              <Navigation size={13} /> Open in Google Maps
            </a>
          </div>
          <div className="map-wrapper">
            <iframe
              title="JDS Iron and Steels Location"
              src={MAPS_EMBED}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-iframe"
            />
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="map-overlay-btn"
            >
              <Navigation size={16} />
              Get Directions
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
