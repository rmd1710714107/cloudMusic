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
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
