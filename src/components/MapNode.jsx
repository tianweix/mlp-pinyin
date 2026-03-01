import './MapNode.css';

export default function MapNode({ level, isCompleted, isUnlocked, stars, onSelect }) {
  const stateClass = isCompleted ? 'completed' : isUnlocked ? 'unlocked' : 'locked';

  return (
    <div
      className={`map-node ${stateClass}`}
      style={{ background: level.bg }}
      onClick={(isUnlocked || isCompleted) ? onSelect : undefined}
    >
      <div className="node-icon">{level.icon}</div>
      <div className="node-title">{level.title}</div>
      {stars > 0 && (
        <div className="node-stars">
          {'⭐'.repeat(stars)}
        </div>
      )}
    </div>
  );
}
