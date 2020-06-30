<template>
  <div class="main">
      <music-list></music-list>
      <play-music></play-music>
      
  </div>
</template>

<script>
import loopScroll from "../../components/loopScroll"
import playMusic from "../../components/playMusic"
import musicList from "../../components/musicList"
export default {
  name: "mainContent",
  components: {
    loopScroll,
    playMusic,
    musicList
  },
  data() {
    return {
      //path:this.$store.state.path,
      content:{
        name:"bhkbsksbshjvbibsjkbsdjkfsjkvbjlvbhksofhjkbsklbsklggbsbkbihihghuhfishg",
        id:1
      },
      ishow:false
    };
  },
  methods:{
    Show(){
      this.ishow=!this.ishow;
      console.log("main");
    }
  }
};
</script>
<style scoped>
.demo-list-wrap {
    width: 100%;
    max-width: 360px;
    overflow: hidden;
  }
  .divItem{
    width: 300px;
    height: 30px;
  }
</style>