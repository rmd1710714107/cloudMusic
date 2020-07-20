<template>
  <div class="main" ref="main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
    <!-- <music-list></music-list> -->
    <play-music @resize="aa"></play-music>
  </div>
</template>

<script>
//import loopScroll from "../../components/loopScroll"
import playMusic from "../../components/playMusic";
import musicList from "../../components/musicList";
var elementResizeDetectorMaker = require("element-resize-detector")
export default {
  name: "mainContent",
  components: {
    //loopScroll,
    playMusic,
    musicList
  },
  data() {
    return {
      //path:this.$store.state.path,
    };
  },
  methods: {
    Show() {
      this.ishow = !this.ishow;
    },
    aa() {
      console.log("ok");
    }
  },
  mounted() {
    this.$bus.$emit("listHeight",this.$refs.main.offsetHeight)
    let erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.main, (element)=>{
      let height = element.offsetHeight
      this.$nextTick(function () {
        this.$bus.$emit("listHeight",height)
       
      })
    })
  }
};
</script>
<style scoped>
.main{
  height: 100%;
  overflow: hidden;
}
.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}
.divItem {
  width: 300px;
  height: 30px;
}
</style>