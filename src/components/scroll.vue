<template>
<!-- 滚动组件 -->
    <div class="scroll">
      <div class="container" ref="container" :style="{height:height,width:width}">
        <div class="content" ref="content">
          <slot></slot>
        </div>
      </div>
      
    </div>
</template>

<script>
import Scrollbar from "smooth-scrollbar";
export default {
  name:"scroll",
  components: {},
  props:{
    height:{
      type:String,
      default(){
        return "100%"
      }
    },
    width:{
      type:String,
      default(){
        return "100%"
      }
    },
    isReInit:{
      type:Boolean,
      default(){
        return false;
      }
    }
  },
  data () {
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll=Scrollbar.init(document.querySelector(".container"));
  },
  methods:{
    pullDown(offsetY){
      let scrollDis = offsetY + this.$refs.container.clientHeight,
          scrollHeight = this.$refs.content.scrollHeight;
      if (scrollDis >=scrollHeight) {
        this.$emit("pullDown")
      }
    }
  },
  watch:{
    scroll(){
      if (this.scroll!==null) {
        this.scroll.addListener(()=>{
          this.pullDown(this.scroll.offset.y)
        })
      }
    },
    reInit(){
      if(this.isReInit){
        console.log(this.isReInit);
        this.scroll=Scrollbar.init(document.querySelector(".container"));
      }
    }
  }
}
</script>
<style scoped>
.container {
  overflow: auto;
}
</style>