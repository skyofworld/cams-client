import Dialog from '../../../../component/vant/dialog/dialog'
import Toast from '../../../../component/vant/toast/toast'

let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    notifications: [], 
    notification: {
      id: '',
      title: '',
      times: 0,
      datetime: '',
      type: '',
      content: '',
      desc: '尚无描述信息',
    },
    types: [
      '教务通知',
      '失物招领'
    ],
    show: false,
    activeTab: 0,
    activeBar: 0,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.steward[e.detail]
    })
  },

  onDetail: function(e) {
    let notification = JSON.stringify(e.currentTarget.dataset.notification)
    wx.navigateTo({
      url: `/pages/common/pages/noti-detail/index?notification=${notification}`
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
        this.data.notifications.forEach((val, idx) => {
          if (val.id === item.id) {
            this.data.notifications.splice(idx, 1)
          }
          this.setData({
            notifications: this.data.notifications
          })
        })
        Toast.clear()
        Toast.success('已移除')
      }, 1000)
    }).catch(() => {
      // on cancel
    })
  },

  onChangeOfType: function(e) {
    this.setData({
      'notification.type': e.detail.value
    })
  },

  onSubmit: function (e) {
    this.setData({ show: true });
  },

  onClose(event) {
    if (event.detail === 'confirm') {
      setTimeout(() => {
        Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          message: '发布中...',
          loadingType: 'spinner',
          selector: '#van-toast'
        });
        setTimeout(()=>{
          this.setData({
            show: false
          })
          Toast.clear()
          Toast.success('发布成功!')
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
    const { notifications } = require('../../../../utils/data/notifications.js')
    this.setData({
      notifications: notifications
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