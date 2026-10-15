import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Compass, 
  Eye, 
  Scale, 
  ShieldCheck, 
  Hammer,
  Quote
} from 'lucide-react';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { NumismaticVitrineItem, VitrineArtifact } from './NumismaticVitrineItem';
import { sound } from '../../audio';

interface ActTwoCinematicProps {
  onSelectSpecimenImage?: (
    url: string,
    title: string,
    reverseUrl?: string,
    era?: string,
    caption?: string
  ) => void;
  onNavigateToNextAct?: (actId: string) => void;
}

const ACT_TWO_COIN: CoinSpecimen3D = {
  id: 'akbar-silver-rupee-lahore',
  name: 'Imperial Mughal Silver Rupiya',
  rulerOrEra: 'Emperor Akbar the Great / Mughal Dynasty',
  dateStr: 'c. 1580 CE (AH 988)',
  metal: 'silver',
  obverseImage: './specimens/Silver_rupee_coin_of_Akbar__from_Lahore_mint.jpg',
  reverseImage: './specimens/Silver_Coin_of_Sher_Shah_Suri__Shergarh_Mint__circa_950_AH__INHCRF_Coin_Museum__Nashik__Maharashtra.jpg',
  purity: '96–98% Pure Silver',
  weightGrams: '11.53 grams (178 Troy Grains)',
  mintLocation: 'Lahore / Agra Imperial Mint'
};

const ACT_TWO_ARTIFACTS: VitrineArtifact[] = [
  {
    url: './specimens/Silver_Coin_of_Sher_Shah_Suri__Shergarh_Mint__circa_950_AH__INHCRF_Coin_Museum__Nashik__Maharashtra.jpg',
    reverseUrl: './specimens/Silver_rupee_coin_of_Akbar__from_Lahore_mint.jpg',
    title: 'Sher Shah Suri Original Rupiya',
    era: '1540 CE • Shergarh Mint',
    caption: 'The foundational 178-grain silver standard that established the name Rupiya for five centuries'
  },
  {
    url: './specimens/Silver_rupee_coin_of_Akbar__from_Lahore_mint.jpg',
    reverseUrl: './specimens/Silver_Coin_of_Sher_Shah_Suri__Shergarh_Mint__circa_950_AH__INHCRF_Coin_Museum__Nashik__Maharashtra.jpg',
    title: 'Akbar Imperial Silver Rupee',
    era: 'c. 1580 CE • Lahore Mint',
    caption: 'Pure silver currency inscribed with Islamic Kalima and royal titulature in Nasta\'liq script'
  },
  {
    url: './specimens/jahangir_zodiac_gold_mohur.jpg',
    reverseUrl: './specimens/aurangzeb_silver_rupee.jpg',
    title: 'Jahangir Zodiac Gold Mohur (Leo)',
    era: '1611 CE • Agra Mint',
    caption: 'Legendary astrological gold sovereign coin struck with the solar lion of the zodiac'
  },
  {
    url: './specimens/awadh_two_fish_rupee_obs.jpg',
    reverseUrl: './specimens/awadh_two_fish_rupee_rev.jpg',
    title: 'Nawab of Awadh Twin-Fish Silver Rupee',
    era: 'c. 1819 CE • Lucknow Mint',
    caption: 'Mughal successor coinage featuring royal paired carp fish (Mahi Maratib) insignias'
  },
  {
    url: './specimens/maratha_pune_rupee_obs.jpg',
    reverseUrl: './specimens/maratha_pune_rupee_rev.jpg',
    title: 'Maratha Empire Pune Ankushi Rupee',
    era: 'c. 1790 CE • Poona Mint',
    caption: 'Peshwa dynasty silver rupee marked with sacred Ankush elephant goad symbol'
  }
];

