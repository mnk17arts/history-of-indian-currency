import React, { useState } from 'react';
import { 
  Sparkles, 
  Coins, 
  Quote, 
  Scale, 
  ShieldCheck, 
  Layers, 
  Calendar,
  Gem,
  ArrowRight
} from 'lucide-react';
import { CinematicAct } from '../../data/cinematicData';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { sound } from '../../audio';

interface EraSectionProps {
  act: CinematicAct;
  index: number;
  totalActs: number;
  onSelectSpecimenImage?: (imageUrl: string, title: string) => void;
  nextAct?: { id: string; era: string; actNumber: string };
  onNavigateToNextAct?: (actId: string) => void;
}

// 3D Coin mapping for each historical act (matched to exact act IDs)
const ERA_COIN_SPECIMENS: Record<string, CoinSpecimen3D> = {
  'act-1-ancient': {
    id: 'gupta-archer-dinar',
    name: 'Imperial Gupta Gold Dinar',
    rulerOrEra: 'Chandragupta II Vikramaditya',
    dateStr: 'c. 380 – 415 CE',
    metal: 'gold',
    obverseImage: './specimens/chandragupta_ii_archer_gold_dinar.jpg',
    reverseImage: './specimens/samudragupta_lyrist_gold_dinar.jpg',
    purity: '22–24 Karat Gold (98% Au)',
    weightGrams: '8.4 grams',
    mintLocation: 'Pataliputra Imperial Mint'
  },
  'act-2-medieval': {
    id: 'sher-shah-rupiya',
    name: 'Foundational Silver Rupiya',
    rulerOrEra: 'Sher Shah Suri',
    dateStr: '1540 – 1545 CE',
    metal: 'silver',
    obverseImage: './specimens/Silver_Coin_of_Sher_Shah_Suri__Shergarh_Mint__circa_950_AH__INHCRF_Coin_Museum__Nashik__Maharashtra.jpg',
    reverseImage: './specimens/Silver_rupee_coin_of_Akbar__from_Lahore_mint.jpg',
    purity: '97% Fine Silver Bullion',
    weightGrams: '11.53g (178 grains)',
    mintLocation: 'Shergarh & Lahore Mints'
  },
  'act-3-colonial': {
    id: 'sicca-rupee-eic',
    name: 'Presidency Silver Sicca Rupee',
    rulerOrEra: 'Presidency Banks / EIC',
    dateStr: '1793 – 1835 CE',
    metal: 'silver',
    obverseImage: './specimens/murshidabad_sicca_rupee.jpg',
    reverseImage: './specimens/eic_madras_two_pagodas_obs.jpg',
    purity: '98% Fine Silver (19.19 San)',
    weightGrams: '11.66g (1 Tola)',
    mintLocation: 'Murshidabad & Calcutta'
  },
  'act-4-pre-independence': {
    id: 'victoria-imperial-rupee',
    name: 'Imperial Standard Silver Rupee',
    rulerOrEra: 'Empress Victoria / British Crown',
    dateStr: '1862 – 1947 CE',
    metal: 'silver',
    obverseImage: './specimens/victoria_1862_rupee.png',
    reverseImage: './specimens/george_vi_1947_rev.png',
    purity: '.917 Fine Silver (Sterling)',
    weightGrams: '11.66g (1 Tola)',
    mintLocation: 'Bombay & Calcutta Mints'
  },
  'act-5-early-republic': {
    id: 'republic-ashoka-rupee',
    name: 'Independent Republic One Rupee',
    rulerOrEra: 'Government of India',
    dateStr: '1950 CE',
    metal: 'silver',
    obverseImage: './specimens/republic_1950_one_rupee_coin_obs.jpg',
    reverseImage: './specimens/republic_1950_one_rupee_coin_rev.jpg',
    purity: '100% Electrolytic Nickel',
    weightGrams: '11.66 grams',
    mintLocation: 'India Govt Mint, Bombay'
  },
  'act-6-decimal': {
    id: 'decimal-ten-naye-paise',
    name: 'First Decimal 10 Naye Paise',
    rulerOrEra: 'Democratic Republic of India',
    dateStr: '1957 CE',
    metal: 'copper',
    obverseImage: './specimens/decimal_1957_ten_naye_paise_obs.jpg',
    reverseImage: './specimens/decimal_1957_ten_naye_paise_rev.jpg',
    purity: 'Cupro-Nickel (75% Cu, 25% Ni)',
    weightGrams: '5.0 grams',
    mintLocation: 'Alipore (Calcutta) Mint'
  },
  'act-7-modern': {
    id: 'mg-series-benchmark',
    name: 'Mahatma Gandhi New Series Note',
    rulerOrEra: 'Reserve Bank of India',
    dateStr: '2016 – Present',
    metal: 'gold',
    obverseImage: './specimens/mg_new_500_front.jpg',
    reverseImage: './specimens/mg_new_2000_front.jpg',
    purity: 'Pure Cotton Rag & OVI Inks',
    weightGrams: '150 × 66 mm Substrate',
    mintLocation: 'Nasik, Dewas & Mysuru'
  },
  'act-8-digital': {
    id: 'digital-rupee-cbdc',
    name: 'Reserve Bank Digital Rupee (e₹)',
    rulerOrEra: 'Reserve Bank of India',
    dateStr: '2022 & Beyond',
    metal: 'digital',
    obverseImage: './specimens/digital_rupee_obverse.svg',
    reverseImage: './specimens/digital_rupee_reverse.svg',
    purity: '100% Sovereign Backed Digital Cash',
    weightGrams: '0 grams (Quantum Bits)',
    mintLocation: 'Reserve Bank DLT Rail'
  }
};

