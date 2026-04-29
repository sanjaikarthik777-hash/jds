import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { FaWhatsapp, FaCalculator, FaChevronRight, FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import useAnalytics from '../hooks/useAnalytics';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const { trackAction } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [pricing, setPricing] = useState({
    MS: 250,
    SS: 450,
    Aluminium: 350,
    WoodMetal: 550,
    Labor: 5000,
    Installation: 2000
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gateType: 'Swing',
    material: 'MS',
    width: '',
    height: '',
    complexity: 'Simple',
    budget: ''
  });

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'pricing'));
        if (snap.exists()) setPricing(snap.data());
      } catch (err) {
        console.error("Error fetching pricing:", err);
      }
    };
    fetchPricing();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateQuote = async () => {
    setCalculating(true);
    trackAction('Calculate Quote Started', 'Engagement');
    
    // Artificial delay for "AI Thinking" effect
    await new Promise(r => setTimeout(r, 2000));

    const area = parseFloat(formData.width) * parseFloat(formData.height);
    const materialRate = pricing[formData.material] || 250;
    const baseCost = area * materialRate;
    
    let complexityMultiplier = 1;
    if (formData.complexity === 'Medium') complexityMultiplier = 1.2;
    if (formData.complexity === 'Premium') complexityMultiplier = 1.4;

    const totalMaterialCost = baseCost * complexityMultiplier;
    const labor = pricing.Labor || 5000;
    const installation = pricing.Installation || 2000;
    
    const estimatedPrice = totalMaterialCost + labor + installation;
    const rangeLow = Math.floor(estimatedPrice * 0.95 / 100) * 100;
    const rangeHigh = Math.ceil(estimatedPrice * 1.05 / 100) * 100;

    let recommendation = "MS Heavy";
    if (formData.budget > 80000 || formData.material === 'SS') recommendation = "SS 304 Grade";
    else if (formData.material === 'Aluminium') recommendation = "Aluminium Texture";

    const finalResult = {
      priceRange: `₹${rangeLow.toLocaleString()} – ₹${rangeHigh.toLocaleString()}`,
      recommendation,
      delivery: "5-7 Days",
      warranty: "5 Years"
    };

    setResult(finalResult);
    setCalculating(false);
    setStep(3);

    // Save Lead to Firestore
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        ...finalResult,
        timestamp: new Date(),
        status: 'new'
      });
    } catch (err) {
      console.error("Error saving lead:", err);
    }
  };

  const sendWhatsApp = () => {
    const text = `Hi, I'm interested in a Gate Quote.
Type: ${formData.gateType}
Material: ${formData.material}
Size: ${formData.width}x${formData.height} ft
Complexity: ${formData.complexity}
Estimated Price: ${result.priceRange}
Name: ${formData.name}`;
    
    const url = `https://wa.me/919043426461?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    trackAction('WhatsApp Quote Sent', 'Lead');
  };

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener('openQuoteGenerator', handleOpen);
    return () => document.removeEventListener('openQuoteGenerator', handleOpen);
  }, []);

  return (
    <>

      <AnimatePresence>
        {isOpen && (
          <div className="quote-modal-overlay">
            <motion.div 
              className="quote-modal"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
            >
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>

              {step === 1 && (
                <div className="quote-step">
                  <h2>Gate Specifications</h2>
                  <p>Tell us about your requirement for an AI-powered estimate.</p>
                  
                  <div className="form-grid">
                    <div className="input-group">
                      <label>Gate Type</label>
                      <select name="gateType" value={formData.gateType} onChange={handleChange}>
                        <option value="Swing">Swing Gate</option>
                        <option value="Sliding">Sliding Gate</option>
                        <option value="Compound">Compound Gate</option>
                        <option value="Staircase">Staircase Railing</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Material</label>
                      <select name="material" value={formData.material} onChange={handleChange}>
                        <option value="MS">Mild Steel (MS)</option>
                        <option value="SS">Stainless Steel (SS)</option>
                        <option value="Aluminium">Aluminium</option>
                        <option value="WoodMetal">Wood + Metal</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Width (ft)</label>
                      <input type="number" name="width" placeholder="e.g. 10" value={formData.width} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                      <label>Height (ft)</label>
                      <input type="number" name="height" placeholder="e.g. 6" value={formData.height} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                      <label>Design Complexity</label>
                      <select name="complexity" value={formData.complexity} onChange={handleChange}>
                        <option value="Simple">Simple & Clean</option>
                        <option value="Medium">Modern Pattern</option>
                        <option value="Premium">Intricate/Laser Cut</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Budget (Optional)</label>
                      <input type="number" name="budget" placeholder="₹ Amount" value={formData.budget} onChange={handleChange} />
                    </div>
                  </div>

                  <button 
                    className="next-btn" 
                    disabled={!formData.width || !formData.height}
                    onClick={() => setStep(2)}
                  >
                    Next Step <FaChevronRight size={12} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="quote-step">
                  <h2>Contact Details</h2>
                  <p>We'll send the detailed design catalog to your number.</p>
                  
                  <div className="form-single">
                    <div className="input-group">
                      <label>Your Name</label>
                      <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <label>Phone Number</label>
                      <input type="tel" name="phone" placeholder="WhatsApp number" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <button 
                    className="next-btn" 
                    disabled={!formData.name || !formData.phone || calculating}
                    onClick={calculateQuote}
                  >
                    {calculating ? (
                      <><FaSpinner className="spin" /> AI is calculating...</>
                    ) : (
                      "Generate Quote"
                    )}
                  </button>
                </div>
              )}

              {step === 3 && result && (
                <div className="quote-step result-step">
                  <div className="success-icon">
                    <FaCheckCircle />
                  </div>
                  <h2>Your Instant Quote</h2>
                  
                  <motion.div 
                    className="result-card"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                  >
                    <div className="result-header">Estimate Range</div>
                    <div className="result-price">{result.priceRange}</div>
                    
                    <div className="result-details">
                      <div className="detail-item">
                        <span>Recommended:</span>
                        <strong>{result.recommendation}</strong>
                      </div>
                      <div className="detail-item">
                        <span>Delivery:</span>
                        <strong>{result.delivery}</strong>
                      </div>
                      <div className="detail-item">
                        <span>Warranty:</span>
                        <strong>{result.warranty}</strong>
                      </div>
                    </div>
                  </motion.div>

                  <div className="result-actions">
                    <button className="wa-btn" onClick={sendWhatsApp}>
                      <FaWhatsapp /> Send via WhatsApp
                    </button>
                    <button className="call-btn" onClick={() => window.open('tel:+919043426461')}>
                      Request Call
                    </button>
                  </div>
                  
                  <p className="disclaimer">*Prices are estimates. Final quote may vary based on exact design choice.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuoteGenerator;
