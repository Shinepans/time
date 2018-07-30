var pageObject = {
  data: {
    loading: false
  },
  toTimeTool: function (e) {
    wx.reLaunch({ url: "../time/index/index" })
  },
  toCalendar: function (e) {
    wx.navigateTo({ url: "../calendar/index/index" })
  },
  toGame2048: function (e) {
    wx.navigateTo({ url: "../game2048/index/index" })
  },
  toTodos: function (e) {
    wx.navigateTo({ url: "../todos/index/index" })
  },
  toMine: function (e) {
    wx.navigateTo({ url: "../mine/index/index" })
  },
  toJoy: function (e) {
    wx.navigateTo({ url: "../joy/index/index" })
  },
  toBird: function (e) {
    wx.navigateTo({ url: "../bird/index/index" })
  },
  toKuaidi: function (e) {
    wx.navigateTo({ url: "../kuaidi/index/index" })
  },
  toRed: function (e) {
    wx.navigateTo({url: '../red/red'})
  },
  toTianqi: function (e) {
    wx.navigateTo({
      url: '../tianqi/index/index',
    })
  }
}

Page(pageObject)