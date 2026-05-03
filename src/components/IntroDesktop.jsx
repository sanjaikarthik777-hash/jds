import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import './Intro.css';

const AnimatedLogo = () => {
  const jRef = useRef();
  const dRef = useRef();
  const sRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    gsap.set(jRef.current.position, { x: -5, y: 5, z: -5 });
    gsap.set(jRef.current.rotation, { x: Math.PI, y: Math.PI / 2, z: 0 });
    gsap.set(dRef.current.position, { x: 0, y: -5, z: -2 });
    gsap.set(dRef.current.rotation, { x: -Math.PI / 2, y: 0, z: Math.PI });
    gsap.set(sRef.current.position, { x: 5, y: 5, z: -8 });
    gsap.set(sRef.current.rotation, { x: 0, y: -Math.PI, z: -Math.PI / 2 });
    gsap.set(lightRef.current.position, { x: -10, y: 0, z: 2 });

    const tl = gsap.timeline();
    tl.to([jRef.current.position, dRef.current.position, sRef.current.position], {
      x: (i) => [-1.5, 0, 1.8][i], y: 0, z: 0,
      duration: 1.2, ease: 'power3.out', stagger: 0.1
    }, 0);
    tl.to([jRef.current.rotation, dRef.current.rotation, sRef.current.rotation], {
      x: 0, y: 0, z: 0, duration: 1.2, ease: 'power3.out', stagger: 0.1
    }, 0);
    tl.to(lightRef.current.position, { x: 10, duration: 1.5, ease: 'power2.inOut' }, 0.8);

    gsap.fromTo('.intro-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.2 });
    gsap.fromTo('.intro-tagline',  { opacity: 0 },         { opacity: 1, duration: 1, delay: 1.6 });
  }, []);

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight ref={lightRef} color="#00F2FF" intensity={50} distance={15} />
      <Environment preset="night" />
      <Sparkles count={100} scale={10} size={4} speed={0.4} opacity={0.5} color="#00F2FF" />
      <Sparkles count={50}  scale={12} size={2} speed={0.2} opacity={0.3} color="#a0aabf" />
      <Text ref={jRef} fontSize={2.5} anchorX="center" anchorY="middle" fontWeight="bold">
        J<meshStandardMaterial metalness={1} roughness={0.2} color="#00F2FF" />
      </Text>
      <Text ref={dRef} fontSize={2.5} anchorX="center" anchorY="middle" fontWeight="bold">
        D<meshStandardMaterial metalness={1} roughness={0.2} color="#00F2FF" />
      </Text>
      <Text ref={sRef} fontSize={2.5} anchorX="center" anchorY="middle" fontWeight="bold">
        S<meshStandardMaterial metalness={1} roughness={0.2} color="#00F2FF" />
      </Text>
    </group>
  );
};

const IntroCamera = () => {
  useFrame((state) => { state.camera.position.z -= 0.005; });
  return null;
};

const IntroDesktop = ({ fadingOut }) => (
  <div className={`intro-container ${fadingOut ? 'fade-out' : ''}`}>
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 4, 12]} />
      <IntroCamera />
      <AnimatedLogo />
    </Canvas>
    <div className="intro-overlay">
      <h1 className="intro-subtitle">JDS Iron and Steels</h1>
      <p className="intro-tagline">Built with Strength. Designed with Precision.</p>
    </div>
  </div>
);

export default IntroDesktop;
