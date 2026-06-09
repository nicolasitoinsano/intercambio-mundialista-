import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function BottomNav() {
  const { currentView, setCurrentView, pendingTrades, chatContacts } = useAppContext();

  const pendingCount = pendingTrades.filter(t => t.status === 'pending').length;
  const totalUnreadChat = chatContacts.reduce((sum, c) => sum + c.unread, 0);

  const navItems = [
    { id: 'home', icon: 'fa-home', label: 'Inicio' },
    { id: 'album', icon: 'fa-book', label: 'Álbum' },
    { id: 'exchange', icon: 'fa-exchange-alt', label: 'Cambios', badge: pendingCount },
    { id: 'feed', icon: 'fa-newspaper', label: 'Feed' },
    { id: 'profile', icon: 'fa-user', label: 'Perfil' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setCurrentView(item.id)} 
            className={`flex flex-col items-center justify-center gap-1 relative w-16 transition-colors ${currentView === item.id ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <i className={`fas ${item.icon} text-xl ${currentView === item.id ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : ''}`}></i>
            <span className="text-[10px] font-medium">{item.label}</span>
            {item.badge > 0 && (
              <span className="absolute -top-1 right-2 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
