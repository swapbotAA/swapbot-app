<template>
  <div>
    <!-- <vue-metamask 
            userMessage="msg" 
            @onComplete="onComplete"
        >
        </vue-metamask> -->
    <div class="header"><img src="../assets/robot.svg" style="height: 45px;width: 45px; padding-right: 10px;">
      SwapBotAA
      <vue-metamask ref="metamask" @onComplete="onComplete"></vue-metamask>
      <a-button type="primary" danger style="position: absolute; right: 10px; top: 10px;" @click="connect">
        <span v-if="this.user==null">Connect Wallet</span>
        <span v-else>{{this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4)}}</span>
      </a-button>
    </div>
    <div class="leftbar">
      <div class="tableft">
        <div class="content">
          <div style="margin: auto;width: 90%;margin-top: -40px;position: absolute;text-align: left;">
            <!--2个按钮-->
            <button :class="indexl == numberl ? 'btnl1' : 'btnl'" @click="tableft(indexl)"
              v-for="(iteml, indexl) in dataListLeft" :key="indexl">{{ iteml.option }}
            </button>

            <img src="../assets/setting-fill.svg"
              style="width: 50px; height: 50px; position: absolute;right: 10%;top: 25%;right: 10%;"
              @click="showModal()" />

          </div>
          <!--2个div-->
          <div id="contentLeft1" v-show="numberl == 0">

            <span>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%; padding-top: 10%;">
                <a-input v-model:value="ethAmount" placeholder="0" suffix="ETH" style="height: 60px;" />
              </div>
              <div style="line-height: 50px;"><img src="../assets/swap.svg" style="height: 25px; width: 25px;"></div>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;margin-top: -30px;">
                <a-input v-model:value="usdcAmount" placeholder="0" suffix="USDC" style="height: 60px;" />
              </div>
              <div style="line-height: 50px;">rate:1850 ETH/USDC</div>

              <a-button type="primary" :loading="iconLoading" @click="enterIconLoading()">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Submit
              </a-button>
            </span>
          </div>
          <div id="contentLeft2" v-show="numberl == 1">
            <!-- <img src="../assets/setting-fill.svg"
              style="width: 30px; height: 30px; position: absolute;right: 10%;top: 12%;" @click="showModal()" /> -->
            <span>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%; padding-top: 10%;">
                <a-input v-model:value="ethAmount" placeholder="0" suffix="ETH" style="height: 60px;" />
              </div>
              <div style="line-height: 50px;"><img src="../assets/swap.svg" style="height: 25px; width: 25px;"></div>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;margin-top: -30px;">
                <a-input v-model:value="usdcAmount" placeholder="0" suffix="USDC" style="height: 60px;" />
              </div>
              <div style="line-height: 50px;">rate:1850 ETH/USDC</div>

              <a-button type="primary" :loading="iconLoading" @click="enterIconLoading()">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Submit
              </a-button>
            </span>
          </div>
          <div>
            <!-- <a-button type="primary" @click="showModal()">Modal</a-button>
            <a-button @click="confirm()">Confirm</a-button> -->
            <a-modal v-model:open="open" title="Setting" ok-text="确认" cancel-text="取消" @ok="hideModal()">
              <p style="font-size: medium;">Maximum slip point<a-input v-model:value="slipPoint" placeholder="0"
                  suffix="%" style="height: 60px;" /></p>
              <p style="font-size: medium;">Trade deadline<a-input v-model:value="deadLine" placeholder="30" suffix="mins"
                  style="height: 60px;" /></p>
            </a-modal>
          </div>
        </div>
      </div>
    </div>
    <div class="rightbar">
      <div class="tabright">
        <div class="content">
          <div style="margin: auto;width: 90%;margin-top: -40px;position: absolute;text-align: left;;">
            <!--3个按钮-->
            <button :class="indexr == numberr ? 'btnr1' : 'btnr'" @click="tabright(indexr)"
              v-for="(itemr, indexr) in dataListRight" :key="indexr">{{ itemr.option }}
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
    background-color: #90f6cd;
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

  #contentLeft1 {
    background-color: rgb(245 246 252);
    height: 500px;
    font-size: 16px;
    line-height: 100px;
    margin-top: 60px;
    border-radius: 15px;
  }

  #contentLeft2 {
    background-color: #fffefe;
    height: 500px;
    font-size: 16px;
    line-height: 100px;
    margin-top: 60px;
    border-radius: 15px;
  }

  #contentRight1,
  #contentRight2,
  #contentRight3 {
    background-color: rgb(255 244 250);
    height: 500px;
    font-size: 16px;
    line-height: 100px;
    margin-top: 60px;
    border-radius: 15px;
  }
}

.contentSetting {
  background-color: rgb(255 244 250);
  height: 300px;
  font-size: 16px;
  line-height: 100px;
  margin-top: 60px;
  border-radius: 15px;
}
</style>
<script>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { ref, createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import VueMetamask from 'vue-metamask';

export default {
  name: "tableft",
  components: {
    VueMetamask,
  },
  data() {
    return {
      numberl: 0, //点击后的值，与下标同步，为0表示默认第一个按钮与div为选中状态
      numberr: 0,
      user: null,
      msg: "This is demo net work",
      iconLoading: ref(false),
      open: ref(false),
      dataListLeft: [
        { option: 'Swap' },
        { option: 'Front-running' },
      ],
      dataListRight: [
        { option: 'Balance' },
        { option: 'History' },
        { option: 'Strategy' },
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
    },
    enterIconLoading() {
      this.iconLoading = true;
      setTimeout(() => {
        // alert(this.iconLoading);
        this.iconLoading = false;
      }, 6000);
    },
    showModal() {
      this.open = true;
    },
    hideModal() {
      this.open = false;
    },
    confirm() {
      {
        Modal.confirm({
          title: 'Confirm',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'Bla bla ...',
          okText: '确认',
          cancelText: '取消',
        });
      };
    },
    connect() {
      this.$refs.metamask.init();
      console.log(this.$refs.metamask.MetaMaskAddress);
      this.user = this.$refs.metamask.MetaMaskAddress;
      console.log('data 318:', this.user);
    },
    onComplete(data) {
      console.log('data:', data);
      if (data.metaMaskAddress == "") {
        this.user = null;
      }else{
        this.user = data.metaMaskAddress;
      }
      console.log('data 323:', this.user);
    },
  },
};
</script>