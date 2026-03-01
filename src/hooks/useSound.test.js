import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSound } from '../hooks/useSound';

// Track Audio instances created
const audioInstances = [];
const mockPlay = vi.fn(() => Promise.resolve());

vi.stubGlobal(
  'Audio',
  vi.fn(function (src) {
    this.src = src;
    this.currentTime = 0;
    this.onended = null;
    this.onerror = null;
    this.play = mockPlay;
    audioInstances.push(this);
  })
);

vi.stubGlobal(
  'AudioContext',
  vi.fn(function () {
    this.currentTime = 0;
    this.destination = {};
    this.createOscillator = vi.fn(() => ({
      connect: vi.fn(),
      frequency: { value: 0 },
      type: 'sine',
      start: vi.fn(),
      stop: vi.fn(),
    }));
    this.createGain = vi.fn(() => ({
      connect: vi.fn(),
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
    }));
  })
);

describe('useSound', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    audioInstances.length = 0;
  });

  it('returns all expected methods', () => {
    const { result } = renderHook(() => useSound());
    expect(result.current).toHaveProperty('playFile');
    expect(result.current).toHaveProperty('speakSound');
    expect(result.current).toHaveProperty('speakWord');
    expect(result.current).toHaveProperty('playTone');
    expect(result.current).toHaveProperty('correct');
    expect(result.current).toHaveProperty('wrong');
    expect(result.current).toHaveProperty('click');
    expect(result.current).toHaveProperty('celebrate');
  });

  it('all returned values are functions', () => {
    const { result } = renderHook(() => useSound());
    Object.values(result.current).forEach((val) => {
      expect(typeof val).toBe('function');
    });
  });

  it('playFile creates Audio with correct src', async () => {
    const { result } = renderHook(() => useSound());
    result.current.playFile('/audio/test.mp3');
    expect(Audio).toHaveBeenCalledWith('/audio/test.mp3');
  });

  it('speakSound uses item._audio path', () => {
    const { result } = renderHook(() => useSound());
    const item = { _audio: '/audio/1_0.mp3', _audioW: '/audio/1_0_w.mp3' };
    result.current.speakSound(item);
    expect(Audio).toHaveBeenCalledWith('/audio/1_0.mp3');
  });

  it('speakWord uses item._audioW path', () => {
    const { result } = renderHook(() => useSound());
    const item = { _audio: '/audio/1_0.mp3', _audioW: '/audio/1_0_w.mp3' };
    result.current.speakWord(item);
    expect(Audio).toHaveBeenCalledWith('/audio/1_0_w.mp3');
  });

  it('playTone creates AudioContext and oscillator', () => {
    const { result } = renderHook(() => useSound());
    result.current.playTone(440, 0.5);
    expect(AudioContext).toHaveBeenCalled();
  });

  it('correct, wrong, click, celebrate do not throw', () => {
    const { result } = renderHook(() => useSound());
    expect(() => result.current.correct()).not.toThrow();
    expect(() => result.current.wrong()).not.toThrow();
    expect(() => result.current.click()).not.toThrow();
    expect(() => result.current.celebrate()).not.toThrow();
  });

  it('playFile reuses cached Audio instance for same src', async () => {
    const { result } = renderHook(() => useSound());
    result.current.playFile('/audio/test.mp3');
    result.current.playFile('/audio/test.mp3');
    expect(Audio).toHaveBeenCalledTimes(1);
  });

  it('playTone falls back to webkitAudioContext when AudioContext is unavailable', () => {
    const original = global.AudioContext;
    global.AudioContext = undefined;
    const mockWebkit = vi.fn(function () {
      this.currentTime = 0;
      this.destination = {};
      this.createOscillator = vi.fn(() => ({
        connect: vi.fn(), frequency: { value: 0 }, type: 'sine',
        start: vi.fn(), stop: vi.fn(),
      }));
      this.createGain = vi.fn(() => ({
        connect: vi.fn(),
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      }));
    });
    global.webkitAudioContext = mockWebkit;

    const { result } = renderHook(() => useSound());
    result.current.playTone(440, 0.5);
    expect(mockWebkit).toHaveBeenCalled();

    global.AudioContext = original;
    delete global.webkitAudioContext;
  });
});
