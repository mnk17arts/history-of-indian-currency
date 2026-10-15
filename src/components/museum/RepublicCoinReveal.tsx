import React, { useState } from 'react';
import { Sparkles, Shield, Award, Landmark, CheckCircle2, ChevronRight } from 'lucide-react';
import { sound } from '../../audio';

interface RepublicCoin {
  id: string;
  denomination: string;
  subdivision: string;
  alloy: string;
  weight: string;
  edge: string;
  motif: string;
  symbolism: string;
  historicalContext: string;
  obverseImage: string;
  reverseImage?: string;
}

const REPUBLIC_1950_COINS: RepublicCoin[] = [
  {
    id: 'one-rupee',
    denomination: 'One Rupee (₹1)',
    subdivision: '16 Annas • Standard Unit',
    alloy: '100% Pure Electrolytic Nickel',
    weight: '11.66 grams (180 Grains)',
    edge: 'Milled Security Edge',
    motif: 'Twin Corn Ears & Sarnath Capital',
    symbolism: 'Agrarian self-reliance and sovereign food security',
    historicalContext: 'Replaced the British monarch with four Asiatic lions, ending colonial numismatic subjugation on August 15, 1950.',
    obverseImage: './specimens/republic_1950_one_rupee_coin_obs.jpg',
    reverseImage: './specimens/republic_1950_one_rupee_coin_rev.jpg'
  },
  {
    id: 'half-rupee',
    denomination: 'Half Rupee (8 Annas)',
    subdivision: '8 Annas (1/2 Rupee)',
    alloy: 'Pure Nickel',
    weight: '5.83 grams',
    edge: 'Milled Edge',
    motif: 'Wheat Stalks & Ashoka Pillar',
    symbolism: 'Peasant labor and agricultural renaissance',
    historicalContext: 'Carried dual script (English and Hindi), bridging regional linguistic diversity under a unified currency.',
    obverseImage: './specimens/republic_1950_one_rupee_coin_obs.jpg'
  },
  {
    id: 'quarter-rupee',
    denomination: 'Quarter Rupee (4 Annas)',
    subdivision: '4 Annas (1/4 Rupee)',
    alloy: 'Pure Nickel',
    weight: '2.91 grams',
    edge: 'Milled Edge',
    motif: 'Flanking Grain Ears',
    symbolism: 'Everyday egalitarian trade and bazaar stability',
    historicalContext: 'Struck in millions at the Bombay and Calcutta mints to replace silver coins hoarded during WWII.',
    obverseImage: './specimens/republic_1950_one_rupee_coin_rev.jpg'
  },
  {
    id: 'two-annas',
    denomination: 'Two Annas',
    subdivision: '1/8 Rupee (8 Pice)',
    alloy: 'Cupro-Nickel Alloy (75% Cu, 25% Ni)',
    weight: '5.83 grams',
    edge: 'Distinctive 8-Scalloped Flan',
    motif: 'Sacred Brahmani Bull',
    symbolism: 'Indus Valley heritage & pastoral strength',
    historicalContext: 'Its scalloped perimeter enabled tactile recognition for millions of illiterate citizens.',
    obverseImage: './specimens/republic_1954_two_annas_obs.jpg',
    reverseImage: './specimens/republic_1954_two_annas_rev.jpg'
  },
  {
    id: 'one-anna',
    denomination: 'One Anna',
    subdivision: '1/16 Rupee (4 Pice)',
    alloy: 'Cupro-Nickel Alloy',
    weight: '3.88 grams',
    edge: '12-Scalloped Wavy Edge',
    motif: 'Humped Bull of Rampurva',
    symbolism: 'Vedic perseverance and peaceful endurance',
    historicalContext: 'Carried the Ashoka Lion Capital on obverse and denomination in Roman, Devanagari, Urdu, and Bengali.',
    obverseImage: './specimens/republic_1954_two_annas_obs.jpg'
  },
  {
    id: 'one-pice',
    denomination: 'Single Pice',
    subdivision: '1/64 Rupee (1/4 Anna)',
    alloy: 'Bronze (97% Copper, 2.5% Zinc, 0.5% Tin)',
    weight: '3.88 grams',
    edge: 'Plain Smooth Rim',
    motif: 'Galloping Horse of Sarnath Abacus',
    symbolism: 'Dynamic speed, national valor, and forward movement',
    historicalContext: 'The bedrock coin of rural daily sustenance; bought a cup of tea or a local bus fare in 1950.',
    obverseImage: './specimens/republic_1950_one_rupee_coin_obs.jpg'
  }
];

