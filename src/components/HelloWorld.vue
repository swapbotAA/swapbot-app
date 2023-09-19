<template>
  <div>
    <!-- <vue-metamask 
            userMessage="msg" 
            @onComplete="onComplete"
        >
        </vue-metamask> -->
    <div class="header"><img src="../assets/robot.svg" style="height: 45px;width: 45px; padding-right: 10px;">
      Sparky
      <vue-metamask ref="metamask" @onComplete="onComplete"></vue-metamask>
      <a-button type="primary" danger style="position: absolute; right: 10px; top: 10px;" @click="connect">
        <span v-if="this.user == null">Connect Wallet</span>
        <span v-else>{{ this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4) }}</span>
      </a-button>
    </div>
    <div class="leftbar">
      <div class="tableft">
        <div class="content">
          <div style="margin: auto;width: 90%;margin-top: -60px;position: absolute;text-align: left;">
            <!--2个按钮-->
            <button :class="indexl == numberl ? 'btnl1' : 'btnl'" @click="tableft(indexl)"
              v-for="(iteml, indexl) in dataListLeft" :key="indexl">{{ iteml.option }}
            </button>

            <img src="../assets/setting-fill.svg"
              style="width: 40px; height: 40px; position: absolute;right: 10%;top: 25%;right: 10%;"
              @click="showModal()" />

          </div>
          <!--2个div-->
          <div id="contentLeft1" v-show="numberl == 0">

            <span>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%; padding-top: 10%;">
                <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount" @change="calculateRateE()"
                  placeholder="0" suffix="ETH" style="height: 60px;" /> -->
                  <span>
                <label>
                  <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount"
                  @change="calculateRateE()" placeholder="0" style="width: 70%; height: 40px;"/>
                </label>
                <label>
                    <a-select :size="size" default-value="eth" style="width: 30%;" @select="handleChangeSrc">
                    <a-select-option style="text-align: center;"
                      :value="item.value"
                      :disabled="item.disabled"
                      v-for="item in optionSrc"
                      :key="item.value"
                    >{{item.label}}</a-select-option>
                  </a-select>
                </label>
              </span>
              </div>
              <div style="line-height: 20px;"><img src="../assets/swap.svg" style="height: 20px; width: 20px;"></div>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;">
                <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="uniAmount"
                  @change="calculateRateU()" placeholder="0" suffix="UNI" style="height: 60px;"/> -->
                  <span>
                <label>
                  <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="erc20Amount"
                  @change="calculateRateU()" placeholder="0" style="width: 70%; height: 40px; "/>
                </label>
                <label>
                    <a-select :size="size" default-value="uni" style="width: 30%;" @select="handleChangeDes">
                    <a-select-option style="text-align: center;"
                      :value="item.value"
                      :disabled="item.disabled"
                      v-for="item in optionDes"
                      :key="item.value"
                    >{{item.label}}</a-select-option>
                  </a-select>
                </label>
              </span>
              </div>
              <div style="line-height: 50px;" ref="exchangeRate">rate:?</div>
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
            <span>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%; padding-top: 10%;">
                <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount" @change="calculateRateE()"
                  placeholder="0" suffix="ETH" style="height: 60px;" /> -->
                  <span>
                <label>
                  <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethLimitedAmount"
                   placeholder="0" style="width: 70%; height: 40px;"/>
                </label>
                <label>
                    <a-select :size="size" default-value="eth" style="width: 30%;" @select="handleChangeSrc">
                    <a-select-option style="text-align: center;"
                      :value="item.value"
                      :disabled="item.disabled"
                      v-for="item in optionSrc"
                      :key="item.value"
                    >{{item.label}}</a-select-option>
                  </a-select>
                </label>
              </span>
              </div>
              <div style="line-height: 20px;"><img src="../assets/swap.svg" style="height: 20px; width: 20px;"></div>
              <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;">
                <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="uniAmount"
                  @change="calculateRateU()" placeholder="0" suffix="UNI" style="height: 60px;"/> -->
                  <span>
                <label>
                  <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="erc20LimitedAmount"
                   placeholder="0" style="width: 70%; height: 40px; "/>
                </label>
                <label>
                    <a-select :size="size" default-value="uni" style="width: 30%;" @select="handleChangeDes">
                    <a-select-option style="text-align: center;"
                      :value="item.value"
                      :disabled="item.disabled"
                      v-for="item in optionDes"
                      :key="item.value"
                    >{{item.label}}</a-select-option>
                  </a-select>
                </label>
              </span>
              </div>
              <!-- <div style="line-height: 50px;" ref="exchangeRate">rate:?</div> -->
              <a-button type="primary" :loading="iconLoadingLimited" @click="submitLimitedSwap()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Submit Order
              </a-button>
            </span>
            </div>

          <div id="contentLeft3" v-show="numberl == 2">
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
              <a-input v-model:value="slipPointfr" addon-before="Slip point" />
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
            <!--setting modal windows -->
            <a-modal v-model:open="openSetting" title="Setting" ok-text="OK" cancel-text="CX" @ok="hideModal()" @cancel="cancelModal()" >
              <p style="font-size: medium;">Maximum slip point<a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="slipPoint" placeholder="0"
                  suffix="%" style="height: 60px;" /></p>
              <p style="font-size: medium;">Trade deadline<a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="deadLine" placeholder="0" suffix="mins"
                  style="height: 60px;" /></p>
              <p style="font-size: medium;">Private Transaction &nbsp<a-switch v-model:checked="PriTxChecked" /></p>
            </a-modal>
            <!--deposit eth modal windows -->
            <a-modal v-model:open="depositEthOpen" title="Deposit" ok-text="OK" cancel-text="CX" @ok="hideEthDeposit()" @cancel="cancelEthDeposit()">
              <p style="font-size: medium;">ETH<a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="depositEth" placeholder="0" suffix=""
                  style="height: 60px;" /></p>
            </a-modal>
            <!--withdraw eth modal windows -->
            <a-modal v-model:open="withdrawEthOpen" title="Withdraw" ok-text="OK" cancel-text="CX" @ok="hideEthWithdraw()" @cancel="cancelEthWithdraw()">
              <p style="font-size: medium;">ETH<a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="withdrawEth" placeholder="0" suffix=""
                  style="height: 60px;" /></p>
            </a-modal>
            <!--approve erc20 modal windows -->
            <a-modal v-model:open="approveErc20Open" title="Approve" ok-text="OK" cancel-text="CX" @ok="hideErc20Approve()" @cancel="cancelErc20Approve()">
              <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="approveErc20" placeholder="0" suffix= ""
                  style="height: 60px;" /></p>
            </a-modal>
            <!--deposit erc20 modal windows -->
            <a-modal v-model:open="depositErc20Open" title="Deposit" ok-text="OK" cancel-text="CX" @ok="hideErc20Deposit()" @cancel="cancelErc20Deposit()">
              <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="depositErc20" placeholder="0" suffix=""
                  style="height: 60px;" /></p>
            </a-modal>
            <!--withdraw erc20 modal windows -->
            <a-modal v-model:open="withdrawErc20Open" title="Withdraw" ok-text="OK" cancel-text="CX" @ok="hideErc20Withdraw()" @cancel="cancelErc20Withdraw()">
              <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="withdrawErc20" placeholder="0" suffix=""
                  style="height: 60px;" /></p>
            </a-modal>
            <!--drawer of ETH operating-->
            <a-drawer
              v-model:open="operateEthOpen"
              class="custom-class"
              root-class-name="root-class-name"
              :root-style="{ color: 'blue' }"
              style="color: rgb(24, 18, 18)"
              title="ETH"
              placement="right"
              @after-open-change="afterOpenChange"
            >
              <a-button type="primary" :loading="iconLoadingDepositEth" @click="showEthDeposit()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Deposit
              </a-button>
              <a-button type="primary" :loading="iconLoadingWithdrawEth" @click="showEthWithdraw()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Withdraw
              </a-button>
            </a-drawer>
            <!--drawer of ERC20 operating-->
            <a-drawer
              v-model:open="operateErc20Open"
              class="custom-class"
              root-class-name="root-class-name"
              :root-style="{ color: 'blue' }"
              style="color: rgb(24, 18, 18)"
              :title="tokenName"
              placement="right"
              @after-open-change="afterOpenChange"
            >
              <a-button type="primary" :loading="iconLoadingApproveErc20" @click="showErc20Approve()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Approve
              </a-button>
              <a-button type="primary" :loading="iconLoadingDepositErc20" @click="showErc20Deposit()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Deposit
              </a-button>
              <a-button type="primary" :loading="iconLoadingWithdrawErc20" @click="showErc20Withdraw()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Withdraw
              </a-button>
            </a-drawer>
            <!--drawer of ERC20 adding-->
            <a-drawer
              v-model:open="addErc20Open"
              class="custom-class"
              root-class-name="root-class-name"
              :root-style="{ color: 'blue' }"
              style="color: rgb(24, 18, 18)"
              title="Add ERC20"
              placement="bottom"
              @after-open-change="afterOpenChange"
            >
            <span style="position: absolute; width: 80%; left: 10%;line-height: 40px;">
              <a-input oninput="value=value.replace(/[\W]/g,'')" v-model:value="addErc20Address" addon-before="erc20 token address" />
              <a-input oninput="value=value.replace(/[\W]/g,'')" v-model:value="addErc20Symbol" addon-before="erc20 token symbol" />

              <a-button type="primary" @click="addCustomToken()"
                style="width: 200px;height: 40px;border: 0;border-radius: 5px;margin: 10px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Add Custom Token
              </a-button>
            </span>
            </a-drawer>
          </div>
        </div>
      </div>
    </div>
    <div class="rightbar">
      <div class="tabright">
        <div class="content">
          <div style="margin: auto;width: 90%;margin-top: -60px;position: absolute;text-align: left;;">
            <!--3个按钮-->
            <button :class="indexr == numberr ? 'btnr1' : 'btnr'" @click="tabright(indexr)"
              v-for="(itemr, indexr) in dataListRight" :key="indexr">{{ itemr.option }}
            </button>
          </div>
          <!--3个div-->
          <div id="contentRight1" v-show="numberr == 0">
            <span ref="tokenList">
              <span v-for="value in object">
                <a-button type="text" style="text-align: left; width: 100%; height: 100px; border-radius: 15px;" @click="showOperateDrawer(value)">
                  <span>{{ value.token }}</span><span>:&nbsp</span><span>{{ value.balance }}</span>
                </a-button>
              </span>
            </span>
            <!-- @click="openNotifaction('success')" -->
            <a-button type="primary" shape="circle" @click="showAddErc20Drawer()">+</a-button>
          </div>
          <div id="contentRight2" v-show="numberr == 2" style="">
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
          <div id="contentRight3" v-show="numberr == 1">
            <span>
              <a-list size="large" bordered :data-source="orderData"
                style="top: 5%; width: 90%; margin-left: 5%;text-align: left;">
                <template #renderItem="{ item }">
                  <a-list-item><span style="margin-left:8%;">Order Number:&nbsp</span>{{ item }}<span>&nbsp&nbsp&nbsp&nbsp&nbsp</span>
                    <!-- <a-button  type="primary" style="height: 40px;width: 100px; margin-left: 30%;">Edit</a-button> -->
                    <a-button danger type="primary" shape="round" style="height: 40px;width: 80px; margin-left: 45%;">
                      Cancel
                    </a-button>
                  </a-list-item>
                </template>
              </a-list>
            </span>
          </div>
          <div id="contentRight4" v-show="numberr == 3">
            <span>Coming soon!</span>
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

  #contentLeft1,
  #contentLeft2 {
    background-color: rgb(245 246 252);
    height: 500px;
    font-size: 16px;
    line-height: 100px;
    margin-top: 60px;
    border-radius: 15px;
  }

  #contentLeft3 {
    background-color: rgb(245 246 252);
    height: 500px;
    font-size: 16px;
    line-height: 40px;
    margin-top: 60px;
    border-radius: 15px;
  }

  #contentRight1,
  #contentRight2,
  #contentRight3,
  #contentRight4 {
    background-color: rgb(255 244 250);
    height: 500px;
    font-size: 16px;
    line-height: 100px;
    margin-top: 60px;
    border-radius: 15px;
    overflow-y: auto;
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
import { ref, createVNode } from 'vue';
import { Modal,notification } from 'ant-design-vue';
import VueMetamask from 'vue-metamask';
import { ethers, utils, BigNumber } from 'ethers';

