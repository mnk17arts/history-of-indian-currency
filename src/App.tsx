import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  Github,
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  Shield
} from 'lucide-react';
import { sound } from './audio';
import { MuseumStage } from './components/museum/MuseumStage';
import { DotMatrixWaveLoader } from './components/DotMatrixWaveLoader';
import './styles.css';

// Feature & Route Level Lazy Loading: Load large catalog and banknote studio on demand
const ArchiveCatalog = lazy(() => import('./components/ArchiveCatalog').then(m => ({ default: m.ArchiveCatalog })));
const BanknoteStudio = lazy(() => import('./components/BanknoteStudio').then(m => ({ default: m.BanknoteStudio })));

export const App: React.FC = () => {
  // Page routing: 'museum' (3D Digital Codex, default) vs 'archive' (2,500-Year Numismatic Archive) vs 'banknotes' (RBI Banknote Studio)
  const [activePage, setActivePage] = useState<'museum' | 'archive' | 'banknotes'>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.startsWith('#/banknotes') || hash === '#banknotes') return 'banknotes';
    if (hash.startsWith('#/archive') || hash === '#archive' || hash === '#catalog' || hash.startsWith('#exhibit-')) return 'archive';
    return 'museum'; // Museum is the premier default page
  });

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isInitialBoot, setIsInitialBoot] = useState<boolean>(true);

  // Permanently lock to Dark Obsidian Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Scroll lock and viewport top reset during boot loader
  useEffect(() => {
    if (isInitialBoot) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isInitialBoot]);

  // Synchronize audio mute state
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navigateToPage = (page: 'museum' | 'archive' | 'banknotes') => {
    sound.playSlide();
    if (page === 'banknotes') {
      window.location.hash = '#/banknotes';
    } else if (page === 'archive') {
      window.location.hash = '#/archive';
    } else {
      window.location.hash = '#/museum';
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Router listener & deep-linking via URL hash (defaults to museum)
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#/banknotes') || hash === '#banknotes') {
        setActivePage('banknotes');
      } else if (hash.startsWith('#/archive') || hash === '#archive' || hash === '#catalog' || hash.startsWith('#exhibit-')) {
        setActivePage('archive');
      } else {
        setActivePage('museum');
      }
    };
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  return (
    <>
      {/* Initial Boot Cinematic Loader (Absolute Top of Everything) */}
      {isInitialBoot && (
        <DotMatrixWaveLoader
          message="Synthesizing 2,500 Years of Indian Numismatics..."
          onComplete={() => {
            window.scrollTo(0, 0);
            setIsInitialBoot(false);
          }}
          isDismissible={true}
        />
      )}

      <div
        className="app-root"
        style={{
          opacity: isInitialBoot ? 0 : 1,
          pointerEvents: isInitialBoot ? 'none' : 'auto',
          transition: 'opacity 0.45s ease',
        }}
      >
        {/* Top Navigation Header */}
      <header className="site-header">
        <div className="header-brand">
          <a
            href="#/museum"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage('museum');
            }}
            className="brand-logo"
            aria-label="History of Indian Currency - 2,500-Year Numismatic Museum"
            title="Return to History of Indian Currency Museum"
          >
            <span className="rupee-glyph">₹</span>
            <div className="brand-text">
              <span className="brand-title">INDIAN <em>CURRENCY</em></span>
              <span className="brand-subtitle">NUMISMATIC MUSEUM</span>
            </div>
          </a>
        </div>

        {/* Main Navigation Tabs: Museum, Archive & Banknotes in navbar on ALL pages */}
        <nav className="header-nav" aria-label="Main Navigation">
          <button
            type="button"
            onClick={() => navigateToPage('museum')}
            className={`nav-page-tab ${activePage === 'museum' ? 'active-page-tab' : ''}`}
            title="Step into the 3D Digital Museum Odyssey"
          >
            <Sparkles size={13} className={activePage === 'museum' ? 'text-amber-400' : 'text-amber-400/80'} />
            <span>Museum</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToPage('archive')}
            className={`nav-page-tab ${activePage === 'archive' ? 'active-page-tab' : ''}`}
            title="Explore the 2,500-Year Numismatic Archive"
          >
            <Layers size={13} />
            <span>Archive</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToPage('banknotes')}
            className={`nav-page-tab ${activePage === 'banknotes' ? 'active-page-tab' : ''}`}
            title="RBI Banknote Studio & Forensic Security"
          >
            <Shield size={13} />
            <span>Banknotes</span>
          </button>
        </nav>

        <div className="header-utilities">
          {/* Tactile Audio Mute Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="utility-btn icon-only"
            title={isMuted ? 'Unmute tactile audio' : 'Mute tactile audio'}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* GitHub Repository Link per Rule 6 */}
          <a
            href="https://github.com/mnk17arts/history-of-indian-currency"
            target="_blank"
            rel="noopener noreferrer"
            className="utility-btn icon-only"
            title="View mnk17arts/19-history-of-indian-currency on GitHub"
            aria-label="View source code on GitHub"
          >
            <Github size={17} />
          </a>
        </div>
      </header>

      {/* Main Content Sections with Progressive Lazy Loading */}
      <main id="top">
        <Suspense
          fallback={
            <DotMatrixWaveLoader
              message="Accessing Numismatic Codex..."
              isDismissible={false}
            />
          }
        >
          {activePage === 'museum' ? (
            <MuseumStage
              onExitMuseum={() => navigateToPage('archive')}
              onNavigateToBanknotes={() => navigateToPage('banknotes')}
            />
          ) : activePage === 'banknotes' ? (
            <BanknoteStudio />
          ) : (
            <ArchiveCatalog
              onNavigateToMuseum={() => navigateToPage('museum')}
              theme="dark"
            />
          )}
        </Suspense>
      </main>

      {/* Site Attribution Footer */}
      <footer className="site-footer">
        <span>Developed with</span>
        <Heart className="heart-icon" />
        <span>by</span>
        <a
          href="https://github.com/mnk17arts"
          target="_blank"
          rel="noopener noreferrer"
        >
          @mnk17arts
        </a>
      </footer>
    </div>
    </>
  );
};

export default App;
