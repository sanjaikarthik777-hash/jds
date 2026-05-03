import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getSettings } from '../store';
import { User } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const Badge3D = () => {
  const outerRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.2;
      outerRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Outer Wireframe */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshStandardMaterial 
            color="#00F2FF" 
            wireframe 
            transparent 
            opacity={0.4} 
            emissive="#00F2FF" 
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Text hovering in front to prevent clipping without expanding past canvas */}
        <group position={[0, 0, 1.4]}>
          <Text
            position={[0, 0.35, 0]}
            fontSize={0.55}
            color="#00F2FF"
            anchorX="center"
            anchorY="center"
            fontWeight="bold"
            letterSpacing={0.05}
          >
            20+ YEARS
          </Text>
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.3}
            color="#F4F4F5"
            anchorX="center"
            anchorY="center"
            letterSpacing={0.2}
            fontWeight="bold"
          >
            EXPERIENCE
          </Text>
        </group>
      </group>
    </Float>
  );
};

const About = () => {
  const isMobile = useIsMobile();
  const textRef = useRef(null);
  const ownerRef = useRef(null);
  const [aboutText, setAboutText] = useState(
    "Welcome to J D S Iron & Steel. We are glad to introduce our company JDS IRON AND STEELS. We deal in tool and alloy steels, carbon steels such as EN-8, EN-9, EN-19, EN-24, EN-31, EN-36, EN-47, EN-41B, HCHCR, D-2, D-3, HDS, H-11, H-13, HSS, Silver Steel, 16MNCR-5, 20MNCR-5, 8620, P-20, C-45 and all EN, AISI and DIN series.\n\nWe also supply forgings in round, flat, and square sections, along with MS bright bars. We have CNC cutting facilities up to 450 mm and provide cutting sizes as per client requirements.\n\nWe offer solid round, flat, square, hexagon and flat sizes up to 405*155 mm, round bars up to 450 mm, and square bars up to 310-310 mm. We are committed to providing high-quality products at competitive prices and aim to build long-term business relationships with our clients."
  );

  useEffect(() => {
    const settings = getSettings();
    if (settings.homepage && settings.homepage.aboutText) {
      setAboutText(settings.homepage.aboutText);
    }
  }, []);

  useEffect(() => {
    // Only animate on desktop for performance
    if (isMobile) {
      gsap.set([textRef.current, ownerRef.current], { opacity: 1, y: 0, x: 0 });
      return;
    }

    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      ownerRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: ownerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, [isMobile]);

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div className="about-content">
          
          <div className="about-badge-container">
            <Canvas 
              camera={{ position: [0, 0, 6], fov: 45 }}
              dpr={isMobile ? [1, 1.5] : [1, 2]}
              gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Badge3D />
            </Canvas>
          </div>

          <div className="about-text" ref={textRef}>
            <h3 className="about-subtitle">Master Craftsmanship in Every Weld</h3>
            {aboutText.split('\n').map((paragraph, index) => (
              paragraph.trim() ? <p key={index}>{paragraph}</p> : null
            ))}
            
            <div className="owner-profile glass-panel" ref={ownerRef}>
              <div className="owner-image-placeholder" style={{ background: '#1a1a24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={40} color="#00F2FF" />
              </div>
              <div className="owner-info">
                <h4>Sailesh Purohit</h4>
                <span className="owner-role">Founder & Managing Director</span>
                <p>"Quality isn't just an act, it's our habit. We build structures that last a lifetime."</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
