import React from 'react';
import { RotateCcw, BookOpen, Sparkles, Landmark, Compass } from 'lucide-react';
import { CoinStage3D, CoinSpecimen3D } from './CoinStage3D';
import { sound } from '../../audio';

interface GrandFinaleEndingProps {
  onRevisitOdyssey: () => void;
  onExitMuseum?: () => void;
}

const FINALE_DIGITAL_RUPEE: CoinSpecimen3D = {
  id: 'finale-digital-rupee',
  name: 'Reserve Bank Digital Rupee (e₹)',
  rulerOrEra: 'Present & Beyond • The Sovereign Continuum',
  dateStr: '2026 & Beyond',
  metal: 'silver',
  obverseImage: './specimens/digital_rupee_obverse.svg',
  reverseImage: './specimens/digital_rupee_reverse.svg',
  purity: 'Sovereign Cryptographic Token',
  weightGrams: '100% Sovereign Liability of India',
  mintLocation: 'Reserve Bank of India'
};

export const GrandFinaleEnding: React.FC<GrandFinaleEndingProps> = React.memo(({
  onRevisitOdyssey,
  onExitMuseum
}) => {
  return (
    <section className="museum-finale-section" aria-label="Museum Grand Finale">
      <div className="museum-finale-backdrop" aria-hidden="true" />

      <div className="museum-finale-container">
        
        {/* Subtle Sovereign Continuum Pill */}
        <div className="museum-finale-badge">
          <Sparkles size={13} style={{ color: '#818cf8' }} />
          <span>THE SOVEREIGN CONTINUUM</span>
        </div>

        {/* Centerpiece: One Slowly Rotating Digital Rupee */}
        <div className="museum-finale-coin-stage">
          <div className="museum-finale-spotlight-beam" />
          <CoinStage3D coin={FINALE_DIGITAL_RUPEE} height={420} variant="pure" />
        </div>

        {/* Monolithic Final Message */}
        <div className="museum-finale-message-lockup">
          <p className="museum-finale-epilogue-quote">
            "The story of Indian currency continues..."
          </p>

          <div className="museum-finale-tribute">
            <span className="museum-finale-tribute-lead">Thank you for visiting</span>
            <h2 className="museum-finale-museum-title">
              Museum of Indian Currency
            </h2>
            <p className="museum-finale-caption">
              From the 600 BCE punch-marked silver of ancient Magadha to Sher Shah Suri's 178-grain silver standard, and into cryptographic digital tokens—the Rupee remains the sovereign financial heartbeat of one-sixth of humanity.
            </p>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="museum-finale-btn-group">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onRevisitOdyssey();
            }}
            className="museum-primary-replay-btn"
          >
            <RotateCcw size={15} />
            <span>Revisit the Odyssey</span>
          </button>

          {onExitMuseum && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onExitMuseum();
              }}
              className="museum-secondary-archive-btn"
            >
              <BookOpen size={15} style={{ color: '#818cf8' }} />
              <span>Inspect 2,500-Yr Archive</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
});
