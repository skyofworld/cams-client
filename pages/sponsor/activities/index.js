import Dialog from '../../../component/vant/dialog/dialog'
import Toast from '../../../component/vant/toast/toast'

Page({

  /**
   * Page initial data
   */
  data: {
    rooms: [],
    dates: [],
    periodId: 0,
    periodName: '',
    courseId: 0,
    courseName: '',
    activeBar: 2
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: getApp().globalData.tabBars.sponsor[e.detail]
    })
  },

  onClick: function (e) {
    let room = e.target.dataset.room
    Dialog.confirm({
      title: "机房" + room.id + "(容量" + room.capacity + ")",
      message: "确认申请吗？"
    }).then(() => {
      let applying = {
        roomId: room.id,
        dates: this.data.dates,
        periodId: this.data.periodId,
        courseId: this.data.courseId
      }
      //request parameter: JSON.stringify(applying)
      //mock: 
      this.data.rooms.forEach((val, idx)=>{
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
      setTimeout(()=>{
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

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // let param = JSON.parse(options.param)
    // this.setData({
    //   dates: param.dates,
    //   periodId: param.periodId,
    //   periodName: param.periodName,
    //   courseId: param.courseId,
    //   courseName: param.courseName
    // })
    const { availableRooms } = require('../../../utils/data/available-rooms.js')
    this.setData({
      rooms: availableRooms
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