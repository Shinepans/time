import Game from './Game';

Page({
  data: {
    status: 0
  },

  changeStatus: function (status) {
    this.setData({ status });
  },

  onReady: function (e) {
    let gameConfig = { statusCallback: this.changeStatus };
    let that = this;

    wx.getSystemInfo({
      success: function (res) {
        console.debug('screen width = %d, height = %d', res.windowWidth, res.windowHeight);
        gameConfig.canvasWidth = res.windowWidth;
        gameConfig.canvasHeight = res.windowHeight / 2;
      },
      complete: function () {
        let game = new Game(gameConfig);
        that.game = game;
      }
    });
  },

  handleTouchStart: function (event) {
    if (this.data.status == 1)
      this.game.up();
  },

  handleTouchEnd: function (event) {
    if (this.data.status == 0)
      this.game.start();
    else if (this.data.status == 1)
      this.game.down();
    else if (this.data.status == 2)
      this.game.start();
  }
})
