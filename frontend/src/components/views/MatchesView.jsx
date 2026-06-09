import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { albumGroups } from '../../data';

// Helper to get group/phase badge styling
const getGroupBadgeColor = (groupName, phase) => {
  if (phase === 'round32') return 'bg-slate-800/60 text-slate-300 border-slate-500/40 shadow-[0_0_10px_rgba(148,163,184,0.15)]';
  if (phase === 'round16') return 'bg-teal-950/60 text-teal-300 border-teal-500/40 shadow-[0_0_10px_rgba(20,184,166,0.15)]';
  if (phase === 'quarter') return 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.15)]';
  if (phase === 'semi') return 'bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.15)]';
  if (phase === 'final') {
    if (groupName === 'Final') {
      return 'bg-yellow-950/70 text-yellow-300 border-yellow-400/60 shadow-[0_0_15px_rgba(234,179,8,0.3)] font-black uppercase tracking-wider';
    }
    return 'bg-orange-950/60 text-orange-300 border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.15)]';
  }

  const mapping = {
    'Grupo A': 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
    'Grupo B': 'bg-blue-950/60 text-blue-300 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.15)]',
    'Grupo C': 'bg-red-950/60 text-red-300 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.15)]',
    'Grupo D': 'bg-orange-950/60 text-orange-300 border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.15)]',
    'Grupo E': 'bg-purple-950/60 text-purple-300 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.15)]',
    'Grupo F': 'bg-pink-950/60 text-pink-300 border-pink-500/40 shadow-[0_0_10px_rgba(236,72,153,0.15)]',
    'Grupo G': 'bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.15)]',
    'Grupo H': 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.15)]',
    'Grupo I': 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.15)]',
    'Grupo J': 'bg-teal-950/60 text-teal-300 border-teal-500/40 shadow-[0_0_10px_rgba(20,184,166,0.15)]',
    'Grupo K': 'bg-violet-950/60 text-violet-300 border-violet-500/40 shadow-[0_0_10px_rgba(139,92,246,0.15)]',
    'Grupo L': 'bg-rose-950/60 text-rose-300 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.15)]',
  };
  return mapping[groupName] || 'bg-slate-900/40 text-slate-300 border-slate-500/30';
};

// Helper to get card container styling (subtle borders and glows)
const getGroupCardStyle = (groupName, phase) => {
  const base = 'glass-panel p-4 animate-slide-up border transition-all duration-300 ';
  if (phase === 'round32') return base + 'border-slate-500/20 hover:border-slate-500/50 hover:shadow-[0_0_15px_rgba(148,163,184,0.1)]';
  if (phase === 'round16') return base + 'border-teal-500/20 hover:border-teal-500/50 hover:shadow-[0_0_15px_rgba(20,184,166,0.1)]';
  if (phase === 'quarter') return base + 'border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]';
  if (phase === 'semi') return base + 'border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]';
  if (phase === 'final') {
    if (groupName === 'Final') {
      return base + 'border-yellow-400/40 hover:border-yellow-400/70 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] bg-gradient-to-b from-slate-950/80 to-yellow-950/10';
    }
    return base + 'border-orange-500/20 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)]';
  }

  const mapping = {
    'Grupo A': 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    'Grupo B': 'border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]',
    'Grupo C': 'border-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]',
    'Grupo D': 'border-orange-500/20 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)]',
    'Grupo E': 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]',
    'Grupo F': 'border-pink-500/20 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]',
    'Grupo G': 'border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    'Grupo H': 'border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]',
    'Grupo I': 'border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]',
    'Grupo J': 'border-teal-500/20 hover:border-teal-500/50 hover:shadow-[0_0_15px_rgba(20,184,166,0.1)]',
    'Grupo K': 'border-violet-500/20 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    'Grupo L': 'border-rose-500/20 hover:border-rose-500/50 hover:shadow-[0_0_15px_rgba(244,63,94,0.1)]',
  };
  return base + (mapping[groupName] || 'border-white/10 hover:border-white/20');
};

