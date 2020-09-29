export const mixin={
  methods: {   
    changePosition(dis) {
      let rate;
      if(this.allowMove){
        rate=(dis-this.mouse.start+this.mouse.diff)/this.bottom.offsetWidth;
      }else{
        rate=(this.mouse.start-dis+this.mouse.diff)/this.bottom.offsetWidth;
      }
      rate=parseFloat(rate).toFixed(4);
      if(rate<0) rate=0;
      if(rate>1) rate=1;
      this.changTopWidth(rate);
      this.$emit("changePercent",Number(rate));
    },
    clean() {
      this.allowMove = false;
      document.onmousemove=null;
    },
    down(e) {
      e.preventDefault();
      this.mouse.start=e.pageX;
      this.mouse.diff=this.top.offsetWidth;
      if(e.target.className==="circleImg"){
        this.allowMove=true
      }
      document.onmousemove=e=>{
        e.preventDefault();
        if (this.allowMove) {
          this.changePosition(e.pageX);
        }
      }
      document.onmouseup = (e) => {
        this.clean();
      };
      
    },
    up(e){
      if(e.target.className!=="circleImg"){
        let targetRight=this.top.getBoundingClientRect().right;
        this.changePosition(targetRight);
      }
    },
    changTopWidth(rate){
      this.topWidth=this.bottom.offsetWidth*rate;
    }
  }
}