import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Eye, 
  Scale, 
  Quote,
  Network,
  Cpu,
  Lock,
  Coins
} from 'lucide-react';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { DigitalRupeeNetwork } from './DigitalRupeeNetwork';
import { NumismaticVitrineItem, VitrineArtifact } from './NumismaticVitrineItem';
import { sound } from '../../audio';

interface ActEightCinematicProps {
  onSelectSpecimenImage?: (
    url: string,
    title: string,
    reverseUrl?: string,
    era?: string,
    caption?: string
  ) => void;
  onNavigateToNextAct?: (actId: string) => void;
}

const ACT_EIGHT_COIN: CoinSpecimen3D = {
  id: 'sovereign-digital-rupee-token',
  name: 'Reserve Bank Sovereign Digital Rupee (e₹)',
  rulerOrEra: 'Present & Future • Central Bank Digital Currency (CBDC)',
  dateStr: '2022 & Beyond (Reserve Bank of India)',
  metal: 'digital',
  obverseImage: './specimens/digital_rupee_obverse_hd.png',
  reverseImage: './specimens/digital_rupee_reverse_hd.png',
  purity: 'Cryptographic Sovereign Token',
  weightGrams: 'Zero Friction • 100% Sovereign Liability',
  mintLocation: 'Reserve Bank of India Distributed Ledger'
};

const ACT_EIGHT_ARTIFACTS: VitrineArtifact[] = [
  {
    url: './specimens/100RS_Digital_Rupee.png',
    title: '100 Digital Rupee (e₹) Sovereign Token',
    era: '2022 CE • Retail CBDC Pilot',
    caption: 'Official sovereign digital token carrying unique cryptographic serial numbers backed 1:1 by physical banknotes'
  },
  {
    url: './specimens/2000RS_Digital_Rupee.png',
    title: '2,000 Digital Rupee Wholesale Token',
    era: '2022 CE • High-Value Settlement',
    caption: 'Used in interbank secondary market transactions to eliminate settlement risk and reduce financial market friction'
  },
  {
    url: './specimens/500RS_Digital_Rupee.png',
    title: '500 Digital Rupee Token Specimen',
    era: '2023 CE • Non-Custodial Vault',
    caption: 'Transacted peer-to-peer and merchant-to-peer via smartphones without intermediary commercial bank routing fees'
  },
  {
    url: './specimens/digital_rupee_obverse.svg',
    reverseUrl: './specimens/digital_rupee_reverse.svg',
    title: '1 Rupee Sovereign Digital Token (e₹ 1)',
    era: '2022 CE • Sovereign Prototype',
    caption: 'The foundational 1-Rupee sovereign CBDC digital token featuring Ashoka Lion capital obverse and cryptographic reverse.'
  },
  {
    url: './specimens/50p_Digital_Rupee.png',
    title: '50 Paise Sovereign Fractional Digital Token',
    era: '2023 CE • Micro-Transaction',
    caption: 'Demonstrating complete continuity: even fractional decimal paise are preserved in sovereign digital architecture'
  }
];

