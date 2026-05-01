import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './GateTransition.css';

const GateTransition = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate panels opening - Smoother and more reliable
  const leftX = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "100%"]);
  
  // Text reveal
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);

  return (
    <div className="gate-section-wrapper" ref={containerRef}>
      <div className="gate-visual-area">
        {/* The revealed content layer */}
        <div className="gate-reveal-content">
          <motion.div 
            style={{ opacity: contentOpacity, scale: contentScale }}
            className="reveal-text-box"
          >
            <span className="reveal-badge">Velmurugan Industries</span>
            <h2>FORGING THE FUTURE</h2>
            <div className="reveal-divider"></div>
            <p>Premium Metal Fabrication & Industrial Design</p>
          </motion.div>
        </div>

        {/* The Gate Panels layer */}
        <div className="gate-panels-layer">
          <motion.div className="gate-panel-half left-half" style={{ x: leftX }}>
            <div className="gate-panel-inner">
              <div className="gate-texture"></div>
              <div className="gate-decoration"></div>
              <div className="gate-shine"></div>
              <div className="gate-handle-gold handle-left"></div>
            </div>
          </motion.div>
          
          <motion.div className="gate-panel-half right-half" style={{ x: rightX }}>
            <div className="gate-panel-inner">
              <div className="gate-texture"></div>
              <div className="gate-decoration"></div>
              <div className="gate-shine"></div>
              <div className="gate-handle-gold handle-right"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GateTransition;
