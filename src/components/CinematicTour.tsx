import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  X,
  RotateCcw,
  BookOpen,
  Coins,
  Scale,
  Shield,
  Users,
  Sparkles,
  Info,
  Check,
  Film,
  Layers,
  ArrowRight,
  Award
} from 'lucide-react';
import { CINEMATIC_ACTS, type CinematicAct } from '../data/cinematicData';
import { sound } from '../audio';

interface CinematicTourProps {
  isOpen: boolean;
  onClose: () => void;
  initialActIndex?: number;
  theme?: 'dark' | 'light';
}

// 4 Cinematic Scenes per Act
type SceneType = 0 | 1 | 2 | 3;
const SCENE_NAMES = [
  'Prologue & Decree',
  'Sovereign Artifact',
  'Crucible of Reform',
  'Legacy & Valuation'
];

export const CinematicTour: React.FC<CinematicTourProps> = ({
  isOpen,
  onClose,
  initialActIndex = 0,
  theme = 'dark'
}) => {
  const [currentActIndex, setCurrentActIndex] = useState<number>(initialActIndex);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<SceneType>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => sound.getMuted());
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [dossierTab, setDossierTab] = useState<'metallurgy' | 'purchasing' | 'iconography' | 'figures'>('metallurgy');
  const [sceneProgress, setSceneProgress] = useState<number>(0);
  const [isTourCompleted, setIsTourCompleted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const sceneStartTimeRef = useRef<number>(Date.now());
  const pausedElapsedRef = useRef<number>(0);

  // Prevent background scrollbar while tour is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const currentAct: CinematicAct = useMemo(() => {
    return CINEMATIC_ACTS[currentActIndex] || CINEMATIC_ACTS[0];
  }, [currentActIndex]);

  // Duration in milliseconds per scene beat
  const baseSceneDurations: number[] = [7000, 8500, 9000, 8500];
  const sceneDurationMs = useMemo(() => {
    return baseSceneDurations[currentSceneIndex] || 8000;
  }, [currentSceneIndex]);

  // Active specimen depending on the current scene
  const activeSpecimenImage = useMemo(() => {
    if (currentSceneIndex === 2 && currentAct.secondaryImages && currentAct.secondaryImages.length > 0) {
      return currentAct.secondaryImages[0].url;
    }
    return currentAct.heroImage;
  }, [currentSceneIndex, currentAct]);

  const activeSpecimenCaption = useMemo(() => {
    if (currentSceneIndex === 2 && currentAct.secondaryImages && currentAct.secondaryImages.length > 0) {
      return currentAct.secondaryImages[0].caption;
    }
    return currentAct.heroImageAlt;
  }, [currentSceneIndex, currentAct]);

  // Advance to next scene or next act
  const advanceScene = useCallback((direction: 'next' | 'prev' = 'next') => {
    sound.playFilmCut();
    setSceneProgress(0);
    pausedElapsedRef.current = 0;
    sceneStartTimeRef.current = Date.now();

    if (direction === 'next') {
      if (currentSceneIndex < 3) {
        setCurrentSceneIndex((prev) => (prev + 1) as SceneType);
      } else {
        // We are on Scene 3 of an Act
        if (currentActIndex < CINEMATIC_ACTS.length - 1) {
          // Advance to next Act
          setCurrentActIndex((prev) => prev + 1);
          setCurrentSceneIndex(0);
          sound.playCinematicBoom();
        } else {
          // Act VIII concluded! Show Grand Finale instead of looping back to Act I
          setIsTourCompleted(true);
          setIsPlaying(false);
          sound.playCinematicChime();
        }
      }
    } else {
      if (isTourCompleted) {
        setIsTourCompleted(false);
        setCurrentActIndex(CINEMATIC_ACTS.length - 1);
        setCurrentSceneIndex(3);
        return;
      }
      if (currentSceneIndex > 0) {
        setCurrentSceneIndex((prev) => (prev - 1) as SceneType);
      } else {
        if (currentActIndex > 0) {
          setCurrentActIndex((prev) => prev - 1);
          setCurrentSceneIndex(3);
          sound.playCinematicBoom();
        }
      }
    }
  }, [currentActIndex, currentSceneIndex, isTourCompleted]);

  // Jump to specific Act
  const jumpToAct = useCallback((actIdx: number) => {
    sound.playCinematicBoom();
    setIsTourCompleted(false);
    setCurrentActIndex(actIdx);
    setCurrentSceneIndex(0);
    setSceneProgress(0);
    pausedElapsedRef.current = 0;
    sceneStartTimeRef.current = Date.now();
  }, []);

  // Jump to specific scene in current act
  const jumpToScene = useCallback((sceneIdx: SceneType) => {
    sound.playFilmCut();
    setIsTourCompleted(false);
    setCurrentSceneIndex(sceneIdx);
    setSceneProgress(0);
    pausedElapsedRef.current = 0;
    sceneStartTimeRef.current = Date.now();
  }, []);

  // Restart tour from beginning
  const restartTour = useCallback(() => {
    sound.playCinematicBoom();
    setIsTourCompleted(false);
    setCurrentActIndex(0);
    setCurrentSceneIndex(0);
    setSceneProgress(0);
    pausedElapsedRef.current = 0;
    sceneStartTimeRef.current = Date.now();
    setIsPlaying(true);
  }, []);

  // Toggle Play / Pause
  const togglePlayPause = useCallback(() => {
    sound.playLoupeClick();
    setIsPlaying((prev) => {
      if (prev) {
        pausedElapsedRef.current += Date.now() - sceneStartTimeRef.current;
      } else {
        sceneStartTimeRef.current = Date.now();
      }
      return !prev;
    });
  }, []);

  // Audio mute
  const handleToggleMute = useCallback(() => {
    const muted = sound.toggleMute();
    setIsAudioMuted(muted);
  }, []);

  // Sound chime when modal opens
  useEffect(() => {
    if (isOpen) {
      sound.playCinematicBoom();
      sceneStartTimeRef.current = Date.now();
      pausedElapsedRef.current = 0;
      setSceneProgress(0);
      setIsTourCompleted(false);
    }
  }, [isOpen]);

  // Auto-play timer
  useEffect(() => {
    if (!isOpen || !isPlaying || isDossierOpen || isTourCompleted) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const tick = () => {
      const elapsed = pausedElapsedRef.current + (Date.now() - sceneStartTimeRef.current);
      const ratio = Math.min(1, elapsed / sceneDurationMs);
      setSceneProgress(ratio * 100);

      if (ratio >= 1) {
        advanceScene('next');
      } else {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isOpen, isPlaying, isDossierOpen, isTourCompleted, sceneDurationMs, advanceScene]);

  // Global Keyboard listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          advanceScene('next');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          advanceScene('prev');
          break;
        case 'Escape':
          e.preventDefault();
          if (isDossierOpen) {
            setIsDossierOpen(false);
          } else {
            onClose();
          }
          break;
        case 'd':
        case 'D':
          e.preventDefault();
          setIsDossierOpen((prev) => !prev);
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          handleToggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePlayPause, advanceScene, onClose, isDossierOpen, handleToggleMute]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="grand-cinema-stage"
      data-theme={theme}
      role="dialog"
      aria-modal="true"
      aria-label="History of Indian Currency: Chronicles of Sovereign Wealth"
    >
      {/* Dynamic Ambient Background */}
      <div className="cinema-celestial-canvas" style={{ '--act-accent': currentAct.accentColor } as React.CSSProperties} />
      <div className="cinema-anamorphic-vignette" />
      <div className="cinema-golden-embers" />

      {/* ================================================================= */}
      {/* 1. CLEAN & SIMPLE TOP CINEMA BAR */}
      {/* ================================================================= */}
      <header className="cinema-top-bar-clean">
        {/* Left: Minimal Series Brand & Current Act */}
        <div className="cinema-brand-compact">
          <Film size={15} className="text-amber-400 shrink-0" />
          <span className="cinema-title-text font-serif">Indian Currency</span>
          <span className="cinema-bullet">•</span>
          <span className="cinema-act-badge font-mono">{currentAct.actNumber}</span>
          <span className="cinema-act-era-pill hidden-on-mobile">{currentAct.era}</span>
        </div>

        {/* Center: Clean & Unobtrusive Scene Beat Pips */}
        {!isTourCompleted && (
          <div className="cinema-scene-indicator-clean">
            <span className="scene-label-mini font-mono">
              Beat {currentSceneIndex + 1}/4: <strong className="scene-name-bold">{SCENE_NAMES[currentSceneIndex]}</strong>
            </span>
            <div className="scene-pips-row">
              {[0, 1, 2, 3].map((sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => jumpToScene(sIdx as SceneType)}
                  className={`scene-pip ${sIdx === currentSceneIndex ? 'active' : ''} ${sIdx < currentSceneIndex ? 'passed' : ''}`}
                  title={`Scene ${sIdx + 1}: ${SCENE_NAMES[sIdx]}`}
                >
                  {sIdx === currentSceneIndex && (
                    <div className="pip-fill" style={{ width: `${sceneProgress}%` }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Right: Only Essential Controls (Dossier, Audio, Close) */}
        <div className="cinema-actions-compact">
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              setIsDossierOpen((prev) => !prev);
            }}
            className={`cinema-icon-btn ${isDossierOpen ? 'active' : ''}`}
            title="Toggle Historical Dossier (D)"
          >
            <BookOpen size={14} />
            <span className="text-xs hidden-on-mobile font-medium">Dossier</span>
          </button>

          <button
            type="button"
            onClick={handleToggleMute}
            className="cinema-icon-btn"
            title={isAudioMuted ? 'Unmute narration' : 'Mute narration'}
          >
            {isAudioMuted ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} className="text-emerald-400" />}
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              onClose();
            }}
            className="cinema-icon-btn close-btn"
            title="Exit Tour (Esc)"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. THEATRICAL CINEMA STAGE CONTENT */}
      {/* ================================================================= */}
      <main className="cinema-theater-screen">
        {/* GRAND FINALE SCREEN (When Act 8 finishes) */}
        {isTourCompleted ? (
          <div className="cinema-scene-pane scene-prologue animate-fade-in">
            <div className="prologue-cosmic-glow" style={{ backgroundColor: '#6366f1' }} />
            <div className="prologue-content-box">
              <div className="prologue-era-badge">
                <Award size={14} className="text-amber-400" />
                <span className="prologue-year-text font-mono">600 BCE — 2026+ CE</span>
                <span className="badge-bullet">•</span>
                <span className="prologue-era-label font-mono">2,500-YEAR ODYSSEY COMPLETE</span>
              </div>

              <h1 className="prologue-title">
                The Odyssey of the Rupee
              </h1>

              <p className="prologue-subtitle">
                From stamped silver Karshapanas along the Ganges to Sher Shah Suri’s 178-grain standard,
                the Paper Currency revolution, and the cryptographic Central Bank Digital Rupee (e₹)—the
                Rupee remains the sovereign pulse of India.
              </p>

              <div className="finale-stats-strip">
                <div className="finale-stat-item">
                  <span className="stat-big font-bold text-amber-300">8</span>
                  <span className="stat-sub font-mono text-xs">Historical Epochs</span>
                </div>
                <div className="strip-divider" />
                <div className="finale-stat-item">
                  <span className="stat-big font-bold text-amber-300">2,500+</span>
                  <span className="stat-sub font-mono text-xs">Years of Evolution</span>
                </div>
                <div className="strip-divider" />
                <div className="finale-stat-item">
                  <span className="stat-big font-bold text-amber-300">240+</span>
                  <span className="stat-sub font-mono text-xs">Verified Exhibits</span>
                </div>
              </div>

              <div className="prologue-action-row mt-4">
                <button
                  type="button"
                  onClick={restartTour}
                  className="prologue-enter-cta"
                >
                  <RotateCcw size={15} />
                  <span>Replay Odyssey from Act I</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('collection');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="prologue-enter-cta secondary-cta"
                >
                  <span>Explore 2,500-Year Archive</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* SCENE 0: PROLOGUE & IMPERIAL DECREE */}
            {currentSceneIndex === 0 && (
              <div key={`scene-0-${currentAct.id}`} className="cinema-scene-pane scene-prologue">
                <div className="prologue-cosmic-glow" style={{ backgroundColor: currentAct.accentColor }} />
                <div className="prologue-content-box">
                  <div className="prologue-era-badge animate-fade-down">
                    <span className="prologue-year-text font-mono tracking-widest">{currentAct.timeSpan}</span>
                    <span className="badge-bullet">•</span>
                    <span className="prologue-era-label font-mono">{currentAct.era}</span>
                  </div>

                  <h1 className="prologue-title animate-title-glow">
                    {currentAct.title}
                  </h1>

                  <p className="prologue-subtitle animate-fade-up">
                    {currentAct.subtitle}
                  </p>

                  {/* Royal Imperial Quote */}
                  <div className="prologue-quote-container animate-quote-reveal" style={{ borderColor: `${currentAct.accentColor}55` }}>
                    <div className="quote-mark-glow">“</div>
                    <p className="prologue-quote-text">
                      {currentAct.quote.text}
                    </p>
                    <div className="prologue-quote-citation">
                      <span className="citation-author font-semibold text-amber-300">{currentAct.quote.author}</span>
                      <span className="citation-context text-white/50 text-xs">— {currentAct.quote.context}</span>
                    </div>
                  </div>

                  <div className="prologue-action-row animate-fade-up-delay">
                    <button
                      type="button"
                      onClick={() => advanceScene('next')}
                      className="prologue-enter-cta"
                      style={{ borderColor: currentAct.accentColor }}
                    >
                      <span>Witness the Artifact</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 1: THE SOVEREIGN ARTIFACT & ORIGINS */}
            {currentSceneIndex === 1 && (
              <div key={`scene-1-${currentAct.id}`} className="cinema-scene-pane scene-artifact-theater">
                {/* 3D Floating Master Specimen */}
                <div className="artifact-master-frame">
                  <div className="artifact-backlight-cone" style={{ background: `radial-gradient(circle, ${currentAct.accentColor}44 0%, transparent 70%)` }} />
                  <div className="artifact-floating-card">
                    <img
                      src={activeSpecimenImage}
                      alt={activeSpecimenCaption}
                      className="artifact-zoom-image"
                    />
                    <div className="artifact-specular-sweep" />
                  </div>
                  <div className="artifact-caption-pill">
                    <Sparkles size={13} className="text-amber-400" />
                    <span className="caption-text font-mono text-xs">{activeSpecimenCaption}</span>
                  </div>
                </div>

                {/* Documentary Narration Beat 1 */}
                <div className="artifact-narrative-box">
                  <div className="narrative-beat-tag">
                    <span className="font-mono text-xs font-bold text-amber-300">ACT CHAPTER 1 • GENESIS</span>
                  </div>
                  <h2 className="narrative-beat-title">{currentAct.title}</h2>
                  <div className="narrative-divider" style={{ backgroundColor: currentAct.accentColor }} />

                  <p className="narrative-documentary-body">
                    {currentAct.narrativeChronicle[0]}
                  </p>

                  <div className="narrative-quick-badge">
                    <Coins size={14} className="text-amber-400" />
                    <span className="text-xs text-white/80 font-mono">
                      Base Standard: <strong className="text-amber-200">{currentAct.metallurgy.baseUnit}</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 2: THE CRUCIBLE OF POWER & REFORM */}
            {currentSceneIndex === 2 && (
              <div key={`scene-2-${currentAct.id}`} className="cinema-scene-pane scene-artifact-theater">
                {/* Secondary Specimen */}
                <div className="artifact-master-frame">
                  <div className="artifact-backlight-cone" style={{ background: `radial-gradient(circle, ${currentAct.accentColor}44 0%, transparent 70%)` }} />
                  <div className="artifact-floating-card">
                    <img
                      src={activeSpecimenImage}
                      alt={activeSpecimenCaption}
                      className="artifact-zoom-image secondary-pan"
                    />
                    <div className="artifact-specular-sweep" />
                  </div>
                  <div className="artifact-caption-pill">
                    <Layers size={13} className="text-amber-400" />
                    <span className="caption-text font-mono text-xs">{activeSpecimenCaption}</span>
                  </div>
                </div>

                {/* Documentary Narration Beat 2 */}
                <div className="artifact-narrative-box">
                  <div className="narrative-beat-tag">
                    <span className="font-mono text-xs font-bold text-amber-300">ACT CHAPTER 2 • CRUCIBLE OF REFORM</span>
                  </div>
                  <h2 className="narrative-beat-title">{currentAct.subtitle}</h2>
                  <div className="narrative-divider" style={{ backgroundColor: currentAct.accentColor }} />

                  <p className="narrative-documentary-body">
                    {currentAct.narrativeChronicle[1] || currentAct.narrativeChronicle[0]}
                  </p>

                  <div className="narrative-quick-badge">
                    <Shield size={14} className="text-indigo-400" />
                    <span className="text-xs text-white/80 font-mono">
                      Engineering: <strong className="text-indigo-200">{currentAct.metallurgy.composition}</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 3: LEGACY & PURCHASING POWER */}
            {currentSceneIndex === 3 && (
              <div key={`scene-3-${currentAct.id}`} className="cinema-scene-pane scene-legacy-theater">
                <div className="legacy-backdrop-illumination" style={{ background: `radial-gradient(circle at 50% 40%, ${currentAct.accentColor}25 0%, transparent 75%)` }} />

                <div className="legacy-container-card">
                  <div className="legacy-header-pill">
                    <Scale size={14} className="text-amber-400" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-200">
                      ACT CULMINATION • SOVEREIGN LEGACY & VALUE
                    </span>
                  </div>

                  <h2 className="legacy-main-title">{currentAct.title}</h2>

                  {/* Narrative Culmination */}
                  <p className="legacy-culmination-text">
                    {currentAct.narrativeChronicle[2] || currentAct.narrativeChronicle[0]}
                  </p>

                  {/* Purchasing Power Centerpiece */}
                  <div className="legacy-purchasing-strip">
                    <div className="strip-unit-box">
                      <span className="strip-label font-mono">Standard Currency Unit</span>
                      <span className="strip-val font-bold text-amber-300">{currentAct.purchasingPower.standardUnit}</span>
                    </div>

                    <div className="strip-divider" />

                    <div className="strip-historical-box">
                      <span className="strip-label font-mono">Real Historical Goods</span>
                      <span className="strip-desc">{currentAct.purchasingPower.historicalEquivalent}</span>
                    </div>

                    <div className="strip-divider" />

                    <div className="strip-contemporary-box">
                      <span className="strip-label font-mono">Modern Valuation Context</span>
                      <span className="strip-desc text-amber-200/90">{currentAct.purchasingPower.contemporaryContext}</span>
                    </div>
                  </div>

                  {/* Enduring Sovereign Imprint */}
                  <div className="legacy-imprint-card" style={{ borderColor: currentAct.accentColor }}>
                    <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <p className="imprint-quote font-serif italic text-amber-100/95">
                      "{currentAct.legacyNote}"
                    </p>
                  </div>

                  {/* Next Act Prompt / Finale trigger */}
                  <div className="legacy-action-row">
                    <button
                      type="button"
                      onClick={() => advanceScene('next')}
                      className="prologue-enter-cta next-act-cta"
                      style={{ borderColor: currentAct.accentColor }}
                    >
                      <span>
                        {currentActIndex === CINEMATIC_ACTS.length - 1
                          ? 'Conclude 2,500-Year Odyssey'
                          : 'Advance to Next Historical Era'}
                      </span>
                      {currentActIndex === CINEMATIC_ACTS.length - 1 ? <Check size={16} /> : <ChevronRight size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* ================================================================= */}
      {/* 3. HISTORICAL DOSSIER DRAWER (On-Demand Deep Spec Inspection) */}
      {/* ================================================================= */}
      {isDossierOpen && (
        <aside className="cinema-dossier-drawer animate-slide-in">
          <div className="dossier-header">
            <div className="dossier-title-row">
              <BookOpen size={16} className="text-amber-400" />
              <span className="font-bold text-sm text-amber-200 uppercase tracking-wider font-mono">
                {currentAct.actNumber} HISTORICAL DOSSIER
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDossierOpen(false)}
              className="dossier-close-btn"
              title="Close Dossier (Esc)"
            >
              <X size={16} />
            </button>
          </div>

          {/* Dossier Tabs */}
          <div className="dossier-tabs-row">
            <button
              type="button"
              onClick={() => {
                sound.playLoupeClick();
                setDossierTab('metallurgy');
              }}
              className={`dossier-tab-pill ${dossierTab === 'metallurgy' ? 'active' : ''}`}
            >
              <Coins size={12} />
              <span>Metallurgy</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playLoupeClick();
                setDossierTab('purchasing');
              }}
              className={`dossier-tab-pill ${dossierTab === 'purchasing' ? 'active' : ''}`}
            >
              <Scale size={12} />
              <span>Purchasing</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playLoupeClick();
                setDossierTab('iconography');
              }}
              className={`dossier-tab-pill ${dossierTab === 'iconography' ? 'active' : ''}`}
            >
              <Shield size={12} />
              <span>Iconography</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playLoupeClick();
                setDossierTab('figures');
              }}
              className={`dossier-tab-pill ${dossierTab === 'figures' ? 'active' : ''}`}
            >
              <Users size={12} />
              <span>Key Figures</span>
            </button>
          </div>

          <div className="dossier-body">
            {dossierTab === 'metallurgy' && (
              <div className="dossier-pane">
                <div className="dossier-card">
                  <span className="dossier-label">Base Monetary Unit</span>
                  <p className="dossier-val text-amber-300 font-bold">{currentAct.metallurgy.baseUnit}</p>
                </div>
                <div className="dossier-card">
                  <span className="dossier-label">Subdivisions & Fractions</span>
                  <p className="dossier-val">{currentAct.metallurgy.subdivisions}</p>
                </div>
                <div className="dossier-card">
                  <span className="dossier-label">Metallurgical Composition</span>
                  <p className="dossier-val text-indigo-300">{currentAct.metallurgy.composition}</p>
                </div>
                <div className="dossier-card">
                  <span className="dossier-label">Minting & Engineering Method</span>
                  <p className="dossier-val">{currentAct.metallurgy.mintingMethod}</p>
                </div>
              </div>
            )}

            {dossierTab === 'purchasing' && (
              <div className="dossier-pane">
                <div className="dossier-card border-amber-500/40">
                  <span className="dossier-label">Standard Benchmark</span>
                  <p className="dossier-val text-amber-400 font-bold">{currentAct.purchasingPower.standardUnit}</p>
                </div>
                <div className="dossier-card">
                  <span className="dossier-label">Historical Purchasing Power</span>
                  <p className="dossier-val text-white/90">{currentAct.purchasingPower.historicalEquivalent}</p>
                </div>
                <div className="dossier-card">
                  <span className="dossier-label">Modern Equivalent Context</span>
                  <p className="dossier-val text-amber-200/90">{currentAct.purchasingPower.contemporaryContext}</p>
                </div>
              </div>
            )}

            {dossierTab === 'iconography' && (
              <div className="dossier-pane">
                {currentAct.iconography.map((ico, idx) => (
                  <div key={idx} className="dossier-card">
                    <span className="dossier-label text-amber-300 font-bold flex items-center gap-1.5">
                      <Sparkles size={12} className="text-amber-400 inline" />
                      {ico.symbol}
                    </span>
                    <p className="dossier-val text-xs text-white/80 mt-1">{ico.description}</p>
                  </div>
                ))}
              </div>
            )}

            {dossierTab === 'figures' && (
              <div className="dossier-pane">
                {currentAct.keyFigures.map((fig, idx) => (
                  <div key={idx} className="dossier-card flex items-start gap-2">
                    <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <p className="dossier-val text-sm text-white/90">{fig}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      )}

      {/* ================================================================= */}
      {/* 4. CLEAN & SIMPLE TIMELINE FOOTER */}
      {/* ================================================================= */}
      <footer className="cinema-clean-footer">
        {/* Minimal Timeline Ribbon */}
        <div className="cinema-timeline-track">
          <div className="timeline-rail-line" />
          <div className="timeline-markers-row">
            {CINEMATIC_ACTS.map((act, idx) => {
              const isActive = idx === currentActIndex && !isTourCompleted;
              const isPast = idx < currentActIndex || isTourCompleted;

              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => jumpToAct(idx)}
                  className={`timeline-act-node ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  title={`${act.actNumber}: ${act.title} (${act.era})`}
                >
                  <span
                    className="node-dot"
                    style={{ backgroundColor: isActive ? act.accentColor : undefined }}
                  />
                  <span className="node-text font-mono">
                    {act.actNumber.replace('ACT ', '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Control Row */}
        <div className="cinema-footer-controls-row">
          <div className="footer-title-hint font-mono text-xs">
            <span className="text-amber-400 font-bold">{currentAct.actNumber}</span>
            <span className="text-white/40"> — </span>
            <span className="text-white/90 font-sans">{currentAct.title}</span>
            <span className="text-white/40 text-[11px] ml-1.5 hidden-on-mobile">({currentAct.timeSpan})</span>
          </div>

          {/* Centered Playback Controls */}
          <div className="footer-playback-cluster">
            <button
              type="button"
              onClick={() => advanceScene('prev')}
              disabled={currentActIndex === 0 && currentSceneIndex === 0 && !isTourCompleted}
              className="footer-ctrl-btn secondary"
              title="Previous Scene (Left Arrow)"
              aria-label="Previous Scene"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={togglePlayPause}
              disabled={isTourCompleted}
              className="footer-ctrl-btn play-pause-master"
              title={isPlaying ? 'Pause Auto-Advance (Space)' : 'Play Auto-Advance (Space)'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={16} className="fill-current" /> : <Play size={16} className="fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => advanceScene('next')}
              disabled={isTourCompleted}
              className="footer-ctrl-btn secondary"
              title="Next Scene (Right Arrow)"
              aria-label="Next Scene"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="footer-shortcut-hint font-mono text-xs text-white/40 hidden-on-mobile">
            Space: Pause • Esc: Exit
          </div>
        </div>
      </footer>
    </div>
  );
};
