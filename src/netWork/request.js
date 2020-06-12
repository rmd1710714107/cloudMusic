import axios from "axios"
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
function phone(arg){
  return instance.post("/login/cellphone",{
    phone:arg.phone,
    password:arg.pwd
  })
}
function searchMusic(arg){
  return instance.get("/search",{
    params:{
      keywords:arg
    }
  })
}
function searchSuggest(arg){
  return instance.get("/search/suggest",{
    params:{
      keywords:arg
    }
  })
}
function getUsrInfo(usrId){
  return instance.get("/user/playlist",{
    params:{
      uid:usrId
    }
  })
}
function addPlayList(arg){
  return instance.get("/playlist/create",{
    params:{
      name:arg.listName,
      privacy:arg.privacy?arg.privacy:""
    }
  })
}
export{
  phone,//手机号登录
  searchMusic,//搜索音乐
  searchSuggest,//搜索建议
  getUsrInfo,//获取用户信息
  addPlayList//添加歌单
}