export default function MatchesView() {
  const { matchesData, setMatchesData, currentMatchFilter, setCurrentMatchFilter, openModal, closeModal, showToast } = useAppContext();
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Filter matches based on stage and selected group
  const filtered = currentMatchFilter === 'all'
    ? matchesData
    : currentMatchFilter === 'group' && selectedGroup
      ? matchesData.filter(m => m.phase === 'group' && m.group === selectedGroup)
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
    const badgeColorClass = getGroupBadgeColor(match.group, match.phase);

    // Dynamic gradient style for the modal content based on match group/phase
    let modalGradient = 'from-blue-950/80 to-slate-900/90 border-blue-500/30';
    if (match.phase === 'group') {
      const mapping = {
        'Grupo A': 'from-emerald-950/90 to-slate-900/95 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]',
        'Grupo B': 'from-blue-950/90 to-slate-900/95 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]',
        'Grupo C': 'from-red-950/90 to-slate-900/95 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]',
        'Grupo D': 'from-orange-950/90 to-slate-900/95 border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.15)]',
        'Grupo E': 'from-purple-950/90 to-slate-900/95 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]',
        'Grupo F': 'from-pink-950/90 to-slate-900/95 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.15)]',
        'Grupo G': 'from-amber-950/90 to-slate-900/95 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        'Grupo H': 'from-cyan-950/90 to-slate-900/95 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]',
        'Grupo I': 'from-indigo-950/90 to-slate-900/95 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]',
        'Grupo J': 'from-teal-950/90 to-slate-900/95 border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.15)]',
        'Grupo K': 'from-violet-950/90 to-slate-900/95 border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]',
        'Grupo L': 'from-rose-950/90 to-slate-900/95 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]',
      };
      modalGradient = mapping[match.group] || modalGradient;
    } else if (match.phase === 'round32') {
      modalGradient = 'from-slate-900/90 to-slate-950/95 border-slate-500/30 shadow-[0_0_20px_rgba(148,163,184,0.15)]';
    } else if (match.phase === 'round16') {
      modalGradient = 'from-teal-950/90 to-slate-900/95 border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.15)]';
    } else if (match.phase === 'quarter') {
      modalGradient = 'from-indigo-950/90 to-slate-900/95 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]';
    } else if (match.phase === 'semi') {
      modalGradient = 'from-amber-950/90 to-slate-900/95 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]';
    } else if (match.phase === 'final') {
      if (match.group === 'Final') {
        modalGradient = 'from-yellow-950/90 to-slate-950/95 border-yellow-400/50 shadow-[0_0_25px_rgba(234,179,8,0.3)]';
      } else {
        modalGradient = 'from-orange-950/90 to-slate-900/95 border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.15)]';
      }
    }

    openModal(`⚽ ${match.team1} vs ${match.team2}`, `
      <div class="space-y-4 text-white bg-gradient-to-b ${modalGradient} p-4 rounded-xl border">
        <div class="text-center py-2">
          <div class="text-6xl mb-3 drop-shadow-md select-none">${match.flag1} vs ${match.flag2}</div>
          <div class="font-black text-xl tracking-tight text-white drop-shadow-md">${match.team1} <span class="text-white/40 font-normal">vs</span> ${match.team2}</div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white/5 p-3 rounded-lg border border-white/10">
            <div class="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">Fecha</div>
            <div class="font-bold text-white text-sm">${match.date}</div>
          </div>
          <div class="bg-white/5 p-3 rounded-lg border border-white/10">
            <div class="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">Hora</div>
            <div class="font-bold text-green-400 text-sm drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">${match.time}</div>
          </div>
          <div class="bg-white/5 p-3 rounded-lg border border-white/10 col-span-2">
            <div class="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">Estadio</div>
            <div class="font-bold text-white text-sm"><i class="fas fa-map-marker-alt text-red-400 mr-1.5"></i>${match.stadium}</div>
          </div>
          <div class="bg-white/5 p-3 rounded-lg border border-white/10 col-span-2 flex items-center justify-between">
            <div>
              <div class="text-xs text-gray-400 font-bold uppercase tracking-wider">Etapa</div>
              <div class="font-black text-white text-sm mt-0.5">${match.group}</div>
            </div>
            <span class="px-2.5 py-1 rounded text-xs font-bold border ${badgeColorClass}">${match.phase === 'group' ? 'Fase de Grupos' : 'Playoffs'}</span>
          </div>
        </div>
        <button id="closeMatchModal" class="btn-primary w-full py-2.5 rounded-lg font-bold text-sm shadow-md transition hover:scale-[1.02]">Cerrar</button>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('closeMatchModal').onclick = closeModal;
    }, 100);
  };

  const handleTabChange = (filter) => {
    setCurrentMatchFilter(filter);
    setSelectedGroup(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-black heading text-white drop-shadow-md">Calendario de Partidos</h2>
        <p className="text-gray-300 font-bold text-sm mt-1">Sigue el calendario completo de los 104 partidos del Mundial 2026</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide border-b border-white/10">
        <button onClick={() => handleTabChange('all')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'all' ? 'active' : ''}`}>Todos</button>
        <button onClick={() => handleTabChange('group')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'group' ? 'active' : ''}`}>Grupos</button>
        <button onClick={() => handleTabChange('round32')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'round32' ? 'active' : ''}`}>Dieciseisavos</button>
        <button onClick={() => handleTabChange('round16')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'round16' ? 'active' : ''}`}>Octavos</button>
        <button onClick={() => handleTabChange('quarter')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'quarter' ? 'active' : ''}`}>Cuartos</button>
        <button onClick={() => handleTabChange('semi')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'semi' ? 'active' : ''}`}>Semifinales</button>
        <button onClick={() => handleTabChange('final')} className={`tab-btn whitespace-nowrap ${currentMatchFilter === 'final' ? 'active' : ''}`}>Final</button>
      </div>

      {currentMatchFilter === 'group' && !selectedGroup ? (
        // Interactive Groups Cards view
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albumGroups.map((g) => {
            const badgeColorClass = getGroupBadgeColor(g.groupName, 'group');
            const cardStyleClass = getGroupCardStyle(g.groupName, 'group');
            
            return (
              <div key={g.groupName} className={cardStyleClass}>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                  <h3 className="text-lg font-black text-white">{g.groupName}</h3>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${badgeColorClass}`}>Mundial 2026</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {g.teams.map((t) => (
                    <div key={t.country} className="flex items-center gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5 hover:bg-white/10 transition">
                      <span className="text-2xl select-none">{t.flag}</span>
                      <span className="text-xs font-bold text-gray-200 truncate" title={t.country}>{t.country}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedGroup(g.groupName)} 
                  className="w-full py-2.5 rounded-lg font-bold text-sm btn-primary shadow-md hover:scale-[1.02] transition"
                >
                  <i className="fas fa-futbol mr-2"></i> Ver Enfrentamientos
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        // Standard Matches view
        <div>
          {currentMatchFilter === 'group' && selectedGroup && (
            <div className="flex items-center justify-between mb-6 animate-fade bg-white/5 p-3 rounded-lg border border-white/10">
              <button 
                onClick={() => setSelectedGroup(null)} 
                className="btn-outline px-4 py-2 rounded-lg font-bold text-sm bg-black/25 text-white border-white/15 hover:bg-white/10 transition"
              >
                <i className="fas fa-arrow-left mr-2"></i> Volver a Grupos
              </button>
              <h3 className="text-xl font-black text-white drop-shadow-sm">{selectedGroup} — Enfrentamientos</h3>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-16 glass-panel">
                <i className="fas fa-calendar-times text-5xl mb-3 opacity-30"></i><br/>
                <span className="font-bold text-lg">No hay partidos en esta fase</span>
              </div>
            ) : filtered.map(m => {
              const badgeColorClass = getGroupBadgeColor(m.group, m.phase);
              const cardStyleClass = getGroupCardStyle(m.group, m.phase);

              return (
                <div key={m.id} className={cardStyleClass}>
                  <div className="text-xs font-bold mb-3.5 flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded border transition-all duration-300 ${badgeColorClass}`}>{m.group}</span>
                    <span className="text-gray-400 truncate ml-2 text-right max-w-[150px] font-medium" title={m.stadium}>{m.stadium}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center flex-1 min-w-0">
                      <div className="text-4xl mb-1.5 drop-shadow-md select-none">{m.flag1}</div>
                      <div className="font-bold text-sm truncate text-white px-1" title={m.team1}>{m.team1}</div>
                    </div>
                    <div className="text-center px-4 shrink-0">
                      <div className="text-xs font-black text-white/30 tracking-widest border border-white/5 px-2 py-0.5 rounded-full bg-white/5">VS</div>
                    </div>
                    <div className="text-center flex-1 min-w-0">
                      <div className="text-4xl mb-1.5 drop-shadow-md select-none">{m.flag2}</div>
                      <div className="font-bold text-sm truncate text-white px-1" title={m.team2}>{m.team2}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-white/10 pt-3">
                    <div className="text-gray-300 font-medium"><i className="far fa-calendar mr-1.5 text-blue-400"></i> {m.date}</div>
                    <div className="font-bold text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.6)]"><i className="far fa-clock mr-1.5"></i> {m.time}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3.5">
                    <button onClick={() => toggleRemind(m.id)} className={`py-2 rounded-lg font-bold text-xs transition duration-300 ${m.reminded ? 'btn-green shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'btn-primary'}`}>
                      <i className={`fas fa-${m.reminded ? 'bell' : 'bell-slash'} mr-1.5`}></i> {m.reminded ? 'Activo' : 'Recordar'}
                    </button>
                    <button onClick={() => showMatchDetails(m)} className="py-2 rounded-lg font-bold text-xs btn-outline bg-black/25 text-white border-white/15 hover:bg-white/10 transition duration-300">
                      <i className="fas fa-info-circle mr-1.5"></i> Detalles
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
