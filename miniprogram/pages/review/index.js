const { words } = require('../../utils/data')
const review = require('../../services/review')
const audio = require('../../services/audio')
const bookOptions=[{value:'key',label:'考点词'},{value:'answer',label:'答案词'},{value:'topic',label:'话题词'}]
const timeOptions=[{value:'day',label:'近一天练习过'},{value:'week',label:'近一周练习过'},{value:'month',label:'近一月练习过'},{value:'old',label:'超一月未练习'}]
Page({
 data:{list:[],filtered:[],selectedBooks:['key','answer','topic'],selectedTimes:[],bookLabel:'全部',timeLabel:'最近练习',filterVisible:false,filterType:'book',filterOptions:[],pending:[],settingsVisible:false,count:10,reviewMode:'practice',detailVisible:false,detail:{},questionParts:[],correspondingParts:[],translationParts:[],exampleParts:[]},
 onLoad(){review.seedReviewWords(words.map(x=>({...x,reason:x.type==='key'?'同替误选':x.type==='answer'?'拼写错误':'词义混淆'})))},
 onShow(){const list=review.getReviewWords();this.setData({list});this.applyFilters()},
 applyFilters(){const {list,selectedBooks,selectedTimes}=this.data;this.setData({filtered:list.filter(x=>selectedBooks.includes(x.type)&&(!selectedTimes.length||selectedTimes.includes(x.age))),bookLabel:selectedBooks.length===3?'全部':selectedBooks.length===1?bookOptions.find(x=>x.value===selectedBooks[0]).label:`已选${selectedBooks.length}项`,timeLabel:selectedTimes.length?`已选${selectedTimes.length}项`:'最近练习'})},
 openBookFilter(){this.openFilter('book')},openTimeFilter(){this.openFilter('time')},openFilter(type){const src=type==='book'?bookOptions:timeOptions,selected=type==='book'?this.data.selectedBooks:this.data.selectedTimes;this.setData({filterVisible:true,filterType:type,pending:[...selected],filterOptions:src.map(x=>({...x,checked:selected.includes(x.value)}))})},
 changeFilter(e){this.setData({pending:e.detail.value})},applyFilter(){if(this.data.filterType==='book'&&!this.data.pending.length){wx.showToast({title:'至少选择一种词书',icon:'none'});return}this.setData(this.data.filterType==='book'?{selectedBooks:this.data.pending}:{selectedTimes:this.data.pending});this.closeFilter();this.applyFilters()},closeFilter(){this.setData({filterVisible:false})},
 openSettings(){this.setData({settingsVisible:true})},closeSettings(){this.setData({settingsVisible:false})},minus(){this.setData({count:Math.max(5,this.data.count-1)})},plus(){this.setData({count:Math.min(50,this.data.count+1)})},changeMode(e){this.setData({reviewMode:e.currentTarget.dataset.mode})},
 startReview(){const queue=this.data.filtered.slice(0,this.data.count);if(!queue.length){wx.showToast({title:'当前没有可复习单词',icon:'none'});return}review.setReviewQueue(queue,this.data.reviewMode);wx.navigateTo({url:'/pages/practice/index?source=review'})},
 exportList(){wx.showActionSheet({itemList:['导出 PDF','导出 CSV','导出 Word'],success:()=>wx.showToast({title:'请接入文件生成接口',icon:'none'})})},
 openDetail(e){const detail=this.data.list.find(x=>x.id===e.currentTarget.dataset.id),terms=[detail.word,...(detail.synonyms||[]).map(x=>x.en)];this.setData({detail,detailVisible:true,questionParts:this.parts(detail.question,terms),correspondingParts:this.parts(detail.corresponding,terms),translationParts:this.parts(detail.translation,detail.zhHighlights||[]),exampleParts:this.parts(detail.example,detail.word)})},
 parts(text='',highlights=[]){const terms=(Array.isArray(highlights)?highlights:[highlights]).flatMap(x=>String(x||'').split(/\s+/)).filter(Boolean).sort((a,b)=>b.length-a.length);if(!terms.length)return[{text,hl:false}];const escaped=terms.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),re=new RegExp(`(${escaped.join('|')})`,'gi');return text.split(re).filter(Boolean).map(part=>({text:part,hl:terms.some(term=>term.toLowerCase()===part.toLowerCase())}))},
 closeDetail(){this.setData({detailVisible:false})},playAny(e){audio.playWord(e.currentTarget.dataset.word)},noop(){}
})
