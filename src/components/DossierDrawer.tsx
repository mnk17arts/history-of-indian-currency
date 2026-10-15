import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Shield,
  Layers,
  Coins,
  ExternalLink,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { CurrencyItem } from '../data';
import { sources } from '../data';
import { sound } from '../audio';
import { DossierSpecimenStudio } from './DossierSpecimenStudio';

interface Props {
  item: CurrencyItem;
  isOpen: boolean;
  onClose: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const DossierDrawer: React.FC<Props> = ({
  item,
  isOpen,
  onClose,
  onNavigatePrev,
  onNavigateNext,
  currentIndex,
  totalCount
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'security' | 'power' | 'sources'>('specs');
  const [mobilePane, setMobilePane] = useState<'studio' | 'dossier'>('studio');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === 'Escape' && isOpen) {
        sound.playLoupeClick();
        onClose();
      } else if (e.key === 'ArrowLeft' && isOpen && onNavigatePrev) {
        e.preventDefault();
        sound.playCoinClink();
        onNavigatePrev();
      } else if (e.key === 'ArrowRight' && isOpen && onNavigateNext) {
        e.preventDefault();
        sound.playCoinClink();
        onNavigateNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigatePrev, onNavigateNext]);

  if (!isOpen) return null;

  const itemSources = (item.sources || [])
    .map((srcId) => sources.find((s) => s.id === srcId))
    .filter(Boolean);

