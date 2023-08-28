<template>
  <div>
      <div class="header">head</div>
      <div class="leftbar">left area</div>
      <div class="rightbar">right area</div>
      <div class="bottom">bottom</div>
  </div>
</template>

<style scoped>
  /* head */
  .header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    color: aliceblue;
    background-color: #2d3a4b;
  }
  
  /* left */
  .leftbar {
    position: absolute;
    width: 45%;
    top: 50px;  /* 距离上面50像素 */
    left: 4.5%;
    bottom: 0px;
    overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
    background-color: #545c64;
  }
  
  /* right */
  .rightbar {
    position: absolute;
    width: 45%;
    top: 50px;
    /* left: 230px; */
    bottom: 0px;
    right: 4.5%;  /* 距离右边0像素 */
    padding: 10px;
    overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
    background-color: #545c64;
  }
  /* bottom */
  .bottom {
    position: absolute;
    line-height: 50px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    color: aliceblue;
    background-color: #2d3a4b;
  }
  </style>