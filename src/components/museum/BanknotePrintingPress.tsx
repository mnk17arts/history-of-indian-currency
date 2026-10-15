import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Printer, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Search, 
  CheckCircle2, 
  Lock,
  ArrowDown
} from 'lucide-react';
import { sound } from '../../audio';

type PressStage = 'idle' | 'feeding' | 'pressing' | 'emerging' | 'completed';

interface SecurityFeature {
  id: string;
  name: string;
  xPct: number;
  yPct: number;
  description: string;
  historicalSignificance: string;
}

const SECURITY_FEATURES: SecurityFeature[] = [
  {
    id: 'watermark',
    name: 'King George VI Profile Watermark',
    xPct: 18,
    yPct: 50,
    description: 'Multi-tonal shaded watermark formed directly in the mould during paper manufacture. Impossible to forge with surface printing.',
    historicalSignificance: 'Introduced by Portals Ltd of Laverstoke, Hampshire, on pure cotton rag paper.'
  },
  {
    id: 'serial-number',
    name: 'Red Letterpress Typographic Numbering',
    xPct: 82,
    yPct: 20,
    description: 'Mechanical consecutive numbering machine with prefix letters and unique 6-digit red oil-based ink registration.',
    historicalSignificance: 'Ensured that every single legal tender note was individually registered in the RBI Central Registry.'
  },
  {
    id: 'guilloche',
    name: 'Rainbow Guilloche Geometric Rosettes',
    xPct: 50,
    yPct: 75,
    description: 'Mathematically generated interlocking geometric curves printed in split-fountain rainbow color blends to defeat photographic camera forgery.',
    historicalSignificance: 'Engineered at the India Security Press at Nasik using master geometric lathe dies.'
  },
  {
    id: 'signature',
    name: 'Governor Facsimile Signature',
    xPct: 52,
    yPct: 46,
    description: 'Legal authorization clause signed by Sir James Taylor / Sir C.D. Deshmukh certifying sovereign promise to pay the bearer.',
    historicalSignificance: 'The statutory legal guarantee binding the Reserve Bank of India to honor face value in silver.'
  }
];

