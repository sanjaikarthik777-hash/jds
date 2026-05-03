import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, List, MessageSquare, Settings, TrendingUp, Activity, Globe, User } from 'lucide-react';
import * as THREE from 'three';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getGallery, getProducts, getLeads, getAnalytics } from '../store';

/* ─── 3D rotating icon canvas per card ─── */
const MiniScene = ({ color }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(64, 64);
    renderer.setPixelRatio(2);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
    cam.position.z = 2.2;

    const geo = new THREE.OctahedronGeometry(0.7, 0);
    const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.9 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let fr = 0;
    renderer.setAnimationLoop(() => {
      fr++;
      mesh.rotation.x = fr * 0.022;
      mesh.rotation.y = fr * 0.03;
      renderer.render(scene, cam);
    });

    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [color]);

  return <div ref={ref} style={{ width: 64, height: 64 }} />;
};

/* ─── Stat card ─── */
const StatCard = ({ icon: Icon, label, value, color, sub }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? `linear-gradient(135deg, rgba(${color},0.14), rgba(${color},0.04))`
          : 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(${color},${hov ? 0.4 : 0.12})`,
        borderRadius: 16,
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        transition: 'all 0.35s ease',
        cursor: 'default',
        boxShadow: hov ? `0 8px 30px rgba(${color},0.2)` : '0 2px 12px rgba(0,0,0,0.3)',
        transform: hov ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)'
      }}
    >
      <div style={{
        width: 52, height: 52,
        borderRadius: 12,
        background: `rgba(${color},0.15)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: `0 0 16px rgba(${color},0.3)`
      }}>
        <Icon size={22} color={`rgb(${color})`} />
      </div>
      <div>
        <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
        <div style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.2 }}>{value}</div>
        {sub && <div style={{ color: `rgb(${color})`, fontSize: '0.72rem', marginTop: 2, fontWeight: 500 }}>{sub}</div>}
      </div>
    </div>
  );
};

/* ─── Quick action card ─── */
const ActionCard = ({ title, desc, path, color, Icon }) => {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? `linear-gradient(135deg, rgba(${color},0.18), rgba(${color},0.05))`
          : 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(${color},${hov ? 0.45 : 0.1})`,
        borderRadius: 16,
        padding: '1.5rem 1.5rem 1.2rem',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hov ? `0 12px 40px rgba(${color},0.22)` : '0 2px 16px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem'
      }}
    >
      <div style={{
        width: 44, height: 44,
        borderRadius: 10,
        background: `rgba(${color},0.18)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 14px rgba(${color},0.3)`
      }}>
        <Icon size={20} color={`rgb(${color})`} />
      </div>
      <div>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{title}</div>
        <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: 4 }}>{desc}</div>
      </div>
      <div style={{
        marginTop: 'auto',
        color: `rgb(${color})`,
        fontSize: '0.75rem',
        fontWeight: 600,
        opacity: hov ? 1 : 0.5,
        transition: 'opacity 0.3s ease'
      }}>
        Open →
      </div>
    </div>
  );
};

/* ─── Main Dashboard ─── */
const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [realStats, setRealStats] = useState({ gallery: 0, products: 0, leads: 0, visits: 0 });
  const [chartData, setChartData] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good Morning');
    else if (h < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Load from localStorage store
    const gallery = getGallery();
    const products = getProducts();
    const leads = getLeads();
    const { total, chartData: cd } = getAnalytics();

    setRealStats({
      gallery: gallery.length,
      products: products.length,
      leads: leads.length,
      visits: total,
    });
    setChartData(cd);
    setRecentLeads(leads.slice(0, 5));
  }, []);

  const stats = [
    { icon: ImageIcon, label: 'Gallery Items', value: realStats.gallery,  color: '0,242,255',   sub: 'Total projects'   },
    { icon: List,      label: 'Products',      value: realStats.products, color: '59,130,246',  sub: 'Active offerings'  },
    { icon: MessageSquare, label: 'Total Leads', value: realStats.leads,  color: '34,211,238',  sub: 'Quote requests'    },
    { icon: TrendingUp, label: 'Site Visits',  value: realStats.visits,   color: '14,165,233',  sub: 'Total traffic'    },
  ];

  const actions = [
    { title: 'Gallery',      desc: 'Manage portfolio images',    path: '/admin/gallery',       color: '0,242,255',   Icon: ImageIcon      },
    { title: 'Products',     desc: 'Update product listings',    path: '/admin/products',      color: '59,130,246',  Icon: List           },
    { title: 'Leads',        desc: 'Manage quote requests',      path: '/admin/leads',         color: '34,211,238',  Icon: MessageSquare  },
    { title: 'Settings',     desc: 'Pricing & SEO settings',     path: '/admin/settings',      color: '14,165,233',  Icon: Settings       },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(0,242,255,0.12) 0%, rgba(59,130,246,0.18) 50%, rgba(10,15,20,0.6) 100%)',
        border: '1px solid rgba(0,242,255,0.2)',
        borderRadius: 20,
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: 80, 
          height: 80, 
          borderRadius: '50%', 
          background: '#1a1a24', 
          border: '3px solid #00f2ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <User size={40} color="#00f2ff" />
          <span style={{ position: 'absolute', bottom: 3, right: 3, width: 14, height: 14, background: '#22c55e', borderRadius: '50%', border: '3px solid #0a0a0f' }} />
        </div>
        <div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{greeting},</div>
          <h2 style={{ margin: '0 0 0.3rem', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>Sailesh Purohit 👋</h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>Owner · JDS Iron and Steels</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={14} color="#22c55e" />
          <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 600 }}>Live</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '1.5rem', minHeight: '350px' }}>
          <div style={{ marginBottom: '1.5rem', color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Visitor Traffic (7 Days)</div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={11} />
                <YAxis stroke="#475569" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Area type="monotone" dataKey="visits" stroke="#00f2ff" fill="url(#colorVisits)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={16} color="#00f2ff" />
            <span style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Recent Leads</span>
          </div>
          {recentLeads.length > 0 ? recentLeads.map((l, i) => (
            <div key={i} style={{ padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{l.name}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{l.gateType} • {l.material}</div>
              <div style={{ color: '#00f2ff', fontSize: '0.7rem', marginTop: 4 }}>
                {l.timestamp ? new Date(l.timestamp).toLocaleDateString() : ''}
              </div>
            </div>
          )) : (
            <div style={{ color: '#475569', fontSize: '0.8rem', padding: '1rem 0' }}>No recent leads</div>
          )}
        </div>
      </div>

      <div>
        <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          {actions.map(a => <ActionCard key={a.title} {...a} />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
