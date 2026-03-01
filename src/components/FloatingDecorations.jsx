import { useMemo } from 'react';
import './FloatingDecorations.css';

const STAR_EMOJIS = ['✨', '⭐', '🌟', '💫'];

export default function FloatingDecorations() {
  const stars = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)],
      top: Math.random() * 80 + '%',
      left: Math.random() * 90 + 5 + '%',
      delay: Math.random() * 3 + 's',
      size: (Math.random() * 12 + 14) + 'px',
    }));
  }, []);

  return (
    <>
      <div className="float-cloud cloud1" />
      <div className="float-cloud cloud2" />
      <div className="float-cloud cloud3" />
      {stars.map(s => (
        <div
          key={s.id}
          className="twinkle-star"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            fontSize: s.size,
          }}
        >
          {s.emoji}
        </div>
      ))}
    </>
  );
}
