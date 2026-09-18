const books = [
  { type: 'key', name: '考点词', mark: 'A', desc: '高频考点词及其同义替换。', lastGroup: 12 },
  { type: 'answer', name: '答案词', mark: 'B', desc: '听音识别答案词，并训练完整、准确的拼写。', lastGroup: 8 },
  { type: 'topic', name: '话题词', mark: 'C', desc: '训练听到话题词后快速建立声音—词义对应。', lastGroup: 5 }
]

const words = [
  {id:'key-alternative',type:'key',book:'考点词',word:'alternative',phon:'/ɔːlˈtɜːnətɪv/',pos:'adj.',meaning:'备选的；可供选择的',synonyms:[{en:'another',zh:'另一个；其他的'}],distractors:[{en:'stimulate',zh:'刺激；激发'},{en:'achievement',zh:'成就'}],question:'Customers have to pay extra for transferring to another date.',corresponding:"You're welcome to change to an alternative date or a different tour, for a small administrative fee.",translation:'欢迎您更改日期或改报其他行程，只需支付少量行政手续费。',zhHighlights:['更改'],lastTime:'9月18日2026年',age:'day'},
  {id:'key-stimulate',type:'key',book:'考点词',word:'stimulate',phon:'/ˈstɪmjuleɪt/',pos:'v.',meaning:'刺激；激发',synonyms:[{en:'keep active',zh:'保持活跃'}],distractors:[{en:'alternative',zh:'备选的；可供选择的'},{en:'another',zh:'另一个；其他的'}],question:'Games which stimulate the brain have been found to help people with schizophrenia.',corresponding:'Recent studies have shown that computer-assisted games designed to keep the brain active can help improve their episodic memory.',translation:'近期研究表明，旨在保持大脑活跃的电脑辅助游戏有助于改善情景记忆。',zhHighlights:['保持','活跃'],lastTime:'9月18日2026年',age:'day'},
  {id:'answer-absence',type:'answer',book:'答案词',word:'absence',phon:'/ˈæbsəns/',pos:'n.',meaning:'缺席；不存在',difficulty:'B2',example:'Conflict-related stress can cause absence that may last for months.',translation:'与冲突有关的压力可能导致缺勤长达数月。',zhHighlights:['缺勤'],lastTime:'9月18日2026年',age:'day'},
  {id:'answer-achievement',type:'answer',book:'答案词',word:'achievement',phon:'/əˈtʃiːvmənt/',pos:'n.',meaning:'功绩，成就',difficulty:'B1',example:'Promotion goals focus on achievement.',translation:'晋升目标以成就为导向。',zhHighlights:['成就'],lastTime:'9月18日2026年',age:'day'},
  {id:'topic-advertisement',type:'topic',book:'话题词',word:'advertisement',phon:'/ˈædvɜːtɪsmənt/',pos:'n.',meaning:'广告',topic:'商业',difficulty:'A2',choices:['广告','麻醉剂；麻醉的','功绩，成就'],example:'I saw your advertisement about copying pictures to disk and I’d like a bit more information about what you do.',translation:'我看到了你们把照片复制到光盘上的广告，想进一步了解一下你们提供的服务。',zhHighlights:['广告'],lastTime:'9月18日2026年',age:'day'},
  {id:'topic-anaesthetic',type:'topic',book:'话题词',word:'anaesthetic',phon:'/ˌænɪsˈθetɪk/',pos:'n.',meaning:'麻醉剂；麻醉的',topic:'健康',difficulty:'C1',choices:['麻醉剂；麻醉的','广告','缺席；不存在'],example:'Music even helped patients under general anaesthetic.',translation:'音乐甚至对处于全身麻醉状态的患者也有帮助。',zhHighlights:['麻醉'],lastTime:'9月18日2026年',age:'day'}
]

function getWordsByType(type){ return words.filter(item => item.type === type) }
function getWord(id){ return words.find(item => item.id === id) }
module.exports = { books, words, getWordsByType, getWord }
