const playTone = (frequency, type = 'sine', duration = 0.1, vol = 0.1) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error('Audio play error:', e);
  }
};

export const playClickSound = () => playTone(800, 'sine', 0.05, 0.05);
export const playFlipSound = () => playTone(300, 'triangle', 0.15, 0.05);
export const playSuccessSound = () => {
  playTone(523.25, 'sine', 0.1, 0.05); // C5
  setTimeout(() => playTone(659.25, 'sine', 0.1, 0.05), 100); // E5
  setTimeout(() => playTone(783.99, 'sine', 0.2, 0.05), 200); // G5
};
