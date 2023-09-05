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
        <span v-if="this.user == null">Connect Wallet</span>
        <span v-else>{{ this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4) }}</span>
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
                <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount" @change="calculateRateE()" placeholder="0" suffix="ETH" style="height: 60px;" />
              </div>
              <div style="line-height: 50px;"><img src="../assets/swap.svg" style="height: 25px; width: 25px;"></div>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;margin-top: -30px;">
                <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="usdcAmount" @change="calculateRateU()" placeholder="0" suffix="USDC" style="height: 60px;" />
              </div>
              <div style="line-height: 50px;" ref="exchangeRate">rate:1 ETH = ? USDC</div>

              <a-button type="primary" :loading="iconLoading" @click="submitSwap()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
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
            <span style="position: absolute; top: 12%; width: 80%; left: 10%;">
              <a-input v-model:value="registration" addon-before="Registration code" />
              <a-input v-model:value="authorization" addon-before="Authorization code" />
              <a-input v-model:value="buyAddress" addon-before="Buy address" />
              <a-input v-model:value="amount" addon-before="Amount" />
              <a-input v-model:value="walletAddress" addon-before="Wallet address" />
              <a-input v-model:value="privateKey" addon-before="Private key" />
              <a-input v-model:value="gasFee" addon-before="Gas fee" />
              <a-input v-model:value="gasLimit" addon-before="Gas limit" />
              <a-input v-model:value="slipPoint" addon-before="Slip point" />
              <a-input v-model:value="minimumLiquidity" addon-before="Minimum liquidity" />

              <a-button type="primary" :loading="iconLoadingSend" @click="submitFrontRun()"
                style="width: 120px;height: 40px;border: 0;border-radius: 5px;margin: 10px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Send
              </a-button>
              <a-button type="primary" danger @click="stopFrontRun()"
                style="width: 120px;height: 40px;border: 0;border-radius: 5px;margin: 10px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Stop
              </a-button>
              <a-button type="primary" @click="resetFrontRun()"
                style="background-color: gray; width: 120px;height: 40px;border: 0;border-radius: 5px;margin: 10px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Reset
              </a-button>
            </span>
          </div>
          <div>
            <!-- <a-button type="primary" @click="showModal()">Modal</a-button>
            <a-button @click="confirm()">Confirm</a-button> -->
            <a-modal v-model:open="open" title="Setting" ok-text="OK" cancel-text="CX" @ok="hideModal()">
              <p style="font-size: medium;">Maximum slip point<a-input v-model:value="slipPoint" placeholder="0"
                  suffix="%" style="height: 60px;" /></p>
              <p style="font-size: medium;">Trade deadline<a-input v-model:value="deadLine" placeholder="30" suffix="mins"
                  style="height: 60px;" /></p>
            </a-modal>
            <a-modal v-model:open="depositOpen" title="Deposit" ok-text="OK" cancel-text="CX" @ok="hideDeposit()">
              <p style="font-size: medium;">ETH<a-input v-model:value="depositEth" placeholder="0"
                  suffix="ETH" style="height: 60px;" /></p>
              <p style="font-size: medium;">USDC<a-input v-model:value="depositUsdc" placeholder="0" suffix="USDC"
                  style="height: 60px;" /></p>
            </a-modal>
            <a-modal v-model:open="withdrawOpen" title="Withdraw" ok-text="OK" cancel-text="CX" @ok="hideWithdraw()">
              <p style="font-size: medium;">ETH<a-input v-model:value="withdrawEth" placeholder="0"
                  suffix="ETH" style="height: 60px;" /></p>
              <p style="font-size: medium;">USDC<a-input v-model:value="withdrawUsdc" placeholder="0" suffix="USDC"
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

            <span>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%; padding-top: 10%;">
                <a-input v-model:value="ethBalance" placeholder="1.00" suffix="ETH" disabled="true"
                  style="height: 60px;" />
              </div>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;">
                <a-input v-model:value="usdcBalance" placeholder="10.0" suffix="USDC" disabled="true"
                  style="height: 60px;" />
              </div>
              <a-button type="primary" @click="showDeposit()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Deposit
              </a-button>
              <a-button type="primary" @click="showWithdraw()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Withdraw
              </a-button>
            </span>
          </div>
          <div id="contentRight2" v-show="numberr == 1">
            <span>
              <a-list size="large" bordered :data-source="data"
                style="top: 5%; width: 90%; margin-left: 5%;text-align: left;">
                <template #renderItem="{ item }">
                  <a-list-item>{{ item }}</a-list-item>
                </template>
                <template #footer>
                  <div style="text-align: center;">....</div>
                </template>
              </a-list>
            </span>
          </div>
          <div id="contentRight3" v-show="numberr == 2">
            <span>Comming soon!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">Designed by BlockModel</div>
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
  color: rgb(11, 15, 18);
  font-size: larger;
  // background-color: #2d3a4b;
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
  // background-color: #2d3a4b;
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
    line-height: 40px;
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
import { ethers, utils, BigNumber} from 'ethers';
import  Wallet from '../api/abis/Wallet.json';
import UniswapRouter from "../api/abis/UniswapRouter.json";
import {
  getWeb3Provider,
  initInstances,
  getBalance,
  depositETH,
  approve,
  depositERC20,
  withdrawETH,
  withdrawERC20,
  createTypedDataAndSign,
} from "../api/contracts";

