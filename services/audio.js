let audioContext = null
function playWord(word){
  const base = getApp().globalData.audioBaseUrl
  if(!base){ wx.showToast({title:`发音资源待接入：${word}`,icon:'none'}); return }
  if(audioContext) audioContext.destroy()
  audioContext = wx.createInnerAudioContext()
  audioContext.src = `${base}/${encodeURIComponent(word)}.mp3`
  audioContext.play()
}
module.exports = { playWord }
