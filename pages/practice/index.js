const { getWordsByType, words } = require('../../utils/data')
const review = require('../../services/review')
const audio = require('../../services/audio')
function buildKeyOptions(item){
 const correct=(item.synonyms||[]).map(x=>({...x,correct:true,selected:false})),target=correct.length>2?5:3;
 const used=new Set([item.word.toLowerCase(),...correct.map(x=>x.en.toLowerCase())]);
 const pool=[...(item.distractors||[]),...words.map(x=>({en:x.word,zh:x.meaning}))];
 const distractors=[];
 pool.forEach(x=>{const key=(x.en||'').toLowerCase();if(key&&!used.has(key)&&distractors.length<target-correct.length){used.add(key);distractors.push({...x,correct:false,selected:false})}});
 return [...correct,...distractors].slice(0,target)
}
function textParts(text='',highlights=[]){
 const terms=(Array.isArray(highlights)?highlights:[highlights]).filter(Boolean).sort((a,b)=>b.length-a.length);if(!terms.length)return[{text,hl:false}];
 const escaped=terms.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),re=new RegExp(`(${escaped.join('|')})`,'g');
 return text.split(re).filter(Boolean).map(part=>({text:part,hl:terms.includes(part)}))
}
Page({
 data:{source:'book',type:'key',group:1,mode:'practice',queue:[],index:0,item:null,currentItem:null,options:[],answerInput:'',selectedChoice:-1,submitted:false,correct:false,bookName:'考点词',practiceName:'同替练习',showAnswerMeaning:true,spellCells:[],spellStage:'input',spellFeedback:'',spellFocusIndex:-1,topicStage:'input',translationParts:[]},
 onLoad(q){
  let queue=[],mode=q.mode||'practice';
  if(q.source==='review'){const session=review.getReviewQueue();queue=session.queue;mode=session.mode}else queue=getWordsByType(q.type||'key');
  this.setData({source:q.source||'book',type:q.type||'',group:Number(q.group||1),mode,queue});this.loadItem(0)
 },
  loadItem(index){const item=this.data.queue[index];if(!item)return;const bookName=item.book;const practiceName=item.type==='key'?'同替练习':item.type==='answer'?'拼写练习':'词义速记';const options=item.type==='key'?buildKeyOptions(item):[];const spellCells=item.type==='answer'?item.word.split('').map((_,cellIndex)=>({id:cellIndex,value:'',status:''})):[];this.setData({index,item,currentItem:item,bookName,practiceName,options,answerInput:'',selectedChoice:-1,submitted:false,correct:false,spellCells,spellStage:'input',spellFeedback:'',spellFocusIndex:item.type==='answer'?0:-1,topicStage:'input',translationParts:textParts(item.translation,item.zhHighlights||[])})},
 toggleOption(e){if(this.data.submitted)return;const i=e.currentTarget.dataset.index,options=this.data.options;options[i].selected=!options[i].selected;this.setData({options})},
 onAnswerInput(e){this.setData({answerInput:e.detail.value})},
 onSpellCellInput(e){
  if(this.data.submitted)return;
  const index=Number(e.currentTarget.dataset.index),spellCells=this.data.spellCells.slice();
  const value=(e.detail.value||'').slice(-1).toLowerCase().replace(/[^a-z]/g,'');
  spellCells[index]={...spellCells[index],value,status:''};
  this.setData({spellCells,spellFocusIndex:value&&index<spellCells.length-1?index+1:index});
 },
 toggleAnswerMeaning(e){this.setData({showAnswerMeaning:e.detail.value})},
 markSpelling(){
  const word=this.data.item.word.toLowerCase(),spellCells=this.data.spellCells.map((cell,index)=>({...cell,status:cell.value.toLowerCase()===word[index]?'correct':'wrong'}));
  const correct=spellCells.map(cell=>cell.value.toLowerCase()).join('')===word;
  this.setData({spellCells,correct});
  return {correct,spellCells};
 },
 confirmSpelling(){
  const {correct,spellCells}=this.markSpelling();
  if(this.data.spellStage==='input'&&!correct){
   review.addWrongWord(this.data.item,'拼写错误');
   const firstWrong=spellCells.findIndex(cell=>cell.status==='wrong');
   this.setData({spellStage:'retry',spellFeedback:'拼写完成：绿色为正确字母，红色为错误字母；该词已自动加入复习。',spellFocusIndex:firstWrong});
   return;
  }
  this.revealSpellingAnswer(correct);
 },
 viewSpellingAnswer(){const {correct}=this.markSpelling();this.revealSpellingAnswer(correct)},
 revealSpellingAnswer(correct){
  if(!correct&&this.data.spellStage==='input')review.addWrongWord(this.data.item,'拼写错误');
  this.setData({submitted:true,correct,spellStage:'revealed',spellFeedback:correct?'拼写正确':'拼写完成：绿色为正确字母，红色为错误字母；该词已自动加入复习。',spellFocusIndex:-1});
 },
 selectChoice(e){if(!this.data.submitted)this.setData({selectedChoice:e.currentTarget.dataset.index})},
 submit(){const {item,options,selectedChoice}=this.data;let correct=false,reason='';if(item.type==='key'){correct=options.every(x=>x.selected===x.correct);reason='同替误选'}else if(item.type==='answer'){this.confirmSpelling();return}else{correct=selectedChoice>=0&&item.choices[selectedChoice]===item.meaning;reason='词义混淆'}if(!correct)review.addWrongWord(item,reason);this.setData({submitted:true,correct,topicStage:item.type==='topic'?'answered':this.data.topicStage})},
 showTopicAnalysis(){
  if(this.data.item.type!=='topic')return;
  const {item,selectedChoice,submitted}=this.data;
  const correct=selectedChoice>=0&&item.choices[selectedChoice]===item.meaning;
  if(!submitted&&!correct)review.addWrongWord(item,'词义混淆');
  this.setData({submitted:true,correct,topicStage:'analysis'});
 },
 replayTopic(){if(this.data.item.type!=='topic')return;const index=this.data.index,word=this.data.item.word;this.loadItem(index);audio.playWord(word)},
 prev(){if(this.data.index>0)this.loadItem(this.data.index-1)},next(){if(this.data.index<this.data.queue.length-1)this.loadItem(this.data.index+1);else wx.showModal({title:'本轮练习完成',content:`已完成 ${this.data.queue.length} 个单词`,showCancel:false,success:()=>this.backToList()})},
 backToList(){if(this.data.source==='review')wx.switchTab({url:'/pages/review/index'});else wx.redirectTo({url:`/pages/groups/index?type=${this.data.item.type}`})},
 playMain(){audio.playWord(this.data.item.word)},playAny(e){audio.playWord(e.currentTarget.dataset.word)}
})
