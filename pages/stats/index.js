Page({
 data:{summaries:[{label:'累计学习单词',value:'486',note:'本周新增72个'},{label:'练习正确率',value:'84%',note:'较上周提升6%'},{label:'累计学习时长',value:'8.6h',note:'本周2.3小时'},{label:'连续学习',value:'7天',note:'保持每日学习'}],trend:[{day:'一',value:22,height:70},{day:'二',value:35,height:105},{day:'三',value:18,height:58},{day:'四',value:60,height:172},{day:'五',value:48,height:140},{day:'六',value:78,height:220},{day:'日',value:69,height:195}],activePoint:-1,mastery:[{name:'考点词',value:82},{name:'答案词',value:76},{name:'话题词',value:68}]},
 showPoint(e){this.setData({activePoint:e.currentTarget.dataset.index})}
})
