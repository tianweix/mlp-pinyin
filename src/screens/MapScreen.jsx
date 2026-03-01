import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import LEVELS from '../data/levels';
import MapNode from '../components/MapNode';
import './MapScreen.css';

// Node positions along the winding path (x%, y%)
const NODE_POS = [
  { x: 10, y: 68 },
  { x: 30, y: 35 },
  { x: 52, y: 65 },
  { x: 74, y: 30 },
  { x: 92, y: 60 },
];

export default function MapScreen({ active }) {
  const { progress, sound, enterLevel } = useApp();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (active && scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [active]);

  const handleNodeSelect = (level) => {
    sound.click();
    enterLevel(level);
  };

  return (
    <div id="screen-map" className={`screen${active ? ' active' : ''}`}>
      <div className="map-header">
        <div className="map-title">冒险地图</div>
        <div className="star-count">⭐ {progress.stars}</div>
      </div>
      <div className="map-scroll" ref={scrollRef}>
        <div className="map-landscape">
          {/* Winding path SVG */}
          <svg className="map-path-svg" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <defs>
              <filter id="path-shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,.2)" />
              </filter>
            </defs>
            {/* Main winding path */}
            <path
              className="map-road"
              d="M 60,280 C 140,280 180,140 300,140 C 420,140 440,270 560,270 C 680,270 720,120 820,120 C 920,120 960,250 1060,250"
              filter="url(#path-shadow)"
            />
            <path
              className="map-road-line"
              d="M 60,280 C 140,280 180,140 300,140 C 420,140 440,270 560,270 C 680,270 720,120 820,120 C 920,120 960,250 1060,250"
            />
            {/* Pebbles along the path */}
            {[100,170,230,350,410,480,520,620,690,760,870,930,1000].map((cx, i) => {
              const pathY = i < 3 ? 260 - i * 40 : i < 6 ? 160 + (i - 3) * 35 : i < 9 ? 250 - (i - 6) * 40 : i < 11 ? 140 + (i - 9) * 35 : 240;
              return (
                <ellipse
                  key={i}
                  className="map-pebble"
                  cx={cx + (Math.sin(i * 7) * 15)}
                  cy={pathY + (Math.cos(i * 5) * 12)}
                  rx={3 + (i % 3) * 1.5}
                  ry={2 + (i % 2) * 1}
                  opacity={0.3 + (i % 3) * 0.15}
                />
              );
            })}
          </svg>

          {/* Decorative elements */}
          <div className="map-deco tree1">🌳</div>
          <div className="map-deco tree2">🌲</div>
          <div className="map-deco tree3">🌴</div>
          <div className="map-deco flower1">🌻</div>
          <div className="map-deco flower2">🌷</div>
          <div className="map-deco flower3">🌼</div>
          <div className="map-deco bush1">🌿</div>
          <div className="map-deco bush2">☘️</div>
          <div className="map-deco rock1">🪨</div>
          <div className="map-deco rock2">🪨</div>
          <div className="map-deco stream1">💧</div>
          <div className="map-deco stream2">💧</div>
          <div className="map-deco butterfly">🦋</div>

          {/* Level nodes */}
          {LEVELS.map((lv, i) => {
            const isCompleted = progress.completed.includes(lv.id);
            const isUnlocked = lv.id === 1 || progress.completed.includes(lv.id - 1);
            const stars = progress.levelStars[lv.id] || 0;
            const pos = NODE_POS[i];

            return (
              <div
                key={lv.id}
                className="map-node-wrapper"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <MapNode
                  level={lv}
                  isCompleted={isCompleted}
                  isUnlocked={isUnlocked}
                  stars={stars}
                  onSelect={() => handleNodeSelect(lv)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
