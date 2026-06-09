import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialFeedData, initialMatchesData, initialChatContacts, initialChatMessages, initialPendingTrades } from '../data';
import { supabase } from '../services/supabase';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('intro');
  const [currentUser, setCurrentUser] = useState(null); // Will store user profile object
  const [session, setSession] = useState(null);
  
  const [ownedStickers, setOwnedStickers] = useState(new Set());
  const [pendingTrades, setPendingTrades] = useState(initialPendingTrades);
  const [feedData, setFeedData] = useState(initialFeedData);
  const [matchesData, setMatchesData] = useState(initialMatchesData);
  const [chatContacts, setChatContacts] = useState(initialChatContacts);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  
  const [currentChatPartner, setCurrentChatPartner] = useState(0);
  const [currentMatchFilter, setCurrentMatchFilter] = useState('all');
  const [currentOfferFilter, setCurrentOfferFilter] = useState('all');
  const [currentPendingFilter, setCurrentPendingFilter] = useState('all');
  const [currentVenueFilter, setCurrentVenueFilter] = useState('all');
  const [postAttachments, setPostAttachments] = useState([]);

  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, title: '', content: null });

  // Initialize Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id, session.user.user_metadata, session.user.email);
        setCurrentView('home');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id, session.user.user_metadata, session.user.email);
        setCurrentView('home');
      } else {
        setCurrentUser(null);
        setCurrentView('intro');
        setOwnedStickers(new Set());
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId, userMetadata, userEmail) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (!error && data) {
      setCurrentUser(data);
      fetchUserStickers(userId);
      fetchFeed();
      fetchTrades(userId);
    } else if (error) {
      console.warn("Profile not found in database, creating one on the fly...", error);
      const username = userMetadata?.username || userEmail?.split('@')[0] || 'Usuario';
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          username: username,
          bio: 'Coleccionista apasionado del Mundial 2026'
        });
      
      if (!insertError) {
        // Retry fetch
        const { data: newData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        if (newData) {
          setCurrentUser(newData);
          fetchUserStickers(userId);
          fetchFeed();
          fetchTrades(userId);
        }
      } else {
        console.error("Error creating profile row:", insertError);
      }
    }
  };

  const fetchUserStickers = async (userId) => {
    const { data, error } = await supabase
      .from('user_stickers')
      .select('sticker_id')
      .eq('user_id', userId);
    if (!error && data) {
      setOwnedStickers(new Set(data.map(s => s.sticker_id)));
    }
  };

  const fetchFeed = async () => {
    const { data, error } = await supabase
      .from('feed_posts')
      .select('*, profiles(username)')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setFeedData(data.map(p => ({
        id: p.id,
        user: p.profiles?.username || 'Usuario',
        avatar: (p.profiles?.username || 'U').charAt(0).toUpperCase(),
        action: p.action,
        sticker: p.sticker,
        time: new Date(p.created_at).toLocaleTimeString(),
        likes: p.likes,
        comments: p.comments,
        liked: false,
        stickerImg: p.has_image
      })));
    }
  };

  const fetchTrades = async (userId) => {
    const { data, error } = await supabase
      .from('trades')
      .select('*, sender:profiles!sender_id(username), receiver:profiles!receiver_id(username)')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPendingTrades(data.map(t => ({
        id: t.id,
        from: t.sender?.username || 'User',
        fromAvatar: (t.sender?.username || 'U').charAt(0).toUpperCase(),
        to: t.receiver?.username || 'User',
        toAvatar: (t.receiver?.username || 'U').charAt(0).toUpperCase(),
        gives: t.gives_sticker,
        wants: t.wants_sticker,
        message: t.message,
        status: t.status,
        direction: t.sender_id === userId ? 'sent' : 'received',
        createdAt: new Date(t.created_at).toLocaleDateString(),
        updatedAt: new Date(t.updated_at).toLocaleDateString()
      })));
    }
  };

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const openModal = useCallback((title, content) => {
    setModal({ isOpen: true, title, content });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, title: '', content: null });
  }, []);

  const doLogout = async () => {
    await supabase.auth.signOut();
    showToast('Sesión cerrada', 'info');
  };

  const toggleSticker = async (stickerId) => {
    if (!session) return;
    const userId = session.user.id;
    
    const isOwned = ownedStickers.has(stickerId);
    
    if (isOwned) {
      // Remove
      const { error } = await supabase
        .from('user_stickers')
        .delete()
        .match({ user_id: userId, sticker_id: stickerId });
      
      if (!error) {
        setOwnedStickers(prev => {
          const next = new Set(prev);
          next.delete(stickerId);
          return next;
        });
        showToast('Ficha removida', 'warning');
      }
    } else {
      // Add
      const { error } = await supabase
        .from('user_stickers')
        .insert({ user_id: userId, sticker_id: stickerId, quantity: 1 });
        
      if (!error) {
        setOwnedStickers(prev => {
          const next = new Set(prev);
          next.add(stickerId);
          return next;
        });
        showToast('¡Ficha obtenida!', 'success');
        
        // Opt: Auto post to feed
        await supabase.from('feed_posts').insert({
          user_id: userId,
          action: 'consiguió',
          sticker: `Ficha #${stickerId}`,
          has_image: true
        });
        fetchFeed(); // Refresh
      }
    }
  };

  const value = {
    currentView, setCurrentView,
    currentUser, setCurrentUser,
    session,
    ownedStickers, setOwnedStickers,
    pendingTrades, setPendingTrades, fetchTrades,
    feedData, setFeedData, fetchFeed,
    matchesData, setMatchesData,
    chatContacts, setChatContacts,
    chatMessages, setChatMessages,
    currentChatPartner, setCurrentChatPartner,
    currentMatchFilter, setCurrentMatchFilter,
    currentOfferFilter, setCurrentOfferFilter,
    currentPendingFilter, setCurrentPendingFilter,
    currentVenueFilter, setCurrentVenueFilter,
    postAttachments, setPostAttachments,
    toasts, showToast,
    modal, openModal, closeModal,
    doLogout, toggleSticker
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

