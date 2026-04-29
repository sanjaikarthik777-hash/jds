import React from 'react';
import { motion } from 'framer-motion';
import './AboutShort.css';

const AboutShort = () => {
  return (
    <section className="about-short-section">
      <div className="container">
        <motion.div 
          className="about-short-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="about-short-header">
            <span className="section-subtitle">Introduction</span>
            <h2 className="about-short-title">Who We Are</h2>
          </div>
          <div className="about-short-body">
            <p>
              Velmurugan Grill Works is a trusted name in metal fabrication and grill design. 
              With years of expertise, we deliver customized solutions tailored to your space, 
              ensuring durability, security, and visual appeal.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutShort;
