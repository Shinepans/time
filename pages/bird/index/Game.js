import Component from './Component.js';
import config from '../config.js';

class Game {
    constructor(config) {
        this.ctx = wx.createContext();
        this.canvasWidth = config.canvasWidth;
        this.canvasHeight = config.canvasHeight;
        this.maxScore = wx.getStorageSync('maxScore') || 0;  // 不明白为啥操作storage都要分同步异步
        // 这里有和react一样的问题，由于要把子组件的状态传到父组件中，只能使用callback的方式
        // 小程序又没有flux
        this.statusCallback = config.statusCallback;
    }

    /**
     * 开始一局游戏
     */
    start() {
        // 先清空整个canvas
        this.draw();

        if (!this.canvasWidth || !this.canvasHeight) {
            // 如果不知道canvas的大小，根本无法游戏，直接报错
            // canvas里居然还能绘制emoji表情。。。
            let error = new Component({ context: this.ctx, type: 'text', text: '获取屏幕宽高信息出错 😓', x: 5, y: 30 });
            error.update();
            this.draw();
            this.statusCallback(0);
            return;
        }

        // 初始化一些变量
        this.role = new Component({ x: 5, y: this.canvasHeight - 40, canvasHeight: this.canvasHeight, context: this.ctx, width: 40, height: 40, type: 'bird' });  // 玩家控制的角色，注意调整位置和大小
        this.score = new Component({ context: this.ctx, type: 'text', text: '分数: 0', x: this.canvasWidth - 125, y: 30 });  // 分数
        this.obstacles = [];  // 障碍物
        this.frameCount = 0;  // 当前总共经过了多少帧

        // 只能手动bind this了
        // 绘制下一帧，注意刷新率
        this.interval = setInterval(this.nextFrame.bind(this), 60);

        // 将page的状态改为游戏中
        this.statusCallback(1);

        // 播放背景音乐
        // 有个bug，手机上调试的时候没声音，模拟器里正常
        wx.playBackgroundAudio({
            dataUrl: config.bgMusic.url,
            success: function (e) {
                console.debug('play music success: %o', e);
                wx.seekBackgroundAudio({
                    position: config.bgMusic.offset  // 单位是秒，还可以用小数
                });
            }
        });
    }

    /**
     * 在canvas上绘制图形，注意操作context
     */
    draw(reserve = false) {  // ES6默认参数
        wx.drawCanvas({
            canvasId: 1,  // canvas id暂时写死
            actions: this.ctx.getActions(),
            reserve: reserve  // 是否先清空再绘制
        })
    }

    // 蛋疼，不支持箭头函数，不能自动绑定this

    /**
     * 绘制下一帧
     */
    nextFrame() {
        // 第一步，帧数++
        this.frameCount++;
        this.score.text = '分数: ' + this.frameCount;

        // 第二步，随机生成障碍物
        // 每隔固定帧数就生成一个障碍物
        if (this.frameCount % 13 == 0) {
            let x = this.canvasWidth;
            let minHeight = 20, maxHeight = 200;
            let trueHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            let minGap = 50, maxGap = 200;
            let trueGap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            this.obstacles.push(new Component({ x: x, y: 0, width: 10, height: trueHeight, xSpeed: -10, context: this.ctx }));
            this.obstacles.push(new Component({ x: x, y: trueHeight + trueGap, width: 10, height: this.canvasHeight - trueHeight - trueGap, xSpeed: -10, context: this.ctx }));
        }
        let count = 0;
        for (let obstacle of this.obstacles) {
            if (obstacle.x < 0)
                count++;
            else
                break;
        }
        for (let i = 0; i < count; i++) {
            this.obstacles.shift();
        }

        this.role.newPos();
        this.role.update();
        this.score.update();
        for (let obstacle of this.obstacles) {
            obstacle.newPos();
            obstacle.update();
        }
        this.draw();

        for (let obstacle of this.obstacles) {
            if (this.role.crashWith(obstacle)) {
                this.stop();
                break;
            }
        }
    }

    stop() {
        clearInterval(this.interval);
        wx.stopBackgroundAudio();
        this.sendRecord();
        var that = this;
        wx.showModal({
            title: '游戏结束',
            content: this.frameCount > this.maxScore ? '新记录！！你的分数：' + this.frameCount : '你的分数是：' + this.frameCount + '，最高记录：' + this.maxScore,
            confirmText: '不玩了',
            cancelText: '再来一盘',
            success: function (res) {
                let newMaxScore = Math.max(that.frameCount, that.maxScore);
                wx.setStorageSync('maxScore', newMaxScore);
                that.maxScore = newMaxScore;
                if (res.confirm) {
                    // 将page的状态改为游戏结束
                    that.statusCallback(2);
                    //wx.navigateTo({
                    //    url: '../list/index'
                    //});
                }
                // 重新开始游戏 
                else {
                    that.start();
                }
            }
        });
    }

    sendRecord() {
        const app = getApp();
        const that = this;
        const score = this.frameCount;
        console.debug('send record to server: %o', score);
    }

    up() {
        this.role.newYAcc = -1;
    }

    down() {
        this.role.newYAcc = 1;
    }
}

export default Game;