export const BanknotePrintingPress: React.FC = () => {
  const [stage, setStage] = useState<PressStage>('idle');
  const [activeFeature, setActiveFeature] = useState<SecurityFeature | null>(null);
  const [backlightMode, setBacklightMode] = useState<boolean>(false);
  const [leverProgress, setLeverProgress] = useState<number>(0); // 0 to 100
  const [isPulling, setIsPulling] = useState<boolean>(false);

  const leverTrackRef = useRef<HTMLDivElement>(null);

  const executePressCycle = useCallback(() => {
    if (stage === 'feeding' || stage === 'pressing' || stage === 'emerging') return;

    sound.playClick();
    setBacklightMode(false);
    setActiveFeature(null);
    setStage('feeding');
    setIsPulling(true);
    setLeverProgress(100);

    // Sequence of printing steps
    setTimeout(() => {
      setStage('pressing');
      sound.playClick();
    }, 700);

    setTimeout(() => {
      setStage('emerging');
    }, 1500);

    setTimeout(() => {
      setStage('completed');
      setIsPulling(false);
      setLeverProgress(0); // pneumatic recoil back to rest position
    }, 2300);
  }, [stage]);

  const handleLeverClick = () => {
    if (stage === 'feeding' || stage === 'pressing' || stage === 'emerging') return;
    executePressCycle();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (stage === 'feeding' || stage === 'pressing' || stage === 'emerging') return;
    const track = leverTrackRef.current;
    if (!track) return;

    track.setPointerCapture(e.pointerId);
    setIsPulling(true);

    const onPointerMove = (moveEvent: PointerEvent) => {
      const rect = track.getBoundingClientRect();
      const relativeY = moveEvent.clientY - rect.top;
      const pct = Math.max(0, Math.min(100, (relativeY / rect.height) * 100));
      setLeverProgress(pct);

      if (pct >= 85) {
        // Lever reached bottom strike threshold
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        executePressCycle();
      }
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (leverProgress < 85) {
        // Snap back to top if not fully pulled
        setIsPulling(false);
        setLeverProgress(0);
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const handleReset = () => {
    sound.playClick();
    setStage('idle');
    setActiveFeature(null);
    setBacklightMode(false);
    setLeverProgress(0);
    setIsPulling(false);
  };

  return (
    <div className="printing-press-container">
      {/* Header bar */}
      <div className="printing-press-header">
        <div className="printing-press-title-group">
          <div className="printing-press-badge">
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>INDIA SECURITY PRESS, NASIK • 1935 INTAGLIO PRESS</span>
          </div>
          <h3 className="printing-press-title">The Master Banknote Printing Press</h3>
          <p className="printing-press-desc">
            Operate the mechanical press to strike an authentic 1938 Reserve Bank of India Five-Rupee uniface banknote, then inspect its anti-counterfeiting security innovations.
          </p>
        </div>

        {/* Status indicator & secondary controls */}
        <div className="printing-press-controls">
          <div className="press-status-strip">
            <span className={`press-status-bulb ${stage === 'pressing' || stage === 'feeding' ? 'press-status-bulb-active' : ''}`} />
            <span className="press-status-text">
              {stage === 'idle' && 'READY • PULL LEVER TO STRIKE'}
              {stage === 'feeding' && 'FEEDING 100% COTTON RAG...'}
              {stage === 'pressing' && 'HYDRAULIC DIE IMPRESSION (120 PSI)'}
              {stage === 'emerging' && 'EXTRACTING FROM CYLINDER...'}
              {stage === 'completed' && 'SPECIMEN STRUCK • READY'}
            </span>
          </div>

          {stage === 'completed' && (
            <button
              type="button"
              onClick={handleReset}
              className="press-reset-btn"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              <span>Load New Paper</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Physical Machine Bed */}
      <div className="printing-press-machine-bed">
        {/* Steel Machine Frame Graphics */}
        <div className="press-heavy-frame">
          <div className="press-top-cylinder">
            <div className="press-gauge">
              <span className={`press-gauge-needle ${stage === 'pressing' ? 'press-gauge-needle-peak' : ''}`} />
              <span className="press-gauge-label">
                {stage === 'pressing' ? 'PRESSURE 120 PSI (ACTIVE)' : 'PRESSURE 120 PSI'}
              </span>
            </div>
            <div className="press-cylinder-sheen" />
          </div>

          {/* Central Plate Stage & Mechanical Lever Row */}
          <div className="press-bed-interior-row">
            {/* Left: Plate Canvas Stage Area */}
            <div className="press-plate-stage">
              {/* STAGE: IDLE - Blank watermarked rag paper waiting on the platen */}
              {stage === 'idle' && (
                <div className="press-blank-sheet animate-fade-in">
                  <div className="press-blank-paper-texture">
                    <div className="press-blank-guide-lines" />
                    <div className="press-blank-watermark-hint">
                      <Lock className="w-6 h-6 text-white/20 mb-2" />
                      <span>Pure Cotton Rag Deckle Paper • Watermarked Ready</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE: FEEDING / PRESSING */}
              {(stage === 'feeding' || stage === 'pressing') && (
                <div className={`press-sheet-moving ${stage === 'pressing' ? 'press-sheet-pressed' : ''}`}>
                  <div className="press-blank-paper-texture">
                    <div className="press-inking-roller" />
                  </div>
                </div>
              )}

              {/* STAGE: EMERGING / COMPLETED - The Finished Banknote */}
              {(stage === 'emerging' || stage === 'completed') && (
                <div className={`press-finished-note-wrapper ${backlightMode ? 'press-backlight-active' : ''}`}>
                  <div className="press-banknote-card">
                    {/* Real Banknote Image */}
                    <img 
                      src="./specimens/george_vi_first_rbi_5_rupees.jpg" 
                      alt="First Reserve Bank of India 5 Rupee Note 1938"
                      className="press-banknote-img"
                    />

                    {/* Watermark Backlight Simulation Overlay */}
                    <div className={`press-watermark-overlay ${backlightMode ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="press-watermark-silhouette">
                        <div className="watermark-profile-circle" />
                        <span className="watermark-text">KING EMPEROR GEORGE VI</span>
                      </div>
                    </div>

                    {/* Interactive Security Inspection Hotspots */}
                    {stage === 'completed' && SECURITY_FEATURES.map(feat => {
                      const isSelected = activeFeature?.id === feat.id;
                      return (
                        <button
                          key={feat.id}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setActiveFeature(feat);
                          }}
                          style={{
                            left: `${feat.xPct}%`,
                            top: `${feat.yPct}%`
                          }}
                          className={`press-security-hotspot ${isSelected ? 'press-security-hotspot-active' : ''}`}
                          title={feat.name}
                          aria-label={feat.name}
                        >
                          <Search className="w-3 h-3 text-white" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Backlight Lightbox Toggle Switch */}
                  {stage === 'completed' && (
                    <div className="press-backlight-toggle-bar">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setBacklightMode(!backlightMode);
                        }}
                        className={`press-backlight-btn ${backlightMode ? 'press-backlight-btn-active' : ''}`}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        <span>{backlightMode ? 'Inspect Inks in Frontlight' : 'Hold Up to Backlight (Reveal Watermark)'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Tactile Physical Mechanical Press Lever (Directly beside canvas) */}
            <div className="press-mechanical-lever-column">
              <div className="press-lever-housing">
                <span className="press-lever-metric-top">0° REST</span>
                
                {/* Vertical Milled Guide Slot */}
                <div 
                  ref={leverTrackRef}
                  className={`press-lever-track ${isPulling ? 'press-lever-track-pulling' : ''} ${stage === 'feeding' || stage === 'pressing' ? 'press-lever-track-locked' : ''}`}
                  onPointerDown={handlePointerDown}
                  onClick={handleLeverClick}
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={leverProgress}
                  tabIndex={0}
                  title="Slide or pull down lever to strike banknote"
                >
                  {/* Recessed guide channel */}
                  <div className="press-lever-slot" />
                  
                  {/* Mechanical Slider Lever Assembly */}
                  <div 
                    className="press-lever-assembly"
                    style={{
                      transform: `translateY(${leverProgress * 1.6}px)`
                    }}
                  >
                    <div className="press-lever-arm-bar" />
                    <div className="press-lever-brass-knob">
                      <div className="press-lever-knob-core" />
                    </div>
                  </div>

                  {/* Action Guidance Cue */}
                  {stage === 'idle' && (
                    <div className="press-lever-pull-cue">
                      <ArrowDown size={12} className="press-cue-arrow" />
                      <span>PULL</span>
                    </div>
                  )}
                </div>

                <span className="press-lever-metric-bottom">STRIKE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Security & Intaglio Engineering Inspector Panel */}
        <div className="press-inspector-panel">
          <div className="press-inspector-header">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Security & Intaglio Engineering</span>
          </div>

          {activeFeature ? (
            <div className="press-inspector-content animate-fade-in">
              <span className="press-inspector-tag">AUTHENTIC SECURITY INNOVATION</span>
              <h4 className="press-inspector-name">{activeFeature.name}</h4>
              <p className="press-inspector-desc">{activeFeature.description}</p>
              <div className="press-inspector-history">
                <strong>Historical Significance:</strong> {activeFeature.historicalSignificance}
              </div>
            </div>
          ) : (
            <div className="press-inspector-placeholder">
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                Click any glowing inspection beacon on the banknote above to examine its anti-counterfeiting security features.
              </p>
              <div className="press-inspector-feature-pills">
                {SECURITY_FEATURES.map(feat => (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActiveFeature(feat);
                    }}
                    className="press-feature-pill"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                    <span>{feat.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};