import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { stickerImgUrl } from '../../data';
import { playFlipSound, playClickSound } from '../../utils/sound';

export default function StickerCard({ p, team, showTeam = true }) {
  const { ownedStickers, toggleSticker } = useAppContext();
  const [isFlipped, setIsFlipped] = useState(false);
  const isOwned = ownedStickers.has(p.id);

  const posColors = {
    'POR': 'bg-yellow-500',
    'DEF': 'bg-blue-600',
    'MED': 'bg-green-600',
    'DEL': 'bg-red-600'
  };

  const handleFlip = () => {
    playFlipSound();
    setIsFlipped(!isFlipped);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    playClickSound();
    toggleSticker(p.id);
  };

  return (
    <div className={`sticker-slot flip-card relative rounded-lg ${isFlipped ? 'flipped' : ''} ${isOwned ? 'owned' : ''}`} onClick={handleFlip}>
      {p.isRare && <div className="holo-effect rounded-lg pointer-events-none"></div>}
      
      {/* Front Face */}
      <div className="flip-face w-full h-full flex flex-col relative rounded-lg overflow-hidden bg-slate-900 shadow-inner">
        <div className="h-3/4 relative overflow-hidden bg-black/40">
          <img src={stickerImgUrl} alt={p.name} className="w-full h-full object-cover mix-blend-screen opacity-90" />
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border border-white/20 shadow-sm">
            {p.num}
          </div>
          {isOwned && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-500/10">
              <i className="fas fa-check-circle text-4xl text-green-500 drop-shadow animate-bounce-in"></i>
            </div>
          )}
        </div>
        <div className="h-1/4 p-2 flex flex-col justify-center bg-black/30 border-t border-white/10">
          <div className="text-xs font-bold text-white truncate leading-tight drop-shadow-sm">{p.name}</div>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${posColors[p.pos]} uppercase shadow-sm`}>
              {p.pos}
            </span>
            {showTeam && <span className="text-[10px] text-gray-300 font-medium drop-shadow-sm">{team.flag}</span>}
          </div>
        </div>
      </div>

      {/* Back Face - Gaming Stats UI */}
      <div className="flip-face flip-back w-full h-full flex flex-col bg-slate-900 text-white rounded-lg border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] overflow-hidden absolute inset-0">
        
        {/* Header Strip */}
        <div className="bg-emerald-600 px-2 py-1 flex justify-between items-center shadow-md">
          <div className="font-black text-sm uppercase tracking-wider text-white drop-shadow-md truncate w-3/4">{p.name}</div>
          <div className="font-black text-xs bg-black/40 px-1.5 py-0.5 rounded text-yellow-300 shadow-inner">{p.pos}</div>
        </div>

        {/* Info Grid */}
        <div className="flex-1 p-2 flex flex-col justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
          
          <div className="flex items-center gap-2 mb-2 border-b border-emerald-500/30 pb-1">
            <div className="text-2xl drop-shadow-md">{team.flag}</div>
            <div className="text-xs font-black text-slate-200 uppercase leading-tight tracking-wider">
              {team.country}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[10px]">
            <div className="col-span-2">
              <div className="text-emerald-400 font-bold uppercase text-[8px] tracking-wider mb-0.5">Club Actual</div>
              <div className="bg-black/50 px-1.5 py-1 rounded border border-slate-700/50 font-bold text-slate-100 truncate shadow-inner">
                <i className="fas fa-shield-alt text-slate-400 mr-1.5"></i>
                {p.club || 'Desconocido'}
              </div>
            </div>
            <div>
              <div className="text-emerald-400 font-bold uppercase text-[8px] tracking-wider mb-0.5">Pie Dom.</div>
              <div className="bg-black/50 px-1.5 py-1 rounded border border-slate-700/50 font-bold text-slate-100 shadow-inner">
                <i className="fas fa-shoe-prints text-slate-400 mr-1.5"></i>
                {p.foot || 'Diestro'}
              </div>
            </div>
            <div>
              <div className="text-emerald-400 font-bold uppercase text-[8px] tracking-wider mb-0.5">Edad</div>
              <div className="bg-black/50 px-1.5 py-1 rounded border border-slate-700/50 font-bold text-slate-100 shadow-inner">
                <i className="fas fa-birthday-cake text-slate-400 mr-1.5"></i>
                {p.age || 25}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleToggle} 
          className={`w-full py-2 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border-t border-white/10 ${
            isOwned ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-[0_-5px_15px_rgba(16,185,129,0.2)]'
          }`}
        >
          {isOwned ? 'Descartar' : 'Reclamar Ficha'}
        </button>
      </div>
    </div>
  );
}
