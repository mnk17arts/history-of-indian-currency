import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Eye, 
  Scale, 
  Quote,
  Shield,
  Landmark,
  Coins
} from 'lucide-react';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { RepublicCoinReveal } from './RepublicCoinReveal';
import { NumismaticVitrineItem, VitrineArtifact } from './NumismaticVitrineItem';
import { sound } from '../../audio';

interface ActFiveCinematicProps {
  onSelectSpecimenImage?: (
    url: string,
    title: string,
    reverseUrl?: string,
    era?: string,
    caption?: string
  ) => void;
  onNavigateToNextAct?: (actId: string) => void;
}

const ACT_FIVE_COIN: CoinSpecimen3D = {
  id: 'republic-1950-one-rupee',
  name: '1950 Sovereign Republic of India One Rupee',
  rulerOrEra: 'Republic of India • Inaugural Issue',
  dateStr: '1950 CE (Bombay / Calcutta Mints)',
  metal: 'silver',
  obverseImage: './specimens/republic_1950_one_rupee_obs_hd.jpg',
  reverseImage: './specimens/republic_1950_one_rupee_rev_hd.jpg',
  purity: '100% Pure Electrolytic Nickel',
  weightGrams: '11.66 grams (180 Grains)',
  mintLocation: 'Bombay / Calcutta Royal Mint'
};

const ACT_FIVE_ARTIFACTS: VitrineArtifact[] = [
  {
    url: './specimens/republic_1950_one_rupee_obs_hd.jpg',
    reverseUrl: './specimens/republic_1950_one_rupee_rev_hd.jpg',
    title: 'First Republic of India 1950 One Rupee',
    era: '1950 CE • National Emblem',
    caption: 'Sculpted four-lion Sarnath capital on obverse, twin stalks of ripe wheat on reverse symbolizing food security'
  },
  {
    url: './specimens/republic_1954_two_annas_obs.jpg',
    reverseUrl: './specimens/republic_1954_two_annas_rev.jpg',
    title: 'Two Annas Scalloped Brahmani Bull Coin',
    era: '1954 CE • Tactile Coinage',
    caption: 'Distinctive eight-scalloped cupro-nickel coin with the Rampurva bull for tactile identification by common folk'
  },
  {
    url: './specimens/indo_french_1_rupee_obs.jpg',
    reverseUrl: './specimens/indo_french_1_rupee_rev.jpg',
    title: 'Indo-French Establishments One Rupee (Pondichéry)',
    era: '1954 CE • French India Integration',
    caption: 'Banque de l’Indochine sovereign currency that circulated across Pondichéry, Karikal, and Chandernagore'
  },
  {
    url: './specimens/persian_gulf_1_rupee.jpg',
    reverseUrl: './specimens/persian_gulf_10_rupees.jpg',
    title: 'Reserve Bank of India External Gulf Rupee',
    era: '1959 CE • Special Issue',
    caption: 'Distinctive color variant issued for Kuwait, Bahrain, Qatar, and Trucial States to stop gold smuggling'
  },
  {
    url: './specimens/haj_pilgrim_10_rupees.jpg',
    reverseUrl: './specimens/haj_pilgrim_100_rupees.jpg',
    title: 'Special Haj Pilgrim Pilgrimage Banknote',
    era: '1959 CE • Bombay Exchange',
    caption: 'Special non-repatriable currency issued exclusively for Indian Muslims embarking on the sacred Haj pilgrimage'
  },
  {
    url: './specimens/republic_1949_one_rupee.jpg',
    reverseUrl: './specimens/hirakud_dam_100_rupees.jpg',
    title: 'Constitution & 1949 First Sovereign Rupee Note',
    era: '1949 CE • Interim Transition',
    caption: 'The historical inaugural banknote replacing the British monarch with the Lion Capital of Ashoka'
  }
];

