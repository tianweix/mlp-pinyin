#!/usr/bin/env python3
"""Generate hanzi level audio using Azure Neural TTS.
Generates both character pronunciation (_audio) and example word (_audioW) files.

Usage:
    AZURE_SPEECH_KEY=<key> AZURE_SPEECH_REGION=eastus python scripts/generate_hanzi_audio.py
"""
import os, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'audio')

AZURE_KEY    = os.environ.get('AZURE_SPEECH_KEY', '')
AZURE_REGION = os.environ.get('AZURE_SPEECH_REGION', 'eastus')
ENDPOINT     = f'https://{AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1'

VOICE = 'zh-CN-XiaoxiaoNeural'
STYLE = 'newscast'
RATE  = '-10%'

# (filename_base, character_text, word_text)
ITEMS = [
    # ===== Level 1: 数字天地 (10) =====
    ('hanzi_1_0',  '一', '一个'),
    ('hanzi_1_1',  '二', '二月'),
    ('hanzi_1_2',  '三', '三只'),
    ('hanzi_1_3',  '四', '四方'),
    ('hanzi_1_4',  '五', '五颜六色'),
    ('hanzi_1_5',  '六', '六一儿童节'),
    ('hanzi_1_6',  '七', '七星瓢虫'),
    ('hanzi_1_7',  '八', '八只脚'),
    ('hanzi_1_8',  '九', '九朵云'),
    ('hanzi_1_9',  '十', '十全十美'),
    # ===== Level 2: 人体认识 (8) =====
    ('hanzi_2_0',  '人', '人们'),
    ('hanzi_2_1',  '口', '口袋'),
    ('hanzi_2_2',  '耳', '耳朵'),
    ('hanzi_2_3',  '目', '目光'),
    ('hanzi_2_4',  '手', '小手'),
    ('hanzi_2_5',  '足', '足球'),
    ('hanzi_2_6',  '大', '大象'),
    ('hanzi_2_7',  '小', '小鸟'),
    # ===== Level 3: 自然世界 (10) =====
    ('hanzi_3_0',  '日', '日出'),
    ('hanzi_3_1',  '月', '月亮'),
    ('hanzi_3_2',  '水', '水滴'),
    ('hanzi_3_3',  '火', '火苗'),
    ('hanzi_3_4',  '山', '高山'),
    ('hanzi_3_5',  '石', '石头'),
    ('hanzi_3_6',  '田', '稻田'),
    ('hanzi_3_7',  '土', '泥土'),
    ('hanzi_3_8',  '木', '树木'),
    ('hanzi_3_9',  '花', '花朵'),
    # ===== Level 4: 动物乐园 (10) =====
    ('hanzi_4_0',  '马', '小马'),
    ('hanzi_4_1',  '牛', '水牛'),
    ('hanzi_4_2',  '羊', '小羊'),
    ('hanzi_4_3',  '鸟', '小鸟'),
    ('hanzi_4_4',  '鱼', '金鱼'),
    ('hanzi_4_5',  '虫', '毛毛虫'),
    ('hanzi_4_6',  '狗', '小狗'),
    ('hanzi_4_7',  '猫', '小猫'),
    ('hanzi_4_8',  '鸡', '公鸡'),
    ('hanzi_4_9',  '鸭', '鸭子'),
    # ===== Level 5: 日常生活 (8) =====
    ('hanzi_5_0',  '上', '上学'),
    ('hanzi_5_1',  '下', '下雨'),
    ('hanzi_5_2',  '左', '左边'),
    ('hanzi_5_3',  '右', '右边'),
    ('hanzi_5_4',  '前', '前面'),
    ('hanzi_5_5',  '后', '后面'),
    ('hanzi_5_6',  '多', '很多'),
    ('hanzi_5_7',  '少', '多少'),
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


def generate_one(path, text):
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


def main():
    if not AZURE_KEY:
        print('Error: AZURE_SPEECH_KEY environment variable is not set.')
        print('Usage: AZURE_SPEECH_KEY=<key> python scripts/generate_hanzi_audio.py')
        sys.exit(1)

    os.makedirs(AUDIO_DIR, exist_ok=True)

    tasks = []
    for name, char_text, word_text in ITEMS:
        tasks.append((os.path.join(AUDIO_DIR, f'{name}.mp3'), char_text))
        tasks.append((os.path.join(AUDIO_DIR, f'{name}_w.mp3'), word_text))

    total = len(tasks)
    print(f'Generating {total} hanzi audio files via Azure {VOICE} ...')

    done, errors = 0, []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(generate_one, path, text): path for path, text in tasks}
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
        print(f'\nAll {total} hanzi audio files generated in {AUDIO_DIR}/')


if __name__ == '__main__':
    main()
