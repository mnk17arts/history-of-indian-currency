import React, { useState } from 'react';
import { ArrowDown, Calculator, Scale, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { sound } from '../../audio';

interface ConversionStep {
  annas: number;
  annasLabel: string;
  pice: number;
  paise: number;
  paiseLabel: string;
  title: string;
  dailyItem: string;
  coinIcon: string;
}

const CONVERSION_BENCHMARKS: ConversionStep[] = [
  {
    annas: 1,
    annasLabel: '1 Anna',
    pice: 4,
    paise: 6,
    paiseLabel: '6.25 (Rounded to 6 Naye Paise)',
    title: 'Daily Micro-Transaction',
    dailyItem: 'One hot cup of chai or a clay kulhad of curd in 1957',
    coinIcon: './specimens/republic_1954_two_annas_obs.jpg'
  },
  {
    annas: 2,
    annasLabel: '2 Annas',
    pice: 8,
    paise: 12,
    paiseLabel: '12.5 (Rounded to 13 Naye Paise)',
    title: 'Postage & Municipal Transit',
    dailyItem: 'Two postal postcards or a cross-town tram ticket in Bombay',
    coinIcon: './specimens/republic_1954_two_annas_obs.jpg'
  },
  {
    annas: 4,
    annasLabel: '4 Annas (Chavanni)',
    pice: 16,
    paise: 25,
    paiseLabel: '25 Naye Paise (Exact 1/4 Rupee)',
    title: 'Quarter Rupee Standard',
    dailyItem: 'A cinema balcony seat or half kilogram of wheat flour',
    coinIcon: './specimens/decimal_1957_ten_naye_paise_obs.jpg'
  },
  {
    annas: 8,
    annasLabel: '8 Annas (Athanai)',
    pice: 32,
    paise: 50,
    paiseLabel: '50 Naye Paise (Exact 1/2 Rupee)',
    title: 'Half Rupee Pillar',
    dailyItem: 'One liter of fresh buffalo milk or two liters of kerosene',
    coinIcon: './specimens/decimal_1957_ten_naye_paise_rev.jpg'
  },
  {
    annas: 12,
    annasLabel: '12 Annas (Pauna Rupee)',
    pice: 48,
    paise: 75,
    paiseLabel: '75 Naye Paise (3/4 Rupee)',
    title: 'Three-Quarter Standard',
    dailyItem: 'A full day of artisan farm labor wages in rural Punjab',
    coinIcon: './specimens/decimal_1957_ten_naye_paise_obs.jpg'
  },
  {
    annas: 16,
    annasLabel: '16 Annas (Solah Aane)',
    pice: 64,
    paise: 100,
    paiseLabel: '100 Naye Paise (1 Sovereign Rupee)',
    title: 'Complete Sovereign Rupee',
    dailyItem: 'A family ration of rice, lentils, and cooking oil for 3 days',
    coinIcon: './specimens/sagar_samrat_1_rupee_obverse.jpg'
  }
];

export const DecimalConverter: React.FC = () => {
  const [sliderIndex, setSliderIndex] = useState<number>(5); // default to 16 Annas (100 Paise)
  const currentStep = CONVERSION_BENCHMARKS[sliderIndex];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sound.playHover();
    setSliderIndex(parseInt(e.target.value, 10));
  };

  const handleSelectPreset = (index: number) => {
    sound.playClick();
    setSliderIndex(index);
  };

  return (
    <div className="decimal-converter-container">
      {/* Exhibit Header */}
      <div className="decimal-converter-header">
        <div className="decimal-badge">
          <Calculator size={13} style={{ color: '#10b981' }} />
          <span>SIGNATURE EXHIBIT • THE 1957 DECIMAL CONVERSION</span>
        </div>
        <h3 className="decimal-converter-title">
          From 16 Annas to 100 Paise: The Metric Transformation
        </h3>
        <p className="decimal-converter-subtitle">
          On April 1, 1957, India enacted the Indian Coinage Amendment Act, abolishing fractional arithmetic and uniting the nation under modern base-10 mathematics.
        </p>
      </div>

      {/* Main Interactive Conversion Stage */}
      <div className="decimal-stage-card">
        
        {/* Three Tier Waterfall Comparison Bar */}
        <div className="decimal-waterfall-grid">
          
          {/* Tier 1: 16 Annas System */}
          <div className="decimal-tier-column anna-tier">
            <div className="decimal-tier-head">
              <span className="decimal-tier-sub">ANCIENT ARITHMETIC</span>
              <h4 className="decimal-tier-name">16 Annas</h4>
            </div>
            <div className="decimal-tier-display">
              <span className="decimal-counter-num">{currentStep.annas}</span>
              <span className="decimal-counter-unit">Annas</span>
            </div>
            <p className="decimal-tier-note">
              Based on duodecimal 1/16 fractions dating back to medieval bazaars.
            </p>
          </div>

          {/* Transition Arrow 1 */}
          <div className="decimal-waterfall-arrow">
            <ArrowDown size={20} className="decimal-arrow-icon" />
          </div>

          {/* Tier 2: 64 Pice Sub-system */}
          <div className="decimal-tier-column pice-tier">
            <div className="decimal-tier-head">
              <span className="decimal-tier-sub">INTERMEDIATE UNIT</span>
              <h4 className="decimal-tier-name">64 Pice</h4>
            </div>
            <div className="decimal-tier-display">
              <span className="decimal-counter-num">{currentStep.pice}</span>
              <span className="decimal-counter-unit">Pice</span>
            </div>
            <p className="decimal-tier-note">
              1 Anna = 4 Pice = 12 Pies (192 total subdivisions per Rupee).
            </p>
          </div>

          {/* Transition Arrow 2 */}
          <div className="decimal-waterfall-arrow">
            <ArrowDown size={20} className="decimal-arrow-icon" />
          </div>

          {/* Tier 3: 100 Paise Metric System */}
          <div className="decimal-tier-column paise-tier">
            <div className="decimal-tier-head">
              <span className="decimal-tier-sub">MODERN DECIMAL</span>
              <h4 className="decimal-tier-name">100 Naye Paise</h4>
            </div>
            <div className="decimal-tier-display">
              <span className="decimal-counter-num highlight-metric">{currentStep.paise}</span>
              <span className="decimal-counter-unit">Naye Paise</span>
            </div>
            <p className="decimal-tier-note">
              1 Rupee = 100 units. Rational metric order introduced nationwide.
            </p>
          </div>

        </div>

        {/* Interactive Dual-Rail Slider Control */}
        <div className="decimal-slider-section">
          <div className="decimal-slider-labels">
            <span className="decimal-slider-tag">SLIDE TO CONVERT BETWEEN MONETARY SYSTEMS</span>
            <span className="decimal-slider-val">{currentStep.title}</span>
          </div>

          <input 
            type="range"
            min="0"
            max="5"
            step="1"
            value={sliderIndex}
            onChange={handleSliderChange}
            className="decimal-range-input"
            aria-label="Decimal conversion step slider"
          />

          <div className="decimal-slider-ticks">
            {CONVERSION_BENCHMARKS.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(idx)}
                className={`decimal-tick-btn ${idx === sliderIndex ? 'active' : ''}`}
              >
                <span>{step.annasLabel}</span>
                <span className="decimal-tick-sub">{step.paise}p</span>
              </button>
            ))}
          </div>
        </div>

        {/* Real-Life Historical Basket Card */}
        <div className="decimal-context-card">
          <div className="decimal-context-visual">
            <div className="decimal-context-coin">
              <img src={currentStep.coinIcon} alt={currentStep.annasLabel} />
            </div>
            <div>
              <div className="decimal-context-title">
                <Sparkles size={13} style={{ color: '#10b981' }} />
                <span>1957 BAZAAR PURCHASING EQUIVALENT</span>
              </div>
              <p className="decimal-context-item">
                {currentStep.dailyItem}
              </p>
            </div>
          </div>

          <div className="decimal-formula-capsule">
            <span className="decimal-formula-lbl">OFFICIAL 1957 CONVERSION RULE:</span>
            <code className="decimal-formula-code">{currentStep.annas} Annas = {currentStep.pice} Pice = {currentStep.paiseLabel}</code>
          </div>
        </div>

      </div>
    </div>
  );
};
