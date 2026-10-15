import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Eye, 
  Scale, 
  Printer, 
  Quote,
  Building2,
  Lock,
  Landmark,
  Coins
} from 'lucide-react';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { BanknotePrintingPress } from './BanknotePrintingPress';
import { NumismaticVitrineItem, VitrineArtifact } from './NumismaticVitrineItem';
import { sound } from '../../audio';

interface ActFourCinematicProps {
  onSelectSpecimenImage?: (
    url: string,
    title: string,
    reverseUrl?: string,
    era?: string,
    caption?: string
  ) => void;
  onNavigateToNextAct?: (actId: string) => void;
}

const ACT_FOUR_COIN: CoinSpecimen3D = {
  id: 'george-vi-rupee-1947',
  name: 'King George VI Pure Nickel Rupee',
  rulerOrEra: 'British Raj • Final Imperial Issue',
  dateStr: '1947 CE (Bombay Mint)',
  metal: 'silver',
  obverseImage: './specimens/george_vi_1947_obs.png',
  reverseImage: './specimens/george_vi_1947_rev.png',
  purity: '100% Pure Nickel (Standardized Alloy)',
  weightGrams: '11.66 grams (180 Grains)',
  mintLocation: 'Bombay / Calcutta Royal Mint'
};

const ACT_FOUR_ARTIFACTS: VitrineArtifact[] = [
  {
    url: './specimens/george_vi_1947_obs.png',
    reverseUrl: './specimens/george_vi_1947_rev.png',
    title: 'King George VI 1947 Pure Nickel Rupee',
    era: '1947 CE • Eve of Independence',
    caption: 'The final colonial coin struck before the sovereign tricolor was hoisted on August 15, 1947'
  },
  {
    url: './specimens/george_vi_10_rupees_obverse.jpg',
    reverseUrl: './specimens/george_vi_10_rupees_reverse.jpg',
    title: 'Reserve Bank of India King George VI 10 Rupees',
    era: '1938 CE • Nasik Security Press',
    caption: 'Profile portrait of George VI with RBI Governor signature on obverse and sailing dhow vignette on reverse'
  },
  {
    url: './specimens/george_vi_2_rupees_obverse.jpg',
    reverseUrl: './specimens/george_vi_2_rupees_reverse.jpg',
    title: 'Reserve Bank of India 2 Rupees Banknote',
    era: '1943 CE • Wartime Issue',
    caption: 'Distinctive small-format 2-rupee denomination engineered during WWII paper shortages with royal watermark'
  },
  {
    url: './specimens/rbi_burma_rangoon_5_rupees_obv.jpg',
    reverseUrl: './specimens/rbi_burma_rangoon_5_rupees_rev.jpg',
    title: 'RBI Military Administration Burma 5 Rupees',
    era: '1945 CE • Rangoon Hub',
    caption: 'Reserve Bank of India notes overprinted "Military Administration of Burma / Legal Tender in Burma Only"'
  },
  {
    url: './specimens/indo_portuguese_5_tangas_obs.jpg',
    reverseUrl: './specimens/indo_portuguese_5_tangas_rev.jpg',
    title: 'Estado da Índia 5 Tangas Coin (Goa)',
    era: '1934 CE • Indo-Portuguese Mint',
    caption: 'Portuguese colonial currency featuring national shield and castles circulated across Goa, Daman, and Diu'
  },
  {
    url: './specimens/victoria_1862_rupee.webp',
    reverseUrl: './specimens/victoria_uniface_note.jpg',
    title: 'Queen Victoria 1862 Imperial Silver Rupee',
    era: '1862 CE • Royal Mint',
    caption: 'First uniform imperial coinage struck after the British Crown assumed direct governance in 1858'
  }
];