import Wallet from '../api/abis/Wallet.json';
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
  createTypedData,
} from "../api/contracts";

const axios = require('axios');

const [api, contextHolder] = notification.useNotification();

//define select data sets
var optionDes = [
  { label: "UNI", value: "uni", disabled: false },
  { label: "WBTC", value: "wbtc", disabled: true },
  { label: "USDC", value: "usdc", disabled: true },
  { label: "USDT", value: "usdt", disabled: true }
];
var optionSrc = [
  { label: "ETH", value: "eth", disabled: false },
  // { label: "WBTC", value: "erc20-wbtc", disabled: true },
  // { label: "USDC", value: "erc20-usdc", disabled: false },
  // { label: "USDT", value: "erc20-usdt", disabled: false }
];
//wrap map data set to store pool addresses
let rateMap = new Map();
rateMap.set("ethuni","0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801");
//wrap map data set to store contract addresses
let contractAddrMap = new Map();
contractAddrMap.set("eth","0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14");
contractAddrMap.set("uni","0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");


let wrapObj = [{token:"ETH",address:"0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",balance:0},
               {token:"UNI",address:"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",balance:0},
               {token:"USDC",address:"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",balance:0},
              ];

let tokenName = "ERC20";

export default {
  name: "tableft",
  components: {
    VueMetamask,
  },
  data() {
    return {
      ethLimitedAmount: null,
      erc20LimitedAmount: null,
      PriTxChecked: ref(false),
      addErc20Address: null,
      addErc20Symbol: null,
      tokenName: tokenName,
      object: wrapObj,
      rateMap: rateMap,
      contractAddrMap: contractAddrMap,
      subKeySrc: "eth",
      subKeyDes: "uni",
      size: ref('large'),
      numberl: 0, //点击后的值，与下标同步，为0表示默认第一个按钮与div为选中状态
      numberr: 0,
      ethAmount: null,
      erc20Amount: null,
      depositEth: null,
      depositErc20: null,
      withdrawEth: null,
      withdrawErc20: null,
      approveErc20: null,
      user: null,
      registration: null,
      authorization: null,
      buyAddress: null,
      amount: null,
      // walletAddress: null,
      privateKey: null,
      gasFee: null,
      gasLimit: null,
      slipPoint: null,
      slipPointfr: null,
      deadLine: null,
      minimumLiquidity: null,
      // wethAddress: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      // uniAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      fee: 3000,
      walletAddress: "0x90CaF385c36b19d9f2BB9B5098398b6844eff8eB",
      routerAddress: "0x63A62CBFeBaADFE58CA7E876b6b72868C4aA7CB6",
      // amountOutMinimum: 0,
      chainId: "11155111",
      ethBalance: null,
      uniBalance: null,
      msg: "This is demo net work",
      iconLoadingDepositEth: ref(false),
      iconLoadingWithdrawEth: ref(false),
      iconLoadingApproveErc20: ref(false),
      iconLoadingDepositErc20: ref(false),
      iconLoadingWithdrawErc20: ref(false),
      iconLoading: ref(false),
      iconLoadingLimited: ref(false),
      iconLoadingSend: ref(false),
      openSetting: ref(false),
      depositErc20Open: ref(false),
      depositEthOpen: ref(false),
      withdrawErc20Open: ref(false),
      withdrawEthOpen: ref(false),
      approveErc20Open: ref(false),
      operateEthOpen: ref(false),
      operateErc20Open: ref(false),
      addErc20Open: ref(false),
      dataListLeft: [
        { option: 'Swap' },
        { option: 'Limited Orders' },
        // { option: 'Front Running' },
      ],
      dataListRight: [
        { option: 'Balance' },
        { option: 'Order List' },
        { option: 'History' },
        // { option: 'Strategy' },
      ],
      data: [],
      orderData:["123","456"],
      optionSrc: optionSrc,
      optionDes: optionDes,
    }
  },
  methods: {
    openNotifaction(type, content) {
      notification[type]({
        message: 'Notification',
        description:
          content,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    },
    showOperateDrawer(value) {
      console.log("token name:",value.token);
      if (value.token == "ETH") {
        this.showOperateEthDrawer();
      }else {
        this.showOperateErc20Drawer(value);
      }
    },
    addCustomToken() {
      if (this.addErc20Address!=undefined && this.addErc20Symbol!=undefined) {
        console.log("addErc20Address: ",this.addErc20Address);
        console.log("addCustomToken: ",this.addErc20Symbol);
        let tmpObj = {token:this.addErc20Symbol, address:this.addErc20Address, balance:0};
        this.object.push(tmpObj);
        this.addErc20Open = false;
      }
      // alert(this.$refs.exchangeRate.innerHTML());
    },
    showAddErc20Drawer() {
      this.addErc20Open = true;
    },
    showOperateEthDrawer() {
      this.operateEthOpen = true;
    },
    showOperateErc20Drawer(value) {
      console.log("get token name:",value.token);
      this.operateErc20Open = true;
      this.tokenName = value.token;
    },
    // getEthBalance() {
    //   return this.ethBalance + " ETH";
    // },
    // getUniBalance() {
    //   return this.uniBalance + " UNI";
    // },
    //get select src value
    handleChangeSrc(value) {
      this.subKeySrc = value;
    },
    //get select des value
    handleChangeDes(value) {
      this.subKeyDes = value;
      // alert(this.subKeyDes);
    },
    //定义切换方法
    tableft(index) {
      this.numberl = index;
      // console.log(index, this.number);
    },
    tabright(index) {
      this.numberr = index;
      // console.log(index, this.number);
    },
    submitLimitedSwap() {
      if (this.user == null) {
        alert("Please connect wallet.");
        return;
      }
      if (this.ethLimitedAmount == undefined || this.erc20LimitedAmount == undefined) {
        return;
      }
      this.iconLoadingLimited = true;
      console.log("eth limited Amount;",this.ethLimitedAmount);
      console.log("erc20 limited Amount:",this.erc20LimitedAmount);
      setTimeout(() => {
        // alert(this.iconLoading);
        this.iconLoadingLimited = false;
      }, 1000);
    },
    submitSwap() {
      if (this.user == null) {
        alert("Please connect wallet.");
        return;
      }
      if (this.ethAmount == undefined || this.erc20Amount == undefined) {
        return;
      }
      this.iconLoading = true;
      let amountOutMinimum = String(this.erc20Amount*(1-this.slipPoint/100)).substring(0,8);
      console.log("ethAmount",this.ethAmount);
      console.log("amountOutMinimum",amountOutMinimum);
      if (!this.contractAddrMap.has(this.subKeySrc)) {
        console.log("Invaild src contract address");
        return;
      }
      if (!this.contractAddrMap.has(this.subKeyDes)) {
        console.log("Invaild src contract address");
        return;
      }
      createTypedData(this.contractAddrMap.get(this.subKeySrc), this.contractAddrMap.get(this.subKeyDes), this.fee, this.routerAddress, this.ethAmount, amountOutMinimum, this.chainId).then((res)=>{
        console.log("response:",res);
        // call exactInputSingle in relayer
        let obj = {
          r: res.r,
          s: res.s,
          salt: res.value.salt,
          tx_value: {
            amount_in: String(res.value.amountIn),
            amount_out_minimum: String(res.value.amountOutMinimum),
            fee: res.value.fee,
            recipient: res.value.recipient,
            token_in: res.value.tokenIn,
            token_out: res.value.tokenOut,
            sqrtPriceLimitX96: res.value.sqrtPriceLimitX96
          },
          user: this.user,
          v:res.v,
          flag: this.privateKey
        };
        console.log("obj string:", JSON.stringify(obj));
        axios.post('/api/v1/instant_swap', {
          r: res.r,
          s: res.s,
          salt: res.value.salt,
          tx_value: {
            amount_in: String(res.value.amountIn),
            amount_out_minimum: String(res.value.amountOutMinimum),
            fee: res.value.fee,
            recipient: res.value.recipient,
            token_in: res.value.tokenIn,
            token_out: res.value.tokenOut,
            sqrtPriceLimitX96: res.value.sqrtPriceLimitX96
          },
          user: this.user,
          v:res.v,
          flag: this.privateKey
        })
          .then(function (response) {
            console.log(response);
            if (response.data.code == 1000) {
              console.log("swap success!");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      });
      setTimeout(() => {
        // alert(this.iconLoading);
        this.iconLoading = false;
      }, 1000);
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
      this.slipPointfr = null;
      this.minimumLiquidity = null;
    },
    showModal() {
      this.openSetting = true;
    },
    hideModal() {
      console.log("slipPoint:",this.slipPoint);
      console.log("deadLine:",this.deadLine);
      console.log("PriTxChecked:", this.PriTxChecked);
      this.openSetting = false;
    },
    cancelModal(){
      // this.slipPoint = null;
      // this.deadLine = null;
    },
    showEthDeposit() {
      this.depositEthOpen = true;
    },
    hideEthDeposit() {
      if (this.depositEth > 0) {
        this.iconLoadingDepositEth = true;
        // deposit ETH
        depositETH(this.user, this.depositEth, this.hideEthDepositCallback);
      }
      this.depositEth = null;
      this.depositEthOpen = false;
    },
    hideEthDepositCallback(value) {
      console.log("receipt status:",value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Deposit Succeed!");
        // update  eth balance
        for (let index = 0; index < this.object.length; index++) {
          const element = this.object[index];
          getBalance(this.user, element.address).then((response) => {
            if (response.status) {
              console.log(element.token + " balance:" + response.balance.toNumber());
              this.object[index].balance = this.formateNumber(response.balance.toNumber() / 1000000000000000000);
            } else {
              console.log("get "+element.token+" balance falied!");
            }
          });
        }
      }else{
        this.openNotifaction("error", "Deposit Failed!");
      }
      // update loading icon
      this.iconLoadingDepositEth = false;
    },
    cancelEthDeposit() {
      this.depositEth = null;
    },
    showErc20Deposit() {
      this.depositErc20Open = true;
    },
    hideErc20Deposit() {
      // deposit ERC20
      if (this.depositErc20 > 0) {
        // we need get current erc20 token index in object
        this.iconLoadingDepositErc20 = true;
        let flag = null;
        for (let index = 0; index < this.object.length; index++) {
          const element = this.object[index];
          if (this.tokenName == element.token) {
            flag = index;
          }
        }
        if (flag != null) {
          console.log("match success! index is:", flag);
          console.log("token address: ", this.object[flag].address);
          depositERC20(this.user, this.object[flag].address, this.depositErc20, this.hideErc20DepositCallback);
        } else {
          this.notification("error", "Invaild token address!");
        }
      }
      this.depositErc20 = null;
      this.depositErc20Open = false;
    },
    hideErc20DepositCallback(value) {
      console.log("receipt status:",value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Deposit Succeed!");
        // update  erc20 balance
        for (let index = 0; index < this.object.length; index++) {
          const element = this.object[index];
          getBalance(this.user, element.address).then((response) => {
            if (response.status) {
              console.log(element.token + " balance:" + response.balance.toNumber());
              this.object[index].balance = this.formateNumber(response.balance.toNumber() / 1000000000000000000);
            } else {
              console.log("get "+element.token+" balance falied!");
            }
          });
        }
      }else{
        this.openNotifaction("error", "Deposit Failed!");
      }
      // update loading icon
      this.iconLoadingDepositErc20 = false;
    },
    cancelErc20Deposit() {
      this.depositErc20 = null;
    },
    showEthWithdraw() {
      this.withdrawEthOpen = true;
    },
    hideEthWithdraw() {
      if (this.withdrawEth > 0) {
        this.iconLoadingWithdrawEth = true;
        // withdraw ETH
        withdrawETH(this.user, this.withdrawEth, this.hideEthWithdrawCallback);
      }
      this.withdrawEth = null;
      this.withdrawEthOpen = false;
    },
    hideEthWithdrawCallback(value) {
      console.log("receipt status:",value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Withdraw Succeed!");
        // update  eth balance
        for (let index = 0; index < this.object.length; index++) {
          const element = this.object[index];
          getBalance(this.user, element.address).then((response) => {
            if (response.status) {
              console.log(element.token + " balance:" + response.balance.toNumber());
              this.object[index].balance = this.formateNumber(response.balance.toNumber() / 1000000000000000000);
            } else {
              console.log("get "+element.token+" balance falied!");
            }
          });
        }
      }else{
        this.openNotifaction("error", "Withdraw Failed!");
      }
      // update loading icon
      this.iconLoadingWithdrawEth = false;
    },
    cancelEthWithdraw() {
      this.withdrawEth = null;
    },
    showErc20Withdraw() {
      this.withdrawErc20Open = true;
    },
    hideErc20Withdraw() {
      if (this.withdrawErc20 > 0) {
        // we need get current erc20 token index in object
        this.iconLoadingWithdrawErc20 = true;
        let flag = null;
        for (let index = 0; index < this.object.length; index++) {
          const element = this.object[index];
          if (this.tokenName == element.token) {
            flag = index;
          }
        }
        if (flag != null) {
          console.log("match success! index is:", flag);
          console.log("token address: ", this.object[flag].address);
          withdrawERC20(this.user, this.object[flag].address, this.withdrawErc20, this.hideErc20WithdrawCallback);
        } else {
          this.notification("error", "Invaild token address!");
        }
      }
      this.withdrawErc20 = null;
      this.withdrawErc20Open = false;
    },
    hideErc20WithdrawCallback(value) {
      console.log("receipt status:",value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Withdraw erc20 Succeed!");
        // update  erc20 balance
        for (let index = 0; index < this.object.length; index++) {
          const element = this.object[index];
          getBalance(this.user, element.address).then((response) => {
            if (response.status) {
              console.log(element.token + " balance:" + response.balance.toNumber());
              this.object[index].balance = this.formateNumber(response.balance.toNumber() / 1000000000000000000);
            } else {
              console.log("get "+element.token+" balance falied!");
            }
          });
        }
      }else{
        this.openNotifaction("error", "Withdraw erc20 Failed!");
      }
      // update loading icon
      this.iconLoadingWithdrawErc20 = false;
    },
    cancelErc20Withdraw() {
      this.withdrawErc20 = null;
    },
    showErc20Approve() {
      this.approveErc20Open = true;
    },
    hideErc20Approve() {
      if (this.approveErc20 > 0) {
        this.iconLoadingApproveErc20 = true;
        // we need get current erc20 token index in object
        let flag = null;
        for (let index = 0; index < this.object.length; index++) {
          const element = this.object[index];
          if (this.tokenName == element.token) {
            flag = index;
          }
        }
        if (flag != null) {
          console.log("match success! index is:", flag);
          console.log("token address: ", this.object[flag].address);
          approve(this.walletAddress, this.object[flag].address, this.approveErc20, this.hideErc20ApproveCallback);
        }else{
          this.notification("error","Invaild token address!");
        }
      }
      this.approveErc20 = null;
      this.approveErc20Open = false;
    },
    hideErc20ApproveCallback(value) {
      console.log("receipt status:",value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Approve Succeed!");
      }else{
        this.openNotifaction("error", "Approve Failed!");
      }
      // update loading icon
      this.iconLoadingApproveErc20 = false;
    },
    cancelErc20Approve(){
      this.approveErc20 = null;
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
    },
    onComplete(data) {
      console.log('data:', data);
      if (data.metaMaskAddress == "") {
        this.user = null;
        // this.ethBalance = null;
        // this.uniBalance = null;
      } else {
        this.user = data.metaMaskAddress;
        this.getTxHistory();
        let provider = getWeb3Provider();
        initInstances(provider).then((response) => {
          if (response.status) {
            console.log("Init success");

          } else {
            console.log("Init failed");;
          }
        });
        for (let index = 0; index < this.object.length; index++) {
          const element = this.object[index];
          getBalance(this.user, element.address).then((response) => {
            if (response.status) {
              console.log(element.token + " balance:" + response.balance.toNumber());
              this.object[index].balance = this.formateNumber(response.balance.toNumber() / 1000000000000000000);
            } else {
              console.log("get "+element.token+" balance falied!");
            }
          });
        }
      }
      // console.log('data:', this.user);
    },
    formateNumber(num) {
      var data = String(num).split(/[eE]/);
      if (data.length == 1) return data[0];

      var z = '',
        sign = num < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

      if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/, '');
      }
      mag -= str.length;
      while (mag--) z += '0';
      return str + z;
    },
    // UNI pooladdress:0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801
    //USDC pooladdress:0x7bea39867e4169dbe237d55c8242a8f2fcdcc387
    calculateRateE() {
      let pooladdr = "";
      if (this.rateMap.has(this.subKeySrc+this.subKeyDes)) {
        pooladdr = this.rateMap.get(this.subKeySrc+this.subKeyDes);
      }else{
        console.log("Invalid pool address!");
        return;
      };
      console.log("pool addr:", pooladdr);
      axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
        query: `
          {
            pools(where: {
              id_in: ["`+pooladdr+`"]
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
            this.erc20Amount = String(this.ethAmount * Number(rate.substring(0, 8))).substring(0,8);
            // console.log("uniAmount: ",String(this.uniAmount).substring(0,8));
            this.$refs.exchangeRate.innerHTML = "rate: 1 "+this.subKeySrc+" = " + rate.substring(0, 8) + " "+this.subKeyDes;
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    // UNI pooladdress:0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801
    //USDC pooladdress:0x7bea39867e4169dbe237d55c8242a8f2fcdcc387
    calculateRateU() {
      let pooladdr = "";
      if (this.rateMap.has(this.subKeySrc+this.subKeyDes)) {
        pooladdr = this.rateMap.get(this.subKeySrc+this.subKeyDes);
      }else{
        console.log("Invalid pool address!");
        return;
      };
      axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
        query: `
          {
            pools(where: {
              id_in: ["`+pooladdr+`"]
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
            this.ethAmount = String(this.erc20Amount * Number(rate.substring(0, 8))).substring(0,8);
            // console.log("1 ETH = "+rate.substring(0,8)+" UNI");
            this.$refs.exchangeRate.innerHTML = "rate: 1 "+this.subKeyDes+" = " + rate.substring(0, 8) + " "+this.subKeySrc;
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getTxHistory() {
      axios.post("https://api-sepolia.etherscan.io/api?module=account&action=txlist&address="+this.user+"&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=C8EH3QCAH18KHGDVTQIM3HWWVBV9FW3AQ9").then((res)=>{
        if (res != null) {
          console.log("Tx history:",res.data.result);
          res.data.result.forEach(element => {
            let tmpObj = {
              blockHash: element.blockHash,
              blockNumber: element.blockNumber,
              timeStamp: element.timeStamp
            };
            this.data.push(tmpObj);
          });
          // this.data[0].blockHash = res.data.result[3].blockHash;
          // this.data[0].blockNumber = res.data.result[3].blockNumber;
          // this.data[0].timeStamp = res.data.result[3].timeStamp;

          // this.data[1].blockHash = res.data.result[2].blockHash;
          // this.data[1].blockNumber = res.data.result[2].blockNumber;
          // this.data[1].timeStamp = res.data.result[2].timeStamp;

          // this.data[2].blockHash = res.data.result[1].blockHash;
          // this.data[2].blockNumber = res.data.result[1].blockNumber;
          // this.data[2].timeStamp = res.data.result[1].timeStamp;

          // this.data[3].blockHash = res.data.result[0].blockHash;
          // this.data[3].blockNumber = res.data.result[0].blockNumber;
          // this.data[3].timeStamp = res.data.result[0].timeStamp;
        }
      })
    },
  },
};
</script>