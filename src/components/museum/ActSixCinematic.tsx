import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Eye, 
  Scale, 
  Quote,
  Calculator,
  Tractor,
  Rocket,
  Coins
} from 'lucide-react';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { DecimalConverter } from './DecimalConverter';
import { NumismaticVitrineItem, VitrineArtifact } from './NumismaticVitrineItem';
import { sound } from '../../audio';

interface ActSixCinematicProps {
  onSelectSpecimenImage?: (
    url: string,
    title: string,
    reverseUrl?: string,
    era?: string,
    caption?: string
  ) => void;
  onNavigateToNextAct?: (actId: string) => void;
}

const ACT_SIX_COIN: CoinSpecimen3D = {
  id: 'decimal-1957-ten-naye-paise',
  name: '1957 First Decimal 10 Naye Paise',
  rulerOrEra: 'Modern India • Decimal Reform Issue',
  dateStr: '1957 CE (Bombay Mint)',
  metal: 'silver',
  obverseImage: './specimens/decimal_1957_obs_hd.png',
  reverseImage: './specimens/decimal_1957_rev_hd.png',
  purity: 'Cupro-Nickel Alloy (75% Cu, 25% Ni)',
  weightGrams: '5.00 grams (Scalloped Flan)',
  mintLocation: 'Bombay / Calcutta Mints'
};

const ACT_SIX_ARTIFACTS: VitrineArtifact[] = [
  {
    url: './specimens/decimal_1957_obs_hd.png',
    reverseUrl: './specimens/decimal_1957_rev_hd.png',
    title: 'Inaugural 1957 10 Naye Paise Coin',
    era: '1957 CE • Indian Coinage Act',
    caption: 'First base-10 coin struck in cupro-nickel with eight-scalloped contour for easy tactile recognition'
  },
  {
    url: './specimens/tractor_farm_5_rupees_obverse.png',
    reverseUrl: './specimens/tractor_farm_5_rupees_reverse.png',
    title: 'Green Revolution ₹5 Tractor Farm Note',
    era: '1975 CE • Agricultural Self-Reliance',
    caption: 'Legendary farm scene of a tractor plowing fields against a rising sun, celebrating high-yield crops'
  },
  {
    url: './specimens/aryabhata_2_rupees_obverse.jpg',
    reverseUrl: './specimens/aryabhata_2_rupees_reverse.jpg',
    title: 'Aryabhata Space Satellite ₹2 Note',
    era: '1975 CE • Scientific Modernity',
    caption: 'Marked India’s entry into outer space with its first satellite launched by ISRO atop a Kosmos-3M rocket'
  },
  {
    url: './specimens/sagar_samrat_1_rupee_obverse.jpg',
    reverseUrl: './specimens/sagar_samrat_1_rupee_reverse.jpg',
    title: 'Sagar Samrat Offshore Oil Rig One Rupee Coin',
    era: '1982 CE • Heavy Industrialization',
    caption: 'Commemorating Bombay High deep-sea crude extraction that powered domestic industrial energy independence'
  },
  {
    url: './specimens/konark_wheel_20_rupees_obverse.png',
    reverseUrl: './specimens/konark_wheel_20_rupees_reverse.png',
    title: 'Konark Sun Wheel ₹20 Banknote',
    era: '1972 CE • Architectural Heritage',
    caption: 'Intricate 13th-century stone chariot wheel from the Konark Sun Temple in Odisha'
  },
  {
    url: './specimens/parliament_50_rupees_obverse.png',
    reverseUrl: './specimens/parliament_50_rupees_reverse.png',
    title: 'Sansad Bhavan ₹50 Indian Parliament Note',
    era: '1981 CE • Sovereign Democracy',
    caption: 'Majestic circular architectural façade of the Indian Parliament building in New Delhi'
  }
];

