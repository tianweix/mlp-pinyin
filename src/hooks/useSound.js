import { useRef, useCallback, useMemo } from 'react';

export function useSound() {
  const cacheRef = useRef({});

  const playFile = useCallback((src) => {
    return new Promise((resolve) => {
      let a = cacheRef.current[src];
      if (!a) { a = new Audio(src); cacheRef.current[src] = a; }
      a.currentTime = 0;
      a.onended = resolve;
      a.onerror = resolve;
      a.play().catch(resolve);
    });
  }, []);

  const speakSound = useCallback((item) => playFile(item._audio), [playFile]);
  const speakWord = useCallback((item) => playFile(item._audioW), [playFile]);

  const playTone = useCallback((freq, dur, type = 'sine') => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = type;
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.start(); osc.stop(ctx.currentTime + dur);
    } catch (e) { /* ignore */ }
  }, []);

  const correct = useCallback(() => {
    playTone(523, .08); setTimeout(() => playTone(659, .08), 80); setTimeout(() => playTone(784, .15), 160);
  }, [playTone]);
  const wrong = useCallback(() => playTone(280, .25, 'triangle'), [playTone]);
  const click = useCallback(() => playTone(880, .04), [playTone]);
  const celebrate = useCallback(() => {
    [523, 587, 659, 698, 784, 880, 988, 1047].forEach((f, i) => setTimeout(() => playTone(f, .12), i * 80));
  }, [playTone]);

  return useMemo(() => ({ playFile, speakSound, speakWord, playTone, correct, wrong, click, celebrate }),
    [playFile, speakSound, speakWord, playTone, correct, wrong, click, celebrate]);
}
