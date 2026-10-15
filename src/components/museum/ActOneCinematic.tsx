import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Compass, 
  Eye, 
  Scale, 
  ShieldCheck, 
  Hammer, 
  Landmark
} from 'lucide-react';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { NumismaticVitrineItem, VitrineArtifact } from './NumismaticVitrineItem';
import { sound } from '../../audio';

interface ActOneCinematicProps {
  onSelectSpecimenImage?: (
    url: string,
    title: string,
    reverseUrl?: string,
    era?: string,
    caption?: string
  ) => void;
  onNavigateToNextAct?: (actId: string) => void;
}

const ACT_ONE_COIN: CoinSpecimen3D = {
  id: 'mauryan-punch-marked-karshapana',
  name: 'Imperial Mauryan Punch-Marked Karshapana',
  rulerOrEra: 'Emperor Ashoka / Maurya Dynasty',
  dateStr: 'c. 300 – 250 BCE',
  metal: 'silver',
  obverseImage: './specimens/mauryan_karshapana_obs.jpg',
  reverseImage: './specimens/mauryan_karshapana_rev.jpg',
  purity: '80–90% Pure Silver',
  weightGrams: '3.4 grams (32 Ratis)',
  mintLocation: 'Pataliputra Imperial Mint'
};

const ACT_ONE_ARTIFACTS: VitrineArtifact[] = [
  {
    url: './specimens/mauryan_karshapana_obs.jpg',
    reverseUrl: './specimens/mauryan_karshapana_rev.jpg',
    title: 'Mauryan Punch-Marked Silver Karshapana',
    era: 'c. 300 BCE • Magadha',
    caption: 'Cold-hammered silver drop stamped with solar wheel and cosmic mountain'
  },
  {
    url: './specimens/gandhara_bent_bar.jpg',
    reverseUrl: './specimens/mauryan_karshapana_rev.jpg',
    title: 'Gandhara Shatamana Silver Bent Bar',
    era: 'c. 600 BCE • Taxila',
    caption: 'Vedic-era curved silver bullion bar with six-armed punch marks'
  },
  {
    url: './specimens/chandragupta_ii_archer_gold_dinar.jpg',
    reverseUrl: './specimens/samudragupta_lyrist_gold_dinar.jpg',
    title: 'Imperial Gupta Archer Gold Dinar',
    era: 'c. 380 CE • Pataliputra',
    caption: 'Classical Golden Age sovereign portrait with Brahmi Sanskrit legend'
  },
  {
    url: './specimens/samudragupta_lyrist_gold_dinar.jpg',
    reverseUrl: './specimens/chandragupta_ii_archer_gold_dinar.jpg',
    title: 'Samudragupta Lyrist Gold Dinar',
    era: 'c. 350 CE • Imperial Mint',
    caption: 'Emperor playing the Veena, earliest depiction of music on currency'
  },
  {
    url: './specimens/menander_silver_drachm.jpg',
    reverseUrl: './specimens/kanishka_gold_dinar_buddha.jpg',
    title: 'Silk Road Indo-Greek Silver Drachm',
    era: 'c. 150 BCE • Punjab',
    caption: 'Bilingual Greek and Kharosthi coinage of King Menander I'
  }
];

