export const mixin={
  methods: {
    move(e) {
      if (this.isDown) {
        document.onmousemove = e => {
          this.changePosition(e.clientX);
        };
      }
    },
    changePosition(dis,isDown=true) {
      if (
        this.domNode.offsetWidth < 0
      ) {
        this.domNode.style.width = 0 + "px";
        this.clean();
      } else if (this.domNode.offsetWidth > this.$refs.bottom.offsetWidth) {
        this.domNode.style.width = this.$refs.bottom.offsetWidth + "px";
        this.clean();
      } else {
        if(isDown){
          this.domNode.style.width=(dis-this.disX-this.offset+6)+"px";
        }else{
          this.domNode.style.width=dis+"px";
        }
      }
    },
    clean() {
      document.onmousemove = null;
      this.isDown = false;
    },
    down(e) {
      if(e.target.className!=="circleImg"){
        this.changePosition(e.clientX);
      }else{
        this.disX = e.clientX - this.$refs.circleImg.offsetLeft - this.offset;
        this.isDown=true;
        document.onmouseup = () => {
          this.clean();
        };
      }
      
    },
  }
}