import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { albumGroups } from '../../data';
import StickerCard from '../shared/StickerCard';

export default function ProfileView() {
  const { currentUser, ownedStickers, setCurrentUser, pendingTrades, openModal, closeModal, showToast, setCurrentView } = useAppContext();

  const completedTrades = pendingTrades.filter(t => t.status === 'completed').length;
  const ownedCount = ownedStickers.size;

  let myStickersList = [];
  albumGroups.forEach(group => {
    group.teams.forEach(team => {
      team.players.forEach(p => {
        if (ownedStickers.has(p.id)) {
          myStickersList.push({ p, team });
        }
      });
    });
  });

  const editProfile = () => {
    openModal('✏️ Editar Perfil', `
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Usuario</label>
          <input type="text" id="editName" value="${currentUser?.username || ''}" class="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Bio</label>
          <textarea id="editBio" class="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm h-16 resize-none text-white focus:outline-none focus:border-blue-400" placeholder="Cuéntanos sobre ti...">Coleccionista apasionado del Mundial 2026</textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">País favorito</label>
          <select class="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400">
            <option class="text-black">Argentina 🇦🇷</option>
            <option class="text-black">Brasil 🇧🇷</option>
            <option class="text-black">México 🇲🇽</option>
            <option class="text-black">España 🇪🇸</option>
            <option class="text-black">Francia 🇫🇷</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Avatar (Bandera)</label>
          <select id="editAvatar" class="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400">
            <option value="" class="text-black">Ninguno (Letra inicial)</option>
            <option value="🇦🇷" class="text-black" ${currentUser?.avatar === '🇦🇷' ? 'selected' : ''}>🇦🇷 Argentina</option>
            <option value="🇲🇽" class="text-black" ${currentUser?.avatar === '🇲🇽' ? 'selected' : ''}>🇲🇽 México</option>
            <option value="🇪🇸" class="text-black" ${currentUser?.avatar === '🇪🇸' ? 'selected' : ''}>🇪🇸 España</option>
            <option value="🇨🇴" class="text-black" ${currentUser?.avatar === '🇨🇴' ? 'selected' : ''}>🇨🇴 Colombia</option>
            <option value="🇺🇸" class="text-black" ${currentUser?.avatar === '🇺🇸' ? 'selected' : ''}>🇺🇸 Estados Unidos</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button id="cancelEditProfile" class="btn-outline flex-1 py-2 rounded-lg font-bold text-sm bg-black/20 text-white border-white/20">Cancelar</button>
          <button id="saveEditProfile" class="btn-primary flex-1 py-2 rounded-lg font-bold text-sm shadow-md">Guardar</button>
        </div>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('cancelEditProfile').onclick = closeModal;
      document.getElementById('saveEditProfile').onclick = () => {
        const name = document.getElementById('editName').value;
        const avatar = document.getElementById('editAvatar').value;
        if (name) {
          setCurrentUser(prev => ({ ...prev, username: name, avatar: avatar }));
        }
        closeModal();
        showToast('Perfil actualizado', 'success');
      };
    }, 100);
  };

  const shareProfile = () => {
    openModal(' Compartir Perfil', `
      <div class="space-y-3">
        <div class="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
          <div class="text-sm text-gray-600 mb-1">Tu enlace:</div>
          <div class="font-bold text-blue-700 break-all text-sm">mundialswap.com/u/${currentUser?.username}</div>
        </div>
        <button id="shareProfileBtn" class="w-full btn-primary py-2 rounded-lg font-bold text-sm">
          <i class="fas fa-copy mr-2"></i> Copiar
        </button>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('shareProfileBtn').onclick = () => {
        closeModal();
        showToast('Enlace copiado', 'success');
      };
    }, 100);
  };

  const showAchievement = (title, desc) => {
    openModal('🏆 Logro', `
      <div class="text-center space-y-3">
        <i class="fas fa-trophy text-5xl text-yellow-500 animate-bounce-in"></i>
        <h3 class="text-lg font-bold">${title}</h3>
        <p class="text-gray-600 text-sm">${desc}</p>
        <button id="closeAchievementBtn" class="btn-primary px-6 py-2 rounded-lg font-bold text-sm">¡Genial!</button>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('closeAchievementBtn').onclick = closeModal;
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="glass-panel rounded-2xl overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-red-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex justify-between items-end mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-blue-500 bg-black -mt-12 relative shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center font-black text-white text-3xl">
                {currentUser?.avatar || (currentUser?.username?.charAt(0).toUpperCase() || 'U')}
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white shadow-md"></div>
            </div>
            <div className="flex gap-2">
              <button onClick={editProfile} className="btn-outline px-4 py-1.5 rounded-lg font-bold text-sm bg-black/20 border-white/20 text-white hover:bg-white/10">
                <i className="fas fa-edit mr-1"></i> Editar
              </button>
              <button onClick={shareProfile} className="btn-primary px-4 py-1.5 rounded-lg font-bold text-sm shadow-md">
                <i className="fas fa-share-alt mr-1"></i> Compartir
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white drop-shadow-sm">{currentUser?.username || 'Usuario'}</h2>
            <p className="text-gray-300 mb-2">Coleccionista apasionado del Mundial 2026</p>
            <div className="flex gap-4 text-sm font-medium">
              <div><span className="font-black text-white text-lg">{ownedCount}</span> <span className="text-gray-400">Fichas</span></div>
              <div><span className="font-black text-white text-lg">{completedTrades}</span> <span className="text-gray-400">Intercambios</span></div>
              <div><span className="font-black text-white text-lg">12</span> <span className="text-gray-400">Amigos</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold heading flex items-center gap-2 text-white">
              <i className="fas fa-book-open text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"></i> Mis Fichas
            </h3>
            <button onClick={() => setCurrentView('album')} className="text-blue-400 text-sm font-bold hover:text-blue-300 hover:underline">Ver álbum completo</button>
          </div>
          <div className="glass-panel p-4">
            {myStickersList.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <i className="fas fa-book-open text-3xl mb-2 opacity-30"></i><br/>Aún no tienes fichas
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {myStickersList.map(({p, team}) => (
                  <StickerCard key={p.id} p={p} team={team} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold heading flex items-center gap-2 mb-4 text-white">
            <i className="fas fa-medal text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"></i> Logros
          </h3>
          <div className="glass-panel p-4 space-y-3">
            <div onClick={() => showAchievement('Primer Intercambio', 'Has completado tu primer intercambio exitosamente.')} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                <i className="fas fa-handshake"></i>
              </div>
              <div>
                <div className="font-bold text-sm text-white">Primer Intercambio</div>
                <div className="text-xs text-green-400">Completado</div>
              </div>
            </div>
            <div onClick={() => showAchievement('Coleccionista Novato', 'Has obtenido tus primeras 10 fichas.')} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <i className="fas fa-star"></i>
              </div>
              <div>
                <div className="font-bold text-sm text-white">Coleccionista Novato</div>
                <div className="text-xs text-green-400">Completado</div>
              </div>
            </div>
            <div onClick={() => showAchievement('Equipo Completo', 'Aún no has completado ningún equipo.')} className="flex items-center gap-3 p-2 rounded-lg opacity-50 grayscale cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gray-500/20 border border-gray-500/30 flex items-center justify-center text-gray-400">
                <i className="fas fa-users"></i>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-300">Equipo Completo</div>
                <div className="text-xs text-gray-500">Pendiente</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
