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
    console.log(state.musicInfo);
  },
  setMusicTime(state,payload){
    //state.musicTime={}
    for (const key in payload) {
      Vue.set(state.musicTime,key,payload[key])
    }
    //console.log(state.musicTime);
  },
  updateMicLisSta (state,payload) {
    state.micLisSta=payload;
  }
}
export default mutations;