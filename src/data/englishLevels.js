const ENGLISH_LEVELS = [
  {
    id:1, title:'水果乐园', subtitle:'学习水果英语', icon:'🍎', color:'#4CAF50',
    bg:'linear-gradient(135deg,#a8e063 0%,#56ab2f 100%)',
    items:[
      {py:'Apple',sound:'苹果',word:'苹果',emoji:'🍎',tip:'读作 A-pple'},
      {py:'Banana',sound:'香蕉',word:'香蕉',emoji:'🍌',tip:'读作 Ba-na-na'},
      {py:'Orange',sound:'橙子',word:'橙子',emoji:'🍊',tip:'读作 Or-ange'},
      {py:'Grape',sound:'葡萄',word:'葡萄',emoji:'🍇',tip:'读作 Grape'},
      {py:'Peach',sound:'桃子',word:'桃子',emoji:'🍑',tip:'读作 Peach'},
      {py:'Pear',sound:'梨',word:'梨子',emoji:'🍐',tip:'读作 Pear'},
      {py:'Mango',sound:'芒果',word:'芒果',emoji:'🥭',tip:'读作 Man-go'},
      {py:'Berry',sound:'浆果',word:'草莓',emoji:'🍓',tip:'读作 Ber-ry'},
    ]
  },
  {
    id:2, title:'动物王国', subtitle:'学习动物英语', icon:'🐶', color:'#2196F3',
    bg:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    items:[
      {py:'Cat',sound:'猫',word:'小猫',emoji:'🐱',tip:'读作 Cat'},
      {py:'Dog',sound:'狗',word:'小狗',emoji:'🐶',tip:'读作 Dog'},
      {py:'Bird',sound:'鸟',word:'小鸟',emoji:'🐦',tip:'读作 Bird'},
      {py:'Fish',sound:'鱼',word:'小鱼',emoji:'🐟',tip:'读作 Fish'},
      {py:'Pig',sound:'猪',word:'小猪',emoji:'🐷',tip:'读作 Pig'},
      {py:'Cow',sound:'牛',word:'奶牛',emoji:'🐮',tip:'读作 Cow'},
      {py:'Duck',sound:'鸭',word:'鸭子',emoji:'🦆',tip:'读作 Duck'},
      {py:'Hen',sound:'母鸡',word:'母鸡',emoji:'🐔',tip:'读作 Hen'},
      {py:'Horse',sound:'马',word:'小马',emoji:'🐴',tip:'读作 Horse'},
      {py:'Sheep',sound:'羊',word:'绵羊',emoji:'🐑',tip:'读作 Sheep'},
    ]
  },
  {
    id:3, title:'颜色世界', subtitle:'学习颜色英语', icon:'🌈', color:'#9C27B0',
    bg:'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
    items:[
      {py:'Red',sound:'红色',word:'红色',emoji:'🔴',tip:'读作 Red'},
      {py:'Blue',sound:'蓝色',word:'蓝色',emoji:'🔵',tip:'读作 Blue'},
      {py:'Green',sound:'绿色',word:'绿色',emoji:'🟢',tip:'读作 Green'},
      {py:'Yellow',sound:'黄色',word:'黄色',emoji:'🟡',tip:'读作 Yel-low'},
      {py:'Pink',sound:'粉色',word:'粉色',emoji:'🩷',tip:'读作 Pink'},
      {py:'Purple',sound:'紫色',word:'紫色',emoji:'🟣',tip:'读作 Pur-ple'},
      {py:'White',sound:'白色',word:'白色',emoji:'⚪',tip:'读作 White'},
      {py:'Black',sound:'黑色',word:'黑色',emoji:'⚫',tip:'读作 Black'},
      {py:'Brown',sound:'棕色',word:'棕色',emoji:'🟤',tip:'读作 Brown'},
      {py:'Gray',sound:'灰色',word:'灰色',emoji:'🩶',tip:'读作 Gray'},
    ]
  },
  {
    id:4, title:'身体部位', subtitle:'学习身体英语', icon:'🖐️', color:'#FF9800',
    bg:'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
    items:[
      {py:'Hand',sound:'手',word:'小手',emoji:'🖐️',tip:'读作 Hand'},
      {py:'Eye',sound:'眼睛',word:'眼睛',emoji:'👁️',tip:'读作 Eye'},
      {py:'Ear',sound:'耳朵',word:'耳朵',emoji:'👂',tip:'读作 Ear'},
      {py:'Nose',sound:'鼻子',word:'鼻子',emoji:'👃',tip:'读作 Nose'},
      {py:'Mouth',sound:'嘴巴',word:'嘴巴',emoji:'👄',tip:'读作 Mouth'},
      {py:'Head',sound:'头',word:'头',emoji:'🗣️',tip:'读作 Head'},
      {py:'Leg',sound:'腿',word:'腿',emoji:'🦵',tip:'读作 Leg'},
      {py:'Foot',sound:'脚',word:'脚',emoji:'🦶',tip:'读作 Foot'},
    ]
  },
  {
    id:5, title:'数字乐园', subtitle:'学习数字英语', icon:'🔢', color:'#F44336',
    bg:'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
    items:[
      {py:'One',sound:'一',word:'一个',emoji:'1️⃣',tip:'读作 One'},
      {py:'Two',sound:'二',word:'两个',emoji:'2️⃣',tip:'读作 Two'},
      {py:'Three',sound:'三',word:'三个',emoji:'3️⃣',tip:'读作 Three'},
      {py:'Four',sound:'四',word:'四个',emoji:'4️⃣',tip:'读作 Four'},
      {py:'Five',sound:'五',word:'五个',emoji:'5️⃣',tip:'读作 Five'},
      {py:'Six',sound:'六',word:'六个',emoji:'6️⃣',tip:'读作 Six'},
      {py:'Seven',sound:'七',word:'七个',emoji:'7️⃣',tip:'读作 Se-ven'},
      {py:'Eight',sound:'八',word:'八个',emoji:'8️⃣',tip:'读作 Eight'},
      {py:'Nine',sound:'九',word:'九个',emoji:'9️⃣',tip:'读作 Nine'},
      {py:'Ten',sound:'十',word:'十个',emoji:'🔟',tip:'读作 Ten'},
    ]
  }
];

// Precompute audio paths
ENGLISH_LEVELS.forEach(lv => {
  lv.items.forEach((item, i) => {
    item._audio = `/audio/english_${lv.id}_${i}.mp3`;
    item._audioW = `/audio/english_${lv.id}_${i}_w.mp3`;
  });
});

export default ENGLISH_LEVELS;
