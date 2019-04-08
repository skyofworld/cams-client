let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    notifications: [],
    activeBar: 0,
  },
  
  onChangeOfTabbar: function(e) {
    wx.redirectTo({
        url: app.globalData.tabBars.user[e.detail]
    })
  },

  onTap: function(e) {
    let noti = e.currentTarget.dataset.noti
    noti.times++
    this.data.notifications.forEach((val, idx)=>{
      if (val.id === noti.id) {
        val.times = noti.times
      }
    })
    this.setData({
      notifications: this.data.notifications
    })
    let to = `/pages/common/pages/noti-detail/index?notification=${JSON.stringify(noti)}`
    wx.navigateTo({
      url: to
      })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { notifications } = require('../../../../utils/data/notifications.js')
    this.setData({
      notifications: notifications
    })
    this.data.notifications.forEach((val, idx)=>{
      if (val.times < 100) {
        this.data.infoCount ++
      }
    })
    this.setData({
      infoCount: this.data.infoCount
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