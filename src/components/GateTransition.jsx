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
            <span className="reveal-badge">JDS Iron and Steels</span>
            <h2>EXCELLENCE IN STEEL</h2>
            <div className="reveal-divider"></div>
            <p>Premium Tool & Alloy Steels · Forgings · CNC Cutting</p>
          </motion.div>
        </div>

        {/* The Gate Panels layer */}
        <div className="gate-panels-layer">
          <motion.div className="gate-panel-half left-half" style={{ x: leftX }}>
            <div className="gate-panel-inner">
              <div className="gate-mesh"></div>
              <div className="gate-structural-frame">
                <div className="bolt top-left"></div>
                <div className="bolt top-right"></div>
                <div className="bolt bottom-left"></div>
                <div className="bolt bottom-right"></div>
              </div>
              <div className="gate-shine"></div>
              <div className="gate-handle-cyan handle-left">
                <div className="handle-core"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="gate-panel-half right-half" style={{ x: rightX }}>
            <div className="gate-panel-inner">
              <div className="gate-mesh"></div>
              <div className="gate-structural-frame">
                <div className="bolt top-left"></div>
                <div className="bolt top-right"></div>
                <div className="bolt bottom-left"></div>
                <div className="bolt bottom-right"></div>
              </div>
              <div className="gate-shine"></div>
              <div className="gate-handle-cyan handle-right">
                <div className="handle-core"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GateTransition;
