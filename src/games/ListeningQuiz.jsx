import { useState, useEffect, useRef, useCallback } from 'react';
import { shuffle } from '../utils/shuffle';
import './ListeningQuiz.css';

const MASCOT_IDLE = '应该选哪个呢？🤔';
const MASCOT_CORRECT = '你太棒了！🌟';
const MASCOT_WRONG = '好像不对，再接再厉 💪';

export default function ListeningQuiz({ level, sound, onComplete, onProgress }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedPy, setSelectedPy] = useState(null);
  const [correctPy, setCorrectPy] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [options, setOptions] = useState([]);
  const [mascotMsg, setMascotMsg] = useState(MASCOT_IDLE);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const items = shuffle([...level.items]);
    setQuestions(items.slice(0, Math.min(8, items.length)));
  }, [level]);

  // Generate options once when current question changes
  useEffect(() => {
    if (questions.length === 0 || current >= questions.length) return;
    const q = questions[current];
    const wrongs = shuffle(level.items.filter(it => it.py !== q.py)).slice(0, 3);
    setOptions(shuffle([q, ...wrongs]));
  }, [current, questions, level.items]);

  const total = questions.length;

  useEffect(() => {
    if (onProgress && total > 0) {
      onProgress(current, total, score);
    }
  }, [current, total, score, onProgress]);

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

  useEffect(() => {
    if (questions.length > 0 && current >= total) {
      onComplete(score, total);
    }
  }, [current, total, questions.length, score, onComplete]);

  const handleAnswer = (opt) => {
    if (answered || current >= total) return;
    setAnswered(true);
    const q = questions[current];
    setSelectedPy(opt.py);
    setCorrectPy(q.py);

    if (opt.py === q.py) {
      sound.correct();
      setScore(prev => prev + 1);
      setMascotMsg(MASCOT_CORRECT);
    } else {
      sound.wrong();
      setMascotMsg(MASCOT_WRONG);
    }

    setTimeout(() => {
      setAnswered(false);
      setSelectedPy(null);
      setCorrectPy(null);
      setMascotMsg(MASCOT_IDLE);
      setCurrent(prev => prev + 1);
    }, 1200);
  };

  if (questions.length === 0 || current >= total || options.length === 0) return null;

  return (
    <>
      <div className="quiz-prompt">听一听，选出正确的拼音</div>
      <button
        className={`quiz-speaker${playing ? ' playing' : ''}`}
        onClick={playAudio}
      >
        🔊
      </button>
      <div className="quiz-options">
        {options.map((opt, i) => {
          const displayPy = opt.py.includes('=') ? opt.py.split('=')[1].trim() : opt.py;
          let cls = 'quiz-option';
          if (answered) {
            if (opt.py === correctPy) cls += ' correct';
            else if (opt.py === selectedPy) cls += ' wrong';
          }
          return (
            <button
              key={i}
              className={cls}
              data-py={opt.py}
              onClick={() => handleAnswer(opt)}
            >
              {displayPy}
            </button>
          );
        })}
      </div>
      <div className="quiz-mascot">
        <img src="/mascot.png" alt="" className="quiz-mascot-img" />
        <div className="quiz-mascot-bubble">{mascotMsg}</div>
      </div>
    </>
  );
}
