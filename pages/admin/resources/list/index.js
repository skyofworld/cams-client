import Dialog from '../../../../component/vant/dialog/dialog'
import Toast from '../../../../component/vant/toast/toast'

let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    resources: [], 
    resource: {
      id: '',
      name: '',
      times: 0,
      desc: '',
      imgURL: '/resources/images/resource.jpg',
      downloadURL: ''
    },
    activeTab: 0,
    activeBar: 2,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.admin[e.detail]
    })
  },

  onDownload: function(e) {
    let { item } = e.currentTarget.dataset
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
    setTimeout(()=>{
      Toast.clear()
      Toast.success('开始下载')
      this.setData({
        resources: this.data.resources
      })
    }, 1000)
  },

  onRemove: function(e) {
    Dialog.confirm({
      message: '移除此项?'
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
        this.data.resources.forEach((val, idx) => {
          if (val.id === item.id) {
            this.data.resources.splice(idx, 1)
          } 
          this.setData({
            resources: this.data.resources
          })
        })
        Toast.clear()
        Toast.success('已移除')
      }, 1000)
    }).catch(() => {
      // on cancel
    })
  },

  onChangeOfName: function(e) {
    this.setData({
      'resource.name': e.detail
    })
  },

  onChangeOfDownloadURL: function (e) {
    this.setData({
      'resource.downloadURL': e.detail
    })
  },

  onChangeOfDesc: function (e) {
    this.setData({
      'resource.desc': e.detail
    })
  },

  onUpload: function(e) {
    const resource = this.data.resource
    if (resource.name ===  '' ||
        resource.downloadURL === '') {
          Toast.fail('信息不完整')
          return
        }
    Toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: '请稍等...',
      loadingType: 'spinner',
      selector: '#van-toast'
    })
    setTimeout(() => {
      if (resource.desc === '') {
        resource.desc = '尚无描述信息'
      }
      this.data.resources.push(resource)
      this.setData({
        resources: this.data.resources
      })
      Toast.clear()
      Toast.success('发布成功')
    }, 1000)
  },

  onClickIcon: function() {
    wx.showToast({
      icon: 'none',
      title: '暂不支持文件直接上传'
    });
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