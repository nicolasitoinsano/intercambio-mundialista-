import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { supabase } from '../../services/supabase';

export default function LoginView() {
  const { showToast } = useAppContext();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  
  // Register State
  const [regUser, setRegUser] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  
  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  
  const [loading, setLoading] = useState(false);

  // Parallax Effect Disabled per user request
  const bgRef = useRef(null);
  useEffect(() => {
    // Parallax movement removed
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) {
      showToast('Ingresa tu email y contraseña', 'warning');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPass,
    });
    setLoading(false);
    
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('¡Bienvenido de vuelta!', 'success');
      // AppContext catches session change
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regUser || !regEmail || !regPass) {
      showToast('Completa todos los campos', 'warning');
      return;
    }
    if (regPass.length < 6) {
      showToast('La contraseña debe tener al menos 6 caracteres', 'warning');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPass,
      options: {
        data: {
          username: regUser
        }
      }
    });
    setLoading(false);
    
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('¡Cuenta creada! Revisa tu email para verificarla.', 'success');
      setIsFlipped(false); // Volver al login
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Ingresa tu email para recuperar la contraseña', 'warning');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: window.location.origin,
    });
    setLoading(false);
    
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Te hemos enviado un enlace de recuperación.', 'success');
      setIsForgot(false);
    }
  };

  const socialLogin = async (provider) => {
    showToast(`Iniciando con ${provider}...`, 'info');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider.toLowerCase(),
    });
    if (error) showToast(error.message, 'error');
  };

  return (
    <div className="login-container">
      <div className="parallax-bg" ref={bgRef}></div>
      
      <div className="login-content">
        <div className="text-center mb-8 animate-slide-up">
          <img 
            src="/logo.jpg" 
            alt="Logo Mundial" className="mx-auto w-24 mb-4 drop-shadow-2xl animate-pulse-soft mix-blend-screen" 
          />
          <h2 className="text-4xl font-black text-slate-900 tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">MUNDIALSWAP</h2>
          <p className="text-slate-800 mt-2 font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">Tu álbum digital del Mundial 2026</p>
        </div>

        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          
          {/* ----- CARA FRONTAL: LOGIN / RECOVERY ----- */}
          <div className="flip-face">
            <div className="glass-panel">
              {!isForgot ? (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h3>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-100">Correo electrónico</label>
                      <input 
                        type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="tu@email.com" 
                        className="w-full glass-input rounded-lg px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-100">Contraseña</label>
                      <input 
                        type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full glass-input rounded-lg px-4 py-3"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button type="button" onClick={() => setIsForgot(true)} className="text-sm text-gray-300 hover:text-white hover:underline transition">
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <button type="submit" disabled={loading} className="w-full glass-btn py-3 rounded-lg mt-2 disabled:opacity-50">
                      {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Ingresar'}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-gray-300 text-sm mb-3">O ingresa con</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => socialLogin('Google')} className="glass-btn-social px-5 py-2 rounded-lg font-bold w-full">
                        <i className="fab fa-google mr-2 text-red-400"></i> Google
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 text-center pt-4 border-t border-white/20">
                    <p className="text-gray-200 text-sm">¿No tienes cuenta? 
                      <button type="button" onClick={() => setIsFlipped(true)} className="text-white font-bold hover:underline ml-1">
                        Regístrate
                      </button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* ----- RECUPERAR CONTRASEÑA ----- */}
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-lock text-xl text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold">Recuperar Contraseña</h3>
                    <p className="text-sm text-gray-300 mt-2">Ingresa tu email y te enviaremos un enlace.</p>
                  </div>
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <input 
                        type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="tu@email.com" 
                        className="w-full glass-input rounded-lg px-4 py-3 text-center"
                      />
                    </div>
                    <button type="submit" disabled={loading} className="w-full glass-btn py-3 rounded-lg disabled:opacity-50">
                      {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Enviar Enlace'}
                    </button>
                  </form>
                  <div className="mt-6 text-center">
                    <button type="button" onClick={() => setIsForgot(false)} className="text-gray-300 hover:text-white transition text-sm">
                      <i className="fas fa-arrow-left mr-1"></i> Volver a inicio de sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ----- CARA TRASERA: REGISTRO ----- */}
          <div className="flip-face flip-back">
            <div className="glass-panel">
              <h3 className="text-2xl font-bold mb-6 text-center">Únete a la afición</h3>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-100">Nombre de Usuario</label>
                  <input 
                    type="text" value={regUser} onChange={(e) => setRegUser(e.target.value)}
                    placeholder="ej. FanFutbol26" 
                    className="w-full glass-input rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-100">Correo electrónico</label>
                  <input 
                    type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="tu@email.com" 
                    className="w-full glass-input rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-100">Contraseña</label>
                  <input 
                    type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)}
                    placeholder="Mínimo 6 caracteres" 
                    className="w-full glass-input rounded-lg px-4 py-3"
                  />
                </div>
                
                <button type="submit" disabled={loading} className="w-full glass-btn py-3 rounded-lg mt-4 disabled:opacity-50">
                  {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Crear Cuenta'}
                </button>
              </form>

              <div className="mt-6 text-center pt-4 border-t border-white/20">
                <p className="text-gray-200 text-sm">¿Ya tienes cuenta? 
                  <button type="button" onClick={() => setIsFlipped(false)} className="text-white font-bold hover:underline ml-1">
                    Inicia Sesión
                  </button>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
