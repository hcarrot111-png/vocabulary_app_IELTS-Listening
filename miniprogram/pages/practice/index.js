const { getWordsByType } = require('../../utils/data')
const review = require('../../services/review')
const audio = require('../../services/audio')
Page({
 data:{source:'book',type:'key',group:1,mode:'practice',queue:[],index:0,item:null,currentItem:null,options:[],answerInput:'',selectedChoice:-1,submitted:false,correct:false,bookName:'考点词',practiceName:'同替练习'},
 onLoad(q){
  let queue=[],mode=q.mode||'practice';
  if(q.source==='review'){const session=review.getReviewQueue();queue=session.queue;mode=session.mode}else queue=getWordsByType(q.type||'key');
  this.setData({source:q.source||'book',type:q.type||'',group:Number(q.group||1),mode,queue});this.loadItem(0)
 },
  loadItem(index){const item=this.data.queue[index];if(!item)return;const bookName=item.book;const practiceName=item.type==='key'?'同替练习':item.type==='answer'?'拼写练习':'词义速记';const options=item.type==='key'?[...(item.synonyms||[]).map(x=>({...x,correct:true,selected:false})),...(item.distractor?[{...item.distractor,correct:false,selected:false}]:[])]:[];this.setData({index,item,currentItem:item,bookName,practiceName,options,answerInput:'',selectedChoice:-1,submitted:false,correct:false})},
 toggleOption(e){if(this.data.submitted)return;const i=e.currentTarget.dataset.index,options=this.data.options;options[i].selected=!options[i].selected;this.setData({options})},
 onAnswerInput(e){this.setData({answerInput:e.detail.value})},selectChoice(e){if(!this.data.submitted)this.setData({selectedChoice:e.currentTarget.dataset.index})},
 submit(){const {item,options,answerInput,selectedChoice}=this.data;let correct=false,reason='';if(item.type==='key'){correct=options.every(x=>x.selected===x.correct);reason='同替误选'}else if(item.type==='answer'){correct=answerInput.trim().toLowerCase()===item.word.toLowerCase();reason='拼写错误'}else{correct=selectedChoice>=0&&item.choices[selectedChoice]===item.meaning;reason='词义混淆'}if(!correct)review.addWrongWord(item,reason);this.setData({submitted:true,correct})},
 prev(){if(this.data.index>0)this.loadItem(this.data.index-1)},next(){if(this.data.index<this.data.queue.length-1)this.loadItem(this.data.index+1);else wx.showModal({title:'本轮练习完成',content:`已完成 ${this.data.queue.length} 个单词`,showCancel:false,success:()=>this.backToList()})},
 backToList(){if(this.data.source==='review')wx.switchTab({url:'/pages/review/index'});else wx.redirectTo({url:`/pages/groups/index?type=${this.data.item.type}`})},
 playMain(){audio.playWord(this.data.item.word)},playAny(e){audio.playWord(e.currentTarget.dataset.word)}
})
