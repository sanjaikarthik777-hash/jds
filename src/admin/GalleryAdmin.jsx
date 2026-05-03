import React, { useState, useEffect } from 'react';
import { getGallery, addGalleryItem, deleteGalleryItem } from '../store';
import { Trash2, Plus, X, Upload, Play } from 'lucide-react';

const GalleryAdmin = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    category: 'all'
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const categories = [
    { id: 'all',      label: 'All Products' },
    { id: 'flat',     label: 'Flats' },
    { id: 'roundbar', label: 'Round Bar' },
    { id: 'roundrod', label: 'Round Rod' },
    { id: 'square',   label: 'Square' }
  ];

  const loadImages = () => {
    setImages(getGallery());
    setLoading(false);
  };

  const loadData = () => {
    setImages(getGallery());
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const openModal = () => {
    setFormData({ title: '', category: 'all' });
    setFiles([]);
    setPreviews([]);
    setProgress(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFiles([]);
    setPreviews([]);
    setProgress(0);
  };

  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    setFiles(selected);
    // Generate previews
    const urls = selected.map(f => URL.createObjectURL(f));
    setPreviews(urls);
  };


  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const isVideo = (file) => file.type.startsWith('video/');

  // Upload a single file to Cloudinary (image or video) and return secure URL
  const uploadToCloudinary = async (file) => {
    const resourceType = isVideo(file) ? 'video' : 'image';
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);
    data.append('folder', 'jds-gallery');
    data.append('resource_type', resourceType);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, {
      method: 'POST',
      body: data,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Cloudinary upload failed');
    }

    const json = await res.json();
    return json.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert('Please select at least one image.');
    setUploading(true);
    setProgress(0);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const secureUrl = await uploadToCloudinary(file);
        addGalleryItem({
          title: formData.title || file.name.split('.')[0],
          category: formData.category,
          imageUrl: secureUrl,
          mediaType: isVideo(file) ? 'video' : 'image',
        });
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      closeModal();
      loadImages();
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };


  const handleDelete = (id) => {
    if (!window.confirm('Delete this image?')) return;
    deleteGalleryItem(id);
    loadImages();
  };

  if (loading) return <div style={{ color: 'white' }}>Loading gallery...</div>;

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={styles.title}>Manage Gallery</h2>
        <button onClick={openModal} style={styles.addBtn}><Plus size={20} /> Upload Image(s)</button>
      </div>

      {images.length === 0 && (
        <div style={{ color: '#94a3b8', textAlign: 'center', padding: '4rem 0' }}>
          <Upload size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <p>No images yet. Click "Upload Image(s)" to add your first project photo.</p>
        </div>
      )}

      <div style={styles.grid}>
        {images.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={styles.imgContainer}>
              {item.mediaType === 'video' ? (
                <>
                  <video src={item.imageUrl} style={styles.img} muted preload="metadata" />
                  <div style={styles.playBadge}><Play size={22} fill="#fff" /></div>
                </>
              ) : (
                <img src={item.imageUrl} alt={item.title} style={styles.img} />
              )}
              <button onClick={() => handleDelete(item.id)} style={styles.deleteBtnVisible} title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
            <div style={styles.cardInfo}>
              <span style={styles.badge}>{item.mediaType === 'video' ? '🎬 video' : item.category}</span>
              <h3 style={styles.cardTitle}>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={{ color: '#fff', margin: 0 }}>Upload Images</h3>
              <button onClick={closeModal} style={styles.closeBtn}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>

              {/* File picker */}
              <div style={styles.fileUploadArea}>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                  style={styles.fileInput}
                  id="file-upload"
                />
                <label htmlFor="file-upload" style={styles.fileLabel}>
                  <Upload size={32} style={{ marginBottom: '0.5rem', color: 'var(--accent-primary)' }} />
                  <span style={{ color: '#e2e8f0' }}>
                    {files.length > 0 ? `${files.length} file(s) selected` : 'Click to select images or videos'}
                  </span>
                  <span style={{ color: '#475569', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    JPG, PNG, WebP · MP4, MOV, WebM
                  </span>
                </label>
              </div>

              {/* Thumbnails preview */}
              {previews.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {files.map((file, i) => (
                    file.type.startsWith('video/') ? (
                      <div key={i} style={{ position: 'relative', width: 72, height: 72, borderRadius: 8, background: '#0f172a', border: '2px solid rgba(0,242,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={20} color="#00f2ff" fill="#00f2ff" />
                      </div>
                    ) : (
                      <img key={i} src={previews[i]} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '2px solid rgba(0,242,255,0.4)' }} />
                    )
                  ))}
                </div>
              )}

              <div style={styles.inputGroup}>
                <label style={styles.label}>Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  style={styles.input}
                >
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Title (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Modern Swing Gate"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.saveBtn} disabled={uploading}>
                {uploading ? `Uploading to Cloudinary... ${progress}%` : 'Save to Gallery'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  title: { color: '#fff', margin: 0 },
  addBtn: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: 'var(--accent-primary)', color: '#000', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' },
  card: { background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' },
  imgContainer: { position: 'relative', height: '200px' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  imgOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end', padding: '0.5rem', opacity: 0, transition: 'opacity 0.2s ease' },
  deleteBtn: { background: '#ef4444', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' },
  deleteBtnVisible: { position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(239,68,68,0.9)', color: '#fff', border: 'none', width: 32, height: 32, borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' },
  playBadge: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', pointerEvents: 'none' },
  cardInfo: { padding: '1rem' },
  badge: { background: 'rgba(0, 242, 255, 0.15)', color: 'var(--accent-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', display: 'inline-block' },
  cardTitle: { color: '#fff', margin: '0.5rem 0 0', fontSize: '1rem' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' },
  modal: { background: '#1a1a1f', width: '100%', maxWidth: '520px', borderRadius: '16px', border: '1px solid rgba(0,242,255,0.2)', maxHeight: '90vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  closeBtn: { background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' },
  form: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  fileUploadArea: { border: '2px dashed rgba(0, 242, 255, 0.5)', borderRadius: '10px', padding: '2rem', textAlign: 'center', background: 'rgba(0, 242, 255, 0.04)', position: 'relative', cursor: 'pointer' },
  fileInput: { position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 2 },
  fileLabel: { display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { color: '#94a3b8', fontSize: '0.9rem' },
  input: { padding: '0.8rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' },
  saveBtn: { padding: '1rem', background: 'var(--accent-primary)', color: '#000', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }
};

// Add hover effect for img overlay via CSS
const hoverStyle = document.createElement('style');
hoverStyle.innerText = `.gallery-card:hover .img-overlay { opacity: 1 !important; }`;
document.head.appendChild(hoverStyle);

export default GalleryAdmin;
