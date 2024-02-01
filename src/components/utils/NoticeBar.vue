<template>
  <div id="box" ref="box">
    <div class="marquee-box" ref="marquee" @mouseover="menter" @mouseleave="mleave">
      <p ref="cmdlist" id="pWidth">
        <img src="../../assets/trumpet.svg" style="height: 20px;width: 20px; margin-left: 20px;">
        Important note: Sparky is an experimental product at this moment, please do your own research and participate with small amount of tokens.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoticeBar',
  data () {
    return {
      value: 0,
      timer: '',//计时器
      pwidth:0,//公告文本的宽度
      windowWidth:document.documentElement.clientWidth,// 设备屏幕的宽度
      }
    },

  mounted() {
    let element = this.$refs.cmdlist;
    this.pwidth = document.defaultView.getComputedStyle(element,'').width.split('px');
    this.timer = setInterval(this.clickCommend, 20);
  },
  
  watch:{
    value(newValue, oldValue) {
      let allWidth= parseInt(this.windowWidth)+parseInt(this.pwidth[0]);
      if(newValue <= -allWidth){
        this.$refs.cmdlist.style.marginLeft = this.windowWidth+"px";
        this.value = 0;
      }
    },
  },
  
  methods:{
    clickCommend(e) {
      let _this = this;
      this.$nextTick(() => {
        this.value -=1;
        this.$refs.cmdlist.style.marginLeft = _this.windowWidth+this.value+"px";
      });
    },
    menter(){
      clearInterval(this.timer);
    },
    mleave(){
      this.timer = setInterval(this.clickCommend, 20);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>
<style scoped>
#box {
  width: 100%;
  height: 50px;
  /* margin-top: 50px; */
  position: relative;
}
.marquee-box  {
  position: relative;
  width: 100%;
  height: 100%;
  overflow:auto;
  background-color: #f5f5f5;
}
#pWidth{
  width: 100%;
  height: 50px;
  padding: 0;
  margin: 0;
  line-height: 50px;
  display: block;
  word-break: keep-all;
  white-space: nowrap;
  overflow:hidden;
  font-family: 'Miriam Libre', sans-serif;
  font-size:14px;
  background-color: #f5f5f5
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
</style>