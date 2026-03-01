import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useConfetti } from '../components/ConfettiContainer';
import './RewardScreen.css';

const MSGS = ['太棒了！你真厉害！', '好厉害呀！继续加油！', '非常不错！你在进步！', '真了不起！'];
const SUBS = ['小马宝莉为你骄傲！', '再接再厉，你是最棒的！', '坚持就是胜利！', '你已经是拼音小达人了！'];

export default function RewardScreen({ active }) {
  const { gameResult, sound, navigate } = useApp();
  const fireConfetti = useConfetti();

  useEffect(() => {
    if (active && fireConfetti) {
      fireConfetti();
    }
  }, [active, fireConfetti]);

  const handleContinue = () => {
    sound.click();
    navigate('map');
  };

  const stars = gameResult?.stars || 0;
  const score = gameResult?.score || 0;
  const total = gameResult?.total || 0;
  const msg = MSGS[Math.floor(Math.random() * MSGS.length)];
  const sub = SUBS[Math.floor(Math.random() * SUBS.length)];

  return (
    <div id="screen-reward" className={`screen${active ? ' active' : ''}`}>
      <div className="reward-stars">
        {Array.from({ length: stars }, (_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
      <div className="reward-msg">{msg}</div>
      <div className="reward-sub">答对了 {score}/{total} · {sub}</div>
      <button className="btn-continue" onClick={handleContinue}>
        继续冒险 →
      </button>
    </div>
  );
}
