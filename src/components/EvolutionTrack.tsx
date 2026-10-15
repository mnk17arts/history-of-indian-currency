import React, { useState } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { tenRupeeEvolution } from '../data';
import { sound } from '../audio';

export const EvolutionTrack: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(tenRupeeEvolution.length - 1);
  const current = tenRupeeEvolution[activeStep];

  return (
    <section id="evolution" className="evolution-section">
      <div className="section-head">
        <div className="section-eyebrow">
          <Layers size={14} className="text-amber-400" />
          <span>DENOMINATION EVOLUTION</span>
        </div>
        <h2>₹10, <em>Through Seven Decades</em></h2>
        <p className="section-subtitle">
          India’s most frequently redesigned and circulated paper banknote — from British wartime emergency issues to modern Konark Sun Temple engraving.
        </p>
      </div>

      <div className="evolution-container">
        {/* Step Selector Buttons */}
        <div className="evolution-nav">
          {tenRupeeEvolution.map((item, idx) => (
            <button
              key={item.step}
              type="button"
              onClick={() => {
                sound.playSlide();
                setActiveStep(idx);
              }}
              className={`evolution-tab ${idx === activeStep ? 'active-evolution' : ''}`}
            >
              <span className="tab-step">{item.step}</span>
              <span className="tab-name">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Spotlight Showcase of Selected Decade */}
        <div className="evolution-showcase" style={{ borderColor: `${current.color}66` }}>
          <div className="showcase-banner" style={{ background: `linear-gradient(135deg, ${current.color}33, transparent)` }}>
            <div className="showcase-year">{current.step}</div>
            <div className="showcase-titles">
              <h3>{current.name}</h3>
              <span className="showcase-theme">Theme: {current.theme}</span>
            </div>
          </div>

          <div className="showcase-body">
            <div className="showcase-spec">
              <span className="spec-label">Obverse / Portrait:</span>
              <span className="spec-value">{current.portrait}</span>
            </div>
            <div className="showcase-spec">
              <span className="spec-label">Reverse Motif:</span>
              <span className="spec-value">{current.reverse}</span>
            </div>
            <div className="showcase-spec">
              <span className="spec-label">Key Security Evolution:</span>
              <span className="spec-value highlight-gold">{current.feature}</span>
            </div>
          </div>

          <div className="evolution-arrow-hint">
            <span>Next redesign in sequence</span>
            <ArrowRight size={14} className="inline ml-1" />
          </div>
        </div>
      </div>
    </section>
  );
};
