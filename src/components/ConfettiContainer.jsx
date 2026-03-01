import { useRef, useCallback, createContext, useContext } from 'react';
import './ConfettiContainer.css';

const ConfettiContext = createContext(null);
export const useConfetti = () => useContext(ConfettiContext);

const COLORS = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#A78BFA', '#FF9A9E', '#45B7D1', '#96c93d', '#f6d365'];

export default function ConfettiContainer({ children }) {
  const containerRef = useRef(null);

  const fire = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + '%';
      c.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      c.style.animationDelay = Math.random() * 1.5 + 's';
      c.style.animationDuration = (Math.random() * 2 + 2) + 's';
      c.style.width = (Math.random() * 8 + 6) + 'px';
      c.style.height = (Math.random() * 8 + 6) + 'px';
      c.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }
  }, []);

  return (
    <ConfettiContext.Provider value={fire}>
      <div id="confetti-container" ref={containerRef} />
      {children}
    </ConfettiContext.Provider>
  );
}
