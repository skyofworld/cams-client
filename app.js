//app.js
App({
  onLaunch: function () {
    const { users } = require('./utils/data/users.js')
    this.globalData.users = users
    this.globalData.userInfo = users[0]
    this.globalData.userInfo.credit = 56

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        let pagePath = '';

        // wx.request({
        //   url: this.globalData.baseUrl + '/users/login?code=' + res.code,
        //   method: 'POST',
        //   success(res) {
        //     let ret = res.data;
        //     let pageUrl = `${pagePath}?openid=${ret.data.openid}`
        //     wx.navigateTo({
        //       url: pageUrl,
        //     })
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    baseUrl: 'http://localhost:8080',
    tabBars: {
      admin: [
        "/pages/admin/activities/index",
        "/pages/admin/feedback/index",
        "/pages/admin/options/index",
        "/pages/admin/account/index",
        "/pages/admin/me/index",
      ],
      sponsor: [
        '/pages/sponsor/all-activities/index',
        '/pages/sponsor/initiate/index',
        '/pages/sponsor/my-activities/index',
        '/pages/sponsor/me/index'
      ],
      resident: [
        '/pages/resident/all-activities/index',
        '/pages/resident/my-activities/index',
        '/pages/resident/me/index'
      ],
      coach: [
        '/pages/coach/all-activities/index',
        '/pages/coach/my-activities/index',
        '/pages/coach/me/index'
      ],
    },
    homePages: [
      '/pages/admin/rooms/list/index',
      '/pages/steward/notifications/list/index',
      '/pages/applicant/notifications/list/index'
    ],
    pages: {
      actDetail: '/pages/common/act-detail/index',
      msgDetail: '/pages/common/msg-detail/index'
    },
    users: [],
    userInfo: {}
  }
})