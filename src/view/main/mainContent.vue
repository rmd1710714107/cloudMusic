<template>
  <div class="main">
      <p v-for="(item,index) in $store.state.musicName" :key="index+1">{{item}}</p>
      <audio v-for="(item,index) in $store.state.path" :key="index" controls :src="'local-resource://'+item"></audio>
      <button @click="Show">按钮</button>
      <div class="divItem">
        <loop-scroll :content="content" :exam="false" v-if="ishow"></loop-scroll>
      </div>
      
  </div>
</template>

<script>
import loopScroll from "../../components/loopScroll"
export default {
  name: "mainContent",
  components: {
    loopScroll
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