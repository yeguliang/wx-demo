import Config from './config'
import storage from './storage'
import user from './user'
// 接口初始化
function getOptions(url, options) {
  let loading = null
  let { method, body } = options
  if (!url.indexOf('https://') > -1 || !url.indexOf('http://') > -1) {
    url = (!Config.DEBUG ? Config.SERVER_HOME_DEBUG : Config.SERVER_HOME_PRODUCTION) + (url.indexOf('/') === 0 ? url.substr(1) : url)
  }
  let option = {
    method,
    url,
    header: {
      Accept: 'application/json',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      Expires: 0,
      'Content-Type': 'application/json; charset=utf-8'
    },
    complete: () => {
      if (loading) {
        clearTimeout(loading)
        loading = null
      }
      wx.hideLoading()
    }
  }
  let token = storage.getStorage('token')
  if (token) {
    option.header = option.headers || {}
    option.header.Authorization = `Bearer ${token}`
  }
  // 参数赋值
  switch (method) {
    case 'GET':
    option.data = body || {}
    break;
    case 'DELETE':
    option.data = body || {}
    break;
    case 'POST':
    option.data = body || {}
    break;
    case 'PUT':
    option.data = body || {}
    break;
  }
  if (!Config.DEBUG) {
    console.log(`${new Date().toLocaleString()} url:${url} P=${JSON.stringify(options)}`)
  }
  loading = setTimeout(() => {
    wx.showLoading({
      title: '加载中'
    })
  }, 800)
  request(option)
}

function request(option) {
  return new Promise((resolve, reject) => {
    wx.request(option).then(res => {
      const { statusCode, data } = res
      if (statusCode >= 200 && statusCode < 300) {
        if (!Config.DEBUG) {
          console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res.data)
        }
        resolve(data)
      } else if (statusCode === 401) {
        // 登录过期处理
        // wx.navigateTo({
        //   url: `/pages/index/index`
        // })
        // user.showToast({title: `错误: ${data.message}`})
        // user.getToken()
        // setTimeout(()=>{
        //   request(option)
        // },500)
        // resolve(statusCode)
        return
      } else {
        user.showToast({title: `错误: ${data.message}`})
        throw new Error(`网络请求错误，状态码${statusCode}`)
      }
    })
  })
}

export function requestGet(url, body) {
  return getOptions(url, { method: 'GET', body })
}
export function requestDelete(url, body) {
  return getOptions(url, { method: 'DELETE',body })
}
export function requestPost(url, body) {
  return getOptions(url, { method: 'POST', body })
}
export function requestPut(url, body) {
  return getOptions(url, { method: 'PUT', body })
}

