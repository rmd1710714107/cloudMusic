import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutation"
Vue.use(Vuex);
const state={
  userInfo:{},
  musicList:[],
  suggest:{},
  searVal:"",
  playList:[],
  musicInfo:{},
  musicTime:{},
  micLisSta:"",
  lyricInfo:{},
  musicComments:{},
  processRate:0
}
const store=new Vuex.Store({
  state,
  mutations
})
export default store;