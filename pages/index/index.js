import Toast from '../../component/vant/toast/toast'
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    roles: [
      {
        id: 4,
        name: '居民',
        checked: true
      },
      {
        id: 3,
        name: '导师',
        checked: false
      },
      {
        id: 2,
        name: '发起方',
        checked: false
      },
      {
        id: 1,
        name: '管理员',
        checked: false
      },
    ],
    show: true,
    userInfo: {
      id: '',
      password: ''
    }
  },

  onChangeOfId: function(e) {
    this.setData({
      'userInfo.id': e.detail
    })
  },

  onChangeOfPassword: function(e) {
    this.setData({
      'userInfo.password': e.detail
    })
  },
  
  onClose(event) {
    if (event.detail === 'confirm') {
      // 异步关闭弹窗
      setTimeout(() => {
        if (!this.route(this.data.userInfo)) {
          this.setData({
            show: false
          });
          Toast.fail('错误的登录信息');
          this.setData({
            show: true
          })
        }
      }, 1000);
    } else {

    }
  },

  route: function(userInfo) {
    app.globalData.users.forEach((val, idx)=>{
      if (userInfo.id == val.id
        && userInfo.password == val.password) {
          app.globalData.userInfo = val
          this.redirect(val.type)
        }
    })
    return false
  },

  redirect: function(type) {
    let idx = -1
    switch(type){
      case '总管': idx = 0
      break
      case '楼管': idx = 1
      break
      case '教师': idx = 2
      break
      case '学生': idx = 2
      break
    }
    if (idx != -1) {
        wx.redirectTo({
        url: app.globalData.homePages[idx],
      })
    }
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
