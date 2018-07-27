var util = require('../../../utils/util.js')
Page({
  data: {
    logs: [],
    modalHidden: true,
    toastHidden: true
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '任务记录'
    })
    this.getLogs()
  },
  set: function() {

  },
  getLogs: function() {
    var logs = wx.getStorageSync('time_logs')
    logs.forEach(function(item, index, arry) {
      item.startTime = new Date(item.startTime).toLocaleString()
    })
    this.setData({
      logs: logs
    })
  },
  onLoad: function() {},
  switchModal: function() {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  hideToast: function() {
    this.setData({
      toastHidden: true
    })
  },
  clearLog: function(e) {
    wx.setStorageSync('time_logs', [])
    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  }
})
