import React, { useState, useEffect, useMemo } from 'react';
import { X, Scale, RotateCw, ArrowRightLeft, Shield, Clock, Coins, Sparkles, Search } from 'lucide-react';
import { items, type CurrencyItem } from '../data';
import { sound } from '../audio';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemA: CurrencyItem;
  initialItemB?: CurrencyItem | null;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  initialItemA,
  initialItemB
}) => {
  const [itemA, setItemA] = useState<CurrencyItem>(initialItemA);
  const [itemB, setItemB] = useState<CurrencyItem>(
    initialItemB && initialItemB.id !== initialItemA.id
      ? initialItemB
      : items.find((i) => i.id !== initialItemA.id) || items[0]
  );

  const [flippedA, setFlippedA] = useState(false);
  const [flippedB, setFlippedB] = useState(false);

  // Search queries for artifact number / ID search
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');

  // Sync initial props
  useEffect(() => {
    setItemA(initialItemA);
    if (!initialItemB || initialItemB.id === initialItemA.id) {
      const contrast = items.find((i) => i.id !== initialItemA.id && i.era !== initialItemA.era) || items[0];
      setItemB(contrast);
    } else {
      setItemB(initialItemB);
    }
  }, [initialItemA, initialItemB, isOpen]);

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

  // Indexed list of all items
  const indexedItems = useMemo(() => {
    return items.map((it, idx) => ({
      item: it,
      index: idx,
      exhibitNum: idx + 1
    }));
  }, []);

  // Filter options for Dropdown A based on search query
  const filteredOptionsA = useMemo(() => {
    const q = searchA.trim().toLowerCase();
    if (!q) return indexedItems;

    const numMatch = parseInt(q.replace(/^#/, ''), 10);
    return indexedItems.filter(({ item, exhibitNum }) => {
      if (!isNaN(numMatch) && exhibitNum === numMatch) return true;
      return (
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.denomination.toLowerCase().includes(q) ||
        item.year.toLowerCase().includes(q)
      );
    });
  }, [searchA, indexedItems]);

  // Filter options for Dropdown B based on search query
  const filteredOptionsB = useMemo(() => {
    const q = searchB.trim().toLowerCase();
    if (!q) return indexedItems;

    const numMatch = parseInt(q.replace(/^#/, ''), 10);
    return indexedItems.filter(({ item, exhibitNum }) => {
      if (!isNaN(numMatch) && exhibitNum === numMatch) return true;
      return (
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.denomination.toLowerCase().includes(q) ||
        item.year.toLowerCase().includes(q)
      );
    });
  }, [searchB, indexedItems]);

  // Jump handlers
  const handleJumpA = (val: string) => {
    const q = val.trim().toLowerCase();
    if (!q) return;

    const numMatch = parseInt(q.replace(/^#/, ''), 10);
    let found: CurrencyItem | undefined;

    if (!isNaN(numMatch) && numMatch >= 1 && numMatch <= items.length) {
      found = items[numMatch - 1];
    } else {
      found = items.find((i) => i.id.toLowerCase() === q);
      if (!found) {
        found = items.find(
          (i) =>
            i.id.toLowerCase().includes(q) ||
            i.title.toLowerCase().includes(q) ||
            i.denomination.toLowerCase().includes(q)
        );
      }
    }

    if (found) {
      sound.playLoupeClick();
      setItemA(found);
      setFlippedA(false);
      setSearchA('');
    }
  };

  const handleJumpB = (val: string) => {
    const q = val.trim().toLowerCase();
    if (!q) return;

    const numMatch = parseInt(q.replace(/^#/, ''), 10);
    let found: CurrencyItem | undefined;

    if (!isNaN(numMatch) && numMatch >= 1 && numMatch <= items.length) {
      found = items[numMatch - 1];
    } else {
      found = items.find((i) => i.id.toLowerCase() === q);
      if (!found) {
        found = items.find(
          (i) =>
            i.id.toLowerCase().includes(q) ||
            i.title.toLowerCase().includes(q) ||
            i.denomination.toLowerCase().includes(q)
        );
      }
    }

    if (found) {
      sound.playLoupeClick();
      setItemB(found);
      setFlippedB(false);
      setSearchB('');
    }
  };

  if (!isOpen) return null;

  // Calculate year delta
  const yearA = itemA.purchasingPowerEquivalent?.year || 0;
  const yearB = itemB.purchasingPowerEquivalent?.year || 0;
  const yearDiff = Math.abs(yearA - yearB);

  const imageA = flippedA && itemA.reverseImage ? itemA.reverseImage : itemA.obverseImage;
  const imageB = flippedB && itemB.reverseImage ? itemB.reverseImage : itemB.obverseImage;

  const isCoinA = itemA.type === 'Coin' || itemA.type === 'Digital';
  const isCoinB = itemB.type === 'Coin' || itemB.type === 'Digital';

  const indexA = items.findIndex((i) => i.id === itemA.id);
  const indexB = items.findIndex((i) => i.id === itemB.id);

  return (
    <div className="compare-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="compare-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="compare-modal-header">
          <div className="compare-modal-title-group">
            <div className="compare-pill-tag">
              <Scale size={14} className="text-amber-400" />
              <span>NUMISMATIC COMPARISON LAB</span>
            </div>
            <h2>Side-by-Side Currency Architecture Analysis</h2>
            <p className="compare-subtitle">
              Select any two historical currencies to contrast physical materiality, security evolution, and purchasing power across centuries. Search by artifact # (e.g. 107) or ID.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="modal-close-icon-btn"
            aria-label="Close comparison window"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Comparison Columns */}
        <div className="compare-modal-body">
          {/* Column A */}
          <div className="compare-specimen-pane">
            <div className="specimen-picker-bar">
              <div className="picker-header-row">
                <label htmlFor="select-specimen-a" className="picker-label">
                  Specimen A: <span className="picker-active-badge">#{indexA + 1}</span>
                </label>
              </div>

              {/* Artifact Number / ID Quick Search */}
              <div className="compare-search-box">
                <Search size={14} className="compare-search-icon" />
                <input
                  type="text"
                  value={searchA}
                  onChange={(e) => setSearchA(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleJumpA(searchA);
                    }
                  }}
                  placeholder="Jump by # or ID (e.g. 97, #125, corn)..."
                  className="compare-search-input"
                  aria-label="Search Specimen A by number or ID"
                />
                {searchA && (
                  <button
                    type="button"
                    className="compare-clear-btn"
                    onClick={() => setSearchA('')}
                    title="Clear search"
                  >
                    <X size={12} />
                  </button>
                )}
                <button
                  type="button"
                  className="compare-jump-action"
                  onClick={() => handleJumpA(searchA)}
                  title="Jump to this artifact"
                >
                  Jump
                </button>
              </div>

              <select
                id="select-specimen-a"
                value={itemA.id}
                onChange={(e) => {
                  const found = items.find((i) => i.id === e.target.value);
                  if (found) {
                    sound.playLoupeClick();
                    setItemA(found);
                    setFlippedA(false);
                  }
                }}
                className="specimen-dropdown-select"
              >
                {filteredOptionsA.map(({ item: i, exhibitNum }) => (
                  <option key={i.id} value={i.id}>
                    #{exhibitNum} · {i.denomination} — {i.title} ({i.year})
                  </option>
                ))}
              </select>
            </div>

            {/* Specimen Visual */}
            <div className="compare-visual-box">
              <div className={`compare-frame ${isCoinA ? 'compare-coin-frame' : 'compare-note-frame'}`}>
                <img
                  src={imageA}
                  alt={itemA.title}
                  className="compare-contained-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button
                type="button"
                className="compare-flip-btn"
                onClick={() => {
                  sound.playCoinClink();
                  setFlippedA(!flippedA);
                }}
              >
                <RotateCw size={13} />
                <span>{flippedA ? 'Viewing Reverse (Click for Obverse)' : 'Viewing Obverse (Click for Reverse)'}</span>
              </button>
            </div>

            {/* Metadata Card */}
            <div className="compare-meta-card">
              <div className="compare-meta-badge" style={{ borderColor: itemA.accent, color: itemA.accent }}>
                EXHIBIT #{indexA + 1} · {itemA.era} · {itemA.type}
              </div>
              <h3>{itemA.denomination} — {itemA.title}</h3>

              <div className="compare-specs-grid">
                <div className="compare-row">
                  <span>Period:</span>
                  <strong>{itemA.year} ({itemA.dateRange})</strong>
                </div>
                <div className="compare-row">
                  <span>Issuer:</span>
                  <strong>{itemA.issuer}</strong>
                </div>
                <div className="compare-row">
                  <span>Material:</span>
                  <strong>{itemA.material || 'Standard Cotton Paper'}</strong>
                </div>
                <div className="compare-row">
                  <span>Dimensions:</span>
                  <strong>{itemA.dimensions || 'N/A'}</strong>
                </div>
                <div className="compare-row">
                  <span>Legal Status:</span>
                  <strong className="text-emerald-400">{itemA.status}</strong>
                </div>
              </div>

              {/* Purchasing Power */}
              <div className="compare-pp-box">
                <Sparkles size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Purchasing Power ({itemA.purchasingPowerEquivalent.year > 0 ? itemA.purchasingPowerEquivalent.year + ' CE' : Math.abs(itemA.purchasingPowerEquivalent.year) + ' BCE'}):</strong>
                  <p>{itemA.purchasingPowerEquivalent.equivalent} — {itemA.purchasingPowerEquivalent.details}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Analytics Spine */}
          <div className="compare-delta-spine">
            <div className="spine-vs-circle">VS</div>

            <div className="spine-metric-card">
              <Clock size={16} className="text-amber-400 mb-1" />
              <span className="spine-label">CHRONOLOGICAL GAP</span>
              <strong className="spine-value">{yearDiff} Years</strong>
              <span className="spine-subtext">
                {yearA < yearB ? `${itemA.year} → ${itemB.year}` : `${itemB.year} → ${itemA.year}`}
              </span>
            </div>

            <div className="spine-metric-card">
              <Coins size={16} className="text-indigo-400 mb-1" />
              <span className="spine-label">PHYSICAL MEDIUM</span>
              <strong className="spine-value">{itemA.type} vs {itemB.type}</strong>
              <span className="spine-subtext">
                {itemA.type === itemB.type ? 'Matching Form Factor' : 'Evolutionary Medium Shift'}
              </span>
            </div>

            <div className="spine-metric-card">
              <Shield size={16} className="text-emerald-400 mb-1" />
              <span className="spine-label">SECURITY FEATURES</span>
              <strong className="spine-value">
                {(itemA.securityFeatures?.length || 0)} vs {(itemB.securityFeatures?.length || 0)}
              </strong>
              <span className="spine-subtext">Verified Security Layers</span>
            </div>

            <button
              type="button"
              className="spine-swap-btn"
              onClick={() => {
                sound.playSlide();
                const temp = itemA;
                setItemA(itemB);
                setItemB(temp);
                setFlippedA(false);
                setFlippedB(false);
              }}
              title="Swap Column A and Column B"
            >
              <ArrowRightLeft size={16} />
              <span>Swap Sides</span>
            </button>
          </div>

          {/* Column B */}
          <div className="compare-specimen-pane">
            <div className="specimen-picker-bar">
              <div className="picker-header-row">
                <label htmlFor="select-specimen-b" className="picker-label">
                  Specimen B: <span className="picker-active-badge">#{indexB + 1}</span>
                </label>
              </div>

              {/* Artifact Number / ID Quick Search */}
              <div className="compare-search-box">
                <Search size={14} className="compare-search-icon" />
                <input
                  type="text"
                  value={searchB}
                  onChange={(e) => setSearchB(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleJumpB(searchB);
                    }
                  }}
                  placeholder="Jump by # or ID (e.g. 107, #300, bull)..."
                  className="compare-search-input"
                  aria-label="Search Specimen B by number or ID"
                />
                {searchB && (
                  <button
                    type="button"
                    className="compare-clear-btn"
                    onClick={() => setSearchB('')}
                    title="Clear search"
                  >
                    <X size={12} />
                  </button>
                )}
                <button
                  type="button"
                  className="compare-jump-action"
                  onClick={() => handleJumpB(searchB)}
                  title="Jump to this artifact"
                >
                  Jump
                </button>
              </div>

              <select
                id="select-specimen-b"
                value={itemB.id}
                onChange={(e) => {
                  const found = items.find((i) => i.id === e.target.value);
                  if (found) {
                    sound.playLoupeClick();
                    setItemB(found);
                    setFlippedB(false);
                  }
                }}
                className="specimen-dropdown-select"
              >
                {filteredOptionsB.map(({ item: i, exhibitNum }) => (
                  <option key={i.id} value={i.id}>
                    #{exhibitNum} · {i.denomination} — {i.title} ({i.year})
                  </option>
                ))}
              </select>
            </div>

            {/* Specimen Visual */}
            <div className="compare-visual-box">
              <div className={`compare-frame ${isCoinB ? 'compare-coin-frame' : 'compare-note-frame'}`}>
                <img
                  src={imageB}
                  alt={itemB.title}
                  className="compare-contained-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button
                type="button"
                className="compare-flip-btn"
                onClick={() => {
                  sound.playCoinClink();
                  setFlippedB(!flippedB);
                }}
              >
                <RotateCw size={13} />
                <span>{flippedB ? 'Viewing Reverse (Click for Obverse)' : 'Viewing Obverse (Click for Reverse)'}</span>
              </button>
            </div>

            {/* Metadata Card */}
            <div className="compare-meta-card">
              <div className="compare-meta-badge" style={{ borderColor: itemB.accent, color: itemB.accent }}>
                EXHIBIT #{indexB + 1} · {itemB.era} · {itemB.type}
              </div>
              <h3>{itemB.denomination} — {itemB.title}</h3>

              <div className="compare-specs-grid">
                <div className="compare-row">
                  <span>Period:</span>
                  <strong>{itemB.year} ({itemB.dateRange})</strong>
                </div>
                <div className="compare-row">
                  <span>Issuer:</span>
                  <strong>{itemB.issuer}</strong>
                </div>
                <div className="compare-row">
                  <span>Material:</span>
                  <strong>{itemB.material || 'Standard Cotton Paper'}</strong>
                </div>
                <div className="compare-row">
                  <span>Dimensions:</span>
                  <strong>{itemB.dimensions || 'N/A'}</strong>
                </div>
                <div className="compare-row">
                  <span>Legal Status:</span>
                  <strong className="text-emerald-400">{itemB.status}</strong>
                </div>
              </div>

              {/* Purchasing Power */}
              <div className="compare-pp-box">
                <Sparkles size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Purchasing Power ({itemB.purchasingPowerEquivalent.year > 0 ? itemB.purchasingPowerEquivalent.year + ' CE' : Math.abs(itemB.purchasingPowerEquivalent.year) + ' BCE'}):</strong>
                  <p>{itemB.purchasingPowerEquivalent.equivalent} — {itemB.purchasingPowerEquivalent.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