export const ActOneCinematic: React.FC<ActOneCinematicProps> = ({
  onSelectSpecimenImage,
  onNavigateToNextAct
}) => {
  const heroSceneRef = useRef<HTMLDivElement | null>(null);
  const exhibitStageRef = useRef<HTMLDivElement | null>(null);
  const [isHeroInView, setIsHeroInView] = useState<boolean>(true);
  const [isExhibitInView, setIsExhibitInView] = useState<boolean>(true);

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
    const el = exhibitStageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExhibitInView(entry.isIntersecting);
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="act-1-ancient"
      className="act-one-cinematic-container"
      style={{
        position: 'relative',
        width: '100%',
        color: '#ffffff',
        background: '#070709',
        overflow: 'hidden'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SCENE (~90VH — LIVING ARTWORK & SCULPTED 300 BCE)       */}
      {/* ========================================================================= */}
      <div ref={heroSceneRef} className="act-one-scene-90vh">
        {/* Full-Bleed Artwork Image (Keeps natural warmth, not dimmed globally) */}
        <img 
          src="./acts/act_1_ancient_india.png"
          alt="Ancient India 300 BCE"
          className={`act-one-scene-img ${isHeroInView ? 'act-hero-in-view' : 'act-hero-out-of-view'}`}
          loading="eager"
        />

        {/* Stationary Cinematic Dot Matrix Overlay */}
        <div className="hero-dot-matrix-overlay" aria-hidden="true" />

        {/* Localized Bottom Gradient Scrim (Leaves painting bright, darkens only text area) */}
        <div className="act-one-scrim-localized" />

        {/* Atmospheric Floating Light & Dust Overlay */}
        <div className="act-one-atmosphere-overlay" />

        {/* Overlaid Typography directly on painting */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
          
          {/* Sculpted 300 BCE Artwork Typography */}
          <div className="museum-sculpted-year">
            300 BCE
          </div>

          {/* Era Indicator Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '9999px', background: 'rgba(234, 179, 8, 0.25)', border: '1px solid rgba(234, 179, 8, 0.6)', backdropFilter: 'blur(12px)', marginBottom: '14px' }}>
            <Sparkles size={12} style={{ color: '#facc15' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#fef08a', fontWeight: 700 }}>
              GALLERY I • ANCIENT INDIA
            </span>
          </div>

          <h1 className="museum-sculpted-title">
            THE BIRTH OF INDIAN CURRENCY
          </h1>

          <p className="museum-sculpted-sentence">
            Along the sacred waters of the Ganges, civilization struck its first sovereign promise in pure cold-hammered silver.
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
        <div className="museum-spotlight-beam ancient-spotlight" />

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
            color: '#eab308',
            marginBottom: '8px'
          }}>
            <Sparkles size={12} style={{ color: '#facc15' }} />
            <span>PRIMARY EXHIBIT • PATALIPUTRA ROYAL MINT</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 10px'
          }}>
            Imperial Mauryan Silver Karshapana
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Cold-hammered silver planchet stamped with five official imperial symbols, establishing the standard monetary unit of ancient India.
          </p>
        </div>

        {/* Pure Centerpiece Layout: Left Annotations | Center 3D Coin | Right Annotations */}
        <div className={`museum-mode-core-layout ${isExhibitInView ? 'exhibit-in-view' : ''}`} style={{ margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          {/* Left Annotation Column */}
          <div className="museum-mode-pins-col">
            <div className="museum-annotation-card museum-annotation-corner-tl">
              <div className="museum-annotation-tag" style={{ color: '#fef08a' }}>
                <Eye size={13} style={{ color: '#eab308' }} />
                <span>Five Imperial Punch Marks</span>
              </div>
              <p className="museum-annotation-desc">
                Stamped with official symbols: radiant sun, six-armed chakra, arched hill, tree-in-railing, and royal elephant.
              </p>
            </div>

            <div className="museum-annotation-card museum-annotation-corner-bl">
              <div className="museum-annotation-tag" style={{ color: '#fef08a' }}>
                <ShieldCheck size={13} style={{ color: '#eab308' }} />
                <span>Silver Fineness Standard</span>
              </div>
              <p className="museum-annotation-desc">
                80–90% unalloyed pure silver droplet, tested for metallurgical integrity by the royal mint administration.
              </p>
            </div>
          </div>

          {/* Center Pure 3D Interactive Coin (Frameless, Pristine WebGL with generous breathing room) */}
          <div className="museum-pedestal-centerpiece" style={{ width: '100%', maxWidth: '520px', height: '520px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
            <CoinStage3D coin={ACT_ONE_COIN} height={520} variant="pure" />
          </div>

          {/* Right Annotation Column */}
          <div className="museum-mode-pins-col">
            <div className="museum-annotation-card museum-annotation-corner-tr">
              <div className="museum-annotation-tag" style={{ color: '#fef08a' }}>
                <Scale size={13} style={{ color: '#eab308' }} />
                <span>Canonical 32-Ratti Standard</span>
              </div>
              <p className="museum-annotation-desc">
                Exact 32 Ratis (~3.4 grams), the canonical Magadhan benchmark codified in Chanakya's Arthashastra.
              </p>
            </div>

            <div className="museum-annotation-card museum-annotation-corner-br">
              <div className="museum-annotation-tag" style={{ color: '#fef08a' }}>
                <Hammer size={13} style={{ color: '#eab308' }} />
                <span>Minting Guild Technique</span>
              </div>
              <p className="museum-annotation-desc">
                Molten silver drops flattened on anvils and struck cold with hardened steel punch dies under the Lakshanadhyaksha.
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
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <span>Specimen: <strong style={{ color: '#fef08a' }}>Silver Karshapana</strong></span>
            <span>•</span>
            <span>Mint: <strong style={{ color: '#fff' }}>Pataliputra Royal Mint</strong></span>
            <span>•</span>
            <span>Assay: <strong style={{ color: '#eab308' }}>80–90% Pure Silver</strong></span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CURATORIAL STONE PLAQUE (< 90 WORDS — BRASS / STONE MOUNTED STYLE)    */}
      {/* ========================================================================= */}
      <div className="museum-gallery-plaque">
        <div className="museum-plaque-title">
          <Compass size={14} style={{ color: '#eab308' }} />
          <span>CURATORIAL ARCHIVE • PATALIPUTRA (300 BCE)</span>
        </div>

        <p className="museum-plaque-text">
          Before coins, humanity bartered cattle and grain. In the 4th century BCE, along the fertile banks of the Ganges, the sovereign Republics of ancient India struck civilization’s earliest currency: the punch-marked Karshapana.
        </p>

        <p className="museum-plaque-text" style={{ marginTop: '14px' }}>
          In the Arthashastra, royal advisor Chanakya codified the world’s first state-regulated mint administration under the Lakshanadhyaksha. Money was born not by decree, but by the sacred trust of pure silver.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
          {['Chandragupta Maurya', 'Chanakya (Kautilya)', 'Samudragupta', 'Kanishka I'].map((figure, fIdx) => (
            <span 
              key={fIdx}
              style={{
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.85)'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#fef08a' }}>
            <Layers size={14} style={{ color: '#eab308' }} />
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
          {ACT_ONE_ARTIFACTS.map((artifact, aIdx) => (
            <NumismaticVitrineItem
              key={aIdx}
              artifact={artifact}
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
      {/* 5. VEDIC MAP & TRADE ROUTE CONTEXT PLAQUE                                 */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '820px',
          margin: '20px auto 60px',
          padding: '24px 32px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Compass size={22} style={{ color: '#facc15' }} />
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fef08a', display: 'block', marginBottom: '4px' }}>
            The Global Bullion Drain (Pliny the Elder, 77 CE)
          </span>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.85)', margin: 0, lineHeight: 1.6 }}>
            "Not a single year passes without India draining our Empire of fifty-five million sesterces of pure gold and silver in exchange for luxury wares."
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. TRANSFORMATIVE SCROLL TRANSITION INTO ACT II                            */}
      {/* ========================================================================= */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto 80px',
          padding: '0 32px'
        }}
      >
        <div className="museum-era-transition-bridge">
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#eab308', display: 'block', marginBottom: '4px' }}>
              The Continuum Advances
            </span>
            <p className="museum-bridge-lead">
              The cold-hammered silver punch-marks of the Ganges dissolve into golden embers as time advances to 1200 CE and Sher Shah Suri’s foundational 178-grain silver Rupiya...
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigateToNextAct?.('act-2-medieval');
            }}
            className="museum-bridge-btn"
          >
            <span>Enter Act II: Medieval India</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </section>
  );
};