export const ActSixCinematic: React.FC<ActSixCinematicProps> = ({
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
      id="act-6-decimal" 
      style={{
        position: 'relative',
        width: '100%',
        background: '#070709',
        overflow: 'hidden'
      }}
      data-act="6"
    >
      {/* Industrial Emerald & Steel Ambient Backing */}
      <div className="act-six-industrial-ambient" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SCENE (~90VH — LIVING ARTWORK & SCULPTED 1957)          */}
      {/* ========================================================================= */}
      <div ref={heroSceneRef} className="act-six-scene-90vh">
        <img 
          src="./acts/act_6_decimal.png" 
          alt="The Decimal Revolution and Industrial India 1957"
          className={`act-six-scene-img ${isHeroInView ? 'act-hero-in-view' : 'act-hero-out-of-view'}`}
          loading="eager"
        />

        {/* Stationary Cinematic Dot Matrix Overlay */}
        <div className="hero-dot-matrix-overlay" aria-hidden="true" />

        {/* Localized Bottom Gradient Scrim */}
        <div className="act-six-scrim-localized" />

        {/* Agricultural Amber and Steel Atmosphere Overlay */}
        <div className="act-six-atmosphere-overlay" />

        {/* Overlaid Typography directly on painting */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '920px' }}>
          
          {/* Sculpted 1957 Artwork Typography */}
          <div className="museum-sculpted-year decimal-green">
            1957
          </div>

          {/* Era Indicator Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.22)',
            border: '1px solid rgba(16, 185, 129, 0.6)',
            backdropFilter: 'blur(12px)',
            marginBottom: '14px'
          }}>
            <Sparkles size={12} style={{ color: '#10b981' }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '11px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#6ee7b7' 
            }}>
              ACT VI • DECIMALISATION & MODERN INDIA
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
            THE DECIMAL REVOLUTION
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
            India simplified its currency while embracing rapid industrial growth.
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
            <span>ERA: <strong>1957–1975 CE</strong></span>
            <span>•</span>
            <span>METRIC: <strong style={{ color: '#10b981' }}>100 NAYE PAISE</strong></span>
            <span>•</span>
            <span>PILLARS: <strong style={{ color: '#0ea5e9' }}>SCIENCE • INDUSTRY • AGRI</strong></span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DIRECT MUSEUM PEDESTAL EXHIBIT FLOOR (UNOBSTRUCTED 520PX 3D COIN)       */}
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
          background: 'radial-gradient(ellipse at 50% 20%, rgba(16, 185, 129, 0.16) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 80%)',
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
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            marginBottom: '10px'
          }}>
            <Coins size={12} style={{ color: '#10b981' }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#6ee7b7' 
            }}>
              METRIC NUMISMATIC BENCHMARK
            </span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 3.4vw, 42px)',
            color: '#fff',
            margin: '0 0 8px 0',
            letterSpacing: '-0.01em'
          }}>
            1957 Inaugural 10 Naye Paise
          </h3>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            The iconic scalloped coin that made base-10 metric arithmetic tangible for hundreds of millions of citizens across bazaars and schoolrooms.
          </p>
        </div>

        {/* 3D Coin Stage with Corner Flying Metric Annotation Cards */}
        <div className="museum-pedestal-stage museum-pedestal-wide" style={{ position: 'relative', zIndex: 2, maxWidth: '1320px', width: '100%', overflow: 'visible' }}>
          <div className={`museum-mode-core-layout ${isExhibitInView ? 'exhibit-in-view' : ''}`} style={{ margin: '0 auto', position: 'relative', zIndex: 10 }}>
            
            {/* Left Annotation Column */}
            <div className="museum-mode-pins-col">
              <div className="museum-annotation-card museum-annotation-corner-tl">
                <div className="museum-annotation-tag" style={{ color: '#10b981' }}>
                  <Calculator size={13} style={{ color: '#10b981' }} />
                  <span>Metric Paradigm (1 Rupee = 100 Naye Paise)</span>
                </div>
                <p className="museum-annotation-desc">
                  Replaced the complex 1:16:64:192 ratios with base-10 mathematics on April 1, 1957. The prefix "Naya" was retained until 1964.
                </p>
              </div>

              <div className="museum-annotation-card museum-annotation-corner-bl">
                <div className="museum-annotation-tag" style={{ color: '#0ea5e9' }}>
                  <Sparkles size={13} style={{ color: '#0ea5e9' }} />
                  <span>Tactile Eight-Scalloped Rim</span>
                </div>
                <p className="museum-annotation-desc">
                  Designed with 8 undulating rounded scallops so visually impaired citizens and rural traders could instantly tell it apart in low light.
                </p>
              </div>
            </div>

            {/* Center Stage: Interactive 3D Coin Object */}
            <div className="museum-pedestal-centerpiece" style={{ width: '100%', maxWidth: '520px', height: '520px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <CoinStage3D coin={ACT_SIX_COIN} height={520} variant="pure" />
            </div>

            {/* Right Annotation Column */}
            <div className="museum-mode-pins-col">
              <div className="museum-annotation-card museum-annotation-corner-tr">
                <div className="museum-annotation-tag" style={{ color: '#10b981' }}>
                  <Scale size={13} style={{ color: '#10b981' }} />
                  <span>Cupro-Nickel Metallurgy (5.00g)</span>
                </div>
                <p className="museum-annotation-desc">
                  Struck in 75% Copper and 25% Nickel alloy, later transitioning to lightweight aluminum as global metal prices surged in the 1960s.
                </p>
              </div>

              <div className="museum-annotation-card museum-annotation-corner-br">
                <div className="museum-annotation-tag" style={{ color: '#10b981' }}>
                  <Eye size={13} style={{ color: '#10b981' }} />
                  <span>Sarnath Lion Capital with Bharat</span>
                </div>
                <p className="museum-annotation-desc">
                  Obverse features the National Emblem with BHARAT in Hindi on the left and INDIA in English on the right.
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
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.28)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <span>Standard: <strong style={{ color: '#6ee7b7' }}>10 Naye Paise (1/10 Rupee)</strong></span>
            <span>•</span>
            <span>Conversion: <strong style={{ color: '#fff' }}>Approx. 1.6 Annas</strong></span>
            <span>•</span>
            <span>Alloy: <strong style={{ color: '#0ea5e9' }}>Cupro-Nickel Flan</strong></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CURATORIAL SLATE / INDUSTRIAL PLAQUE (< 120 WORDS)                      */}
      {/* ========================================================================= */}
      <div className="museum-gallery-plaque museum-gallery-plaque-decimal">
        <div className="museum-plaque-title" style={{ color: '#10b981' }}>
          <Tractor size={14} style={{ color: '#10b981' }} />
          <span>CURATORIAL ARCHIVE • THE DECIMAL REVOLUTION (1957–1975 CE)</span>
        </div>

        <p className="museum-plaque-text">
          On April 1, 1957, India enacted the Indian Coinage Amendment Act, bringing centuries of fractional 16-anna arithmetic to a close. The Rupee was divided into 100 Naye Paise, creating a streamlined base-10 system for modern industrial planning.
        </p>

        <p className="museum-plaque-text" style={{ marginTop: '14px' }}>
          As Five-Year Plans forged heavy industries, currency celebrated sovereign self-reliance: tractors plowing at dawn on the ₹5 note for the Green Revolution, the Aryabhata satellite on ₹2 for the space age, and the Sagar Samrat offshore oil rig on ₹1.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
          {['Lal Bahadur Shastri', 'Indira Gandhi', 'C. Subramaniam', 'Dr. Vikram Sarabhai'].map((figure, fIdx) => (
            <span 
              key={fIdx}
              style={{
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.28)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#6ee7b7'
              }}
            >
              {figure}
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIGNATURE INTERACTION: DECIMAL CONVERSION EXPERIENCE                    */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '40px auto 60px',
          padding: '0 32px'
        }}
      >
        <DecimalConverter />
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
            color: '#10b981' 
          }}>
            <Layers size={14} style={{ color: '#10b981' }} />
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
          {ACT_SIX_ARTIFACTS.map((artifact, aIdx) => (
            <NumismaticVitrineItem
              key={aIdx}
              artifact={artifact}
              className="decimal-vitrine"
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
        className="act-six-quote-box"
        style={{
          maxWidth: '860px',
          margin: '20px auto 60px',
          padding: '28px 36px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.45) 0%, rgba(10, 10, 16, 0.85) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
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
          background: 'rgba(16, 185, 129, 0.15)', 
          border: '1px solid rgba(16, 185, 129, 0.4)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexShrink: 0 
        }}>
          <Quote size={24} style={{ color: '#10b981' }} />
        </div>
        <div>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '10px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.14em', 
            color: '#10b981', 
            display: 'block', 
            marginBottom: '6px' 
          }}>
            Nationwide Radio Broadcast • All India Radio (April 1957)
          </span>
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '15px', 
            fontStyle: 'italic', 
            color: 'rgba(255, 255, 255, 0.9)', 
            margin: 0, 
            lineHeight: 1.7 
          }}>
            "From the first of April 1957, the Rupee will be divided into 100 units, each called a Naya Paisa. Let the whole nation embrace this rational metric order."
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. TRANSFORMATIVE SCROLL TRANSITION INTO ACT VII                         */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto 80px',
          padding: '0 32px'
        }}
      >
        <div className="museum-era-transition-bridge decimal-bridge">
          <div>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#10b981', 
              display: 'block', 
              marginBottom: '4px' 
            }}>
              Old Coins Fade • Modern Security Minting Begins
            </span>
            <p className="museum-bridge-lead">
              The old metallic coins fade into collectors’ albums. Bright magenta, lavender, and stone grey intaglio inks emerge as world-class security fibers, watermark portraits, and the sovereign ₹ glyph inaugurate the Modern Rupee...
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigateToNextAct?.('act-7-modern');
            }}
            className="museum-bridge-btn decimal-bridge-btn"
          >
            <span>Enter Act VII: The Modern Rupee</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </section>
  );
};
