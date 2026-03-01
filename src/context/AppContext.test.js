import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { reducer, initialState, AppProvider, useApp } from '../context/AppContext';

const mockCelebrate = vi.fn();
vi.mock('../hooks/useSound', () => ({
  useSound: () => ({
    playFile: vi.fn(), speakSound: vi.fn(), speakWord: vi.fn(),
    playTone: vi.fn(), correct: vi.fn(), wrong: vi.fn(),
    click: vi.fn(), celebrate: mockCelebrate,
  }),
}));

const mockRecordGameResult = vi.fn();
vi.mock('../hooks/useProgress', () => ({
  useProgress: () => ({ progress: {}, recordGameResult: mockRecordGameResult }),
}));

describe('AppContext reducer', () => {
  it('has correct initial state shape', () => {
    expect(initialState.activeScreen).toBe('welcome');
    expect(initialState.currentLevel).toBeNull();
    expect(initialState.viewedItems).toBeInstanceOf(Set);
    expect(initialState.viewedItems.size).toBe(0);
    expect(initialState.detailItem).toBeNull();
    expect(initialState.bubbleText).toBeNull();
    expect(initialState.gameResult).toBeNull();
    expect(initialState.gameType).toBeNull();
  });

  it('SHOW_SCREEN updates activeScreen', () => {
    const state = reducer(initialState, { type: 'SHOW_SCREEN', screen: 'map' });
    expect(state.activeScreen).toBe('map');
  });

  it('SET_LEVEL updates currentLevel and resets viewedItems', () => {
    const level = { id: 1, title: 'Test Level' };
    const stateWithViewed = { ...initialState, viewedItems: new Set([0, 1, 2]) };
    const state = reducer(stateWithViewed, { type: 'SET_LEVEL', level });
    expect(state.currentLevel).toBe(level);
    expect(state.viewedItems.size).toBe(0);
  });

  it('VIEW_ITEM adds index to viewedItems', () => {
    const state1 = reducer(initialState, { type: 'VIEW_ITEM', index: 0 });
    expect(state1.viewedItems.has(0)).toBe(true);

    const state2 = reducer(state1, { type: 'VIEW_ITEM', index: 3 });
    expect(state2.viewedItems.has(0)).toBe(true);
    expect(state2.viewedItems.has(3)).toBe(true);
  });

  it('VIEW_ITEM does not duplicate indices', () => {
    const state1 = reducer(initialState, { type: 'VIEW_ITEM', index: 0 });
    const state2 = reducer(state1, { type: 'VIEW_ITEM', index: 0 });
    expect(state2.viewedItems.size).toBe(1);
  });

  it('SET_DETAIL_ITEM updates detailItem', () => {
    const item = { py: 'b', sound: '波' };
    const state = reducer(initialState, { type: 'SET_DETAIL_ITEM', item });
    expect(state.detailItem).toBe(item);
  });

  it('SET_DETAIL_ITEM can clear detailItem with null', () => {
    const withItem = { ...initialState, detailItem: { py: 'b' } };
    const state = reducer(withItem, { type: 'SET_DETAIL_ITEM', item: null });
    expect(state.detailItem).toBeNull();
  });

  it('SHOW_BUBBLE / HIDE_BUBBLE manage bubbleText', () => {
    const state1 = reducer(initialState, { type: 'SHOW_BUBBLE', text: '你好！' });
    expect(state1.bubbleText).toBe('你好！');

    const state2 = reducer(state1, { type: 'HIDE_BUBBLE' });
    expect(state2.bubbleText).toBeNull();
  });

  it('SET_GAME_RESULT updates gameResult', () => {
    const result = { score: 7, total: 8, stars: 3 };
    const state = reducer(initialState, { type: 'SET_GAME_RESULT', result });
    expect(state.gameResult).toEqual(result);
  });

  it('SET_GAME_TYPE updates gameType', () => {
    const state = reducer(initialState, { type: 'SET_GAME_TYPE', gameType: 'listening' });
    expect(state.gameType).toBe('listening');
  });

  it('unknown action returns state unchanged', () => {
    const state = reducer(initialState, { type: 'UNKNOWN' });
    expect(state).toBe(initialState);
  });
});

describe('AppProvider', () => {
  const wrapper = ({ children }) => React.createElement(AppProvider, null, children);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides context with initial state via useApp()', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.activeScreen).toBe('welcome');
    expect(result.current.currentLevel).toBeNull();
    expect(result.current.bubbleText).toBeNull();
  });

  it('navigate changes activeScreen and clears bubbleText', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.showBubble('hello'));
    act(() => result.current.navigate('map'));
    expect(result.current.activeScreen).toBe('map');
    expect(result.current.bubbleText).toBeNull();
  });

  it('showBubble sets bubbleText', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.showBubble('你好！'));
    expect(result.current.bubbleText).toBe('你好！');
  });

  it('showBubble auto-hides after 4500ms', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.showBubble('你好！'));
    expect(result.current.bubbleText).toBe('你好！');
    act(() => vi.advanceTimersByTime(4500));
    expect(result.current.bubbleText).toBeNull();
    vi.useRealTimers();
  });

  it('enterLevel sets currentLevel and navigates to learn', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const level = { id: 'level1', subtitle: '声母', items: [] };
    act(() => result.current.enterLevel(level));
    expect(result.current.currentLevel).toBe(level);
    expect(result.current.activeScreen).toBe('learn');
  });

  it('endGame with ≥90% score gives 3 stars and navigates to reward', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.endGame(9, 10, 'level1'));
    expect(result.current.gameResult).toEqual({ score: 9, total: 10, stars: 3 });
    expect(result.current.activeScreen).toBe('reward');
    expect(mockCelebrate).toHaveBeenCalled();
  });

  it('endGame with ≥60% score gives 2 stars', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.endGame(6, 10, 'level1'));
    expect(result.current.gameResult.stars).toBe(2);
  });

  it('endGame with <60% score gives 1 star', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.endGame(5, 10, 'level1'));
    expect(result.current.gameResult.stars).toBe(1);
  });

  it('endGame calls recordGameResult with levelId and stars', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.endGame(9, 10, 'level2'));
    expect(mockRecordGameResult).toHaveBeenCalledWith('level2', 3);
  });
});
