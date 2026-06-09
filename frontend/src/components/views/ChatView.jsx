import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function ChatView() {
  const { chatContacts, setChatContacts, chatMessages, setChatMessages, currentChatPartner, setCurrentChatPartner, openModal, closeModal, showToast } = useAppContext();
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef(null);

  const activeContact = chatContacts[currentChatPartner];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, currentChatPartner]);

  const selectChat = (index) => {
    setCurrentChatPartner(index);
    setChatContacts(prev => prev.map((c, i) => i === index ? { ...c, unread: 0 } : c));
  };

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;
    setChatMessages(prev => [...prev, { from: 'me', text, time: 'ahora' }]);
    setInputText('');
    
    setTimeout(() => {
      const responses = ['¡Perfecto! Te confirmo 👍', '¡Genial! Nos vemos ahí', 'Déjame revisar mi álbum', '¡Trato hecho! 🤝', '¿Tienes otras fichas?'];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { from: 'other', text: randomResponse, time: 'ahora' }]);
    }, 1200);
  };

  const attachEmoji = () => {
    const emojis = ['⚽', '🏆', '🙌', '❤️', '🔥', '🤝', '⭐', '😎'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    setInputText(prev => prev + emoji);
  };

  const openNewChat = () => {
    openModal('💬 Nuevo Chat', `
      <div class="space-y-2">
        <input type="text" placeholder="Buscar usuario..." class="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-400">
        <div class="text-sm font-medium text-gray-300 mt-2">Sugerencias:</div>
        ${['FutbolFan88', 'CromoMaster', 'WorldCup2026'].map(u => `
          <button id="newChatBtn-${u}" class="w-full text-left px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 font-medium text-sm">
            <i class="fas fa-user-circle mr-2 text-blue-400"></i> ${u}
          </button>
        `).join('')}
      </div>
    `);
    setTimeout(() => {
      ['FutbolFan88', 'CromoMaster', 'WorldCup2026'].forEach(u => {
        const btn = document.getElementById(`newChatBtn-${u}`);
        if(btn) {
          btn.onclick = () => {
            closeModal();
            showToast(`Chat iniciado con ${u}`, 'success');
          };
        }
      });
    }, 100);
  };

  const openChatOptions = () => {
    openModal('⚙️ Opciones', `
      <div class="space-y-1">
        <button id="optProfileBtn" class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 font-medium text-sm text-white">
          <i class="fas fa-user mr-2 text-blue-400"></i> Ver perfil
        </button>
        <button id="optMuteBtn" class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 font-medium text-sm text-white">
          <i class="fas fa-bell-slash mr-2 text-yellow-400"></i> Silenciar
        </button>
        <button id="optClearBtn" class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 font-medium text-sm text-white">
          <i class="fas fa-trash mr-2 text-gray-400"></i> Limpiar
        </button>
        <button id="optCloseBtn" class="w-full text-left px-3 py-2 rounded-lg hover:bg-red-900/30 font-medium text-sm text-red-400">
          <i class="fas fa-times mr-2"></i> Cerrar
        </button>
      </div>
    `);
    setTimeout(() => {
      const b1 = document.getElementById('optProfileBtn'); if(b1) b1.onclick = () => { closeModal(); showToast(`Perfil de ${activeContact.name}`, 'info'); };
      const b2 = document.getElementById('optMuteBtn'); if(b2) b2.onclick = () => { closeModal(); showToast('Notificaciones silenciadas', 'warning'); };
      const b3 = document.getElementById('optClearBtn'); if(b3) b3.onclick = () => { closeModal(); showToast('Chat limpiado', 'info'); };
      const b4 = document.getElementById('optCloseBtn'); if(b4) b4.onclick = closeModal;
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] flex gap-4">
      
      {/* Lista de Contactos */}
      <div className="w-full md:w-1/3 glass-panel rounded-xl flex flex-col overflow-hidden hidden md:flex border-white/20">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/30">
          <h3 className="font-bold heading text-lg text-white drop-shadow-md">Mensajes</h3>
          <button onClick={openNewChat} className="w-8 h-8 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center hover:bg-blue-500/40 transition border border-blue-500/30 shadow-md">
            <i className="fas fa-edit"></i>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chatContacts.map((c, i) => (
            <div 
              key={c.id} 
              onClick={() => selectChat(i)} 
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${i === currentChatPartner ? 'bg-blue-900/40 border border-blue-500/30 shadow-md' : 'border border-transparent hover:bg-white/10'}`}
            >
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">{c.avatar}</div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 ${c.online ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-gray-400'} rounded-full border-2 border-transparent`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate text-white">{c.name}</div>
                <div className="text-xs text-gray-400 truncate">{c.lastMsg}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-gray-400">{c.time}</div>
                {c.unread > 0 && <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1 mx-auto font-bold">{c.unread}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ventana de Chat */}
      <div className="flex-1 glass-panel rounded-xl flex flex-col overflow-hidden border-white/20">
        <div className="p-3 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-300 mr-2 hover:text-white"><i className="fas fa-arrow-left"></i></button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">{activeContact.avatar}</div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 ${activeContact.online ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-gray-400'} rounded-full border-2 border-transparent`}></div>
            </div>
            <div>
              <div className="font-bold text-sm text-white drop-shadow-sm">{activeContact.name}</div>
              <div className="text-xs text-green-400 font-medium drop-shadow-[0_0_3px_rgba(74,222,128,0.5)]">{activeContact.online ? 'En línea' : 'Desconectado'}</div>
            </div>
          </div>
          <button onClick={openChatOptions} className="text-gray-300 hover:text-white p-2">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent" ref={chatContainerRef}>
          {chatMessages.map((m, idx) => (
            <div key={idx} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              <div className={`${m.from === 'me' ? 'chat-bubble-me' : 'chat-bubble-other'} px-3 py-2 max-w-xs shadow-sm`}>
                <div className="text-sm">{m.text}</div>
                <div className={`text-xs ${m.from === 'me' ? 'text-white/70' : 'text-gray-400'} mt-1 text-right`}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-black/30 border-t border-white/10 flex items-center gap-2">
          <button onClick={attachEmoji} className="w-10 h-10 rounded-full text-yellow-400 hover:bg-white/10 flex items-center justify-center transition shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
            <i className="far fa-smile text-xl"></i>
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe un mensaje..." 
            className="flex-1 bg-black/40 border-transparent rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-black/60 focus:border-blue-400 border transition"
          />
          <button onClick={sendMessage} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition shrink-0 shadow-sm">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
