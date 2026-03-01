import { useApp } from '../context/AppContext';
import './MascotBubble.css';

export default function MascotBubble() {
  const { bubbleText } = useApp();

  if (!bubbleText) return null;

  return (
    <div className="mascot-bubble" id="mascot-bubble">
      <img className="mini-mascot" src="/mascot.png" alt="" />
      <div className="bubble">{bubbleText}</div>
    </div>
  );
}
