import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, BarChart3 } from 'lucide-react';
import './WhyUs.css';

const whyUsData = [
  {
    id: 1,
    icon: <ShieldCheck size={32} />,
    title: 'Premium Quality Materials',
    description: 'We supply high-grade steel products with strict quality checks, ensuring strength, durability, and reliability for every project.'
  },
  {
    id: 2,
    icon: <Cpu size={32} />,
    title: 'Advanced Processing & Technology',
    description: 'Equipped with modern machinery and precision cutting tools, we deliver accurate sizing and superior finishing for all materials.'
  },
  {
    id: 3,
    icon: <BarChart3 size={32} />,
    title: 'Efficient Inventory & Supply Chain',
    description: 'Our well-stocked warehouse and streamlined logistics ensure timely delivery and uninterrupted supply for your business needs.'
  }
];

const WhyUs = () => {
  return (
    <section className="why-us-section" id="why-us">
      <div className="container">
        <div className="why-us-header">
          <span className="section-subtitle">Why Choose Us</span>
          <h2 className="section-title">Reliable Steel & Industrial <span className="text-gradient">Solutions</span> For Your Business</h2>
        </div>

        <div className="why-us-grid">
          {whyUsData.map((item, index) => (
            <motion.div 
              key={item.id}
              className="why-us-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="why-us-icon-box">
                {item.icon}
              </div>
              <h3 className="why-us-card-title">{item.title}</h3>
              <p className="why-us-card-desc">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
