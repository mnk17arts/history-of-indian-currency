import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { 
  ArrowUp, 
  X, 
  Sparkles, 
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  BookOpen
} from 'lucide-react';
import { CINEMATIC_ACTS } from '../../data/cinematicData';
import { HeroExperience } from './HeroExperience';
import { ActOneCinematic } from './ActOneCinematic';
import { EraSection } from './EraSection';
import { MuseumTimelineRail } from './MuseumTimelineRail';
import { sound } from '../../audio';

export interface LightboxSpecimenData {
  url: string;
  reverseUrl?: string;
  title: string;
  era?: string;
  caption?: string;
}

// Progressive feature-level lazy loading for subsequent Acts
const ActTwoCinematic = lazy(() => import('./ActTwoCinematic').then(m => ({ default: m.ActTwoCinematic })));
const ActThreeCinematic = lazy(() => import('./ActThreeCinematic').then(m => ({ default: m.ActThreeCinematic })));
const ActFourCinematic = lazy(() => import('./ActFourCinematic').then(m => ({ default: m.ActFourCinematic })));
const ActFiveCinematic = lazy(() => import('./ActFiveCinematic').then(m => ({ default: m.ActFiveCinematic })));
const ActSixCinematic = lazy(() => import('./ActSixCinematic').then(m => ({ default: m.ActSixCinematic })));
const ActSevenCinematic = lazy(() => import('./ActSevenCinematic').then(m => ({ default: m.ActSevenCinematic })));
const ActEightCinematic = lazy(() => import('./ActEightCinematic').then(m => ({ default: m.ActEightCinematic })));
const GrandFinaleEnding = lazy(() => import('./GrandFinaleEnding').then(m => ({ default: m.GrandFinaleEnding })));

interface MuseumStageProps {
  onExitMuseum?: () => void;
  onNavigateToBanknotes?: () => void;
}

