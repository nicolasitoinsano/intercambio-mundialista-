import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function PendingView() {
  const { currentPendingFilter, setCurrentPendingFilter, pendingTrades, setPendingTrades, openModal, closeModal, showToast, chatContacts, setCurrentView, setCurrentChatPartner } = useAppContext();

  let filtered = pendingTrades;
  if (currentPendingFilter !== 'all') {
    if (currentPendingFilter === 'sent') filtered = pendingTrades.filter(t => t.direction === 'sent');
    else filtered = pendingTrades.filter(t => t.status === currentPendingFilter);
  }

  const counts = {
    pending: pendingTrades.filter(t => t.status === 'pending').length,
    accepted: pendingTrades.filter(t => t.status === 'accepted').length,
    rejected: pendingTrades.filter(t => t.status === 'rejected').length,
    completed: pendingTrades.filter(t => t.status === 'completed').length
  };

  const updateTradeStatus = (id, newStatus) => {
    setPendingTrades(prev => prev.map(t => t.id === id ? { ...t, status: newStatus, updatedAt: 'ahora' } : t));
    showToast(`Estado actualizado: ${newStatus}`, 'success');
  };

  const acceptTrade = (id) => {
    const trade = pendingTrades.find(t => t.id === id);
    if (!trade) return;
    openModal('✅ Aceptar Intercambio', `
      <div class="text-center space-y-3 text-white">
        <div class="w-16 h-16 mx-auto rounded-full bg-green-900/40 border border-green-500/30 flex items-center justify-center">
          <i class="fas fa-check text-3xl text-green-400"></i>
        </div>
        <h3 class="text-lg font-bold drop-shadow-md">¿Aceptar este intercambio?</h3>
        <p class="text-sm text-gray-300">
          <strong class="text-white">${trade.from}</strong> ofrece <strong class="text-blue-400">${trade.gives}</strong><br>
          A cambio de <strong class="text-red-400">${trade.wants}</strong>
        </p>
        <div class="bg-yellow-900/30 p-3 rounded-lg border-l-4 border-yellow-500/50 text-left">
          <div class="text-xs text-yellow-400 font-medium"><i class="fas fa-info-circle mr-1"></i> Importante:</div>
          <div class="text-xs text-yellow-200">Al aceptar, ambas fichas se marcarán como intercambiadas.</div>
        </div>
        <div class="flex gap-2">
          <button id="cancelAcceptBtn" class="btn-outline flex-1 py-2 rounded-lg font-bold text-sm bg-black/20 border-white/20 text-white hover:bg-white/10">Cancelar</button>
          <button id="confirmAcceptBtn" class="btn-green flex-1 py-2 rounded-lg font-bold text-sm shadow-md">Aceptar</button>
        </div>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('cancelAcceptBtn').onclick = closeModal;
      document.getElementById('confirmAcceptBtn').onclick = () => {
        updateTradeStatus(id, 'accepted');
        closeModal();
      };
    }, 100);
  };

  const rejectTrade = (id) => {
    const trade = pendingTrades.find(t => t.id === id);
    if (!trade) return;
    openModal('❌ Rechazar Intercambio', `
      <div class="text-center space-y-3 text-white">
        <div class="w-16 h-16 mx-auto rounded-full bg-red-900/40 border border-red-500/30 flex items-center justify-center">
          <i class="fas fa-times text-3xl text-red-400"></i>
        </div>
        <h3 class="text-lg font-bold drop-shadow-md">¿Rechazar propuesta?</h3>
        <p class="text-sm text-gray-300">Rechazarás la propuesta de <strong class="text-white">${trade.from}</strong></p>
        <textarea id="rejectReason" placeholder="Motivo (opcional)" class="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm h-16 resize-none text-white placeholder-gray-400 focus:outline-none focus:border-red-400"></textarea>
        <div class="flex gap-2">
          <button id="cancelRejectBtn" class="btn-outline flex-1 py-2 rounded-lg font-bold text-sm bg-black/20 border-white/20 text-white hover:bg-white/10">Cancelar</button>
          <button id="confirmRejectBtn" class="btn-red flex-1 py-2 rounded-lg font-bold text-sm shadow-md">Rechazar</button>
        </div>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('cancelRejectBtn').onclick = closeModal;
      document.getElementById('confirmRejectBtn').onclick = () => {
        updateTradeStatus(id, 'rejected');
        closeModal();
      };
    }, 100);
  };

  const cancelTrade = (id) => {
    const trade = pendingTrades.find(t => t.id === id);
    if (!trade) return;
    openModal('↩️ Cancelar Propuesta', `
      <div class="text-center space-y-3 text-white">
        <div class="w-16 h-16 mx-auto rounded-full bg-yellow-900/40 border border-yellow-500/30 flex items-center justify-center">
          <i class="fas fa-undo text-3xl text-yellow-400"></i>
        </div>
        <h3 class="text-lg font-bold drop-shadow-md">¿Cancelar propuesta?</h3>
        <p class="text-sm text-gray-300">Tu propuesta a <strong class="text-white">${trade.to}</strong> será eliminada</p>
        <div class="flex gap-2">
          <button id="cancelCancelBtn" class="btn-outline flex-1 py-2 rounded-lg font-bold text-sm bg-black/20 border-white/20 text-white hover:bg-white/10">No</button>
          <button id="confirmCancelBtn" class="btn-red flex-1 py-2 rounded-lg font-bold text-sm shadow-md">Sí, cancelar</button>
        </div>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('cancelCancelBtn').onclick = closeModal;
      document.getElementById('confirmCancelBtn').onclick = () => {
        updateTradeStatus(id, 'rejected');
        closeModal();
      };
    }, 100);
  };

  const completeTrade = (id) => {
    const trade = pendingTrades.find(t => t.id === id);
    if (!trade) return;
    openModal('🏆 Completar Intercambio', `
      <div class="text-center space-y-3 text-white">
        <div class="w-16 h-16 mx-auto rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center">
          <i class="fas fa-trophy text-3xl text-blue-400"></i>
        </div>
        <h3 class="text-lg font-bold drop-shadow-md">¡Intercambio Completado!</h3>
        <p class="text-sm text-gray-300">Marca este intercambio como completado</p>
        <div class="bg-blue-900/30 p-3 rounded-lg border-l-4 border-blue-500/50">
          <div class="text-sm font-bold text-blue-300 mb-1">Resumen:</div>
          <div class="text-xs text-blue-100">${trade.gives} ↔ ${trade.wants}</div>
        </div>
        <div class="flex gap-2">
          <button id="cancelCompleteBtn" class="btn-outline flex-1 py-2 rounded-lg font-bold text-sm bg-black/20 border-white/20 text-white hover:bg-white/10">Cancelar</button>
          <button id="confirmCompleteBtn" class="btn-primary flex-1 py-2 rounded-lg font-bold text-sm shadow-md">Completar</button>
        </div>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('cancelCompleteBtn').onclick = closeModal;
      document.getElementById('confirmCompleteBtn').onclick = () => {
        updateTradeStatus(id, 'completed');
        closeModal();
      };
    }, 100);
  };

  const viewTradeDetails = (id) => {
    const trade = pendingTrades.find(t => t.id === id);
    if (!trade) return;
    const statusIcons = { pending: 'fa-hourglass-half text-yellow-600', accepted: 'fa-check-circle text-green-600', rejected: 'fa-times-circle text-red-600', completed: 'fa-trophy text-blue-600' };
    const statusLabels = { pending: 'Pendiente', accepted: 'Aceptado', rejected: 'Rechazado', completed: 'Completado' };

    openModal(' Detalles', `
      <div class="space-y-3 text-white">
        <div class="flex items-center gap-3 pb-3 border-b border-white/10">
          <div class="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center font-bold text-white shadow-md">${trade.fromAvatar}</div>
          <div class="flex-1">
            <div class="font-bold text-sm">${trade.from} → ${trade.to}</div>
            <div class="text-xs text-gray-400">Creado: ${trade.createdAt}</div>
          </div>
          <i class="fas ${statusIcons[trade.status]} text-xl drop-shadow-sm"></i>
        </div>
        <div class="bg-black/30 border border-white/10 p-3 rounded-lg">
          <div class="text-xs text-gray-400 font-medium mb-1">Estado:</div>
          <div class="font-bold">${statusLabels[trade.status]}</div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
            <div class="text-xs text-blue-300 font-bold mb-1">OFRECE</div>
            <div class="font-bold text-sm text-white">${trade.gives}</div>
          </div>
          <div class="bg-red-900/30 p-3 rounded-lg border border-red-500/30">
            <div class="text-xs text-red-300 font-bold mb-1">BUSCA</div>
            <div class="font-bold text-sm text-white">${trade.wants}</div>
          </div>
        </div>
        ${trade.message ? `
        <div class="bg-black/30 border border-white/10 p-3 rounded-lg">
          <div class="text-xs text-gray-400 font-medium mb-1">Mensaje:</div>
          <div class="text-sm text-gray-300 italic">"${trade.message}"</div>
        </div>
        ` : ''}
        <div class="bg-yellow-900/30 border border-yellow-500/30 p-3 rounded-lg">
          <div class="text-xs text-yellow-300 font-medium mb-1">Dirección:</div>
          <div class="text-sm text-yellow-100">${trade.direction === 'sent' ? '📤 Enviada por ti' : '📥 Recibida'}</div>
        </div>
        <button id="closeDetailsBtn" class="btn-primary w-full py-2 rounded-lg font-bold text-sm shadow-md">Cerrar</button>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('closeDetailsBtn').onclick = closeModal;
    }, 100);
  };

  const chatAboutTrade = (id) => {
    const trade = pendingTrades.find(t => t.id === id);
    if (!trade) return;
    const partnerName = trade.direction === 'sent' ? trade.to : trade.from;
    const contactIdx = chatContacts.findIndex(c => c.name === partnerName);
    if (contactIdx >= 0) {
      setCurrentChatPartner(contactIdx);
      setCurrentView('chat');
    } else {
      showToast('Usuario no encontrado', 'warning');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-black heading mb-6 text-white drop-shadow-md">Tus Intercambios</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-black text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]">{counts.pending}</div>
          <div className="text-xs font-bold text-gray-400 uppercase">Pendientes</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-black text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">{counts.accepted}</div>
          <div className="text-xs font-bold text-gray-400 uppercase">Aceptados</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-black text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">{counts.rejected}</div>
          <div className="text-xs font-bold text-gray-400 uppercase">Rechazados</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-black text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]">{counts.completed}</div>
          <div className="text-xs font-bold text-gray-400 uppercase">Completados</div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button onClick={() => setCurrentPendingFilter('all')} className={`tab-btn whitespace-nowrap ${currentPendingFilter === 'all' ? 'active' : ''}`}>Todos</button>
        <button onClick={() => setCurrentPendingFilter('pending')} className={`tab-btn whitespace-nowrap ${currentPendingFilter === 'pending' ? 'active' : ''}`}>Pendientes</button>
        <button onClick={() => setCurrentPendingFilter('sent')} className={`tab-btn whitespace-nowrap ${currentPendingFilter === 'sent' ? 'active' : ''}`}>Enviados</button>
        <button onClick={() => setCurrentPendingFilter('accepted')} className={`tab-btn whitespace-nowrap ${currentPendingFilter === 'accepted' ? 'active' : ''}`}>Aceptados</button>
        <button onClick={() => setCurrentPendingFilter('completed')} className={`tab-btn whitespace-nowrap ${currentPendingFilter === 'completed' ? 'active' : ''}`}>Completados</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400 glass-panel">
            <i className="fas fa-box-open text-5xl mb-4 opacity-30"></i>
            <p>No hay intercambios para mostrar.</p>
          </div>
        ) : filtered.map(t => {
          const statusIcons = { pending: 'fa-hourglass-half', accepted: 'fa-check-circle', rejected: 'fa-times-circle', completed: 'fa-trophy' };
          const statusLabels = { pending: 'Pendiente', accepted: 'Aceptado', rejected: 'Rechazado', completed: 'Completado' };
          const isReceived = t.direction === 'received';
          const isPending = t.status === 'pending';
          const isAccepted = t.status === 'accepted';

          return (
            <div key={t.id} className={`glass-panel status-${t.status} p-4 animate-slide-up border ${isPending ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : isAccepted ? 'border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.2)]' : isRejected ? 'border-red-500/50 opacity-70' : 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'}`}>
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center font-bold text-white shadow-md">
                      {isReceived ? t.fromAvatar : t.toAvatar}
                    </div>
                    {isPending && isReceived && <div className="notification-dot"></div>}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">
                      {isReceived ? `${t.from} te propone` : `Propuesta a ${t.to}`}
                    </div>
                    <div className="text-xs text-gray-400">{t.createdAt} • {t.updatedAt}</div>
                  </div>
                </div>
                <span className={`status-badge status-${t.status}`}>
                  <i className={`fas ${statusIcons[t.status]}`}></i> {statusLabels[t.status]}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-500/30">
                  <div className="text-xs text-blue-300 font-bold uppercase tracking-wide mb-1">
                    <i className="fas fa-gift mr-1"></i> {isReceived ? 'Te ofrece' : 'Ofreces'}
                  </div>
                  <div className="font-bold text-white">{t.gives}</div>
                </div>
                <div className="bg-red-900/30 rounded-lg p-3 border border-red-500/30">
                  <div className="text-xs text-red-300 font-bold uppercase tracking-wide mb-1">
                    <i className="fas fa-search mr-1"></i> {isReceived ? 'Busca' : 'Buscas'}
                  </div>
                  <div className="font-bold text-white">{t.wants}</div>
                </div>
              </div>

              {t.message && (
                <div className="bg-black/30 rounded-lg p-3 mb-3 border-l-4 border-white/40">
                  <div className="text-xs text-gray-400 font-medium mb-1">
                    <i className="fas fa-comment-dots mr-1"></i> Mensaje:
                  </div>
                  <div className="text-sm text-gray-300 italic">"{t.message}"</div>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {isPending && isReceived && (
                  <>
                    <button onClick={() => acceptTrade(t.id)} className="btn-green flex-1 py-1.5 rounded-lg font-bold text-sm min-w-[110px]">
                      <i className="fas fa-check mr-1"></i> Aceptar
                    </button>
                    <button onClick={() => rejectTrade(t.id)} className="btn-red flex-1 py-1.5 rounded-lg font-bold text-sm min-w-[110px]">
                      <i className="fas fa-times mr-1"></i> Rechazar
                    </button>
                  </>
                )}
                {isPending && !isReceived && (
                  <button onClick={() => cancelTrade(t.id)} className="btn-red flex-1 py-1.5 rounded-lg font-bold text-sm">
                    <i className="fas fa-undo mr-1"></i> Cancelar
                  </button>
                )}
                {isAccepted && (
                  <button onClick={() => completeTrade(t.id)} className="btn-primary flex-1 py-1.5 rounded-lg font-bold text-sm">
                    <i className="fas fa-check-double mr-1"></i> Completar
                  </button>
                )}
                <button onClick={() => viewTradeDetails(t.id)} className="btn-outline px-3 py-1.5 rounded-lg text-sm bg-black/20 text-white border-white/20 hover:bg-white/10">
                  <i className="fas fa-eye mr-1"></i> Detalles
                </button>
                {isPending && (
                  <button onClick={() => chatAboutTrade(t.id)} className="btn-outline px-3 py-1.5 rounded-lg text-sm bg-black/20 text-white border-white/20 hover:bg-white/10">
                    <i className="fas fa-comment mr-1"></i> Chatear
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
