//logs.js
var util = require('../../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('game2048_logs') || []).map(function (log) {
        return util.formatTimeCalendar(new Date(log))
      })
    })
  }
})
