import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutation"
Vue.use(Vuex);
const state={
  musicList:[],
  suggest:{},
  searVal:"",
  playList:[],
  playUrl:""
}
const store=new Vuex.Store({
  state,
  mutations
})
export default store;