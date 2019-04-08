import Dialog from '../../../component/vant/dialog/dialog'
import Toast from '../../../component/vant/toast/toast'

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    feedbackMessage: '',
    rateValue: 5,
    activeBar: 3,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.steward[e.detail]
    })
  },

  onChangeOfRate: function (e) {
    this.setData({
      value: e.detail
    })
  },

  onClickToFeedback: function (e) {
    Toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: '反馈中...',
      loadingType: 'spinner',
      selector: '#van-toast'
    })

    //request parameter: JSON.stringify(feedBack)
    // let feedBack = {
    //   message: this.data.feedbackMessage,
    //   rate: this.data.rateValue
    // }
    //mock: 
    setTimeout(()=>{
      Toast.clear()
      Toast.success('反馈成功!')
      this.setData({
        feedbackMessage: '感谢您的反馈!'
      })
    }, 1000)
  },

  onLogout: function (e) {
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