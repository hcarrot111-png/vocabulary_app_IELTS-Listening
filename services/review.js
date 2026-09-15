const KEY = 'listening_vocab_review_words'
const QUEUE_KEY = 'listening_vocab_review_queue'

function getReviewWords(){ return wx.getStorageSync(KEY) || [] }
function saveReviewWords(list){ wx.setStorageSync(KEY, list) }
function addWrongWord(word, reason){
  const list = getReviewWords().filter(item => item.id !== word.id)
  list.unshift({...word, reason, lastTime: formatDate(new Date()), age:'day'})
  saveReviewWords(list)
}
function seedReviewWords(defaults){
  if(!getReviewWords().length) saveReviewWords(defaults)
}
function setReviewQueue(queue, mode){ wx.setStorageSync(QUEUE_KEY, {queue, mode}) }
function getReviewQueue(){ return wx.getStorageSync(QUEUE_KEY) || {queue:[],mode:'practice'} }
function formatDate(date){ return `${date.getMonth()+1}月${date.getDate()}日${date.getFullYear()}年` }
module.exports = { getReviewWords, saveReviewWords, addWrongWord, seedReviewWords, setReviewQueue, getReviewQueue }
