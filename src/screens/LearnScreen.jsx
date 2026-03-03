import { useApp } from '../context/AppContext';
import PinyinCard from '../components/PinyinCard';
import ProgressBar from '../components/ProgressBar';
import './LearnScreen.css';

export default function LearnScreen({ active }) {
  const { currentLevel, learningMode, viewedItems, sound, dispatch, navigate, showBubble } = useApp();

  if (!currentLevel) {
    return <div id="screen-learn" className={`screen${active ? ' active' : ''}`} />;
  }

  const items = currentLevel.items;
  const total = items.length;
  const viewed = viewedItems.size;
  const handleCardClick = (item, index) => {
    sound.click();
    dispatch({ type: 'VIEW_ITEM', index });
    dispatch({ type: 'SET_DETAIL_ITEM', item });
  };

  const startGame = (gameType) => {
    sound.click();
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
        {learningMode === 'pinyin' && currentLevel.id === 4 ? (
          <button className="btn-challenge" onClick={() => startGame('tone')}>声调挑战 🌈</button>
        ) : (
          <>
            <button className="btn-challenge" onClick={() => startGame('quiz')}>听音选字 👂</button>
            <button className="btn-challenge btn-challenge-alt" onClick={() => startGame('catch')}>接水果 🍎</button>
          </>
        )}
      </div>
    </div>
  );
}
