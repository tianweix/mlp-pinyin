# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build to dist/
npm run preview   # Preview production build

# Regenerate audio files (requires Python 3, internet access, Azure Speech key)
python scripts/download_audio.py                        # Download standard pinyin MP3s from purpleculture.net and GitHub
AZURE_SPEECH_KEY=<key> python scripts/generate_audio.py          # Generate pinyin word audio via Azure TTS
AZURE_SPEECH_KEY=<key> python scripts/generate_hanzi_audio.py    # Generate hanzi character + word audio
AZURE_SPEECH_KEY=<key> python scripts/generate_english_audio.py  # Generate English word + Chinese meaning audio
```

## Architecture

**Stack:** React 19 + Vite 6, no router, no state management library.

### Screen Navigation

All screens live in `src/screens/` and are always mounted. Visibility is controlled by an `active` prop (`className="screen active"`). Navigation is managed entirely through `AppContext` — never via URL or React Router.

Screen flow: `welcome` (mode select) → `map` → `learn` → `game` → `reward` (then back to `map`)

### Learning Modes

The app supports three learning modes: **pinyin** (拼音), **hanzi** (汉字), **english** (英语). The user selects a mode on the welcome screen, which sets `learningMode` in context. All downstream screens (map, learn, game, reward) adapt based on the active mode.

### State Management

`src/context/AppContext.jsx` is the single source of truth. It composes:

- `useReducer` for screen/level/UI state (includes `learningMode`, `activeScreen`, `currentLevel`, `gameType`, etc.)
- `useSound` (`src/hooks/useSound.js`) — Audio playback using cached `<Audio>` elements + WebAudio API for sound effects
- `useProgress` (`src/hooks/useProgress.js`) — Star/completion tracking, persisted to `localStorage` under key `learning-progress-{mode}` (separate per mode)

Key actions: `SET_MODE`, `SHOW_SCREEN`, `SET_LEVEL`, `SET_GAME_TYPE`, `SET_GAME_RESULT`
Key callbacks: `selectMode`, `backToModeSelect`, `enterLevel`, `endGame`, `showBubble`

All screens and components consume state via `useApp()`.

### Content Data

Level data lives in `src/data/`:

- `levels.js` — 5 pinyin levels
- `hanziLevels.js` — 5 Chinese character levels
- `englishLevels.js` — 5 English word levels
- `getLevels.js` — resolver: `getLevels(mode)` returns the correct level array

All three data files share the same item shape:

- `py` — display text (pinyin / character / English word), `sound` — pronunciation reference, `word` — example word, `emoji`, `tip`
- `_audio` / `_audioW` — precomputed audio paths

**To add or modify content, edit the corresponding data file and regenerate its audio.**

### Games

Three mini-games in `src/games/`:

- `ListeningQuiz` — hear a sound, pick the correct answer (works for all modes)
- `CatchFruitGame` — falling fruit catching mechanic (works for all modes)
- `ToneGame` — tone discrimination (only for pinyin mode, level 4)

Games use `item.py` for display and `item._audio` for playback, so they work across all modes without modification. `LearnScreen` selects which game(s) to offer. `GameScreen` renders the chosen game via `gameType` from context.

### Audio Files

`public/audio/` contains MP3s:

- Pinyin: `{levelId}_{itemIndex}.mp3` and `_w.mp3`
- Hanzi: `hanzi_{levelId}_{itemIndex}.mp3` and `_w.mp3`
- English: `english_{levelId}_{itemIndex}.mp3` and `_w.mp3`

Scripts in `scripts/` download/generate these — they are not committed to git (see `.gitignore`).

### Styling

Each component has a co-located `.css` file. Global tokens and shared styles are in `src/styles/` (variables, animations, card colors, responsive breakpoints) and imported once in `src/main.jsx`.
