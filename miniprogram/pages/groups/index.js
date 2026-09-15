const { books } = require('../../utils/data')
Page({
 data:{book:{},groups:Array.from({length:18},(_,i)=>i+1),selectedGroup:1,modalVisible:false,modes:[]},
 onLoad(q){const book=books.find(x=>x.type===q.type)||books[0];this.setData({book,modes:this.getModes(book.type)})},
 getModes(type){return type==='key'?[{name:'刷词速记',desc:'快速听音，复习释义和同义替换',value:'flash'},{name:'同替练习',desc:'听主词条后，多选同义替换',value:'practice'}]:type==='answer'?[{name:'刷词速记',desc:'快速听音并熟悉答案词',value:'flash'},{name:'拼写练习',desc:'听音后完整拼写答案词',value:'practice'}]:[{name:'刷词速记',desc:'快速听音并记忆话题词含义',value:'flash'},{name:'词义速记',desc:'只听发音，选择正确中文含义',value:'practice'}]},
 selectGroup(e){this.setData({selectedGroup:Number(e.currentTarget.dataset.group),modalVisible:true})},
 enterPractice(e){wx.navigateTo({url:`/pages/practice/index?source=book&type=${this.data.book.type}&group=${this.data.selectedGroup}&mode=${e.currentTarget.dataset.mode}`});this.closeModal()},
 closeModal(){this.setData({modalVisible:false})},noop(){}
})
