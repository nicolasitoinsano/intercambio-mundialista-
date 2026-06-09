import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { stickerImgUrl } from '../../data';

export default function FeedView() {
  const { feedData, setFeedData, postAttachments, setPostAttachments, currentUser, showToast, openModal, closeModal } = useAppContext();
  const [feedText, setFeedText] = useState('');

  const toggleLike = (id) => {
    setFeedData(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, liked: !p.liked, likes: p.likes + (!p.liked ? 1 : -1) };
      }
      return p;
    }));
  };

  const createPost = () => {
    if (!feedText.trim() && postAttachments.length === 0) {
      showToast('Escribe algo o adjunta contenido', 'warning');
      return;
    }
    setFeedData(prev => [{
      id: Date.now(),
      user: currentUser?.username || 'Usuario',
      avatar: (currentUser?.username || 'U').charAt(0).toUpperCase(),
      action: "publicó",
      sticker: feedText.substring(0, 30) || 'una nueva ficha',
      time: "ahora",
      likes: 0,
      comments: 0,
      liked: false,
      stickerImg: postAttachments.some(a => a.startsWith('sticker'))
    }, ...prev]);
    setFeedText('');
    setPostAttachments([]);
    showToast('¡Publicación creada!', 'success');
  };

  const attachPhoto = () => {
    showToast('📷 Selector de fotos abierto', 'info');
    setPostAttachments(prev => [...prev, 'photo']);
  };

  const attachSticker = () => {
    showToast('Ficha de prueba adjuntada', 'success');
    setPostAttachments(prev => [...prev, 'sticker:prueba']);
  };

  const attachLocation = () => {
    showToast(' Ubicación: Estadio Azteca', 'info');
    setPostAttachments(prev => [...prev, 'location']);
  };

  const openComments = (id) => {
    const post = feedData.find(p => p.id === id);
    if(!post) return;
    openModal(`💬 Comentarios (${post.comments})`, `
      <div class="space-y-2 text-white">
        <div class="bg-black/40 border border-white/10 p-3 rounded-lg">
          <div class="font-bold text-sm">FanFutbol22</div>
          <div class="text-sm text-gray-300">¡Qué crack! 🔥</div>
        </div>
        <div class="bg-black/40 border border-white/10 p-3 rounded-lg">
          <div class="font-bold text-sm">CromoKing</div>
          <div class="text-sm text-gray-300">La tengo, ¿la cambias?</div>
        </div>
        <div id="newCommentsArea"></div>
        <div class="flex gap-2 mt-3">
          <input type="text" id="commentInput" placeholder="Escribe un comentario..." class="flex-1 bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-400">
          <button id="sendCommentBtn" class="btn-primary px-3 py-2 rounded-lg font-bold shadow-md">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('sendCommentBtn').onclick = () => {
        const txt = document.getElementById('commentInput').value.trim();
        if(!txt) { showToast('Escribe un comentario', 'warning'); return; }
        
        // Add visually to modal without closing
        const newComm = document.createElement('div');
        newComm.className = "bg-black/40 border border-white/10 p-3 rounded-lg mt-2";
        newComm.innerHTML = '<div class="font-bold text-sm">' + (currentUser?.username || 'Usuario') + '</div><div class="text-sm text-gray-300">' + txt + '</div>';
        document.getElementById('newCommentsArea').appendChild(newComm);
        document.getElementById('commentInput').value = '';
        
        setFeedData(prev => prev.map(p => p.id === id ? { ...p, comments: p.comments + 1 } : p));
        showToast('Comentario publicado', 'success');
      };
    }, 100);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="glass-panel p-4 mb-6">
        <div className="flex gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <textarea 
            value={feedText} onChange={(e) => setFeedText(e.target.value)}
            placeholder="¿Qué ficha conseguiste hoy?" 
            className="flex-1 bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-sm resize-none h-20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-black/50 transition"
          ></textarea>
        </div>
        
        {postAttachments.length > 0 && (
          <div className="flex gap-2 mb-3 flex-wrap">
            {postAttachments.map((att, i) => (
              <div key={i} className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-blue-500/30">
                <i className={`fas fa-${att === 'photo' ? 'image' : att.startsWith('sticker') ? 'sticky-note' : 'map-marker-alt'}`}></i>
                {att}
                <button onClick={() => setPostAttachments(prev => prev.filter((_, idx) => idx !== i))} className="ml-1 hover:text-red-500">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <div className="flex gap-1 sm:gap-2">
            <button onClick={attachPhoto} className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition text-sm flex items-center gap-1">
              <i className="fas fa-image text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]"></i> <span className="hidden sm:inline">Foto</span>
            </button>
            <button onClick={attachSticker} className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition text-sm flex items-center gap-1">
              <i className="fas fa-sticky-note text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"></i> <span className="hidden sm:inline">Ficha</span>
            </button>
            <button onClick={attachLocation} className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition text-sm flex items-center gap-1">
              <i className="fas fa-map-marker-alt text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]"></i> <span className="hidden sm:inline">Lugar</span>
            </button>
          </div>
          <button onClick={createPost} className="btn-primary px-6 py-1.5 rounded-lg font-bold text-sm">Publicar</button>
        </div>
      </div>

      <div className="space-y-4">
        {feedData.map(p => (
          <div key={p.id} className="glass-panel p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center font-bold text-white shadow-md">{p.avatar}</div>
              <div className="flex-1">
                <div className="font-bold text-sm text-white">{p.user}</div>
                <div className="text-sm text-gray-300">{p.action} <span className="font-bold text-blue-400">{p.sticker}</span></div>
                <div className="text-xs text-gray-400">{p.time}</div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
            {p.stickerImg && (
              <div className="rounded-lg p-3 mb-3 flex items-center gap-3 border border-white/20 bg-black/20">
                <img src={stickerImgUrl} alt={p.sticker} className="w-16 h-24 rounded object-cover shadow-md" />
                <div>
                  <div className="font-bold text-white">{p.sticker}</div>
                  <div className="text-sm text-gray-300">Ficha del Mundial 2026</div>
                  <div className="text-xs text-yellow-400 mt-1 font-medium drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"><i className="fas fa-star"></i> Legend</div>
                </div>
              </div>
            )}
            <div className="flex gap-4 text-sm text-gray-300 border-t border-white/10 pt-3">
              <button onClick={() => toggleLike(p.id)} className={`like-btn ${p.liked ? 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]' : ''} hover:text-red-400 transition flex items-center gap-1 font-medium`}>
                <i className={`${p.liked ? 'fas' : 'far'} fa-heart`}></i> <span>{p.likes}</span>
              </button>
              <button onClick={() => openComments(p.id)} className="hover:text-blue-400 transition flex items-center gap-1 font-medium">
                <i className="far fa-comment"></i> {p.comments}
              </button>
              <button className="hover:text-yellow-400 transition flex items-center gap-1 font-medium">
                <i className="far fa-share-square"></i> Compartir
              </button>
              <button className="hover:text-purple-400 transition flex items-center gap-1 font-medium ml-auto">
                <i className="far fa-bookmark"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