export const MuseumStage: React.FC<MuseumStageProps> = ({ 
  onExitMuseum, 
}) => {
  const [activeEraId, setActiveEraId] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [lightboxSpecimen, setLightboxSpecimen] = useState<LightboxSpecimenData | null>(null);
  const [lightboxSide, setLightboxSide] = useState<'obverse' | 'reverse'>('obverse');
  const [lightboxZoom, setLightboxZoom] = useState<number>(1.0);
  const [lightboxPan, setLightboxPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isLightboxDragging, setIsLightboxDragging] = useState<boolean>(false);
  const lightboxDragRef = useRef<{ startX: number; startY: number; panX: number; panY: number }>({
    startX: 0,
    startY: 0,
    panX: 0,
    panY: 0
  });
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [showScrollHelper, setShowScrollHelper] = useState<boolean>(true);

  const handleOpenLightbox = (
    urlOrData: string | LightboxSpecimenData,
    title?: string,
    reverseUrl?: string,
    era?: string,
    caption?: string
  ) => {
    sound.playClick();
    if (typeof urlOrData === 'string') {
      setLightboxSpecimen({
        url: urlOrData,
        title: title || 'Numismatic Specimen',
        reverseUrl,
        era,
        caption
      });
    } else {
      setLightboxSpecimen(urlOrData);
    }
    setLightboxSide('obverse');
    setLightboxZoom(1.0);
    setLightboxPan({ x: 0, y: 0 });
  };

  const handleCloseLightbox = () => {
    sound.playClick();
    setLightboxSpecimen(null);
    setLightboxZoom(1.0);
    setLightboxPan({ x: 0, y: 0 });
  };

  const handleToggleLightboxSide = () => {
    sound.playClick();
    setLightboxSide(prev => prev === 'obverse' ? 'reverse' : 'obverse');
  };

  const handleLightboxZoomIn = () => {
    sound.playClick();
    setLightboxZoom(prev => Math.min(3.0, +(prev + 0.5).toFixed(1)));
  };

  const handleLightboxZoomOut = () => {
    sound.playClick();
    setLightboxZoom(prev => {
      const next = Math.max(1.0, +(prev - 0.5).toFixed(1));
      if (next === 1.0) setLightboxPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleLightboxZoomReset = () => {
    sound.playClick();
    setLightboxZoom(1.0);
    setLightboxPan({ x: 0, y: 0 });
  };

  const handleLightboxPointerDown = (e: React.PointerEvent) => {
    if (lightboxZoom <= 1.0) return;
    setIsLightboxDragging(true);
    lightboxDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: lightboxPan.x,
      panY: lightboxPan.y
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleLightboxPointerMove = (e: React.PointerEvent) => {
    if (!isLightboxDragging || lightboxZoom <= 1.0) return;
    const dx = e.clientX - lightboxDragRef.current.startX;
    const dy = e.clientY - lightboxDragRef.current.startY;
    const maxPan = 220 * (lightboxZoom - 1);
    setLightboxPan({
      x: Math.max(-maxPan, Math.min(maxPan, lightboxDragRef.current.panX + dx)),
      y: Math.max(-maxPan, Math.min(maxPan, lightboxDragRef.current.panY + dy))
    });
  };

  const handleLightboxPointerUp = (e: React.PointerEvent) => {
    if (isLightboxDragging) {
      setIsLightboxDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Scroll to era section
  const handleScrollToEra = (eraId: string) => {
    const element = document.getElementById(eraId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to next era on chevron click (fixed: never skip Act I from landing page)
  const handleScrollToNext = () => {
    sound.playClick();
    const scrollY = window.scrollY;
    
    // When on Landing Page, ALWAYS navigate directly to Act I
    if (scrollY < 350 || activeEraId === 'hero') {
      handleScrollToEra(CINEMATIC_ACTS[0].id);
      return;
    }

    const currentIdx = CINEMATIC_ACTS.findIndex(a => a.id === activeEraId);
    if (currentIdx >= 0 && currentIdx < CINEMATIC_ACTS.length - 1) {
      handleScrollToEra(CINEMATIC_ACTS[currentIdx + 1].id);
    } else if (currentIdx === CINEMATIC_ACTS.length - 1) {
      const finale = document.querySelector('.museum-finale-section');
      if (finale) {
        finale.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      handleScrollToEra(CINEMATIC_ACTS[0].id);
    }
  };

  // Scroll to hero
  const handleScrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Track scroll position to update active era, progress rail, and scroll helper visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollY > 600);

      // Hide scroll helper when reaching near bottom (footer area)
      const isNearBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 180;
      setShowScrollHelper(!isNearBottom);

      // Determine active era based on section positions
      if (scrollY < 350) {
        setActiveEraId('hero');
      } else {
        for (let i = CINEMATIC_ACTS.length - 1; i >= 0; i--) {
          const act = CINEMATIC_ACTS[i];
          const elem = document.getElementById(act.id);
          if (elem) {
            const rect = elem.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45) {
              setActiveEraId(act.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="museum-experience-root">
      
      {/* Hero 3D WebGL Atrium (Pure Black Void, Single Coin, Scroll to Begin) */}
      <HeroExperience 
        onBeginJourney={() => handleScrollToEra(CINEMATIC_ACTS[0].id)}
        isAudioMuted={sound.getMuted()}
        onToggleMute={() => sound.toggleMute()}
      />

      {/* Main Continuous Museum Exhibition Floors (Acts 1 through 8) */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#070709' }} />}>
          {CINEMATIC_ACTS.map((act, index) => {
            const nextAct = index < CINEMATIC_ACTS.length - 1 ? {
              id: CINEMATIC_ACTS[index + 1].id,
              era: CINEMATIC_ACTS[index + 1].era,
              actNumber: CINEMATIC_ACTS[index + 1].actNumber
            } : undefined;

            // For Act I: Render the dedicated full-screen ActOneCinematic component
            if (act.id === 'act-1-ancient') {
              return (
                <ActOneCinematic
                  key={act.id}
                  onSelectSpecimenImage={handleOpenLightbox}
                  onNavigateToNextAct={handleScrollToEra}
                />
              );
            }

            // For Act II: Render the dedicated full-screen ActTwoCinematic component
            if (act.id === 'act-2-medieval') {
              return (
                <ActTwoCinematic
                  key={act.id}
                  onSelectSpecimenImage={handleOpenLightbox}
                  onNavigateToNextAct={handleScrollToEra}
                />
              );
            }

            // For Act III: Render the dedicated full-screen ActThreeCinematic component
            if (act.id === 'act-3-colonial') {
              return (
                <ActThreeCinematic
                  key={act.id}
                  onSelectSpecimenImage={handleOpenLightbox}
                  onNavigateToNextAct={handleScrollToEra}
                />
              );
            }

            // For Act IV: Render the dedicated full-screen ActFourCinematic component
            if (act.id === 'act-4-pre-independence') {
              return (
                <ActFourCinematic
                  key={act.id}
                  onSelectSpecimenImage={handleOpenLightbox}
                  onNavigateToNextAct={handleScrollToEra}
                />
              );
            }

            // For Act V: Render the dedicated full-screen ActFiveCinematic component
            if (act.id === 'act-5-early-republic') {
              return (
                <ActFiveCinematic
                  key={act.id}
                  onSelectSpecimenImage={handleOpenLightbox}
                  onNavigateToNextAct={handleScrollToEra}
                />
              );
            }

            // For Act VI: Render the dedicated full-screen ActSixCinematic component
            if (act.id === 'act-6-decimal') {
              return (
                <ActSixCinematic
                  key={act.id}
                  onSelectSpecimenImage={handleOpenLightbox}
                  onNavigateToNextAct={handleScrollToEra}
                />
              );
            }

            // For Act VII: Render the dedicated full-screen ActSevenCinematic component
            if (act.id === 'act-7-modern') {
              return (
                <ActSevenCinematic
                  key={act.id}
                  onSelectSpecimenImage={handleOpenLightbox}
                  onNavigateToNextAct={handleScrollToEra}
                />
              );
            }

            // For Act VIII: Render the dedicated full-screen ActEightCinematic component
            if (act.id === 'act-8-digital') {
              return (
                <ActEightCinematic
                  key={act.id}
                  onSelectSpecimenImage={handleOpenLightbox}
                  onNavigateToNextAct={handleScrollToEra}
                />
              );
            }

            // Fallback for any unexpected era
            return (
              <EraSection
                key={act.id}
                act={act}
                index={index}
                totalActs={CINEMATIC_ACTS.length}
                onSelectSpecimenImage={handleOpenLightbox}
                nextAct={nextAct}
                onNavigateToNextAct={handleScrollToEra}
              />
            );
          })}

          {/* Contemplative Grand Finale Floor */}
          <GrandFinaleEnding 
            onRevisitOdyssey={handleScrollToTop}
            onExitMuseum={onExitMuseum}
          />
        </Suspense>
      </main>

      {/* Persistent Chronological Timeline Rail */}
      <MuseumTimelineRail 
        items={CINEMATIC_ACTS.map(a => ({
          id: a.id,
          actNumber: a.actNumber,
          title: a.title,
          era: a.era,
          timeSpan: a.timeSpan,
          accentColor: a.accentColor
        }))}
        activeId={activeEraId}
        onSelect={handleScrollToEra}
        scrollProgressPct={scrollProgress}
      />

      {/* Persistent Floating 4-Chevron Animated Scroll Helper */}
      {showScrollHelper && (
        <button
          type="button"
          onClick={handleScrollToNext}
          className="museum-floating-scroll-helper"
          title="Scroll down to next historical era"
          aria-label="Scroll down to next historical era"
        >
          <div className="museum-chevron-column">
            <svg className="museum-chevron-svg" viewBox="0 0 24 12">
              <path d="M4 2 L12 10 L20 2" />
            </svg>
            <svg className="museum-chevron-svg" viewBox="0 0 24 12">
              <path d="M4 2 L12 10 L20 2" />
            </svg>
            <svg className="museum-chevron-svg" viewBox="0 0 24 12">
              <path d="M4 2 L12 10 L20 2" />
            </svg>
            <svg className="museum-chevron-svg" viewBox="0 0 24 12">
              <path d="M4 2 L12 10 L20 2" />
            </svg>
          </div>
        </button>
      )}

      {/* Quick Back-to-Top Floating Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={handleScrollToTop}
          style={{
            position: 'fixed',
            bottom: '56px',
            right: '24px',
            zIndex: 40,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(10, 10, 15, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease'
          }}
          title="Return to top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* High-Resolution Artifact Lightbox Modal with OBS/REV Toggle & Deep Zoom */}
      {lightboxSpecimen && (() => {
        const hasReverse = Boolean(lightboxSpecimen.reverseUrl && lightboxSpecimen.reverseUrl !== lightboxSpecimen.url);
        const activeImageUrl = lightboxSide === 'reverse' && hasReverse && lightboxSpecimen.reverseUrl
          ? lightboxSpecimen.reverseUrl
          : lightboxSpecimen.url;
        const activeSideBadge = lightboxSide === 'reverse' && hasReverse ? 'REVERSE (REV)' : 'OBVERSE (OBS)';

        return (
          <div 
            className="museum-lightbox-overlay"
            onClick={handleCloseLightbox}
          >
            <div 
              className="museum-lightbox-card"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Top Control Bar */}
              <div className="museum-lightbox-toolbar">
                <div className="museum-lightbox-side-actions">
                  {hasReverse ? (
                    <button
                      type="button"
                      onClick={handleToggleLightboxSide}
                      className="museum-lightbox-flip-btn"
                      title={`Flip between Obverse and Reverse (Current: ${activeSideBadge})`}
                    >
                      <RotateCw size={13} className={lightboxSide === 'reverse' ? 'museum-flip-icon-rev' : ''} />
                      <span>{lightboxSide === 'obverse' ? 'View Reverse (REV)' : 'View Obverse (OBS)'}</span>
                    </button>
                  ) : (
                    <span className="museum-lightbox-uniface-pill">
                      Sovereign Uniface Specimen
                    </span>
                  )}
                  <span className="museum-lightbox-current-side-tag">
                    {activeSideBadge}
                  </span>
                </div>

                {/* Zoom & Pan Dock */}
                <div className="museum-lightbox-zoom-dock">
                  <button
                    type="button"
                    onClick={handleLightboxZoomOut}
                    disabled={lightboxZoom <= 1.0}
                    title="Zoom Out (-)"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut size={13} />
                  </button>
                  <span className="museum-lightbox-zoom-readout">
                    {Math.round(lightboxZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={handleLightboxZoomIn}
                    disabled={lightboxZoom >= 3.0}
                    title="Zoom In (+)"
                    aria-label="Zoom In"
                  >
                    <ZoomIn size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={handleLightboxZoomReset}
                    title="Reset Zoom & Pan (100%)"
                    aria-label="Reset Zoom"
                  >
                    <RotateCcw size={12} />
                  </button>
                  <div className="museum-lightbox-divider" />
                  <button
                    type="button"
                    onClick={handleCloseLightbox}
                    className="museum-lightbox-close-compact"
                    title="Close Lightbox"
                    aria-label="Close"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Viewport for image inspection with Drag-to-Pan */}
              <div 
                className="museum-lightbox-stage"
                style={{
                  cursor: lightboxZoom > 1.0 ? (isLightboxDragging ? 'grabbing' : 'grab') : 'default',
                  touchAction: lightboxZoom > 1.0 ? 'none' : 'auto'
                }}
                onPointerDown={handleLightboxPointerDown}
                onPointerMove={handleLightboxPointerMove}
                onPointerUp={handleLightboxPointerUp}
                onPointerCancel={handleLightboxPointerUp}
              >
                <img 
                  src={activeImageUrl} 
                  alt={`${lightboxSpecimen.title} (${activeSideBadge})`}
                  style={{
                    transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxZoom})`,
                    transformOrigin: 'center center',
                    transition: isLightboxDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="museum-lightbox-img"
                  draggable={false}
                />

                {/* Pan hint when zoomed */}
                {lightboxZoom > 1.0 && (
                  <div className="museum-lightbox-pan-hint">
                    <Move size={10} className="text-amber-400 animate-pulse" />
                    <span>Drag / swipe to pan microscopic numismatic details</span>
                  </div>
                )}
              </div>

              {/* Bottom Caption & Archival Provenance */}
              <div className="museum-lightbox-caption-box">
                {lightboxSpecimen.era && (
                  <div className="museum-lightbox-era-badge">
                    {lightboxSpecimen.era}
                  </div>
                )}
                <h4 className="museum-lightbox-title">
                  {lightboxSpecimen.title}
                </h4>
                {lightboxSpecimen.caption ? (
                  <p className="museum-lightbox-desc">
                    {lightboxSpecimen.caption}
                  </p>
                ) : (
                  <p className="museum-lightbox-desc">
                    High-Resolution Sovereign Numismatic Archive Scan • Front/Back Inspection
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
