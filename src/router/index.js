import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)
const home = () => import("../view/home.vue");
const musicList = () => import("../components/musicList.vue");
const collection = () => import("../components/collection.vue");
const mainContent = () => import("../view/main/mainContent.vue");
const album=()=>import("../components/colleAlbums.vue");
const singer=()=>import("../components/colleSinger.vue");
const video=()=>import("../components/colleVideo.vue")
const artical=()=>import("../components/colleArtical.vue")
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
          {
            path: "/collection", component: collection,
            redirect: "/album",
            children: [
              {path:"/album",component:album},
              {path:"/singer",component:singer},
              {path:"/video",component:video},
              {path:"/artical",component:artical}
            ]
          }
        ]
      }
    ]
  },

]
const router = new Router({
  routes
});
export default router