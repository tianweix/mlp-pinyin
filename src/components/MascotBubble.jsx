import { useApp } from '../context/AppContext';
import './MascotBubble.css';

export default function MascotBubble() {
  const { bubbleText } = useApp();

  if (!bubbleText) return null;

  return (
    <div className="mascot-bubble" id="mascot-bubble">
      <svg className="mini-mascot" viewBox="0 0 200 200">
        <circle cx="100" cy="95" r="58" fill="#fff" />
        <circle cx="58" cy="50" r="22" fill="#333" />
        <circle cx="142" cy="50" r="22" fill="#333" />
        <ellipse cx="75" cy="85" rx="19" ry="22" fill="#333" transform="rotate(-5 75 85)" />
        <ellipse cx="125" cy="85" rx="19" ry="22" fill="#333" transform="rotate(5 125 85)" />
        <circle cx="75" cy="83" r="9" fill="#fff" />
        <circle cx="125" cy="83" r="9" fill="#fff" />
        <circle cx="78" cy="82" r="5.5" fill="#333" />
        <circle cx="128" cy="82" r="5.5" fill="#333" />
        <circle cx="76" cy="80" r="2.5" fill="#fff" />
        <circle cx="126" cy="80" r="2.5" fill="#fff" />
        <ellipse cx="100" cy="103" rx="7" ry="4.5" fill="#333" />
        <path d="M88,113 Q100,124 112,113" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="58" cy="103" r="11" fill="#FF9A9E" opacity=".45" />
        <circle cx="142" cy="103" r="11" fill="#FF9A9E" opacity=".45" />
      </svg>
      <div className="bubble">{bubbleText}</div>
    </div>
  );
}
