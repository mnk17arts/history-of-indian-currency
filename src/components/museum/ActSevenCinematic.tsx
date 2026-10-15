import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Eye, 
  Scale, 
  Quote,
  ShieldCheck,
  Cpu,
  Coins
} from 'lucide-react';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { BanknoteStudio } from '../BanknoteStudio';
import { sound } from '../../audio';

interface ActSevenCinematicProps {
  onSelectSpecimenImage?: (imageUrl: string, title: string) => void;
  onNavigateToNextAct?: (actId: string) => void;
}

const ACT_SEVEN_COIN: CoinSpecimen3D = {
  id: 'modern-mg-series-rupee',
  name: 'Modern Mahatma Gandhi Series Specimen',
  rulerOrEra: 'Modern India • 1996 Uniform Security Issue',
  dateStr: '1996–Present (Nasik / Dewas / Mysuru)',
  metal: 'silver',
  shape: 'banknote',
  obverseImage: './specimens/mg_1996_100_obs.jpg',
  reverseImage: './specimens/mg_1996_100_rev.jpg',
  purity: '100% Cotton Rag Paper & Security Thread',
  weightGrams: 'Standard Security Substrate',
  mintLocation: 'BRBNMPL Mysuru • Salboni • SPMCIL Nasik'
};

export const ActSevenCinematic: React.FC<ActSevenCinematicProps> = ({
  onSelectSpecimenImage,
  onNavigateToNextAct
}) => {
  const [isExhibitInView, setIsExhibitInView] = useState<boolean>(true);
  const exhibitStageRef = useRef<HTMLDivElement>(null);
  const heroSceneRef = useRef<HTMLDivElement | null>(null);
  const [isHeroInView, setIsHeroInView] = useState<boolean>(true);

  // Dynamic Hero In-View Observer
  useEffect(() => {
    const el = heroSceneRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Dynamic Corner-Fly Animation on Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExhibitInView(entry.isIntersecting);
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (exhibitStageRef.current) {
      observer.observe(exhibitStageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="act-7-modern" 
      style={{
        position: 'relative',
        width: '100%',
        background: '#070709',
        overflow: 'hidden'
      }}
      data-act="7"
    >
      {/* High-Tech Security Blue & Sapphire Ambient Backing */}
      <div className="act-seven-security-ambient" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SCENE (~90VH — LIVING ARTWORK & SCULPTED ERA)           */}
      {/* ========================================================================= */}
      <div ref={heroSceneRef} className="act-seven-scene-90vh">
        <img 
          src="./acts/act_7_modern.png" 
          alt="The Modern Rupee Banknote Security and Technology"
          className={`act-seven-scene-img ${isHeroInView ? 'act-hero-in-view' : 'act-hero-out-of-view'}`}
          loading="eager"
        />

        {/* Stationary Cinematic Dot Matrix Overlay */}
        <div className="hero-dot-matrix-overlay" aria-hidden="true" />

        {/* Localized Bottom Gradient Scrim */}
        <div className="act-seven-scrim-localized" />

        {/* Sapphire Glow and Precision Security Atmosphere Overlay */}
        <div className="act-seven-atmosphere-overlay" />

        {/* Overlaid Typography directly on painting */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '920px' }}>
          
          {/* Sculpted Era Artwork Typography */}
          <div className="museum-sculpted-year modern-blue">
            1996–NOW
          </div>

          {/* Era Indicator Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            background: 'rgba(2, 132, 199, 0.22)',
            border: '1px solid rgba(56, 189, 248, 0.6)',
            backdropFilter: 'blur(12px)',
            marginBottom: '14px'
          }}>
            <Sparkles size={12} style={{ color: '#38bdf8' }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '11px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#bae6fd' 
            }}>
              ACT VII • THE MODERN RUPEE
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 5.5vw, 68px)',
            lineHeight: 1.05,
            color: '#fff',
            margin: '0 0 16px 0',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)'
          }}>
            THE MODERN RUPEE
          </h2>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(15px, 2vw, 20px)',
            lineHeight: 1.55,
            color: 'rgba(255, 255, 255, 0.92)',
            maxWidth: '720px',
            margin: 0,
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)'
          }}>
            Modern banknotes combine art, security and advanced technology.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginTop: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <span>ERA: <strong>1996–PRESENT</strong></span>
            <span>•</span>
            <span>STANDARD: <strong style={{ color: '#38bdf8' }}>₹ SOVEREIGN GLYPH</strong></span>
            <span>•</span>
            <span>DOMAINS: <strong style={{ color: '#10b981' }}>PRECISION • SECURITY • OPTICS</strong></span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DIRECT MUSEUM PEDESTAL EXHIBIT FLOOR (UNOBSTRUCTED 520PX 3D SPECIMEN)  */}
      {/* ========================================================================= */}
      <div 
        ref={exhibitStageRef}
        style={{
          position: 'relative',
          padding: '40px 24px 80px',
          maxWidth: '1440px',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(ellipse at 50% 20%, rgba(2, 132, 199, 0.18) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 80%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Exhibit Stage Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 14px',
            borderRadius: '9999px',
            background: 'rgba(2, 132, 199, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            marginBottom: '10px'
          }}>
            <Coins size={12} style={{ color: '#38bdf8' }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#bae6fd' 
            }}>
              SOVEREIGN FORENSIC EXHIBIT
            </span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 3.4vw, 42px)',
            color: '#fff',
            margin: '0 0 8px 0',
            letterSpacing: '-0.01em'
          }}>
            Mahatma Gandhi Series Specimen
          </h3>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            The uniform currency series inaugurated in 1996, fusing intaglio portraiture with multi-spectral security filaments, watermarks, and machine-readable inks.
          </p>
        </div>

        {/* 3D Object Stage with Corner Flying Metric Annotation Cards */}
        <div className="museum-pedestal-stage museum-pedestal-wide" style={{ position: 'relative', zIndex: 2, maxWidth: '1320px', width: '100%', overflow: 'visible' }}>
          <div className={`museum-mode-core-layout ${isExhibitInView ? 'exhibit-in-view' : ''}`} style={{ margin: '0 auto', position: 'relative', zIndex: 10 }}>
            
            {/* Left Annotation Column */}
            <div className="museum-mode-pins-col">
              <div className="museum-annotation-card museum-annotation-corner-tl">
                <div className="museum-annotation-tag" style={{ color: '#38bdf8' }}>
                  <ShieldCheck size={13} style={{ color: '#0284c7' }} />
                  <span>Mahatma Gandhi Portrait (1996)</span>
                </div>
                <p className="museum-annotation-desc">
                  Standardized portrait with raised intaglio lines on cotton rag paper, providing tactile verification for visually impaired citizens.
                </p>
              </div>

              <div className="museum-annotation-card museum-annotation-corner-bl">
                <div className="museum-annotation-tag" style={{ color: '#10b981' }}>
                  <Sparkles size={13} style={{ color: '#10b981' }} />
                  <span>Colour-Shifting OVI Ink</span>
                </div>
                <p className="museum-annotation-desc">
                  Denominational numerals printed with Optically Variable Ink shift dynamically between emerald green and security blue under angular illumination.
                </p>
              </div>
            </div>

            {/* Center Stage: Interactive 3D Coin/Object */}
            <div className="museum-pedestal-centerpiece" style={{ width: '100%', maxWidth: '520px', height: '520px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <CoinStage3D coin={ACT_SEVEN_COIN} height={520} variant="pure" />
            </div>

            {/* Right Annotation Column */}
            <div className="museum-mode-pins-col">
              <div className="museum-annotation-card museum-annotation-corner-tr">
                <div className="museum-annotation-tag" style={{ color: '#38bdf8' }}>
                  <Scale size={13} style={{ color: '#0284c7' }} />
                  <span>The ₹ Currency Symbol (2010)</span>
                </div>
                <p className="museum-annotation-desc">
                  Designed by D. Udaya Kumar and adopted by the Union Cabinet on July 15, 2010. Combines Devanagari "र" with Latin "R" and national tricolour stripes.
                </p>
              </div>

              <div className="museum-annotation-card museum-annotation-corner-br">
                <div className="museum-annotation-tag" style={{ color: '#38bdf8' }}>
                  <Eye size={13} style={{ color: '#0284c7' }} />
                  <span>Dual-Color Fluorescent Fibers</span>
                </div>
                <p className="museum-annotation-desc">
                  Invisible dual-colour synthetic fibers embedded into the 100% cotton rag paper glow in yellow and blue under ultraviolet irradiation.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Benchmark Numismatic Pill Bar */}
        <div style={{ textAlign: 'center', marginTop: '36px', position: 'relative', zIndex: 2 }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px',
              padding: '8px 24px',
              borderRadius: '9999px',
              background: 'rgba(2, 132, 199, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.28)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <span>Series: <strong style={{ color: '#bae6fd' }}>Mahatma Gandhi Uniform Series</strong></span>
            <span>•</span>
            <span>Security Layers: <strong style={{ color: '#fff' }}>6 Forensic Standards</strong></span>
            <span>•</span>
            <span>Mints: <strong style={{ color: '#38bdf8' }}>Mysuru • Salboni • Dewas • Nasik</strong></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CURATORIAL SLATE / SECURITY BLUE PLAQUE (< 120 WORDS)                  */}
      {/* ========================================================================= */}
      <div className="museum-gallery-plaque museum-gallery-plaque-modern">
        <div className="museum-plaque-title" style={{ color: '#38bdf8' }}>
          <Cpu size={14} style={{ color: '#38bdf8' }} />
          <span>CURATORIAL ARCHIVE • THE MODERN RUPEE (1996–PRESENT)</span>
        </div>

        <p className="museum-plaque-text">
          In 1996, the Reserve Bank unified Indian banknotes under the landmark Mahatma Gandhi Series, embedding world-class anti-counterfeiting physics into every note: electrotype watermarks, windowed security threads, and tactile intaglio markings.
        </p>

        <p className="museum-plaque-text" style={{ marginTop: '14px' }}>
          In 2010, India joined the US Dollar, British Pound, and Euro with its own global glyph (₹). The 2016 Mahatma Gandhi (New) Series refreshed the currency with vibrant architectural motifs celebrating Konark, Hampi, Rani Ki Vav, and the interplanetary Mangalyaan mission.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
          {['D. Udaya Kumar', 'Dr. Bimal Jalan', 'Dr. Y.V. Reddy', 'Dr. Raghuram Rajan', 'Dr. Urjit Patel'].map((figure, fIdx) => (
            <span 
              key={fIdx}
              style={{
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(2, 132, 199, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.28)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#bae6fd'
              }}
            >
              {figure}
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIGNATURE INTERACTION: INTERACTIVE BANKNOTE STUDIO & FORENSIC LAB      */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1280px',
          margin: '40px auto 60px',
          padding: '0 24px'
        }}
      >
        <BanknoteStudio />
      </div>

      {/* ========================================================================= */}
      {/* 5. HIGHLIGHTED HISTORICAL INSIGHT (PREMIUM MUSEUM QUOTE)                  */}
      {/* ========================================================================= */}
      <div 
        className="act-seven-quote-box"
        style={{
          maxWidth: '860px',
          margin: '20px auto 60px',
          padding: '28px 36px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(14, 34, 61, 0.45) 0%, rgba(10, 10, 16, 0.85) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div style={{ 
          width: '52px', 
          height: '52px', 
          borderRadius: '50%', 
          background: 'rgba(2, 132, 199, 0.15)', 
          border: '1px solid rgba(56, 189, 248, 0.4)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexShrink: 0 
        }}>
          <Quote size={24} style={{ color: '#38bdf8' }} />
        </div>
        <div>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '10px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.14em', 
            color: '#38bdf8', 
            display: 'block', 
            marginBottom: '6px' 
          }}>
            Cabinet Notification • Design of the Sovereign ₹ Glyph (2010)
          </span>
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '15px', 
            fontStyle: 'italic', 
            color: 'rgba(255, 255, 255, 0.9)', 
            margin: 0, 
            lineHeight: 1.7 
          }}>
            "The symbol of the Indian Rupee represents the amalgamation of the Devanagari 'Ra' and the Latin Capital 'R', embodying India’s cultural heritage and global financial stature."
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. TRANSFORMATIVE SCROLL TRANSITION INTO ACT VIII                        */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto 80px',
          padding: '0 32px'
        }}
      >
        <div className="museum-era-transition-bridge modern-bridge">
          <div>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#38bdf8', 
              display: 'block', 
              marginBottom: '4px' 
            }}>
              Banknote Dissolves • Pixels & Quantum Particles Emerge
            </span>
            <p className="museum-bridge-lead">
              The banknote slowly dissolves into pure mathematics. Physical cotton rag fibers yield to glowing pixels as cryptographic distributed ledger nodes emerge in radiant sapphire and electric blue light...
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigateToNextAct?.('act-8-digital');
            }}
            className="museum-bridge-btn modern-bridge-btn"
          >
            <span>Enter Act VIII: The Digital Rupee</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </section>
  );
};
