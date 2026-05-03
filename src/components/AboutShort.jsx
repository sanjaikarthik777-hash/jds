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
              JDS Iron and Steels is a leading supplier of tool, alloy, and carbon steels, specializing in custom forgings and high-precision CNC cutting. 
              We are committed to providing premium metal solutions with a focus on quality, precision, and building long-term partnerships with our industrial clients.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutShort;
