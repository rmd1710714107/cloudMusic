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
function getPlayListDetails(id){
  return instance.get("/playlist/detail",{
    params:{
      id:id
    }
  })
}
function getmusicUrl(id){
  return instance.get("/song/url",{
    params:{
      id:id
    }
  })
}
function getmusicDetails(id) {
  return instance.get("/song/detail",{
    params:{
      ids:id
    }
  })
}
export{
  phone,//手机号登录
  searchMusic,//搜索音乐
  searchSuggest,//搜索建议
  getUsrInfo,//获取用户信息
  addPlayList,//添加歌单
  getPlayListDetails,//获取歌单详情
  getmusicUrl,//获取歌曲url
  getmusicDetails//获取歌曲详情
}