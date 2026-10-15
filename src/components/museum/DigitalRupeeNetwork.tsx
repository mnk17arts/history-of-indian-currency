import React, { useState, useEffect, useRef } from 'react';
import {
  Network,
  Send,
  ShieldCheck,
  QrCode,
  Cpu,
  Sparkles,
  CheckCircle2,
  Zap,
  Lock,
  Wallet,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move
} from 'lucide-react';
import { sound } from '../../audio';
import indiaMap from '@svg-maps/india';

interface MapLocation {
  id: string;
  name: string;
  path: string;
}

interface NetworkNode {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
}

interface TransactionLog {
  id: string;
  from: string;
  to: string;
  amount: string;
  type: string;
  timestamp: string;
  tokenHash: string;
}

// Geographically accurate positions on @svg-maps/india vector map (viewBox 0 0 612 696)
const NODES: NetworkNode[] = [
  { id: 'delhi', name: 'New Delhi', role: 'Sovereign Treasury Gateway', x: 186, y: 210 },
  { id: 'mumbai', name: 'Mumbai', role: 'RBI Central CBDC Ledger', x: 112, y: 420 },
  { id: 'bengaluru', name: 'Bengaluru', role: 'National Tech Architecture', x: 195, y: 560 },
  { id: 'hyderabad', name: 'Hyderabad', role: 'Cryptographic Security Vault', x: 237, y: 456 },
  { id: 'chennai', name: 'Chennai', role: 'Southern Clearing Node', x: 250, y: 555 },
  { id: 'kolkata', name: 'Kolkata', role: 'Eastern Monetary Hub', x: 410, y: 350 },
  { id: 'gift', name: 'GIFT City', role: 'Cross-Border International CBDC', x: 88, y: 330 },
  { id: 'guwahati', name: 'Guwahati', role: 'Northeast Sovereign Rail', x: 480, y: 270 }
];

