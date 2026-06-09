import React, { useState } from 'react';
import { albumGroups } from '../../data';
import StickerCard from '../shared/StickerCard';
import { useAppContext } from '../../context/AppContext';

export default function AlbumView() {
  const { ownedStickers } = useAppContext();
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const activeGroup = albumGroups[activeGroupIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black heading text-white drop-shadow-md">Mi Álbum</h2>
        <div className="glass-panel px-4 py-2 font-bold text-sm shadow-[0_0_15px_rgba(0,166,81,0.2)]">
          <span style={{ color: 'var(--green)' }}>{ownedStickers.size}</span> <span className="text-gray-300">/ 144</span>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide">
        {albumGroups.map((g, idx) => {
          let gOwned = 0;
          let gTotal = 0;
          g.teams.forEach(t => {
            gTotal += t.players.length;
            t.players.forEach(p => {
              if (ownedStickers.has(p.id)) gOwned++;
            });
          });
          const isComplete = gOwned === gTotal;

          return (
            <button 
              key={idx}
              onClick={() => setActiveGroupIndex(idx)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-bold transition-all shadow-md backdrop-blur-sm
                ${activeGroupIndex === idx ? 'bg-white/30 text-white border-white/50' : 'bg-black/30 text-gray-300 border-white/10 hover:bg-white/10'}`}
            >
              {g.groupName} {isComplete && <i className="fas fa-check-circle text-green-400 ml-1"></i>}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {activeGroup.teams.map((team, tIdx) => {
          const tOwned = team.players.filter(p => ownedStickers.has(p.id)).length;
          return (
            <div key={tIdx} className="glass-panel p-6 mb-6 animate-fade" style={{ animationDelay: `${tIdx * 0.1}s` }}>
              <div className="flex justify-between items-end mb-4 border-b border-white/20 pb-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl drop-shadow-md">{team.flag}</div>
                  <h3 className="text-2xl font-black text-white drop-shadow-sm">{team.country}</h3>
                </div>
                <div className="text-sm font-bold text-gray-400">
                  <span className={tOwned === team.players.length ? 'text-green-400' : 'text-white'}>{tOwned}</span> / {team.players.length}
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {team.players.map(p => (
                  <StickerCard key={p.id} p={p} team={team} showTeam={false} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
