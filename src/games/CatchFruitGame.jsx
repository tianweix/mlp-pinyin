import { useState, useEffect, useRef, useCallback } from 'react';
import { shuffle } from '../utils/shuffle';
import './CatchFruitGame.css';

const FRUITS = ['🍎', '🍊', '🍇', '🍓', '🍑', '🥝', '🍌', '🍉'];
const BGS = [
  'linear-gradient(135deg,#FF6B6B,#ee5a24)',
  'linear-gradient(135deg,#FF9800,#F57C00)',
  'linear-gradient(135deg,#9C27B0,#7B1FA2)',
  'linear-gradient(135deg,#E91E63,#C2185B)',
];

export default function CatchFruitGame({ level, sound, onComplete, onProgress }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const answeredRef = useRef(false);
  const areaRef = useRef(null);
  const initialized = useRef(false);
  const scoreRef = useRef(0);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const items = shuffle([...level.items]);
    setQuestions(items.slice(0, Math.min(8, items.length)));
  }, [level]);

  const total = questions.length;

  useEffect(() => {
    if (onProgress && total > 0) {
      onProgress(current, total, score);
    }
  }, [current, total, score, onProgress]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (questions.length > 0 && current >= total) {
      onComplete(scoreRef.current, total);
    }
  }, [current, total, questions.length, onComplete]);

  const playAudio = useCallback(() => {
    if (!questions[current]) return;
    setPlaying(true);
    sound.speakSound(questions[current]);
    setTimeout(() => setPlaying(false), 1200);
  }, [questions, current, sound]);

  const spawnFruits = useCallback(() => {
    const area = areaRef.current;
    if (!area || current >= total) return;

    const q = questions[current];
    const allItems = level.items.filter(it => it.py !== q.py);
    const wrongs = shuffle(allItems).slice(0, 3);
    const options = shuffle([q, ...wrongs]);

    // Clear previous fruits
    area.innerHTML = '';
    answeredRef.current = false;

    const W = area.offsetWidth;

    options.forEach((opt, i) => {
      const el = document.createElement('div');
      el.className = 'fall-item';
      const itemW = Math.min(85, W * 0.18);
      const spacing = W / (options.length + 1);
      const left = spacing * (i + 1) - itemW / 2;
      el.style.left = left + 'px';
      el.style.setProperty('--fall-dur', (5 + Math.random() * 1.5) + 's');
      el.style.setProperty('--fall-delay', (i * 0.3) + 's');
      el.style.background = BGS[i % BGS.length];
      el.style.animation = `fall-down var(--fall-dur) linear var(--fall-delay) forwards, fall-sway 2.5s ease-in-out ${Math.random()}s infinite`;

      const displayPy = opt.py.includes('=') ? opt.py.split('=')[1].trim() : opt.py;
      el.innerHTML = `<div class="fruit-emoji">${FRUITS[(i + current) % FRUITS.length]}</div><div class="fruit-py">${displayPy}</div>`;

      el.addEventListener('click', () => {
        if (answeredRef.current) return;
        if (opt.py === q.py) {
          answeredRef.current = true;
          el.classList.add('caught');
          sound.correct();
          setScore(prev => {
            const newScore = prev + 1;
            scoreRef.current = newScore;
            return newScore;
          });

          // Sparkle effect
          for (let s = 0; s < 5; s++) {
            const sp = document.createElement('div');
            sp.className = 'catch-sparkle';
            sp.textContent = '⭐';
            sp.style.left = (parseFloat(el.style.left) + Math.random() * 60 - 10) + 'px';
            sp.style.top = (el.offsetTop + Math.random() * 40) + 'px';
            sp.style.animationDelay = (s * 0.1) + 's';
            area.appendChild(sp);
            setTimeout(() => sp.remove(), 1000);
          }

          // Fade other items
          area.querySelectorAll('.fall-item').forEach(f => {
            if (f !== el) f.classList.add('faded');
          });

          setTimeout(() => {
            setCurrent(prev => prev + 1);
          }, 1200);
        } else {
          el.classList.add('wrong-catch');
          sound.wrong();
          setTimeout(() => el.classList.remove('wrong-catch'), 400);
        }
      });

      // If correct item falls off screen = missed
      el.addEventListener('animationend', (e) => {
        if (e.animationName !== 'fall-down') return;
        if (!answeredRef.current && opt.py === q.py) {
          answeredRef.current = true;
          sound.wrong();
          setTimeout(() => {
            setCurrent(prev => prev + 1);
          }, 800);
        }
        el.remove();
      });

      area.appendChild(el);
    });
  }, [current, questions, total, level.items, sound]);

  useEffect(() => {
    if (questions.length > 0 && current < total) {
      const audioTimer = setTimeout(() => {
        playAudio();
        setTimeout(() => spawnFruits(), 1000);
      }, 300);
      return () => clearTimeout(audioTimer);
    }
  }, [current, questions.length, total, playAudio, spawnFruits]);

  if (questions.length === 0 || current >= total) return null;

  return (
    <>
      <div className="catch-prompt">听发音，接住正确的水果！</div>
      <button
        className={`quiz-speaker${playing ? ' playing' : ''}`}
        onClick={playAudio}
      >
        🔊
      </button>
      <div className="fall-area" ref={areaRef} />
    </>
  );
}
