import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import LEVELS from '../data/levels';
import MapNode from '../components/MapNode';
import './MapScreen.css';

const POSITIONS = ['pos-center', 'pos-right', 'pos-center', 'pos-left', 'pos-center'];

export default function MapScreen({ active }) {
  const { progress, sound, enterLevel } = useApp();
  const screenRef = useRef(null);

  useEffect(() => {
    if (active && screenRef.current) {
      requestAnimationFrame(() => {
        screenRef.current.scrollTop = screenRef.current.scrollHeight;
      });
    }
  }, [active]);

  const handleNodeSelect = (level) => {
    sound.click();
    enterLevel(level);
  };

  return (
    <div
      id="screen-map"
      className={`screen${active ? ' active' : ''}`}
      ref={screenRef}
    >
      <div className="map-header">
        <div className="map-title">冒险地图</div>
        <div className="star-count">⭐ {progress.stars}</div>
      </div>
      <div className="map-path">
        {LEVELS.map((lv, i) => {
          const isCompleted = progress.completed.includes(lv.id);
          const isUnlocked = lv.id === 1 || progress.completed.includes(lv.id - 1);
          const stars = progress.levelStars[lv.id] || 0;

          return (
            <div key={lv.id}>
              {i > 0 && <div className="map-connector" />}
              <div className={`node-row ${POSITIONS[i]}`}>
                <MapNode
                  level={lv}
                  isCompleted={isCompleted}
                  isUnlocked={isUnlocked}
                  stars={stars}
                  onSelect={() => handleNodeSelect(lv)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
