import PINYIN_LEVELS from './levels';
import HANZI_LEVELS from './hanziLevels';
import ENGLISH_LEVELS from './englishLevels';

const LEVELS_BY_MODE = {
  pinyin: PINYIN_LEVELS,
  hanzi: HANZI_LEVELS,
  english: ENGLISH_LEVELS,
};

export default function getLevels(mode) {
  return LEVELS_BY_MODE[mode] || PINYIN_LEVELS;
}
