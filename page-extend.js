/**
 *
 * Page扩展函数
 *
 * @param {*} Page 原生Page
 */
const pageExtend = Page => {
    return object => {
      // 导出原生Page传入的object参数中的生命周期函数
      // 由于命名冲突，所以将onLoad生命周期函数命名成了onLoaded
      const { onLoaded } = object
  
      // 公共的onLoad生命周期函数
      object.onLoad = function (options) {
        // 在onLoad中执行的代码
        console.log('onLoad')
  
        // 执行onLoaded生命周期函数
        if (typeof onLoaded === 'function') {
          onLoaded.call(this, options)
        }
      }
  
      // 公共的onShareAppMessage事件处理函数
      object.onShareAppMessage = () => {
        return {
          title: '公共分享标题'
        }
      }
      return Page(object)
    }
  }
  
  // 获取原生Page
  const originalPage = Page
  // 定义一个新的Page，将原生Page传入Page扩展函数
  Page = pageExtend(originalPage)
  