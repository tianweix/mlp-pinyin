#!/usr/bin/env python3
"""Generate standard pinyin pronunciation audio using Microsoft Neural TTS (edge-tts).
Uses zh-CN-XiaoyiNeural voice (lively female, ideal for children's education)
with slow rate for clear, teaching-style pronunciation.
"""
import asyncio, os
from concurrent.futures import ThreadPoolExecutor

AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio')
VOICE = 'zh-CN-XiaoyiNeural'
SOUND_RATE = '-45%'   # Slow, clear, teaching-style for pronunciation
WORD_RATE  = '-25%'   # Slightly slow, natural for example words

# (filename_base, sound_text, word_text)
ITEMS = [
    # ===== Level 1: 声母 (23) =====
    ('1_0',  '波', '爸爸'),
    ('1_1',  '坡', '苹果'),
    ('1_2',  '摸', '妈妈'),
    ('1_3',  '佛', '飞机'),
    ('1_4',  '得', '大象'),
    ('1_5',  '特', '兔子'),
    ('1_6',  '讷', '牛奶'),
    ('1_7',  '勒', '老虎'),
    ('1_8',  '哥', '鸽子'),
    ('1_9',  '科', '孔雀'),
    ('1_10', '喝', '花朵'),
    ('1_11', '鸡', '鸡蛋'),
    ('1_12', '七', '气球'),
    ('1_13', '西', '西瓜'),
    ('1_14', '知', '竹子'),
    ('1_15', '吃', '汽车'),
    ('1_16', '诗', '书本'),
    ('1_17', '日', '太阳'),
    ('1_18', '资', '字母'),
    ('1_19', '次', '刺猬'),
    ('1_20', '丝', '雨伞'),
    ('1_21', '衣', '月亮'),
    ('1_22', '屋', '乌龟'),
    # ===== Level 2: 韵母 (24) =====
    ('2_0',  '啊', '阿姨'),
    ('2_1',  '喔', '公鸡'),
    ('2_2',  '鹅', '白鹅'),
    ('2_3',  '衣', '衣服'),
    ('2_4',  '乌', '乌鸦'),
    ('2_5',  '鱼', '小鱼'),
    ('2_6',  '爱', '爱心'),
    ('2_7',  '诶', '杯子'),
    ('2_8',  '威', '围巾'),
    ('2_9',  '奥', '棉袄'),
    ('2_10', '欧', '海鸥'),
    ('2_11', '优', '邮票'),
    ('2_12', '耶', '叶子'),
    ('2_13', '约', '月亮'),
    ('2_14', '耳', '耳朵'),
    ('2_15', '安', '平安'),
    ('2_16', '恩', '大门'),
    ('2_17', '因', '森林'),
    ('2_18', '温', '白云'),
    ('2_19', '晕', '裙子'),
    ('2_20', '昂', '糖果'),
    ('2_21', '灯', '台灯'),
    ('2_22', '英', '星星'),
    ('2_23', '翁', '时钟'),
    # ===== Level 3: 整体认读 (16) =====
    ('3_0',  '知', '纸张'),
    ('3_1',  '吃', '吃饭'),
    ('3_2',  '诗', '狮子'),
    ('3_3',  '日', '日历'),
    ('3_4',  '字', '写字'),
    ('3_5',  '刺', '刺猬'),
    ('3_6',  '丝', '蚕丝'),
    ('3_7',  '一', '一二三'),
    ('3_8',  '五', '跳舞'),
    ('3_9',  '鱼', '小鱼'),
    ('3_10', '夜', '夜晚'),
    ('3_11', '月', '月饼'),
    ('3_12', '圆', '花园'),
    ('3_13', '音', '音乐'),
    ('3_14', '云', '白云'),
    ('3_15', '鹰', '老鹰'),
    # ===== Level 4: 声调 (12) =====
    ('4_0',  '八', '八个'),
    ('4_1',  '拔', '拔萝卜'),
    ('4_2',  '把', '一把'),
    ('4_3',  '爸', '爸爸'),
    ('4_4',  '妈', '妈妈'),
    ('4_5',  '麻', '芝麻'),
    ('4_6',  '马', '小马'),
    ('4_7',  '骂', '别骂人'),
    ('4_8',  '搭', '搭积木'),
    ('4_9',  '答', '回答'),
    ('4_10', '打', '打球'),
    ('4_11', '大', '大家好'),
    # ===== Level 5: 拼读 (12) =====
    ('5_0',  '八', '爸爸'),
    ('5_1',  '妈', '妈妈'),
    ('5_2',  '喝', '喝水'),
    ('5_3',  '地', '土地'),
    ('5_4',  '不', '不行'),
    ('5_5',  '女', '女孩'),
    ('5_6',  '瓜', '西瓜'),
    ('5_7',  '花', '花朵'),
    ('5_8',  '虾', '大虾'),
    ('5_9',  '多', '很多'),
    ('5_10', '亮', '明亮'),
    ('5_11', '壮', '壮壮的'),
]

SEM = asyncio.Semaphore(8)  # limit concurrent requests

async def generate_one(name, text, rate):
    import edge_tts
    path = os.path.join(AUDIO_DIR, f'{name}.mp3')
    async with SEM:
        tts = edge_tts.Communicate(text=text, voice=VOICE, rate=rate)
        await tts.save(path)
    return path

async def main():
    os.makedirs(AUDIO_DIR, exist_ok=True)

    tasks = []
    for name, sound_text, word_text in ITEMS:
        tasks.append(generate_one(name, sound_text, SOUND_RATE))
        tasks.append(generate_one(f'{name}_w', word_text, WORD_RATE))

    total = len(tasks)
    print(f'Generating {total} audio files with {VOICE}...')
    print(f'  Sound rate: {SOUND_RATE}, Word rate: {WORD_RATE}')

    done = 0
    errors = []
    for coro in asyncio.as_completed(tasks):
        try:
            path = await coro
            done += 1
            if done % 30 == 0 or done == total:
                print(f'  {done}/{total}')
        except Exception as e:
            done += 1
            errors.append(str(e))

    if errors:
        print(f'\n{len(errors)} errors:')
        for e in errors[:5]:
            print(f'  {e}')
    else:
        print(f'\nAll {total} files generated in {AUDIO_DIR}/')

if __name__ == '__main__':
    asyncio.run(main())
