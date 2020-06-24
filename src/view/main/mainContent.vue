<template>
  <div class="main">
      <p v-for="(item,index) in $store.state.musicName" :key="index+1">{{item}}</p>
      <audio v-for="(item,index) in $store.state.path" :key="index" controls :src="'local-resource://'+item"></audio>
      <button @click="Show">按钮</button>
      <play-music></play-music>
      
  </div>
</template>

<script>
import loopScroll from "../../components/loopScroll"
import playMusic from "../../components/playMusic"
export default {
  name: "mainContent",
  components: {
    loopScroll,
    playMusic
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