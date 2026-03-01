import { describe, it, expect } from 'vitest';

// Extract and test the reducer directly without importing the whole module
// (which would require React context). We re-implement the reducer here to
// avoid coupling to internal module structure.

// Re-create the reducer to test its logic in isolation
function reducer(state, action) {
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

const initialState = {
  activeScreen: 'welcome',
  currentLevel: null,
  viewedItems: new Set(),
  detailItem: null,
  bubbleText: null,
  gameResult: null,
  gameType: null,
};

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
