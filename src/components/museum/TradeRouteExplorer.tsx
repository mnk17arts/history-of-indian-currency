import React, { useState, useRef } from 'react';
import { 
  Compass, 
  Ship, 
  Coins, 
  Package, 
  Anchor, 
  Sparkles, 
  Navigation, 
  Globe, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Move 
} from 'lucide-react';
import { sound } from '../../audio';
import worldMap from '@svg-maps/world';

export interface TradeRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  fromCoords: { x: number; y: number };
  toCoords: { x: number; y: number };
  pathD: string;
  shipWaypoint: { x: number; y: number; angle: number };
  goodsTraded: string[];
  coinageUsed: string[];
  historicalImpact: string;
  annualValueEstimate: string;
  period: string;
  nauticalDistance: string;
}

const TRADE_ROUTES: TradeRoute[] = [
  {
    id: 'calcutta-london',
    name: 'Calcutta to London Imperial Highway (Cape Route)',
    from: 'Calcutta (Fort William)',
    to: 'London (Leadenhall Street)',
    fromCoords: { x: 735, y: 395 },
    toCoords: { x: 468, y: 272 },
    // Traverses Bay of Bengal, past Ceylon (702,441), across southern Indian Ocean (620,560),
    // rounding Cape of Good Hope (535,615), sailing up Atlantic (460,430), past Portugal (455,310) to London (468,272)
    pathD: 'M 735 395 C 720 440, 680 520, 610 570 C 560 610, 545 615, 535 615 C 500 615, 480 540, 460 430 C 450 360, 458 300, 468 272',
    shipWaypoint: { x: 535, y: 615, angle: -140 },
    goodsTraded: ['Bengal Raw Silk', 'Fine Dacca Muslin', 'Saltpetre (Gunpowder Nitre)', 'Indigo Dye Cakes'],
    coinageUsed: ['Murshidabad 19-San Sicca Rupees', 'Sterling Bullion', 'Bank of England Bills of Exchange'],
    historicalImpact: 'The primary revenue extraction artery of the British Empire. Land tax collected in Bengal silver was converted into exported commodities, systematically transferring eastern wealth to London without commercial reciprocity.',
    annualValueEstimate: '£2.5 Million in 18th Century Sterling',
    period: '1765 – 1858',
    nauticalDistance: '~11,800 Nautical Miles via Cape'
  },
  {
    id: 'bombay-canton',
    name: 'Bombay to Canton Opium & Cotton Highway',
    from: 'Bombay (Western Gateway)',
    to: 'Canton (Thirteen Hongs)',
    fromCoords: { x: 688, y: 408 },
    toCoords: { x: 805, y: 382 },
    // Malabar coast, rounding Ceylon (702,445), across Andaman waters into Malacca (775,465), northeast to Canton (805,382)
    pathD: 'M 688 408 C 695 440, 715 460, 745 468 C 765 470, 775 465, 785 435 C 792 410, 798 395, 805 382',
    shipWaypoint: { x: 765, y: 465, angle: 35 },
    goodsTraded: ['Malwa Raw Cotton', 'Patna & Malwa Opium Chests', 'Sandalwood', 'Shark Fins'],
    coinageUsed: ['Spanish 8-Reales Silver Pillar Dollars', 'Chinese Sycee Silver Ingots', 'Bombay Presidency Silver Rupees'],
    historicalImpact: 'Financed Britain’s massive Chinese tea imports without draining Bank of England bullion reserves. Silver earned in Canton was redirected to balance East India Company territorial deficits across India.',
    annualValueEstimate: 'Over 12,000 Chests of Opium per annum',
    period: '1780 – 1842',
    nauticalDistance: '~3,750 Nautical Miles'
  },
  {
    id: 'madras-coromandel',
    name: 'Coromandel to Southeast Asia Spice & Chintz Link',
    from: 'Madras (Fort St. George)',
    to: 'Malacca & Spice Islands',
    fromCoords: { x: 708, y: 425 },
    toCoords: { x: 775, y: 465 },
    pathD: 'M 708 425 C 730 440, 750 455, 775 465',
    shipWaypoint: { x: 745, y: 445, angle: 25 },
    goodsTraded: ['Coromandel Chintz & Calico Cloth', 'Malabar Pepper', 'Banda Nutmeg & Cloves', 'Bangka Tin'],
    coinageUsed: ['Gold Star Pagodas (3-Swami)', 'Arcot Silver Rupees', 'Dutch VOC Copper Doits'],
    historicalImpact: 'Madras operated as the Company’s gold-standard financial stronghold. Hindu traditional gold Pagodas remained the foundational monetary unit for coastal transactions and Southeast Asian merchant barter.',
    annualValueEstimate: '1.2 Million Gold Pagodas annually',
    period: '1750 – 1835',
    nauticalDistance: '~1,420 Nautical Miles'
  },
  {
    id: 'london-bombay',
    name: 'London to Bombay Bullion Transshipment',
    from: 'London (Port of London)',
    to: 'Bombay Mint',
    fromCoords: { x: 468, y: 272 },
    toCoords: { x: 688, y: 408 },
    // South through Atlantic, rounding Cape of Good Hope (535,615), sailing northeast past Madagascar straight to Bombay (688,408)
    pathD: 'M 468 272 C 458 310, 450 380, 465 470 C 480 540, 505 605, 535 615 C 570 615, 630 550, 665 480 C 678 450, 684 425, 688 408',
    shipWaypoint: { x: 535, y: 615, angle: -45 },
    goodsTraded: ['Silver Ingot Bullion', 'Spanish Carolus Dollars', 'Woollen Broadcloth', 'Naval Ordnance & Munitions'],
    coinageUsed: ['Crown Silver Bullion', 'Mexican Pillar Dollars', 'Bombay Mint Machine-Struck Mohurs'],
    historicalImpact: 'Transported vast European and Latin American silver to supply the Company’s mechanized mints in Bombay, establishing uniform machine-milled rupee coinage across western and central India.',
    annualValueEstimate: '£850,000 in raw silver ingots',
    period: '1770 – 1835',
    nauticalDistance: '~10,900 Nautical Miles'
  },
  {
    id: 'calcutta-canton',
    name: 'Hooghly to Pearl River Tea Passage',
    from: 'Calcutta (Hooghly River)',
    to: 'Canton (Hongs)',
    fromCoords: { x: 735, y: 395 },
    toCoords: { x: 805, y: 382 },
    // Down Bay of Bengal, through Malacca Straits (775,465), northeast to Canton (805,382)
    pathD: 'M 735 395 C 740 430, 755 455, 775 465 C 785 435, 795 405, 805 382',
    shipWaypoint: { x: 775, y: 465, angle: -45 },
    goodsTraded: ['Bengal Rice & Grain', 'Raw Filature Silk', 'Bohea & Orange Pekoe Black Tea', 'Jingdezhen Porcelain'],
    coinageUsed: ['Murshidabad Sicca Rupees', 'Carolus Pillar Dollars', 'Chinese Sycee Silver Shoes'],
    historicalImpact: 'Directly linked Bengal agrarian output with East Asian mercantile credit. The profits funded British naval garrisons across Penang and Malacca while fueling the London tea culture.',
    annualValueEstimate: '£1.8 Million in merchandise',
    period: '1785 – 1858',
    nauticalDistance: '~3,100 Nautical Miles'
  }
];

