import { useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import getLevels from '../data/getLevels';
import MapNode from '../components/MapNode';
import './MapScreen.css';

const NODE_POS = [
  { x: 10, y: 68 },
  { x: 30, y: 35 },
  { x: 52, y: 65 },
  { x: 74, y: 30 },
  { x: 92, y: 60 },
];

const LEVEL_LABELS = ['第一关', '第二关', '第三关', '第四关', '第五关'];
const MODE_TITLES = { pinyin: '拼音乐园', hanzi: '汉字乐园', english: '英语乐园' };

export default function MapScreen({ active }) {
  const { learningMode, progress, sound, enterLevel, backToModeSelect } = useApp();
  const levels = getLevels(learningMode);
  const scrollRef = useRef(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    if (active && scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [active]);

  // Mouse drag to scroll
  const onMouseDown = useCallback((e) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.clientX, scrollLeft: el.scrollLeft };
    el.classList.add('dragging');
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragState.current.dragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    const dx = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.scrollLeft - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    dragState.current.dragging = false;
    scrollRef.current?.classList.remove('dragging');
  }, []);

  // Wheel scroll (vertical wheel → horizontal scroll)
  const onWheel = useCallback((e) => {
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY + e.deltaX;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Passive: false needed for preventDefault in wheel
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  const handleNodeSelect = (level) => {
    if (dragState.current.dragging) return;
    sound.click();
    enterLevel(level);
  };

  return (
    <div id="screen-map" className={`screen${active ? ' active' : ''}`}>
      <div className="map-header">
        <button className="map-back-btn" onClick={backToModeSelect}>&#8592;</button>
        <div className="map-title">{MODE_TITLES[learningMode] || '冒险地图'}</div>
        <div className="star-count">⭐ {progress.stars}</div>
      </div>
      <div
        className="map-scroll"
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="map-landscape">
          <svg className="map-path-svg" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <defs>
              <filter id="path-shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,.2)" />
              </filter>
            </defs>
            <path
              className="map-road"
              d="M 60,280 C 140,280 180,140 300,140 C 420,140 440,270 560,270 C 680,270 720,120 820,120 C 920,120 960,250 1060,250"
              filter="url(#path-shadow)"
            />
            <path
              className="map-road-line"
              d="M 60,280 C 140,280 180,140 300,140 C 420,140 440,270 560,270 C 680,270 720,120 820,120 C 920,120 960,250 1060,250"
            />
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

          {/* Animated floating decorations */}
          <div className="map-float f1">🦋</div>
          <div className="map-float f2">🦋</div>
          <div className="map-float f3">💖</div>
          <div className="map-float f4">💫</div>
          <div className="map-float f5">✨</div>
          <div className="map-float f6">🌟</div>
          <div className="map-float f7">💕</div>
          <div className="map-float f8">🦋</div>
          <div className="map-float f9">⭐</div>
          <div className="map-float f10">💖</div>

          {levels.map((lv, i) => {
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
                <div className="map-node-label">{LEVEL_LABELS[i]}</div>
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
