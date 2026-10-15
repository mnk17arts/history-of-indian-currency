import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Scale,
  BookOpen,
  Shield,
  Info
} from 'lucide-react';
import { items, type CurrencyItem, type Era } from '../data';
import { sound } from '../audio';
import { InteractiveSpecimen } from './InteractiveSpecimen';
import { DossierDrawer } from './DossierDrawer';
import { CompareModal } from './CompareModal';
import { ResearchDrawer } from './ResearchDrawer';
import { SearchModal } from './SearchModal';
import { CinematicTour } from './CinematicTour';

const ERAS: (Era | 'All')[] = [
  'All',
  'Ancient',
  'Medieval',
  'Colonial',
  'Pre-independence',
  'Early Republic',
  'Decimal India',
  'Modern India',
  'Digital Future'
];

interface ArchiveCatalogProps {
  onNavigateToMuseum: () => void;
  theme?: 'dark' | 'light';
}

export const ArchiveCatalog: React.FC<ArchiveCatalogProps> = ({
  onNavigateToMuseum,
  theme = 'dark'
}) => {
  const [selectedEra, setSelectedEra] = useState<Era | 'All'>('All');
  // Default to Exhibit #316 (Kabul Shahi 750–900 CE Silver Bull Coin)
  const [selectedItem, setSelectedItem] = useState<CurrencyItem>(items[315] || items[0]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isCinematicTourOpen, setIsCinematicTourOpen] = useState<boolean>(false);
  const [isResearchOpen, setIsResearchOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  const currentExhibitIndex = useMemo(() => {
    const idx = items.findIndex((i) => i.id === selectedItem.id);
    return idx >= 0 ? idx : 0;
  }, [selectedItem]);

  const [jumpInput, setJumpInput] = useState<string>((currentExhibitIndex + 1).toString());

  // Keep jump input synced with active exhibit
  useEffect(() => {
    setJumpInput((currentExhibitIndex + 1).toString());
  }, [currentExhibitIndex]);

  // Keep active thumbnail centered in carousel
  useEffect(() => {
    if (activeThumbRef.current && carouselRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedItem.id]);

  const handleJumpToExhibit = (numStr: string) => {
    const clean = numStr.replace(/[^0-9]/g, '');
    const num = parseInt(clean, 10);
    if (!isNaN(num) && num >= 1 && num <= items.length) {
      const target = items[num - 1];
      handleSelectSpecimen(target);
      if (selectedEra !== 'All' && target.era !== selectedEra) {
        setSelectedEra('All');
      }
    } else {
      setJumpInput((currentExhibitIndex + 1).toString());
    }
  };

  const filteredItems = useMemo(() => {
    if (selectedEra === 'All') return items;
    return items.filter((item) => item.era === selectedEra);
  }, [selectedEra]);

  const handleSelectSpecimen = (item: CurrencyItem) => {
    if (item.type === 'Coin') {
      sound.playCoinClink();
    } else {
      sound.playPaperFlick();
    }
    setSelectedItem(item);
  };

  const handleNavigateSpecimen = (direction: number) => {
    const currentIndex = items.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + direction + items.length) % items.length;
    handleSelectSpecimen(items[nextIndex]);
  };

  // Keyboard navigation & shortcuts for catalog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDossierOpen || isCompareOpen || isSearchOpen || isResearchOpen) {
        return;
      }
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === 'ArrowLeft') {
        handleNavigateSpecimen(-1);
      } else if (e.key === 'ArrowRight') {
        handleNavigateSpecimen(1);
      } else if (e.key === '/' || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, isDossierOpen, isCompareOpen, isSearchOpen, isResearchOpen]);

  return (
    <>
      {/* Hero Section with Ambient Blended Background Panorama */}
      <section className="hero-section">
        {/* Ambient Blended Panorama Layer */}
        <div className="hero-bg-layer" aria-hidden="true">
          <picture>
            <source media="(max-width: 768px)" srcSet="./landing/hero_9x16.webp" />
            <source media="(max-width: 1200px)" srcSet="./landing/hero_4x3.webp" />
            <img
              src="./landing/hero_16x9.webp"
              alt=""
              className="hero-bg-img"
              loading="eager"
            />
          </picture>
          {/* Stationary Cinematic Dot Matrix Overlay matching Museum Hero Acts */}
          <div className="hero-dot-matrix-overlay" aria-hidden="true" />
          {/* Localized Bottom & Ambient Scrim matching Museum Acts */}
          <div className="hero-bg-scrim" />
          {/* Atmospheric Floating Lantern Light & Golden Dust Overlay matching Museum Acts */}
          <div className="hero-atmosphere-overlay" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={13} className="text-amber-400" />
            <span>A 2,500-YEAR MONETARY ODYSSEY</span>
          </div>
          <h1>
            THE <em>RUPEE</em>
          </h1>
          <p className="hero-lead">
            From the stamped silver Karshapanas of Emperor Ashoka to Sher Shah Suri’s 1542 Rupiya,
            imperial Victoria coinage, high-security banknotes, and the digital sovereign e-Rupee.
          </p>

          <div className="hero-stats">
            <div className="stat-card">
              <strong>600 BCE</strong>
              <span>Earliest Punch Marks</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-card">
              <strong>1540 CE</strong>
              <span>Birth of the Rupiya</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-card">
              <strong>{items.length}</strong>
              <span>Verified Historical Exhibits</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-card">
              <strong>2026</strong>
              <span>e₹ Digital Rupee</span>
            </div>
          </div>

          <div className="hero-actions">
            <button
              type="button"
              onClick={onNavigateToMuseum}
              className="hero-cinematic-cta"
              title="Step into the 3D Digital Museum Odyssey"
            >
              <Sparkles size={15} className="text-amber-400" />
              <span>Enter 3D Digital Museum</span>
              <ChevronRight size={15} style={{ opacity: 0.6 }} />
            </button>
          </div>
        </div>
      </section>

      {/* Primary Interactive Exhibition Section */}
      <section id="collection" className="collection-section">
        {/* Era Navigation Tabs */}
        <div className="era-filter-bar">
          <span className="filter-label">CHRONOLOGY:</span>
          <div className="era-tabs">
            {ERAS.map((era) => (
              <button
                key={era}
                type="button"
                onClick={() => {
                  sound.playSlide();
                  setSelectedEra(era);
                }}
                className={`era-tab ${selectedEra === era ? 'active-era' : ''}`}
              >
                {era}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Horizontal Thumbnails Ribbon (Placed Above Specimen Stage) */}
        <div className="specimens-carousel-container">
          <div className="specimens-carousel" ref={carouselRef}>
            {filteredItems.map((item) => (
              <button
                key={item.id}
                ref={selectedItem.id === item.id ? activeThumbRef : null}
                type="button"
                onClick={() => handleSelectSpecimen(item)}
                className={`thumbnail-card ${selectedItem.id === item.id ? 'active-thumbnail' : ''}`}
                title={`${item.denomination} (${item.year}) — ${item.title}`}
              >
                <div className="thumb-img-wrapper">
                  <img src={item.obverseImage} alt={item.title} className="thumb-img" loading="lazy" referrerPolicy="no-referrer" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Master Detail Exhibition Stage */}
        <div className="exhibition-stage">
          {/* Left: Interactive 3D Card Stage with High-Res Loupe & Controls */}
          <div className="stage-interactive-column">
            <div className="stage-nav-header">
              <button
                type="button"
                onClick={() => handleNavigateSpecimen(-1)}
                className="nav-arrow-btn"
                title="Previous specimen (Left Arrow)"
                aria-label="Previous specimen"
              >
                <ChevronLeft size={18} />
              </button>
              <div
                className="specimen-counter"
                title={`Click to enter an exhibit number (1 - ${items.length}) and press Enter`}
              >
                <span className="counter-prefix">EXHIBIT</span>
                <div className="counter-editable-box">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="specimen-jump-input"
                    value={jumpInput}
                    onChange={(e) => setJumpInput(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleJumpToExhibit(jumpInput);
                        e.currentTarget.blur();
                      } else if (e.key === 'Escape') {
                        setJumpInput((currentExhibitIndex + 1).toString());
                        e.currentTarget.blur();
                      }
                    }}
                    onBlur={() => handleJumpToExhibit(jumpInput)}
                    aria-label="Direct Exhibit Jump"
                    title={`Type an exhibit number (1-${items.length}) and press Enter`}
                  />
                  <span className="counter-total">/ {items.length}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleNavigateSpecimen(1)}
                className="nav-arrow-btn"
                title="Next specimen (Right Arrow)"
                aria-label="Next specimen"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <InteractiveSpecimen
              item={selectedItem}
              onOpenCompare={() => setIsCompareOpen(true)}
            />
          </div>

          {/* Right: Curatorial Story & Essential Information (Clean, Editorial, Uncluttered) */}
          <div className="stage-metadata-column">
            <div className="curatorial-breadcrumb">
              <span className="breadcrumb-era" style={{ color: selectedItem.accent }}>
                {selectedItem.era.toUpperCase()}
              </span>
              <span className="breadcrumb-sep">·</span>
              <span>{selectedItem.year}</span>
              <span className="breadcrumb-sep">·</span>
              <span className="breadcrumb-type">{selectedItem.type.toUpperCase()}</span>
            </div>

            <div className="specimen-headline-group">
              <h2 className="curatorial-headline">{selectedItem.denomination}</h2>
              <span className="curatorial-subtitle">{selectedItem.title}</span>
            </div>

            {/* Exactly 3 Essential Metadata Items (Uncluttered, quiet) */}
            <div className="essential-specs-strip">
              <div className="essential-spec">
                <span className="spec-label">AUTHORITY</span>
                <span className="spec-value">{selectedItem.issuer.replace('Reserve Bank of India', 'RBI')}</span>
              </div>
              <div className="essential-spec">
                <span className="spec-label">SUBSTRATE</span>
                <span className="spec-value">{selectedItem.material || selectedItem.shape || 'Assayed Metal'}</span>
              </div>
              <div className="essential-spec">
                <span className="spec-label">LEGAL STATUS</span>
                <span className="spec-value status-val">
                  <span className={`status-indicator-dot ${selectedItem.status.includes('Current') ? 'dot-active' : 'dot-historical'}`} />
                  {selectedItem.status}
                </span>
              </div>
            </div>

            {/* Concise Curatorial Historical Narrative */}
            <p className="curatorial-narrative">
              {selectedItem.historicalContext}
            </p>

            {/* Clear Entry Point to Full Technical Dossier */}
            <div className="curatorial-actions">
              <button
                type="button"
                onClick={() => {
                  sound.playLoupeClick();
                  setIsDossierOpen(true);
                }}
                className="view-dossier-btn"
              >
                <BookOpen size={14} className="text-amber-400" />
                <span>View Complete Numismatic Dossier</span>
                <ChevronRight size={14} style={{ opacity: 0.6 }} />
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playLoupeClick();
                  setIsCompareOpen(true);
                }}
                className="quick-compare-btn"
                title="Open side-by-side comparison lab"
              >
                <Scale size={14} />
                <span>Compare</span>
              </button>
            </div>
          </div>
        </div>

      </section>



      {/* Progressive Disclosure: Comprehensive Numismatic Dossier Drawer */}
      <DossierDrawer
        item={selectedItem}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onNavigatePrev={() => handleNavigateSpecimen(-1)}
        onNavigateNext={() => handleNavigateSpecimen(1)}
        currentIndex={currentExhibitIndex}
        totalCount={items.length}
      />

      {/* Primary Research & Sources Drawer Modal */}
      <ResearchDrawer
        isOpen={isResearchOpen}
        onClose={() => setIsResearchOpen(false)}
      />

      {/* Interactive Side-by-Side Comparison Lab Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialItemA={selectedItem}
      />

      {/* Comprehensive Catalog Search & Duplicate Inspector Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectExhibit={(item) => {
          handleSelectSpecimen(item);
          if (selectedEra !== 'All' && item.era !== selectedEra) {
            setSelectedEra('All');
          }
          const el = document.getElementById('collection');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Visual Cinematic Film-like Tour Modal */}
      <CinematicTour
        isOpen={isCinematicTourOpen}
        onClose={() => setIsCinematicTourOpen(false)}
        theme={theme}
      />
    </>
  );
};
