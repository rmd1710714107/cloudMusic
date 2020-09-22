import Vue from "vue";
const mutations={
  addUserInfo(state,payload){
    state.userInfo=payload;
  },
  addMusic(state,payload){
    state.musicList=payload;
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
    for (const key in payload) {
      Vue.set(state.musicComments,key,payload[key])
    }
  }
}
export default mutations;