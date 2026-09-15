const { books } = require('../../utils/data')
Page({
  data:{books,modalVisible:false,selectedType:'key',selectedGroup:12,selectedBook:books[0],modes:[]},
  continueBook(e){ this.openMode(e.currentTarget.dataset.type,Number(e.currentTarget.dataset.group)) },
  chooseGroup(e){ wx.navigateTo({url:`/pages/groups/index?type=${e.currentTarget.dataset.type}`}) },
  openMode(type,group){const selectedBook=books.find(x=>x.type===type);this.setData({selectedType:type,selectedGroup:group,selectedBook,modes:this.getModes(type),modalVisible:true})},
  getModes(type){return type==='key'?[{name:'刷词速记',desc:'快速听音，复习释义和同义替换',value:'flash'},{name:'同替练习',desc:'听主词条后，多选同义替换',value:'practice'}]:type==='answer'?[{name:'刷词速记',desc:'快速听音并熟悉答案词',value:'flash'},{name:'拼写练习',desc:'听音后完整拼写答案词',value:'practice'}]:[{name:'刷词速记',desc:'快速听音并记忆话题词含义',value:'flash'},{name:'词义速记',desc:'只听发音，选择正确中文含义',value:'practice'}]},
  enterPractice(e){wx.navigateTo({url:`/pages/practice/index?source=book&type=${this.data.selectedType}&group=${this.data.selectedGroup}&mode=${e.currentTarget.dataset.mode}`});this.closeModal()},
  closeModal(){this.setData({modalVisible:false})},noop(){}
})
