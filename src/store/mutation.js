import Vue from "vue";
const mutations={
  addUserInfo(state,payload){
    state.userInfo=payload;
  },
  addMusic(state,payload){
    payload.forEach(item=>{
      state.musicList.push(item);
    })
  },
  clearMusicList(state){
    state.musicList=[];
  },
  showSuggest(state,payload){
    state.suggest=payload
  },
  getSearVal(state,payload){
    state.searVal=payload;
  },
  getPlayList(state,payload){
    state.playList=payload;
  },
  addPlayInfo(state,payload){
    state.musicInfo={};
    for (const key in payload) {
      Vue.set(state.musicInfo,key,payload[key])
    }
  },
  setMusicTime(state,payload){
    for (const key in payload) {
      Vue.set(state.musicTime,key,payload[key])
    }
  },
  addLyricInfo(state,payload){
    state.lyricInfo={};
    for (const key in payload) {
      Vue.set(state.lyricInfo,key,payload[key])
    }
  },
  addMusicComments(state,payload){
    let keys=Object.keys(payload),
        keyLen=keys.length;
    for(let i=0;i<keyLen;i++){
      Vue.set(state.musicComments,keys[i],payload[keys[i]])
    }
  },
  clearComents(state){
    state.musicComments={};
  },
  saveSearchKey(state,payload){
    state.searchKey=payload;
  }
}
export default mutations;