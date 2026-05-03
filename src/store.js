/**
 * JDS Iron and Steels — Local Data Store
 * Replaces Firebase Firestore with localStorage-based CRUD operations.
 */

const KEYS = {
  gallery: 'jds_gallery',
  products: 'jds_services',
  testimonials: 'jds_testimonials',
  leads: 'jds_leads',
  settings: 'jds_settings',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const read = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const readObj = (key, defaults = {}) => {
  try {
    return { ...defaults, ...(JSON.parse(localStorage.getItem(key)) || {}) };
  } catch {
    return defaults;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// ── Gallery ───────────────────────────────────────────────────────────────────

export const getGallery = () => read(KEYS.gallery);

export const addGalleryItem = (item) => {
  const items = read(KEYS.gallery);
  const newItem = { ...item, id: uid(), timestamp: new Date().toISOString() };
  write(KEYS.gallery, [newItem, ...items]);
  return newItem;
};

export const deleteGalleryItem = (id) => {
  write(KEYS.gallery, read(KEYS.gallery).filter(i => i.id !== id));
};

// ── Products ──────────────────────────────────────────────────────────────────
export const getProducts = () =>
  read(KEYS.products).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const addProduct = (item) => {
  const items = read(KEYS.products);
  const newItem = { ...item, id: uid() };
  write(KEYS.products, [...items, newItem]);
  return newItem;
};

export const updateProduct = (id, data) => {
  write(KEYS.products, read(KEYS.products).map(i => i.id === id ? { ...i, ...data } : i));
};

export const deleteProduct = (id) => {
  write(KEYS.products, read(KEYS.products).filter(i => i.id !== id));
};

// ── Testimonials ──────────────────────────────────────────────────────────────

export const getTestimonials = () => read(KEYS.testimonials);

export const addTestimonial = (item) => {
  const items = read(KEYS.testimonials);
  const newItem = { ...item, id: uid() };
  write(KEYS.testimonials, [...items, newItem]);
  return newItem;
};

export const updateTestimonial = (id, data) => {
  write(KEYS.testimonials, read(KEYS.testimonials).map(i => i.id === id ? { ...i, ...data } : i));
};

export const deleteTestimonial = (id) => {
  write(KEYS.testimonials, read(KEYS.testimonials).filter(i => i.id !== id));
};

// ── Leads ─────────────────────────────────────────────────────────────────────

export const getLeads = () =>
  read(KEYS.leads).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

export const addLead = (item) => {
  const items = read(KEYS.leads);
  const newItem = { ...item, id: uid(), timestamp: new Date().toISOString(), status: 'new' };
  write(KEYS.leads, [newItem, ...items]);
  return newItem;
};

export const updateLead = (id, data) => {
  write(KEYS.leads, read(KEYS.leads).map(i => i.id === id ? { ...i, ...data } : i));
};

export const deleteLead = (id) => {
  write(KEYS.leads, read(KEYS.leads).filter(i => i.id !== id));
};

// ── Settings ──────────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  homepage: {
    heroTitle: 'CRAFTING EXCELLENCE IN',
    heroHighlight: 'IRON & STEEL',
    heroSubtitle: 'JDS Iron and Steels — Leading suppliers of high-grade tool steels, alloy steels, and precision forgings with state-of-the-art CNC cutting.',
    aboutText: 'Welcome to J D S Iron & Steel. We are glad to introduce our company JDS IRON AND STEELS. We deal in tool and alloy steels, carbon steels such as EN-8, EN-9, EN-19, EN-24, EN-31, EN-36, EN-47, EN-41B, HCHCR, D-2, D-3, HDS, H-11, H-13, HSS, Silver Steel, 16MNCR-5, 20MNCR-5, 8620, P-20, C-45 and all EN, AISI and DIN series.\n\nWe also supply forgings in round, flat, and square sections, along with MS bright bars. We have CNC cutting facilities up to 450 mm and provide cutting sizes as per client requirements.\n\nWe offer solid round, flat, square, hexagon and flat sizes up to 405*155 mm, round bars up to 450 mm, and square bars up to 310-310 mm. We are committed to providing high-quality products at competitive prices and aim to build long-term business relationships with our clients.',
  },
  contact: {
    phone: '+91 9894339560',
    whatsapp: '919894339560',
    email: 'jds@gmail.com',
    address: 'SF.No.275, 223, Sanganoor Main Rd, 11 Street, Ganapathy, Coimbatore, Tamil Nadu 641006',
  },
  pricing: {
    MS: 250,
    SS: 450,
    Aluminium: 350,
    WoodMetal: 550,
    Labor: 5000,
    Installation: 2000,
  },
  seo: {
    title: 'JDS Iron and Steels | Premium Gate & Steel Fabrication',
    description: 'Leading gate fabrication and industrial steelworks in South India. Quality metalworks for residential and commercial projects.',
    keywords: 'JDS iron steels, gates, grills, fabrication, metalworks, industrial sheds, Coimbatore',
  },
  transformation_spotlight: {
    title: 'Modern Gate Transformation',
    subtitle: 'See how we turn outdated structures into modern masterpieces',
    beforeUrl: '',
    afterUrl: '',
  },
};

export const getSettings = () => {
  const saved = readObj(KEYS.settings, {});
  return {
    homepage: { ...DEFAULT_SETTINGS.homepage, ...(saved.homepage || {}) },
    contact: { ...DEFAULT_SETTINGS.contact, ...(saved.contact || {}) },
    pricing: { ...DEFAULT_SETTINGS.pricing, ...(saved.pricing || {}) },
    seo: { ...DEFAULT_SETTINGS.seo, ...(saved.seo || {}) },
    transformation_spotlight: { ...DEFAULT_SETTINGS.transformation_spotlight, ...(saved.transformation_spotlight || {}) },
  };
};

export const saveSettings = (settings) => {
  write(KEYS.settings, settings);
};

// ── Analytics (simple local counter) ─────────────────────────────────────────

const ANALYTICS_KEY = 'jds_analytics';

export const trackVisit = () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = readObj(ANALYTICS_KEY, { total: 0 });
    data[today] = (data[today] || 0) + 1;
    data.total = (data.total || 0) + 1;
    write(ANALYTICS_KEY, data);
  } catch { /* silent */ }
};

export const getAnalytics = () => {
  const data = readObj(ANALYTICS_KEY, { total: 0 });
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    days.push({
      name: d.toLocaleDateString('en-US', { weekday: 'short' }),
      visits: data[dateStr] || 0,
    });
  }
  return { total: data.total || 0, chartData: days };
};
