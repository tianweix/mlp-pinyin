import { useApp } from '../context/AppContext';
import MascotSvg from '../components/MascotSvg';
import './WelcomeScreen.css';

export default function WelcomeScreen({ active }) {
  const { sound, navigate, showBubble } = useApp();

  const handleStart = () => {
    sound.click();
    navigate('map');
    setTimeout(() => showBubble('欢迎来到拼音乐园！\n选择一个关卡开始吧～'), 500);
  };

  return (
    <div id="screen-welcome" className={`screen${active ? ' active' : ''}`}>
      <div className="mascot-container">
        <MascotSvg />
      </div>
      <div className="welcome-title">拼音乐园</div>
      <div className="welcome-sub">和小熊猫一起学拼音吧！</div>
      <button className="btn-start" onClick={handleStart}>
        开始冒险
        <div className="shine" />
      </button>
    </div>
  );
}
