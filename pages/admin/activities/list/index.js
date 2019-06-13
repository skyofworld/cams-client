let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    repairs: [],
    activeBar: 1,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.admin[e.detail]
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { repairs } = require('../../../../utils/data/repairs.js')
    this.setData({
      repairs: repairs
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