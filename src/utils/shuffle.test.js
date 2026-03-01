import { describe, it, expect, vi } from 'vitest';
import { shuffle } from '../utils/shuffle';

describe('shuffle', () => {
  it('returns a new array, not the original', () => {
    const original = [1, 2, 3, 4, 5];
    const result = shuffle(original);
    expect(result).not.toBe(original);
  });

  it('preserves the same length', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr)).toHaveLength(arr.length);
  });

  it('contains all original elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result.sort()).toEqual(arr.sort());
  });

  it('does not mutate the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });

  it('handles empty arrays', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('handles single-element arrays', () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it('produces different orderings (statistical)', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set();
    for (let i = 0; i < 20; i++) {
      results.add(shuffle(arr).join(','));
    }
    // With 10 elements, we should get multiple different orderings in 20 trials
    expect(results.size).toBeGreaterThan(1);
  });
});
