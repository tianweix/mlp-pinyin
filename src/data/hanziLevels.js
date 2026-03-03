const HANZI_LEVELS = [
  {
    id:1, title:'数字天地', subtitle:'学习数字汉字', icon:'🔢', color:'#4CAF50',
    bg:'linear-gradient(135deg,#a8e063 0%,#56ab2f 100%)',
    items:[
      {py:'一',sound:'yī',word:'一个',emoji:'1️⃣',tip:'横着写一笔'},
      {py:'二',sound:'èr',word:'二月',emoji:'2️⃣',tip:'两条横线'},
      {py:'三',sound:'sān',word:'三只',emoji:'3️⃣',tip:'三条横线'},
      {py:'四',sound:'sì',word:'四方',emoji:'4️⃣',tip:'口字里面有撇和竖弯'},
      {py:'五',sound:'wǔ',word:'五颜六色',emoji:'5️⃣',tip:'横竖横折横'},
      {py:'六',sound:'liù',word:'六一儿童节',emoji:'6️⃣',tip:'上面一点，下面两点'},
      {py:'七',sound:'qī',word:'七星瓢虫',emoji:'7️⃣',tip:'横着一笔再竖弯钩'},
      {py:'八',sound:'bā',word:'八只脚',emoji:'8️⃣',tip:'一撇一捺'},
      {py:'九',sound:'jiǔ',word:'九朵云',emoji:'9️⃣',tip:'先撇再横折弯钩'},
      {py:'十',sound:'shí',word:'十全十美',emoji:'🔟',tip:'一横一竖'},
    ]
  },
  {
    id:2, title:'人体认识', subtitle:'学习身体部位', icon:'🧒', color:'#2196F3',
    bg:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    items:[
      {py:'人',sound:'rén',word:'人们',emoji:'🧑',tip:'一撇一捺，像人走路'},
      {py:'口',sound:'kǒu',word:'口袋',emoji:'👄',tip:'方方正正像嘴巴'},
      {py:'耳',sound:'ěr',word:'耳朵',emoji:'👂',tip:'像一只耳朵的样子'},
      {py:'目',sound:'mù',word:'目光',emoji:'👁️',tip:'像一只眼睛'},
      {py:'手',sound:'shǒu',word:'小手',emoji:'🖐️',tip:'像伸开的手指'},
      {py:'足',sound:'zú',word:'足球',emoji:'🦶',tip:'上面是口，下面是脚'},
      {py:'大',sound:'dà',word:'大象',emoji:'🐘',tip:'人字加一横，表示大'},
      {py:'小',sound:'xiǎo',word:'小鸟',emoji:'🐦',tip:'竖钩两边各一点'},
    ]
  },
  {
    id:3, title:'自然世界', subtitle:'学习自然汉字', icon:'🌿', color:'#9C27B0',
    bg:'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
    items:[
      {py:'日',sound:'rì',word:'日出',emoji:'☀️',tip:'像太阳的样子'},
      {py:'月',sound:'yuè',word:'月亮',emoji:'🌙',tip:'像弯弯的月亮'},
      {py:'水',sound:'shuǐ',word:'水滴',emoji:'💧',tip:'中间一竖，两边是水花'},
      {py:'火',sound:'huǒ',word:'火苗',emoji:'🔥',tip:'像燃烧的火焰'},
      {py:'山',sound:'shān',word:'高山',emoji:'⛰️',tip:'像山峰的样子'},
      {py:'石',sound:'shí',word:'石头',emoji:'🪨',tip:'横下面是口'},
      {py:'田',sound:'tián',word:'稻田',emoji:'🌾',tip:'像一块方方的田地'},
      {py:'土',sound:'tǔ',word:'泥土',emoji:'🏔️',tip:'十字下面加一横'},
      {py:'木',sound:'mù',word:'树木',emoji:'🌳',tip:'像一棵树的样子'},
      {py:'花',sound:'huā',word:'花朵',emoji:'🌸',tip:'草字头下面有变化'},
    ]
  },
  {
    id:4, title:'动物乐园', subtitle:'学习动物汉字', icon:'🐾', color:'#FF9800',
    bg:'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
    items:[
      {py:'马',sound:'mǎ',word:'小马',emoji:'🐴',tip:'像马奔跑的样子'},
      {py:'牛',sound:'niú',word:'水牛',emoji:'🐂',tip:'像牛头和牛角'},
      {py:'羊',sound:'yáng',word:'小羊',emoji:'🐑',tip:'上面像羊角'},
      {py:'鸟',sound:'niǎo',word:'小鸟',emoji:'🐦',tip:'像一只小鸟'},
      {py:'鱼',sound:'yú',word:'金鱼',emoji:'🐟',tip:'上面是头，下面是尾巴'},
      {py:'虫',sound:'chóng',word:'毛毛虫',emoji:'🐛',tip:'像一条小虫子'},
      {py:'狗',sound:'gǒu',word:'小狗',emoji:'🐶',tip:'犬字旁加句'},
      {py:'猫',sound:'māo',word:'小猫',emoji:'🐱',tip:'犬字旁加苗'},
      {py:'鸡',sound:'jī',word:'公鸡',emoji:'🐔',tip:'又字旁加鸟'},
      {py:'鸭',sound:'yā',word:'鸭子',emoji:'🦆',tip:'甲字旁加鸟'},
    ]
  },
  {
    id:5, title:'日常生活', subtitle:'学习日常汉字', icon:'🏠', color:'#F44336',
    bg:'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
    items:[
      {py:'上',sound:'shàng',word:'上学',emoji:'⬆️',tip:'一竖在横线上面'},
      {py:'下',sound:'xià',word:'下雨',emoji:'⬇️',tip:'一竖在横线下面'},
      {py:'左',sound:'zuǒ',word:'左边',emoji:'⬅️',tip:'横撇下面是工'},
      {py:'右',sound:'yòu',word:'右边',emoji:'➡️',tip:'横撇下面是口'},
      {py:'前',sound:'qián',word:'前面',emoji:'🔜',tip:'两个月字上下排'},
      {py:'后',sound:'hòu',word:'后面',emoji:'🔙',tip:'厂字里面有口和一'},
      {py:'多',sound:'duō',word:'很多',emoji:'🎉',tip:'两个夕字上下排'},
      {py:'少',sound:'shǎo',word:'多少',emoji:'🤏',tip:'小字上面加一撇'},
    ]
  }
];

// Precompute audio paths
HANZI_LEVELS.forEach(lv => {
  lv.items.forEach((item, i) => {
    item._audio = `/audio/hanzi_${lv.id}_${i}.mp3`;
    item._audioW = `/audio/hanzi_${lv.id}_${i}_w.mp3`;
  });
});

export default HANZI_LEVELS;
