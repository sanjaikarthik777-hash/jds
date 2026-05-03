import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Zap } from 'lucide-react';
import './Materials.css';

const Materials = () => {
  return (
    <section id="materials" className="materials-section">
      <div className="container">
        <div className="materials-content-box glass-panel-premium">
          <div className="materials-header">
            <span className="materials-badge">IRON & STEEL SUPPLIER</span>
            <h2 className="materials-title">Building Strength With <span className="text-gradient">Quality Steel</span></h2>
          </div>
          
          <div className="materials-body">
            <p className="materials-desc">
              We supply premium iron and steel materials for construction, industrial, and fabrication needs. 
              Trusted for quality, durability, and timely delivery in Coimbatore.
            </p>
            
            <div className="materials-features-grid">
              <div className="feat-item">
                <div className="feat-icon"><Shield size={20} /></div>
                <span>Premium Quality</span>
              </div>
              <div className="feat-item">
                <div className="feat-icon"><Zap size={20} /></div>
                <span>High Durability</span>
              </div>
              <div className="feat-item">
                <div className="feat-icon"><Truck size={20} /></div>
                <span>Timely Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Materials;
