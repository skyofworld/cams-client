import { $wuxCalendar } from '../../../../component/wux/index'

let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    minDate: new Date().getTime(),
    maxDate: new Date().setDate(new Date().getDate() + 7),
    currentDate: null,
    dateResult: '',
    week: '',
    loading: false,
    dateValues: [],
    currentPeriodId: 0,
    periods: [{
        name: '一,二节',
        time: '8:00-9:35'
      },
      {
        name: '三,四,五节',
        time: '9:50-12:20'
      },
      {
        name: '六,七节',
        time: '13:15-14:50'
      },
      {
        name: '八,九节',
        time: '15:05-16:40'
      },
      {
        name: '十,十一,十二节',
        time: '18:00-20:25'
      },
    ],
    periodNames: [],
    periodTimes: [],
    currentCourseIdx: 0,
    courses: [{
      id: '110011',
      name: '数据结构'
    }, {
      id: '220022',
      name: '操作系统'
    }, {
      id: '330033',
      name: '计算机网络'
    }, {
      id: '440044',
      name: '计算机组成原理'
    }, {
      id: '550055',
      name: '算法分析与设计'
    },
      {
        id: '660066',
        name: '自习'
      }
    ],
    courseIds: [],
    courseNames: [], 
    steps: [
      {
        text: '',
        desc: '选择日期'
      },
      {
        text: '',
        desc: '选择时段'
      },
      {
        text: '',
        desc: '选择科目'
      }
    ],
    activeStep: 0,
    activeBar: 1,
  },

  onChangeOfTabbar: function (e) {
    wx.redirectTo({
      url: app.globalData.tabBars.user[e.detail]
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

  onPrevStep: function() {
    this.setData({
      activeStep: (--this.data.activeStep + 3) % 3
    });
  },

  onNextStep: function() {
    this.setData({
      activeStep: ++this.data.activeStep % 3
    });
  },
  /**
   * API Adaptor
   */
  setPeriodNamesFromPeriods: function(periods) {
    let periodNames = []
    let periodTimes = []
    periods.forEach((val, idx) => {
      periodNames.push(val.name)
      periodTimes.push(val.time)
    })
    this.setData({
      periodNames: periodNames,
      periodTimes: periodTimes
    })
  },
  /**
   * API Adaptor
   */
  setCourseNamesFromCourses: function(courses) {
    let courseIds = []
    let courseNames = []
    courses.forEach((val, idx) => {
      courseIds.push(val.id)
      courseNames.push(val.name)
    })
    this.setData({
      courseIds: courseIds,
      courseNames: courseNames
    })
  },

  onConfirm: function(e) {
    let pagePath = "../list/index"
    let paramObj = {
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

  onInput: function(e) {
    const {
      detail,
      currentTarget
    } = e
    const result = this.getResult(detail, currentTarget.dataset.type)
    this.setData({
      dateResult: result,
      week: "星期" + "天一二三四五六 ".charAt(new Date(detail).getDay())
    })
  },
  
  onChange(e) {
    const {
      picker,
      value,
      index
    } = e.detail;
    this.setData({
      currentPeriodId: index
    })
  },

  onChangeOfCourse(e) {
    const {
      picker,
      value,
      index
    } = e.detail;
    this.setData({
      currentCourseIdx: index
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
    this.setPeriodNamesFromPeriods(this.data.periods)
    this.setCourseNamesFromCourses(this.data.courses)
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