export const DigitalRupeeNetwork: React.FC = () => {
  const [activeTxn, setActiveTxn] = useState<TransactionLog | null>(null);
  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<'retail' | 'wholesale' | 'voucher'>('retail');
  const [activeConnection, setActiveConnection] = useState<{ from: NetworkNode; to: NetworkNode } | null>(null);
  const [hoveredState, setHoveredState] = useState<{ id: string; name: string } | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number }>({ x: 0, y: 0, panX: 0, panY: 0 });

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
    const maxPanX = 220 * (zoomScale - 1);
    const maxPanY = 260 * (zoomScale - 1);
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

  const triggerTransaction = (type: 'retail' | 'wholesale' | 'voucher') => {
    setActiveMode(type);
    setIsTransacting(true);
    sound.playSuccess();

    let fromNode: NetworkNode;
    let toNode: NetworkNode;
    let amount = '₹500';
    let typeLabel = 'Retail e₹-R Instant Transfer';

    if (type === 'retail') {
      fromNode = NODES[1]; // Mumbai
      toNode = NODES[2];   // Bengaluru
      amount = '₹500 e₹';
      typeLabel = 'Retail (e₹-R) Non-Custodial Token Swap';
    } else if (type === 'wholesale') {
      fromNode = NODES[1]; // Mumbai
      toNode = NODES[0];   // Delhi
      amount = '₹10,00,00,000 e₹';
      typeLabel = 'Wholesale (e₹-W) Interbank Securities Settlement';
    } else {
      fromNode = NODES[0]; // Delhi
      toNode = NODES[5];   // Kolkata
      amount = '₹2,000 e₹';
      typeLabel = 'Offline Programmable Agri-Smart Voucher';
    }

    setActiveConnection({ from: fromNode, to: toNode });

    const newTxn: TransactionLog = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      from: fromNode.name,
      to: toNode.name,
      amount,
      type: typeLabel,
      timestamp: 'Just now',
      tokenHash: `0x${Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`.toUpperCase()
    };

    setActiveTxn(newTxn);

    setTimeout(() => {
      setIsTransacting(false);
    }, 2400);
  };

  useEffect(() => {
    // Initial demo transaction
    triggerTransaction('retail');
  }, []);

  return (
    <div className="digital-network-container">
      {/* Exhibit Header */}
      <div className="digital-network-header">
        <div className="digital-badge">
          <Network size={13} style={{ color: '#818cf8' }} />
          <span>SIGNATURE EXHIBIT • DIGITAL RUPEE (e₹) SETTLEMENT RAIL</span>
        </div>
        <h3 className="digital-network-title">
          The Sovereign Cryptographic Ledger of India
        </h3>
        <p className="digital-network-subtitle">
          Unlike private cryptocurrencies or intermediary bank transfers, the Digital Rupee is sovereign cash in digital tokens—issued directly on the Reserve Bank’s distributed balance sheet. Trigger a transaction to observe instantaneous cryptographic settlement across national nodes.
        </p>
      </div>

      {/* Action Trigger Buttons */}
      <div className="digital-action-bar">
        <button
          type="button"
          onClick={() => triggerTransaction('retail')}
          className={`digital-action-btn ${activeMode === 'retail' ? 'active' : ''}`}
        >
          <Wallet size={14} />
          <span>1. Retail P2P (e₹-R)</span>
        </button>

        <button
          type="button"
          onClick={() => triggerTransaction('wholesale')}
          className={`digital-action-btn ${activeMode === 'wholesale' ? 'active' : ''}`}
        >
          <ShieldCheck size={14} />
          <span>2. Wholesale Interbank (e₹-W)</span>
        </button>

        <button
          type="button"
          onClick={() => triggerTransaction('voucher')}
          className={`digital-action-btn ${activeMode === 'voucher' ? 'active' : ''}`}
        >
          <QrCode size={14} />
          <span>3. Offline Programmable Voucher</span>
        </button>
      </div>

      {/* Interactive Map & Ledger Grid */}
      <div className="digital-stage-grid">

        {/* Left: Vector India Map with Node Infrastructure */}
        <div 
          className="digital-map-viewport"
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
          <div className="digital-map-ambient" />

          {/* Floating Map Zoom & Pan Controls Dock */}
          <div 
            className="museum-map-zoom-dock"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(7, 11, 22, 0.92)',
              border: '1px solid rgba(129, 140, 248, 0.4)',
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
                color: zoomScale <= 1.0 ? '#475569' : '#e0e7ff',
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
              color: '#818cf8',
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
                color: zoomScale >= 2.5 ? '#475569' : '#e0e7ff',
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
                bottom: '44px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 25,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: 'rgba(0, 0, 0, 0.85)',
                border: '1px solid rgba(129, 140, 248, 0.3)',
                color: '#e0e7ff',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                pointerEvents: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                whiteSpace: 'nowrap'
              }}
            >
              <Move size={10} className="text-indigo-400 animate-pulse" />
              <span>Drag / swipe to pan across India sovereign CBDC nodes</span>
            </div>
          )}

          <svg
            viewBox={indiaMap.viewBox}
            className="digital-india-svg"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            aria-label="Official political boundary vector map of India with states and union territories showing sovereign digital currency nodes"
          >
            {/* Background Map Grid & Lat/Long Coordinates */}
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
              </linearGradient>

              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle Latitude & Longitude Coordinate Graticules */}
            <g stroke="rgba(129, 140, 248, 0.08)" strokeWidth="0.6">
              <line x1="40" y1="150" x2="580" y2="150" strokeDasharray="3 4" />
              <line x1="40" y1="300" x2="580" y2="300" strokeDasharray="3 4" />
              <line x1="40" y1="450" x2="580" y2="450" strokeDasharray="3 4" />
              <line x1="40" y1="600" x2="580" y2="600" strokeDasharray="3 4" />

              <line x1="150" y1="40" x2="150" y2="660" strokeDasharray="3 4" />
              <line x1="300" y1="40" x2="300" y2="660" strokeDasharray="3 4" />
              <line x1="450" y1="40" x2="450" y2="660" strokeDasharray="3 4" />
            </g>

            {/* Ocean Geographical Markers */}
            <g fill="rgba(148, 163, 184, 0.28)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="3">
              <text x="60" y="500" textAnchor="middle">ARABIAN SEA</text>
              <text x="440" y="520" textAnchor="middle">BAY OF BENGAL</text>
              <text x="250" y="675" textAnchor="middle">INDIAN OCEAN</text>
            </g>

            {/* ALL 36 AUTHENTIC STATES & UNION TERRITORIES VECTOR PATHS */}
            <g className="digital-india-states-group">
              {(indiaMap.locations as unknown as MapLocation[]).map((loc: MapLocation) => {
                const isHovered = hoveredState?.id === loc.id;
                return (
                  <path
                    key={loc.id}
                    id={loc.id}
                    d={loc.path}
                    className={`digital-state-path ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredState({ id: loc.id, name: loc.name })}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    <title>{loc.name}</title>
                  </path>
                );
              })}
            </g>

            {/* Inactive Inter-Node Cryptographic Mesh Lines */}
            {NODES.map((node, i) =>
              NODES.slice(i + 1).map((targetNode, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="rgba(129, 140, 248, 0.12)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              ))
            )}

            {/* Active Transaction Path with Flowing Particles */}
            {activeConnection && (
              <g className="active-transaction-line">
                <line
                  x1={activeConnection.from.x}
                  y1={activeConnection.from.y}
                  x2={activeConnection.to.x}
                  y2={activeConnection.to.y}
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  className={isTransacting ? 'flowing-stroke' : ''}
                />

                {/* Moving Light Packet */}
                {isTransacting && (
                  <circle
                    cx={activeConnection.to.x}
                    cy={activeConnection.to.y}
                    r="8"
                    fill="#38bdf8"
                    className="particle-pulse"
                  />
                )}
              </g>
            )}

            {/* Network Nodes */}
            {NODES.map((node) => {
              const isSource = activeConnection?.from.id === node.id;
              const isTarget = activeConnection?.to.id === node.id;
              const isHighlighted = isSource || isTarget;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="network-node-group"
                >
                  {/* Subtle Node Aura */}
                  <circle
                    r={isHighlighted ? '22' : '12'}
                    fill="url(#nodeGlow)"
                    className={isHighlighted ? 'node-aura-pulse' : ''}
                  />

                  {/* Core Node Dot */}
                  <circle
                    r={isHighlighted ? '6.5' : '4'}
                    fill={isHighlighted ? '#38bdf8' : 'rgba(255, 255, 255, 0.7)'}
                    stroke="#0f172a"
                    strokeWidth="1.8"
                  />

                  {/* Node Name Label */}
                  <text
                    x={node.x > 300 ? '-10' : '10'}
                    y="3"
                    textAnchor={node.x > 300 ? 'end' : 'start'}
                    fill={isHighlighted ? '#ffffff' : 'rgba(255, 255, 255, 0.75)'}
                    fontSize={isHighlighted ? '11' : '10'}
                    fontFamily="var(--font-mono)"
                    fontWeight={isHighlighted ? '700' : '500'}
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Real-time Status Overlay Badge */}
          <div className="digital-status-badge">
            <span className="digital-status-dot" />
            {hoveredState ? (
              <span>State / UT: <strong style={{ color: '#38bdf8' }}>{hoveredState.name}</strong></span>
            ) : (
              <span>CBDC Sovereign Mesh: <strong>100% OPERATIONAL</strong></span>
            )}
          </div>
        </div>

        {/* Right: Cryptographic Ledger Verification Terminal */}
        <div className="digital-ledger-terminal">
          <div className="digital-terminal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={14} style={{ color: '#818cf8' }} />
              <span className="digital-terminal-title">RESERVE BANK SOVEREIGN LEDGER TERMINAL</span>
            </div>
            <span className="digital-terminal-live">LIVE</span>
          </div>

          {activeTxn && (
            <div className="digital-receipt-box">
              <div className="digital-receipt-row">
                <span className="receipt-label">TRANSACTION HASH:</span>
                <span className="receipt-hash">{activeTxn.tokenHash}</span>
              </div>

              <div className="digital-receipt-row">
                <span className="receipt-label">SETTLEMENT TYPE:</span>
                <span className="receipt-val highlight">{activeTxn.type}</span>
              </div>

              <div className="digital-receipt-row">
                <span className="receipt-label">SOVEREIGN ROUTING:</span>
                <span className="receipt-val">{activeTxn.from} ➔ {activeTxn.to}</span>
              </div>

              <div className="digital-receipt-row">
                <span className="receipt-label">TOKEN VALUE:</span>
                <span className="receipt-amount">{activeTxn.amount}</span>
              </div>

              <div className="digital-receipt-row">
                <span className="receipt-label">INTERMEDIARY RISK:</span>
                <span className="receipt-val success">0.00% (Direct Sovereign Liability of RBI)</span>
              </div>

              <div className="digital-receipt-row">
                <span className="receipt-label">FINALITY SPEED:</span>
                <span className="receipt-val success">&lt; 180ms Cryptographic Settlement</span>
              </div>
            </div>
          )}

          {/* Three Key Sovereign Principles */}
          <div className="digital-principles-group">
            <div className="digital-principle-item">
              <Lock size={14} style={{ color: '#818cf8', flexShrink: 0 }} />
              <div>
                <span className="principle-name">100% Sovereign Trust</span>
                <p className="principle-desc">Direct legal tender backed by the sovereign balance sheet of the Republic, eliminating private exchange collapse risk.</p>
              </div>
            </div>

            <div className="digital-principle-item">
              <Zap size={14} style={{ color: '#38bdf8', flexShrink: 0 }} />
              <div>
                <span className="principle-name">Offline Programmability</span>
                <p className="principle-desc">Enables targeted agricultural grants and rural payments on basic feature phones without continuous internet coverage.</p>
              </div>
            </div>

            <div className="digital-principle-item">
              <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
              <div>
                <span className="principle-name">Interoperable National Rails</span>
                <p className="principle-desc">Unified with the National Bharat QR and UPI ecosystem across 500 million merchants and citizens.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
