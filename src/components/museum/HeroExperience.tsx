import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ChevronDown } from 'lucide-react';
import { sound } from '../../audio';

interface HeroExperienceProps {
  onBeginJourney: () => void;
  isAudioMuted?: boolean;
  onToggleMute?: () => void;
}

export const HeroExperience: React.FC<HeroExperienceProps> = ({
  onBeginJourney,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [, setIsLoaded] = useState<boolean>(false);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollRef = useRef<number>(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1); // Pure black void background
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.style.background = '#000000';
    renderer.domElement.style.transition = 'opacity 0.4s ease';

    let animationId: number;

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animationId);
      if (renderer.domElement) {
        renderer.domElement.style.opacity = '0';
      }
    };
    const onContextRestored = () => {
      if (renderer.domElement) {
        renderer.domElement.style.opacity = '1';
      }
      animate();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);
    container.appendChild(renderer.domElement);

    // 2. Focused Museum Spotlight Rig
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.7);
    scene.add(ambientLight);

    // Warm museum spotlight casting on the coin
    const museumSpot = new THREE.SpotLight(0xffe29a, 18, 32, Math.PI / 3.8, 0.45, 1);
    museumSpot.position.set(3.5, 5.0, 6.0);
    scene.add(museumSpot);

    // Subtle edge rim light for gold sheen
    const rimLight = new THREE.DirectionalLight(0x93c5fd, 2.2);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    // Mouse specular light
    const mouseLight = new THREE.PointLight(0xfffbeb, 5, 12);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // 3. Single Grand Hero Coin
    const coinGroup = new THREE.Group();
    // Position coin slightly above center so typography sits elegantly below it
    coinGroup.position.set(0, 0.85, 0);
    scene.add(coinGroup);

    const textureLoader = new THREE.TextureLoader();
    const obverseUrl = './specimens/chandragupta_ii_archer_gold_dinar.jpg';
    const reverseUrl = './specimens/samudragupta_lyrist_gold_dinar.jpg';

    const obverseTexture = textureLoader.load(obverseUrl, () => setIsLoaded(true));
    obverseTexture.colorSpace = THREE.SRGBColorSpace;
    const reverseTexture = textureLoader.load(reverseUrl);
    reverseTexture.colorSpace = THREE.SRGBColorSpace;
    reverseTexture.center.set(0.5, 0.5);
    reverseTexture.rotation = Math.PI;

    const coinRadius = 2.0;
    const coinThickness = 0.20;
    const coinGeometry = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, 80, 1, false);

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.25,
      bumpScale: 0.05
    });

    const obverseMaterial = new THREE.MeshStandardMaterial({
      map: obverseTexture,
      metalness: 0.90,
      roughness: 0.32,
      bumpScale: 0.08
    });

    const reverseMaterial = new THREE.MeshStandardMaterial({
      map: reverseTexture,
      metalness: 0.90,
      roughness: 0.32,
      bumpScale: 0.08
    });

    const coinMesh = new THREE.Mesh(coinGeometry, [rimMaterial, obverseMaterial, reverseMaterial]);
    coinMesh.rotation.x = Math.PI / 2;
    // Rotate 90 degrees to the left in the 2D plane (around cylinder symmetry axis Y)
    coinMesh.rotation.y = Math.PI / 2;
    coinGroup.add(coinMesh);

    // 4. Subtle Floating Dust Particles
    const particleCount = 900;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.05,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosRef.current = { x, y };
    };

    // 6. Scroll tracking for Camera Push Zoom
    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollRef.current = scrollY;

      if (overlayRef.current) {
        const opacity = Math.max(0, 1 - scrollY / 300);
        const translateY = -(scrollY * 0.35);
        overlayRef.current.style.opacity = opacity.toString();
        overlayRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        overlayRef.current.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop with Intersection Virtualization
    const clock = new THREE.Clock();
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animationId = requestAnimationFrame(animate);
      const currentScroll = scrollRef.current;

      const elapsedTime = clock.getElapsedTime();

      // Camera dolly zoom push into coin on scroll
      const targetZ = Math.max(3.6, 8.5 - (currentScroll / 450) * 4.9);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

      // Slow 2 RPM coin rotation (0.2 rad/sec)
      coinGroup.rotation.y = elapsedTime * 0.22;
      coinGroup.position.y = 0.85 + Math.sin(elapsedTime * 0.7) * 0.10;

      // Mouse interactive tilt
      const targetRotationX = mousePosRef.current.y * 0.25;
      coinGroup.rotation.x = THREE.MathUtils.lerp(coinGroup.rotation.x, targetRotationX, 0.05);

      // Mouse light tracking
      mouseLight.position.x = mousePosRef.current.x * 3.5;
      mouseLight.position.y = mousePosRef.current.y * 2.8;

      // Subtle dust drift
      particles.rotation.y = elapsedTime * 0.02;

      // Camera parallax
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosRef.current.x * 0.35, 0.03);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosRef.current.y * 0.25, 0.03);
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };

    // Pause rendering entirely when scrolled out of view to preserve 60 FPS in later Acts
    const observer = new IntersectionObserver(([entry]) => {
      const currentlyVisible = entry.isIntersecting;
      if (currentlyVisible && !isVisible) {
        isVisible = true;
        clock.start();
        animate();
      } else if (!currentlyVisible && isVisible) {
        isVisible = false;
        cancelAnimationFrame(animationId);
      }
    }, { threshold: 0.05 });

    observer.observe(container);
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      cancelAnimationFrame(animationId);
      try {
        renderer.forceContextLoss();
      } catch {
        // fail-safe
      }
      renderer.dispose();
      coinGeometry.dispose();
      rimMaterial.dispose();
      obverseMaterial.dispose();
      reverseMaterial.dispose();
      obverseTexture.dispose();
      reverseTexture.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="museum-hero-viewport" id="hero" style={{ background: '#000000' }}>
      {/* High-Resolution Gold Coin Underlay Fallback (guarantees dark aesthetic if WebGL context resets) */}
      <div 
        className="museum-hero-fallback-coin" 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(240px, 32vw, 380px)',
          height: 'clamp(240px, 32vw, 380px)',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(212, 175, 55, 0.35)',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.95
        }}
      >
        <img 
          src="./specimens/chandragupta_ii_archer_gold_dinar.jpg" 
          alt="Gupta Gold Specimen" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="museum-webgl-canvas-container" style={{ background: 'transparent', zIndex: 1 }} />

      {/* Soft Vignette Overlay */}
      <div className="museum-hero-scrim" style={{ background: 'radial-gradient(circle at 50% 45%, transparent 40%, rgba(0, 0, 0, 0.85) 100%)' }} />

      {/* Minimal Hero Centerpiece Typography */}
      <div 
        ref={overlayRef} 
        className="museum-hero-editorial-overlay"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: '80px',
          height: '100%',
          boxSizing: 'border-box',
          pointerEvents: 'auto'
        }}
      >
        <h1 
          className="font-serif animate-title-glow"
          style={{
            fontSize: 'clamp(2.2rem, 5.2vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '0.03em',
            lineHeight: 1.12,
            color: '#ffffff',
            maxWidth: '1100px',
            margin: '0 0 14px',
            textAlign: 'center',
            textShadow: '0 0 45px rgba(245, 158, 11, 0.38)'
          }}
        >
          HISTORY OF INDIAN CURRENCY
        </h1>

        <h2 
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.9)',
            letterSpacing: '0.06em',
            margin: '0 0 32px',
            textAlign: 'center'
          }}
        >
          An Interactive 2,500-Year Numismatic Museum
        </h2>

        {/* Scroll to Begin Minimalist Indicator */}
        <button
          type="button"
          onClick={() => {
            sound.playCinematicBoom();
            onBeginJourney();
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.65)',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fbbf24';
            e.currentTarget.style.transform = 'translateY(3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span 
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontWeight: 600
            }}
          >
            Scroll to Begin
          </span>
          <ChevronDown size={18} className="animate-bounce" style={{ color: '#f59e0b' }} />
        </button>
      </div>
    </section>
  );
};
