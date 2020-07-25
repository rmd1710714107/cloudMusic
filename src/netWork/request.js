import axios from "axios"
const instance = axios.create({
  //baseURL: 'http://localhost:3000',
  baseURL: 'http://60.205.249.128:3000',
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
function getAlbumList() {
  return instance.get("/album/sublist")
}
function getArtistList(){
  return instance.get("/artist/sublist")
}
function getMvList(){
  return instance.get("/mv/sublist")
}
function getAlbumContent(id){
  return instance.get("/album",{
    params:{
      id:id
    }
  })
}
function getArtistContent(id){
  return instance.get("/artists",{
    params:{
      id:id
    }
  })
}
function getVideoContent(id){
  return instance.get("/video/url",{
    params:{
      id:id
    }
  })
}
function getLyric(id) {
  return instance.get("/lyric",{
    params:{
      id:id
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
  getmusicDetails,//获取歌曲详情
  getAlbumList,//获取收藏的专辑
  getArtistList,//获取收藏的歌手
  getMvList,//获取收藏的视频列表
  getAlbumContent,//获取专辑内容
  getArtistContent,//获取歌手专辑
  getVideoContent,//获取视频播放地址
  getLyric//获取歌词
}