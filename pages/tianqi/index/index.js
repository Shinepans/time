// pages/tianqi/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    laitude: '',
    longitude: '',
    speed: '',
    accuracy: '',
    city: '',
    data: '',
    index_icon: [
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/weather/kongtiao.png', 
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/weather/yundong.png', 
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/weather/ziwaixian.png', 
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/weather/ganmao.png', 
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/weather/xiche.png', 
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/weather/wuran.png', 
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/weather/chuanyi.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        let speed = res.speed
        let accuracy = res.accuracy
        let altitude = res.altitude
        console.log(res)
        that.setData({
          altitude: altitude,
          latitude: latitude,
          longitude: longitude,
          speed: speed,
          accuracy: accuracy
        })
        const reqUrl = 'https://jisutqybmf.market.alicloudapi.com/weather/query?location=' + `${latitude.toString()},${longitude.toString()}`
        wx.request({
          url: reqUrl,
          header: {
            "X-Ca-Timestamp": Date.now().toString(),
            "gateway_channel": "https",
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "APPCODE cdd16ea4905749b2ba2adeb6b9aea054"
          },
          success: function(tq) {
            wx.setStorageSync('tianqi_data', tq.result)
            console.log(tq.data)
            console.log(tq.data.result.city)
            that.setData({
              data: tq.data.result,
              city: tq.data.result.city
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})