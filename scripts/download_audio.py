#!/usr/bin/env python3
"""Download standard human-recorded pinyin audio from online sources.

Sources:
- purpleculture.net: standalone initials & finals (teacher-recorded)
- davinfifield/mp3-chinese-pinyin-sound (GitHub, Unlicense/Public Domain): syllables with tones
- Example words: keep existing edge-tts generated files (natural enough for context)
"""
import urllib.request, os, sys
from concurrent.futures import ThreadPoolExecutor, as_completed

AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio')
PURPLE = 'https://www.purpleculture.net/mp3/{}.mp3'
GITHUB = 'https://raw.githubusercontent.com/davinfifield/mp3-chinese-pinyin-sound/master/mp3/{}.mp3'

# (local_filename, url) — only the pinyin SOUND files, not the _w word files
DOWNLOADS = [
    # ===== Level 1: 声母 (23) — from purpleculture (standalone initials) =====
    ('1_0',   PURPLE.format('b')),
    ('1_1',   PURPLE.format('p')),
    ('1_2',   PURPLE.format('m')),
    ('1_3',   PURPLE.format('f')),
    ('1_4',   PURPLE.format('d')),
    ('1_5',   PURPLE.format('t')),
    ('1_6',   PURPLE.format('n')),
    ('1_7',   PURPLE.format('l')),
    ('1_8',   PURPLE.format('g')),
    ('1_9',   PURPLE.format('k')),
    ('1_10',  PURPLE.format('h')),
    ('1_11',  PURPLE.format('j')),
    ('1_12',  PURPLE.format('q')),
    ('1_13',  PURPLE.format('x')),
    ('1_14',  PURPLE.format('zh')),
    ('1_15',  PURPLE.format('ch')),
    ('1_16',  PURPLE.format('sh')),
    ('1_17',  PURPLE.format('r')),
    ('1_18',  PURPLE.format('z')),
    ('1_19',  PURPLE.format('c')),
    ('1_20',  PURPLE.format('s')),
    ('1_21',  PURPLE.format('y')),
    ('1_22',  PURPLE.format('w')),

    # ===== Level 2: 韵母 (24) — from purpleculture (standalone finals) =====
    ('2_0',   PURPLE.format('a1')),     # a (use a1 since bare 'a' redirects)
    ('2_1',   PURPLE.format('o')),
    ('2_2',   PURPLE.format('e')),
    ('2_3',   PURPLE.format('i')),
    ('2_4',   PURPLE.format('u')),
    ('2_5',   PURPLE.format('v')),      # ü
    ('2_6',   PURPLE.format('ai')),
    ('2_7',   PURPLE.format('ei')),
    ('2_8',   PURPLE.format('ui')),
    ('2_9',   PURPLE.format('ao')),
    ('2_10',  PURPLE.format('ou')),
    ('2_11',  PURPLE.format('iu')),
    ('2_12',  PURPLE.format('ie')),
    ('2_13',  PURPLE.format('ve')),     # üe
    ('2_14',  PURPLE.format('er')),
    ('2_15',  PURPLE.format('an')),
    ('2_16',  PURPLE.format('en')),
    ('2_17',  PURPLE.format('in')),
    ('2_18',  PURPLE.format('un')),
    ('2_19',  PURPLE.format('vn')),     # ün
    ('2_20',  PURPLE.format('ang')),
    ('2_21',  PURPLE.format('eng')),
    ('2_22',  PURPLE.format('ing')),
    ('2_23',  PURPLE.format('ong')),

    # ===== Level 3: 整体认读 (16) — from GitHub (syllable + tone 1) =====
    ('3_0',   GITHUB.format('zhi1')),
    ('3_1',   GITHUB.format('chi1')),
    ('3_2',   GITHUB.format('shi1')),
    ('3_3',   GITHUB.format('ri4')),    # 日 is 4th tone
    ('3_4',   GITHUB.format('zi4')),    # 字 is 4th tone
    ('3_5',   GITHUB.format('ci4')),    # 刺 is 4th tone
    ('3_6',   GITHUB.format('si1')),
    ('3_7',   GITHUB.format('yi1')),
    ('3_8',   GITHUB.format('wu3')),    # 五 is 3rd tone
    ('3_9',   GITHUB.format('yu2')),    # 鱼 is 2nd tone
    ('3_10',  GITHUB.format('ye4')),    # 夜 is 4th tone
    ('3_11',  GITHUB.format('yue4')),   # 月 is 4th tone
    ('3_12',  GITHUB.format('yuan2')),  # 圆 is 2nd tone
    ('3_13',  GITHUB.format('yin1')),
    ('3_14',  GITHUB.format('yun2')),   # 云 is 2nd tone
    ('3_15',  GITHUB.format('ying1')),

    # ===== Level 4: 声调 (12) — from GitHub (syllable + specific tone) =====
    ('4_0',   GITHUB.format('ba1')),    # bā 八
    ('4_1',   GITHUB.format('ba2')),    # bá 拔
    ('4_2',   GITHUB.format('ba3')),    # bǎ 把
    ('4_3',   GITHUB.format('ba4')),    # bà 爸
    ('4_4',   GITHUB.format('ma1')),    # mā 妈
    ('4_5',   GITHUB.format('ma2')),    # má 麻
    ('4_6',   GITHUB.format('ma3')),    # mǎ 马
    ('4_7',   GITHUB.format('ma4')),    # mà 骂
    ('4_8',   GITHUB.format('da1')),    # dā 搭
    ('4_9',   GITHUB.format('da2')),    # dá 答
    ('4_10',  GITHUB.format('da3')),    # dǎ 打
    ('4_11',  GITHUB.format('da4')),    # dà 大

    # ===== Level 5: 拼读 (12) — from GitHub (combined syllable) =====
    ('5_0',   GITHUB.format('ba1')),    # 八 bā
    ('5_1',   GITHUB.format('ma1')),    # 妈 mā
    ('5_2',   GITHUB.format('he1')),    # 喝 hē
    ('5_3',   GITHUB.format('di4')),    # 地 dì
    ('5_4',   GITHUB.format('bu4')),    # 不 bù
    ('5_5',   GITHUB.format('nv3')),    # 女 nǚ (davinfifield uses 'nv' for nü)
    ('5_6',   GITHUB.format('gua1')),   # 瓜 guā
    ('5_7',   GITHUB.format('hua1')),   # 花 huā
    ('5_8',   GITHUB.format('xia1')),   # 虾 xiā
    ('5_9',   GITHUB.format('duo1')),   # 多 duō
    ('5_10',  GITHUB.format('liang4')), # 亮 liàng
    ('5_11',  GITHUB.format('zhuang4')),# 壮 zhuàng
]

def download_one(name, url):
    path = os.path.join(AUDIO_DIR, f'{name}.mp3')
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        with open(path, 'wb') as f:
            f.write(data)
        return name, len(data), None
    except Exception as e:
        return name, 0, str(e)

def main():
    os.makedirs(AUDIO_DIR, exist_ok=True)
    total = len(DOWNLOADS)
    print(f'Downloading {total} standard pinyin audio files...')
    print(f'  Sources: purpleculture.net + davinfifield/GitHub')

    done, errors = 0, []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(download_one, n, u): n for n, u in DOWNLOADS}
        for f in as_completed(futs):
            done += 1
            name, size, err = f.result()
            if err:
                errors.append((name, err))
                print(f'  FAIL {name}: {err}')
            if done % 20 == 0 or done == total:
                print(f'  {done}/{total}')

    print(f'\nDone: {total - len(errors)} OK, {len(errors)} failed')
    if errors:
        print('Failed files:')
        for n, e in errors:
            print(f'  {n}: {e}')
    print(f'\nNote: _w (example word) files are kept from edge-tts generation.')

if __name__ == '__main__':
    main()
