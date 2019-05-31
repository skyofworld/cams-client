// pages/resident/all-activities/index.js
import Dialog from '../../../component/vant/dialog/dialog'
import Toast from '../../../component/vant/toast/toast'
Page({

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: getApp().globalData.tabBars.resident[e.detail]
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    activities: [],
    activeBar: 0,
  },

  onChange(e) {
    const { key } = e.currentTarget.dataset
    this.setData({
      [key]: e.detail
    });
  },
  onTap: function (e) {
    let act = e.currentTarget.dataset.act
    let to = `/pages/common/pages/act-detail/index?act=${JSON.stringify(act)}`
    wx.navigateTo({
      url: to
    })
  },
  /**
   * 生命周期函数--监听页面加载
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onselect: function (e) {
   Dialog.confirm({
     title: "确定申请加入该活动吗？"
   }).then(() => {
     //request parameter: application.id
     //mock: 
     // this.data.applications.forEach((val, idx) => {
     //   if (val.id === application.id) {
     //     this.data.applications.splice(idx, 1)
     //   }
     // })

     Toast.loading({
       duration: 2000,       // 持续展示 toast
       forbidClick: true, // 禁用背景点击
       message: '提交中...',
     })
     addActivity(act, res => {
       let success = res.data.code == 200
       if (success) {
         Toast.clear()
         Toast.success('申请成功')
       } else {
         Toast.fail('申请失败')
       }
     })
     // setTimeout(() => {
     //   Toast.clear()
     //   Toast.success('取消成功!')
     //   this.setData({
     //     applications: this.data.applications
     //   })
     // }, 1000)
   }).catch(() => {
     // Toast.fail('本地错误!')
   })
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