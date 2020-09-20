<template>
<!-- 滚动组件 -->
    <div class="scroll">
      <div class="container" :style="{height:height,width:width}">
        <slot></slot>
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
  watch:{
    scroll(){
      if (this.scroll!==null) {
        this.scroll.addListener(()=>{
          this.$bus.$emit("scrolling",this.scroll.offset.y)
        })
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