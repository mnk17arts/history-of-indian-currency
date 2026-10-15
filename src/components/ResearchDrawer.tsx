import React from 'react';
import { X, ExternalLink, ShieldCheck, BookOpen } from 'lucide-react';
import { sources } from '../data';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="research-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="header-titles">
            <div className="drawer-eyebrow">
              <BookOpen size={13} className="text-amber-400" />
              <span>NUMISMATIC RESEARCH ARCHIVE</span>
            </div>
            <h2>Primary Historical Sources</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="drawer-close-btn"
            aria-label="Close research archive"
          >
            <X size={18} />
          </button>
        </div>

        <div className="drawer-content">
          <div className="license-callout">
            <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
            <div>
              <strong>Rights & Public Domain Framework:</strong>
              <p>
                Visual assets are curated exclusively from verified public-domain numismatic repositories (including Wikimedia Commons under Government Open Data License GODL-India and pre-1964 public domain provisions of Indian Copyright Act 1957 Section 25).
              </p>
            </div>
          </div>

          <div className="source-list">
            {sources.map((src) => (
              <div key={src.id} className="source-card">
                <div className="source-header">
                  <span className="source-tag">{src.id.toUpperCase()}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-link"
                  >
                    <span>Visit Source</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <h4>{src.label}</h4>
                <p>{src.note}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
