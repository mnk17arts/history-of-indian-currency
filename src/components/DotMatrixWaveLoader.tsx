import React, { useEffect, useRef, useState } from 'react';
import { Landmark, Sparkles } from 'lucide-react';

interface DotMatrixWaveLoaderProps {
  /** Optional custom message displayed under the title */
  message?: string;
  /** If provided, manually controls the progress (0-100). Otherwise, it simulates a smooth museum initialization. */
  progress?: number;
  /** Optional callback fired when loader completes its fade-out */
  onComplete?: () => void;
  /** Whether the loader is persistent (e.g., inside Suspense) or a dismissible boot screen */
  isDismissible?: boolean;
}

export const DotMatrixWaveLoader: React.FC<DotMatrixWaveLoaderProps> = ({
  message = 'Initializing 2,500-Year Numismatic Codex...',
  progress: controlledProgress,
  onComplete,
  isDismissible = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [internalProgress, setInternalProgress] = useState<number>(controlledProgress ?? 14);
  const [phaseMessage, setPhaseMessage] = useState<string>('Mounting High-Precision Exhibits...');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  // Simulated progress sequence if not externally controlled
  useEffect(() => {
    if (controlledProgress !== undefined) {
      setInternalProgress(controlledProgress);
      if (controlledProgress >= 100 && isDismissible) {
        setIsFadingOut(true);
        const timer = setTimeout(() => {
          onComplete?.();
        }, 550);
        return () => clearTimeout(timer);
      }
      return;
    }

    const phases = [
      { at: 25, msg: 'Calibrating Ashoka Edicts & Punch-Marked Planchets...' },
      { at: 55, msg: 'Synchronizing Gold Mohurs, Tankas & Imperial Ratios...' },
      { at: 80, msg: 'Reconstructing RBI Watermarks & Security Substrates...' },
      { at: 98, msg: 'Deploying High-Resolution 3D Numismatic Stages...' },
      { at: 100, msg: 'Codex Ready.' },
    ];

    let current = 14;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 9) + 4;
      if (current > 100) current = 100;

      setInternalProgress(current);

      const matchedPhase = phases.find((p) => current <= p.at) || phases[phases.length - 1];
      setPhaseMessage(matchedPhase.msg);

      if (current >= 100) {
        clearInterval(interval);
        if (isDismissible) {
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete?.();
            }, 550);
          }, 300);
        }
      }
    }, 75);

    return () => clearInterval(interval);
  }, [controlledProgress, isDismissible, onComplete]);

  // Track mouse coordinates directly on screen for localized ripple
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas Direct 2D Dot Matrix Wave Rendering (No 3D perspective or separate wave mesh)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Uniform 2D Dot Matrix grid parameters
    const DOT_SPACING = 22; // Regular 22px spacing matching museum aesthetic
    const BASE_RADIUS = 1.25; // Base resting dot radius (1.25px)
    const startTime = performance.now();

    const render = (currentTime: number) => {
      const elapsed = (currentTime - startTime) * 0.001; // seconds

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep solid obsidian background
      ctx.fillStyle = '#070709';
      ctx.fillRect(0, 0, width, height);

      // Ambient subtle center radial glow behind card
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      const radialGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.max(width, height) * 0.6
      );
      radialGradient.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
      radialGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
      radialGradient.addColorStop(1, 'rgba(7, 7, 9, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Render the 2D Dot Matrix directly: each dot stays at its fixed grid location,
      // while a pure white illumination wave sweeps smoothly from Left to Right
      const startX = (width % DOT_SPACING) * 0.5;
      const startY = (height % DOT_SPACING) * 0.5;

      for (let x = startX; x < width; x += DOT_SPACING) {
        // Left-to-right traveling wave mathematics: (k * x - omega * t)
        // Primary left-to-right wave pulse
        const wave1 = Math.sin(x * 0.0075 - elapsed * 3.2);
        // Secondary harmonic left-to-right wave for organic crest contour
        const wave2 = Math.sin(x * 0.015 - elapsed * 4.4) * 0.22;

        for (let y = startY; y < height; y += DOT_SPACING) {
          // Subtle organic vertical contour while strictly propagating left-to-right
          const verticalContour = Math.sin(y * 0.005 + x * 0.002) * 0.15;

          // Optional user cursor deflection ripple
          const mdx = x - mouseX;
          const mdy = y - mouseY;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const mouseWave = mouseDist < 160 ? (1 - mouseDist / 160) * Math.sin(mouseDist * 0.05 - elapsed * 5.0) * 0.3 : 0;

          // Normalized combined wave intensity [0, 1]
          const combined = (wave1 + wave2 + verticalContour);
          const intensity = Math.max(0, Math.min(1, (combined + 1.2) * 0.45 + mouseWave));

          // Dynamic dot radius & opacity based directly on wave intensity
          const radius = BASE_RADIUS + intensity * 1.5; // 1.25px (resting) to 2.75px (crest)
          const alpha = 0.12 + intensity * 0.84; // 0.12 (resting) to 0.96 (crest peak)

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          // PURE WHITE ONLY FOR ALL DOTS: crisp luminous white gradient based on wave intensity
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          // Soft pure white micro-bloom halo on peak wave crests
          if (intensity > 0.82) {
            ctx.beginPath();
            ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.15})`;
            ctx.fill();
          }
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <aside
      ref={containerRef}
      aria-label="Loading Numismatic Codex"
      className={`fixed inset-0 flex flex-col items-center justify-center select-none transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999999, // Highest priority: sits above header, modals, and all page contents
        background: '#070709',
        overflow: 'hidden',
      }}
    >
      {/* Direct 2D Dot Matrix Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Floating Center Glassmorphic Codex Card */}
      <div
        className="relative z-10 flex flex-col items-center max-w-md mx-4 p-8 rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.95)] text-center"
        style={{
          boxShadow: '0 25px 70px -10px rgba(0, 0, 0, 0.95), 0 0 45px rgba(217, 119, 6, 0.14)',
        }}
      >
        {/* Glowing Ashoka Landmark Insignia */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full bg-amber-500/20 blur-xl animate-pulse" />
          <div className="relative w-14 h-14 rounded-full border border-amber-500/30 bg-[#0d0e14] flex items-center justify-center shadow-inner">
            <Landmark className="w-6 h-6 text-amber-400" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Header & Subtitle */}
        <div className="space-y-1 mb-6">
          <div className="text-[10px] tracking-[0.28em] font-mono uppercase text-amber-400/90 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            Historical Numismatic Codex
          </div>
          <h1 className="text-xl md:text-2xl font-serif tracking-tight text-white">
            History of Indian Currency
          </h1>
          <p className="text-xs text-white/65 font-sans tracking-wide">
            {message}
          </p>
        </div>

        {/* Hairline Gold Progress Bar */}
        <div className="w-full space-y-2.5">
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-400 transition-all duration-200 ease-out shadow-[0_0_12px_rgba(245,158,11,0.6)]"
              style={{ width: `${internalProgress}%` }}
            />
          </div>

          {/* Micro Status Meta */}
          <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
            <span className="truncate max-w-[240px] text-left text-white/80">
              {phaseMessage}
            </span>
            <span className="text-amber-400 font-bold ml-2 tabular-nums">
              {Math.round(internalProgress)}%
            </span>
          </div>
        </div>

        {/* Archival Badge */}
        <div className="mt-6 pt-4 border-t border-white/10 w-full flex items-center justify-between text-[10px] text-white/45 font-mono tracking-wider">
          <span>6TH CENTURY BCE – 2026 CE</span>
          <span>RESERVE BANK CODEX</span>
        </div>
      </div>
    </aside>
  );
};
