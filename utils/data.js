const books = [
  { type: 'key', name: '考点词', mark: 'A', desc: '高频考点词及其同义替换。', lastGroup: 12 },
  { type: 'answer', name: '答案词', mark: 'B', desc: '听音识别答案词，并训练完整、准确的拼写。', lastGroup: 8 },
  { type: 'topic', name: '话题词', mark: 'C', desc: '训练听到话题词后快速建立声音—词义对应。', lastGroup: 5 }
]

const words = [
  {id:'key-incorporate',type:'key',book:'考点词',word:'incorporate',phon:'/ɪnˈkɔːpəreɪt/',pos:'v.',meaning:'包含；纳入；合并',synonyms:[{en:'include',zh:'包括；包含'},{en:'comprise',zh:'由……组成；包含'},{en:'contain',zh:'包含；容纳'},{en:'integrate',zh:'整合；使成为一体'}],distractor:{en:'exclude',zh:'排除；不包括'},question:'The new course will incorporate practical training into the existing programme.',corresponding:'The new course will include practical training into the existing programme.',translation:'这门新课程将把实践培训纳入现有课程体系。',zhHighlight:'纳入',lastTime:'9月14日2026年',age:'day'},
  {id:'key-purchase',type:'key',book:'考点词',word:'purchase',phon:'/ˈpɜːtʃəs/',pos:'v.',meaning:'购买',synonyms:[{en:'buy',zh:'购买'},{en:'acquire',zh:'购得'},{en:'obtain',zh:'获得'},{en:'get',zh:'得到'}],distractor:{en:'sell',zh:'出售'},question:'Visitors can purchase tickets at the front desk.',corresponding:'Visitors can buy tickets at the front desk.',translation:'访客可以在前台购票。',zhHighlight:'购票',lastTime:'9月10日2026年',age:'week'},
  {id:'answer-music',type:'answer',book:'答案词',word:'music',phon:'/ˈmjuːzɪk/',pos:'n.',meaning:'音乐',example:'She listens to music while studying.',translation:'她学习时会听音乐。',zhHighlight:'音乐',lastTime:'9月13日2026年',age:'day'},
  {id:'answer-station',type:'answer',book:'答案词',word:'station',phon:'/ˈsteɪʃn/',pos:'n.',meaning:'车站',example:'The station is only five minutes away.',translation:'车站离这里只有五分钟路程。',zhHighlight:'车站',lastTime:'9月12日2026年',age:'week'},
  {id:'topic-accommodation',type:'topic',book:'话题词',word:'accommodation',phon:'/əˌkɒməˈdeɪʃn/',pos:'n.',meaning:'住宿；住处',choices:['住宿；住处','交通；运输','设备；器材','预约；预订'],example:'The hotel provides comfortable accommodation for all guests.',translation:'这家酒店为所有客人提供舒适的住宿。',zhHighlight:'住宿',lastTime:'9月5日2026年',age:'month'},
  {id:'topic-reservation',type:'topic',book:'话题词',word:'reservation',phon:'/ˌrezəˈveɪʃn/',pos:'n.',meaning:'预约；预订',choices:['维修；保养','路线；路径','预约；预订','材料；原料'],example:'You should make a reservation before visiting the restaurant.',translation:'去这家餐厅之前你应该先预订。',zhHighlight:'预订',lastTime:'7月20日2026年',age:'old'}
]

function getWordsByType(type){ return words.filter(item => item.type === type) }
function getWord(id){ return words.find(item => item.id === id) }
module.exports = { books, words, getWordsByType, getWord }
