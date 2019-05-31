import Dialog from '../../../component/vant/dialog/dialog'
import Toast from '../../../component/vant/toast/toast'

Page({

  /**
   * Page initial data
   */
  data: {
    activities: [],
    activeBar: 0,
    disabled:false,
  },
  
  onChangeOfTabbar: function(e) {
    wx.redirectTo({
      url: getApp().globalData.tabBars.coach[e.detail]
    })
  },

  setDisabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },

  onClick: function (e) {
    let act = e.target.dataset.act
    Dialog.confirm({
      title: `活动：${act.name}`,
      message: "确认抢单吗？"
    }).then(() => {
      let applying = {
        roomId: room.id,
        dates: this.data.dates,
        periodId: this.data.periodId,
        courseId: this.data.courseId
      }
      //request parameter: JSON.stringify(applying)
      //mock: 
      this.data.rooms.forEach((val, idx) => {
        if (val.id === applying.roomId) {
          this.data.rooms.splice(idx, 1)
        }
      })

      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '申请中...',
        loadingType: 'spinner',
        selector: '#van-toast'
      })
      setTimeout(() => {
        Toast.clear()
        Toast.success('申请成功!')
        this.setData({
          rooms: this.data.rooms
        })
      }, 1000)
    }).catch(() => {
      Toast.fail('本地错误!')
    })
  },
  onTap: function(e) {
    let act = e.currentTarget.dataset.act
    let to = `/pages/common/act-detail/index?act=${JSON.stringify(act)}`
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