interface PortMarker {
  id: string;
  name: string;
  coords: { x: number; y: number };
  role: string;
  primaryCoin: string;
  coordinatesLabel: string;
}

const PORTS: PortMarker[] = [
  { id: 'london', name: 'London', coords: { x: 468, y: 272 }, role: 'Company Headquarters & Bullion Exporter', primaryCoin: 'Gold Guinea / Sterling', coordinatesLabel: '51°30\' N, 0°07\' W' },
  { id: 'calcutta', name: 'Calcutta', coords: { x: 735, y: 395 }, role: 'Imperial Capital & Fort William Mint', primaryCoin: 'Murshidabad 19-San Sicca', coordinatesLabel: '22°34\' N, 88°21\' E' },
  { id: 'bombay', name: 'Bombay', coords: { x: 688, y: 408 }, role: 'Western Maritime Gateway & Steam Mint', primaryCoin: 'Bombay Silver Rupee', coordinatesLabel: '18°58\' N, 72°50\' E' },
  { id: 'madras', name: 'Madras', coords: { x: 708, y: 425 }, role: 'Coromandel Presidency & Gold Mint', primaryCoin: 'Star Gold Pagoda (3-Swami)', coordinatesLabel: '13°05\' N, 80°16\' E' },
  { id: 'canton', name: 'Canton', coords: { x: 805, y: 382 }, role: 'Thirteen Hongs & Tea Terminal', primaryCoin: 'Silver Sycee & Pillar Dollars', coordinatesLabel: '23°08\' N, 113°15\' E' },
  { id: 'malacca', name: 'Malacca', coords: { x: 775, y: 465 }, role: 'Straits Settlements Transshipment', primaryCoin: 'Dutch VOC Doits & Silver Reales', coordinatesLabel: '2°11\' N, 102°15\' E' },
  { id: 'capetown', name: 'Cape of Good Hope', coords: { x: 535, y: 615 }, role: 'Atlantic-Indian Transoceanic Waypoint', primaryCoin: 'Dutch Rixdollar & Spanish Pillar', coordinatesLabel: '34°21\' S, 18°28\' E' }
];

