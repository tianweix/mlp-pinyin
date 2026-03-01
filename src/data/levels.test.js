import { describe, it, expect } from 'vitest';
import LEVELS from '../data/levels';

describe('levels data integrity', () => {
  it('exports an array of 5 levels', () => {
    expect(Array.isArray(LEVELS)).toBe(true);
    expect(LEVELS).toHaveLength(5);
  });

  it('each level has required fields', () => {
    LEVELS.forEach((level) => {
      expect(level).toHaveProperty('id');
      expect(level).toHaveProperty('title');
      expect(level).toHaveProperty('subtitle');
      expect(level).toHaveProperty('icon');
      expect(level).toHaveProperty('color');
      expect(level).toHaveProperty('bg');
      expect(level).toHaveProperty('items');
      expect(typeof level.id).toBe('number');
      expect(typeof level.title).toBe('string');
      expect(Array.isArray(level.items)).toBe(true);
      expect(level.items.length).toBeGreaterThan(0);
    });
  });

  it('each level has sequential IDs from 1 to 5', () => {
    const ids = LEVELS.map((l) => l.id);
    expect(ids).toEqual([1, 2, 3, 4, 5]);
  });

  it('each item has required fields', () => {
    LEVELS.forEach((level) => {
      level.items.forEach((item, i) => {
        expect(item).toHaveProperty('py');
        expect(item).toHaveProperty('sound');
        expect(item).toHaveProperty('word');
        expect(item).toHaveProperty('emoji');
        expect(item).toHaveProperty('tip');
        expect(typeof item.py).toBe('string');
        expect(typeof item.sound).toBe('string');
      });
    });
  });

  it('each item has precomputed audio paths', () => {
    LEVELS.forEach((level) => {
      level.items.forEach((item, i) => {
        expect(item._audio).toBe(`/audio/${level.id}_${i}.mp3`);
        expect(item._audioW).toBe(`/audio/${level.id}_${i}_w.mp3`);
      });
    });
  });

  it('level 1 (声母森林) has 23 consonants', () => {
    expect(LEVELS[0].items).toHaveLength(23);
  });

  it('level 2 (韵母海洋) has 24 vowels', () => {
    expect(LEVELS[1].items).toHaveLength(24);
  });

  it('level 3 (认读高山) has 16 whole syllables', () => {
    expect(LEVELS[2].items).toHaveLength(16);
  });

  it('level 4 (声调彩虹) has 12 tone items', () => {
    expect(LEVELS[3].items).toHaveLength(12);
  });

  it('level 5 (拼读城堡) has 12 blending items', () => {
    expect(LEVELS[4].items).toHaveLength(12);
  });

  it('has no duplicate pinyin within a level', () => {
    LEVELS.forEach((level) => {
      const pinyins = level.items.map((item) => item.py);
      expect(new Set(pinyins).size).toBe(pinyins.length);
    });
  });
});
