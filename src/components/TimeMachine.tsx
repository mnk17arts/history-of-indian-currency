import React, { useState } from 'react';
import { ShoppingBag, TrendingDown, Clock, ArrowRight } from 'lucide-react';
import { purchasingPowerTimeline } from '../data';
import { sound } from '../audio';

export const TimeMachine: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const current = purchasingPowerTimeline[selectedIndex];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (val !== selectedIndex) {
      sound.playSlide();
      setSelectedIndex(val);
    }
  };

  return (
    <section id="time-machine" className="time-machine-section">
      <div className="section-head">
        <div className="section-eyebrow">
          <Clock size={14} className="text-amber-400" />
          <span>PURCHASING POWER TIME MACHINE</span>
        </div>
        <h2>What could <em>₹1 buy</em> across centuries?</h2>
        <p className="section-subtitle">
          From a full sheep under Sher Shah Suri to a piece of candy today — slide across 500 years of monetary inflation and currency history.
        </p>
      </div>

      <div className="time-machine-container">
        {/* Interactive Slider */}
        <div className="slider-wrapper">
          <input
            type="range"
            min={0}
            max={purchasingPowerTimeline.length - 1}
            value={selectedIndex}
            onChange={handleSliderChange}
            className="time-slider"
            aria-label="Select era for purchasing power comparison"
          />

          <div className="timeline-ticks">
            {purchasingPowerTimeline.map((step, idx) => (
              <button
                key={step.year}
                type="button"
                onClick={() => {
                  sound.playSlide();
                  setSelectedIndex(idx);
                }}
                className={`tick-button ${idx === selectedIndex ? 'active-tick' : ''}`}
              >
                <span className="tick-dot" />
                <span className="tick-year">{step.year}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Period Spotlight Card */}
        <div className="time-card">
          <div className="time-card-left">
            <span className="time-period-tag">{current.label}</span>
            <h3 className="time-year">{current.year}</h3>
            <p className="time-context">{current.wageContext}</p>
          </div>

          <div className="time-card-right">
            <div className="basket-box">
              <div className="basket-header">
                <ShoppingBag size={18} className="text-amber-400" />
                <span>WHAT 1 RUPEE BOUGHT:</span>
              </div>
              <div className="basket-value">{current.basket}</div>
            </div>

            <div className="conversion-box">
              <div className="conversion-header">
                <TrendingDown size={16} className="text-emerald-400" />
                <span>2026 PURCHASING POWER EQUIVALENT:</span>
              </div>
              <div className="conversion-value">{current.equivalentIn2026INR}</div>
              <span className="conversion-sub">in modern purchasing parity</span>
            </div>
          </div>
        </div>

        {/* Multi-era Quick Comparison Grid */}
        <div className="quick-compare-strip">
          <div className="strip-title">Historical Milestones At A Glance:</div>
          <div className="strip-grid">
            <div className="strip-item">
              <strong>1540 (Sher Shah Suri)</strong>
              <span>1 Rupiya = 64 kg wheat (~₹2,800 today)</span>
            </div>
            <ArrowRight size={14} className="strip-arrow" />
            <div className="strip-item">
              <strong>1947 (Independence)</strong>
              <span>1 Rupee = 16 kg wheat (~₹140 today)</span>
            </div>
            <ArrowRight size={14} className="strip-arrow" />
            <div className="strip-item">
              <strong>2026 (Today)</strong>
              <span>1 Rupee = 1 piece of hard candy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
