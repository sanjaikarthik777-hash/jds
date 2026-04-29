import React from 'react';
import './Materials.css';

const materialsData = [
  {
    id: 'MS',
    title: 'Mild Steel (MS)',
    features: [
      'High tensile strength',
      'Cost effective',
      'Easy to weld',
      'Powder coat ready'
    ],
    usedIn: 'Gates, Grills, Fences, Frames'
  },
  {
    id: 'SS',
    title: 'Stainless Steel (SS)',
    features: [
      'Corrosion resistant',
      'Premium finish',
      'Long lifespan',
      'Modern aesthetic'
    ],
    usedIn: 'Railings, Kitchen, Balcony, Commercial'
  },
  {
    id: 'AL',
    title: 'Aluminum',
    features: [
      'Lightweight',
      'Weather proof',
      'Low maintenance',
      'Anodized finish'
    ],
    usedIn: 'Windows, Partitions, Roofing Frames'
  }
];

const Materials = () => {
  return (
    <section id="materials" className="section materials-section">
      <div className="container">
        <h2 className="section-title">Materials</h2>
        <div className="materials-grid">
          {materialsData.map((mat) => (
            <div key={mat.id} className="material-card glass-panel">
              <div className="material-badge">{mat.id}</div>
              <h3 className="material-title">{mat.title}</h3>
              <ul className="material-features">
                {mat.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="bullet"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="material-footer">
                <span className="used-in-label">Used in:</span> {mat.usedIn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Materials;
