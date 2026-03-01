#!/usr/bin/env python3
"""Generate example word audio using Azure Neural TTS.
Uses zh-CN-XiaoxiaoNeural voice with cheerful style for natural, engaging pronunciation.

Usage:
    AZURE_SPEECH_KEY=<key> AZURE_SPEECH_REGION=eastus python scripts/generate_audio.py
"""
import os, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio')

AZURE_KEY    = os.environ.get('AZURE_SPEECH_KEY', '')
AZURE_REGION = os.environ.get('AZURE_SPEECH_REGION', 'eastus')
ENDPOINT     = f'https://{AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1'

VOICE = 'zh-CN-XiaoxiaoNeural'
STYLE = 'newscast'  # 播音腔，字正腔圆
RATE  = '-10%'      # 略慢，便于跟读

# (filename_base, word_text) — only _w files; pinyin sounds come from download_audio.py
WORD_ITEMS = [
    # ===== Level 1: 声母 (23) =====
    ('1_0',  '爸爸'),
    ('1_1',  '苹果'),
    ('1_2',  '妈妈'),
    ('1_3',  '飞机'),
    ('1_4',  '大象'),
    ('1_5',  '兔子'),
    ('1_6',  '牛奶'),
    ('1_7',  '老虎'),
    ('1_8',  '鸽子'),
    ('1_9',  '孔雀'),
    ('1_10', '花朵'),
    ('1_11', '鸡蛋'),
    ('1_12', '气球'),
    ('1_13', '西瓜'),
    ('1_14', '竹子'),
    ('1_15', '汽车'),
    ('1_16', '书本'),
    ('1_17', '太阳'),
    ('1_18', '字母'),
    ('1_19', '刺猬'),
    ('1_20', '雨伞'),
    ('1_21', '月亮'),
    ('1_22', '乌龟'),
    # ===== Level 2: 韵母 (24) =====
    ('2_0',  '阿姨'),
    ('2_1',  '公鸡'),
    ('2_2',  '白鹅'),
    ('2_3',  '衣服'),
    ('2_4',  '乌鸦'),
    ('2_5',  '小鱼'),
    ('2_6',  '爱心'),
    ('2_7',  '杯子'),
    ('2_8',  '围巾'),
    ('2_9',  '棉袄'),
    ('2_10', '海鸥'),
    ('2_11', '邮票'),
    ('2_12', '叶子'),
    ('2_13', '月亮'),
    ('2_14', '耳朵'),
    ('2_15', '平安'),
    ('2_16', '大门'),
    ('2_17', '森林'),
    ('2_18', '白云'),
    ('2_19', '裙子'),
    ('2_20', '糖果'),
    ('2_21', '台灯'),
    ('2_22', '星星'),
    ('2_23', '时钟'),
    # ===== Level 3: 整体认读 (16) =====
    ('3_0',  '纸张'),
    ('3_1',  '吃饭'),
    ('3_2',  '狮子'),
    ('3_3',  '日历'),
    ('3_4',  '写字'),
    ('3_5',  '刺猬'),
    ('3_6',  '蚕丝'),
    ('3_7',  '一二三'),
    ('3_8',  '跳舞'),
    ('3_9',  '小鱼'),
    ('3_10', '夜晚'),
    ('3_11', '月饼'),
    ('3_12', '花园'),
    ('3_13', '音乐'),
    ('3_14', '白云'),
    ('3_15', '老鹰'),
    # ===== Level 4: 声调 (12) =====
    ('4_0',  '八个'),
    ('4_1',  '拔萝卜'),
    ('4_2',  '一把'),
    ('4_3',  '爸爸'),
    ('4_4',  '妈妈'),
    ('4_5',  '芝麻'),
    ('4_6',  '小马'),
    ('4_7',  '别骂人'),
    ('4_8',  '搭积木'),
    ('4_9',  '回答'),
    ('4_10', '打球'),
    ('4_11', '大家好'),
    # ===== Level 5: 拼读 (12) =====
    ('5_0',  '爸爸'),
    ('5_1',  '妈妈'),
    ('5_2',  '喝水'),
    ('5_3',  '土地'),
    ('5_4',  '不行'),
    ('5_5',  '女孩'),
    ('5_6',  '西瓜'),
    ('5_7',  '花朵'),
    ('5_8',  '大虾'),
    ('5_9',  '很多'),
    ('5_10', '明亮'),
    ('5_11', '壮壮的'),
]


def make_ssml(text):
    return (
        "<speak version='1.0' xml:lang='zh-CN' "
        "xmlns:mstts='http://www.w3.org/2001/mstts'>"
        f"<voice name='{VOICE}'>"
        f"<mstts:express-as style='{STYLE}'>"
        f"<prosody rate='{RATE}'>{text}</prosody>"
        "</mstts:express-as>"
        "</voice></speak>"
    )


def generate_one(name, text):
    path = os.path.join(AUDIO_DIR, f'{name}_w.mp3')
    ssml = make_ssml(text).encode('utf-8')
    req = urllib.request.Request(
        ENDPOINT,
        data=ssml,
        headers={
            'Ocp-Apim-Subscription-Key': AZURE_KEY,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        },
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = resp.read()
    with open(path, 'wb') as f:
        f.write(data)
    return name


def main():
    if not AZURE_KEY:
        print('Error: AZURE_SPEECH_KEY environment variable is not set.')
        print('Usage: AZURE_SPEECH_KEY=<key> python scripts/generate_audio.py')
        sys.exit(1)

    os.makedirs(AUDIO_DIR, exist_ok=True)
    total = len(WORD_ITEMS)
    print(f'Generating {total} word audio files via Azure {VOICE} (style={STYLE}, rate={RATE}) ...')

    done, errors = 0, []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(generate_one, name, text): name for name, text in WORD_ITEMS}
        for f in as_completed(futs):
            done += 1
            name = futs[f]
            try:
                f.result()
            except Exception as e:
                errors.append((name, str(e)))
                print(f'  FAIL {name}: {e}')
            if done % 20 == 0 or done == total:
                print(f'  {done}/{total}')

    if errors:
        print(f'\n{len(errors)} errors:')
        for n, e in errors[:5]:
            print(f'  {n}: {e}')
    else:
        print(f'\nAll {total} _w files generated in {AUDIO_DIR}/')


if __name__ == '__main__':
    main()
