import { addActivity } from '../../../utils/api/activity.js'
import { $wuxCalendar } from '../../../component/wux/index'
import Dialog from '../../../component/vant/dialog/dialog'
import Toast from '../../../component/vant/toast/toast'
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
    name: '',
    number: 0,
    intro: '',
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

  onPrevStep: function () {
    let n = this.data.steps.length
    this.setData({
      activeStep: (--this.data.activeStep + n) % n
    });
  },

  onNextStep: function () {
    let n = this.data.steps.length
    this.setData({
      activeStep: ++this.data.activeStep % n
    });
  },

  onConfirm: function (e) {
    let placeIdx = this.data.currentPlaceIdx
    let typeIdx = this.data.currentTypeIdx
    let act = {
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      place: this.data.places[placeIdx].id,
      type: this.data.types[typeIdx].id,
      name: this.data.name,
      number: this.data.number,
      intro: this.data.intro
    }
    // let pageUrl = `${pagePath}?param=${JSON.stringify(paramObj)}`
    // wx.navigateTo({
    //   url: pageUrl,
    // })
    Dialog.confirm({
      title: '确定发起该活动吗？',
      message: `时间：${this.getResult(act.startTime, 'datetime')}
                地点：${this.data.places.find(p => p.id == act.place).name}
                类型：${this.data.types.find(t => t.id == act.type).name}
                名称：${this.data.name}`
    }).then(() => {
      //request parameter: application.id
      //mock: 
      // this.data.applications.forEach((val, idx) => {
      //   if (val.id === application.id) {
      //     this.data.applications.splice(idx, 1)
      //   }
      // })

      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '提交中...',
        loadingType: 'spinner',
        selector: '#van-toast'
      })
      addActivity(act, res => {
        let success = res.data.code == 200
        if (success) {
          Toast.clear()
          Toast.success('提交成功，等待审核')
        } else {
          Toast.fail('提交失败')
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

  onInputOfStartTime: function (e) {
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

  onInputOfEndTime: function (e) {
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

  onChangeOfName({ detail }) {
    this.setData({
      name: detail
    });
  },
  onChangeOfNumber({ detail }) {
    this.setData({
      number: detail
    });
  },
  onChangeOfIntro({ detail }) {
    this.setData({
      intro: detail
    });
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

  getResult: function (time, type) {
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
  onLoad: function (options) {
    this.setData({
      typeNames: this.data.types.map(t => t.name),
      placeNames: this.data.places.map(p => p.name)
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