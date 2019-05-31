// pages/resident/my-activities/index.js
import Dialog from '../../../component/vant/dialog/dialog'
import Toast from '../../../component/vant/toast/toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeBar: 1,
    show: "",
  },
  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: getApp().globalData.tabBars.resident[e.detail]
    })
  },
  onTap: function (e) {
    let act = e.currentTarget.dataset.act
    let to = `/pages/common/pages/act-detail/index?act=${JSON.stringify(act)}`
    wx.navigateTo({
      url: to
    })
  },
  /*tabClick: function (e) {
    let act = e.currentTarget.dataset.act
    let to = `../scancode/index`
    wx.navigateTo({
      url: to
    })
  },*/
  tabClick:function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = "结果：" + res.result + "二维码类型：" + res.scanType + "字符集：" + res.charSet + "路径：" + res.path;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
          Toast.success({
            type: 'fail',
            message: '签到失败',
            duration: 2000,
          })
      },
      complete: (res) => {
      }
    })
  },

  onClick: function (e) {
    let act = e.target.dataset.act
    Dialog.confirm({
      title: `活动：${act.name}`,
      message: "确认取消吗？"
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

 
   /**
   * 生命周期函数--监听页面加载
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
    const { activities } = require('../../../utils/data/activities.js')
    this.setData({
      activities
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})