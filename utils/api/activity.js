const { baseURL }  = require('../util.js')
export function getActivities(query, resolve, reject) {
  wx.request({
    method: 'get',
    url: `${baseURL}/activities`,
    data: query,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      resolve(res)
    },
    fail(res) {
      reject(res)
    }
  })
}

export function addActivity(act, resolve, reject) {
  wx.request({
    method: 'post',
    url: `${baseURL}/activities`,
    data: act,
    success(res) {
      resolve(res)
    },
    fail(res) {
      reject(res)
    }
  })
}