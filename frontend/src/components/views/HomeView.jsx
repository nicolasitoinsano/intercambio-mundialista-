import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StickerCard from '../shared/StickerCard';
import { albumGroups } from '../../data';

export default function HomeView() {
  const { setCurrentView, ownedStickers, pendingTrades, chatContacts } = useAppContext();

  const ownedCount = ownedStickers.size;
  const totalStickers = 144;
  const missingCount = totalStickers - ownedCount;
  const pendingCount = pendingTrades.filter(t => t.status === 'pending').length;
  const percent = Math.round((ownedCount / totalStickers) * 100);

  // Get featured stickers (first 3 from first team in first two groups)
  let featuredStickers = [];
  albumGroups.slice(0, 2).forEach(g => {
    g.teams.slice(0, 1).forEach(t => {
      t.players.slice(0, 3).forEach(p => {
        featuredStickers.push({ p, team: t });
      });
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade text-slate-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Bienvenido al <span style={{ color: 'var(--red)', textShadow: '0 0 10px white' }}>Mundial 2026</span>
        </h1>
        <p className="text-slate-800 font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">Completa tu álbum e intercambia fichas</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-5 text-center animate-bounce-in" style={{ animationDelay: '0.1s' }}>
          <div className="text-4xl font-black" style={{ color: 'var(--green)', textShadow: '0 2px 10px rgba(0,166,81,0.4)' }}>{ownedCount}</div>
          <div className="text-sm text-gray-300 mt-1 uppercase tracking-wider font-bold">Obtenidas</div>
        </div>
        <div className="glass-panel p-5 text-center animate-bounce-in" style={{ animationDelay: '0.15s' }}>
          <div className="text-4xl font-black" style={{ color: 'var(--red)', textShadow: '0 2px 10px rgba(228,0,43,0.4)' }}>{missingCount}</div>
          <div className="text-sm text-gray-300 mt-1 uppercase tracking-wider font-bold">Faltantes</div>
        </div>
        <div className="glass-panel p-5 text-center animate-bounce-in relative" style={{ animationDelay: '0.2s' }}>
          <div className="text-4xl font-black" style={{ color: '#f59e0b', textShadow: '0 2px 10px rgba(245,158,11,0.4)' }}>{pendingCount}</div>
          <div className="text-sm text-gray-300 mt-1 uppercase tracking-wider font-bold">Pendientes</div>
        </div>
        <div className="glass-panel p-5 text-center animate-bounce-in" style={{ animationDelay: '0.25s' }}>
          <div className="text-4xl font-black" style={{ color: 'var(--blue)', textShadow: '0 2px 10px rgba(0,61,165,0.4)' }}>{chatContacts.length * 12}</div>
          <div className="text-sm text-gray-300 mt-1 uppercase tracking-wider font-bold">Amigos</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <button onClick={() => setCurrentView('album')} className="glass-panel p-5 text-left group animate-bounce-in block w-full hover:bg-white/20" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xl text-green-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(0,166,81,0.3)]">
              <i className="fas fa-book-open"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Mi Álbum</h3>
              <p className="text-sm text-gray-300">144 fichas</p>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mt-4">
            <div className="progress-bar h-2 rounded-full transition-all shadow-[0_0_10px_rgba(0,166,81,0.5)]" style={{ width: `${percent}%` }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2 font-medium">{percent}% completado</p>
        </button>

        <button onClick={() => setCurrentView('pending')} className="glass-panel p-5 text-left group animate-bounce-in relative block w-full hover:bg-white/20" style={{ animationDelay: '0.15s' }}>
          {pendingCount > 0 && (
            <div className="absolute top-4 right-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-xl text-orange-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <i className="fas fa-clock"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Pendientes</h3>
              <p className="text-sm text-gray-300">{pendingCount > 0 ? `${pendingCount} pendientes` : 'Sin pendientes'}</p>
            </div>
          </div>
          <p className="text-xs text-blue-400 mt-2 font-medium group-hover:translate-x-1 transition-transform inline-block"><i className="fas fa-arrow-right"></i> Gestionar intercambios</p>
        </button>

        <button onClick={() => setCurrentView('exchange')} className="glass-panel p-5 text-left group animate-bounce-in block w-full hover:bg-white/20" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-xl text-red-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(228,0,43,0.3)]">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Intercambiar</h3>
              <p className="text-sm text-gray-300">Ofertas disponibles</p>
            </div>
          </div>
          <p className="text-xs text-blue-400 mt-2 font-medium group-hover:translate-x-1 transition-transform inline-block"><i className="fas fa-arrow-right"></i> Ver ofertas</p>
        </button>

        <button onClick={() => setCurrentView('venues')} className="glass-panel p-5 text-left group animate-bounce-in block w-full hover:bg-white/20" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xl text-blue-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(0,61,165,0.3)]">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Sedes</h3>
              <p className="text-sm text-gray-300">16 estadios</p>
            </div>
          </div>
          <p className="text-xs text-blue-400 mt-2 font-medium group-hover:translate-x-1 transition-transform inline-block"><i className="fas fa-arrow-right"></i> Explorar</p>
        </button>

        <button onClick={() => setCurrentView('matches')} className="glass-panel p-5 text-left group animate-bounce-in block w-full hover:bg-white/20" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xl text-green-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(0,166,81,0.3)]">
              <i className="fas fa-futbol"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Partidos</h3>
              <p className="text-sm text-gray-300">Calendario</p>
            </div>
          </div>
          <p className="text-xs text-blue-400 mt-2 font-medium group-hover:translate-x-1 transition-transform inline-block"><i className="fas fa-arrow-right"></i> Ver calendario</p>
        </button>

        <button onClick={() => setCurrentView('profile')} className="glass-panel p-5 text-left group animate-bounce-in block w-full hover:bg-white/20" style={{ animationDelay: '0.35s' }}>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xl text-purple-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <i className="fas fa-user-circle"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Perfil</h3>
              <p className="text-sm text-gray-300">Estadísticas</p>
            </div>
          </div>
          <p className="text-xs text-purple-400 mt-2 font-medium group-hover:translate-x-1 transition-transform inline-block"><i className="fas fa-arrow-right"></i> Ver perfil</p>
        </button>
      </div>

      <div className="glass-panel p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
          <i className="fas fa-fire text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]"></i> Fichas Destacadas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {featuredStickers.map(({ p, team }) => (
            <StickerCard key={p.id} p={p} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}
