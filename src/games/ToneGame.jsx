import { useState, useEffect, useRef, useCallback } from 'react';
import { shuffle } from '../utils/shuffle';
import './ToneGame.css';

const TONE_GROUPS = [
  ['bā', 'bá', 'bǎ', 'bà'],
  ['mā', 'má', 'mǎ', 'mà'],
  ['dā', 'dá', 'dǎ', 'dà'],
];

function stripTones(py) {
  return py
    .replace(/[āáǎà]/g, 'a')
    .replace(/[ēéěè]/g, 'e')
    .replace(/[īíǐì]/g, 'i')
    .replace(/[ōóǒò]/g, 'o')
    .replace(/[ūúǔù]/g, 'u')
    .replace(/[ǖǘǚǜ]/g, 'ü');
}

export default function ToneGame({ level, sound, onComplete, onProgress }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedTone, setSelectedTone] = useState(null);
  const [correctTone, setCorrectTone] = useState(null);
  const [playing, setPlaying] = useState(false);
  const initialized = useRef(false);
  const scoreRef = useRef(0);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const allQuestions = [];
    TONE_GROUPS.forEach(group => {
      group.forEach((tone) => {
        const item = level.items.find(it => it.py === tone);
        if (item) allQuestions.push({ ...item, group });
      });
    });
    const shuffled = shuffle(allQuestions);
    setQuestions(shuffled.slice(0, Math.min(8, shuffled.length)));
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

  useEffect(() => {
    if (questions.length > 0 && current < total && !answered) {
      const timer = setTimeout(() => playAudio(), 400);
      return () => clearTimeout(timer);
    }
  }, [current, questions.length, total, answered, playAudio]);

  const handleAnswer = (tone) => {
    if (answered || current >= total) return;
    setAnswered(true);
    const q = questions[current];
    setSelectedTone(tone);
    setCorrectTone(q.py);

    if (tone === q.py) {
      sound.correct();
      setScore(prev => {
        const newScore = prev + 1;
        scoreRef.current = newScore;
        return newScore;
      });
    } else {
      sound.wrong();
    }

    setTimeout(() => {
      setAnswered(false);
      setSelectedTone(null);
      setCorrectTone(null);
      setCurrent(prev => prev + 1);
    }, 1200);
  };

  if (questions.length === 0 || current >= total) return null;

  const q = questions[current];
  const base = stripTones(q.py);

  return (
    <>
      <div className="quiz-prompt">听声音，选出正确的声调</div>
      <button
        className={`quiz-speaker${playing ? ' playing' : ''}`}
        onClick={playAudio}
      >
        🔊
      </button>
      <div className="tone-display">{base}</div>
      <div className="tone-options">
        {q.group.map((tone, i) => {
          let cls = 'tone-btn';
          if (answered) {
            if (tone === correctTone) cls += ' correct';
            else if (tone === selectedTone) cls += ' wrong';
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => handleAnswer(tone)}
            >
              {tone}
            </button>
          );
        })}
      </div>
    </>
  );
}
