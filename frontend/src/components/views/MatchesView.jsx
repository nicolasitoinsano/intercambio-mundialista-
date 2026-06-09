import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function MatchesView() {
  const { matchesData, setMatchesData, currentMatchFilter, setCurrentMatchFilter, openModal, closeModal, showToast } = useAppContext();

  const filtered = currentMatchFilter === 'all' 
    ? matchesData 
    : matchesData.filter(m => m.phase === currentMatchFilter);

  const toggleRemind = (id) => {
    setMatchesData(prev => prev.map(m => {
      if (m.id === id) {
        const next = { ...m, reminded: !m.reminded };
        showToast(next.reminded ? `🔔 Recordatorio activado` : 'Recordatorio desactivado', 'success');
        return next;
      }
      return m;
    }));
  };

  const showMatchDetails = (match) => {
    openModal(`⚽ ${match.team1} vs ${match.team2}`, `
      <div class="space-y-3 text-white">
        <div class="text-center">
          <div class="text-5xl mb-2 drop-shadow-md">${match.flag1} vs ${match.flag2}</div>
          <div class="font-bold text-lg drop-shadow-sm">${match.team1} vs ${match.team2}</div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
            <div class="text-xs text-blue-300">Fecha</div>
            <div class="font-bold text-white">${match.date}</div>
          </div>
          <div class="bg-red-900/30 p-3 rounded-lg border border-red-500/30">
            <div class="text-xs text-red-300">Hora</div>
            <div class="font-bold text-white">${match.time}</div>
          </div>
          <div class="bg-green-900/30 p-3 rounded-lg border border-green-500/30">
            <div class="text-xs text-green-300">Estadio</div>
            <div class="font-bold text-white">${match.stadium}</div>
          </div>
          <div class="bg-yellow-900/30 p-3 rounded-lg border border-yellow-500/30">
            <div class="text-xs text-yellow-300">Fase</div>
            <div class="font-bold text-white">${match.group}</div>
          </div>
        </div>
        <button id="closeMatchModal" class="btn-primary w-full py-2 rounded-lg font-bold text-sm">Cerrar</button>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('closeMatchModal').onclick = closeModal;
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-black heading mb-6 text-white drop-shadow-md">Calendario de Partidos</h2>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button onClick={() => setCurrentMatchFilter('all')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'all' ? 'active' : ''}`}>Todos</button>
        <button onClick={() => setCurrentMatchFilter('group')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'group' ? 'active' : ''}`}>Fase de Grupos</button>
        <button onClick={() => setCurrentMatchFilter('round16')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'round16' ? 'active' : ''}`}>Octavos</button>
        <button onClick={() => setCurrentMatchFilter('quarter')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'quarter' ? 'active' : ''}`}>Cuartos</button>
        <button onClick={() => setCurrentMatchFilter('semi')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'semi' ? 'active' : ''}`}>Semifinales</button>
        <button onClick={() => setCurrentMatchFilter('final')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'final' ? 'active' : ''}`}>Final</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12 glass-panel">
            <i className="fas fa-calendar-times text-4xl mb-2 opacity-30"></i><br/>Sin partidos
          </div>
        ) : filtered.map(m => (
          <div key={m.id} className="glass-panel p-4 animate-slide-up">
            <div className="text-xs font-bold mb-3 flex justify-between">
              <span className="bg-blue-900/40 text-blue-300 px-2 py-1 rounded border border-blue-500/30">{m.group}</span>
              <span className="text-gray-400 truncate ml-2 text-right">{m.stadium}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-center flex-1">
                <div className="text-3xl mb-1 drop-shadow-md">{m.flag1}</div>
                <div className="font-bold text-sm truncate text-white">{m.team1}</div>
              </div>
              <div className="text-center px-3">
                <div className="text-xl font-black text-white/40 drop-shadow-sm">VS</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-3xl mb-1 drop-shadow-md">{m.flag2}</div>
                <div className="font-bold text-sm truncate text-white">{m.team2}</div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-white/10 pt-3">
              <div className="text-gray-300"><i className="far fa-calendar mr-1"></i> {m.date}</div>
              <div className="font-bold text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]"><i className="far fa-clock mr-1"></i> {m.time}</div>
            </div>
            <button onClick={() => toggleRemind(m.id)} className={`w-full mt-3 py-1.5 rounded-lg font-bold text-sm ${m.reminded ? 'btn-green' : 'btn-primary'}`}>
              <i className={`fas fa-${m.reminded ? 'bell' : 'bell-slash'} mr-1`}></i> {m.reminded ? 'Recordatorio activo' : 'Recordar'}
            </button>
            <button onClick={() => showMatchDetails(m)} className="w-full mt-2 py-1.5 rounded-lg font-bold text-sm btn-outline bg-black/20 text-white border-white/20 hover:bg-white/10">
              <i className="fas fa-info-circle mr-1"></i> Detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
