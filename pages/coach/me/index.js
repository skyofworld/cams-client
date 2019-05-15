import Dialog from '../../../component/vant/dialog/dialog'
import Toast from '../../../component/vant/toast/toast'

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    active: [],
    applications: [],
    periodNames: ['一,二节','三,四,五节','六,七节','八,九节','十,十一,十二节'
    ],
    feedbackContent: '',
    rateValue: 5, 
    activeBar: 3,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.sponsor[e.detail]
    })
  },

  onChange(e) {
    const { key } = e.currentTarget.dataset
    this.setData({
      [key]: e.detail
    });
  },

  onClick: function (e) {
    let application = e.target.dataset.application
    Dialog.confirm({
      title: '取消申请',
      message: `${application.classroomId}机房
      日期${application.date}
      ${this.data.periodNames[application.periodId]}课`
    }).then(() => {
      //request parameter: application.id
      //mock: 
      this.data.applications.forEach((val, idx) => {
        if (val.id === application.id) {
          this.data.applications.splice(idx, 1)
        }
      })

      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '取消中...',
        loadingType: 'spinner',
        selector: '#van-toast'
      })
      setTimeout(()=>{
        Toast.clear()
        Toast.success('取消成功!')
        this.setData({
          applications: this.data.applications
        })
      }, 1000)
    }).catch(() => {
      Toast.fail('本地错误!')
    })
  },

  onChangeOfRate: function(e) {
    this.setData({
      value: e.detail
    })
  },

  onSubmitFeedback: function(e) {
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
        feedbackContent: '感谢您的反馈!'
      })
    }, 1000)
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
    const { applications } = require('../../../utils/data/applications.js')
    this.setData({
      userInfo: app.globalData.userInfo,
      applications: applications
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