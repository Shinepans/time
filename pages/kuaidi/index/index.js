const kuaidiID = [
  "shentong", "ems", "shunfeng", "yuantong", "zhongtong", "yunda", "tiantian", "huitongkuaidi", "quanfengkuaidi", "debangwuliu", "zhaijisong"]

// pages/kuaidi/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    index: 0,
    danhao: '',
    kuaidi: [
      "申通","EMS","顺丰","圆通","中通","韵达","天天","汇通" ,"全峰","德邦","宅急送"]
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

  inputNumber: function (e) {
    this.setData({
      danhao: e.detail.value
    })
  },

  changeKuaidi: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  startFind: function (e) {
    
    wx.redirectTo({
      url: '../logs/logs?name=' + kuaidiID[this.data.index] + '&id=' + this.data.danhao,
    })
  }
})