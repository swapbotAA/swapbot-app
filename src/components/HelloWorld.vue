<template>
  <div>
    <div class="header">SwapBot AA</div>
    <div class="leftbar">
      <div class="tableft">
        <div class="content">
          <div style="margin: auto;width: 90%;margin-top: -40px;position: absolute;text-align: left;;">
            <!--2个按钮-->
            <button :class="indexl == numberl ? 'btnl1' : 'btnl'" @click="tableft(indexl)" v-for="(iteml, indexl) in dataListLeft"
              :key="indexl">{{ iteml.option }}
            </button>
          </div>
          <!--2个div-->
          <div id="contentLeft1" v-show="numberl == 0">
            <span>Swap</span>
          </div>
          <div id="contentLeft2" v-show="numberl == 1">
            <span>Front-running</span>
          </div>
        </div>
      </div>
    </div>
    <div class="rightbar">
      <div class="tabright">
        <div class="content">
          <div style="margin: auto;width: 90%;margin-top: -40px;position: absolute;text-align: left;;">
            <!--3个按钮-->
            <button :class="indexr == numberr ? 'btnr1' : 'btnr'" @click="tabright(indexr)" v-for="(itemr, indexr) in dataListRight"
              :key="indexr">{{ itemr.option }}
            </button>
          </div>
          <!--3个div-->
          <div id="contentRight1" v-show="numberr == 0">
            <span>Balance</span>
          </div>
          <div id="contentRight2" v-show="numberr == 1">
            <span>Hisory</span>
          </div>
          <div id="contentRight3" v-show="numberr == 2">
            <span>Strategy</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">bottom</div>
  </div>
</template>

<style scoped lang="less">
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
  top: 60px;
  /* 距离上面50像素 */
  left: 4.5%;
  bottom: 60px;
  overflow-y: auto;
  /* 当内容过多时y轴出现滚动条 */
  // background-color: #f0f4fd;
}

/* right */
.rightbar {
  position: absolute;
  width: 45%;
  top: 60px;
  /* left: 230px; */
  bottom: 60px;
  right: 4.5%;
  /* 距离右边0像素 */
  overflow-y: auto;
  /* 当内容过多时y轴出现滚动条 */
  // background-color: #f0f4fd;
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

.content {
    width: 700px;
    margin: auto;
    /*left按钮样式*/
    /*未选中时*/
    .btnl {
      width: 150px;
      height: 40px;
      border: 0;
      border-radius: 5px;
      color: white;
      margin: 20px 3px;
      background-color: #35cc8f;
    }
    /*选中时*/
    .btnl1 {
      width: 150px;
      height: 40px;
      border: 0;
      border-radius: 5px;
      color: white;
      margin: 20px 3px;
      background-color: #099941;
    }
     /*right按钮样式*/
    /*未选中时*/
    .btnr {
      width: 150px;
      height: 40px;
      border: 0;
      border-radius: 5px;
      color: white;
      margin: 20px 3px;
      background-color: #dbc8fd;
    }
    /*选中时*/
    .btnr1 {
      width: 150px;
      height: 40px;
      border: 0;
      border-radius: 5px;
      color: white;
      margin: 20px 3px;
      background-color: #8c55ec;
    }
    #contentLeft1, #contentLeft2 {
      background-color: rgb(245 246 252);
      height: 500px;
      font-size: 16px;
      line-height: 100px;
      margin-top: 60px;
      border-radius: 15px;
    }
    #contentRight1, #contentRight2, #contentRight3 {
      background-color: rgb(255 244 250);
      height: 500px;
      font-size: 16px;
      line-height: 100px;
      margin-top: 60px;
      border-radius: 15px;
    }
  }
</style>
<script>
   export default {
    name: "tableft",
    data() {
      return {
        numberl: 0, //点击后的值，与下标同步，为0表示默认第一个按钮与div为选中状态
        numberr: 0,
        dataListLeft: [
          {option: 'Swap'},
          {option: 'Front-running'},
        ],
        dataListRight: [
          {option: 'Balance'},
          {option: 'History'},
          {option: 'Strategy'},
        ]
      }
    },
    methods: {
      //定义切换方法
      tableft(index) {
        this.numberl = index;
        // console.log(index, this.number);
      },
      tabright(index) {
        this.numberr = index;
        // console.log(index, this.number);
      }
    }
  }
</script>