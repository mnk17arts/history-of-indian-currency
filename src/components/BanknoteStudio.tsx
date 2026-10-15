import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  RotateCw,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shield,
  Palette,
  CheckCircle2,
  Play,
  Pause,
  RefreshCw,
  MoveHorizontal,
  Film
} from 'lucide-react';
import {
  BANKNOTE_DATA,
  BANKNOTE_SERIES,
  type BanknoteModel,
  type BanknoteFeature
} from '../data/banknoteData';
import { sound } from '../audio';

export const BanknoteStudio: React.FC = () => {
  const [selectedSeries, setSelectedSeries] = useState<string>('Mahatma Gandhi New Series');
  
  // Filter banknotes for active series
  const seriesNotes = useMemo(() => {
    return BANKNOTE_DATA.filter((n) => n.series === selectedSeries);
  }, [selectedSeries]);

  const [selectedNoteId, setSelectedNoteId] = useState<string>('mg-new-2000');

  // Currently selected banknote
  const currentNote = useMemo(() => {
    const found = seriesNotes.find((n) => n.id === selectedNoteId);
    return found || seriesNotes[0] || BANKNOTE_DATA[0];
  }, [seriesNotes, selectedNoteId]);

  // Inspection mode: 'design' vs 'security'
  const [featureMode, setFeatureMode] = useState<'design' | 'security'>('security');
  
  // Active feature side: 'obverse' vs 'reverse'
  const [activeSide, setActiveSide] = useState<'obverse' | 'reverse'>('obverse');

  // Active feature list based on mode & side
  const activeFeatures = useMemo(() => {
    const list = featureMode === 'design' ? currentNote.designFeatures : currentNote.securityFeatures;
    const filtered = list.filter((f) => f.side === activeSide);
    return filtered.length > 0 ? filtered : list;
  }, [currentNote, featureMode, activeSide]);

  // Selected feature index
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(0);

  // Safe active feature
  const activeFeature = useMemo<BanknoteFeature | undefined>(() => {
    if (!activeFeatures || activeFeatures.length === 0) return undefined;
    return activeFeatures[activeFeatureIndex] || activeFeatures[0];
  }, [activeFeatures, activeFeatureIndex]);

  // GIF loading state for active feature
  const [isGifLoaded, setIsGifLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsGifLoaded(false);
  }, [activeFeature?.id]);

  // ========================================================
  // 360° INTERACTIVE TURNTABLE ROTATOR (DRAG & AUTO-ROTATE)
  // ========================================================
  const [angle360, setAngle360] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragStartAngle = useRef<number>(0);
  const turntableRef = useRef<HTMLDivElement>(null);

  // Auto-rotate 360 loop
  useEffect(() => {
    if (!isAutoRotating) return;
    let animId: number;
    const step = () => {
      setAngle360((prev) => (prev + 0.5) % 360);
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating]);

  // Pointer drag to spin 360
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    dragStartX.current = e.clientX;
    dragStartAngle.current = angle360;
    if (turntableRef.current) {
      turntableRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    // Map pixels to degrees (1px ~ 0.65 degrees)
    const newAngle = ((dragStartAngle.current + deltaX * 0.65) % 360 + 360) % 360;
    setAngle360(Math.round(newAngle));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (turntableRef.current && turntableRef.current.hasPointerCapture(e.pointerId)) {
      turntableRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleFlip180 = () => {
    sound.playPaperFlick();
    setAngle360((prev) => {
      const normalized = Math.round(prev % 360);
      return normalized < 90 || normalized >= 270 ? 180 : 0;
    });
  };

  const handleResetAngle = () => {
    sound.playLoupeClick();
    setAngle360(0);
    setIsAutoRotating(false);
  };

  const handleToggleAutoRotate = () => {
    sound.playSlide();
    setIsAutoRotating((prev) => !prev);
  };

  // Series & Note switching handlers
  const handleSelectSeries = (series: string) => {
    sound.playSlide();
    setSelectedSeries(series);
    const newNotes = BANKNOTE_DATA.filter((n) => n.series === series);
    if (newNotes.length > 0) {
      setSelectedNoteId(newNotes[0].id);
      setActiveFeatureIndex(0);
      setActiveSide('obverse');
      setAngle360(0);
      setIsAutoRotating(false);
    }
  };

  const handleSelectNote = (note: BanknoteModel) => {
    sound.playPaperFlick();
    setSelectedNoteId(note.id);
    setActiveFeatureIndex(0);
    setActiveSide('obverse');
    setAngle360(0);
  };

  const handleNextFeature = () => {
    sound.playLoupeClick();
    setActiveFeatureIndex((prev) => (prev + 1) % activeFeatures.length);
  };

  const handlePrevFeature = () => {
    sound.playLoupeClick();
    setActiveFeatureIndex((prev) => (prev - 1 + activeFeatures.length) % activeFeatures.length);
  };

  const handleToggleSide = () => {
    sound.playPaperFlick();
    const nextSide = activeSide === 'obverse' ? 'reverse' : 'obverse';
    setActiveSide(nextSide);
    setActiveFeatureIndex(0);
  };

  const displayedImage = activeSide === 'obverse' ? currentNote.obverseImage : currentNote.reverseImage;

  // Determine which side is facing user in 360 view
  const currentFace360 = angle360 >= 90 && angle360 <= 270 ? 'Reverse (Back)' : 'Obverse (Front)';

  return (
    <div className="banknote-studio-root">
      {/* Studio Header & Series Switcher */}
      <section className="studio-hero">
        <div className="studio-eyebrow">
          <Shield size={14} className="text-amber-400" />
          <span>RESERVE BANK OF INDIA · CURRENCY INTEGRITY & ARCHIVE</span>
        </div>
        <h1 className="studio-title">Interactive Banknote Studio</h1>
        <p className="studio-subtitle">
          Explore official security features, micro-inscriptions, optically variable inks, and artistic motifs
          across modern Republic of India banknote series.
        </p>

        {/* Series Selection Buttons */}
        <div className="series-tabs-container">
          {BANKNOTE_SERIES.map((series) => (
            <button
              key={series}
              type="button"
              onClick={() => handleSelectSeries(series)}
              className={`series-tab-btn ${selectedSeries === series ? 'active' : ''}`}
            >
              <span>{series}</span>
              {selectedSeries === series && <CheckCircle2 size={14} className="inline ml-1.5" />}
            </button>
          ))}
        </div>
      </section>

      {/* Banknote Denomination Ribbon */}
      <section className="banknote-ribbon-section">
        <div className="ribbon-header">
          <span className="ribbon-label">EXPLORE BANKNOTES IN THIS SERIES:</span>
          <span className="ribbon-tip">Select a note to inspect tactile intaglio, watermarks, and 360° security</span>
        </div>
        <div className="banknote-ribbon">
          {seriesNotes.map((note) => {
            const isSelected = note.id === currentNote.id;
            return (
              <button
                key={note.id}
                type="button"
                onClick={() => handleSelectNote(note)}
                className={`note-pill-card ${isSelected ? 'active' : ''}`}
                style={{
                  borderColor: isSelected ? note.accent : undefined
                }}
              >
                <div className="note-pill-thumb">
                  <img
                    src={note.obverseImage}
                    alt={note.denomination}
                    loading="lazy"
                    className="note-thumb-img"
                  />
                </div>
                <div className="note-pill-meta">
                  <span className="note-pill-denom" style={{ color: isSelected ? note.accent : undefined }}>
                    {note.denomination}
                  </span>
                  <span className="note-pill-color">{note.color}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Banknote Overview Banner with 360° Interactive Rotator */}
      <section className="banknote-overview-panel">
        <div className="overview-grid">
          {/* Left: Interactive 360° Note Turntable */}
          <div className="overview-visual-col">
            <div className="turntable-header">
              <span className="turntable-title">
                <MoveHorizontal size={14} className="text-amber-400" />
                <span>360° Interactive 3D Turntable</span>
              </span>
              <span className="turntable-angle-pill">
                {currentFace360} · {Math.round(angle360)}°
              </span>
            </div>

            {/* 3D Turntable Container with Continuous Drag & Touch Rotation */}
            <div
              className={`studio-3d-turntable-stage ${isDragging ? 'is-dragging' : ''}`}
              ref={turntableRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              title="Click and drag horizontally to spin the note 360° in 3D"
            >
              <div
                className="banknote-card-3d"
                style={{
                  transform: `perspective(1200px) rotateY(${angle360}deg)`
                }}
              >
                {/* Front Face (Obverse) */}
                <div className="banknote-face banknote-front">
                  <img
                    src={currentNote.obverseImage}
                    alt={`${currentNote.denomination} Obverse`}
                    className="banknote-face-img"
                    draggable={false}
                  />
                  <div
                    className="banknote-sheen"
                    style={{
                      transform: `translateX(${((angle360 % 360) - 180) * 1.5}%)`
                    }}
                  />
                </div>

                {/* Back Face (Reverse) */}
                <div className="banknote-face banknote-back">
                  <img
                    src={currentNote.reverseImage}
                    alt={`${currentNote.denomination} Reverse`}
                    className="banknote-face-img"
                    draggable={false}
                  />
                  <div
                    className="banknote-sheen"
                    style={{
                      transform: `translateX(${(((angle360 + 180) % 360) - 180) * 1.5}%)`
                    }}
                  />
                </div>
              </div>

              <div className="turntable-drag-hint">
                <MoveHorizontal size={13} />
                <span>Drag horizontally to rotate 360°</span>
              </div>
            </div>

            {/* 360° Rotator Controls Toolbar */}
            <div className="turntable-controls-bar">
              {/* Scrub range slider */}
              <div className="turntable-slider-wrap">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={Math.round(angle360)}
                  onChange={(e) => {
                    setIsAutoRotating(false);
                    setAngle360(Number(e.target.value));
                  }}
                  className="turntable-range-slider"
                  aria-label="Rotate banknote 360 degrees"
                />
              </div>

              <div className="turntable-btn-group">
                {/* Auto Rotate Play / Pause */}
                <button
                  type="button"
                  onClick={handleToggleAutoRotate}
                  className={`turntable-btn ${isAutoRotating ? 'active' : ''}`}
                  title={isAutoRotating ? 'Pause 360° spin' : 'Start auto 360° spin'}
                >
                  {isAutoRotating ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isAutoRotating ? 'Pause' : 'Auto 360°'}</span>
                </button>

                {/* Flip 180 Front / Back */}
                <button
                  type="button"
                  onClick={handleFlip180}
                  className="turntable-btn"
                  title="Flip between Obverse (0°) and Reverse (180°)"
                >
                  <RotateCw size={13} />
                  <span>Flip 180°</span>
                </button>

                {/* Reset to 0 Front */}
                <button
                  type="button"
                  onClick={handleResetAngle}
                  className="turntable-btn icon-only"
                  title="Reset to 0° Front"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>

            <div className="studio-stage-actions">
              <span className="studio-series-pill">
                {currentNote.series} · Issued {currentNote.year}
              </span>
            </div>
          </div>

          {/* Right: Technical Specs & Theme Narrative */}
          <div className="overview-info-col">
            <div className="overview-denom-header">
              <h2 className="overview-denom-title" style={{ color: currentNote.accent }}>
                {currentNote.denomination}
              </h2>
              <span className="overview-year-badge">{currentNote.year} CE</span>
            </div>

            <div className="overview-motif-card">
              <h3 className="motif-title">{currentNote.motifTitle}</h3>
              <p className="motif-description">{currentNote.motifDescription}</p>
            </div>

            <div className="studio-specs-table">
              <div className="spec-row">
                <span className="spec-label">Year of Issue</span>
                <span className="spec-value">{currentNote.year}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Size (Dimensions)</span>
                <span className="spec-value">{currentNote.dimensions}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Base Color</span>
                <span className="spec-value">
                  <span className="color-dot" style={{ backgroundColor: currentNote.accent }} />
                  {currentNote.color}
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Substrate Material</span>
                <span className="spec-value">100% Cotton Rag Paper with Intaglio Relief & Fluorescent Fibers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Inspector Section */}
      <section className="feature-inspector-section">
        {/* Inspection Mode Segmented Buttons */}
        <div className="feature-mode-controls">
          <div className="mode-toggle-group">
            <button
              type="button"
              onClick={() => {
                sound.playLoupeClick();
                setFeatureMode('design');
                setActiveFeatureIndex(0);
              }}
              className={`mode-btn ${featureMode === 'design' ? 'active-gold' : ''}`}
            >
              <Palette size={15} />
              <span>DESIGN FEATURES</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playLoupeClick();
                setFeatureMode('security');
                setActiveFeatureIndex(0);
              }}
              className={`mode-btn ${featureMode === 'security' ? 'active-gold' : ''}`}
            >
              <Shield size={15} />
              <span>SECURITY FEATURES</span>
            </button>
          </div>

          <p className="inspector-instruction">
            Get to know authentic {featureMode} features by selecting pins on the note or using the navigator below.
          </p>
        </div>

        {/* Feature Inspector Dual Stage */}
        <div className="inspector-stage-layout">
          {/* Left Feature Card with Zoomed Crop View & Animated GIF Support */}
          <div className="feature-card-col">
            <div className="feature-detail-card">
              <div className="feature-card-top">
                <span className="feature-large-num">{activeFeature?.num || '01'}</span>
                <span className="feature-mode-badge">{featureMode.toUpperCase()}</span>
              </div>

              {/* High-Resolution Spatial Crop Simulation with Animated GIF Support */}
              <div className="feature-crop-box">
                {/* Optional Animated Inspection GIF */}
                {activeFeature?.gifUrl && (
                  <img
                    src={activeFeature.gifUrl}
                    alt={activeFeature.title}
                    className={`feature-gif-img ${isGifLoaded ? 'is-visible' : 'is-hidden'}`}
                    onLoad={() => setIsGifLoaded(true)}
                    onError={() => setIsGifLoaded(false)}
                  />
                )}

                {/* Spatial Crop Canvas (Default / Fallback) */}
                <div
                  className={`feature-crop-canvas ${isGifLoaded ? 'has-gif-overlay' : ''}`}
                  style={{
                    backgroundImage: `url(${displayedImage})`,
                    backgroundPosition: `${activeFeature?.coordinates.x || 50}% ${activeFeature?.coordinates.y || 50}%`,
                    backgroundSize: '420%'
                  }}
                />
                
                <div className="crop-reticle" />

                {isGifLoaded ? (
                  <span className="crop-zoom-tag active-gif-tag">
                    <Film size={11} className="inline mr-1 text-emerald-400" />
                    ANIMATED INSPECTION
                  </span>
                ) : (
                  <span className="crop-zoom-tag">
                    3.5x ZOOM
                  </span>
                )}
              </div>

              <h4 className="feature-detail-title">{activeFeature?.title}</h4>
              <p className="feature-detail-text">{activeFeature?.description}</p>

              {/* Navigator Bottom Bar */}
              <div className="feature-nav-bar">
                <span className="feature-step-count">
                  {activeFeature?.num || '01'} / {String(activeFeatures.length).padStart(2, '0')}
                </span>
                <div className="feature-nav-arrows">
                  <button
                    type="button"
                    onClick={handlePrevFeature}
                    className="feature-arrow-btn"
                    title="Previous feature"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextFeature}
                    className="feature-arrow-btn"
                    title="Next feature"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Banknote Canvas with Interactive Pin Markers */}
          <div className="banknote-canvas-col">
            <div className="interactive-banknote-container">
              <div className="canvas-wrapper">
                <img
                  src={displayedImage}
                  alt={`${currentNote.denomination} ${activeSide}`}
                  className="interactive-note-img"
                />

                {/* Spatial Pin Markers Overlay */}
                {activeFeatures.map((feat, idx) => {
                  const isActive = idx === activeFeatureIndex;
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => {
                        sound.playLoupeClick();
                        setActiveFeatureIndex(idx);
                      }}
                      className={`spatial-pin ${isActive ? 'active-pin' : ''}`}
                      style={{
                        left: `${feat.coordinates.x}%`,
                        top: `${feat.coordinates.y}%`
                      }}
                      title={`${feat.num}: ${feat.title}`}
                    >
                      <span className="pin-number">{feat.num}</span>
                      {isActive && <span className="pin-pulse-ring" />}
                    </button>
                  );
                })}
              </div>

              {/* Side Switcher (Front / Back) for Inspection */}
              <div className="canvas-side-toggle">
                <button
                  type="button"
                  onClick={handleToggleSide}
                  className="side-switch-btn"
                >
                  <RotateCw size={14} />
                  <span>
                    Inspect {activeSide === 'obverse' ? 'Reverse Features' : 'Obverse Features'}
                  </span>
                </button>
                <span className="canvas-side-label">
                  Showing: <strong>{activeSide === 'obverse' ? 'Obverse (Front)' : 'Reverse (Back)'}</strong>
                </span>
              </div>
            </div>

            {/* Bubble Thumbnail Selector Strip */}
            <div className="feature-bubble-strip">
              {activeFeatures.map((feat, idx) => {
                const isActive = idx === activeFeatureIndex;
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => {
                      sound.playLoupeClick();
                      setActiveFeatureIndex(idx);
                    }}
                    className={`feature-bubble-btn ${isActive ? 'active' : ''}`}
                    title={`${feat.num}: ${feat.title}`}
                  >
                    <div className="bubble-img-frame">
                      {feat.gifUrl ? (
                        <img
                          src={feat.gifUrl}
                          alt={feat.title}
                          className="bubble-gif-img"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                      <div
                        className="bubble-img"
                        style={{
                          backgroundImage: `url(${displayedImage})`,
                          backgroundPosition: `${feat.coordinates.x}% ${feat.coordinates.y}%`,
                          backgroundSize: '450%'
                        }}
                      />
                    </div>
                    <span className="bubble-num">{feat.num}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
