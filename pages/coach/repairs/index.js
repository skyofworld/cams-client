import Toast from '../../../component/vant/toast/toast'

let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    repair: {
      id: '',
      roomId: '',
      object: '',
      desc: '尚无描述信息',
      state: 0,
      reportDate: '',
      repairDate: '',
      imgURL: '/resources/images/computer.jpg'
    },
    activeBar: 1,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.steward[e.detail]
    })
  },

  onChangeOfID: function(e) {
    this.setData({
      'repair.roomId': e.detail
    })
  },
  onChangeOfObject: function(e) {
    this.setData({
      'repair.object': e.detail
    })
  },
  onChangeOfDesc: function(e){
    this.setData({
      'repair.desc': e.detail
    })
  },

  onSubmit: function(e) {
    Toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: '请稍等...',
      loadingType: 'spinner',
      selector: '#van-toast'
    });
    setTimeout(()=>{
      Toast.clear()
      Toast.success('保修成功!')
    }, 1000)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
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