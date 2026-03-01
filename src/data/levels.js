const LEVELS = [
  {
    id:1, title:'声母森林', subtitle:'学习声母', icon:'🌲', color:'#4CAF50',
    bg:'linear-gradient(135deg,#a8e063 0%,#56ab2f 100%)',
    items:[
      {py:'b',sound:'波',word:'爸爸',emoji:'👨',tip:'双唇紧闭，突然张开'},
      {py:'p',sound:'坡',word:'苹果',emoji:'🍎',tip:'双唇紧闭，送气张开'},
      {py:'m',sound:'摸',word:'妈妈',emoji:'👩',tip:'双唇紧闭，气从鼻出'},
      {py:'f',sound:'佛',word:'飞机',emoji:'✈️',tip:'上牙轻咬下唇'},
      {py:'d',sound:'得',word:'大象',emoji:'🐘',tip:'舌尖顶住上牙龈'},
      {py:'t',sound:'特',word:'兔子',emoji:'🐰',tip:'舌尖顶住上牙龈送气'},
      {py:'n',sound:'讷',word:'牛奶',emoji:'🥛',tip:'舌尖顶住上牙龈，鼻子出气'},
      {py:'l',sound:'勒',word:'老虎',emoji:'🐯',tip:'舌尖顶住上牙龈，气从舌边出'},
      {py:'g',sound:'哥',word:'鸽子',emoji:'🕊️',tip:'舌根抬起顶住软腭'},
      {py:'k',sound:'科',word:'孔雀',emoji:'🦚',tip:'舌根抬起送气'},
      {py:'h',sound:'喝',word:'花朵',emoji:'🌸',tip:'舌根靠近软腭，出气'},
      {py:'j',sound:'鸡',word:'鸡蛋',emoji:'🥚',tip:'舌面靠近硬腭'},
      {py:'q',sound:'七',word:'气球',emoji:'🎈',tip:'舌面靠近硬腭送气'},
      {py:'x',sound:'西',word:'西瓜',emoji:'🍉',tip:'舌面靠近硬腭，气流摩擦'},
      {py:'zh',sound:'知',word:'竹子',emoji:'🎋',tip:'舌尖翘起顶住硬腭前部'},
      {py:'ch',sound:'吃',word:'汽车',emoji:'🚗',tip:'舌尖翘起送气'},
      {py:'sh',sound:'诗',word:'书本',emoji:'📖',tip:'舌尖翘起，气流摩擦'},
      {py:'r',sound:'日',word:'太阳',emoji:'☀️',tip:'舌尖翘起，声带振动'},
      {py:'z',sound:'资',word:'字母',emoji:'✏️',tip:'舌尖平伸，顶住上牙背'},
      {py:'c',sound:'次',word:'刺猬',emoji:'🦔',tip:'舌尖平伸送气'},
      {py:'s',sound:'丝',word:'雨伞',emoji:'☂️',tip:'舌尖平伸，气流摩擦'},
      {py:'y',sound:'衣',word:'月亮',emoji:'🌙',tip:'嘴角向两边展开'},
      {py:'w',sound:'屋',word:'乌龟',emoji:'🐢',tip:'嘴唇拢成圆形'},
    ]
  },
  {
    id:2, title:'韵母海洋', subtitle:'学习韵母', icon:'🌊', color:'#2196F3',
    bg:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    items:[
      {py:'a',sound:'啊',word:'阿姨',emoji:'👱‍♀️',tip:'嘴巴张大，"啊"'},
      {py:'o',sound:'喔',word:'公鸡',emoji:'🐓',tip:'嘴巴圆圆的，"噢"'},
      {py:'e',sound:'鹅',word:'白鹅',emoji:'🦢',tip:'嘴巴扁扁的，"额"'},
      {py:'i',sound:'衣',word:'衣服',emoji:'👔',tip:'嘴角展开，"衣"'},
      {py:'u',sound:'乌',word:'乌鸦',emoji:'🐦‍⬛',tip:'嘴唇拢圆，"乌"'},
      {py:'ü',sound:'鱼',word:'小鱼',emoji:'🐟',tip:'嘴唇拢圆，舌头前伸'},
      {py:'ai',sound:'爱',word:'爱心',emoji:'❤️',tip:'先发a再滑向i'},
      {py:'ei',sound:'诶',word:'杯子',emoji:'🥤',tip:'先发e再滑向i'},
      {py:'ui',sound:'威',word:'围巾',emoji:'🧣',tip:'先发u再滑向i'},
      {py:'ao',sound:'奥',word:'棉袄',emoji:'🧥',tip:'先发a再滑向o'},
      {py:'ou',sound:'欧',word:'海鸥',emoji:'🦅',tip:'先发o再滑向u'},
      {py:'iu',sound:'优',word:'邮票',emoji:'📮',tip:'先发i再滑向u'},
      {py:'ie',sound:'耶',word:'叶子',emoji:'🍃',tip:'先发i再滑向e'},
      {py:'üe',sound:'约',word:'月亮',emoji:'🌙',tip:'先发ü再滑向e'},
      {py:'er',sound:'耳',word:'耳朵',emoji:'👂',tip:'发e时舌头卷起'},
      {py:'an',sound:'安',word:'平安',emoji:'🛡️',tip:'发a后舌尖顶上'},
      {py:'en',sound:'恩',word:'大门',emoji:'🚪',tip:'发e后舌尖顶上'},
      {py:'in',sound:'因',word:'森林',emoji:'🌲',tip:'发i后舌尖顶上'},
      {py:'un',sound:'温',word:'白云',emoji:'☁️',tip:'发u后舌尖顶上'},
      {py:'ün',sound:'晕',word:'裙子',emoji:'👗',tip:'发ü后舌尖顶上'},
      {py:'ang',sound:'昂',word:'糖果',emoji:'🍬',tip:'发a后舌根抬起'},
      {py:'eng',sound:'灯',word:'台灯',emoji:'💡',tip:'发e后舌根抬起'},
      {py:'ing',sound:'英',word:'星星',emoji:'⭐',tip:'发i后舌根抬起'},
      {py:'ong',sound:'翁',word:'时钟',emoji:'🕐',tip:'发o后舌根抬起'},
    ]
  },
  {
    id:3, title:'认读高山', subtitle:'整体认读音节', icon:'🏔️', color:'#9C27B0',
    bg:'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
    items:[
      {py:'zhi',sound:'纸',word:'纸张',emoji:'📄',tip:'整体认读，不用拼'},
      {py:'chi',sound:'吃',word:'吃饭',emoji:'🍚',tip:'整体认读，不用拼'},
      {py:'shi',sound:'狮',word:'狮子',emoji:'🦁',tip:'整体认读，不用拼'},
      {py:'ri',sound:'日',word:'日历',emoji:'📅',tip:'整体认读，不用拼'},
      {py:'zi',sound:'字',word:'写字',emoji:'✍️',tip:'整体认读，不用拼'},
      {py:'ci',sound:'刺',word:'刺猬',emoji:'🦔',tip:'整体认读，不用拼'},
      {py:'si',sound:'丝',word:'蚕丝',emoji:'🧵',tip:'整体认读，不用拼'},
      {py:'yi',sound:'一',word:'一二三',emoji:'1️⃣',tip:'整体认读，不用拼'},
      {py:'wu',sound:'五',word:'跳舞',emoji:'💃',tip:'整体认读，不用拼'},
      {py:'yu',sound:'鱼',word:'小鱼',emoji:'🐠',tip:'整体认读，不用拼'},
      {py:'ye',sound:'夜',word:'夜晚',emoji:'🌃',tip:'整体认读，不用拼'},
      {py:'yue',sound:'月',word:'月饼',emoji:'🥮',tip:'整体认读，不用拼'},
      {py:'yuan',sound:'圆',word:'花园',emoji:'🏡',tip:'整体认读，不用拼'},
      {py:'yin',sound:'音',word:'音乐',emoji:'🎵',tip:'整体认读，不用拼'},
      {py:'yun',sound:'云',word:'白云',emoji:'☁️',tip:'整体认读，不用拼'},
      {py:'ying',sound:'鹰',word:'老鹰',emoji:'🦅',tip:'整体认读，不用拼'},
    ]
  },
  {
    id:4, title:'声调彩虹', subtitle:'四声练习', icon:'🌈', color:'#FF9800',
    bg:'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
    items:[
      {py:'bā',sound:'八',word:'八个',emoji:'8️⃣',tip:'第一声：高高平平的'},
      {py:'bá',sound:'拔',word:'拔萝卜',emoji:'🥕',tip:'第二声：从低往高升'},
      {py:'bǎ',sound:'把',word:'一把',emoji:'✊',tip:'第三声：先降再升'},
      {py:'bà',sound:'爸',word:'爸爸',emoji:'👨',tip:'第四声：从高往低降'},
      {py:'mā',sound:'妈',word:'妈妈',emoji:'👩',tip:'第一声：高高平平的'},
      {py:'má',sound:'麻',word:'芝麻',emoji:'🌿',tip:'第二声：从低往高升'},
      {py:'mǎ',sound:'马',word:'小马',emoji:'🐴',tip:'第三声：先降再升'},
      {py:'mà',sound:'骂',word:'别骂人',emoji:'😤',tip:'第四声：从高往低降'},
      {py:'dā',sound:'搭',word:'搭积木',emoji:'🧱',tip:'第一声：高高平平的'},
      {py:'dá',sound:'答',word:'回答',emoji:'💬',tip:'第二声：从低往高升'},
      {py:'dǎ',sound:'打',word:'打球',emoji:'⚽',tip:'第三声：先降再升'},
      {py:'dà',sound:'大',word:'大家好',emoji:'👋',tip:'第四声：从高往低降'},
    ]
  },
  {
    id:5, title:'拼读城堡', subtitle:'声母+韵母=音节', icon:'🏰', color:'#F44336',
    bg:'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
    items:[
      {py:'b + a = ba',sound:'八',word:'爸爸',emoji:'👨',tip:'声母b和韵母a拼在一起'},
      {py:'m + a = ma',sound:'妈',word:'妈妈',emoji:'👩',tip:'声母m和韵母a拼在一起'},
      {py:'h + e = he',sound:'喝',word:'喝水',emoji:'💧',tip:'声母h和韵母e拼在一起'},
      {py:'d + i = di',sound:'地',word:'土地',emoji:'🌍',tip:'声母d和韵母i拼在一起'},
      {py:'b + u = bu',sound:'不',word:'不行',emoji:'🚫',tip:'声母b和韵母u拼在一起'},
      {py:'n + ü = nü',sound:'女',word:'女孩',emoji:'👧',tip:'声母n和韵母ü拼在一起'},
      {py:'g + u + a = gua',sound:'瓜',word:'西瓜',emoji:'🍉',tip:'三拼音节，中间有介母'},
      {py:'h + u + a = hua',sound:'花',word:'花朵',emoji:'🌸',tip:'三拼音节，中间有介母'},
      {py:'x + i + a = xia',sound:'下',word:'虾',emoji:'🦐',tip:'三拼音节，中间有介母'},
      {py:'d + u + o = duo',sound:'多',word:'很多',emoji:'🎉',tip:'三拼音节，中间有介母'},
      {py:'l + i + ang = liang',sound:'亮',word:'明亮',emoji:'💡',tip:'三拼音节，声母+介母+韵母'},
      {py:'zh + u + ang = zhuang',sound:'壮',word:'壮壮的',emoji:'💪',tip:'三拼音节练习'},
    ]
  }
];

// Precompute audio paths
LEVELS.forEach(lv => {
  lv.items.forEach((item, i) => {
    item._audio = `/audio/${lv.id}_${i}.mp3`;
    item._audioW = `/audio/${lv.id}_${i}_w.mp3`;
  });
});

export default LEVELS;
