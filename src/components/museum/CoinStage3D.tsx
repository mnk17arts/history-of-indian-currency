import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Sparkles, Info, RotateCcw, X } from 'lucide-react';
import { sound } from '../../audio';

export interface CoinAnnotation {
  id: string;
  title: string;
  description: string;
  xPct: number;
  yPct: number;
  face: 'obverse' | 'reverse';
}

export interface CoinSpecimen3D {
  id: string;
  name: string;
  rulerOrEra: string;
  dateStr: string;
  metal: 'gold' | 'silver' | 'copper' | 'digital';
  shape?: 'round' | 'rectangular' | 'banknote';
  obverseImage: string;
  reverseImage: string;
  annotations?: CoinAnnotation[];
  purity: string;
  weightGrams?: string;
  mintLocation?: string;
}

interface CoinStage3DProps {
  coin: CoinSpecimen3D;
  className?: string;
  height?: number | string;
  variant?: 'card' | 'pure';
}

export const CoinStage3D: React.FC<CoinStage3DProps> = ({
  coin,
  className = '',
  height = 360,
  variant = 'card'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);
  const [activeSide, setActiveSide] = useState<'obverse' | 'reverse'>('obverse');
  const [activeAnnotation, setActiveAnnotation] = useState<CoinAnnotation | null>(null);
  const [isAutoSpin, setIsAutoSpin] = useState(true);

  const isBanknote = coin.shape === 'banknote' || coin.shape === 'rectangular';

  // References for Three.js state
  const targetRotationY = useRef(0);
  const targetRotationX = useRef(0);
  const isDragging = useRef(false);
  const previousPointerPosition = useRef({ x: 0, y: 0 });
  const momentum = useRef({ x: 0, y: 0 });
  const isAutoSpinRef = useRef(isAutoSpin);
  const currentSideRef = useRef<'obverse' | 'reverse'>('obverse');

  useEffect(() => {
    isAutoSpinRef.current = isAutoSpin;
  }, [isAutoSpin]);

  // 1. Viewport Virtualization: Only create WebGL context when in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Three.js Scene Setup (Active only when visible in viewport)
  useEffect(() => {
    if (!isInViewport) {
      setIs3DReady(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const heightPx = typeof height === 'number' ? height : container.clientHeight || 360;

    // Scene & Camera (Use 8.0 distance for pure variant for generous uncropped space)
    const cameraDist = variant === 'pure' ? 8.0 : 6.2;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / heightPx, 0.1, 100);
    camera.position.set(0, 0, cameraDist);

    // Renderer with fail-safe clear color & context loss handling
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default'
      });
    } catch {
      // Fallback if browser WebGL initialization fails
      setIs3DReady(false);
      return;
    }

    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const domElement = renderer.domElement;
    domElement.style.background = 'transparent';
    domElement.style.display = 'block';

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setIs3DReady(false);
    };
    domElement.addEventListener('webglcontextlost', handleContextLost, false);

    container.appendChild(domElement);

    // Lighting Rig tailored to coin metal type
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.9);
    scene.add(ambientLight);

    let keyLightColor = 0xffe8aa;
    let rimLightColor = 0x93c5fd;
    let rimIntensity = 2.0;

    if (coin.metal === 'silver') {
      keyLightColor = 0xf8fafc;
      rimLightColor = 0x38bdf8;
    } else if (coin.metal === 'copper') {
      keyLightColor = 0xfdba74;
      rimLightColor = 0xf97316;
    } else if (coin.metal === 'digital') {
      keyLightColor = 0x818cf8;
      rimLightColor = 0xc084fc;
      rimIntensity = 3.5;
    }

    const keySpot = new THREE.SpotLight(keyLightColor, 12, 18, Math.PI / 4, 0.35, 1);
    keySpot.position.set(3, 4, 4);
    scene.add(keySpot);

    const rimLight = new THREE.DirectionalLight(rimLightColor, rimIntensity);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 3.5, 10);
    fillLight.position.set(0, 0, 3.5);
    scene.add(fillLight);

    // 3. 3D Coin Mesh & Textures
    const coinGroup = new THREE.Group();
    scene.add(coinGroup);

    const textureLoader = new THREE.TextureLoader();
    let texturesLoadedCount = 0;
    const onTextureLoad = () => {
      texturesLoadedCount++;
      if (texturesLoadedCount >= 1) {
        setIs3DReady(true);
      }
    };

    const obverseTexture = textureLoader.load(coin.obverseImage, onTextureLoad);
    obverseTexture.colorSpace = THREE.SRGBColorSpace;

    const reverseTexture = textureLoader.load(coin.reverseImage || coin.obverseImage, onTextureLoad);
    reverseTexture.colorSpace = THREE.SRGBColorSpace;
    if (!isBanknote) {
      // Cylinder bottom cap UVs are inverted along V axis relative to top cap;
      // rotate 180° around texture center so reverse face is upright when coin is flipped
      reverseTexture.center.set(0.5, 0.5);
      reverseTexture.rotation = Math.PI;
    }

    let specimenGeometry: THREE.BufferGeometry;
    let haloGeometry: THREE.BufferGeometry;
    let edgeMaterial: THREE.Material;
    let obverseMaterial: THREE.Material;
    let reverseMaterial: THREE.Material;
    let haloMaterial: THREE.Material;
    let specimenMesh: THREE.Mesh;
    let haloMesh: THREE.Mesh;

    if (isBanknote) {
      // 3D Rectangular Banknote Substrate (Standard 2.15 : 1 modern note ratio)
      const noteWidth = 4.2;
      const noteHeight = 1.95;
      const noteThickness = 0.02;
      specimenGeometry = new THREE.BoxGeometry(noteWidth, noteHeight, noteThickness);

      edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0xf5f3ed, // Cotton-rag paper core edge
        roughness: 0.9,
        metalness: 0.05
      });

      obverseMaterial = new THREE.MeshStandardMaterial({
        map: obverseTexture,
        roughness: 0.75,
        metalness: 0.05,
        bumpScale: 0.02
      });

      reverseMaterial = new THREE.MeshStandardMaterial({
        map: reverseTexture,
        roughness: 0.75,
        metalness: 0.05,
        bumpScale: 0.02
      });

      // BoxGeometry face order: [+X, -X, +Y, -Y, +Z (Front), -Z (Back)]
      specimenMesh = new THREE.Mesh(specimenGeometry, [
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        obverseMaterial,
        reverseMaterial
      ]);
      coinGroup.add(specimenMesh);

      haloGeometry = new THREE.PlaneGeometry(noteWidth * 1.08, noteHeight * 1.15);
      haloMaterial = new THREE.MeshBasicMaterial({
        color: keyLightColor,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
      haloMesh.position.z = -0.04;
      coinGroup.add(haloMesh);
    } else {
      // 3D Circular Coin Cylinder
      const coinRadius = 1.7;
      const coinThickness = 0.14;
      specimenGeometry = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, 64, 1, false);

      let rimColor = 0xd4af37;
      let metalness = 0.9;
      let roughness = 0.35;

      if (coin.metal === 'silver') {
        rimColor = 0xcccccc;
        roughness = 0.3;
      } else if (coin.metal === 'copper') {
        rimColor = 0xb45309;
        roughness = 0.45;
      } else if (coin.metal === 'digital') {
        rimColor = 0x4f46e5;
        metalness = 0.7;
        roughness = 0.2;
      }

      edgeMaterial = new THREE.MeshStandardMaterial({
        color: rimColor,
        metalness,
        roughness,
        bumpScale: 0.04
      });

      obverseMaterial = new THREE.MeshStandardMaterial({
        map: obverseTexture,
        metalness: metalness * 0.9,
        roughness: roughness * 1.1,
        bumpScale: 0.06
      });

      reverseMaterial = new THREE.MeshStandardMaterial({
        map: reverseTexture,
        metalness: metalness * 0.9,
        roughness: roughness * 1.1,
        bumpScale: 0.06
      });

      // Cylinder face order: [0: rim, 1: obverse (top), 2: reverse (bottom)]
      specimenMesh = new THREE.Mesh(specimenGeometry, [edgeMaterial, obverseMaterial, reverseMaterial]);
      specimenMesh.rotation.x = Math.PI / 2;
      // Rotate 90 degrees to the left in the 2D plane (around cylinder symmetry axis Y)
      specimenMesh.rotation.y = Math.PI / 2;
      coinGroup.add(specimenMesh);

      haloGeometry = new THREE.RingGeometry(coinRadius * 1.05, coinRadius * 1.18, 48);
      haloMaterial = new THREE.MeshBasicMaterial({
        color: keyLightColor,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
      haloMesh.position.z = -0.05;
      coinGroup.add(haloMesh);
    }

    // Pointer Interaction
    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging.current = true;
      setIsAutoSpin(false);
      previousPointerPosition.current = { x: clientX, y: clientY };
      momentum.current = { x: 0, y: 0 };
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging.current) return;
      const deltaX = clientX - previousPointerPosition.current.x;
      const deltaY = clientY - previousPointerPosition.current.y;

      targetRotationY.current += deltaX * 0.012;
      targetRotationX.current += deltaY * 0.01;
      targetRotationX.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX.current));

      momentum.current = { x: deltaX * 0.005, y: deltaY * 0.004 };
      previousPointerPosition.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchEnd = () => onPointerUp();

    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 360;
      const newHeight = typeof height === 'number' ? height : container.clientHeight || 360;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Calm, museum-grade rotation speed (0.22 rad/s matching Hero Atrium)
      if (!isDragging.current && isAutoSpinRef.current) {
        targetRotationY.current += delta * 0.22;
      } else if (!isDragging.current) {
        targetRotationY.current += momentum.current.x;
        targetRotationX.current += momentum.current.y;
        momentum.current.x *= 0.92;
        momentum.current.y *= 0.92;
      }

      coinGroup.rotation.y = THREE.MathUtils.lerp(coinGroup.rotation.y, targetRotationY.current, 0.1);
      coinGroup.rotation.x = THREE.MathUtils.lerp(coinGroup.rotation.x, targetRotationX.current, 0.1);

      const elapsed = clock.getElapsedTime();
      coinGroup.position.y = Math.sin(elapsed * 1.5) * 0.06;

      const normalizedAngle = (((coinGroup.rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2));
      const nextSide = (normalizedAngle > Math.PI * 0.5 && normalizedAngle < Math.PI * 1.5) ? 'reverse' : 'obverse';
      if (currentSideRef.current !== nextSide) {
        currentSideRef.current = nextSide;
        setActiveSide(nextSide);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('webglcontextlost', handleContextLost);
      cancelAnimationFrame(animationId);
      try {
        renderer.forceContextLoss();
      } catch {
        // ignore if not supported
      }
      renderer.dispose();
      specimenGeometry.dispose();
      haloGeometry.dispose();
      edgeMaterial.dispose();
      obverseMaterial.dispose();
      reverseMaterial.dispose();
      haloMaterial.dispose();
      obverseTexture.dispose();
      reverseTexture.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [coin, height, isInViewport]);

  // Flip Coin 180°
  const handleFlipCoin = () => {
    sound.playHover();
    setIsAutoSpin(false);
    if (activeSide === 'obverse') {
      targetRotationY.current += Math.PI;
    } else {
      targetRotationY.current -= Math.PI;
    }
  };

  // Toggle Auto-spin
  const handleToggleSpin = () => {
    sound.playClick();
    setIsAutoSpin(prev => !prev);
  };

  // Reset Orientation & Resume Orbit
  const handleReset = () => {
    sound.playClick();
    targetRotationX.current = 0;
    targetRotationY.current = 0;
    momentum.current = { x: 0, y: 0 };
    setIsAutoSpin(true);
  };

  // Pure Frameless Museum Variant (Centerpiece Exhibition Mode)
  if (variant === 'pure') {
    return (
      <div 
        ref={containerRef} 
        className={`museum-coin-pure-stage ${className}`}
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: typeof height === 'number' ? `${height}px` : height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Instant Photorealistic Fallback Image (Zero blank/white areas) */}
        <img
          src={activeSide === 'obverse' ? coin.obverseImage : (coin.reverseImage || coin.obverseImage)}
          alt={coin.name}
          className="coin-canvas-fallback-img"
          style={{ 
            opacity: is3DReady ? 0 : 0.95,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.9))'
          }}
        />

        {/* 3D WebGL Canvas Mount Container */}
        <div 
          ref={mountRef} 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%',
            opacity: is3DReady ? 1 : 0,
            transition: 'opacity 0.4s ease',
            cursor: 'grab'
          }} 
        />

        {/* Unobtrusive Floating Museum Inspection Controls */}
        <div 
          className="museum-pure-controls"
          role="toolbar"
          aria-label="3D Specimen Inspection Controls"
        >
          {/* Subtle Face Badge */}
          <span className="museum-pure-face-badge">
            <span className="museum-pure-face-dot" />
            <span>{activeSide === 'obverse' ? (isBanknote ? 'Obverse (Front)' : 'Obverse') : (isBanknote ? 'Reverse (Back)' : 'Reverse')}</span>
          </span>

          {/* Action Button Cluster */}
          <div className="museum-pure-btn-group">
            <button
              type="button"
              onClick={handleFlipCoin}
              className="museum-pure-btn"
              title={isBanknote ? "Flip banknote 180°" : "Flip coin 180°"}
              aria-label={isBanknote ? "Flip banknote 180 degrees" : "Flip coin 180 degrees"}
            >
              <Rotate3d size={13} className="text-amber-400" />
              <span>Flip</span>
            </button>

            <button
              type="button"
              onClick={handleToggleSpin}
              className={`museum-pure-btn ${isAutoSpin ? 'museum-pure-btn-active' : ''}`}
              title={isAutoSpin ? "Pause rotation" : "Resume continuous rotation"}
              aria-label={isAutoSpin ? "Pause rotation" : "Resume continuous rotation"}
            >
              <RotateCcw size={13} className="text-amber-400" />
              <span>{isAutoSpin ? 'Orbiting' : 'Orbit'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="museum-pure-btn"
              title="Reset specimen orientation"
              aria-label="Reset specimen orientation"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`museum-coin-stage-card ${className}`}>
      {/* 3D WebGL Canvas Frame */}
      <div 
        className="coin-canvas-frame"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        {/* Instant Photorealistic Fallback Image (Guarantees zero blank/white areas) */}
        <img
          src={activeSide === 'obverse' ? coin.obverseImage : (coin.reverseImage || coin.obverseImage)}
          alt={coin.name}
          className="coin-canvas-fallback-img"
          style={{ opacity: is3DReady ? 0 : 0.95 }}
        />

        {/* 3D WebGL Canvas Mount Container */}
        <div 
          ref={mountRef} 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%',
            opacity: is3DReady ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }} 
        />

        {/* Floating Specimen Metadata Badge */}
        <div className="coin-badge-metal">
          <div className="coin-metal-pill">
            <Sparkles size={11} style={{ color: '#f59e0b' }} />
            <span>{isBanknote ? 'Cotton Rag Security Substrate' : `${coin.metal} Standard`}</span>
          </div>
          <span className="coin-name-label">
            {coin.name}
          </span>
        </div>

        {/* Current Face Indicator (Obverse vs Reverse) */}
        <div className="coin-face-indicator">
          <span className="coin-face-dot" />
          <span>{activeSide === 'obverse' ? (isBanknote ? 'Front (Obverse)' : 'Obverse Face') : (isBanknote ? 'Back (Reverse)' : 'Reverse Face')}</span>
        </div>

        {/* Interactive Controls Overlay */}
        <div className="coin-controls-cluster">
          <button
            type="button"
            onClick={handleFlipCoin}
            className="coin-control-btn"
            title={isBanknote ? "Flip banknote 180°" : "Flip coin 180°"}
          >
            <Rotate3d size={13} style={{ color: '#f59e0b' }} />
            <span>Flip</span>
          </button>
          <button
            type="button"
            onClick={handleToggleSpin}
            className="coin-control-btn"
            style={isAutoSpin ? { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fef08a' } : undefined}
            title="Toggle Continuous Orbit"
          >
            {isAutoSpin ? 'Orbit On' : 'Orbit Off'}
          </button>
        </div>

        {/* Tactile drag helper hint */}
        <div className="coin-drag-hint">
          {isBanknote ? 'Drag to inspect banknote 360°' : 'Drag to inspect 360°'}
        </div>
      </div>

      {/* Numismatic Specs Grid Below Canvas */}
      <div className="coin-numismatic-specs">
        <div className="coin-spec-box">
          <div className="coin-spec-key">{isBanknote ? 'Security Substrate' : 'Purity'}</div>
          <div className="coin-spec-val" title={coin.purity}>{coin.purity}</div>
        </div>
        <div className="coin-spec-box">
          <div className="coin-spec-key">{isBanknote ? 'Security Presses' : 'Era / Mint'}</div>
          <div className="coin-spec-val" title={coin.mintLocation || coin.dateStr}>{coin.mintLocation || coin.dateStr}</div>
        </div>
        <div className="coin-spec-box">
          <div className="coin-spec-key">{isBanknote ? 'Sovereign Authority' : 'Ruler'}</div>
          <div className="coin-spec-val" title={coin.rulerOrEra}>{coin.rulerOrEra}</div>
        </div>
      </div>

      {/* Clickable Hotspot Callout if selected */}
      {activeAnnotation && (
        <div style={{
          marginTop: '12px',
          padding: '12px 14px',
          borderRadius: '12px',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          fontSize: '12px',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fef08a', fontWeight: 600, marginBottom: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-serif)' }}>
              <Info size={13} />
              {activeAnnotation.title}
            </span>
            <button 
              type="button"
              onClick={() => setActiveAnnotation(null)}
              aria-label="Close annotation callout"
              style={{ color: 'rgba(255, 255, 255, 0.4)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <X size={13} />
            </button>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.5 }}>
            {activeAnnotation.description}
          </p>
        </div>
      )}
    </div>
  );
};
