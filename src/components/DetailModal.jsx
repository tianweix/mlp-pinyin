import { useEffect, useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import './DetailModal.css';

export default function DetailModal() {
  const { detailItem, currentLevel, sound, dispatch } = useApp();
  const [playing, setPlaying] = useState(false);

  const speakCurrent = useCallback(() => {
    if (!detailItem || !sound) return;
    setPlaying(true);
    sound.speakSound(detailItem).then(() => {
      setTimeout(() => {
        sound.speakWord(detailItem);
        setTimeout(() => setPlaying(false), 1500);
      }, 300);
    });
  }, [detailItem, sound]);

  useEffect(() => {
    if (detailItem) {
      const timer = setTimeout(() => speakCurrent(), 300);
      return () => clearTimeout(timer);
    }
  }, [detailItem, speakCurrent]);

  const closeDetail = useCallback(() => {
    dispatch({ type: 'SET_DETAIL_ITEM', item: null });
  }, [dispatch]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) closeDetail();
  }, [closeDetail]);

  const levelColor = currentLevel ? currentLevel.color : 'var(--coral)';

  return (
    <div
      className={`modal-overlay${detailItem ? ' active' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="modal-card">
        <div className="modal-emoji">{detailItem?.emoji}</div>
        <div className="modal-pinyin" style={{ color: levelColor }}>
          {detailItem?.py}
        </div>
        <div className="modal-word">{detailItem?.word}</div>
        <div className="modal-tip">{'💡 ' + (detailItem?.tip || '')}</div>
        <button
          className={`btn-speak${playing ? ' playing' : ''}`}
          onClick={speakCurrent}
        >
          🔊
        </button>
        <button className="modal-close" onClick={closeDetail}>
          我记住啦
        </button>
      </div>
    </div>
  );
}
