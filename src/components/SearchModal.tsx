import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  FileQuestion,
  LayoutGrid,
  LayoutList,
  List
} from 'lucide-react';
import { items, type CurrencyItem, type Era } from '../data';
import { sound } from '../audio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExhibit: (item: CurrencyItem, exhibitIndex: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectExhibit
}) => {
  const [query, setQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [viewLayout, setViewLayout] = useState<'cards' | 'details' | 'list'>('details');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered search results
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cleanNumQuery = q.replace(/^#/, '');
    const targetNum = parseInt(cleanNumQuery, 10);

    return items
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => {
        // Era filter
        if (selectedEra !== 'All' && item.era !== selectedEra) return false;
        // Type filter
        if (selectedType !== 'All' && item.type !== selectedType) return false;

        if (!q) return true;

        // Check if query matches exhibit number directly
        if (!isNaN(targetNum) && index + 1 === targetNum) return true;

        // Search text fields
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDenom = item.denomination.toLowerCase().includes(q);
        const matchYear = item.year.toLowerCase().includes(q);
        const matchDateRange = item.dateRange.toLowerCase().includes(q);
        const matchIssuer = item.issuer.toLowerCase().includes(q);
        const matchEra = item.era.toLowerCase().includes(q);
        const matchType = item.type.toLowerCase().includes(q);
        const matchMaterial = item.material?.toLowerCase().includes(q);
        const matchShape = item.shape?.toLowerCase().includes(q);
        const matchObv = item.obverseDescription.toLowerCase().includes(q);
        const matchRev = item.reverseDescription?.toLowerCase().includes(q);
        const matchContext = item.historicalContext.toLowerCase().includes(q);
        const matchObvImg = item.obverseImage.toLowerCase().includes(q);
        const matchRevImg = item.reverseImage?.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);

        return (
          matchTitle ||
          matchDenom ||
          matchYear ||
          matchDateRange ||
          matchIssuer ||
          matchEra ||
          matchType ||
          matchMaterial ||
          matchShape ||
          matchObv ||
          matchRev ||
          matchContext ||
          matchObvImg ||
          matchRevImg ||
          matchId
        );
      });
  }, [query, selectedEra, selectedType]);

  if (!isOpen) return null;

  const handleSelect = (item: CurrencyItem, index: number) => {
    sound.playClick();
    onSelectExhibit(item, index);
    onClose();
  };

  const allEras: Era[] = [
    'Ancient',
    'Medieval',
    'Colonial',
    'Pre-independence',
    'Early Republic',
    'Decimal India',
    'Modern India',
    'Digital Future'
  ];

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="search-modal-header">
          <div className="search-header-left">
            <div className="search-modal-eyebrow">
              <Sparkles size={13} className="text-amber-400" />
              <span>NUMISMATIC CATALOG ARCHIVE</span>
            </div>
            <h2>Exhibit Explorer</h2>
          </div>

          <div className="search-header-actions">
            <button
              type="button"
              onClick={onClose}
              className="search-close-btn"
              title="Close (Esc)"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search View Container */}
        <div className="search-view-container">
          {/* Search Input Bar */}
          <div className="search-input-wrapper">
            <Search size={18} className="search-input-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="search-main-input"
              placeholder="Search by title, #number, denomination, year, metal, description, or image filename..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="search-clear-btn"
                title="Clear search query"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filter Bar */}
          <div className="search-filter-row">
            <div className="filter-group">
              <span className="filter-title">Era:</span>
              <select
                value={selectedEra}
                onChange={(e) => setSelectedEra(e.target.value)}
                className="search-select-filter"
              >
                <option value="All">All Eras ({items.length})</option>
                {allEras.map((era) => (
                  <option key={era} value={era}>
                    {era} ({items.filter((i) => i.era === era).length})
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-title">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="search-select-filter"
              >
                <option value="All">All Types</option>
                <option value="Coin">Coins ({items.filter((i) => i.type === 'Coin').length})</option>
                <option value="Note">Banknotes ({items.filter((i) => i.type === 'Note').length})</option>
                <option value="Digital">Digital ({items.filter((i) => i.type === 'Digital').length})</option>
              </select>
            </div>

            <div className="filter-group view-toggle-group">
              <span className="filter-title">View:</span>
              <div className="search-view-mode-toggle" role="group" aria-label="Result layout view">
                <button
                  type="button"
                  className={`view-mode-btn ${viewLayout === 'cards' ? 'active' : ''}`}
                  onClick={() => {
                    setViewLayout('cards');
                    sound.playClick();
                  }}
                  title="Grid Cards View"
                  aria-label="Cards view"
                >
                  <LayoutGrid size={13} />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  className={`view-mode-btn ${viewLayout === 'details' ? 'active' : ''}`}
                  onClick={() => {
                    setViewLayout('details');
                    sound.playClick();
                  }}
                  title="Detailed View with descriptions"
                  aria-label="Details view"
                >
                  <LayoutList size={13} />
                  <span>Details</span>
                </button>
                <button
                  type="button"
                  className={`view-mode-btn ${viewLayout === 'list' ? 'active' : ''}`}
                  onClick={() => {
                    setViewLayout('list');
                    sound.playClick();
                  }}
                  title="Compact List View"
                  aria-label="List view"
                >
                  <List size={13} />
                  <span>List</span>
                </button>
              </div>
            </div>

            <div className="search-result-count">
              Showing <strong>{searchResults.length}</strong> of {items.length} exhibits
            </div>
          </div>

          {/* Results Grid / List */}
          <div className={`search-results-scroller layout-${viewLayout}`}>
            {searchResults.length === 0 ? (
              <div className="search-empty-state">
                <FileQuestion size={40} className="empty-icon" />
                <h3>No matching exhibits found</h3>
                <p>Try searching for a different keyword, exhibit number, or clear your filters.</p>
              </div>
            ) : viewLayout === 'cards' ? (
              <div className="search-grid-cards">
                {searchResults.map(({ item, index }) => {
                  const obvFileName = item.obverseImage.split('/').pop();
                  const revFileName = item.reverseImage ? item.reverseImage.split('/').pop() : 'None';
                  const isSingleImage = item.obverseImage === item.reverseImage;

                  return (
                    <div
                      key={item.id}
                      className="search-grid-card"
                      onClick={() => handleSelect(item, index)}
                    >
                      <div className="grid-card-media">
                        <div className="grid-thumb-box" title={`Obverse: ${obvFileName}`}>
                          <img
                            src={item.obverseImage}
                            alt={`Obverse of ${item.title}`}
                            className="grid-thumb-img"
                            loading="lazy"
                          />
                          <span className="thumb-side-badge">OBV</span>
                        </div>
                        {item.reverseImage && !isSingleImage && (
                          <div className="grid-thumb-box" title={`Reverse: ${revFileName}`}>
                            <img
                              src={item.reverseImage}
                              alt={`Reverse of ${item.title}`}
                              className="grid-thumb-img"
                              loading="lazy"
                            />
                            <span className="thumb-side-badge">REV</span>
                          </div>
                        )}
                      </div>

                      <div className="grid-card-body">
                        <div className="search-card-meta">
                          <span className="search-exhibit-badge">#{index + 1}</span>
                          <span className="search-era-pill" style={{ borderColor: item.accent, color: item.accent }}>
                            {item.era}
                          </span>
                          <span className="search-type-pill">{item.type}</span>
                        </div>

                        <h4 className="grid-card-title" title={item.title}>
                          {item.title}
                        </h4>

                        <div className="grid-card-denom">
                          <strong>{item.denomination}</strong>
                          <span className="grid-card-dot">·</span>
                          <span>{item.year}</span>
                        </div>

                        <button
                          type="button"
                          className="jump-exhibit-btn compact"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(item, index);
                          }}
                          title={`Jump straight to Exhibit #${index + 1}`}
                        >
                          <span>Jump #{index + 1}</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : viewLayout === 'list' ? (
              <div className="search-compact-list">
                {searchResults.map(({ item, index }) => (
                  <div
                    key={item.id}
                    className="search-list-row"
                    onClick={() => handleSelect(item, index)}
                  >
                    <div className="list-thumb">
                      <img
                        src={item.obverseImage}
                        alt={item.title}
                        className="list-thumb-img"
                        loading="lazy"
                      />
                    </div>

                    <span className="search-exhibit-badge list-badge">#{index + 1}</span>

                    <div className="list-main-info">
                      <span className="list-title" title={item.title}>
                        {item.title}
                      </span>
                      <span className="list-sub">
                        <strong>{item.denomination}</strong> · {item.issuer}
                      </span>
                    </div>

                    <span className="search-era-pill list-era" style={{ borderColor: item.accent, color: item.accent }}>
                      {item.era}
                    </span>
                    <span className="search-type-pill list-type">{item.type}</span>
                    <span className="search-year-pill list-year">{item.year}</span>

                    <button
                      type="button"
                      className="jump-exhibit-btn compact list-jump-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(item, index);
                      }}
                      title={`Jump straight to Exhibit #${index + 1}`}
                    >
                      <span>Jump</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="search-cards-grid">
                {searchResults.map(({ item, index }) => {
                  const obvFileName = item.obverseImage.split('/').pop();
                  const revFileName = item.reverseImage ? item.reverseImage.split('/').pop() : 'None';
                  const isSingleImage = item.obverseImage === item.reverseImage;

                  return (
                    <div
                      key={item.id}
                      className="search-card"
                      onClick={() => handleSelect(item, index)}
                    >
                      <div className="search-card-left">
                        <div className="search-card-thumbnails">
                          <div className="thumb-box" title={`Obverse: ${obvFileName}`}>
                            <img
                              src={item.obverseImage}
                              alt={`Obverse of ${item.title}`}
                              className="search-thumb-img"
                              loading="lazy"
                            />
                            <span className="thumb-side-badge">OBV</span>
                          </div>
                          {item.reverseImage && (
                            <div
                              className={`thumb-box ${isSingleImage ? 'mirrored' : ''}`}
                              title={`Reverse: ${revFileName}`}
                            >
                              <img
                                src={item.reverseImage}
                                alt={`Reverse of ${item.title}`}
                                className="search-thumb-img"
                                loading="lazy"
                              />
                              <span className="thumb-side-badge">
                                {isSingleImage ? '1-SIDE' : 'REV'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="search-card-center">
                        <div className="search-card-meta">
                          <span className="search-exhibit-badge">EXHIBIT #{index + 1}</span>
                          <span className="search-era-pill" style={{ borderColor: item.accent, color: item.accent }}>
                            {item.era}
                          </span>
                          <span className="search-type-pill">{item.type}</span>
                          <span className="search-year-pill">{item.year}</span>
                        </div>

                        <h3 className="search-card-title">{item.title}</h3>
                        <div className="search-card-sub">
                          <strong>{item.denomination}</strong> · {item.issuer}
                        </div>

                        <p className="search-card-desc">
                          {item.obverseDescription}
                        </p>

                        <div className="search-card-files">
                          <span className="file-chip" title="Obverse image file">
                            📁 {obvFileName}
                          </span>
                          {item.reverseImage && !isSingleImage && (
                            <span className="file-chip" title="Reverse image file">
                              📁 {revFileName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="search-card-right">
                        <button
                          type="button"
                          className="jump-exhibit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(item, index);
                          }}
                          title={`Jump straight to Exhibit #${index + 1}`}
                        >
                          <span>Jump #{index + 1}</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
