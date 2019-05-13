import Dialog from '../../../../component/vant/dialog/dialog'
import Toast from '../../../../component/vant/toast/toast'

let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    feedbacks: [],
    reply: '',
    show: false,
    activeBar: 2,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.steward[e.detail]
    })
  },

  onRemove: function (e) {
    let { item } = e.currentTarget.dataset.item
    Dialog.confirm({
      message: '移除此项?',
      selector: '#simple-dialog'
    }).then(() => {
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '请稍等...',
        loadingType: 'spinner',
        selector: '#van-toast'
      })
      setTimeout(() => {
        let { item } = e.currentTarget.dataset
        this.data.feedbacks.forEach((val, idx) => {
          if (val.id === item.id) {
            this.data.feedbacks.splice(idx, 1)
          }
          this.setData({
            feedbacks: this.data.feedbacks
          })
        })
        Toast.clear()
        Toast.success('已移除')
      }, 1000)
    }).catch(() => {
      // on cancel
    })
  },

  onChangeOfReply: function (e) {
    this.setData({
      reply: e.detail
    })
  }, 

  onDetail: function(e) {
    // let feedback = JSON.stringify(e.currentTarget.dataset.feedback)
    // wx.navigateTo({
    //   url: `../detail/index?feedback=${feedback}`
    //   })
    this.setData({
      show: true
    })
  },
  
  onClose(e) {
    if (e.detail === 'confirm') {
      setTimeout(() => {
        Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          message: '回复中...',
          loadingType: 'spinner',
          selector: '#van-toast'
        });
        setTimeout(() => {
          this.setData({
            show: false
          })
          Toast.clear()
          Toast.success('回复成功!')
        }, 1000)
      }, 1000)
    } else {
      this.setData({
        show: false
      });
    }
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { feedbacks } = require('../../../../utils/data/feedbacks.js')
    this.setData({
      feedbacks: feedbacks
    })
  },

  onClick: function(e) {
    wx.navigateTo({
      url: '../publish/index',
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