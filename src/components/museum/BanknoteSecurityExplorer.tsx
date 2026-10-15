import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  Lightbulb, 
  Maximize2, 
  Sparkles, 
  Layers, 
  Search, 
  CheckCircle2, 
  SunMedium
} from 'lucide-react';
import { sound } from '../../audio';

interface SecurityFeature {
  id: string;
  name: string;
  category: string;
  inspectionMode: 'Transillumination' | 'Angular Tilt' | '10x Magnification' | 'Tactile Intaglio';
  position: { top: string; left: string };
  zoomVisual: string;
  headline: string;
  description: string;
  physics: string;
}

const SECURITY_FEATURES: SecurityFeature[] = [
  {
    id: 'watermark',
    name: 'Mahatma Gandhi Watermark',
    category: 'Transillumination Feature',
    inspectionMode: 'Transillumination',
    position: { top: '48%', left: '26%' },
    zoomVisual: 'Light-transmitting multi-tonal portrait with electrotype numeral 500',
    headline: 'Three-Dimensional Shaded Watermark',
    description: 'Embedded within the 100% cotton rag paper fibers during cylinder mould creation; shows soft tonal gradations of Gandhi with a bright electrotype numeral.',
    physics: 'Varying paper pulp thickness alters light transmission without adding surface ink.'
  },
  {
    id: 'microtext',
    name: 'Micro-Lettering "RBI & ₹500"',
    category: 'Micro-Optics Feature',
    inspectionMode: '10x Magnification',
    position: { top: '38%', left: '42%' },
    zoomVisual: 'Continuous razor-sharp microscopic characters readable only at 10x',
    headline: 'Sub-Millimeter Intaglio Microtext',
    description: 'Crisp recurring letters "RBI" and "₹500" printed between the portrait and decorative border, blurring into an indistinguishable solid line on commercial copiers.',
    physics: 'High-precision steel die engraving exceeding standard laser scanner resolution.'
  },
  {
    id: 'security-thread',
    name: 'Color-Shifting Security Thread',
    category: 'Optical Kinetic Feature',
    inspectionMode: 'Angular Tilt',
    position: { top: '50%', left: '56%' },
    zoomVisual: 'Windowed metallic ribbon shifting dynamically from forest green to deep azure',
    headline: '3mm Windowed Magnetic Security Thread',
    description: 'Thread woven intermittently into the paper substrate. When viewed flat, it appears green; tilting changes the optical interference to brilliant blue.',
    physics: 'Micro-optical thin film interference layers and embedded machine-readable magnetism.'
  },
  {
    id: 'latent-image',
    name: 'Latent Denominational Image',
    category: 'Angular Perception Feature',
    inspectionMode: 'Angular Tilt',
    position: { top: '78%', left: '16%' },
    zoomVisual: 'Hidden numeral 500 appearing in vertical cartouche at eye level',
    headline: 'Horizontal Intaglio Latent Image',
    description: 'At a normal 90° angle, the vertical band appears as decorative intaglio ridges. Holding the note horizontally at eye level exposes the numeral 500.',
    physics: 'Parallel raised ink ridges casting micro-shadows that align only at 45° glance.'
  },
  {
    id: 'ovi-ink',
    name: 'Optically Variable Ink (OVI)',
    category: 'Dynamic Color Shift',
    inspectionMode: 'Angular Tilt',
    position: { top: '82%', left: '78%' },
    zoomVisual: 'Intaglio numeral 500 shifting iridescently from green to vivid blue',
    headline: 'Optically Variable Magnetic Ink',
    description: 'The denomination numeral at bottom-right is stamped in proprietary OVI ink. Tilting the note shifts the colour cleanly between green and blue.',
    physics: 'Multi-layer interference flakes suspended in intaglio vehicle reflecting selected light wavelengths.'
  },
  {
    id: 'see-through',
    name: 'See-Through Register',
    category: 'Exact Alignment Feature',
    inspectionMode: 'Transillumination',
    position: { top: '22%', left: '16%' },
    zoomVisual: 'Split floral geometry forming complete numeral 500 when held to light',
    headline: 'Front-to-Back Simultaneous Register',
    description: 'A floral motif printed half on the obverse and half on the reverse. When held up to light, both halves align with microscopic sub-millimeter precision.',
    physics: 'Simultaneous simultaneous-offset lithographic print run on dual cylinders.'
  }
];

