// pages/tianqi/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '选择城市',
    display: 'chose_city',
    data: '',
    index: '',
    funcs: [
      '南开区',
      '武昌区',
      '洪山区',
      '青山区',
      '咸安区'
    ],
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
    const weather_city = wx.getStorageSync('weather_city') || ''
    if (weather_city !== '') {
      this.setData({city: weather_city, display: 'index'})
      this.getData(weather_city)
    }
  },

  choseNewCity: function (options) {
    this.setData({display: 'chose_city'})
  },

  getData: function (city) {
    const reqUrl = 'https://jisutqybmf.market.alicloudapi.com/weather/query?city=' + `${city || this.data.funcs[this.data.index]}`
    const that = this
    wx.request({
      url: reqUrl,
      header: {
        "X-Ca-Timestamp": Date.now().toString(),
        "gateway_channel": "https",
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "APPCODE cdd16ea4905749b2ba2adeb6b9aea054"
      },
      success: function (tq) {
        wx.setStorageSync('tianqi_data', tq.result)
        console.log(tq.data)
        console.log(tq.data.result.city)
        that.setData({
          display: 'index',
          data: tq.data.result,
          city: tq.data.result.city
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

  changeFunc: function (e) {
    this.setData({
      index: e.detail.value
    })
    wx.setStorageSync('weather_city', this.data.funcs[e.detail.value])
    this.getData(this.data.funcs[e.detail.value])
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