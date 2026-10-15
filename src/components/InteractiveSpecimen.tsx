import React, { useState, useRef, useCallback, useEffect } from 'react';
import { RotateCw, Sun, Search, Eye, Scale, Columns } from 'lucide-react';
import type { CurrencyItem } from '../data';
import { sound } from '../audio';

interface Props {
  item: CurrencyItem;
  onOpenCompare?: () => void;
}

export const InteractiveSpecimen: React.FC<Props> = ({ item, onOpenCompare }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBacklit, setIsBacklit] = useState(false);
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const [isDualPlate, setIsDualPlate] = useState(false);
  const [imgNaturalRatio, setImgNaturalRatio] = useState<number>(1);
  const [hasError, setHasError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // percentages
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasError(false);
    setIsFlipped(false);
    setIsBacklit(false);
    setIsDualPlate(false);
  }, [item.id]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const pixelX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const pixelY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    const x = (pixelX / rect.width) * 100;
    const y = (pixelY / rect.height) * 100;

    setMousePos({ x, y });
    setPixelPos({ x: pixelX, y: pixelY, width: rect.width, height: rect.height });

    // Subtle 3D tilt calculation (-7 to +7 degrees)
    const rotY = ((x - 50) / 50) * 7;
    const rotX = -((y - 50) / 50) * 7;
    setRotate({ x: rotX, y: rotY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  }, []);

  const handleFlip = () => {
    if (item.type === 'Coin') {
      sound.playCoinClink();
    } else {
      sound.playPaperFlick();
    }
    setIsFlipped(!isFlipped);
  };

  const handleBacklightToggle = () => {
    sound.playLoupeClick();
    setIsBacklit(!isBacklit);
  };

  const handleLoupeToggle = () => {
    sound.playLoupeClick();
    setIsLoupeActive(!isLoupeActive);
  };

  const handleDualPlateToggle = () => {
    sound.playLoupeClick();
    setIsDualPlate(!isDualPlate);
  };

  // Check if image is a side-by-side composite photo (ratio ~ 1.6 to 2.4 and obverse === reverse)
  const isSideBySideComposite =
    item.type === 'Coin' &&
    imgNaturalRatio >= 1.55 &&
    imgNaturalRatio <= 2.4 &&
    item.obverseImage === item.reverseImage;

  const hasDistinctReverse =
    isSideBySideComposite ||
    Boolean(item.reverseImage && item.reverseImage !== item.obverseImage);

  // Active image source
  const currentImage = (!isFlipped || !item.reverseImage) ? item.obverseImage : item.reverseImage;
  const currentDescription = (!isFlipped || !item.reverseDescription)
    ? item.obverseDescription
    : item.reverseDescription;

  const isCoin = item.type === 'Coin';
  const isNote = item.type === 'Note';

  return (
    <div className="museum-artifact-viewer">
      {/* 3D Physical Stage with Ambient Pedestal Aura */}
      <div
        className={`artifact-stage ${isCoin ? 'coin-stage' : isNote ? 'note-stage' : 'digital-stage'}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={stageRef}
        style={{
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: rotate.x === 0 ? 'transform 0.5s ease-out' : 'transform 0.05s ease-out'
        }}
      >
        {/* Soft Ambient Pedestal Aura (No harsh box border) */}
        <div className="pedestal-ambient-aura" />

        {/* Specimen Flan / Substrate Presentation */}
        <div className={`specimen-canvas ${isBacklit ? 'backlit-active' : ''}`}>
          {hasError ? (
            <div className="museum-specimen-fallback" style={{ borderColor: item.accent }}>
              <div className="fallback-inner">
                <span className="fallback-era">{item.era} Era</span>
                <h4 className="fallback-denom">{item.denomination}</h4>
                <p className="fallback-title">{item.title}</p>
                <div className="fallback-meta">{item.year} · {item.issuer}</div>
                <button
                  type="button"
                  className="fallback-retry-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHasError(false);
                  }}
                >
                  <RotateCw size={14} /> Retry Specimen
                </button>
              </div>
            </div>
          ) : isSideBySideComposite && !isDualPlate ? (
            /* Deliberate composite framing: Focus on Obverse or Reverse at full size */
            <div className="composite-focus-wrapper">
              <img
                src={currentImage}
                alt={`${item.title} ${isFlipped ? 'Reverse' : 'Obverse'}`}
                className="composite-focus-img"
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
            /* Standard high-resolution specimen */
            <img
              src={currentImage}
              alt={`${item.title} ${isFlipped ? 'Reverse' : 'Obverse'}`}
              className="museum-artifact-img"
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

          {/* Dynamic Specular Sheen (Reacts naturally to cursor movement) */}
          <div
            className="museum-specular-sheen"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.03) 35%, transparent 70%)`
            }}
          />

          {/* Watermark Backlight Simulation Overlay (Banknotes) */}
          {isBacklit && isNote && (
            <div className="watermark-overlay">
              <div className="watermark-glow" />
              <div className="watermark-content">
                <span className="watermark-portrait">◉</span>
                <span className="watermark-text">
                  WATERMARK<br />
                  {item.denomination}<br />
                  RESERVE BANK OF INDIA
                </span>
              </div>
            </div>
          )}

          {/* 3.5x Precision Optical Loupe */}
          {isLoupeActive && pixelPos.width > 0 && (
            <div
              className="loupe-lens"
              style={{
                left: `${pixelPos.x}px`,
                top: `${pixelPos.y}px`,
                width: '150px',
                height: '150px',
                backgroundImage: `url(${currentImage})`,
                backgroundSize: `${pixelPos.width * 3.5}px ${pixelPos.height * 3.5}px`,
                backgroundPosition: `${-(pixelPos.x * 3.5 - 75)}px ${-(pixelPos.y * 3.5 - 75)}px`,
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="loupe-crosshair" />
              <div className="loupe-badge">3.5x OPTICAL</div>
            </div>
          )}
        </div>
      </div>

      {/* Contextual Floating Viewer Controls (Minimalist pill bar) */}
      <div className="artifact-controls-bar">
        {hasDistinctReverse && (
          <button
            type="button"
            onClick={handleFlip}
            className="context-btn"
            title="Flip to examine alternate face"
          >
            <RotateCw size={13} className={isFlipped ? 'icon-rotated' : ''} />
            <span>{isFlipped ? 'View Obverse' : 'Flip to Reverse'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleLoupeToggle}
          className={`context-btn ${isLoupeActive ? 'active-context-btn' : ''}`}
          title="Toggle 3.5x Precision Loupe"
        >
          <Search size={13} />
          <span>{isLoupeActive ? 'Loupe 3.5x Active' : 'Inspect Loupe'}</span>
        </button>

        {isSideBySideComposite && (
          <button
            type="button"
            onClick={handleDualPlateToggle}
            className={`context-btn ${isDualPlate ? 'active-context-btn' : ''}`}
            title="View both faces side-by-side"
          >
            <Columns size={13} />
            <span>{isDualPlate ? 'Single Face' : 'Dual Plate'}</span>
          </button>
        )}

        {isNote && (
          <button
            type="button"
            onClick={handleBacklightToggle}
            className={`context-btn ${isBacklit ? 'active-context-btn' : ''}`}
            title="Hold banknote against light to reveal watermark"
          >
            <Sun size={13} />
            <span>{isBacklit ? 'Backlight ON' : 'Hold to Light'}</span>
          </button>
        )}

        {onOpenCompare && (
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              onOpenCompare();
            }}
            className="context-btn"
            title="Open side-by-side comparison lab"
          >
            <Scale size={13} />
            <span>Compare</span>
          </button>
        )}
      </div>

      {/* Subtle Curatorial Face Caption (Understated, clean) */}
      <div className="artifact-curatorial-caption">
        <span className="face-label">
          <Eye size={12} className="text-amber-400" />
          <span>{isFlipped ? 'REVERSE' : 'OBVERSE'}:</span>
        </span>
        <span className="face-description">{currentDescription}</span>
      </div>
    </div>
  );
};
