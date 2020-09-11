export const mixin={
  methods: {
    move(e) {
      if (this.allowMove) {
        this.changePosition(e.pageX);
      }
    },
    changePosition(dis) {
      if (
        this.top.offsetWidth < 0
      ) {
        this.$emit("changePercent",0);
        this.clean();
      } else if (this.top.offsetWidth > this.bottom.offsetWidth) {
        this.$emit("changePercent",1);
        this.clean();
      } else {
          let rate=(dis-this.mouse.start+this.mouse.diff)/this.bottom.offsetWidth;
          console.log("理想宽度:"+(dis-this.mouse.start+this.mouse.diff));
          if(rate<0) rate=0;
          this.$emit("changePercent",rate);
      }
    },
    clean() {
      this.allowMove = false;
      console.log("clear");
    },
    down(e) {
      this.mouse.start=e.pageX;
      this.mouse.diff=this.top.offsetWidth;
      this.allowMove=true
      // if(e.target.className==="circleImg"){
      //   this.allowMove=true
      // }
      document.onmouseup = (e) => {
        this.clean();
      };
      
    },
    up(){
      // if(!this.allowMove){
      //   let targetRight=this.top.getBoundingClientRect().right;
      //   this.changePosition(targetRight);
      // }
          
    }
  }
}