  return (
    <div className="drawer-backdrop dossier-suite-backdrop" onClick={onClose}>
      <div className="dossier-suite-container" onClick={(e) => e.stopPropagation()}>
        {/* Mobile View Toggle Strip (Small screens only) */}
        <div className="dossier-mobile-pane-switcher">
          {onNavigatePrev && (
            <button
              type="button"
              onClick={() => {
                sound.playCoinClink();
                onNavigatePrev();
              }}
              className="mobile-nav-arrow-btn"
              aria-label="Previous specimen"
              title="Previous specimen"
            >
              <ChevronLeft size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              setMobilePane('studio');
            }}
            className={`mobile-pane-btn ${mobilePane === 'studio' ? 'active-pane' : ''}`}
          >
            <Sparkles size={13} />
            <span>Specimen Studio</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              setMobilePane('dossier');
            }}
            className={`mobile-pane-btn ${mobilePane === 'dossier' ? 'active-pane' : ''}`}
          >
            <BookOpen size={13} />
            <span>Curatorial Dossier</span>
          </button>
          {onNavigateNext && (
            <button
              type="button"
              onClick={() => {
                sound.playCoinClink();
                onNavigateNext();
              }}
              className="mobile-nav-arrow-btn"
              aria-label="Next specimen"
              title="Next specimen"
            >
              <ChevronRight size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              onClose();
            }}
            className="mobile-close-btn"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Left Column: Interactive Specimen Inspection Studio (Occupies the marked space!) */}
        <div className={`dossier-studio-column ${mobilePane === 'studio' ? 'mobile-pane-active' : 'mobile-pane-inactive'}`}>
          <DossierSpecimenStudio
            item={item}
            onClose={onClose}
            onNavigatePrev={onNavigatePrev}
            onNavigateNext={onNavigateNext}
            currentIndex={currentIndex}
            totalCount={totalCount}
          />
        </div>

        {/* Right Column: Curatorial Dossier Metadata Drawer */}
        <aside className={`dossier-drawer ${mobilePane === 'dossier' ? 'mobile-pane-active' : 'mobile-pane-inactive'}`}>
        {/* Drawer Header */}
        <div className="dossier-drawer-header">
          <div className="dossier-header-titles">
            <div className="dossier-eyebrow">
              <BookOpen size={13} className="text-amber-400" />
              <span>NUMISMATIC CURATORIAL DOSSIER</span>
              <span className="dossier-item-id">· {item.id.toUpperCase()}</span>
            </div>
            <h2 className="dossier-headline">{item.denomination}</h2>
            <p className="dossier-subheadline">
              {item.title} <span className="text-amber-400">({item.year})</span>
            </p>
          </div>

          <div className="dossier-header-actions">
            {onNavigatePrev && onNavigateNext && typeof currentIndex === 'number' && typeof totalCount === 'number' && (
              <div className="dossier-nav-cluster" title="Navigate specimens (Use ← and → arrow keys)">
                <button
                  type="button"
                  onClick={() => {
                    sound.playCoinClink();
                    onNavigatePrev();
                  }}
                  className="dossier-nav-arrow-btn"
                  aria-label="Previous specimen (Left Arrow)"
                  title="Previous specimen (Left Arrow key)"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="dossier-counter-pill">
                  <span className="counter-curr">{currentIndex + 1}</span>
                  <span className="counter-sep">/</span>
                  <span className="counter-total">{totalCount}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playCoinClink();
                    onNavigateNext();
                  }}
                  className="dossier-nav-arrow-btn"
                  aria-label="Next specimen (Right Arrow)"
                  title="Next specimen (Right Arrow key)"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                sound.playLoupeClick();
                onClose();
              }}
              className="dossier-close-btn"
              aria-label="Close numismatic dossier"
              title="Close (Escape)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Dossier Segmented Tab Navigation */}
        <div className="dossier-tab-strip">
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              setActiveTab('specs');
            }}
            className={`dossier-tab-pill ${activeTab === 'specs' ? 'active-tab-pill' : ''}`}
          >
            <Layers size={13} />
            <span>Specifications</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              setActiveTab('security');
            }}
            className={`dossier-tab-pill ${activeTab === 'security' ? 'active-tab-pill' : ''}`}
          >
            <Shield size={13} />
            <span>Security & Motifs</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              setActiveTab('power');
            }}
            className={`dossier-tab-pill ${activeTab === 'power' ? 'active-tab-pill' : ''}`}
          >
            <Coins size={13} />
            <span>Purchasing Power</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playLoupeClick();
              setActiveTab('sources');
            }}
            className={`dossier-tab-pill ${activeTab === 'sources' ? 'active-tab-pill' : ''}`}
          >
            <ExternalLink size={13} />
            <span>References</span>
          </button>
        </div>

        {/* Tab 1: Technical Numismatic Matrix */}
        {activeTab === 'specs' && (
          <div className="dossier-body-pane">
            <h3 className="pane-section-title">Physical & Numismatic Properties</h3>
            <div className="dossier-matrix-grid">
              <div className="matrix-tile">
                <span className="matrix-label">ISSUING ENTITY</span>
                <span className="matrix-val">{item.issuer}</span>
              </div>
              <div className="matrix-tile">
                <span className="matrix-label">CIRCULATION PERIOD</span>
                <span className="matrix-val">{item.year} ({item.dateRange})</span>
              </div>
              <div className="matrix-tile">
                <span className="matrix-label">CHRONOLOGICAL ERA</span>
                <span className="matrix-val">{item.era} Era</span>
              </div>
              <div className="matrix-tile">
                <span className="matrix-label">CATEGORY</span>
                <span className="matrix-val">{item.type}</span>
              </div>
              {item.material && (
                <div className="matrix-tile">
                  <span className="matrix-label">METALLIC SUBSTRATE</span>
                  <span className="matrix-val">{item.material}</span>
                </div>
              )}
              {item.dimensions && (
                <div className="matrix-tile">
                  <span className="matrix-label">PHYSICAL DIMENSIONS</span>
                  <span className="matrix-val">{item.dimensions}</span>
                </div>
              )}
              {item.shape && (
                <div className="matrix-tile">
                  <span className="matrix-label">FLAN SHAPE / GEOMETRY</span>
                  <span className="matrix-val">{item.shape}</span>
                </div>
              )}
              <div className="matrix-tile">
                <span className="matrix-label">LEGAL TENDER STATUS</span>
                <span className="matrix-val status-val-pill">
                  <span className={`status-indicator-dot ${item.status.includes('Current') ? 'dot-active' : 'dot-historical'}`} />
                  {item.status}
                </span>
              </div>
            </div>

            <h3 className="pane-section-title" style={{ marginTop: '24px' }}>Curatorial Historical Background</h3>
            <p className="dossier-extended-text">{item.historicalContext}</p>
          </div>
        )}

        {/* Tab 2: Security Features & Motif Inscriptions */}
        {activeTab === 'security' && (
          <div className="dossier-body-pane">
            <h3 className="pane-section-title">Inscriptions & Die Imagery</h3>
            <div className="motif-face-card">
              <span className="motif-face-label">OBVERSE (FRONT) MOTIFS</span>
              <p>{item.obverseDescription}</p>
            </div>
            {item.reverseDescription && (
              <div className="motif-face-card">
                <span className="motif-face-label">REVERSE (BACK) MOTIFS</span>
                <p>{item.reverseDescription}</p>
              </div>
            )}

            <h3 className="pane-section-title" style={{ marginTop: '24px' }}>Forensic Security Architecture</h3>
            {item.securityFeatures && item.securityFeatures.length > 0 ? (
              <div className="security-features-dossier-list">
                {item.securityFeatures.map((sec, idx) => (
                  <div key={idx} className="security-dossier-item">
                    <div className="sec-item-header">
                      <Sparkles size={14} className="text-amber-400" />
                      <strong>{sec.name}</strong>
                    </div>
                    <p>{sec.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="security-dossier-item">
                <div className="sec-item-header">
                  <Sparkles size={14} className="text-amber-400" />
                  <strong>Metallurgical Assaying & Royal Guild Marks</strong>
                </div>
                <p>
                  Authenticity verified via metallic assaying, specific gravity measurement, and royal banker/guild test punches stamped into the metal flan.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Historical Purchasing Power */}
        {activeTab === 'power' && (
          <div className="dossier-body-pane">
            <h3 className="pane-section-title">Purchasing Power & Economic Equivalents</h3>
            <div className="power-highlight-box">
              <div className="power-box-header">
                <Info size={18} className="text-emerald-400 shrink-0" />
                <div>
                  <span className="power-period-tag">
                    ESTIMATED VALUE · {item.purchasingPowerEquivalent.year > 0 ? `${item.purchasingPowerEquivalent.year} CE` : `${Math.abs(item.purchasingPowerEquivalent.year)} BCE`}
                  </span>
                  <h4 className="power-equiv-title">{item.purchasingPowerEquivalent.equivalent}</h4>
                </div>
              </div>
              <p className="power-equiv-detail">{item.purchasingPowerEquivalent.details}</p>
            </div>

            <div className="economic-context-card">
              <h4 className="context-card-title">Macroeconomic Circulation Role</h4>
              <p>
                In the {item.era} era, coinage of this denomination functioned as a vital medium of exchange, facilitating tax collection, imperial soldier stipends, and inter-regional trade throughout the subcontinent.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Archival Sources & Verification */}
        {activeTab === 'sources' && (
          <div className="dossier-body-pane">
            <h3 className="pane-section-title">Primary Archival Citations</h3>
            <p className="sources-intro-text">
              Numismatic data and historical specifications for this exhibit are corroborated by primary monographs and public institutional archives:
            </p>
            <div className="dossier-sources-list">
              {itemSources.map((src) => (
                <div key={src!.id} className="dossier-source-card">
                  <div className="source-card-top">
                    <span className="source-card-id">{src!.id.toUpperCase()}</span>
                    <a
                      href={src!.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="source-card-link"
                    >
                      <span>Institutional Source</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <h4 className="source-card-label">{src!.label}</h4>
                  <p className="source-card-note">{src!.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
      </div>
    </div>
  );
};
