<template>
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
  updated(){
    Scrollbar.init(document.querySelector(".container"));
  }
}
</script>
<style scoped>
.container {
  overflow: auto;
}
</style>