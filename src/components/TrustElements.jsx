import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TrustElements.css';

gsap.registerPlugin(ScrollTrigger);

const TrustElements = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const counters = containerRef.current.querySelectorAll('.counter-val');
    
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target'));
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2.5,
            snap: { innerHTML: 1 },
            ease: "power2.out"
          });
        },
        once: true
      });
    });
  }, []);

  return (
    <section className="trust-section" ref={containerRef}>
      <div className="container">
        <div className="trust-grid">
          <div className="trust-item">
            <h3 className="counter">
              <span className="counter-val" data-target="100">0</span>+
            </h3>
            <p>Projects Completed</p>
          </div>
          
          <div className="trust-item">
            <h3 className="counter">
              <span className="counter-val" data-target="20">0</span>+
            </h3>
            <p>Years Experience</p>
          </div>
          
          <div className="trust-item">
            <h3 className="counter">
              <span className="counter-val" data-target="100">0</span>%
            </h3>
            <p>Quality Materials</p>
          </div>
          
          <div className="trust-item">
            <h3 className="counter">
              <span className="counter-val" data-target="50">0</span>+
            </h3>
            <p>Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustElements;
