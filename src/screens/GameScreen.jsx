import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import ListeningQuiz from '../games/ListeningQuiz';
import CatchFruitGame from '../games/CatchFruitGame';
import ToneGame from '../games/ToneGame';
import './GameScreen.css';

export default function GameScreen({ active }) {
  const { currentLevel, gameType, sound, navigate, endGame } = useApp();
  const [score, setScore] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [progressText, setProgressText] = useState('');

  const handleBack = () => {
    sound.click();
    navigate('learn');
  };

  const handleProgress = useCallback((current, total, currentScore) => {
    setScore(currentScore);
    setProgressValue(current / total * 100);
    setProgressText(`${current + 1}/${total}`);
  }, []);

  const handleComplete = useCallback((finalScore, total) => {
    if (currentLevel) {
      endGame(finalScore, total, currentLevel.id);
    }
  }, [currentLevel, endGame]);

  const gameTitle = gameType === 'tone' ? '🌈 声调挑战' :
                    gameType === 'catch' ? '🍎 接水果' :
                    '👂 听音选字';

  const renderGame = () => {
    if (!currentLevel || !active) return null;

    const commonProps = {
      level: currentLevel,
      sound,
      onComplete: handleComplete,
      onProgress: handleProgress,
    };

    switch (gameType) {
      case 'tone':
        return <ToneGame key={currentLevel.id + '-tone'} {...commonProps} />;
      case 'catch':
        return <CatchFruitGame key={currentLevel.id + '-catch'} {...commonProps} />;
      case 'quiz':
      default:
        return <ListeningQuiz key={currentLevel.id + '-quiz'} {...commonProps} />;
    }
  };

  return (
    <div id="screen-game" className={`screen${active ? ' active' : ''}`}>
      <div className="game-header">
        <button className="btn-back" onClick={handleBack}>&#8592;</button>
        <div className="game-title">{gameTitle}</div>
        <div className="game-score">⭐ {score}</div>
      </div>
      <div className="game-progress">
        <ProgressBar value={progressValue} />
        <div className="game-progress-text">{progressText}</div>
      </div>
      <div className="game-content">
        {renderGame()}
      </div>
    </div>
  );
}
