Page({

  /**
   * Page initial data
   */
  data: {
    activityTypes: [
      {
        id: 1,
        name: '类型1',
        credit: 50,
        updateTime: '1/21/2019'
      },
      {
        id: 2,
        name: '类型2',
        credit: 100,
        updateTime: '1/21/2019'
      }
    ],
    places: [
      {
        id: 1,
        name: '地点1',
        number: 25,
        updateTime: '1/23/2019'
      },
      {
        id: 2,
        name: '地点2',
        number: 30,
        updateTime: '1/23/2019'
      }
    ],
    type: {
      name: '',
      credit: 0,
      intro: ''
    },
    place: {
      address: '',
      intro: '',
      number: 0
    },
    typeDialog: false,
    placeDialog: false,
    activeTab: 0,
    activeBar: 2,
  },
  
  onChangeOfTabbar: function(e) {
    wx.redirectTo({
      url: getApp().globalData.tabBars.admin[e.detail]
    })
  },

  onChangeOfTab(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
    this.setData({
      activeTab: event.detail.index
    })
  },

  openTypeDialog: function() {
    this.setData({
      typeDialog: true
    })
  },

  openPlaceDialog: function() {
    this.setData({
      placeDialog: true
    })
  },

  onCloseOfTypeDialog: function() {
    this.setData({
      typeDialog: false
    })
  },

  onCloseOfPlaceDialog: function() {
    this.setData({
      placeDialog: false
    })
  },

  addType: function() {
    
  },

  addPlace: function() {
    
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