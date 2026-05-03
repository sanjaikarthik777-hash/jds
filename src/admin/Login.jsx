import React, { useState, useEffect, useRef } from 'react';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, Zap } from 'lucide-react';
import * as THREE from 'three';

/* ─── Full-screen Three.js background ─── */
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
    camera.position.z = 5;

    /* Particles */
    const count = 300;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00F2FF');
    const dark = new THREE.Color('#0EA5E9');
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = Math.random() > 0.55 ? cyan : dark;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.9 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* Large torus knot */
    const tk = new THREE.TorusKnotGeometry(2.2, 0.5, 140, 20);
    const tkMat = new THREE.MeshBasicMaterial({ color: '#00F2FF', wireframe: true, transparent: true, opacity: 0.06 });
    const torus = new THREE.Mesh(tk, tkMat);
    torus.position.set(4, 0, -1);
    scene.add(torus);

    /* Secondary sphere */
    const sGeo = new THREE.SphereGeometry(1.8, 24, 14);
    const sMat = new THREE.MeshBasicMaterial({ color: '#3B82F6', wireframe: true, transparent: true, opacity: 0.09 });
    const sphere = new THREE.Mesh(sGeo, sMat);
    sphere.position.set(-5, 1, -2);
    scene.add(sphere);

    /* Mouse parallax */
    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    let fr = 0;
    renderer.setAnimationLoop(() => {
      fr++;
      const t = fr * 0.005;
      points.rotation.y = t * 0.1 + mx * 0.05;
      points.rotation.x = t * 0.04 + my * 0.04;
      torus.rotation.x = t * 0.28;
      torus.rotation.y = t * 0.18;
      sphere.rotation.y = t * 0.22;
      sphere.rotation.x = t * 0.15;
      renderer.render(scene, camera);
    });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none'
    }} />
  );
};

/* ─── Floating label input ─── */
const FloatInput = ({ label, type, value, onChange, Icon }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.35)',
        border: `1px solid ${focus ? 'rgba(0,242,255,0.7)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 10,
        padding: '0.85rem 1rem',
        transition: 'all 0.3s ease',
        boxShadow: focus ? '0 0 16px rgba(0,242,255,0.18)' : 'none',
        gap: '0.75rem'
      }}>
        <Icon size={17} color={focus ? '#00f2ff' : '#475569'} style={{ flexShrink: 0, transition: 'color 0.3s ease' }} />
        <input
          type={type}
          placeholder={label}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '0.95rem',
            fontFamily: 'inherit'
          }}
        />
      </div>
    </div>
  );
};

/* ─── Main Login ─── */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 30% 40%,#0f172a 0%,#0a0f14 55%,#0f172a 100%)',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      padding: '1rem'
    }}>
      <ThreeBackground />

      {/* Glow orbs */}
      <div style={{
        position: 'fixed', top: '20%', left: '15%',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(0,242,255,0.12),transparent 65%)',
        filter: 'blur(20px)', pointerEvents: 'none', zIndex: 1
      }} />
      <div style={{
        position: 'fixed', bottom: '15%', right: '15%',
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(59,130,246,0.2),transparent 65%)',
        filter: 'blur(20px)', pointerEvents: 'none', zIndex: 1
      }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 420,
        background: 'rgba(10,10,16,0.75)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(0,242,255,0.22)',
        borderRadius: 24,
        padding: '2.5rem 2rem',
        boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,242,255,0.05) inset',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
        transition: 'opacity 0.6s ease, transform 0.6s ease'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
            <div style={{
              width: 80, height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#00f2ff,#3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '3px solid rgba(0,242,255,0.4)',
              boxShadow: '0 0 28px rgba(0,242,255,0.55)',
              margin: '0 auto'
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>JDS</span>
            </div>
            <div style={{
              position: 'absolute', bottom: 2, right: 2,
              width: 18, height: 18,
              background: 'linear-gradient(135deg,#00f2ff,#3b82f6)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #0a0a0f'
            }}>
              <Zap size={9} color="#fff" />
            </div>
          </div>

          <h1 style={{
            margin: '0 0 0.3rem',
            fontSize: '1.6rem',
            fontWeight: 800,
            background: 'linear-gradient(90deg,#fff 40%,#00f2ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Admin Portal
          </h1>
          <p style={{ color: '#475569', margin: 0, fontSize: '0.85rem' }}>
            JDS Iron and Steels · Secure Login
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 10,
            padding: '0.75rem 1rem',
            color: '#ef4444',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FloatInput
            label="Username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            Icon={User}
          />
          <FloatInput
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            Icon={Lock}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.5rem',
              padding: '0.9rem',
              borderRadius: 12,
              border: 'none',
              background: loading
                ? 'rgba(0,242,255,0.5)'
                : 'linear-gradient(135deg,#00f2ff,#3b82f6)',
              color: '#000',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(0,242,255,0.4)',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  display: 'inline-block'
                }} />
                Authenticating...
              </>
            ) : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          marginTop: '1.8rem',
          paddingTop: '1.2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
          color: '#334155',
          fontSize: '0.75rem'
        }}>
          © 2025 JDS Iron and Steels · Admin Access Only
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
};

export default Login;
