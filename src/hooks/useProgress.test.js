import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgress } from '../hooks/useProgress';

describe('useProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default progress when localStorage is empty', () => {
    const { result } = renderHook(() => useProgress('pinyin'));
    expect(result.current.progress).toEqual({
      stars: 0,
      completed: [],
      levelStars: {},
    });
  });

  it('loads saved progress from localStorage', () => {
    const saved = { stars: 5, completed: [1, 2], levelStars: { 1: 3, 2: 2 } };
    localStorage.setItem('learning-progress-pinyin', JSON.stringify(saved));

    const { result } = renderHook(() => useProgress('pinyin'));
    expect(result.current.progress).toEqual(saved);
  });

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('learning-progress-pinyin', 'not-json');

    const { result } = renderHook(() => useProgress('pinyin'));
    expect(result.current.progress).toEqual({
      stars: 0,
      completed: [],
      levelStars: {},
    });
  });

  it('handles localStorage with missing stars field', () => {
    localStorage.setItem('learning-progress-pinyin', JSON.stringify({ foo: 'bar' }));

    const { result } = renderHook(() => useProgress('pinyin'));
    expect(result.current.progress).toEqual({
      stars: 0,
      completed: [],
      levelStars: {},
    });
  });

  it('recordGameResult adds stars and marks level completed', () => {
    const { result } = renderHook(() => useProgress('pinyin'));

    act(() => {
      result.current.recordGameResult(1, 3);
    });

    expect(result.current.progress.stars).toBe(3);
    expect(result.current.progress.completed).toContain(1);
    expect(result.current.progress.levelStars[1]).toBe(3);
  });

  it('recordGameResult only adds star difference when improving', () => {
    const { result } = renderHook(() => useProgress('pinyin'));

    act(() => {
      result.current.recordGameResult(1, 2);
    });
    expect(result.current.progress.stars).toBe(2);

    act(() => {
      result.current.recordGameResult(1, 3);
    });
    // Should add only 1 more star (3 - 2 = 1)
    expect(result.current.progress.stars).toBe(3);
    expect(result.current.progress.levelStars[1]).toBe(3);
  });

  it('recordGameResult does not reduce stars on worse replay', () => {
    const { result } = renderHook(() => useProgress('pinyin'));

    act(() => {
      result.current.recordGameResult(1, 3);
    });

    act(() => {
      result.current.recordGameResult(1, 1);
    });

    // Stars should not decrease, levelStars should keep the max
    expect(result.current.progress.stars).toBe(3);
    expect(result.current.progress.levelStars[1]).toBe(3);
  });

  it('recordGameResult does not duplicate level in completed list', () => {
    const { result } = renderHook(() => useProgress('pinyin'));

    act(() => {
      result.current.recordGameResult(1, 2);
    });
    act(() => {
      result.current.recordGameResult(1, 3);
    });

    const count = result.current.progress.completed.filter((id) => id === 1).length;
    expect(count).toBe(1);
  });

  it('tracks multiple levels independently', () => {
    const { result } = renderHook(() => useProgress('pinyin'));

    act(() => {
      result.current.recordGameResult(1, 2);
    });
    act(() => {
      result.current.recordGameResult(2, 3);
    });

    expect(result.current.progress.stars).toBe(5);
    expect(result.current.progress.completed).toEqual([1, 2]);
    expect(result.current.progress.levelStars[1]).toBe(2);
    expect(result.current.progress.levelStars[2]).toBe(3);
  });

  it('persists progress to localStorage', () => {
    const { result } = renderHook(() => useProgress('pinyin'));

    act(() => {
      result.current.recordGameResult(1, 3);
    });

    const stored = JSON.parse(localStorage.getItem('learning-progress-pinyin'));
    expect(stored.stars).toBe(3);
    expect(stored.completed).toContain(1);
  });
});
