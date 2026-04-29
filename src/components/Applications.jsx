import React from 'react';
import { Home, Building2, Factory } from 'lucide-react';
import './Applications.css';

const applicationsData = [
  {
    id: 'residential',
    title: 'Residential',
    icon: <Home size={40} />,
    description: 'Gates, window grills, balcony railings, compound walls'
  },
  {
    id: 'commercial',
    title: 'Commercial',
    icon: <Building2 size={40} />,
    description: 'Shop fronts, partitions, staircases, entrance work'
  },
  {
    id: 'industrial',
    title: 'Industrial',
    icon: <Factory size={40} />,
    description: 'Structural frames, machine guards, conveyors, sheds',
    highlight: true
  }
];

const Applications = () => {
  return (
    <section id="applications" className="section applications-section">
      <div className="container">
        <h2 className="section-title">Applications We Serve</h2>
        
        <div className="applications-grid">
          {applicationsData.map((app) => (
            <div 
              key={app.id} 
              className={`app-card glass-panel ${app.highlight ? 'highlight-card' : ''}`}
            >
              <div className="app-icon">{app.icon}</div>
              <h3 className="app-title">{app.title}</h3>
              <p className="app-desc">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Applications;
