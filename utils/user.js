
import {user} from './../server/index'
import storage from './storage'
let {updataUserinfo,userLogin} = user
module.exports = {
//---------------- 请求封住--------------------------------
  //用户授权提交信息  
  userAuthor(e) {
    return new Promise((resolve,reject)=>{
      wx.getUserInfo({
        success: function (res) {
          resolve(res)
        },
        fail: function(){
          reject(false)
        }
      });
    })
  },
  getUserCode(){
    new Promise((resolve,reject)=>{
      wx.checkSession({
        success () {
          //session_key 未过期，并且在本生命周期一直有效
          reject(false)
        },
        fail () {
          wx.login({
            success: res => {
              resolve(res.code)
            },
            // fail: function(){
             
            // }
          })
        }
      })
    })
  },
  //更新用户信息
  async editUserInfo(){
    let wxUserInfo = await userAuthor()
    console.log("=>wxUserInfo",wxUserInfo)
    let updataUserData = updataUserinfo(wxUserInfo)
    console.log("=>updataUserData",updataUserData)
    // 在调到这个方法的页面可以调用updataUserCallback()
    let nowPages = getCurrentPages();
    nowPages[currPage.length -1].updataUserCallback();
  },
  // 获取token
  async getToken(){
    let code = await this.getUserCode()
    let objToken = await userLogin({code})
  },



  // /----------------微信方法封装--------------------------------
  showToast(data){
    let {title,icon='none'} = data
    wx.showToast({
      title:title,
      icon,
      mask: true
    })
  },  
}