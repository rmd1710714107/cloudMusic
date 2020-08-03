import Vue from "vue";
const mutations={
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
    state.musicTime={}
    for (const key in payload) {
      Vue.set(state.musicTime,key,payload[key])
    }
  },
  updateMicLisSta (state,payload) {
    state.micLisSta=payload;
  },
  addLyricInfo(state,payload){
    state.lyricInfo={};
    for (const key in payload) {
      Vue.set(state.lyricInfo,key,payload[key])
    }
  }
}
export default mutations;