import './PinyinCard.css';

export default function PinyinCard({ item, index, isViewed, onClick }) {
  const displayPy = item.py.includes('=') ? item.py.split('=')[1].trim() : item.py;

  return (
    <div
      className={`pinyin-card card-color-${index % 12}${isViewed ? ' viewed' : ''}`}
      onClick={onClick}
    >
      <div className="card-emoji">{item.emoji}</div>
      <div className="card-py">{displayPy}</div>
    </div>
  );
}
