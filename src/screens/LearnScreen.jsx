import { useApp } from '../context/AppContext';
import PinyinCard from '../components/PinyinCard';
import ProgressBar from '../components/ProgressBar';
import './LearnScreen.css';

export default function LearnScreen({ active }) {
  const { currentLevel, viewedItems, sound, dispatch, navigate, showBubble } = useApp();

  if (!currentLevel) {
    return <div id="screen-learn" className={`screen${active ? ' active' : ''}`} />;
  }

  const items = currentLevel.items;
  const total = items.length;
  const viewed = viewedItems.size;
  const threshold = Math.min(4, total);
  const canChallenge = viewed >= threshold;

  const handleCardClick = (item, index) => {
    sound.click();
    dispatch({ type: 'VIEW_ITEM', index });
    dispatch({ type: 'SET_DETAIL_ITEM', item });
  };

  const handleChallenge = () => {
    if (!canChallenge) return;
    sound.click();
    let gameType;
    if (currentLevel.id === 4) {
      gameType = 'tone';
    } else if (currentLevel.id === 5) {
      gameType = 'quiz';
    } else if (Math.random() > 0.5 && items.length >= 4) {
      gameType = 'catch';
    } else {
      gameType = 'quiz';
    }
    dispatch({ type: 'SET_GAME_TYPE', gameType });
    navigate('game');
  };

  const handleBack = () => {
    navigate('map');
  };

  return (
    <div id="screen-learn" className={`screen${active ? ' active' : ''}`}>
      <div className="learn-header">
        <button className="btn-back" onClick={handleBack}>&#8592;</button>
        <div className="learn-title">{currentLevel.icon} {currentLevel.title}</div>
        <div className="learn-progress">{viewed}/{total}</div>
      </div>
      <ProgressBar value={viewed / total * 100} />
      <div className="learn-grid">
        {items.map((item, i) => (
          <PinyinCard
            key={i}
            item={item}
            index={i}
            isViewed={viewedItems.has(i)}
            onClick={() => handleCardClick(item, i)}
          />
        ))}
      </div>
      <div className="learn-actions">
        <button
          className="btn-challenge"
          disabled={!canChallenge}
          onClick={handleChallenge}
        >
          {canChallenge ? '开始挑战 🎮' : `再看${threshold - viewed}个就能挑战啦`}
        </button>
      </div>
    </div>
  );
}
