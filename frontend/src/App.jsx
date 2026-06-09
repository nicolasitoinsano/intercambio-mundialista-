import React, { useEffect, useRef } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';

import Navbar from './components/shared/Navbar';
import BottomNav from './components/layout/BottomNav';
import ModalContainer from './components/shared/Modal';
import ToastContainer from './components/shared/Toast';

import IntroView from './components/views/IntroView';
import LoginView from './components/views/LoginView';
import HomeView from './components/views/HomeView';
import AlbumView from './components/views/AlbumView';
import ExchangeView from './components/views/ExchangeView';
import PendingView from './components/views/PendingView';
import VenuesView from './components/views/VenuesView';
import FeedView from './components/views/FeedView';
import MatchesView from './components/views/MatchesView';
import ChatView from './components/views/ChatView';
import ProfileView from './components/views/ProfileView';

function MainApp() {
  const { currentView } = useAppContext();

  const renderView = () => {
    switch (currentView) {
      case 'intro': return <IntroView />;
      case 'login': return <LoginView />;
      case 'home': return <HomeView />;
      case 'album': return <AlbumView />;
      case 'exchange': return <ExchangeView />;
      case 'pending': return <PendingView />;
      case 'venues': return <VenuesView />;
      case 'feed': return <FeedView />;
      case 'matches': return <MatchesView />;
      case 'chat': return <ChatView />;
      case 'profile': return <ProfileView />;
      default: return <HomeView />;
    }
  };

  const showNavbar = currentView !== 'intro' && currentView !== 'login';

  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      bgRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app-wrapper">
      <div className="global-bg" ref={bgRef}></div>
      <div className="app-content pb-20 md:pb-0">
        {showNavbar && <Navbar />}
        {renderView()}
        {showNavbar && <BottomNav />}
        <ModalContainer />
        <ToastContainer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
