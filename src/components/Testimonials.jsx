import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { getTestimonials } from '../store';
import './Testimonials.css';

const StarRating = ({ rating = 5 }) => (
  <div className="star-rating">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} fill={i < rating ? "#00f2ff" : "none"} color="#00f2ff" />
    ))}
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const defaultTestimonials = [
    { name: 'Arun Kumar', role: 'Production Manager, Precision Forge', text: 'JDS Iron and Steels is our go-to partner for tool steels. Their D2 and H13 stock is always of premium quality and cut to exact tolerances.', rating: 5 },
    { name: 'Suresh Raina', role: 'Mechanical Engineer', text: 'Exceptional service and timely delivery. The alloy steel rounds we received were perfectly finished and met all our industrial requirements.', rating: 5 },
    { name: 'Deepika S.', role: 'Project Coordinator', text: 'The CNC cutting facility at JDS is top-notch. They handled our complex size requirements for carbon steel flats with impressive accuracy.', rating: 5 },
    { name: 'Vijay Varma', role: 'Industrial Contractor', text: 'Reliable supplier for bulk steel orders. Their inventory management ensures we never face delays in our manufacturing cycle.', rating: 5 }
  ];

  useEffect(() => {
    const data = getTestimonials();
    if (data && data.length > 0) {
      setTestimonials(data);
    } else {
      setTestimonials(defaultTestimonials);
    }
  }, []);

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section id="testimonials" className="section testimonials-section">

      <div className="container">
        <div className="section-header-centered">
          <span className="section-subtitle">Real feedback from real clients</span>
          <h2 className="section-title">Client <span className="text-gradient">Testimonials</span></h2>
        </div>
        
        {testimonials.length > 0 ? (
          <div className="premium-slider">
            <div className="slider-wrapper">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 }
                  }}
                  className="testimonial-card glass-panel"
                >
                  <div className="quote-badge">
                    <Quote size={24} fill="#00f2ff" color="#00f2ff" />
                  </div>
                  
                  <StarRating rating={testimonials[currentIndex]?.rating || 5} />
                  
                  <p className="testimonial-quote">
                    "{testimonials[currentIndex]?.text}"
                  </p>
                  
                  <div className="author-info">
                    <div className="author-avatar">
                      {testimonials[currentIndex]?.name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="author-name">{testimonials[currentIndex]?.name}</h4>
                      <span className="author-role">{testimonials[currentIndex]?.role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {testimonials.length > 1 && (
              <div className="slider-controls">
                <button className="control-btn" onClick={prevSlide}>
                  <ChevronLeft size={24} />
                </button>
                
                <div className="dots-container">
                  {testimonials.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`nav-dot ${idx === currentIndex ? 'active' : ''}`}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                    />
                  ))}
                </div>

                <button className="control-btn" onClick={nextSlide}>
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="loading-state">
            <p>No testimonials available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
