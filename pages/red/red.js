// pages/red/red.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    funcs: [
      'SH Red',
      'PS Red',
      'SH Pay',
      'PS Pay'
    ],
    funcsUrl: [
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/red/redSH.jpg',
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/red/redPS.png',
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/red/shouSH.jpg',
      'http://7xq5e8.com1.z0.glb.clouddn.com/beans/red/shouPS.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  changeFunc: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
})