// Monumental year extraction for the atmospheric background watermark
const ERA_MONUMENTAL_YEARS: Record<string, string> = {
  'act-1-ancient': '600 BCE',
  'act-2-medieval': '1540 CE',
  'act-3-colonial': '1764 CE',
  'act-4-pre-independence': '1858 CE',
  'act-5-early-republic': '1950 CE',
  'act-6-decimal': '1957 CE',
  'act-7-modern': '2016 CE',
  'act-8-digital': '2022+'
};

export const EraSection: React.FC<EraSectionProps> = ({
  act,
  index,
  totalActs,
  onSelectSpecimenImage,
  nextAct,
  onNavigateToNextAct
}) => {
  const [selectedSecondaryIndex, setSelectedSecondaryIndex] = useState<number>(0);

  // Safe fallback if ever an unknown act appears
  const coinSpecimen: CoinSpecimen3D = ERA_COIN_SPECIMENS[act.id] || {
    id: act.id,
    name: act.title,
    rulerOrEra: act.era,
    dateStr: act.timeSpan,
    metal: 'gold',
    obverseImage: act.heroImage,
    reverseImage: act.secondaryImages?.[0]?.url || act.heroImage,
    purity: act.metallurgy.composition.split('/')[0].trim().slice(0, 30),
    weightGrams: act.metallurgy.baseUnit.split('/')[0].trim().slice(0, 24),
    mintLocation: act.metallurgy.mintingMethod.split(';')[0].split('.')[0].trim().slice(0, 28)
  };

  const monumentalYear = ERA_MONUMENTAL_YEARS[act.id] || act.timeSpan.split('–')[0].trim();

  return (
    <section 
      id={act.id}
      className="museum-era-section"
      style={{
        background: `radial-gradient(ellipse 90% 60% at 50% 15%, ${act.accentColor}12, transparent 80%), radial-gradient(ellipse 60% 40% at 85% 85%, ${act.accentColor}0a, transparent 70%)`
      }}
    >
      {/* Massive Ethereal Background Historical Year */}
      <div className="museum-era-monumental-year">
        {monumentalYear}
      </div>

      <div className="museum-era-container">
        {/* Era Header Banner */}
        <header className="museum-era-header">
          <div className="museum-era-pill-row">
            <span 
              className="museum-era-badge"
              style={{
                color: act.accentColor,
                borderColor: `${act.accentColor}55`,
                background: `${act.accentColor}18`
              }}
            >
              {act.actNumber} • {act.era}
            </span>
            <span className="museum-era-timespan">
              <Calendar size={13} style={{ opacity: 0.6 }} />
              {act.timeSpan}
            </span>
            <span className="museum-era-chapter-counter">
              Chapter {index + 1} of {totalActs}
            </span>
          </div>

          <h2 className="museum-era-title">
            {act.title}
          </h2>
          <p className="museum-era-subtitle">
            {act.subtitle}
          </p>
        </header>

        {/* 2-Column Museum Display: Left 3D Stage / Right Curated Curatorial Codex */}
        <div className="museum-era-content-grid">
          
          {/* Left Column: 3D Interactive Coin Specimen & Secondary Relics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Interactive 3D Coin Viewer (Height 420px for Grand Presence) */}
            <CoinStage3D coin={coinSpecimen} height={420} />

            {/* Companion Artifacts Scroller */}
            {act.secondaryImages && act.secondaryImages.length > 0 && (
              <div className="museum-companion-box">
                <div className="museum-companion-title">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={13} style={{ color: '#f59e0b' }} />
                    Companion Numismatic Relics
                  </span>
                  <span>{act.secondaryImages.length} Artifacts</span>
                </div>

                <div className="museum-companion-grid">
                  {act.secondaryImages.map((sec, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        sound.playHover();
                        setSelectedSecondaryIndex(idx);
                        onSelectSpecimenImage?.(sec.url, sec.caption);
                      }}
                      className="museum-companion-card"
                      style={selectedSecondaryIndex === idx ? { borderColor: '#f59e0b', boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)' } : undefined}
                    >
                      <div className="museum-companion-img-frame">
                        <img 
                          src={sec.url} 
                          alt={sec.caption}
                          className="museum-companion-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="museum-companion-caption" title={sec.caption}>
                        {sec.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Unified Museum Curatorial Codex (Seamless, No Clumsy Tabs) */}
          <div className="museum-editorial-col" style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            
            {/* 1. Sovereign Archival Quote */}
            {act.quote && (
              <div className="museum-quote-box">
                <Quote className="museum-quote-icon" />
                <p className="museum-quote-text">
                  "{act.quote.text}"
                </p>
                <div className="museum-quote-author">{act.quote.author}</div>
                <div className="museum-quote-context">{act.quote.context}</div>
              </div>
            )}

            {/* 2. Narrative Historical Chronicle */}
            <div className="museum-chronicle-body">
              {act.narrativeChronicle.map((para, pIdx) => (
                <p key={pIdx} className="museum-chronicle-p">
                  {para}
                </p>
              ))}
            </div>

            {/* 3. Key Sovereigns & Mint Architects */}
            {act.keyFigures && act.keyFigures.length > 0 && (
              <div className="museum-figures-box">
                <div className="museum-figures-label">
                  Sovereigns & Monetary Architects
                </div>
                <div className="museum-figures-chips">
                  {act.keyFigures.map((fig, fIdx) => (
                    <span key={fIdx} className="museum-figure-chip">
                      {fig}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Numismatic & Metallurgical Ledger (Specifications Vitrine) */}
            <div className="museum-standards-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#f59e0b', marginBottom: '8px' }}>
                <Coins size={14} />
                <span>NUMISMATIC & METALLURGICAL CODEX</span>
              </div>

              <div className="museum-metallurgy-grid" style={{ marginBottom: 0 }}>
                <div className="museum-metallurgy-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f59e0b' }}>
                    <Gem size={13} />
                    Base Sovereign Unit
                  </div>
                  <div className="museum-metallurgy-title">
                    {act.metallurgy.baseUnit}
                  </div>
                  <div className="museum-metallurgy-desc">
                    Canonical benchmark codified by the sovereign mint.
                  </div>
                </div>

                <div className="museum-metallurgy-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f59e0b' }}>
                    <ShieldCheck size={13} />
                    Assay Composition
                  </div>
                  <div className="museum-metallurgy-title">
                    {act.metallurgy.composition}
                  </div>
                  <div className="museum-metallurgy-desc">
                    Tested fineness, alloy ratio, and precious metal purity.
                  </div>
                </div>
              </div>

              <div className="museum-standards-row">
                <div className="museum-standards-label">
                  Mathematical Subdivisions & Denominational Ratios
                </div>
                <div className="museum-standards-value">
                  {act.metallurgy.subdivisions}
                </div>
              </div>

              <div className="museum-standards-row">
                <div className="museum-standards-label">
                  Minting Guild Mechanism & Security Technology
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6 }}>
                  {act.metallurgy.mintingMethod}
                </div>
              </div>

              {/* Iconography Breakdown */}
              {act.iconography && act.iconography.length > 0 && (
                <div className="museum-standards-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                  <div className="museum-standards-label">
                    Royal Seals & Symbology
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                    {act.iconography.map((ico, iIdx) => (
                      <div key={iIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', marginTop: '6px', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontWeight: 600, color: '#fff' }}>{ico.symbol}: </span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{ico.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Historical Purchasing Power Mirror */}
            <div className="museum-purchasing-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#f59e0b', marginBottom: '8px' }}>
                <Scale size={14} />
                <span>HISTORICAL PURCHASING POWER MIRROR</span>
              </div>
              <div className="museum-purchasing-metric">
                {act.purchasingPower.standardUnit}
              </div>
              <p className="museum-purchasing-equiv">
                {act.purchasingPower.historicalEquivalent}
              </p>
              <div className="museum-purchasing-benchmark">
                <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Contemporary Purchasing Benchmark:
                </span>
                {act.purchasingPower.contemporaryContext}
              </div>
            </div>

            {/* 6. Sovereign Civilizational Legacy */}
            {act.legacyNote && (
              <div className="museum-legacy-box">
                <Sparkles size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#f59e0b', marginBottom: '4px' }}>
                    Sovereign Legacy
                  </span>
                  {act.legacyNote}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 7. Poetic Era Transition Bridge */}
        {nextAct && (
          <div className="museum-era-transition-bridge">
            <p className="museum-bridge-lead">
              As the legacy of {act.era} settles into history, India's monetary continuum moves onward to {nextAct.era}...
            </p>
            {onNavigateToNextAct && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateToNextAct(nextAct.id);
                }}
                className="museum-bridge-btn"
                title={`Advance to ${nextAct.actNumber}: ${nextAct.era}`}
              >
                <span>Descend to {nextAct.actNumber}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
