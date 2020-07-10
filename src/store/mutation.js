import Vue from "vue";
const mutations={
  addMusic(state,payload){
    state.musicList=payload
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
    for (const key in payload) {
      Vue.set(state.musicInfo,key,payload[key])
    }
  }
}
export default mutations;