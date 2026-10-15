import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Eye, 
  Scale, 
  ShieldCheck, 
  Coins,
  Scroll,
  Quote,
  Compass
} from 'lucide-react';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { TradeRouteExplorer } from './TradeRouteExplorer';
import { NumismaticVitrineItem, VitrineArtifact } from './NumismaticVitrineItem';
import { sound } from '../../audio';

interface ActThreeCinematicProps {
  onSelectSpecimenImage?: (
    url: string,
    title: string,
    reverseUrl?: string,
    era?: string,
    caption?: string
  ) => void;
  onNavigateToNextAct?: (actId: string) => void;
}

const ACT_THREE_COIN: CoinSpecimen3D = {
  id: 'eic-sicca-rupee-1793',
  name: 'East India Company Murshidabad Sicca Rupee',
  rulerOrEra: 'Presidency of Bengal • Lord Cornwallis',
  dateStr: '1793 CE (19-San Sicca)',
  metal: 'silver',
  obverseImage: './specimens/murshidabad_sicca_rupee.jpg',
  reverseImage: './specimens/eic_madras_two_pagodas_rev.jpg',
  purity: '98% Fine Sterling Silver',
  weightGrams: '11.66 grams (180 Grains)',
  mintLocation: 'Calcutta / Murshidabad Steam Mint'
};

const ACT_THREE_ARTIFACTS: VitrineArtifact[] = [
  {
    url: './specimens/bank_of_hindostan_1770.jpg',
    reverseUrl: './specimens/bank_of_bengal_commerce_note.jpg',
    title: 'Bank of Hindostan Promissory Note',
    era: '1770 CE • Calcutta',
    caption: 'India’s earliest modern demand paper currency, issued by Alexander & Co. payable in silver Sicca rupees'
  },
  {
    url: './specimens/murshidabad_sicca_rupee.jpg',
    reverseUrl: './specimens/victoria_1862_rupee.webp',
    title: 'Murshidabad 19-San Sicca Silver Rupee',
    era: '1793 CE • Bengal Presidency',
    caption: 'Milled machine-struck currency with oblique reeding engineered to eliminate shaving and counterfeiting'
  },
  {
    url: './specimens/eic_madras_two_pagodas_obs.jpg',
    reverseUrl: './specimens/eic_madras_two_pagodas_rev.jpg',
    title: 'Madras Presidency Two Pagodas Gold Coin',
    era: '1808 CE • Fort St. George',
    caption: 'Historic pagoda coin with Vishnu idol and Sri Venkateswara gopuram struck for South Indian commerce'
  },
  {
    url: './specimens/sikh_nanakshahi_rupee_obs.jpg',
    reverseUrl: './specimens/sikh_nanakshahi_rupee_rev.jpg',
    title: 'Sikh Empire Nanakshahi Silver Rupee',
    era: 'c. 1835 CE • Amritsar Mint',
    caption: 'Struck during Maharaja Ranjit Singh’s reign bearing invocations to Guru Nanak and Guru Gobind Singh'
  },
  {
    url: './specimens/datia_rupee_obs.jpg',
    reverseUrl: './specimens/datia_rupee_rev.jpg',
    title: 'Princely State of Datia Silver Rupee',
    era: 'c. 1860 CE • Central India',
    caption: 'Independent sovereign coinage struck by Bundelkhand princely mint with native Gurmukhi and Persian dies'
  },
  {
    url: './specimens/udaipur_dosti_london_rupee_obs.jpg',
    reverseUrl: './specimens/udaipur_dosti_london_rupee_rev.jpg',
    title: 'Mewar Udaipur "Dosti London" Silver Rupee',
    era: '1858 CE • Udaipur Mint',
    caption: 'Sovereign Rajput rupee inscribed with "Dosti London" commemorating sovereign treaties with Great Britain'
  }
];

