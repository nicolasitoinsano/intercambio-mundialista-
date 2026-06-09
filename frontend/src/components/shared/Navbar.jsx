import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function Navbar() {
  const { currentView, setCurrentView, currentUser, pendingTrades, doLogout, chatMessages, chatContacts } = useAppContext();

  const pendingCount = pendingTrades.filter(t => t.status === 'pending').length;
  const totalUnreadChat = chatContacts.reduce((sum, c) => sum + c.unread, 0);

  const navItems = [
    { id: 'home', icon: 'fa-home', label: 'Inicio' },
    { id: 'album', icon: 'fa-book', label: 'Álbum' },
    { id: 'exchange', icon: 'fa-exchange-alt', label: 'Cambios', badge: pendingCount },
    { id: 'pending', icon: 'fa-clock', label: 'Pendientes', badge: pendingCount },
    { id: 'venues', icon: 'fa-map-marker-alt', label: 'Sedes' },
    { id: 'feed', icon: 'fa-newspaper', label: 'Feed' },
    { id: 'matches', icon: 'fa-calendar-alt', label: 'Partidos' },
    { id: 'chat', icon: 'fa-comments', label: 'Chat', badge: totalUnreadChat },
    { id: 'profile', icon: 'fa-user', label: 'Perfil' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
          <img 
            src="/logo.jpg" 
            alt="Logo 2026" className="w-10 h-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] mix-blend-screen" 
          />
          <span className="text-lg font-black hidden sm:block text-slate-900 tracking-widest" style={{ textShadow: '0 0 10px rgba(255,255,255,0.9)' }}>MUNDIALSWAP</span>
        </div>
        
        <div className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setCurrentView(item.id)} 
              className={`nav-item text-sm relative font-bold hover:text-blue-600 transition-colors ${currentView === item.id ? 'active text-blue-700' : 'text-slate-800'}`}
            >
              <i className={`fas ${item.icon} mr-1`}></i> {item.label}
              {item.badge > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-900">{currentUser?.username || 'Usuario'}</div>
            <div className="text-xs font-bold text-slate-700">Coleccionista</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center font-bold text-sm text-white shadow-md border border-white/50">
            {currentUser?.avatar || (currentUser?.username?.charAt(0).toUpperCase() || 'U')}
          </div>
          <button onClick={doLogout} className="text-slate-700 hover:text-red-600 transition ml-2 cursor-pointer drop-shadow-sm">
            <i className="fas fa-sign-out-alt text-lg"></i>
          </button>
        </div>
      </div>

    </nav>
  );
}