export const ActFiveCinematic: React.FC<ActFiveCinematicProps> = ({
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
      id="act-5-early-republic" 
      style={{
        position: 'relative',
        width: '100%',
        background: '#070709',
        overflow: 'hidden'
      }}
      data-act="5"
    >
      {/* Warm Sandstone & Saffron Ambient Backing */}
      <div className="act-five-sandstone-ambient" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SCENE (~90VH — LIVING ARTWORK & SCULPTED 1950)          */}
      {/* ========================================================================= */}
      <div ref={heroSceneRef} className="act-five-scene-90vh">
        <img 
          src="./acts/act_5_republic.png" 
          alt="The Republic of India 1950 Sarnath Lion Capital"
          className={`act-five-scene-img ${isHeroInView ? 'act-hero-in-view' : 'act-hero-out-of-view'}`}
          loading="eager"
        />

        {/* Stationary Cinematic Dot Matrix Overlay */}
        <div className="hero-dot-matrix-overlay" aria-hidden="true" />

        {/* Localized Bottom Gradient Scrim */}
        <div className="act-five-scrim-localized" />

        {/* Golden Warmth and Saffron Atmosphere Overlay */}
        <div className="act-five-atmosphere-overlay" />

        {/* Overlaid Typography directly on painting */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '920px' }}>
          
          {/* Sculpted 1950 Artwork Typography */}
          <div className="museum-sculpted-year republic-saffron">
            1950
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
              color: '#fef08a' 
            }}>
              ACT V • THE REPUBLIC OF INDIA
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
            THE REPUBLIC OF INDIA
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
            A new nation introduced a new identity through its currency.
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
            <span>ERA: <strong>1950 CE</strong></span>
            <span>•</span>
            <span>HERALD: <strong style={{ color: '#f59e0b' }}>SARNATH LION CAPITAL</strong></span>
            <span>•</span>
            <span>SOVEREIGNTY: <strong style={{ color: '#10b981' }}>FREE INDIA</strong></span>
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
          background: 'radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.16) 0%, rgba(217, 119, 6, 0.05) 50%, transparent 80%)',
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
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            marginBottom: '10px'
          }}>
            <Coins size={12} style={{ color: '#f59e0b' }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#fef08a' 
            }}>
              SOVEREIGN NUMISMATIC CENTERPIECE
            </span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 3.4vw, 42px)',
            color: '#fff',
            margin: '0 0 8px 0',
            letterSpacing: '-0.01em'
          }}>
            1950 Sovereign One Rupee Coin
          </h3>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            The first circulating Rupee of sovereign India. Four Asiatic lions facing the cardinal directions replace the imperial British crown.
          </p>
        </div>

        {/* 3D Coin Stage with Corner Flying Metric Annotation Cards */}
        <div className="museum-pedestal-stage museum-pedestal-wide" style={{ position: 'relative', zIndex: 2, maxWidth: '1320px', width: '100%', overflow: 'visible' }}>
          <div className={`museum-mode-core-layout ${isExhibitInView ? 'exhibit-in-view' : ''}`} style={{ margin: '0 auto', position: 'relative', zIndex: 10 }}>
            
            {/* Left Annotation Column */}
            <div className="museum-mode-pins-col">
              <div className="museum-annotation-card museum-annotation-corner-tl">
                <div className="museum-annotation-tag" style={{ color: '#f59e0b' }}>
                  <Landmark size={13} style={{ color: '#f59e0b' }} />
                  <span>The Ashoka Lion Capital (1950)</span>
                </div>
                <p className="museum-annotation-desc">
                  Adapted from Sarnath pillar. Four lions symbolize power, courage, pride, and confidence above the Ashoka Chakra.
                </p>
              </div>

              <div className="museum-annotation-card museum-annotation-corner-bl">
                <div className="museum-annotation-tag" style={{ color: '#10b981' }}>
                  <Sparkles size={13} style={{ color: '#10b981' }} />
                  <span>Two Corn Stalks Reverse</span>
                </div>
                <p className="museum-annotation-desc">
                  Replaced foreign heraldry with indigenous wheat ears, celebrating the Indian farmer as the foundation of national self-reliance.
                </p>
              </div>
            </div>

            {/* Center Stage: Interactive 3D Coin Object */}
            <div className="museum-pedestal-centerpiece" style={{ width: '100%', maxWidth: '520px', height: '520px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <CoinStage3D coin={ACT_FIVE_COIN} height={520} variant="pure" />
            </div>

            {/* Right Annotation Column */}
            <div className="museum-mode-pins-col">
              <div className="museum-annotation-card museum-annotation-corner-tr">
                <div className="museum-annotation-tag" style={{ color: '#f59e0b' }}>
                  <Scale size={13} style={{ color: '#f59e0b' }} />
                  <span>100% Electrolytic Nickel</span>
                </div>
                <p className="museum-annotation-desc">
                  Post-war silver exhaustion led India to standardize on durable pure nickel, retaining the classical weight of 180 grains (11.66 grams).
                </p>
              </div>

              <div className="museum-annotation-card museum-annotation-corner-br">
                <div className="museum-annotation-tag" style={{ color: '#f59e0b' }}>
                  <Eye size={13} style={{ color: '#f59e0b' }} />
                  <span>Bilingual Standard (Hindi & English)</span>
                </div>
                <p className="museum-annotation-desc">
                  Denominations inscribed in Devanagari (एक रुपया) and English (ONE RUPEE), struck at the Bombay and Calcutta mints.
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
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.28)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <span>Specimen: <strong style={{ color: '#fef08a' }}>1950 Republic One Rupee</strong></span>
            <span>•</span>
            <span>Weight: <strong style={{ color: '#fff' }}>11.66 Grams (180 Grains)</strong></span>
            <span>•</span>
            <span>System: <strong style={{ color: '#f59e0b' }}>16 Annas = 64 Pice</strong></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CURATORIAL SLATE / SANDSTONE PLAQUE (< 120 WORDS)                      */}
      {/* ========================================================================= */}
      <div className="museum-gallery-plaque museum-gallery-plaque-republic">
        <div className="museum-plaque-title" style={{ color: '#f59e0b' }}>
          <Shield size={14} style={{ color: '#f59e0b' }} />
          <span>CURATORIAL ARCHIVE • THE REPUBLIC OF INDIA (1950 CE)</span>
        </div>

        <p className="museum-plaque-text">
          On January 26, 1950, India ratified its democratic Constitution and adopted the Mauryan Lion Capital of Sarnath as its State Emblem. Currency became the most widespread physical ambassador of freedom.
        </p>

        <p className="museum-plaque-text" style={{ marginTop: '14px' }}>
          The British Crown was replaced by four vigilant lions atop the Ashoka Chakra, proclaiming Satyameva Jayate. Struck in pure electrolytic nickel, the inaugural 1950 coinage celebrated agricultural independence with golden wheat stalks, uniting 565 formerly fragmented princely territories under one sovereign Rupee.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
          {['Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Sir Benegal Rama Rau'].map((figure, fIdx) => (
            <span 
              key={fIdx}
              style={{
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.28)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#fef08a'
              }}
            >
              {figure}
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIGNATURE INTERACTION: REPUBLIC COIN REVEAL                           */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '40px auto 60px',
          padding: '0 32px'
        }}
      >
        <RepublicCoinReveal />
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
            color: '#f59e0b' 
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
          {ACT_FIVE_ARTIFACTS.map((artifact, aIdx) => (
            <NumismaticVitrineItem
              key={aIdx}
              artifact={artifact}
              className="republic-vitrine"
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
        className="act-five-quote-box"
        style={{
          maxWidth: '860px',
          margin: '20px auto 60px',
          padding: '28px 36px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(45, 28, 12, 0.45) 0%, rgba(10, 10, 16, 0.85) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
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
            color: '#f59e0b', 
            display: 'block', 
            marginBottom: '6px' 
          }}>
            Sovereign Proclamation • Ministry of Finance (1949)
          </span>
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '15px', 
            fontStyle: 'italic', 
            color: 'rgba(255, 255, 255, 0.9)', 
            margin: 0, 
            lineHeight: 1.7 
          }}>
            "In place of the portrait of the British King, the symbol of the new sovereign Republic—the Ashoka Pillar of Sarnath—shall henceforth be the national emblem on all currency."
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. TRANSFORMATIVE SCROLL TRANSITION INTO ACT VI                          */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto 80px',
          padding: '0 32px'
        }}
      >
        <div className="museum-era-transition-bridge republic-bridge">
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
              Republic Emblem Glows • The Decimal Transition Begins
            </span>
            <p className="museum-bridge-lead">
              The Republic emblem glows in warm sandstone light. The single 1950 coin slowly transforms: the ancient system of 16 Annas and 64 Pice dissolves into base-10 mathematics as 100 Naye Paise usher in modern scientific India...
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigateToNextAct?.('act-6-decimal');
            }}
            className="museum-bridge-btn republic-bridge-btn"
          >
            <span>Enter Act VI: The Decimal Revolution</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </section>
  );
};
