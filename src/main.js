import Vue from 'vue'
import App from './App.vue'
import store from "./store/index"
import router from "./router/index"
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import "./plugins/muse"
import "normalize.css"
import "./assets/basic.css"
import './assets/material-icons.css'
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue();
Vue.prototype.update={}
window.addEventListener("online",()=>{
  let option={
    title: "有网了!",
    body: "机子帮你开好了, 快来上网啊~",
  }
  new window.Notification(option.title, option);
  console.log("online");
});
window.addEventListener("offline",()=>{
  let option={
    title: "断网了!",
    body: "网络已断开",
  }
  new window.Notification(option.title, option);
  console.log("offline");
})
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
