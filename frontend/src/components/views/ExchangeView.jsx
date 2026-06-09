import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { supabase } from '../../services/supabase';

export default function ExchangeView() {
  const { currentOfferFilter, setCurrentOfferFilter, openModal, closeModal, showToast, setPendingTrades, currentUser, chatContacts, setCurrentView, setCurrentChatPartner } = useAppContext();
  const [give, setGive] = useState('');
  const [want, setWant] = useState('');
  const [msg, setMsg] = useState('');

  const offers = [
    {user: "Carlos_99", avatar: "C", offers: "Lionel Messi (Argentina)", wants: "Kylian Mbappé (Francia)", time: "hace 10 min", legend: true},
    {user: "MariaFutbol", avatar: "M", offers: "Vinícius Jr. (Brasil)", wants: "Jude Bellingham (Inglaterra)", time: "hace 30 min", legend: true},
    {user: "JuanGol", avatar: "J", offers: "Erling Haaland (Noruega)", wants: "Cristiano Ronaldo (Portugal)", time: "hace 1 hora", legend: true},
    {user: "AnaCromo", avatar: "A", offers: "Kevin De Bruyne (Bélgica)", wants: "Luka Modrić (Croacia)", time: "hace 2 horas", legend: false},
    {user: "PedroFutbol", avatar: "P", offers: "Pedri (España)", wants: "Gavi (España)", time: "hace 3 horas", legend: false},
  ];

  let filtered = offers;
  if (currentOfferFilter === 'legend') filtered = offers.filter(o => o.legend);
  if (currentOfferFilter === 'recent') filtered = offers.slice(0, 3);

  const proposeTrade = (user, gives, wants) => {
    openModal('🤝 Proponer Intercambio', `
      <div class="space-y-3" id="proposeModal">
        <p class="text-sm text-gray-600">Proponiendo intercambio con <strong>${user}</strong></p>
        <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
          <div class="text-xs text-blue-700 font-medium">Ellos ofrecen:</div>
          <div class="font-bold text-blue-900">${gives}</div>
        </div>
        <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
          <div class="text-xs text-red-700 font-medium">Ellos buscan:</div>
          <div class="font-bold text-red-900">${wants}</div>
        </div>
        <textarea id="tradeMsg" placeholder="Mensaje (opcional)" class="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm h-16 resize-none focus:outline-none focus:border-blue-500"></textarea>
        <div class="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
          <div class="text-xs text-yellow-800 font-medium"><i class="fas fa-info-circle mr-1"></i> Nota:</div>
          <div class="text-xs text-yellow-700">El intercambio quedará pendiente hasta que ${user} lo acepte.</div>
        </div>
        <div class="flex gap-2">
          <button id="cancelTradeBtn" class="btn-outline flex-1 py-2 rounded-lg font-bold text-sm">Cancelar</button>
          <button id="confirmTradeBtn" class="btn-primary flex-1 py-2 rounded-lg font-bold text-sm">Enviar</button>
        </div>
      </div>
    `);

    setTimeout(() => {
      document.getElementById('cancelTradeBtn').onclick = closeModal;
      document.getElementById('confirmTradeBtn').onclick = async () => {
        const tMsg = document.getElementById('tradeMsg')?.value || 'Propuesta de intercambio';
        
        // Simular que encontramos el ID del receiver buscando por username (en la vida real vendría del offer)
        const { data: receiverData } = await supabase.from('profiles').select('id').eq('username', user).single();
        
        if (receiverData && currentUser) {
          const { error } = await supabase.from('trades').insert({
            sender_id: currentUser.id,
            receiver_id: receiverData.id,
            gives_sticker: gives,
            wants_sticker: wants,
            message: tMsg,
            status: 'pending'
          });
          
          if (!error) {
            showToast(`¡Intercambio propuesto a ${user}!`, 'success');
            // Refresh trades if needed, or rely on real-time
            const { fetchTrades } = useAppContext(); // Need to ensure it's destructured
          } else {
            showToast('Error al proponer intercambio', 'error');
          }
        } else {
          // Fallback if user not found in DB
          setPendingTrades(prev => [{
            id: Date.now(),
            from: currentUser?.username || 'Yo',
            fromAvatar: (currentUser?.username || 'U').charAt(0).toUpperCase(),
            to: user,
            toAvatar: user.charAt(0).toUpperCase(),
            gives: gives,
            wants: wants,
            message: tMsg,
            status: 'pending',
            direction: 'sent',
            createdAt: 'ahora',
            updatedAt: 'ahora'
          }, ...prev]);
          showToast(`¡Intercambio propuesto a ${user}!`, 'success');
        }
        closeModal();
      };
    }, 100);
  };

  const openChatWith = (user) => {
    const contactIdx = chatContacts.findIndex(c => c.name === user);
    if (contactIdx >= 0) {
      setCurrentChatPartner(contactIdx);
      setCurrentView('chat');
    } else {
      showToast('Usuario no encontrado', 'warning');
    }
  };

  const reportOffer = (idx) => {
    openModal('🚩 Reportar Oferta', `
      <div class="space-y-3">
        <p class="text-sm text-gray-600">¿Por qué deseas reportar esta oferta?</p>
        <div class="space-y-2">
          <label class="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="report" value="spam" class="accent-blue-600"> Spam</label>
          <label class="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="report" value="fake" class="accent-blue-600"> Ficha falsa</label>
          <label class="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="report" value="scam" class="accent-blue-600"> Posible estafa</label>
          <label class="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="report" value="other" class="accent-blue-600"> Otro motivo</label>
        </div>
        <div class="flex gap-2">
          <button id="cancelReport" class="btn-outline flex-1 py-2 rounded-lg font-bold text-sm">Cancelar</button>
          <button id="confirmReport" class="btn-primary flex-1 py-2 rounded-lg font-bold text-sm">Reportar</button>
        </div>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('cancelReport').onclick = closeModal;
      document.getElementById('confirmReport').onclick = () => {
        closeModal();
        showToast('Oferta reportada', 'success');
      };
    }, 100);
  };

  const createOffer = () => {
    if (!give || !want) {
      showToast('Selecciona qué ofreces y buscas', 'warning');
      return;
    }
    showToast('¡Oferta publicada!', 'success');
    setGive('');
    setWant('');
    setMsg('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-black heading mb-6 text-white drop-shadow-md">Mercado de Intercambios</h2>

      <div className="glass-panel p-5 mb-8">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
          <i className="fas fa-plus-circle text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"></i> Publicar Oferta
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-1">Ofrezco:</label>
            <select value={give} onChange={(e) => setGive(e.target.value)} className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400">
              <option value="" className="text-black">Selecciona una ficha...</option>
              <option value="messi" className="text-black">Lionel Messi (Argentina)</option>
              <option value="mbappe" className="text-black">Kylian Mbappé (Francia)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-1">Busco:</label>
            <select value={want} onChange={(e) => setWant(e.target.value)} className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400">
              <option value="" className="text-black">Selecciona una ficha...</option>
              <option value="haaland" className="text-black">Erling Haaland (Noruega)</option>
              <option value="bellingham" className="text-black">Jude Bellingham (Inglaterra)</option>
            </select>
          </div>
        </div>
        <textarea 
          value={msg} onChange={(e) => setMsg(e.target.value)} 
          placeholder="Añade un mensaje (ej. 'Solo cambio en persona', 'Busco urgente')" 
          className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm mb-4 h-16 resize-none text-white focus:outline-none focus:border-blue-400 placeholder-gray-400"
        ></textarea>
        <button onClick={createOffer} className="btn-primary w-full py-2 rounded-lg font-bold text-sm shadow-sm">Publicar Oferta</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button onClick={() => setCurrentOfferFilter('all')} className={`tab-btn whitespace-nowrap ${currentOfferFilter === 'all' ? 'active' : ''}`}>Todas las ofertas</button>
        <button onClick={() => setCurrentOfferFilter('legend')} className={`tab-btn whitespace-nowrap ${currentOfferFilter === 'legend' ? 'active' : ''}`}>Fichas Legend</button>
        <button onClick={() => setCurrentOfferFilter('recent')} className={`tab-btn whitespace-nowrap ${currentOfferFilter === 'recent' ? 'active' : ''}`}>Más recientes</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((o, idx) => (
          <div key={idx} className="glass-panel p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center font-bold text-white text-sm shadow-md">{o.avatar}</div>
              <div className="flex-1">
                <div className="font-bold text-sm text-white">
                  {o.user} {o.legend && <i className="fas fa-star text-yellow-400 text-xs drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"></i>}
                </div>
                <div className="text-xs text-gray-400">{o.time}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-red-900/40 border border-red-500/30 text-red-300 font-medium">Intercambio</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-blue-900/30 rounded-lg p-2 border border-blue-500/30">
                <div className="text-xs text-blue-300 font-medium mb-0.5">Ofrece:</div>
                <div className="font-bold text-sm text-white">{o.offers}</div>
              </div>
              <div className="bg-red-900/30 rounded-lg p-2 border border-red-500/30">
                <div className="text-xs text-red-300 font-medium mb-0.5">Busca:</div>
                <div className="font-bold text-sm text-white">{o.wants}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => proposeTrade(o.user, o.offers, o.wants)} className="btn-primary flex-1 py-1.5 rounded-lg font-bold text-sm shadow-md">
                <i className="fas fa-handshake mr-1"></i> Proponer
              </button>
              <button onClick={() => openChatWith(o.user)} className="btn-outline px-3 py-1.5 rounded-lg text-sm bg-black/20 border-white/20 text-white hover:bg-white/10">
                <i className="fas fa-comment"></i>
              </button>
              <button onClick={() => reportOffer(idx)} className="btn-outline px-3 py-1.5 rounded-lg text-sm border-white/20 text-red-400 bg-black/20 hover:bg-red-900/30 hover:border-red-500/50">
                <i className="fas fa-flag"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
