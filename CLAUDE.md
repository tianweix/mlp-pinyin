# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build to dist/
npm run preview   # Preview production build

# Regenerate audio files (requires Python 3, internet access)
python scripts/download_audio.py   # Download standard pinyin MP3s from purpleculture.net and GitHub
python scripts/generate_audio.py   # Generate audio via edge-tts (used for _w word files)
```

## Architecture

**Stack:** React 19 + Vite 6, no router, no state management library.

### Screen Navigation

All screens live in `src/screens/` and are always mounted. Visibility is controlled by an `active` prop (`className="screen active"`). Navigation is managed entirely through `AppContext` — never via URL or React Router.

Screen flow: `welcome` → `map` → `learn` → `game` → `reward` (then back to `map`)

### State Management

`src/context/AppContext.jsx` is the single source of truth. It composes:
- `useReducer` for screen/level/UI state
- `useSound` (`src/hooks/useSound.js`) — Audio playback using cached `<Audio>` elements + WebAudio API for sound effects
- `useProgress` (`src/hooks/useProgress.js`) — Star/completion tracking, persisted to `localStorage` under key `pinyin-progress`

All screens and components consume state via `useApp()`.

### Content Data

`src/data/levels.js` defines all 5 levels as a static array. Each item has:
- `py` — pinyin string, `sound` — Chinese character, `word` — example word, `emoji`, `tip`
- `_audio` / `_audioW` — precomputed audio paths (`/audio/{levelId}_{itemIndex}.mp3` and `_w.mp3`)

**To add or modify content, only edit `src/data/levels.js` and regenerate audio files.**

### Games

Three mini-games in `src/games/`:
- `ListeningQuiz` — hear a sound, pick the correct pinyin card (default for most levels)
- `CatchFruitGame` — falling fruit catching mechanic
- `ToneGame` — tone discrimination (only for level 4, 声调彩虹)

`LearnScreen` selects which game(s) to offer based on `currentLevel.id`. `GameScreen` renders the chosen game via `gameType` from context.

### Audio Files

`public/audio/` contains MP3s named `{levelId}_{itemIndex}.mp3` (pinyin sound) and `{levelId}_{itemIndex}_w.mp3` (example word). Scripts in `scripts/` download/generate these — they are not committed to git (see `.gitignore`).

### Styling

Each component has a co-located `.css` file. Global tokens and shared styles are in `src/styles/` (variables, animations, card colors, responsive breakpoints) and imported once in `src/main.jsx`.