export const RepublicCoinReveal: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [selectedCoinId, setSelectedCoinId] = useState<string>('one-rupee');

  const selectedCoin = REPUBLIC_1950_COINS.find(c => c.id === selectedCoinId) || REPUBLIC_1950_COINS[0];

  const handleTriggerReveal = () => {
    sound.playSuccess();
    setIsRevealed(true);
  };

  const handleSelectCoin = (id: string) => {
    sound.playClick();
    setSelectedCoinId(id);
  };

  return (
    <div className="republic-reveal-container">
      {/* Museum Header */}
      <div className="republic-reveal-header">
        <div className="republic-badge">
          <Shield size={13} style={{ color: '#f59e0b' }} />
          <span>SIGNATURE EXHIBIT • 1950 REPUBLIC COIN REVEAL</span>
        </div>
        <h3 className="republic-reveal-title">
          The Sarnath Lion Capital & The First Sovereign Coinage
        </h3>
        <p className="republic-reveal-subtitle">
          On January 26, 1950, India adopted the Lion Capital of Ashoka as its State Emblem. Tap the seal to summon the inaugural post-colonial coinage set.
        </p>
      </div>

      {/* Interactive Capital Seal Centerpiece */}
      <div className="republic-capital-stage">
        <button
          type="button"
          onClick={handleTriggerReveal}
          className={`republic-seal-trigger ${isRevealed ? 'republic-seal-revealed' : ''}`}
          aria-label="Tap the Sarnath Lion Capital to reveal 1950 Republic coinage"
        >
          {/* Animated Gold Ring Waves */}
          <div className="republic-seal-glow" />
          <div className="republic-seal-ripple-1" />
          <div className="republic-seal-ripple-2" />

          {/* Sarnath Lion Capital Emblem Graphic */}
          <div className="republic-emblem-core">
            <div className="republic-emblem-icon">
              <Landmark size={36} style={{ color: '#f59e0b' }} />
            </div>
            <span className="republic-emblem-caption">
              {isRevealed ? 'SARNATH LION CAPITAL' : 'TAP TO REVEAL 1950 COINS'}
            </span>
            <span className="republic-emblem-sub">
              {isRevealed ? 'Sovereign Emblem • Jan 26, 1950' : 'Sovereign Coinage Set'}
            </span>
          </div>
        </button>
      </div>

      {/* Emergeable Coin Selector Bar */}
      <div className={`republic-emerged-stage ${isRevealed ? 'republic-emerged-active' : ''}`}>
        <div className="republic-selector-label">
          <Award size={14} style={{ color: '#f59e0b' }} />
          <span>INAUGURAL 1950 REPUBLIC OF INDIA COINAGE SET</span>
        </div>

        <div className="republic-coins-row">
          {REPUBLIC_1950_COINS.map((coin) => {
            const isSelected = coin.id === selectedCoinId;
            return (
              <button
                key={coin.id}
                type="button"
                onClick={() => handleSelectCoin(coin.id)}
                className={`republic-coin-chip ${isSelected ? 'republic-coin-chip-active' : ''}`}
              >
                <div className="republic-chip-thumb">
                  <img src={coin.obverseImage} alt={coin.denomination} />
                </div>
                <div className="republic-chip-info">
                  <span className="republic-chip-name">{coin.denomination}</span>
                  <span className="republic-chip-sub">{coin.subdivision}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Coin Museum Annotation Card (Labels Only, Crisp Specimen Callouts) */}
        <div className="republic-annotation-modal">
          <div className="republic-annotation-grid">
            {/* Visual Coin Presentation */}
            <div className="republic-annotation-visual">
              <div className="republic-specimen-mount">
                <img 
                  src={selectedCoin.obverseImage} 
                  alt={`${selectedCoin.denomination} Obverse`} 
                  className="republic-specimen-large"
                />
              </div>
              <div className="republic-specimen-stamp">
                <span className="republic-specimen-tag">BOMBAY & CALCUTTA ROYAL MINTS</span>
                <span className="republic-specimen-year">1950 CE</span>
              </div>
            </div>

            {/* Specimen Annotation Labels */}
            <div className="republic-annotation-details">
              <div className="republic-anno-header">
                <span className="republic-anno-badge">{selectedCoin.subdivision}</span>
                <h4 className="republic-anno-title">{selectedCoin.denomination}</h4>
              </div>

              <div className="republic-label-group">
                <div className="republic-label-item">
                  <span className="republic-label-title">Motif & Heraldry</span>
                  <p className="republic-label-val">{selectedCoin.motif}</p>
                </div>

                <div className="republic-label-item">
                  <span className="republic-label-title">Symbolism</span>
                  <p className="republic-label-val">{selectedCoin.symbolism}</p>
                </div>

                <div className="republic-label-item">
                  <span className="republic-label-title">Metallurgical Alloy</span>
                  <p className="republic-label-val">{selectedCoin.alloy}</p>
                </div>

                <div className="republic-label-item">
                  <span className="republic-label-title">Physical Standard</span>
                  <p className="republic-label-val">{selectedCoin.weight} • {selectedCoin.edge}</p>
                </div>
              </div>

              <div className="republic-context-capsule">
                <div className="republic-context-head">
                  <CheckCircle2 size={13} style={{ color: '#10b981' }} />
                  <span>Historical Context</span>
                </div>
                <p className="republic-context-text">
                  {selectedCoin.historicalContext}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