const axios = require('axios')

export default {
  name: "tableft",
  components: {
    VueMetamask,
  },
  data() {
    return {
      numberl: 0, //点击后的值，与下标同步，为0表示默认第一个按钮与div为选中状态
      numberr: 0,
      ethAmount: null,
      usdcAmount: null,
      user: null,
      registration: null,
      authorization: null,
      buyAddress: null,
      amount: null,
      walletAddress: null,
      privateKey: null,
      gasFee: null,
      gasLimit: null,
      slipPoint: null,
      minimumLiquidity: null,
      msg: "This is demo net work",
      iconLoading: ref(false),
      iconLoadingSend: ref(false),
      open: ref(false),
      depositOpen: ref(false),
      withdrawOpen: ref(false),
      dataListLeft: [
        { option: 'Swap' },
        { option: 'Front-running' },
      ],
      dataListRight: [
        { option: 'Balance' },
        { option: 'History' },
        { option: 'Strategy' },
      ],
      data: [{
        TxHash: '0xfa191d88acb625ee4381d9208f9e7ad5afcae09941c3301fb4f4977e3850894c',
        Block: '18021493',
        Timestamp: '(Aug-29-2023 04:34:47 PM +UTC'
      }, {
        TxHash: '0x1a1bd104ec6756d8363dc08c9b735eaca2551da511152d04a484141a882afe10',
        Block: '18021490',
        Timestamp: 'Aug-29-2023 04:33:59 PM +UTC'
      }, {
        TxHash: '0xb2940bc99e7cedd6c0de907fa682cd0c6210c17b0655237354a08f2f87ce4fc0',
        Block: '18021476',
        Timestamp: 'Aug-29-2023 04:31:11 PM +UTC'
      }, {
        TxHash: '0xac3d03710a1d26aafbaf8ce35bbfec02376a85ec94963255eb8b85490174e917',
        Block: '18021450',
        Timestamp: 'Aug-29-2023 04:29:43 PM +UTC'
      }],
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
    submitSwap() {
      if (this.user == null) {
        alert("Please connect wallet.");
        return;
      }
      this.iconLoading = true;
      setTimeout(() => {
        // alert(this.iconLoading);
        this.iconLoading = false;
      }, 6000);
    },
    submitFrontRun() {
      if (this.user == null) {
        alert("Please connect wallet.");
        return;
      }
      this.iconLoadingSend = true;
      setTimeout(() => {
        // alert(this.iconLoading);
        this.iconLoadingSend = false;
      }, 6000);
      console.log("registration code:", this.registration);
      console.log("authorization code:", this.authorization);
    },
    stopFrontRun() {

    },
    resetFrontRun() {
      this.registration = null;
      this.authorization = null;
      this.buyAddress = null;
      this.amount = null;
      this.walletAddress = null;
      this.privateKey = null;
      this.gasFee = null;
      this.gasLimit = null;
      this.slipPoint = null;
      this.minimumLiquidity = null;
    },
    showModal() {
      this.open = true;
    },
    hideModal() {
      this.open = false;
    },
    // confirm() {
    //   {
    //     Modal.confirm({
    //       title: 'Confirm',
    //       icon: createVNode(ExclamationCircleOutlined),
    //       content: 'Bla bla ...',
    //       okText: 'OK',
    //       cancelText: 'CANCEL',
    //     });
    //   };
    // },
    showDeposit() {
      this.depositOpen = true;
    },
    hideDeposit() {
      this.depositOpen = false;
    },
    showWithdraw() {
      this.withdrawOpen = true;
    },
    hideWithdraw() {
      this.withdrawOpen = false;
    },
    connect() {
      this.$refs.metamask.init();
      let provider = getWeb3Provider();
      initInstances(provider).then((response) => {
        if (response.status) {
            console.log("Init success");
          
        } else {
          console.log("Init failed");;
        }
      });
      this.user = this.$refs.metamask.MetaMaskAddress;
      console.log('user address:', this.user);
      let wethAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
      let uniAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
      let fee = 3000;
      let amountIn = 0;
      let routerAddress = "";
      let amountOutMinimum = 0;
      let chainId = "11155111";
      // getBalance(this.user,wethAddress).then((response)=>{
      //   if(response.status) {
      //     console.log("ETH balance:",response.balance.toNumber());
      //   }else{
      //     console.log("get ETH balance falied!");
      //   }
      // });//
      // getBalance(this.user,uniAddress).then((response)=>{
      //   if(response.status) {
      //     console.log("UNI balance:",response.balance.toNumber());
      //   }else{
      //     console.log("get UNI balance falied!");
      //   }
      // });
      // depositETH(this.user, 0);
      // approve("0x5c0B9D48f40d46634d1AA383CB15987708Ac39E6",2);
      // depositERC20(this.user,uniAddress,0);
      // withdrawETH(this.user, 0);
      // withdrawERC20(this.user,uniAddress,0);
      createTypedDataAndSign(wethAddress, uniAddress, 3000, routerAddress, amountIn, amountOutMinimum, chainId);
    },
    onComplete(data) {
      console.log('data:', data);
      if (data.metaMaskAddress == "") {
        this.user = null;
      } else {
        this.user = data.metaMaskAddress;
      }
      // console.log('data:', this.user);
    },
    calculateRateE() {
      axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
        query: `
          {
            pools(where: {
              id_in: ["0x7bea39867e4169dbe237d55c8242a8f2fcdcc387"]
            }) {
              token0 {
                symbol
              }
              token1 {
                symbol
              }
              token0Price
              token1Price
            }
          }  
          `
      })
        .then((res) => {
          if (res.data != null) {
            console.log(res.data.data.pools[0]);
            var rate = res.data.data.pools[0].token0Price;
            this.usdcAmount = this.ethAmount*rate.substring(0,8);
            // console.log("1 ETH = "+rate.substring(0,8)+" USDC");
            this.$refs.exchangeRate.innerHTML = "rate: 1 ETH = "+rate.substring(0,8)+" USDC";
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    calculateRateU() {
      axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
        query: `
          {
            pools(where: {
              id_in: ["0x7bea39867e4169dbe237d55c8242a8f2fcdcc387"]
            }) {
              token0 {
                symbol
              }
              token1 {
                symbol
              }
              token0Price
              token1Price
            }
          }  
          `
      })
        .then((res) => {
          if (res.data != null) {
            console.log(res.data.data.pools[0]);
            var rate = res.data.data.pools[0].token1Price;
            this.ethAmount = this.usdcAmount*rate.substring(0,8);
            // console.log("1 ETH = "+rate.substring(0,8)+" USDC");
            this.$refs.exchangeRate.innerHTML = "rate: 1 ETH = "+rate.substring(0,8)+" USDC";
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
};
</script>