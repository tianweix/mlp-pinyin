#!/usr/bin/env python3
"""Generate English level audio using Azure Neural TTS.
Uses en-US-JennyNeural for English words (_audio) and zh-CN-XiaoxiaoNeural for
Chinese meanings (_audioW).

Usage:
    AZURE_SPEECH_KEY=<key> AZURE_SPEECH_REGION=eastus python scripts/generate_english_audio.py
"""
import os, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'audio')

AZURE_KEY    = os.environ.get('AZURE_SPEECH_KEY', '')
AZURE_REGION = os.environ.get('AZURE_SPEECH_REGION', 'eastus')
ENDPOINT     = f'https://{AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1'

EN_VOICE = 'en-US-JennyNeural'
ZH_VOICE = 'zh-CN-XiaoxiaoNeural'
ZH_STYLE = 'newscast'
RATE     = '-10%'

# (filename_base, english_word, chinese_meaning)
ITEMS = [
    # ===== Level 1: 水果乐园 (8) =====
    ('english_1_0', 'Apple',  '苹果'),
    ('english_1_1', 'Banana', '香蕉'),
    ('english_1_2', 'Orange', '橙子'),
    ('english_1_3', 'Grape',  '葡萄'),
    ('english_1_4', 'Peach',  '桃子'),
    ('english_1_5', 'Pear',   '梨子'),
    ('english_1_6', 'Mango',  '芒果'),
    ('english_1_7', 'Berry',  '草莓'),
    # ===== Level 2: 动物王国 (10) =====
    ('english_2_0', 'Cat',   '小猫'),
    ('english_2_1', 'Dog',   '小狗'),
    ('english_2_2', 'Bird',  '小鸟'),
    ('english_2_3', 'Fish',  '小鱼'),
    ('english_2_4', 'Pig',   '小猪'),
    ('english_2_5', 'Cow',   '奶牛'),
    ('english_2_6', 'Duck',  '鸭子'),
    ('english_2_7', 'Hen',   '母鸡'),
    ('english_2_8', 'Horse', '小马'),
    ('english_2_9', 'Sheep', '绵羊'),
    # ===== Level 3: 颜色世界 (10) =====
    ('english_3_0', 'Red',    '红色'),
    ('english_3_1', 'Blue',   '蓝色'),
    ('english_3_2', 'Green',  '绿色'),
    ('english_3_3', 'Yellow', '黄色'),
    ('english_3_4', 'Pink',   '粉色'),
    ('english_3_5', 'Purple', '紫色'),
    ('english_3_6', 'White',  '白色'),
    ('english_3_7', 'Black',  '黑色'),
    ('english_3_8', 'Brown',  '棕色'),
    ('english_3_9', 'Gray',   '灰色'),
    # ===== Level 4: 身体部位 (8) =====
    ('english_4_0', 'Hand',  '小手'),
    ('english_4_1', 'Eye',   '眼睛'),
    ('english_4_2', 'Ear',   '耳朵'),
    ('english_4_3', 'Nose',  '鼻子'),
    ('english_4_4', 'Mouth', '嘴巴'),
    ('english_4_5', 'Head',  '头'),
    ('english_4_6', 'Leg',   '腿'),
    ('english_4_7', 'Foot',  '脚'),
    # ===== Level 5: 数字乐园 (10) =====
    ('english_5_0', 'One',   '一个'),
    ('english_5_1', 'Two',   '两个'),
    ('english_5_2', 'Three', '三个'),
    ('english_5_3', 'Four',  '四个'),
    ('english_5_4', 'Five',  '五个'),
    ('english_5_5', 'Six',   '六个'),
    ('english_5_6', 'Seven', '七个'),
    ('english_5_7', 'Eight', '八个'),
    ('english_5_8', 'Nine',  '九个'),
    ('english_5_9', 'Ten',   '十个'),
]


def make_en_ssml(text):
    return (
        "<speak version='1.0' xml:lang='en-US'>"
        f"<voice name='{EN_VOICE}'>"
        f"<prosody rate='{RATE}'>{text}</prosody>"
        "</voice></speak>"
    )


def make_zh_ssml(text):
    return (
        "<speak version='1.0' xml:lang='zh-CN' "
        "xmlns:mstts='http://www.w3.org/2001/mstts'>"
        f"<voice name='{ZH_VOICE}'>"
        f"<mstts:express-as style='{ZH_STYLE}'>"
        f"<prosody rate='{RATE}'>{text}</prosody>"
        "</mstts:express-as>"
        "</voice></speak>"
    )


def generate_one(path, ssml_text):
    ssml = ssml_text.encode('utf-8')
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


def main():
    if not AZURE_KEY:
        print('Error: AZURE_SPEECH_KEY environment variable is not set.')
        print('Usage: AZURE_SPEECH_KEY=<key> python scripts/generate_english_audio.py')
        sys.exit(1)

    os.makedirs(AUDIO_DIR, exist_ok=True)

    tasks = []
    for name, en_word, zh_meaning in ITEMS:
        # English pronunciation for _audio
        tasks.append((os.path.join(AUDIO_DIR, f'{name}.mp3'), make_en_ssml(en_word)))
        # Chinese meaning for _audioW
        tasks.append((os.path.join(AUDIO_DIR, f'{name}_w.mp3'), make_zh_ssml(zh_meaning)))

    total = len(tasks)
    print(f'Generating {total} English audio files via Azure TTS ...')

    done, errors = 0, []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(generate_one, path, ssml): path for path, ssml in tasks}
        for f in as_completed(futs):
            done += 1
            path = futs[f]
            try:
                f.result()
            except Exception as e:
                errors.append((path, str(e)))
                print(f'  FAIL {os.path.basename(path)}: {e}')
            if done % 20 == 0 or done == total:
                print(f'  {done}/{total}')

    if errors:
        print(f'\n{len(errors)} errors:')
        for p, e in errors[:5]:
            print(f'  {os.path.basename(p)}: {e}')
    else:
        print(f'\nAll {total} English audio files generated in {AUDIO_DIR}/')


if __name__ == '__main__':
    main()
