function formatTime(time, format) {
  let temp = '0000000000' + time
  let len = format.length
  return temp.substr(-len)
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTimeCalendar(data) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()


	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function request(url, page, success, fail) {
  console.log(url);
  if (typeof success != 'function' || typeof fail != 'function') {
    return
  }
  var app = getApp()
  wx.request({
    url: url,
    data: {
      key: app.globalData.appkey,
      page: page,
      pagesize: app.globalData.pagesize
    },
    success: function (res) {
      if (res.data.error_code == 0) {
        success(res.data)
      } else {
        fail(res.data.reason)
      }
    },
    fail: function () {
      fail('网络错误')
    }

  })
}

function getJoyData(url, success, fail) {
  var app = getApp()
  console.log(app.globalData)
  var reqUrl = url + 'key=' + app.globalData.joyKey
  console.log(reqUrl)
  wx.request({
    url: reqUrl,
    success: function (res) {
      success(res.data)
    },
    fail: function () {
      console.log('error')
      fail('网络错误')
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatTimeCalendar: formatTimeCalendar,
  request: request,
  getJoyData: getJoyData
}
