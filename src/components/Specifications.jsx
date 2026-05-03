import React from 'react';
import './Specifications.css';

const specData = [
  {
    id: 'flats',
    title: 'FLATS',
    subtitle: 'EN 8 - 9 - 24 - 31 - OHNS - HCHCR - D2, D3 - HDS - H13',
    image: '/gallery/flat.png',
    details: '25x6 25x10 25x13 25x16 25x20 32x6 32x10 32x13 32x16 32x20 32x25 40x6 40x10 40x13 40x16 40x20 40x25 40x32 50x6 50x10 50x13 50x16 50x20 50x25 50x32 50x40 65x6 65x10 65x13 65x16 65x20 65x25 65x32 65x40 65x50 80x6 80x10 80x13 80x16 80x20 80x25 80x32 80x40 80x50 80x65 100x6 100x10 100x13 100x16 100x20 100x25 100x32 100x40 100x50 100x65 100x80 130x10 130x13 130x16 130x20 130x25 130x32 130x40 130x50 130x65 130x80 130x100 150x10 150x13 150x16 150x20 150x25 150x32 150x40 150x50 150x65 150x80 150x100 150x130 205x13 205x16 205x20 205x25 205x32 205x40 205x50 205x65 205x80 205x105 205x155 255x16 255x20 255x25 255x32 255x40 255x50 255x65 255x80 255x105 255x130 255x155 300x25 305x20 305x25 305x32 305x40 305x50 305x65 305x80 305x105 305x130 305x155 305x205 305x255 355x32 355x40 355x50 355x65 355x80 355x105 355x130 355x155 405x25 405x32 405x40 405x50 405x65 405x80 405x105 405x130 405x155'
  },
  {
    id: 'roundbar',
    title: 'Round Bar',
    subtitle: 'EN - 31 - 24 - OHNS ROUNDS Bar',
    image: '/gallery/roundbar.png',
    details: '3ø 4ø 5ø 6ø 6.35ø 8ø 10ø 12ø 14ø'
  },
  {
    id: 'roundrod',
    title: 'Round Rod',
    subtitle: 'EN - 8 - 9 - 19 - 31 - 24 - 36 - 353 - OHNS - EN47 - HCHCR - D2 - D3 - HDS - H - 13',
    image: '/gallery/roundrod.png',
    details: '20ø 22ø 25ø 28ø 32ø 36ø 40ø 45ø 50ø 56ø 63ø 70ø 80ø 90ø 100ø 110ø 125ø 130ø 140ø 150ø 160ø 170ø 180ø 190ø 200ø 210ø 220ø 230ø 240ø 250ø 260ø 270ø 280ø 290ø 300ø 310ø 320ø 330ø 340ø 350ø 360ø 380ø 400ø'
  },
  {
    id: 'square',
    title: 'SQUARES',
    subtitle: 'EN - 8 - 9 - 31 - OHNS - HCHCR D-2 - D-3',
    image: '/gallery/square.png',
    details: '12×12 16×16 20×20 22×22 25×25 32×32 40×40 50×50 65×65 75×75 80×80 90×90 100×100 125×125 155×155 200×200'
  }
];

const Specifications = () => {
  return (
    <section id="products" className="spec-section">
      <div className="container">
        <div className="spec-header">
          <h2 className="section-title">Our <span className="text-gradient">Products</span></h2>
          <p className="section-subtitle">Precision engineered steel products for every industrial application</p>
        </div>
        
        <div className="spec-grid">
          {specData.map((spec) => (
            <div key={spec.id} className="spec-card glass-panel">
              <div className="spec-image-container">
                <img src={spec.image} alt={spec.title} className="spec-image" />
                <div className="spec-overlay">
                  <h3 className="spec-title">{spec.title}</h3>
                </div>
              </div>
              <div className="spec-content">
                <p className="spec-subtitle">{spec.subtitle}</p>
                <div className="spec-details">
                  {spec.details.split(' ').map((item, idx) => (
                    <span key={idx} className="spec-tag">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specifications;
