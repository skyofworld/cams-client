import Dialog from '../../../../component/vant/dialog/dialog'
import Toast from '../../../../component/vant/toast/toast'

let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    resources: [],
    activeBar: 2,
  },
  
  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.user[e.detail]
    })
  },

  onClick: function(e) {
    let {item} = e.currentTarget.dataset
    this.data.resources.forEach((val, idx) => {
      if (val.id === item.id) {
        val.times++
      }
    })
    Toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: '请稍等...',
      loadingType: 'spinner',
      selector: '#van-toast'
    });

    let second = 1
    const timer = setInterval(() => {
      second--
      if (!second) {
        clearInterval(timer)
        Toast.clear()
        Toast.success('开始下载')
        this.setData({
          resources: this.data.resources
        })
      }
    }, 1000)
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { resources } = require('../../../../utils/data/resources.js')
    this.setData({
      resources: resources
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