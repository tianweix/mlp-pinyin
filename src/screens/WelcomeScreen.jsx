import { useApp } from '../context/AppContext';
import './WelcomeScreen.css';

export default function WelcomeScreen({ active }) {
  const { sound, selectMode } = useApp();

  const handleSelectMode = (mode) => {
    sound.click();
    selectMode(mode);
  };

  return (
    <div id="screen-welcome" className={`screen${active ? ' active' : ''}`}>
      <div className="mascot-container">
        <img src="/mascot.png" alt="Twilight Sparkle" className="mascot-img" />
      </div>
      <div className="welcome-title">学习乐园</div>
      <div className="welcome-sub">和小马宝莉一起学习吧！</div>
      <div className="mode-buttons">
        <button className="btn-mode btn-mode-pinyin" onClick={() => handleSelectMode('pinyin')}>
          学拼音
          <span className="mode-icon">📝</span>
          <div className="shine" />
        </button>
        <button className="btn-mode btn-mode-hanzi" onClick={() => handleSelectMode('hanzi')}>
          学汉字
          <span className="mode-icon">📖</span>
          <div className="shine" />
        </button>
        <button className="btn-mode btn-mode-english" onClick={() => handleSelectMode('english')}>
          学英语
          <span className="mode-icon">🌍</span>
          <div className="shine" />
        </button>
      </div>
    </div>
  );
}
