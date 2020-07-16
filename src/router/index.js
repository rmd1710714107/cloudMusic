import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)
const home = () => import("../view/home.vue");
const musicList = () => import("../components/musicList.vue");
const collection = () => import("../components/collection.vue")
const mainContent = () => import("../view/main/mainContent.vue")
const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: home,
    redirect: "/mainContent",
    children: [
      {
        path: "/mainContent", component: mainContent,
        redirect: "/musicList",
        children: [
          { path: "/musicList", component: musicList },
          { path: "/collection", component: collection }
        ]
      }
    ]
  },

]
const router = new Router({
  routes
});
export default router