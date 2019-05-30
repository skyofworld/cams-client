Page({

  /**
   * Page initial data
   */
  data: {
    sponsors: [
      {
        id: 1,
        name: 'sponsor1',
        status: 0,
        credit: 22,
        identity_card: '',
        phone: '123456',
        email: 'email'
      }
    ],
    coaches: [
      {
        id: 1,
        name: 'coach1',
        status: 0,
        credit: 22,
        identity_card: '',
        phone: '123456',
        email: 'email'
      }
    ],
    residents: [
      {
        id: 1,
        name: 'resident1',
        status: 0,
        credit: 22,
        identity_card: '',
        phone: '123456',
        email: 'email'
      }
    ],
    activeTab: 0,
    activeBar: 3,
  },
  
  onChangeOfTabbar: function(e) {
    wx.redirectTo({
      url: getApp().globalData.tabBars.admin[e.detail]
    })
  },

  onChangeOfTab(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
    this.setData({
      activeTab: event.detail.index
    })
  },

  onTap: function(e) {
    let act = e.currentTarget.dataset.act
    let to = `/pages/common/pages/act-detail/index?act=${JSON.stringify(act)}`
    wx.navigateTo({
      url: to
      })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { activities } = require('../../../utils/data/activities.js')
    this.setData({
      activities
    })
    // this.data.activities.forEach((val, idx)=>{
    //   if (val.times < 100) {
    //     this.data.infoCount ++
    //   }
    // })
    // this.setData({
    //   infoCount: this.data.infoCount
    // })
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