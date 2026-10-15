import React, { useState } from 'react';
import { RotateCw, Eye } from 'lucide-react';
import { sound } from '../../audio';

export interface VitrineArtifact {
  url: string;
  reverseUrl?: string;
  title: string;
  era: string;
  caption: string;
}

interface NumismaticVitrineItemProps {
  artifact: VitrineArtifact;
  className?: string;
  onInspect?: (
    artifactOrUrl: VitrineArtifact | string,
    titleOrSide?: string,
    reverseUrl?: string,
    era?: string,
    caption?: string
  ) => void;
}

export const NumismaticVitrineItem: React.FC<NumismaticVitrineItemProps> = ({
  artifact,
  className = '',
  onInspect
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const hasReverse = Boolean(artifact.reverseUrl && artifact.reverseUrl !== artifact.url);

  const activeImage = isFlipped && hasReverse && artifact.reverseUrl ? artifact.reverseUrl : artifact.url;
  const activeSideLabel = isFlipped && hasReverse ? 'Reverse' : 'Obverse';

  const handleToggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasReverse) return;
    sound.playClick();
    setIsFlipped(prev => !prev);
  };

  const handleCardClick = () => {
    sound.playHover();
    if (onInspect) {
      // Passes full object or positional arguments for seamless compatibility
      onInspect(
        artifact,
        isFlipped && hasReverse ? 'reverse' : 'obverse',
        artifact.reverseUrl,
        artifact.era,
        artifact.caption
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Inspect ${artifact.title}, ${artifact.era}. Current view: ${activeSideLabel}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={`museum-mounted-vitrine ${className} ${isFlipped && hasReverse ? 'museum-vitrine-flipped' : ''}`}
    >
      <div className="museum-vitrine-stage">
        {/* Specimen Artwork Image */}
        <img 
          src={activeImage} 
          alt={`${artifact.title} (${activeSideLabel})`}
          loading="lazy"
          className="museum-vitrine-img"
        />

        {/* Tactile Flip Toggle Icon (Rendered strictly when a distinct reverse scan exists) */}
        {hasReverse && (
          <button
            type="button"
            onClick={handleToggleFlip}
            className="museum-vitrine-flip-pill"
            title={`Flip specimen between Obverse and Reverse (Currently: ${activeSideLabel})`}
            aria-label={`Flip to view ${isFlipped ? 'Obverse' : 'Reverse'}`}
          >
            <RotateCw size={10} className={`museum-flip-icon ${isFlipped ? 'museum-flip-icon-rev' : ''}`} />
            <span>{isFlipped ? 'REV' : 'OBS'}</span>
          </button>
        )}

        {/* Quick Inspection Prompt Indicator */}
        <div className="museum-vitrine-hover-cue">
          <Eye size={12} />
        </div>
      </div>

      <div className="museum-vitrine-caption">
        <div className="museum-vitrine-era-pill">
          {artifact.era}
        </div>
        <h4 className="museum-vitrine-name">
          {artifact.title}
        </h4>
        <p className="museum-vitrine-meta">
          {artifact.caption}
        </p>
      </div>
    </div>
  );
};
