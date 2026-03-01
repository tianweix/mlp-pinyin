import { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import { useSound } from '../hooks/useSound';
import { useProgress } from '../hooks/useProgress';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_SCREEN':
      return { ...state, activeScreen: action.screen };
    case 'SET_LEVEL':
      return { ...state, currentLevel: action.level, viewedItems: new Set() };
    case 'VIEW_ITEM':
      return { ...state, viewedItems: new Set([...state.viewedItems, action.index]) };
    case 'SET_DETAIL_ITEM':
      return { ...state, detailItem: action.item };
    case 'SHOW_BUBBLE':
      return { ...state, bubbleText: action.text };
    case 'HIDE_BUBBLE':
      return { ...state, bubbleText: null };
    case 'SET_GAME_RESULT':
      return { ...state, gameResult: action.result };
    case 'SET_GAME_TYPE':
      return { ...state, gameType: action.gameType };
    default:
      return state;
  }
}

export const initialState = {
  activeScreen: 'welcome',
  currentLevel: null,
  viewedItems: new Set(),
  detailItem: null,
  bubbleText: null,
  gameResult: null,
  gameType: null,
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const sound = useSound();
  const { progress, recordGameResult } = useProgress();
  const bubbleTimer = useRef(null);

  const showBubble = useCallback((text) => {
    clearTimeout(bubbleTimer.current);
    dispatch({ type: 'SHOW_BUBBLE', text });
    bubbleTimer.current = setTimeout(() => dispatch({ type: 'HIDE_BUBBLE' }), 4500);
  }, []);

  const navigate = useCallback((screen) => {
    dispatch({ type: 'SHOW_SCREEN', screen });
    dispatch({ type: 'HIDE_BUBBLE' });
  }, []);

  const enterLevel = useCallback((level) => {
    dispatch({ type: 'SET_LEVEL', level });
    navigate('learn');
    setTimeout(() => showBubble(level.subtitle + '，点击卡片听发音哦！'), 400);
  }, [navigate, showBubble]);

  const endGame = useCallback((score, total, levelId) => {
    const ratio = score / total;
    let stars = ratio >= .9 ? 3 : ratio >= .6 ? 2 : 1;
    recordGameResult(levelId, stars);
    dispatch({ type: 'SET_GAME_RESULT', result: { score, total, stars } });
    navigate('reward');
    sound.celebrate();
  }, [recordGameResult, navigate, sound]);

  useEffect(() => () => clearTimeout(bubbleTimer.current), []);

  const value = {
    ...state, progress, sound, dispatch,
    navigate, enterLevel, showBubble, endGame, recordGameResult,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