export const ActEightCinematic: React.FC<ActEightCinematicProps> = ({
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
      id="act-8-digital" 
      style={{
        position: 'relative',
        width: '100%',
        background: '#070709',
        overflow: 'hidden'
      }}
      data-act="8"
    >
      {/* Quantum Cyber Indigo Ambient Backing */}
      <div className="act-eight-cyber-ambient" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SCENE (~90VH — LIVING ARTWORK & SCULPTED ERA)           */}
      {/* ========================================================================= */}
      <div ref={heroSceneRef} className="act-eight-scene-90vh">
        <img 
          src="./acts/act_8_digital.png" 
          alt="The Digital Rupee CBDC Future Sovereign Currency"
          className={`act-eight-scene-img ${isHeroInView ? 'act-hero-in-view' : 'act-hero-out-of-view'}`}
          loading="eager"
        />

        {/* Stationary Cinematic Dot Matrix Overlay */}
        <div className="hero-dot-matrix-overlay" aria-hidden="true" />

        {/* Localized Bottom Gradient Scrim */}
        <div className="act-eight-scrim-localized" />

        {/* Electric Blue and Indigo Atmosphere Overlay */}
        <div className="act-eight-atmosphere-overlay" />

        {/* Overlaid Typography directly on painting */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '920px' }}>
          
          {/* Sculpted Era Artwork Typography */}
          <div className="museum-sculpted-year digital-indigo">
            PRESENT & BEYOND
          </div>

          {/* Era Indicator Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.22)',
            border: '1px solid rgba(129, 140, 248, 0.6)',
            backdropFilter: 'blur(12px)',
            marginBottom: '14px'
          }}>
            <Sparkles size={12} style={{ color: '#818cf8' }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '11px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#c7d2fe' 
            }}>
              ACT VIII • THE DIGITAL RUPEE
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
            DIGITAL RUPEE
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
            India enters the era of programmable sovereign digital money.
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
            <span>ERA: <strong>PRESENT & FUTURE</strong></span>
            <span>•</span>
            <span>SPECIMEN: <strong style={{ color: '#818cf8' }}>e₹ CENTRAL BANK TOKEN</strong></span>
            <span>•</span>
            <span>PARADIGM: <strong style={{ color: '#38bdf8' }}>PROGRAMMABLE SOVEREIGN CASH</strong></span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DIRECT MUSEUM PEDESTAL EXHIBIT FLOOR (UNOBSTRUCTED 520PX 3D TOKEN)     */}
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
          background: 'radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.22) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 80%)',
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
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(129, 140, 248, 0.35)',
            marginBottom: '10px'
          }}>
            <Coins size={12} style={{ color: '#818cf8' }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#c7d2fe' 
            }}>
              SOVEREIGN QUANTUM NUMISMATIC TOKEN
            </span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 3.4vw, 42px)',
            color: '#fff',
            margin: '0 0 8px 0',
            letterSpacing: '-0.01em'
          }}>
            Reserve Bank Digital Rupee (e₹)
          </h3>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Sovereign digital legal tender issued directly on the Reserve Bank balance sheet, possessing identical 1:1 finality with physical paper cash.
          </p>
        </div>

        {/* 3D Coin Stage with Corner Flying Metric Annotation Cards */}
        <div className="museum-pedestal-stage museum-pedestal-wide" style={{ position: 'relative', zIndex: 2, maxWidth: '1320px', width: '100%', overflow: 'visible' }}>
          <div className={`museum-mode-core-layout ${isExhibitInView ? 'exhibit-in-view' : ''}`} style={{ margin: '0 auto', position: 'relative', zIndex: 10 }}>
            
            {/* Left Annotation Column */}
            <div className="museum-mode-pins-col">
              <div className="museum-annotation-card museum-annotation-corner-tl">
                <div className="museum-annotation-tag" style={{ color: '#818cf8' }}>
                  <Lock size={13} style={{ color: '#818cf8' }} />
                  <span>100% Central Bank Liability</span>
                </div>
                <p className="museum-annotation-desc">
                  Unlike commercial deposits or private crypto, the Digital Rupee is a direct liability of the Reserve Bank of India with zero counterparty risk.
                </p>
              </div>

              <div className="museum-annotation-card museum-annotation-corner-bl">
                <div className="museum-annotation-tag" style={{ color: '#38bdf8' }}>
                  <Eye size={13} style={{ color: '#38bdf8' }} />
                  <span>Physical Cash Parity (e₹)</span>
                </div>
                <p className="museum-annotation-desc">
                  Issued in exact denominations (₹1 to ₹2,000) with unique cryptographic serials, retaining the anonymity and trust of physical cash.
                </p>
              </div>
            </div>

            {/* Center Stage: Interactive 3D Coin Object */}
            <div className="museum-pedestal-centerpiece" style={{ width: '100%', maxWidth: '520px', height: '520px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <CoinStage3D coin={ACT_EIGHT_COIN} height={520} variant="pure" />
            </div>

            {/* Right Annotation Column */}
            <div className="museum-mode-pins-col">
              <div className="museum-annotation-card museum-annotation-corner-tr">
                <div className="museum-annotation-tag" style={{ color: '#818cf8' }}>
                  <Cpu size={13} style={{ color: '#818cf8' }} />
                  <span>Smart Programmable Rails</span>
                </div>
                <p className="museum-annotation-desc">
                  Enables programmable purpose-bound currency: agricultural aid and school vouchers can be locked to intended spend and used offline.
                </p>
              </div>

              <div className="museum-annotation-card museum-annotation-corner-br">
                <div className="museum-annotation-tag" style={{ color: '#818cf8' }}>
                  <Network size={13} style={{ color: '#818cf8' }} />
                  <span>Interoperable Bharat QR Rails</span>
                </div>
                <p className="museum-annotation-desc">
                  Seamlessly transacts across existing Bharat QR and UPI merchant infrastructure, enabling frictionless settlement nationwide.
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
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(129, 140, 248, 0.28)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <span>Asset: <strong style={{ color: '#c7d2fe' }}>Central Bank Digital Currency (CBDC)</strong></span>
            <span>•</span>
            <span>Settlement: <strong style={{ color: '#fff' }}>Instant Cryptographic Finality</strong></span>
            <span>•</span>
            <span>Reach: <strong style={{ color: '#38bdf8' }}>Retail (e₹-R) & Wholesale (e₹-W)</strong></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CURATORIAL SLATE / QUANTUM INDIGO PLAQUE (< 120 WORDS)                 */}
      {/* ========================================================================= */}
      <div className="museum-gallery-plaque museum-gallery-plaque-digital">
        <div className="museum-plaque-title" style={{ color: '#818cf8' }}>
          <Network size={14} style={{ color: '#818cf8' }} />
          <span>CURATORIAL ARCHIVE • THE DIGITAL RUPEE (PRESENT & BEYOND)</span>
        </div>

        <p className="museum-plaque-text">
          In December 2022, the Reserve Bank of India launched the Digital Rupee (e₹), inaugurating a sovereign Central Bank Digital Currency backed directly on the central bank balance sheet.
        </p>

        <p className="museum-plaque-text" style={{ marginTop: '14px' }}>
          Interoperable with India’s world-renowned Unified Payments Interface (UPI) and Bharat QR, the Digital Rupee bridges sovereign finality with cryptographic speed—enabling offline micro-payments, smart programmable vouchers, and instant wholesale cross-border settlement.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
          {['Shaktikanta Das', 'Nandan Nilekani', 'NPCI Architecture', 'Reserve Bank of India'].map((figure, fIdx) => (
            <span 
              key={fIdx}
              style={{
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(129, 140, 248, 0.28)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#c7d2fe'
              }}
            >
              {figure}
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIGNATURE INTERACTION: DIGITAL RUPEE NETWORK VISUALIZER                */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '40px auto 60px',
          padding: '0 32px'
        }}
      >
        <DigitalRupeeNetwork />
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
            color: '#818cf8' 
          }}>
            <Layers size={14} style={{ color: '#818cf8' }} />
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
          {ACT_EIGHT_ARTIFACTS.map((artifact, aIdx) => (
            <NumismaticVitrineItem
              key={aIdx}
              artifact={artifact}
              className="digital-vitrine"
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
        className="act-eight-quote-box"
        style={{
          maxWidth: '860px',
          margin: '20px auto 60px',
          padding: '28px 36px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.45) 0%, rgba(10, 10, 16, 0.85) 100%)',
          border: '1px solid rgba(129, 140, 248, 0.35)',
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
          background: 'rgba(99, 102, 241, 0.15)', 
          border: '1px solid rgba(129, 140, 248, 0.4)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexShrink: 0 
        }}>
          <Quote size={24} style={{ color: '#818cf8' }} />
        </div>
        <div>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '10px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.14em', 
            color: '#818cf8', 
            display: 'block', 
            marginBottom: '6px' 
          }}>
            Concept Note on Central Bank Digital Currency • Reserve Bank of India (2022)
          </span>
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '15px', 
            fontStyle: 'italic', 
            color: 'rgba(255, 255, 255, 0.9)', 
            margin: 0, 
            lineHeight: 1.7 
          }}>
            "The Digital Rupee is the same as the sovereign currency note issued by the Reserve Bank. It is legal tender, non-interest bearing, and backed 100% by the sovereign balance sheet of India."
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. TRANSFORMATIVE SCROLL TRANSITION INTO GRAND FINALE                    */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto 80px',
          padding: '0 32px'
        }}
      >
        <div className="museum-era-transition-bridge digital-bridge">
          <div>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#818cf8', 
              display: 'block', 
              marginBottom: '4px' 
            }}>
              2,500 Years of Resilience • The Sovereign Continuum
            </span>
            <p className="museum-bridge-lead">
              From 600 BCE punch-marked silver along the sacred banks of the Ganges to Sher Shah Suri's 178-grain standard, and into cryptographic digital tokens—the Rupee endures as the sovereign financial heartbeat of one-sixth of humanity...
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              const finale = document.querySelector('.museum-finale-section');
              if (finale) {
                finale.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="museum-bridge-btn digital-bridge-btn"
          >
            <span>Enter The Grand Finale</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </section>
  );
};
