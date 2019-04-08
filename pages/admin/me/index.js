import Dialog from '../../../component/vant/dialog/dialog'
import Toast from '../../../component/vant/toast/toast'

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    activeBar: 3,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.admin[e.detail]
    })
  },

  onLogout: function(e) {
    Dialog.confirm({
      message: '退出登录吗'
    }).then(() => {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }).catch(() => {
      // on cancel
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})