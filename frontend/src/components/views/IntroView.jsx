import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function IntroView() {
  const { setCurrentView, openModal } = useAppContext();
  const [showIntro, setShowIntro] = useState(true);
  const bgRef = useRef(null);
  const tiltRef = useRef(null);

  // Intro Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500); // 2.5s de intro épica
    return () => clearTimeout(timer);
  }, []);

  // Parallax Effect
  useEffect(() => {
    if (showIntro) return;
    const handleMouseMove = (e) => {
      if (bgRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
      }
      
      if (tiltRef.current) {
        const rect = tiltRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg tilt
        const rotateY = ((x - centerX) / centerX) * 15;
        tiltRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (tiltRef.current) {
        tiltRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showIntro]);

  const showIntroInfo = () => {
    openModal('ℹ️ Sobre MundialSwap 2026', `
      <div class="space-y-3 text-white">
        <p class="text-sm text-gray-300">Plataforma oficial de intercambio de fichas del Mundial FIFA 2026.</p>
        <div class="grid grid-cols-2 gap-2">
          <div class="p-3 rounded-lg bg-green-900/40 border border-green-500/30">
            <i class="fas fa-book text-green-400 text-xl mb-1"></i>
            <div class="font-bold text-sm">144 Fichas</div>
            <div class="text-xs text-gray-400">48 equipos</div>
          </div>
          <div class="p-3 rounded-lg bg-red-900/40 border border-red-500/30">
            <i class="fas fa-exchange-alt text-red-400 text-xl mb-1"></i>
            <div class="font-bold text-sm">Intercambios</div>
            <div class="text-xs text-gray-400">En tiempo real</div>
          </div>
          <div class="p-3 rounded-lg bg-yellow-900/40 border border-yellow-500/30">
            <i class="fas fa-trophy text-yellow-400 text-xl mb-1"></i>
            <div class="font-bold text-sm">Logros</div>
            <div class="text-xs text-gray-400">Desbloqueables</div>
          </div>
          <div class="p-3 rounded-lg bg-blue-900/40 border border-blue-500/30">
            <i class="fas fa-comments text-blue-400 text-xl mb-1"></i>
            <div class="font-bold text-sm">Chat</div>
            <div class="text-xs text-gray-400">Comunicación</div>
          </div>
        </div>
      </div>
    `);
  };

  const logoUrl = "/logo.jpg";

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
        <div className="text-center animate-pulse-soft">
          <img 
            src="https://image.qwenlm.ai/public_source/7e894e1a-5d8e-41a3-a0e4-4f279b4ddc68/c1f592cf-b3b3-4f9e-a0e4-4f279b4ddc68.png" 
            alt="Mundial" 
            className="w-full h-full object-cover absolute inset-0 opacity-20 blur-xl"
          />
          <div className="relative z-10 animate-bounce-in">
            <img src={logoUrl} alt="Copa" className="w-48 mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black">
      {/* Fondo Futbolero Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
        style={{ 
          backgroundImage: "url('/bg5.webp')", 
          transform: "scale(1.1)"
        }}
      ></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl animate-scale w-full" style={{ perspective: '1000px' }}>
        <div 
          ref={tiltRef}
          className="glass-panel p-10 md:p-16" 
          style={{ transition: 'transform 0.1s ease-out', transformStyle: 'preserve-3d' }}
        >
          <div className="mb-6" style={{ transform: 'translateZ(50px)' }}>
            <img 
              src={logoUrl} 
              alt="Copa del Mundo" 
              className="mx-auto w-40 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" 
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-2 text-slate-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] uppercase heading" style={{ transform: 'translateZ(30px)' }}>
            MUNDIAL<span className="text-red-600">SWAP</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-4 text-slate-800 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" style={{ transform: 'translateZ(20px)' }}>
            2026 • FIFA World Cup
          </p>
          <p className="text-lg text-slate-700 mb-10 font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" style={{ transform: 'translateZ(10px)' }}>
            El mayor intercambio de fichas digital del mundo.
          </p>
          <div className="flex gap-4 justify-center flex-wrap" style={{ transform: 'translateZ(40px)' }}>
            <button onClick={() => setCurrentView('login')} className="glass-btn px-10 py-4 rounded-xl font-bold text-lg shadow-lg">
              <i className="fas fa-play mr-2"></i> Comenzar Aventura
            </button>
            <button onClick={showIntroInfo} className="glass-btn-social px-8 py-4 rounded-xl font-bold text-lg shadow-lg backdrop-blur-md">
              <i className="fas fa-info-circle mr-2"></i> Saber más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
