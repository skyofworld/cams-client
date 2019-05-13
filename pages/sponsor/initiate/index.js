import { $wuxCalendar } from '../../../component/wux/index'

Page({

  /**
   * Page initial data
   */
  data: {
    minDate: new Date().getTime(),
    maxDate: new Date().setDate(new Date().getDate() + 30),
    startTime: new Date().getTime(),
    endTime: new Date().getTime(),
    dateResult: '',
    week: '',
    loading: false,
    dateValues: [],
    currentPlaceIdx: 0,
    placeNames: [],
    places: [{
        id: 1,
        name: '地点1',
        desc: '容量30人'
      },
      {
        id: 2,
        name: '地点2',
        desc: '容量60人'
      },
      {
        id: 3,
        name: '地点3',
        desc: '容量12人'
      }
    ],
    currentTypeIdx: 0,
    typeNames: [], 
    types: [{
      id: '110011',
      name: '类型1'
    }, 
    {
      id: '220022',
      name: '类型2'
    }, {
      id: '330033',
      name: '类型3'
    }, {
      id: '440044',
      name: '类型4'
    }, 
    {
      id: '550055',
      name: '类型5'
    },
    {
      id: '660066',
      name: '类型6'
    }
    ],
    steps: [
      {
        text: '',
        desc: '日期'
      },
      {
        text: '',
        desc: '地点'
      },
      {
        text: '',
        desc: '类型'
      },
      {
        text: '',
        desc: '详情'
      }
    ],
    activeStep: 0,
    activeBar: 1,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: getApp().globalData.tabBars.sponsor[e.detail]
    })
  },

  onPrevStep: function() {
    let n = this.data.steps.length
    this.setData({
      activeStep: (--this.data.activeStep + n) % n
    });
  },

  onNextStep: function() {
    let n = this.data.steps.length
    this.setData({
      activeStep: ++this.data.activeStep % n
    });
  },

  onConfirm: function(e) {
    let pagePath = "../list/index"
    let activity = {
      dates: this.data.dateValues,
      periodId: this.data.currentPeriodId,
      periodName: this.data.periodNames[this.data.currentPeriodId],
      courseId: this.data.courseNames[this.data.currentCourseIdx],
      courseName: this.data.courseNames[this.data.currentCourseIdx]
    }
    let pageUrl = `${pagePath}?param=${JSON.stringify(paramObj)}`
    wx.navigateTo({
      url: pageUrl,
    })
  },

  onInputOfStartTime: function(e) {
    const {
      detail,
      currentTarget
    } = e
    // const result = this.getResult(detail, currentTarget.dataset.type)
    // this.setData({
    //   dateResult: result,
    //   week: "星期" + "天一二三四五六 ".charAt(new Date(detail).getDay())
    // })
    this.setData({
      startTime: e.detail
    });
  },

  onInputOfEndTime: function(e) {
    this.setData({
      endTime: e.detail
    });
  },
  
  onChangeOfPlace(e) {
    const {
      picker,
      value,
      index
    } = e.detail;
    this.setData({
      currentPlaceIdx: index
    })
  },

  onChangeOfType(e) {
    const {
      picker,
      value,
      index
    } = e.detail;
    this.setData({
      currentTypeIdx: index
    })
  },

  openCalendar() {
    $wuxCalendar().open({
      value: this.data.dateValues,
      multiple: true,
      onChange: (values, displayValues) => {
        this.setData({
          dateValues: displayValues,
        })
      },
    })
  },

  getResult: function(time, type) {
    const date = new Date(time);
    switch (type) {
      case 'datetime':
        return date.toLocaleString();
      case 'date':
        return date.toLocaleDateString();
      case 'year-month':
        return `${date.getFullYear()}/${date.getMonth() + 1}`;
      case 'time':
        return time;
      default:
        return '';
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.setData({
      typeNames: this.data.types.map(t => t.name),
      placeNames: this.data.places.map(p => p.name)
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})