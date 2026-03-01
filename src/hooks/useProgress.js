import { useState, useCallback, useEffect } from 'react';

const KEY = 'pinyin-progress';

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const d = JSON.parse(localStorage.getItem(KEY));
      if (d && d.stars !== undefined) return d;
    } catch (e) { /* ignore */ }
    return { stars: 0, completed: [], levelStars: {} };
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress]);

  const recordGameResult = useCallback((levelId, stars) => {
    setProgress(prev => {
      const prevStars = prev.levelStars[levelId] || 0;
      const diff = Math.max(0, stars - prevStars);
      return {
        stars: prev.stars + diff,
        completed: prev.completed.includes(levelId) ? prev.completed : [...prev.completed, levelId],
        levelStars: { ...prev.levelStars, [levelId]: Math.max(prevStars, stars) },
      };
    });
  }, []);

  return { progress, recordGameResult };
}