export const BanknoteSecurityExplorer: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('watermark');
  const [isBacklit, setIsBacklit] = useState<boolean>(false);

  const activeFeature = SECURITY_FEATURES.find(f => f.id === activeFeatureId) || SECURITY_FEATURES[0];

  const handleSelectFeature = (id: string) => {
    sound.playClick();
    setActiveFeatureId(id);
  };

  const handleToggleBacklight = () => {
    sound.playHover();
    setIsBacklit(prev => !prev);
  };

  return (
    <div className="security-explorer-container">
      {/* Exhibit Header */}
      <div className="security-explorer-header">
        <div className="security-badge">
          <ShieldCheck size={13} style={{ color: '#38bdf8' }} />
          <span>SIGNATURE EXHIBIT • MODERN BANKNOTE SECURITY EXPLORER</span>
        </div>
        <h3 className="security-explorer-title">
          World-Class Forensic Architecture of the Indian Rupee
        </h3>
        <p className="security-explorer-subtitle">
          Modern Indian banknotes incorporate multi-layered optical physics, tactile intaglio, and micro-substrates. Select an inspection beacon or toggle backlighting to examine forensic security layers.
        </p>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="security-explorer-grid">
        
        {/* Left: Interactive Banknote Surface with Beacons */}
        <div className="security-banknote-viewport">
          
          {/* Backlight Glow Filter Overlay */}
          <div className={`security-banknote-stage ${isBacklit ? 'backlight-active' : ''}`}>
            
            {/* High-Resolution Banknote Specimen Image */}
            <img 
              src="./specimens/mg_new_500_front.jpg" 
              alt="Modern Mahatma Gandhi New Series 500 Rupee Note"
              className="security-banknote-base-img"
            />

            {/* Backlight Transillumination Layer */}
            <div className="security-backlight-layer" />

            {/* Hotspot Beacons Placed over Actual Physical Coordinates */}
            {SECURITY_FEATURES.map((feature) => {
              const isActive = feature.id === activeFeatureId;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => handleSelectFeature(feature.id)}
                  style={{ top: feature.position.top, left: feature.position.left }}
                  className={`security-hotspot-pin ${isActive ? 'security-hotspot-active' : ''}`}
                  title={`Inspect ${feature.name}`}
                  aria-label={`Inspect ${feature.name}`}
                >
                  <span className="security-hotspot-pulse" />
                  <span className="security-hotspot-core" />
                </button>
              );
            })}
          </div>

          {/* Under-Banknote Inspection Toolbar */}
          <div className="security-toolbar">
            <button
              type="button"
              onClick={handleToggleBacklight}
              className={`security-backlight-toggle ${isBacklit ? 'active' : ''}`}
            >
              <SunMedium size={14} />
              <span>{isBacklit ? 'Backlight Mode: ACTIVE' : 'Hold Against Light (Transillumination)'}</span>
            </button>

            <div className="security-active-pill">
              <Eye size={12} style={{ color: '#38bdf8' }} />
              <span>Inspecting: <strong style={{ color: '#fff' }}>{activeFeature.name}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Forensic Specimen Loupe / Inspector Panel */}
        <div className="security-inspector-panel">
          <div className="security-panel-header">
            <span className="security-mode-badge">
              {activeFeature.inspectionMode}
            </span>
            <span className="security-cat-text">{activeFeature.category}</span>
          </div>

          <h4 className="security-feature-name">{activeFeature.headline}</h4>

          {/* Loupe Simulation Stage */}
          <div className={`security-loupe-stage ${activeFeature.id}`}>
            <div className="security-loupe-crosshair" />
            <div className="security-loupe-visual-label">
              <Search size={14} style={{ color: '#38bdf8' }} />
              <span>FORENSIC MAGNIFIED SIMULATION</span>
            </div>
            <p className="security-loupe-content">
              {activeFeature.zoomVisual}
            </p>
          </div>

          {/* Technical Curatorial Description */}
          <div className="security-feature-desc">
            <p>{activeFeature.description}</p>
          </div>

          {/* Anti-Counterfeiting Physics Callout */}
          <div className="security-physics-box">
            <div className="security-physics-title">
              <CheckCircle2 size={13} style={{ color: '#10b981' }} />
              <span>ANTI-COUNTERFEITING PHYSICS</span>
            </div>
            <p className="security-physics-text">
              {activeFeature.physics}
            </p>
          </div>

          {/* Quick Feature Switcher Tabs */}
          <div className="security-feature-pills">
            {SECURITY_FEATURES.map((feat) => (
              <button
                key={feat.id}
                type="button"
                onClick={() => handleSelectFeature(feat.id)}
                className={`security-pill-chip ${feat.id === activeFeatureId ? 'active' : ''}`}
              >
                {feat.name}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
