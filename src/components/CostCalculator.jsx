import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaWhatsapp } from 'react-icons/fa';
import './CostCalculator.css';

const CostCalculator = () => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [material, setMaterial] = useState('MS');
  const [estimate, setEstimate] = useState(0);

  const rates = {
    MS: 250,
    SS: 450,
    Aluminium: 350,
    WoodMetal: 550
  };

  const calculate = () => {
    const area = parseFloat(width) * parseFloat(height);
    if (isNaN(area)) return;
    const rate = rates[material];
    const base = area * rate;
    const total = base + 5000 + 2000; // Adding Labor + Installation
    setEstimate(total);
  };

  return (
    <section className="cost-calculator-section" id="calculator">
      <div className="calc-container">
        <motion.div 
          className="calc-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="calc-header">
            <FaCalculator className="calc-icon" />
            <div>
              <h3>Project Cost Calculator</h3>
              <p>Quick estimate for your fabrication needs</p>
            </div>
          </div>

          <div className="calc-form">
            <div className="calc-input-group">
              <label>Width (FT)</label>
              <input 
                type="number" 
                value={width} 
                onChange={(e) => { setWidth(e.target.value); calculate(); }} 
                placeholder="0"
              />
            </div>
            <div className="calc-input-group">
              <label>Height (FT)</label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => { setHeight(e.target.value); calculate(); }} 
                placeholder="0"
              />
            </div>
            <div className="calc-input-group">
              <label>Material</label>
              <select value={material} onChange={(e) => { setMaterial(e.target.value); calculate(); }}>
                <option value="MS">Mild Steel (MS)</option>
                <option value="SS">Stainless Steel (SS)</option>
                <option value="Aluminium">Aluminium</option>
                <option value="WoodMetal">Wood + Metal</option>
              </select>
            </div>
          </div>

          <div className="calc-footer">
            <div className="area-display">
              Total Area: <span>{width && height ? (width * height).toFixed(2) : 0} SQFT</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="result-display-card"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h4>Estimated Project Cost</h4>
          <div className="price-tag">
            ₹ {estimate.toLocaleString()}
          </div>
          <p>Includes basic material, labor, and installation.</p>
          
          <button className="calc-wa-btn" onClick={() => {
            const text = `Hi, I used the calculator.
Size: ${width}x${height} ft
Material: ${material}
Estimate: ₹${estimate}`;
            window.open(`https://wa.me/919043426461?text=${encodeURIComponent(text)}`, '_blank');
          }}>
            <FaWhatsapp /> Get Detailed Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CostCalculator;
