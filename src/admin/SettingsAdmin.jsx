import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings, addProduct, addTestimonial } from '../store';

const SettingsAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [homepage, setHomepage] = useState({
    heroTitle: 'CRAFTING EXCELLENCE IN',
    heroHighlight: 'IRON & STEEL',
    heroSubtitle: 'JDS Iron and Steels — Transforming spaces with premium fabrication, robust structures, and precision metalworks for over a decade.'
  });

  const [contact, setContact] = useState({
    phone: '+91 9894339560',
    whatsapp: '919894339560',
    email: 'jds@gmail.com',
    address: 'SF.No.275, 223, Sanganoor Main Rd, 11 Street, Ganapathy, Coimbatore, Tamil Nadu 641006'
  });

  const [pricing, setPricing] = useState({
    MS: 250,
    SS: 450,
    Aluminium: 350,
    WoodMetal: 550,
    Labor: 5000,
    Installation: 2000
  });

  const [seo, setSeo] = useState({
    title: 'JDS Iron and Steels | Premium Gate & Steel Fabrication',
    description: 'Leading gate fabrication and industrial steelworks in South India. Quality metalworks for residential and commercial projects.',
    keywords: 'JDS iron steels, gates, grills, fabrication, metalworks, industrial sheds, Coimbatore'
  });

  useEffect(() => {
    const settings = getSettings();
    setHomepage(settings.homepage);
    setContact(settings.contact);
    setPricing(settings.pricing);
    setSeo(settings.seo);
    setLoading(false);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      saveSettings({ homepage, contact, pricing, seo });
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const seedData = () => {
    if (!window.confirm("This will add the default services and testimonials. Continue?")) return;
    try {
      const products = [];
      products.forEach(p => addProduct(p));

      const testimonials = [
        { name: 'Ramesh K.', role: 'Homeowner', text: 'JDS Iron and Steels completely transformed our main gate. The metallic finish and design are top-notch.', rating: 5, date: new Date().toISOString().split('T')[0] },
        { name: 'Priya S.', role: 'Architect', text: 'I have collaborated with Sailesh and his team on multiple commercial projects. Their attention to detail is unmatched.', rating: 5, date: new Date().toISOString().split('T')[0] }
      ];
      testimonials.forEach(t => addTestimonial(t));

      setMessage('Default data loaded successfully!');
    } catch (err) {
      setMessage("Error loading demo data.");
    }
  };

  if (loading) return <div style={styles.loading}>Loading settings...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Website Settings</h2>
      {message && (
        <div style={{
          ...styles.alert,
          background: message.includes('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
          color: message.includes('Error') ? '#ef4444' : '#22c55e'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} style={styles.form}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Homepage Content</h3>
          <div style={styles.inputGroup}><label style={styles.label}>Hero Title (First Line)</label><input type="text" value={homepage.heroTitle} onChange={e => setHomepage({ ...homepage, heroTitle: e.target.value })} style={styles.input} /></div>
          <div style={styles.inputGroup}><label style={styles.label}>Hero Title (Highlighted Word)</label><input type="text" value={homepage.heroHighlight} onChange={e => setHomepage({ ...homepage, heroHighlight: e.target.value })} style={styles.input} /></div>
          <div style={styles.inputGroup}><label style={styles.label}>Hero Subtitle</label><textarea value={homepage.heroSubtitle} onChange={e => setHomepage({ ...homepage, heroSubtitle: e.target.value })} style={styles.textarea} rows={3} /></div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>SEO Configuration</h3>
          <div style={styles.inputGroup}><label style={styles.label}>Meta Title</label><input type="text" value={seo.title} onChange={e => setSeo({ ...seo, title: e.target.value })} style={styles.input} /></div>
          <div style={styles.inputGroup}><label style={styles.label}>Meta Description</label><textarea value={seo.description} onChange={e => setSeo({ ...seo, description: e.target.value })} style={styles.textarea} rows={2} /></div>
          <div style={styles.inputGroup}><label style={styles.label}>Keywords</label><input type="text" value={seo.keywords} onChange={e => setSeo({ ...seo, keywords: e.target.value })} style={styles.input} /></div>
        </div>



        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Contact Info</h3>
          <div style={styles.inputGroup}><label style={styles.label}>Phone</label><input type="text" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} style={styles.input} /></div>
          <div style={styles.inputGroup}><label style={styles.label}>WhatsApp</label><input type="text" value={contact.whatsapp} onChange={e => setContact({ ...contact, whatsapp: e.target.value })} style={styles.input} /></div>
          <div style={styles.inputGroup}><label style={styles.label}>Email</label><input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} style={styles.input} /></div>
          <div style={styles.inputGroup}><label style={styles.label}>Address</label><textarea value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} style={styles.textarea} rows={3} /></div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', paddingBottom: '3rem', flexWrap: 'wrap' }}>
          <button type="submit" style={styles.saveBtn} disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</button>
          <button type="button" onClick={seedData} style={{ ...styles.saveBtn, background: '#334155' }}>Load Demo Data</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px' },
  loading: { color: '#94a3b8', fontSize: '1.2rem' },
  title: { color: '#fff', marginBottom: '2rem', fontSize: '1.8rem' },
  alert: { padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid currentColor' },
  form: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  section: { background: '#1a1a1f', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  sectionTitle: { color: 'var(--accent-primary)', margin: '0 0 1rem 0', fontSize: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500' },
  input: { padding: '0.8rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', outline: 'none' },
  textarea: { padding: '0.8rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' },
  saveBtn: { padding: '1rem', borderRadius: '8px', background: 'linear-gradient(135deg, #00f2ff, #3b82f6)', color: '#000', fontSize: '1.1rem', fontWeight: '600', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', minWidth: '150px' }
};

export default SettingsAdmin;
