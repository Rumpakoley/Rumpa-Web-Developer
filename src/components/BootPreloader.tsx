import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

interface BootPreloaderProps {
  onComplete: () => void;
}

export const BootPreloader: React.FC<BootPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING GARAGE SYSTEM...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const steps = [
      { p: 18, text: 'BOOTING AI GARAGE OS v1.8...' },
      { p: 42, text: 'MAPPING 10 DUAL-AXIS 3D NODES...' },
      { p: 68, text: 'HYDRATING REACT 19 RENDER CORE...' },
      { p: 88, text: 'CALIBRATING WEB AUDIO SYNTHESIZER...' },
      { p: 100, text: 'ALL SUBSYSTEMS NOMINAL // READY' },
    ];

    let currentStepIdx = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.floor(Math.random() * 8 + 4));

        if (currentStepIdx < steps.length && next >= steps[currentStepIdx].p) {
          setStatusText(steps[currentStepIdx].text);
          sound.playKey(800 + currentStepIdx * 100);
          currentStepIdx++;
        }

        if (next >= 100) {
          clearInterval(interval);
          sound.playTerminalSuccess();
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              onComplete();
            }, 600); // Wait for curtain wipe animation
          }, 250);
          return 100;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100000] bg-[#0c0d11] bg-garage-scanlines flex flex-col items-center justify-center select-none font-mono transition-all duration-600 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background warm amber ambient glow */}
      <div 
        aria-hidden="true" 
        className="absolute w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" 
      />

      {/* Center Chamber */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Wireframe Orbital Radar */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-amber-500/30 border-dashed animate-spin" style={{ animationDuration: '12s' }} />
          <div className="w-16 h-16 rounded-full border border-amber-500/50 absolute" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping absolute" />
          <div className="w-2 h-2 rounded-full bg-amber-400 absolute shadow-[0_0_10px_#f59e0b]" />
        </div>

        {/* Identity Title */}
        <div className="text-sm font-bold tracking-widest text-white uppercase mb-1">
          RUMPA KOLEY // AI GARAGE
        </div>
        <div className="text-[11px] text-slate-500 mb-6 tracking-wider">
          PORTFOLIO ARCHITECTURE v1.8
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#181920] border border-amber-500/30 rounded-full h-1.5 overflow-hidden p-0.5 mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 rounded-full transition-all duration-75 shadow-[0_0_10px_#f59e0b]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numeric Counter & Status */}
        <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mb-4">
          <span className="text-amber-400 truncate max-w-[240px] text-left text-[10px]">
            {statusText}
          </span>
          <span className="text-white font-bold ml-2 tabular-nums">
            {progress}%
          </span>
        </div>

        {/* Skip hint */}
        <button
          onClick={() => {
            sound.playTerminalSuccess();
            setIsExiting(true);
            setTimeout(onComplete, 200);
          }}
          className="text-[10px] text-slate-600 hover:text-amber-400 transition-colors uppercase tracking-widest mt-4"
        >
          [ CLICK TO SKIP BOOT ]
        </button>
      </div>

      {/* Phosphor horizontal beam collapse line when exiting */}
      {isExiting && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_20px_#f59e0b] z-20 pointer-events-none animate-pulse" />
      )}
    </div>
  );
};
