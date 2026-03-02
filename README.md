# 拼音乐园 🦄

和小马宝莉一起学拼音！一款面向儿童的汉语拼音互动学习 Web 应用。

## 功能特色

- **5 个闯关关卡**，循序渐进覆盖拼音全体系
- **趣味小游戏**：听音选字、接水果、声调练习
- **真人发音音频** + 例词朗读
- **星星积分** 激励系统，进度自动保存
- 小马宝莉主题，适合儿童使用

## 关卡内容

| 关卡 | 主题 | 内容 |
|------|------|------|
| 🌲 声母森林 | 学习声母 | b p m f d t n l g k h j q x zh ch sh r z c s y w |
| 🌊 韵母海洋 | 学习韵母 | a o e i u ü 及复韵母、鼻韵母 |
| 🏔️ 认读高山 | 整体认读音节 | zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying |
| 🌈 声调彩虹 | 四声练习 | 以 b m d 为例练习一二三四声 |
| 🏰 拼读城堡 | 声母+韵母拼读 | 两拼、三拼音节综合练习 |

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
# 从 purpleculture.net 和 GitHub 下载标准拼音 MP3
python scripts/download_audio.py

# 用 Azure Neural TTS 生成例词音频（_w 文件）
python scripts/generate_audio.py
```

> 需要 Python 3 和网络连接。生成的文件保存到 `public/audio/`。

## 技术栈

- **React 19** + **Vite 6**
- 无路由，无状态管理库
- 音频：原生 `<audio>` 元素 + Web Audio API
- 进度存储：`localStorage`（key: `pinyin-progress`）

## 项目结构

```
src/
├── context/AppContext.jsx   # 全局状态（唯一数据源）
├── data/levels.js           # 所有关卡内容（修改内容只需改这里）
├── screens/                 # 各页面（welcome → map → learn → game → reward）
├── games/                   # 小游戏组件
│   ├── ListeningQuiz.jsx    # 听音选字（默认）
│   ├── CatchFruitGame.jsx   # 接水果
│   └── ToneGame.jsx         # 声调练习（第4关专用）
├── hooks/
│   ├── useSound.js          # 音频播放
│   └── useProgress.js       # 进度管理
└── components/              # 通用 UI 组件
```

## 添加/修改内容

只需编辑 `src/data/levels.js`，然后重新运行音频脚本即可。每条内容包含：

```js
{ py, sound, word, emoji, tip }
// py: 拼音  sound: 汉字  word: 例词  emoji: 图标  tip: 发音提示
```
