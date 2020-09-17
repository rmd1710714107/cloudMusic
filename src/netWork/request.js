import axios from "axios"
const instance = axios.create({
  //baseURL: 'http://localhost:3000',
  baseURL: 'http://60.205.249.128:3000',
  withCredentials: true,
  timeout:5000,
  timeoutErrorMessage:"请求时间太长"
});
instance.interceptors.request.use((config)=>{
  return config;
},(err)=>{
  return Promise.reject(err);
})
instance.interceptors.response.use((response)=>{
  return response;
},(err)=>{
  return Promise.reject(err);
})
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
      id
    }
  })
}
function checkMusic(id){
  return instance.get("/check/music",{
    params:{
      id
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
function getComments(id,limit=20,offset=0,before="") {
  return instance.get("/comment/music",{
    params:{
      id:id,
      limit:limit,
      offset:offset,
      before:before
    }
  })
}
class operateComments{
  constructor(arg){
    this.url="/comment",
    this.params=arg;
  }
  addComment(){
    let{t,type,id,content}=this.params;
    return instance.get(this.url,{
      params:{
        t,type,id,content
      }
    })
  }
  delComment(){
    let {t,type,id,commentId}=this.params;
    try {
      return instance.get(this.url,{
        params:{
          t,type,id,commentId
        }
      })
    } catch (error) {
      console.log(error);
    }
    
  }
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
  getLyric,//获取歌词
  getComments,//获取歌词评论
  operateComments,//操作评论类
  checkMusic//检查歌曲是否可用
}