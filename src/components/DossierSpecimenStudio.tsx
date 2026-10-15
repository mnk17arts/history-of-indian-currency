import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Search,
  Sun,
  Columns,
  Play,
  Pause,
  Eye,
  Sparkles,
  Repeat,
  Compass,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { CurrencyItem } from '../data';
import { sound } from '../audio';

interface Props {
  item: CurrencyItem;
  onClose?: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const DossierSpecimenStudio: React.FC<Props> = ({
  item,
  onNavigatePrev,
  onNavigateNext,
  currentIndex,
  totalCount
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBacklit, setIsBacklit] = useState(false);
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const [isDualPlate, setIsDualPlate] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [rotation, setRotation] = useState(0); // in degrees
  const [zoom, setZoom] = useState(1); // 0.8x to 4.5x
  const [pan, setPan] = useState({ x: 0, y: 0 }); // in px
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // percentages
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [imgNaturalRatio, setImgNaturalRatio] = useState<number>(1);
  const [hasError, setHasError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Reset state when switching specimen
  useEffect(() => {
    setIsFlipped(false);
    setIsBacklit(false);
    setIsLoupeActive(false);
    setIsDualPlate(false);
    setIsAutoRotating(false);
    setRotation(0);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setHasError(false);
  }, [item.id]);

  // Turntable smooth auto-rotation
  useEffect(() => {
    if (!isAutoRotating) return;
    let animId: number;
    const step = () => {
      setRotation((prev) => (prev + 0.35) % 360);
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating]);

  const isNote = item.type === 'Note';
  const hasDistinctReverse =
    Boolean(item.reverseImage) &&
    item.reverseImage !== item.obverseImage &&
    item.reverseImage !== '';

  const isSideBySideComposite =
    item.type === 'Coin' &&
    imgNaturalRatio >= 1.55 &&
    imgNaturalRatio <= 2.4 &&
    item.obverseImage === item.reverseImage;

  // Determine current image source
  let currentImage = item.obverseImage;
  if (isFlipped && hasDistinctReverse) {
    currentImage = item.reverseImage!;
  }

  const currentDescription = isFlipped
    ? item.reverseDescription || item.obverseDescription
    : item.obverseDescription;

  // Flip Obverse / Reverse
  const handleFlip = () => {
    if (item.type === 'Coin') {
      sound.playCoinClink();
    } else {
      sound.playPaperFlick();
    }
    setIsFlipped((prev) => !prev);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    sound.playLoupeClick();
    setZoom((z) => Math.min(4.5, +(z + 0.35).toFixed(2)));
  };

  const handleZoomOut = () => {
    sound.playLoupeClick();
    setZoom((z) => Math.max(0.8, +(z - 0.35).toFixed(2)));
  };

  const handleResetView = () => {
    sound.playLoupeClick();
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
    setIsAutoRotating(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    setZoom((z) => Math.max(0.8, Math.min(4.5, +(z + delta).toFixed(2))));
  };

  const handleDoubleClick = () => {
    sound.playLoupeClick();
    if (zoom > 1.2) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoom(2.2);
    }
  };

  // Pan / Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // If loupe is active, do not initiate pan drag
    if (isLoupeActive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const pixelX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const pixelY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      const x = (pixelX / rect.width) * 100;
      const y = (pixelY / rect.height) * 100;

      setMousePos({ x, y });
      setPixelPos({ x: pixelX, y: pixelY, width: rect.width, height: rect.height });

      if (isDragging) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Support (mobile drag)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setPan({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Calculate subtle 3D physical tilt based on mouse position relative to center
  const tiltY = isDragging ? 0 : ((mousePos.x - 50) / 50) * 7;
  const tiltX = isDragging ? 0 : -((mousePos.y - 50) / 50) * 7;

  return (
    <div className="dossier-studio-root" ref={containerRef} onWheel={handleWheel}>
      {/* Studio Header Bar */}
      <div className="dossier-studio-header">
        <div className="dossier-studio-title-badge">
          <Sparkles size={13} className="text-amber-400" />
          <span>SPECIMEN LABORATORY INSPECTOR</span>
          <span className="studio-specimen-id">· {item.id.toUpperCase()}</span>
          {typeof currentIndex === 'number' && typeof totalCount === 'number' && (
            <span className="studio-index-chip">[{currentIndex + 1} / {totalCount}]</span>
          )}
        </div>

        {/* Die Face Indicator Pill & Quick Nav */}
        <div className="dossier-header-right-group">
          {onNavigatePrev && onNavigateNext && (
            <div className="studio-quick-nav" title="Navigate specimens (Use ← and → arrow keys)">
              <button
                type="button"
                onClick={() => {
                  sound.playCoinClink();
                  onNavigatePrev();
                }}
                className="studio-quick-nav-btn"
                title="Previous specimen (Left Arrow ←)"
                aria-label="Previous specimen"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playCoinClink();
                  onNavigateNext();
                }}
                className="studio-quick-nav-btn"
                title="Next specimen (Right Arrow →)"
                aria-label="Next specimen"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          <div className="dossier-face-badge">
            <Eye size={12} className="text-amber-400" />
            <span>{isFlipped ? 'REVERSE DIE' : 'OBVERSE DIE'}</span>
            {item.material && <span className="specimen-mat-chip">({item.material})</span>}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        className={`dossier-interactive-stage ${isDragging ? 'is-dragging' : ''}`}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
      >
        {/* Floating Side Navigation Paddles */}
        {onNavigatePrev && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.playCoinClink();
              onNavigatePrev();
            }}
            className="studio-stage-nav-paddle paddle-prev"
            title="Previous Specimen (Left Arrow ←)"
            aria-label="Previous Specimen"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {onNavigateNext && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.playCoinClink();
              onNavigateNext();
            }}
            className="studio-stage-nav-paddle paddle-next"
            title="Next Specimen (Right Arrow →)"
            aria-label="Next Specimen"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Ambient Pedestal Lighting & Specular Plinth Glow */}
        <div className="studio-pedestal-light" />
        <div className="studio-plinth-ring" />

        {/* Dynamic Specimen Transformation Wrapper */}
        <div
          className="studio-specimen-transform-box"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {hasError ? (
            <div className="studio-specimen-fallback">
              <Compass size={48} className="text-amber-400/40 animate-pulse" />
              <span>Specimen Die Matrix Offline</span>
            </div>
          ) : isSideBySideComposite && !isDualPlate ? (
            /* Deliberate Composite Split View */
            <div className="studio-composite-frame">
              <img
                src={item.obverseImage}
                alt={`${item.title} ${isFlipped ? 'Reverse' : 'Obverse'}`}
                className="studio-artifact-img"
                style={{
                  transform: isFlipped ? 'translateX(-50%)' : 'translateX(0%)',
                  width: '200%'
                }}
                loading="eager"
                referrerPolicy="no-referrer"
                onError={() => setHasError(true)}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  if (img.naturalHeight > 0) {
                    setImgNaturalRatio(img.naturalWidth / img.naturalHeight);
                  }
                }}
              />
            </div>
          ) : (
            /* Standard High-Definition Specimen Plate */
            <img
              src={currentImage}
              alt={`${item.title} ${isFlipped ? 'Reverse' : 'Obverse'}`}
              className={`studio-artifact-img ${isNote ? 'studio-note-img' : 'studio-coin-img'}`}
              loading="eager"
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalHeight > 0) {
                  setImgNaturalRatio(img.naturalWidth / img.naturalHeight);
                }
              }}
            />
          )}

          {/* Dynamic Specular Sheen (Reacts to cursor coordinates) */}
          <div
            className="studio-specular-sheen"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.04) 35%, transparent 70%)`
            }}
          />

          {/* Banknote Watermark / Backlight Simulation */}
          {isBacklit && isNote && (
            <div className="studio-watermark-overlay">
              <div className="studio-watermark-glow" />
              <div className="studio-watermark-content">
                <span className="studio-watermark-portrait">◉</span>
                <span className="studio-watermark-text">
                  WATERMARK<br />
                  {item.denomination}<br />
                  RESERVE BANK OF INDIA
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 3.5x Precision Optical Loupe */}
        {isLoupeActive && pixelPos.width > 0 && (
          <div
            className="dossier-loupe-lens"
            style={{
              left: `${pixelPos.x}px`,
              top: `${pixelPos.y}px`,
              width: '160px',
              height: '160px',
              backgroundImage: `url(${currentImage})`,
              backgroundSize: `${pixelPos.width * 3.5}px ${pixelPos.height * 3.5}px`,
              backgroundPosition: `${-(pixelPos.x * 3.5 - 80)}px ${-(pixelPos.y * 3.5 - 80)}px`,
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="dossier-loupe-crosshair" />
            <div className="dossier-loupe-badge">3.5x LOUPE</div>
          </div>
        )}

        {/* Floating Curatorial Face Caption */}
        <div className="studio-face-caption-banner">
          <span className="caption-face-label">
            {isFlipped ? 'REVERSE DIE DESCRIPTION:' : 'OBVERSE DIE DESCRIPTION:'}
          </span>
          <p className="caption-face-text">{currentDescription}</p>
        </div>
      </div>

      {/* Floating Curatorial Inspection HUD Toolbar */}
      <div className="studio-hud-toolbar">
        {/* Flip Obverse / Reverse Face */}
        {(hasDistinctReverse || isSideBySideComposite) && (
          <button
            type="button"
            onClick={handleFlip}
            className="studio-hud-btn studio-hud-btn-primary"
            title="Flip Die Face (Obverse ↔ Reverse)"
          >
            <Repeat size={14} className={isFlipped ? 'icon-flipped' : ''} />
            <span>{isFlipped ? 'View Obverse' : 'Flip Reverse'}</span>
          </button>
        )}

        <div className="studio-hud-divider" />

        {/* Zoom Controls */}
        <button
          type="button"
          onClick={handleZoomOut}
          className="studio-hud-btn"
          title="Zoom Out (or scroll down)"
          disabled={zoom <= 0.8}
        >
          <ZoomOut size={14} />
        </button>

        <span className="studio-hud-zoom-badge" title="Double click canvas to toggle zoom">
          {Math.round(zoom * 100)}%
        </span>

        <button
          type="button"
          onClick={handleZoomIn}
          className="studio-hud-btn"
          title="Zoom In (or scroll up)"
          disabled={zoom >= 4.5}
        >
          <ZoomIn size={14} />
        </button>

        <div className="studio-hud-divider" />

        {/* Rotate Controls */}
        <button
          type="button"
          onClick={() => {
            sound.playLoupeClick();
            setRotation((r) => r - 45);
          }}
          className="studio-hud-btn"
          title="Rotate Counter-Clockwise (-45°)"
        >
          <RotateCcw size={14} />
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playLoupeClick();
            setRotation((r) => r + 45);
          }}
          className="studio-hud-btn"
          title="Rotate Clockwise (+45°)"
        >
          <RotateCw size={14} />
        </button>

        {/* Turntable Auto-Spin */}
        <button
          type="button"
          onClick={() => {
            sound.playLoupeClick();
            setIsAutoRotating(!isAutoRotating);
          }}
          className={`studio-hud-btn ${isAutoRotating ? 'active-hud-btn' : ''}`}
          title="Toggle Continuous Turntable Rotation"
        >
          {isAutoRotating ? <Pause size={14} /> : <Play size={14} />}
          <span>{isAutoRotating ? 'Stop Spin' : 'Turntable'}</span>
        </button>

        <div className="studio-hud-divider" />

        {/* 3.5x Precision Loupe */}
        <button
          type="button"
          onClick={() => {
            sound.playLoupeClick();
            setIsLoupeActive(!isLoupeActive);
          }}
          className={`studio-hud-btn ${isLoupeActive ? 'active-hud-btn' : ''}`}
          title="Toggle 3.5x Precision Optical Loupe"
        >
          <Search size={14} />
          <span>{isLoupeActive ? 'Loupe ON' : 'Loupe'}</span>
        </button>

        {/* Banknote Backlight Watermark */}
        {isNote && (
          <button
            type="button"
            onClick={() => {
              sound.playUVSwitch();
              setIsBacklit(!isBacklit);
            }}
            className={`studio-hud-btn ${isBacklit ? 'active-hud-btn' : ''}`}
            title="Hold Banknote to Light (Reveal Watermark)"
          >
            <Sun size={14} />
            <span>{isBacklit ? 'Backlight ON' : 'Hold to Light'}</span>
          </button>
        )}

        {/* Dual-Plate Toggle */}
        {isSideBySideComposite && (
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              setIsDualPlate(!isDualPlate);
            }}
            className={`studio-hud-btn ${isDualPlate ? 'active-hud-btn' : ''}`}
            title="Toggle Dual-Plate (Side-by-Side) View"
          >
            <Columns size={14} />
            <span>{isDualPlate ? 'Single' : 'Dual Plate'}</span>
          </button>
        )}

        <div className="studio-hud-divider" />

        {/* Reset View */}
        <button
          type="button"
          onClick={handleResetView}
          className="studio-hud-btn"
          title="Reset Zoom, Pan & Rotation (100%)"
        >
          <Maximize2 size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Helpful Interactive Hint */}
      <div className="studio-hint-footer">
        <span>Click & drag to pan • Scroll wheel to zoom • Double-click to toggle 2x • Flip die face with button</span>
      </div>
    </div>
  );
};
