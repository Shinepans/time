Page({
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.setData({
    	workTime: wx.getStorageSync('time_workTime'),
    	restTime: wx.getStorageSync('time_restTime')
    })
  },
  changeWorkTime: function(e) {
  	wx.setStorage({
  		key: 'time_workTime',
  		data: e.detail.value
  	})
  },
  changeRestTime: function(e) {
  	wx.setStorage({
  		key: 'time_restTime',
  		data: e.detail.value
  	})
  },
  backHome: function (e) {
    wx.reLaunch({url: '../../all/index'})
  }
})