export const ActTwoCinematic: React.FC<ActTwoCinematicProps> = ({
  onSelectSpecimenImage,
  onNavigateToNextAct
}) => {
  const [isExhibitInView, setIsExhibitInView] = useState(false);
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

  // Dynamic Corner-Fly Animation on Scroll Entrance and Exit
  useEffect(() => {
    const el = exhibitStageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExhibitInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="act-2-medieval"
      className="act-two-cinematic-container"
      style={{
        position: 'relative',
        width: '100%',
        color: '#ffffff',
        background: '#050c08',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Persian Lattice Tracery Watermark */}
      <div className="act-two-persian-ambient" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SCENE (~90VH — LIVING MUGHAL ARTWORK & SCULPTED 1580)    */}
      {/* ========================================================================= */}
      <div ref={heroSceneRef} className="act-two-scene-90vh">
        {/* Full-Bleed Artwork Image (Preserves natural warm lantern and deep emerald tones) */}
        <img 
          src="./acts/act_2_mughal.png"
          alt="Imperial Mughal Mint Agra 1580 CE"
          className={`act-two-scene-img ${isHeroInView ? 'act-hero-in-view' : 'act-hero-out-of-view'}`}
          loading="eager"
        />

        {/* Stationary Cinematic Dot Matrix Overlay */}
        <div className="hero-dot-matrix-overlay" aria-hidden="true" />

        {/* Localized Bottom Gradient Scrim (Emerald/Gold darkened behind typography only) */}
        <div className="act-two-scrim-localized" />

        {/* Atmospheric Floating Lantern Light & Golden Dust Overlay */}
        <div className="act-two-atmosphere-overlay" />

        {/* Overlaid Typography directly on painting */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '920px' }}>
          
          {/* Sculpted 1580 CE Artwork Typography */}
          <div className="museum-sculpted-year mughal-gold">
            1580 CE
          </div>

          {/* Era Indicator Pill */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '5px 16px', 
            borderRadius: '9999px', 
            background: 'rgba(16, 185, 129, 0.22)', 
            border: '1px solid rgba(52, 211, 153, 0.5)', 
            backdropFilter: 'blur(12px)', 
            marginBottom: '14px' 
          }}>
            <Sparkles size={12} style={{ color: '#34d399' }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '11px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#a7f3d0', 
              fontWeight: 700 
            }}>
              GALLERY II • IMPERIAL MUGHAL MINT
            </span>
          </div>

          <h1 className="museum-sculpted-title">
            THE MUGHAL RUPEE
          </h1>

          <p className="museum-sculpted-sentence">
            The silver Rupiya became the monetary foundation of an empire.
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
        <div className="museum-spotlight-beam mughal-spotlight" />

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
            color: '#10b981',
            marginBottom: '8px'
          }}>
            <Sparkles size={12} style={{ color: '#34d399' }} />
            <span>PRIMARY EXHIBIT • AGRA & LAHORE IMPERIAL KARKHANA</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 10px'
          }}>
            Imperial Mughal Silver Rupiya
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Struck at 178 troy grains of unalloyed silver, codified by Sher Shah Suri and perfected under Emperor Akbar the Great.
          </p>
        </div>

        {/* Pure Centerpiece Layout: Left Annotations | Center 3D Coin | Right Annotations */}
        <div className={`museum-mode-core-layout ${isExhibitInView ? 'exhibit-in-view' : ''}`} style={{ margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          {/* Left Annotation Column */}
          <div className="museum-mode-pins-col">
            <div className="museum-annotation-card museum-annotation-corner-tl">
              <div className="museum-annotation-tag" style={{ color: '#34d399' }}>
                <Eye size={13} style={{ color: '#10b981' }} />
                <span>Persian Calligraphic Script</span>
              </div>
              <p className="museum-annotation-desc">
                Inscribed with the Islamic Kalima and royal titulature in exquisite flowing Nasta'liq and Thuluth calligraphy.
              </p>
            </div>

            <div className="museum-annotation-card museum-annotation-corner-bl">
              <div className="museum-annotation-tag" style={{ color: '#34d399' }}>
                <ShieldCheck size={13} style={{ color: '#10b981' }} />
                <span>Silver Fineness Standard</span>
              </div>
              <p className="museum-annotation-desc">
                96–98% unalloyed pure silver, recognized as the premier trade currency across maritime Asia and the Indian Ocean.
              </p>
            </div>
          </div>

          {/* Center Pure 3D Interactive Coin (Frameless, Pristine WebGL with generous breathing room) */}
          <div style={{ width: '100%', maxWidth: '520px', height: '520px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
            <CoinStage3D coin={ACT_TWO_COIN} height={520} variant="pure" />
          </div>

          {/* Right Annotation Column */}
          <div className="museum-mode-pins-col">
            <div className="museum-annotation-card museum-annotation-corner-tr">
              <div className="museum-annotation-tag" style={{ color: '#34d399' }}>
                <Scale size={13} style={{ color: '#10b981' }} />
                <span>Canonical Weight Benchmark</span>
              </div>
              <p className="museum-annotation-desc">
                Exact 178 troy grains (~11.53 grams), a metallurgical precision standard that remained unbroken for four centuries.
              </p>
            </div>

            <div className="museum-annotation-card museum-annotation-corner-br">
              <div className="museum-annotation-tag" style={{ color: '#34d399' }}>
                <Hammer size={13} style={{ color: '#10b981' }} />
                <span>Imperial Open Minting</span>
              </div>
              <p className="museum-annotation-desc">
                Free coinage policy: global merchants brought silver bullion to royal karkhanas in Surat and Agra for instant striking into Rupees.
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
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(52, 211, 153, 0.25)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <span>Specimen: <strong style={{ color: '#a7f3d0' }}>Mughal Silver Rupiya</strong></span>
            <span>•</span>
            <span>Standard: <strong style={{ color: '#fff' }}>178 Troy Grains (11.53g)</strong></span>
            <span>•</span>
            <span>Assay: <strong style={{ color: '#34d399' }}>96–98% Pure Silver</strong></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CURATORIAL SANDSTONE / BRASS PLAQUE (< 120 WORDS)                      */}
      {/* ========================================================================= */}
      <div className="museum-gallery-plaque museum-gallery-plaque-mughal">
        <div className="museum-plaque-title" style={{ color: '#34d399' }}>
          <Compass size={14} style={{ color: '#10b981' }} />
          <span>CURATORIAL ARCHIVE • AGRA ROYAL KARKHANA (1580 CE)</span>
        </div>

        <p className="museum-plaque-text">
          In 1330 CE, Sultan Muhammad bin Tughlaq attempted history’s boldest monetary experiment: issuing copper and brass token coins with face value equal to silver. Without anti-counterfeiting safeguards, every metalsmith forged tokens, forcing the treasury to redeem mountains of brass with pure silver.
        </p>

        <p className="museum-plaque-text" style={{ marginTop: '14px' }}>
          Out of this collapse arose Sher Shah Suri in 1540 CE, striking an uncompromising 178-grain silver coin: the "Rupiya" (from Sanskrit <em>Rūpya</em>, wrought silver). Emperor Akbar codified this across imperial mints, creating the financial bedrock of early modern Asia.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
          {['Sher Shah Suri', 'Akbar the Great', 'Raja Todar Mal', 'Jahangir (Zodiac Master)'].map((figure, fIdx) => (
            <span 
              key={fIdx}
              style={{
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(52, 211, 153, 0.22)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#d1fae5'
              }}
            >
              {figure}
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MOUNTED VITRINE ARTIFACT SHOWCASE                                      */}
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
            color: '#a7f3d0' 
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
          {ACT_TWO_ARTIFACTS.map((artifact, aIdx) => (
            <NumismaticVitrineItem
              key={aIdx}
              artifact={artifact}
              className="mughal-vitrine"
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
      {/* 5. HIGHLIGHTED HISTORICAL INSIGHT (PREMIUM MUSEUM QUOTE)                  */}
      {/* ========================================================================= */}
      <div 
        className="act-two-quote-box"
        style={{
          maxWidth: '860px',
          margin: '20px auto 60px',
          padding: '28px 36px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(6, 44, 29, 0.45) 0%, rgba(10, 10, 16, 0.85) 100%)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
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
          border: '1px solid rgba(52, 211, 153, 0.4)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexShrink: 0 
        }}>
          <Quote size={24} style={{ color: '#34d399' }} />
        </div>
        <div>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '10px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.14em', 
            color: '#a7f3d0', 
            display: 'block', 
            marginBottom: '6px' 
          }}>
            Monetary Continuum • Vincent A. Smith (Oxford History of India)
          </span>
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '15px', 
            fontStyle: 'italic', 
            color: 'rgba(255, 255, 255, 0.9)', 
            margin: 0, 
            lineHeight: 1.7 
          }}>
            "Introduced by Sher Shah Suri and perfected under the Mughals, the silver Rupiya became one of history's most influential currencies, establishing the standard of weight and fineness that has endured down to our own days."
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. TRANSFORMATIVE SCROLL TRANSITION INTO ACT III                          */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto 80px',
          padding: '0 32px'
        }}
      >
        <div className="museum-era-transition-bridge mughal-bridge">
          <div>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              color: '#34d399', 
              display: 'block', 
              marginBottom: '4px' 
            }}>
              The Sovereign Continuum Advances
            </span>
            <p className="museum-bridge-lead">
              The burnished gold and silver karkhanas of Agra dissolve into maritime trade winds as European merchant fleets arrive, inaugurating the East India Company and British Presidency coinage...
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigateToNextAct?.('act-3-colonial');
            }}
            className="museum-bridge-btn mughal-bridge-btn"
          >
            <span>Enter Act III: Colonial & Presidency</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </section>
  );
};
