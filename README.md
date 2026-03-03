# 学习乐园 🦄

和小马宝莉一起学习吧！一款面向 5-6 岁儿童的互动学习 Web 应用，支持**学拼音**、**学汉字**、**学英语**三大模式。

## 功能特色

- **三大学习模式**：拼音、汉字、英语，各含 5 个闯关关卡
- **趣味小游戏**：听音选字、接水果、声调练习
- **真人级发音**：Azure Neural TTS 生成的高质量音频
- **星星积分** 激励系统，各模式进度独立保存
- 小马宝莉主题，适合儿童使用

## 关卡内容

### 📝 学拼音

| 关卡 | 主题 | 内容 |
|------|------|------|
| 🌲 声母森林 | 学习声母 | b p m f d t n l g k h j q x zh ch sh r z c s y w |
| 🌊 韵母海洋 | 学习韵母 | a o e i u ü 及复韵母、鼻韵母 |
| 🏔️ 认读高山 | 整体认读音节 | zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying |
| 🌈 声调彩虹 | 四声练习 | 以 b m d 为例练习一二三四声 |
| 🏰 拼读城堡 | 声母+韵母拼读 | 两拼、三拼音节综合练习 |

### 📖 学汉字

| 关卡 | 主题 | 内容 |
|------|------|------|
| 🔢 数字天地 | 学习数字 | 一 二 三 四 五 六 七 八 九 十 |
| 🧒 人体认识 | 身体部位 | 人 口 耳 目 手 足 大 小 |
| 🌿 自然世界 | 自然汉字 | 日 月 水 火 山 石 田 土 木 花 |
| 🐾 动物乐园 | 动物汉字 | 马 牛 羊 鸟 鱼 虫 狗 猫 鸡 鸭 |
| 🏠 日常生活 | 日常汉字 | 上 下 左 右 前 后 多 少 |

### 🌍 学英语

| 关卡 | 主题 | 内容 |
|------|------|------|
| 🍎 水果乐园 | 水果英语 | Apple Banana Orange Grape Peach Pear Mango Berry |
| 🐶 动物王国 | 动物英语 | Cat Dog Bird Fish Pig Cow Duck Hen Horse Sheep |
| 🌈 颜色世界 | 颜色英语 | Red Blue Green Yellow Pink Purple White Black Brown Gray |
| 🖐️ 身体部位 | 身体英语 | Hand Eye Ear Nose Mouth Head Leg Foot |
| 🔢 数字乐园 | 数字英语 | One Two Three Four Five Six Seven Eight Nine Ten |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

## 测试

```bash
# 运行所有测试
npm test

# 监听模式（文件变化时自动重跑）
npx vitest

# 生成覆盖率报告（终端 + HTML，自动在浏览器打开）
npm run coverage
```

## 音频文件

```bash
# 拼音音频：从 purpleculture.net 和 GitHub 下载标准发音
python scripts/download_audio.py

# 拼音例词音频：Azure Neural TTS 生成
AZURE_SPEECH_KEY=<key> python scripts/generate_audio.py

# 汉字音频：Azure Neural TTS 生成（字音 + 例词）
AZURE_SPEECH_KEY=<key> python scripts/generate_hanzi_audio.py

# 英语音频：Azure Neural TTS 生成（英语发音 + 中文释义）
AZURE_SPEECH_KEY=<key> python scripts/generate_english_audio.py
```

> 需要 Python 3 和网络连接。生成的文件保存到 `public/audio/`。

## 技术栈

- **React 19** + **Vite 6**
- 无路由，无状态管理库
- 音频：原生 `<audio>` 元素 + Web Audio API
- 进度存储：`localStorage`（各模式独立，key: `learning-progress-{mode}`）

## 项目结构

```
src/
├── context/AppContext.jsx   # 全局状态（唯一数据源，含 learningMode）
├── data/
│   ├── levels.js            # 拼音关卡内容
│   ├── hanziLevels.js       # 汉字关卡内容
│   ├── englishLevels.js     # 英语关卡内容
│   └── getLevels.js         # 根据模式返回对应关卡数据
├── screens/                 # 各页面（welcome → map → learn → game → reward）
├── games/                   # 小游戏组件
│   ├── ListeningQuiz.jsx    # 听音选字（默认）
│   ├── CatchFruitGame.jsx   # 接水果
│   └── ToneGame.jsx         # 声调练习（拼音第4关专用）
├── hooks/
│   ├── useSound.js          # 音频播放
│   └── useProgress.js       # 进度管理（支持按模式隔离）
└── components/              # 通用 UI 组件
```

## 添加/修改内容

编辑对应模式的数据文件，然后重新运行对应的音频脚本：

- 拼音：`src/data/levels.js` → `scripts/download_audio.py` + `scripts/generate_audio.py`
- 汉字：`src/data/hanziLevels.js` → `scripts/generate_hanzi_audio.py`
- 英语：`src/data/englishLevels.js` → `scripts/generate_english_audio.py`

每条内容包含：

```js
{ py, sound, word, emoji, tip }
// py: 显示文本（拼音/汉字/英语单词）
// sound: 发音参考  word: 例词  emoji: 图标  tip: 学习提示
```
