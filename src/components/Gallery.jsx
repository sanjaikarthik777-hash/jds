import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Sparkles, Play } from 'lucide-react';
import { getGallery } from '../store';
import './Gallery.css';

const ITEMS_PER_PAGE = 6;

const fixedCategories = [
  { id: 'all', label: 'All Products', icon: '📦' },
  { id: 'flat', label: 'Flats', icon: '➖' },
  { id: 'roundbar', label: 'Round Bar', icon: '📏' },
  { id: 'roundrod', label: 'Round Rod', icon: '⭕' },
  { id: 'square', label: 'Square', icon: '⬛' }
];

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [gridKey, setGridKey] = useState(0);
  const tabIndicatorRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const data = getGallery();
    setGalleryItems(data);
  }, []);

  const filteredImages = galleryItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
      (item.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const category = fixedCategories.find(c => c.id === activeCategory);
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const currentImages = filteredImages.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const switchCategory = (id) => {
    if (id === activeCategory) return;
    setActiveCategory(id);
    setCurrentPage(0);
    setGridKey(prev => prev + 1);
  };

  // Animate tab indicator
  useEffect(() => {
    if (!tabsRef.current || !tabIndicatorRef.current) return;
    const activeTab = tabsRef.current.querySelector('.gallery-tab.active');
    if (activeTab) {
      const { offsetLeft, offsetWidth } = activeTab;
      tabIndicatorRef.current.style.transform = `translateX(${offsetLeft}px) scale(1.02)`;
      tabIndicatorRef.current.style.width = `${offsetWidth}px`;
    }
  }, [activeCategory, galleryItems.length]);

  const nextPage = () => {
    setCurrentPage(p => (p + 1) % totalPages);
    setGridKey(prev => prev + 1);
  };
  const prevPage = () => {
    setCurrentPage(p => (p - 1 + totalPages) % totalPages);
    setGridKey(prev => prev + 1);
  };

  const openLightbox = (localIndex) => {
    const globalIndex = currentPage * ITEMS_PER_PAGE + localIndex;
    setLightbox({ open: true, index: globalIndex });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0 });
    document.body.style.overflow = '';
  };

  const lightboxNext = useCallback(() => {
    setLightbox(lb => ({ ...lb, index: (lb.index + 1) % filteredImages.length }));
  }, [filteredImages.length]);

  const lightboxPrev = useCallback(() => {
    setLightbox(lb => ({ ...lb, index: (lb.index - 1 + filteredImages.length) % filteredImages.length }));
  }, [filteredImages.length]);

  useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e) => {
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox.open, lightboxNext, lightboxPrev]);

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        {/* Section Header */}
        <div className="gallery-hero-header">
          <div className="gallery-badge">
            <Sparkles size={14} />
            <span>Portfolio</span>
          </div>
          <h2 className="gallery-main-title">Our Finest <span className="text-gradient">Craftsmanship</span></h2>
          <p className="gallery-description">
            Explore {galleryItems.length} high-quality industrial products — from precision-engineered bars to custom steel sections
          </p>
        </div>

        {/* Search and Advanced Filters */}
        <div className="gallery-filters-row">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="gallery-tabs-wrapper">
          <div className="gallery-tabs" ref={tabsRef} role="tablist">
            <div className="tab-indicator" ref={tabIndicatorRef} />
            {fixedCategories.map(cat => {
              const count = cat.id === 'all' 
                ? galleryItems.length 
                : galleryItems.filter(img => img.category === cat.id).length;
              
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`gallery-tab ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => switchCategory(cat.id)}
                >
                  <span className="tab-icon">{cat.icon}</span>
                  <span className="tab-label">{cat.label}</span>
                  <span className="tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mosaic Grid */}
        <div className="gallery-grid" key={gridKey}>
          {currentImages.map((item, index) => (
            <div
              key={`${activeCategory}-${currentPage}-${index}`}
              className={`gallery-card gallery-card-${(index % 6) + 1}`}
              onClick={() => openLightbox(index)}
              style={{ '--delay': `${index * 0.08}s` }}
            >
              <div className="card-image-wrap">
                {item.mediaType === 'video' ? (
                  <>
                    <video src={item.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted preload="metadata" />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', pointerEvents: 'none' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,242,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={20} fill="#000" color="#000" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="card-hover-overlay">
                <div className="card-hover-ring">
                  <Maximize2 size={20} strokeWidth={2.5} />
                </div>
                <div className="card-hover-info">
                  <span className="card-category-chip">{fixedCategories.find(c => c.id === item.category)?.label || 'Project'}</span>
                </div>
              </div>
              <div className="card-shine" />
            </div>
          ))}
          {currentImages.length === 0 && <p style={{color: '#94a3b8', textAlign: 'center', gridColumn: '1 / -1'}}>No projects found in this category.</p>}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="gallery-pagination">
            <button className="pag-btn" onClick={prevPage} aria-label="Previous page">
              <ChevronLeft size={20} />
            </button>

            <div className="pag-track">
              <div className="pag-progress" style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }} />
            </div>

            <span className="pag-text">{currentPage + 1} <span className="pag-divider">/</span> {totalPages}</span>

            <button className="pag-btn" onClick={nextPage} aria-label="Next page">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="lb-backdrop" onClick={closeLightbox}>
          <div className="lb-container" onClick={e => e.stopPropagation()}>
            <div className="lb-top-bar">
              <div className="lb-info">
                <span className="lb-category">{category?.icon} {category?.label}</span>
                <span className="lb-counter">{lightbox.index + 1} / {filteredImages.length}</span>
              </div>
              <button className="lb-close" onClick={closeLightbox} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="lb-image-area">
              <button className="lb-arrow lb-arrow-left" onClick={lightboxPrev} aria-label="Previous">
                <ChevronLeft size={24} />
              </button>

              <div className="lb-img-frame">
                {filteredImages[lightbox.index]?.mediaType === 'video' ? (
                  <video
                    key={lightbox.index}
                    src={filteredImages[lightbox.index]?.imageUrl}
                    controls
                    autoPlay
                    style={{ maxHeight: '60vh', maxWidth: '100%', borderRadius: '12px', background: '#000' }}
                  />
                ) : (
                  <img
                    key={lightbox.index}
                    src={filteredImages[lightbox.index]?.imageUrl}
                    alt={filteredImages[lightbox.index]?.title}
                  />
                )}
              </div>

              <button className="lb-arrow lb-arrow-right" onClick={lightboxNext} aria-label="Next">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="lb-thumbstrip">
              {filteredImages.slice(
                Math.max(0, lightbox.index - 3),
                Math.min(filteredImages.length, lightbox.index + 4)
              ).map((item, i) => {
                const realIndex = Math.max(0, lightbox.index - 3) + i;
                return (
                  <button
                    key={realIndex}
                    className={`lb-thumb ${realIndex === lightbox.index ? 'active' : ''}`}
                    onClick={() => setLightbox(lb => ({ ...lb, index: realIndex }))}
                  >
                    {item.mediaType === 'video' ? (
                      <div style={{ width: '100%', height: '100%', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                        <Play size={16} color="#00f2ff" fill="#00f2ff" />
                      </div>
                    ) : (
                      <img src={item.imageUrl} alt="" loading="lazy" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
