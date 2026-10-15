import React from 'react';
import { Check } from 'lucide-react';
import { sound } from '../../audio';

interface TimelineRailItem {
  id: string;
  actNumber: string;
  title: string;
  era: string;
  timeSpan: string;
  accentColor: string;
}

interface MuseumTimelineRailProps {
  items: TimelineRailItem[];
  activeId: string;
  onSelect: (id: string) => void;
  scrollProgressPct: number;
}

export const MuseumTimelineRail: React.FC<MuseumTimelineRailProps> = React.memo(({
  items,
  activeId,
  onSelect,
  scrollProgressPct
}) => {
  const activeIndex = items.findIndex(item => item.id === activeId);
  const currentItem = activeIndex >= 0 ? items[activeIndex] : items[0];
  const currentActNum = activeIndex >= 0 ? activeIndex + 1 : 1;
  const isHero = activeId === 'hero';

  return (
    <>
      {/* Desktop Vertical Chronological Era Navigator */}
      <nav 
        aria-label="Chronological Era Navigator"
        className="museum-timeline-rail"
      >
        {/* Vertical Track Line with dynamic glowing fill */}
        <div className="timeline-rail-line">
          <div 
            className="timeline-rail-progress"
            style={{ height: `${Math.min(100, Math.max(0, scrollProgressPct))}%` }}
          />
        </div>

        {/* Nodes for each Era */}
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isCompleted = activeIndex > -1 && index < activeIndex;
          const isFuture = activeIndex > -1 && index > activeIndex;

          return (
            <div
              key={item.id}
              className={`timeline-rail-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isFuture ? 'future' : ''}`}
            >
              {/* ONLY Circular Waypoint Pip / Metallic Token is clickable (Left Edge) */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelect(item.id);
                }}
                className="timeline-rail-dot-wrapper"
                title={`${item.actNumber}: ${item.title} (${item.timeSpan})`}
                aria-label={`Navigate to ${item.actNumber}: ${item.era}`}
                aria-current={isActive ? 'step' : undefined}
                style={
                  isActive 
                    ? { 
                        background: 'radial-gradient(circle, #f59e0b 0%, #b45309 100%)',
                        borderColor: '#fef08a',
                        boxShadow: `0 0 20px rgba(245, 158, 11, 0.8), 0 0 40px ${item.accentColor}55`,
                        cursor: 'pointer'
                      } 
                    : isCompleted 
                    ? {
                        background: 'linear-gradient(135deg, #e2e8f0 0%, #64748b 100%)',
                        borderColor: 'rgba(255, 255, 255, 0.6)',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.25)',
                        cursor: 'pointer'
                      }
                    : {
                        background: 'rgba(15, 15, 22, 0.7)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer'
                      }
                }
              >
                {isCompleted ? (
                  <Check size={10} style={{ strokeWidth: 3, color: '#070709' }} />
                ) : (
                  <div 
                    className="timeline-rail-dot"
                    style={
                      isActive 
                        ? { background: '#000', width: '7px', height: '7px' }
                        : { background: 'rgba(255, 255, 255, 0.45)' }
                    } 
                  />
                )}
              </button>

              {/* Tooltip on hover or when active — strictly informational, non-clickable (extends to the right) */}
              <div 
                className="timeline-rail-tooltip"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
                aria-hidden="true"
              >
                <span style={{ display: 'block', fontWeight: 700, color: isActive ? '#fef08a' : '#fff' }}>
                  {item.actNumber}: {item.era}
                </span>
                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px', display: 'block' }}>
                  {item.timeSpan}
                </span>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Compact Minimal Mobile Era Indicator (Rendered only on mobile screens when not on hero) */}
      {!isHero && (
        <nav 
          className="museum-timeline-mobile" 
          aria-label="Mobile Chronological Era Progress"
        >
          <div className="museum-timeline-mobile-pill">
            <div className="museum-timeline-mobile-text">
              <span className="museum-timeline-mobile-badge">ACT {currentActNum} OF {items.length}</span>
              <span className="museum-timeline-mobile-sep">•</span>
              <span className="museum-timeline-mobile-era">{currentItem.era}</span>
            </div>

            {/* Micro Act Waypoint Dots */}
            <div className="museum-timeline-mobile-dots">
              {items.map((item, idx) => {
                const isDotActive = idx === activeIndex;
                const isDotDone = activeIndex > -1 && idx < activeIndex;
                return (
                  <button
                    key={`m-dot-${item.id}`}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelect(item.id);
                    }}
                    className={`museum-timeline-mobile-dot ${isDotActive ? 'active' : ''} ${isDotDone ? 'completed' : ''}`}
                    aria-label={`Jump to ${item.actNumber}: ${item.era}`}
                    title={`${item.actNumber}: ${item.era}`}
                  />
                );
              })}
            </div>

            {/* Micro 2px Progress Line */}
            <div className="museum-timeline-mobile-track">
              <div 
                className="museum-timeline-mobile-fill" 
                style={{ width: `${Math.min(100, Math.max(0, scrollProgressPct))}%` }} 
              />
            </div>
          </div>
        </nav>
      )}
    </>
  );
});