export const TradeRouteExplorer: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('calcutta-london');
  const [hoveredPort, setHoveredPort] = useState<PortMarker | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number }>({ x: 0, y: 0, panX: 0, panY: 0 });

  const activeRoute = TRADE_ROUTES.find(r => r.id === selectedRouteId) || TRADE_ROUTES[0];

  const handleSelectRoute = (routeId: string) => {
    sound.playClick();
    setSelectedRouteId(routeId);
  };

  const handleZoomIn = () => {
    sound.playClick();
    setZoomScale(prev => Math.min(2.5, +(prev + 0.25).toFixed(2)));
  };

  const handleZoomOut = () => {
    sound.playClick();
    setZoomScale(prev => {
      const next = Math.max(1.0, +(prev - 0.25).toFixed(2));
      if (next === 1.0) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleZoomReset = () => {
    sound.playClick();
    setZoomScale(1.0);
    setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoomScale <= 1.0) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || zoomScale <= 1.0) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const maxPanX = 350 * (zoomScale - 1);
    const maxPanY = 220 * (zoomScale - 1);
    setPan({
      x: Math.max(-maxPanX, Math.min(maxPanX, dragStartRef.current.panX + dx)),
      y: Math.max(-maxPanY, Math.min(maxPanY, dragStartRef.current.panY + dy))
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div className="trade-explorer-container">
      {/* Header bar */}
      <div className="trade-explorer-header">
        <div className="trade-explorer-title-group">
          <div className="trade-explorer-badge">
            <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>AUTHENTIC ADMIRALTY CARTOGRAPHY • 1757–1858</span>
          </div>
          <h3 className="trade-explorer-title">The Maritime Trade Route Explorer</h3>
          <p className="trade-explorer-desc">
            Explore how the East India Company redirected global bullion flows, exchanged Indian silk and opium for Chinese tea and European silver, and established the financial foundations of modern paper credit.
          </p>
        </div>

        {/* Route Selector Pills */}
        <div className="trade-route-pills">
          {TRADE_ROUTES.map(route => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => handleSelectRoute(route.id)}
                className={`trade-route-pill ${isSelected ? 'trade-route-pill-active' : ''}`}
                aria-label={`Inspect ${route.name}`}
              >
                <Ship className="w-3 h-3" />
                <span>{route.from.split(' ')[0]} ➔ {route.to.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="trade-explorer-stage">
        {/* SVG Historical Nautical Chart */}
        <div 
          className="trade-map-canvas-wrapper"
          style={{
            position: 'relative',
            overflow: 'hidden',
            cursor: zoomScale > 1.0 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            touchAction: zoomScale > 1.0 ? 'none' : 'auto'
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Floating Map Zoom & Pan Controls Dock */}
          <div 
            className="museum-map-zoom-dock"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(5, 10, 18, 0.92)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '8px',
              padding: '4px 8px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)'
            }}
            onClick={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomScale <= 1.0}
              title="Zoom Out (-)"
              aria-label="Zoom Out"
              style={{
                background: 'transparent',
                border: 'none',
                color: zoomScale <= 1.0 ? '#475569' : '#fef3c7',
                cursor: zoomScale <= 1.0 ? 'not-allowed' : 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ZoomOut size={13} />
            </button>

            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#f59e0b',
              minWidth: '38px',
              textAlign: 'center',
              fontWeight: 700,
              userSelect: 'none'
            }}>
              {Math.round(zoomScale * 100)}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomScale >= 2.5}
              title="Zoom In (+)"
              aria-label="Zoom In"
              style={{
                background: 'transparent',
                border: 'none',
                color: zoomScale >= 2.5 ? '#475569' : '#fef3c7',
                cursor: zoomScale >= 2.5 ? 'not-allowed' : 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ZoomIn size={13} />
            </button>

            <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.15)', margin: '0 2px' }} />

            <button
              type="button"
              onClick={handleZoomReset}
              title="Reset Zoom & Pan (100%)"
              aria-label="Reset View"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {/* Pan Hint when zoomed */}
          {zoomScale > 1.0 && (
            <div 
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 25,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: 'rgba(0, 0, 0, 0.82)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#fef3c7',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                pointerEvents: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}
            >
              <Move size={10} className="text-amber-400 animate-pulse" />
              <span>Drag / swipe to pan across world trade corridors</span>
            </div>
          )}

          <svg 
            className="trade-map-svg" 
            viewBox="0 0 1010 666" 
            preserveAspectRatio="xMidYMid meet"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <defs>
              {/* Deep Ocean Bathymetric Gradient */}
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#07131f" />
                <stop offset="45%" stopColor="#0a192c" />
                <stop offset="85%" stopColor="#05101b" />
                <stop offset="100%" stopColor="#03080f" />
              </linearGradient>

              {/* Active Route Gradient */}
              <linearGradient id="activeRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="40%" stopColor="#ef4444" />
                <stop offset="80%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              {/* Inactive Route Gradient */}
              <linearGradient id="inactiveRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0.18)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0.18)" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Antique Landmass Pattern Fill */}
              <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.88" />
                <stop offset="50%" stopColor="#16202e" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.96" />
              </linearGradient>
            </defs>

            {/* Ocean Canvas Background */}
            <rect width="1010" height="666" fill="url(#oceanGrad)" />

            {/* Antique Navigation Graticule (Lat/Long Lines) */}
            <g className="trade-map-graticule" stroke="rgba(212, 175, 55, 0.08)" strokeWidth="0.5">
              {/* Meridians */}
              <line x1="200" y1="0" x2="200" y2="666" />
              <line x1="468" y1="0" x2="468" y2="666" stroke="rgba(212, 175, 55, 0.16)" strokeDasharray="3 3" />
              <line x1="707" y1="0" x2="707" y2="666" stroke="rgba(212, 175, 55, 0.16)" strokeDasharray="3 3" />
              <line x1="900" y1="0" x2="900" y2="666" />

              {/* Parallels */}
              <line x1="0" y1="274" x2="1010" y2="274" stroke="rgba(212, 175, 55, 0.10)" />
              {/* Tropic of Cancer 23.5° N */}
              <line x1="0" y1="345" x2="1010" y2="345" stroke="rgba(245, 158, 11, 0.22)" strokeDasharray="5 4" />
              {/* Equator 0° */}
              <line x1="0" y1="440" x2="1010" y2="440" stroke="rgba(245, 158, 11, 0.32)" strokeWidth="0.8" />
              {/* Tropic of Capricorn 23.5° S */}
              <line x1="0" y1="535" x2="1010" y2="535" stroke="rgba(245, 158, 11, 0.18)" strokeDasharray="5 4" />

              {/* Graticule Annotations */}
              <text x="990" y="342" textAnchor="end" fill="rgba(245, 158, 11, 0.45)" fontSize="7.5" fontFamily="monospace">TROPICUS CANCRI (23°28' N)</text>
              <text x="990" y="437" textAnchor="end" fill="rgba(245, 158, 11, 0.55)" fontSize="8" fontFamily="serif" letterSpacing="1">AEQUATOR SEU LINEA AEQUINOCTIALIS (0°)</text>
              <text x="990" y="532" textAnchor="end" fill="rgba(245, 158, 11, 0.45)" fontSize="7.5" fontFamily="monospace">TROPICUS CAPRICORNI (23°28' S)</text>
            </g>

            {/* Portolan Rhumb Lines radiating across the oceans */}
            <g className="trade-rhumb-lines" stroke="rgba(217, 119, 6, 0.06)" strokeWidth="0.6">
              <line x1="120" y1="410" x2="900" y2="100" />
              <line x1="120" y1="410" x2="950" y2="300" />
              <line x1="120" y1="410" x2="800" y2="520" />
              <line x1="120" y1="410" x2="450" y2="20" />
              <line x1="468" y1="272" x2="950" y2="150" />
              <line x1="468" y1="272" x2="100" y2="150" />
              <line x1="707" y1="400" x2="200" y2="100" />
              <line x1="707" y1="400" x2="535" y2="615" />
              <line x1="707" y1="400" x2="950" y2="450" />
            </g>

            {/* Antique Sea Names */}
            <g fill="rgba(212, 175, 55, 0.22)" fontFamily="serif" fontStyle="italic" letterSpacing="3" fontSize="10">
              <text x="320" y="440" textAnchor="middle">OCEANUS ATLANTICUS</text>
              <text x="660" y="530" textAnchor="middle">OCEANUS INDICUS</text>
              <text x="645" y="420" textAnchor="middle" fontSize="8.5">MARE ARABICUM</text>
              <text x="735" y="430" textAnchor="middle" fontSize="8.5">SINUS BENGALENSIS</text>
              <text x="825" y="440" textAnchor="middle" fontSize="8.5">MARE SINENSE</text>
            </g>

            {/* AUTHENTIC VECTOR GEOGRAPHIES FROM @svg-maps/world */}
            <g className="trade-map-landmass">
              {(worldMap.locations as Array<{ id: string; name: string; path: string }>).map((loc) => {
                const isKeyTradingCountry = ['gb', 'in', 'cn', 'za', 'id', 'ph', 'my', 'eg', 'ye', 'nl', 'pt', 'es', 'fr'].includes(loc.id);
                return (
                  <path
                    key={loc.id}
                    id={loc.id}
                    d={loc.path}
                    className={`trade-country-path ${isKeyTradingCountry ? 'trade-country-key' : ''}`}
                  >
                    <title>{loc.name}</title>
                  </path>
                );
              })}
            </g>

            {/* Geographic Region Labels in Antique Serif */}
            <g fill="rgba(255, 255, 255, 0.45)" fontSize="9" fontFamily="serif" letterSpacing="1.5">
              <text x="468" y="255" textAnchor="middle">BRITANNIA</text>
              <text x="510" y="300" textAnchor="middle">EUROPA</text>
              <text x="520" y="450" textAnchor="middle">AFRICA</text>
              <text x="615" y="380" textAnchor="middle">ARABIA</text>
              <text x="707" y="390" textAnchor="middle" fill="rgba(245, 158, 11, 0.85)" fontWeight="bold">INDIA</text>
              <text x="785" y="350" textAnchor="middle">CHINA</text>
              <text x="535" y="635" textAnchor="middle" fontSize="7.5" fill="#f59e0b">C. BONAE SPEI (CAPE OF GOOD HOPE)</text>
            </g>

            {/* Inactive Routes (Faint historical traces) */}
            {TRADE_ROUTES.map(route => {
              if (route.id === selectedRouteId) return null;
              return (
                <path
                  key={`inactive-${route.id}`}
                  d={route.pathD}
                  fill="none"
                  stroke="url(#inactiveRouteGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="trade-route-inactive cursor-pointer"
                  onClick={() => handleSelectRoute(route.id)}
                />
              );
            })}

            {/* Active Selected Route (Glowing animated oceanic lane) */}
            <g className="trade-route-active-group">
              {/* Broad ambient gold glow */}
              <path
                d={activeRoute.pathD}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="6"
                strokeOpacity="0.3"
                filter="url(#glow)"
              />
              {/* Vibrant dashed animated wake */}
              <path
                d={activeRoute.pathD}
                fill="none"
                stroke="url(#activeRouteGrad)"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                className="trade-route-animated-path"
              />
            </g>

            {/* Animated Sailing Ship Waypoint along Route */}
            <g 
              transform={`translate(${activeRoute.shipWaypoint.x}, ${activeRoute.shipWaypoint.y}) rotate(${activeRoute.shipWaypoint.angle})`}
              className="trade-route-ship-token"
            >
              {/* Ship beacon halo */}
              <circle r="14" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" />
              {/* Realistic 3-masted Indiaman ship glyph */}
              <g transform="translate(-10, -10)">
                <path 
                  d="M 2 12 C 4 16, 16 16, 18 12 L 16 9 L 4 9 Z" 
                  fill="#f59e0b" 
                  stroke="#ffffff" 
                  strokeWidth="0.8" 
                />
                <line x1="6" y1="9" x2="6" y2="2" stroke="#ffffff" strokeWidth="1" />
                <line x1="10" y1="9" x2="10" y2="0" stroke="#ffffff" strokeWidth="1" />
                <line x1="14" y1="9" x2="14" y2="2" stroke="#ffffff" strokeWidth="1" />
                <path d="M 6 3 Q 9 5 6 7 Z" fill="#ffffff" />
                <path d="M 10 1 Q 14 3 10 6 Z" fill="#ffffff" />
                <path d="M 14 3 Q 17 5 14 7 Z" fill="#ffffff" />
              </g>
            </g>

            {/* Port Markers */}
            {PORTS.map(port => {
              const isFrom = activeRoute.fromCoords.x === port.coords.x && activeRoute.fromCoords.y === port.coords.y;
              const isTo = activeRoute.toCoords.x === port.coords.x && activeRoute.toCoords.y === port.coords.y;
              const isConnected = isFrom || isTo;

              return (
                <g 
                  key={port.id} 
                  className={`trade-port-marker ${isConnected ? 'trade-port-active' : ''}`}
                  transform={`translate(${port.coords.x}, ${port.coords.y})`}
                  onMouseEnter={() => setHoveredPort(port)}
                  onMouseLeave={() => setHoveredPort(null)}
                >
                  {/* Radar pulse for active route terminal ports */}
                  {isConnected && (
                    <circle r="16" fill="none" stroke="#f59e0b" strokeWidth="1.2" className="trade-port-radar" />
                  )}
                  {/* Outer metallic token ring */}
                  <circle 
                    r={isConnected ? 6 : 4} 
                    fill={isConnected ? '#f59e0b' : '#334155'} 
                    stroke="#ffffff" 
                    strokeWidth="1.5" 
                  />
                  {/* Port label text */}
                  <text 
                    y={port.coords.y > 320 ? 16 : -10} 
                    textAnchor="middle" 
                    className={`trade-port-text ${isConnected ? 'trade-port-text-active' : ''}`}
                  >
                    {port.name}
                  </text>
                </g>
              );
            })}

            {/* Antique Decorative Cartouche Banner (Top Left) */}
            <g className="trade-chart-cartouche" transform="translate(30, 24)">
              <rect 
                x="0" 
                y="0" 
                width="190" 
                height="56" 
                rx="6" 
                fill="rgba(6, 14, 23, 0.92)" 
                stroke="rgba(212, 175, 55, 0.45)" 
                strokeWidth="1" 
              />
              <rect 
                x="3" 
                y="3" 
                width="184" 
                height="50" 
                rx="4" 
                fill="none" 
                stroke="rgba(212, 175, 55, 0.2)" 
                strokeWidth="0.5" 
                strokeDasharray="4 2"
              />
              <text x="95" y="22" textAnchor="middle" fill="#fef08a" fontSize="9.5" fontFamily="serif" letterSpacing="1.8" fontWeight="bold">CHARTA NAUTICA</text>
              <text x="95" y="36" textAnchor="middle" fill="rgba(255, 255, 255, 0.75)" fontSize="7.5" fontFamily="monospace">HON. EAST INDIA COMPANY</text>
              <text x="95" y="47" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">MARITIME BULLION HIGHWAYS • 1784</text>
            </g>

            {/* Authentic 16-Point Antique Nautical Compass Rose (South Atlantic) */}
            <g transform="translate(105, 410)" className="trade-compass-rose opacity-60">
              <circle r="36" fill="none" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="0.8" />
              <circle r="22" fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="0.6" strokeDasharray="2 2" />
              {/* 16 Star Points */}
              <polygon points="0,-36 4,-12 0,0 -4,-12" fill="#f59e0b" />
              <polygon points="0,36 4,12 0,0 -4,12" fill="#78350f" />
              <polygon points="36,0 12,4 0,0 12,-4" fill="#d97706" />
              <polygon points="-36,0 -12,4 0,0 -12,-4" fill="#78350f" />
              <polygon points="25,-25 8,-4 0,0 4,-8" fill="#d97706" opacity="0.8" />
              <polygon points="-25,25 -8,4 0,0 -4,8" fill="#78350f" opacity="0.8" />
              <polygon points="-25,-25 -4,-8 0,0 -8,-4" fill="#f59e0b" opacity="0.8" />
              <polygon points="25,25 4,8 0,0 8,4" fill="#78350f" opacity="0.8" />
              {/* Cardinal Labels */}
              <text x="0" y="-40" textAnchor="middle" fill="#fef08a" fontSize="10" fontFamily="serif" fontWeight="bold">N</text>
              <text x="0" y="48" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="serif">S</text>
              <text x="44" y="3" textAnchor="start" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="serif">E</text>
              <text x="-44" y="3" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="serif">W</text>
            </g>
          </svg>

          {/* Port Hover Tooltip */}
          {hoveredPort && (
            <div 
              className="trade-port-tooltip"
              style={{
                left: `${(hoveredPort.coords.x / 1000) * 100}%`,
                top: `${(hoveredPort.coords.y / 520) * 100}%`
              }}
            >
              <div className="trade-port-tooltip-title flex items-center justify-between gap-2">
                <span>{hoveredPort.name}</span>
                <span className="text-[10px] text-amber-400/80 font-mono">{hoveredPort.coordinatesLabel}</span>
              </div>
              <div className="trade-port-tooltip-role">{hoveredPort.role}</div>
              <div className="trade-port-tooltip-coin">
                <Coins className="w-3 h-3 text-amber-400 inline mr-1" />
                <span>Standard: <strong>{hoveredPort.primaryCoin}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Vintage Parchment Dispatch Manifest Card */}
        <div className="trade-manifest-card">
          <div className="trade-manifest-seal">
            <span className="trade-manifest-seal-text">EIC 1793</span>
          </div>

          <div className="trade-manifest-header">
            <div className="trade-manifest-badge">
              <Anchor className="w-3.5 h-3.5 text-amber-500" />
              <span>COLONIAL TRADE MANIFEST • {activeRoute.period}</span>
            </div>
            <h4 className="trade-manifest-title">{activeRoute.name}</h4>
            <div className="trade-manifest-sub">
              <span>Origin: <strong>{activeRoute.from}</strong></span>
              <span className="mx-2 text-white/30">•</span>
              <span>Terminal: <strong>{activeRoute.to}</strong></span>
            </div>
          </div>

          {/* Manifest Columns */}
          <div className="trade-manifest-details">
            {/* Goods Traded */}
            <div className="trade-manifest-block">
              <div className="trade-manifest-label">
                <Package className="w-3.5 h-3.5 text-amber-400" />
                <span>Commodities Exchanged</span>
              </div>
              <ul className="trade-manifest-list">
                {activeRoute.goodsTraded.map((item, idx) => (
                  <li key={idx} className="trade-manifest-item">{item}</li>
                ))}
              </ul>
            </div>

            {/* Coinage in Circulation */}
            <div className="trade-manifest-block">
              <div className="trade-manifest-label">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <span>Monetary & Bullion Media</span>
              </div>
              <ul className="trade-manifest-list">
                {activeRoute.coinageUsed.map((coin, idx) => (
                  <li key={idx} className="trade-manifest-item">{coin}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Historical Significance Callout */}
          <div className="trade-manifest-impact">
            <div className="trade-manifest-impact-title">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 inline mr-1.5" />
              <span>Monetary System Impact</span>
            </div>
            <p className="trade-manifest-impact-text">
              {activeRoute.historicalImpact}
            </p>
          </div>

          {/* Annual Valuation and Distance Footer */}
          <div className="trade-manifest-footer">
            <div>
              <span className="trade-manifest-val-label">Estimated Commercial Volume:</span>
              <span className="trade-manifest-val-value">{activeRoute.annualValueEstimate}</span>
            </div>
            <div className="text-right text-[11px] font-mono text-amber-400/80 mt-1 flex items-center justify-end gap-1">
              <Navigation className="w-3 h-3 text-amber-400" />
              <span>{activeRoute.nauticalDistance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
