import {requestGet,requestDelete,requestPost,requestPut} from './../utils/request'
module.exports={
  updataUserinfo(data){
    return requestPost('/api',data)
  },
  userLogin(data){
    return requestPost('/api',data)
  }
}  