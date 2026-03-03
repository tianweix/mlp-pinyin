import { useState, useCallback, useEffect, useRef } from 'react';

const DEFAULT_PROGRESS = { stars: 0, completed: [], levelStars: {} };

function loadProgress(key) {
  if (!key) return DEFAULT_PROGRESS;
  try {
    const d = JSON.parse(localStorage.getItem(key));
    if (d && d.stars !== undefined) return d;
  } catch (e) { /* ignore */ }
  return { ...DEFAULT_PROGRESS };
}

// One-time migration from old key
let migrated = false;
function migrateOldProgress() {
  if (migrated) return;
  migrated = true;
  const oldKey = 'pinyin-progress';
  const newKey = 'learning-progress-pinyin';
  if (!localStorage.getItem(newKey) && localStorage.getItem(oldKey)) {
    localStorage.setItem(newKey, localStorage.getItem(oldKey));
  }
}

export function useProgress(mode) {
  const key = mode ? `learning-progress-${mode}` : null;
  const prevKey = useRef(key);

  useEffect(() => { migrateOldProgress(); }, []);

  const [progress, setProgress] = useState(() => loadProgress(key));

  // Re-load progress when mode changes
  useEffect(() => {
    if (key !== prevKey.current) {
      prevKey.current = key;
      setProgress(loadProgress(key));
    }
  }, [key]);

  // Persist to localStorage
  useEffect(() => {
    if (key) {
      localStorage.setItem(key, JSON.stringify(progress));
    }
  }, [progress, key]);

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