export const ActThreeCinematic: React.FC<ActThreeCinematicProps> = ({
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
      id="act-3-colonial" 
      style={{
        position: 'relative',
        width: '100%',
        background: '#070709',
        overflow: 'hidden'
      }}
      data-act="3"
    >
      {/* Dynamic Maritime Sunset Atmosphere Backing */}
      <div className="act-three-maritime-ambient" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SCENE (~90VH — LIVING ARTWORK & SCULPTED 1757–1858)     */}
      {/* ========================================================================= */}
      <div ref={heroSceneRef} className="act-three-scene-90vh">
        <img 
          src="./acts/act_3_colonial.png" 
          alt="East India Company Maritime Trade and Banking"
          className={`act-three-scene-img ${isHeroInView ? 'act-hero-in-view' : 'act-hero-out-of-view'}`}
          loading="eager"
        />

        {/* Stationary Cinematic Dot Matrix Overlay */}
        <div className="hero-dot-matrix-overlay" aria-hidden="true" />

        {/* Localized Bottom Gradient Scrim */}
        <div className="act-three-scrim-localized" />

        {/* Atmospheric Floating Maritime Dust & Mist Overlay */}
        <div className="act-three-atmosphere-overlay" />

        {/* Overlaid Typography directly on painting */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
          
          {/* Sculpted Year Artwork Typography */}
          <div className="museum-sculpted-year colonial-gold">
            1757–1858
          </div>

          {/* Era Indicator Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            background: 'rgba(245, 158, 11, 0.25)',
            border: '1px solid rgba(245, 158, 11, 0.6)',
            backdropFilter: 'blur(12px)',
            marginBottom: '14px'
          }}>
            <Sparkles size={12} style={{ color: '#f59e0b' }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '11px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#fef08a', 
              fontWeight: 700 
            }}>
              GALLERY III • EAST INDIA COMPANY
            </span>
          </div>

          <h1 className="museum-sculpted-title">
            THE AGE OF TRADE
          </h1>

          <p className="museum-sculpted-sentence">
            The East India Company transformed India's monetary system through global commerce.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE HERO COIN GALLERY EXHIBIT (PURE MUSEUM SPOTLIGHT WITH ANNOTATIONS)  */}
      {/* ========================================================================= */}
      <div 
        ref={exhibitStageRef}
        className="museum-pedestal-stage museum-pedestal-wide" 
        style={{ position: 'relative', padding: '70px 24px 40px', overflow: 'visible', maxWidth: '1320px', width: '100%' }}
      >
        
        {/* Top-Down Spotlight Beam with Warm Amber/Gold Tinge */}
        <div className="museum-spotlight-beam colonial-spotlight" />

        {/* Exhibit Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#f59e0b',
            marginBottom: '8px'
          }}>
            <Sparkles size={12} style={{ color: '#f59e0b' }} />
            <span>PRIMARY EXHIBIT • CALCUTTA & MURSHIDABAD STEAM MINT</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 10px'
          }}>
            East India Company Murshidabad Sicca Rupee
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Machine-milled sterling silver currency struck under the 19-San Sicca formula to end centuries of arbitrary batta exchange manipulation.
          </p>
        </div>

        {/* Pure Centerpiece Layout: Left Annotations | Center 3D Coin | Right Annotations */}
        <div className={`museum-mode-core-layout ${isExhibitInView ? 'exhibit-in-view' : ''}`} style={{ margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          {/* Left Annotation Column */}
          <div className="museum-mode-pins-col">
            <div className="museum-annotation-card museum-annotation-corner-tl">
              <div className="museum-annotation-tag" style={{ color: '#fef08a' }}>
                <Coins size={13} style={{ color: '#f59e0b' }} />
                <span>19-San Sicca Standard</span>
              </div>
              <p className="museum-annotation-desc">
                To halt corrupt batta deductions on aging coin, Lord Cornwallis froze the regnal year at 19-San, establishing an invariant silver standard.
              </p>
            </div>

            <div className="museum-annotation-card museum-annotation-corner-bl">
              <div className="museum-annotation-tag" style={{ color: '#fef08a' }}>
                <ShieldCheck size={13} style={{ color: '#f59e0b' }} />
                <span>Presidency Currency Triad</span>
              </div>
              <p className="museum-annotation-desc">
                Autonomous mints in Bengal, Bombay, and Madras unified under the landmark Coinage Act of 1835 into a single imperial standard.
              </p>
            </div>
          </div>

          {/* Center Pure 3D Interactive Coin (Frameless, Pristine WebGL with generous breathing room) */}
          <div style={{ width: '100%', maxWidth: '520px', height: '520px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
            <CoinStage3D coin={ACT_THREE_COIN} height={520} variant="pure" />
          </div>

          {/* Right Annotation Column */}
          <div className="museum-mode-pins-col">
            <div className="museum-annotation-card museum-annotation-corner-tr">
              <div className="museum-annotation-tag" style={{ color: '#fef08a' }}>
                <Scale size={13} style={{ color: '#f59e0b' }} />
                <span>Coinage Act of 1835</span>
              </div>
              <p className="museum-annotation-desc">
                Act XVII of 1835 swept away over 900 regional rupees, establishing 180 troy grains (11.66g) as sovereign tender nationwide.
              </p>
            </div>

            <div className="museum-annotation-card museum-annotation-corner-br">
              <div className="museum-annotation-tag" style={{ color: '#fef08a' }}>
                <Scroll size={13} style={{ color: '#f59e0b' }} />
                <span>Early Promissory Paper</span>
              </div>
              <p className="museum-annotation-desc">
                The Bank of Hindostan (1770) introduced demand promissory notes to eliminate perilous highway robberies of heavy silver chests.
              </p>
            </div>
          </div>

        </div>

        {/* Tactile drag hint & Numismatic Benchmark Pill Bar */}
        <div style={{ textAlign: 'center', marginTop: '28px', position: 'relative', zIndex: 10 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.45)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '16px'
          }}>
            Drag to rotate 360° in museum space
          </div>

          <div 
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px',
              padding: '8px 24px',
              borderRadius: '9999px',
              background: 'rgba(245, 158, 11, 0.06)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <span>Specimen: <strong style={{ color: '#fef3c7' }}>Murshidabad Sicca Rupee</strong></span>
            <span>•</span>
            <span>Standard: <strong style={{ color: '#fff' }}>180 Troy Grains (11.66g)</strong></span>
            <span>•</span>
            <span>Assay: <strong style={{ color: '#f59e0b' }}>98% Pure Sterling Silver</strong></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CURATORIAL SANDSTONE / PARCHMENT PLAQUE (< 120 WORDS)                  */}
      {/* ========================================================================= */}
      <div className="museum-gallery-plaque museum-gallery-plaque-colonial">
        <div className="museum-plaque-title" style={{ color: '#f59e0b' }}>
          <Compass size={14} style={{ color: '#f59e0b' }} />
          <span>CURATORIAL ARCHIVE • FORT WILLIAM TREASURY (1793 CE)</span>
        </div>

        <p className="museum-plaque-text">
          Following the 1757 Battle of Plassey and the 1765 Diwani of Bengal, the East India Company inherited an empire of fragmented currencies. Over 900 distinct coin varieties circulated with arbitrary batta exchange discounts.
        </p>

        <p className="museum-plaque-text" style={{ marginTop: '14px' }}>
          To finance the export of silk, muslin, and saltpetre, the Company introduced standardized Sicca rupees, established Presidency banks, and issued India's earliest demand promissory notes. Long-distance maritime trade transformed silver bullion into a unified medium of global commerce.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
          {['Lord Cornwallis', 'Warren Hastings', 'Prince Dwarkanath Tagore', 'Lord William Bentinck'].map((figure, fIdx) => (
            <span 
              key={fIdx}
              style={{
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.22)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#fef3c7'
              }}
            >
              {figure}
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIGNATURE INTERACTION: THE MARITIME TRADE ROUTE EXPLORER               */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '40px auto 60px',
          padding: '0 32px'
        }}
      >
        <TradeRouteExplorer />
      </div>

      {/* ========================================================================= */}
      {/* 5. MOUNTED VITRINE ARTIFACT SHOWCASE                                      */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '40px auto 60px',
          padding: '0 32px'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.14em', 
            color: '#fef08a' 
          }}>
            <Layers size={14} style={{ color: '#f59e0b' }} />
            <span>NUMISMATIC SPECIMEN VITRINE</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>
            Select specimen to inspect
          </span>
        </div>

        {/* Horizontal Vitrine Row */}
        <div 
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollbarWidth: 'thin'
          }}
        >
          {ACT_THREE_ARTIFACTS.map((artifact, aIdx) => (
            <NumismaticVitrineItem
              key={aIdx}
              artifact={artifact}
              className="colonial-vitrine"
              onInspect={(art) => {
                const item = typeof art === 'string' ? artifact : art;
                onSelectSpecimenImage?.(
                  item.url,
                  item.title,
                  item.reverseUrl,
                  item.era,
                  item.caption
                );
              }}
            />
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. HIGHLIGHTED HISTORICAL INSIGHT (PREMIUM MUSEUM QUOTE)                  */}
      {/* ========================================================================= */}
      <div 
        className="act-three-quote-box"
        style={{
          maxWidth: '860px',
          margin: '20px auto 60px',
          padding: '28px 36px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(38, 26, 14, 0.45) 0%, rgba(10, 10, 16, 0.85) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
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
          background: 'rgba(245, 158, 11, 0.15)', 
          border: '1px solid rgba(245, 158, 11, 0.4)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexShrink: 0 
        }}>
          <Quote size={24} style={{ color: '#f59e0b' }} />
        </div>
        <div>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '10px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.14em', 
            color: '#fef08a', 
            display: 'block', 
            marginBottom: '6px' 
          }}>
            Monetary Continuum • Cambridge Economic History of India
          </span>
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '15px', 
            fontStyle: 'italic', 
            color: 'rgba(255, 255, 255, 0.9)', 
            margin: 0, 
            lineHeight: 1.7 
          }}>
            "The East India Company introduced financial systems that reshaped India's economy long before the British Crown assumed direct rule."
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. TRANSFORMATIVE SCROLL TRANSITION INTO ACT IV                          */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto 80px',
          padding: '0 32px'
        }}
      >
        <div className="museum-era-transition-bridge colonial-bridge">
          <div>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#f59e0b', 
              display: 'block', 
              marginBottom: '4px' 
            }}>
              The Sovereign Continuum Advances
            </span>
            <p className="museum-bridge-lead">
              The maritime trade routes slowly fade as the sepia tones shift toward industrial steel and monochrome slate. Distant harbour waves yield to the rhythmic hum of mechanical printing presses and the founding of the Reserve Bank of India...
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigateToNextAct?.('act-4-pre-independence');
            }}
            className="museum-bridge-btn colonial-bridge-btn"
          >
            <span>Enter Act IV: The British Raj & The RBI</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </section>
  );
};