export const ActFourCinematic: React.FC<ActFourCinematicProps> = ({
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
      id="act-4-pre-independence" 
      style={{
        position: 'relative',
        width: '100%',
        background: '#070709',
        overflow: 'hidden'
      }}
      data-act="4"
    >
      {/* Industrial Monochrome Steel Ambient Backing */}
      <div className="act-four-industrial-ambient" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SCENE (~90VH — LIVING ARTWORK & SCULPTED 1935)          */}
      {/* ========================================================================= */}
      <div ref={heroSceneRef} className="act-four-scene-90vh">
        <img 
          src="./acts/act_4_raj.png" 
          alt="British Raj and the Reserve Bank of India 1935"
          className={`act-four-scene-img ${isHeroInView ? 'act-hero-in-view' : 'act-hero-out-of-view'}`}
          loading="eager"
        />

        {/* Stationary Cinematic Dot Matrix Overlay */}
        <div className="hero-dot-matrix-overlay" aria-hidden="true" />

        {/* Localized Bottom Gradient Scrim */}
        <div className="act-four-scrim-localized" />

        {/* Factory Steam and Industrial Atmosphere Overlay */}
        <div className="act-four-atmosphere-overlay" />

        {/* Overlaid Typography directly on painting */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
          
          {/* Sculpted 1935 Artwork Typography */}
          <div className="museum-sculpted-year raj-silver">
            1935
          </div>

          {/* Era Indicator Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            background: 'rgba(56, 189, 248, 0.25)',
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
              color: '#e0f2fe', 
              fontWeight: 700 
            }}>
              GALLERY IV • THE BRITISH RAJ
            </span>
          </div>

          <h1 className="museum-sculpted-title">
            THE RESERVE BANK OF INDIA
          </h1>

          <p className="museum-sculpted-sentence">
            Modern banking institutions transformed India's currency into a national financial system.
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
        
        {/* Top-Down Spotlight Beam with Cool Steel/Cyan Tinge */}
        <div className="museum-spotlight-beam raj-spotlight" />

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
            color: '#38bdf8',
            marginBottom: '8px'
          }}>
            <Sparkles size={12} style={{ color: '#38bdf8' }} />
            <span>PRIMARY EXHIBIT • BOMBAY & CALCUTTA ROYAL MINT</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 10px'
          }}>
            King George VI 1947 Imperial Rupee
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            The culminating imperial coinage struck on the eve of Independence in 100% pure nickel, bearing the British monarch's final Indian title.
          </p>
        </div>

        {/* Pure Centerpiece Layout: Left Annotations | Center 3D Coin | Right Annotations */}
        <div className={`museum-mode-core-layout ${isExhibitInView ? 'exhibit-in-view' : ''}`} style={{ margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          {/* Left Annotation Column */}
          <div className="museum-mode-pins-col">
            <div className="museum-annotation-card museum-annotation-corner-tl">
              <div className="museum-annotation-tag" style={{ color: '#38bdf8' }}>
                <Printer size={13} style={{ color: '#0284c7' }} />
                <span>Nasik Security Press (1928)</span>
              </div>
              <p className="museum-annotation-desc">
                Ended century-long reliance on British printers, deploying precision dry-offset and intaglio steel-die printing in Maharashtra.
              </p>
            </div>

            <div className="museum-annotation-card museum-annotation-corner-bl">
              <div className="museum-annotation-tag" style={{ color: '#38bdf8' }}>
                <Lock size={13} style={{ color: '#0284c7' }} />
                <span>Paper Currency Act of 1861</span>
              </div>
              <p className="museum-annotation-desc">
                Terminated private bank issues and established the Government of India's sovereign monopoly of legal tender paper notes.
              </p>
            </div>
          </div>

          {/* Center Pure 3D Interactive Coin (Frameless, Pristine WebGL with generous breathing room) */}
          <div style={{ width: '100%', maxWidth: '520px', height: '520px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
            <CoinStage3D coin={ACT_FOUR_COIN} height={520} variant="pure" />
          </div>

          {/* Right Annotation Column */}
          <div className="museum-mode-pins-col">
            <div className="museum-annotation-card museum-annotation-corner-tr">
              <div className="museum-annotation-tag" style={{ color: '#38bdf8' }}>
                <Building2 size={13} style={{ color: '#0284c7' }} />
                <span>Reserve Bank of India (1935)</span>
              </div>
              <p className="museum-annotation-desc">
                Commenced operations on April 1, 1935, taking over sole currency issuance and establishing modern central banking.
              </p>
            </div>

            <div className="museum-annotation-card museum-annotation-corner-br">
              <div className="museum-annotation-tag" style={{ color: '#38bdf8' }}>
                <Coins size={13} style={{ color: '#0284c7' }} />
                <span>The 1917 Silver Crisis</span>
              </div>
              <p className="museum-annotation-desc">
                WWI hoarding forced the emergency issuance of the One Rupee note on November 30, 1917, breaking pure bullion reliance.
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
              background: 'rgba(56, 189, 248, 0.06)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <span>Specimen: <strong style={{ color: '#e0f2fe' }}>King George VI Nickel Rupee</strong></span>
            <span>•</span>
            <span>Standard: <strong style={{ color: '#fff' }}>180 Troy Grains (11.66g)</strong></span>
            <span>•</span>
            <span>Alloy: <strong style={{ color: '#38bdf8' }}>100% Pure Nickel (Standardized)</strong></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CURATORIAL SLATE / STEEL PLAQUE (< 120 WORDS)                          */}
      {/* ========================================================================= */}
      <div className="museum-gallery-plaque museum-gallery-plaque-raj">
        <div className="museum-plaque-title" style={{ color: '#38bdf8' }}>
          <Landmark size={14} style={{ color: '#0284c7' }} />
          <span>CURATORIAL ARCHIVE • RESERVE BANK OF INDIA (1935 CE)</span>
        </div>

        <p className="museum-plaque-text">
          With the Crown assuming governance in 1858, piecemeal merchant credit gave way to monolithic state finance. The Paper Currency Act of 1861 established a government monopoly, debuting legendary uniface Victoria banknotes.
        </p>

        <p className="museum-plaque-text" style={{ marginTop: '14px' }}>
          In 1928, the India Security Press at Nasik ended foreign printing reliance. Amid the Great Depression, on April 1, 1935, the Reserve Bank of India commenced operations as the sovereign custodian of currency, uniting monetary policy under one institutional roof.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
          {['James Wilson', 'Sir Osborne Smith', 'Sir James Taylor', 'Sir C.D. Deshmukh'].map((figure, fIdx) => (
            <span 
              key={fIdx}
              style={{
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.22)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#e0f2fe'
              }}
            >
              {figure}
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIGNATURE INTERACTION: THE MASTER BANKNOTE PRINTING PRESS              */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '40px auto 60px',
          padding: '0 32px'
        }}
      >
        <BanknotePrintingPress />
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
            color: '#38bdf8' 
          }}>
            <Layers size={14} style={{ color: '#0284c7' }} />
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
          {ACT_FOUR_ARTIFACTS.map((artifact, aIdx) => (
            <NumismaticVitrineItem
              key={aIdx}
              artifact={artifact}
              className="raj-vitrine"
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
        className="act-four-quote-box"
        style={{
          maxWidth: '860px',
          margin: '20px auto 60px',
          padding: '28px 36px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.45) 0%, rgba(10, 10, 16, 0.85) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
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
          background: 'rgba(56, 189, 248, 0.15)', 
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
            Institutional Mandate • Preamble to the Reserve Bank of India Act (1934)
          </span>
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '15px', 
            fontStyle: 'italic', 
            color: 'rgba(255, 255, 255, 0.9)', 
            margin: 0, 
            lineHeight: 1.7 
          }}>
            "The Reserve Bank of India was established in 1935, laying the foundation for India's modern monetary system, taking over the sovereign responsibility of currency issue from the Government."
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. TRANSFORMATIVE SCROLL TRANSITION INTO ACT V                          */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto 80px',
          padding: '0 32px'
        }}
      >
        <div className="museum-era-transition-bridge raj-bridge">
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
              The Sovereign Continuum Advances
            </span>
            <p className="museum-bridge-lead">
              The printed monochrome banknote slowly gains vibrant tricolor saffron and green hues. The British imperial crown fades away as the Lion Capital of Ashoka rises in golden light, ushering in the Republic of India...
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigateToNextAct?.('act-5-early-republic');
            }}
            className="museum-bridge-btn raj-bridge-btn"
          >
            <span>Enter Act V: Dawn of the Republic</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </section>
  );
};
