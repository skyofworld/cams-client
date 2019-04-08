let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    rooms: [], 
    activeTab: 0,
    activeBar: 0,
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
    const { rooms } = require('../../../../utils/data/rooms.js')
    this.setData({
      rooms: rooms
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