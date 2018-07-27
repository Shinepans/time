//app.js
const defaultTime = {
  defaultWorkTime: 25,
  defaultRestTime: 5
}

App({
  onLaunch: function() {

  	// Time
    let workTime = wx.getStorageSync('time_workTime')
    let restTime = wx.getStorageSync('time_restTime')
    if (!workTime) {
      wx.setStorage({
        key: 'time_workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'time_restTime',
        data: defaultTime.defaultRestTime
      })
    }
    // Time end

    // Calendar
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // Calendar end
  },

  // 用户信息
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    appkey:'10dca2066a3061eaee8cc0f0d807da31',
    historyKey: '3967fd0a9a5b4e5ea58b3141e55ee3a8',
    joyKey: '10dca2066a3061eaee8cc0f0d807da31',
    pagesize:10,
  }
})
