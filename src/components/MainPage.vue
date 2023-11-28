<template>
  <div>
    <!-- <vue-metamask 
            userMessage="msg" 
            @onComplete="onComplete"
        >
        "color"
"ball"
"lines"
"thick"
"circle"
"cobweb"
"polygon"
"square"
"tadpole"
"fountain"
"random"
"custom"
        </vue-metamask> -->
    <particles-bg type="circle" :bg="true" />
    <!-- <div class="header"><img src="../assets/robot.svg" style="height: 100px;width: 100px; padding-right: 10px;">
      Sparky -->
      <vue-metamask ref="metamask" @onComplete="onComplete"></vue-metamask>
      <!-- <a-button type="primary" danger style="position: absolute; right: 10px; top: 10px;" @click="connect">
        <span v-if="this.user == null">Connect Wallet</span>
        <span v-else>{{ this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4) }}</span>
      </a-button>
    </div> -->
    <div class="leftbar">
      <div class="tableft">
        <div class="content">
          <div style="margin: auto;width: 90%;margin-top: -60px;position: absolute;text-align: left;">
            <!--2个按钮-->
            <button :class="indexl == numberl ? 'btnl1' : 'btnl'" @click="tableft(indexl)"
              v-for="(iteml, indexl) in dataListLeft" :key="indexl">{{ iteml.option }}
            </button>

            <!-- <img src="../assets/setting-fill.svg"
              style="width: 40px; height: 40px; position: absolute;right: 10%;top: 25%;right: 10%;"
              @click="showModal()" /> -->

          </div>
          <!--2个div-->
          <div id="contentLeft1" v-show="numberl == 0">

            <span>
              <div v-show="changePositionFlag == 0">
                <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%; padding-top: 10%;">
                  <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount" @change="calculateRateE()"
                  placeholder="0" suffix="ETH" style="height: 60px;" /> -->
                  <span>
                    <label>
                      <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount"
                        @change="calculateRateE()" placeholder="0" style="width: 70%; height: 40px;" />
                    </label>
                    <label>
                      <a-select :size="size" default-value="eth" style="width: 30%;" @select="handleChangeSrc">
                        <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                          v-for="item in optionSrc" :key="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </label>
                  </span>
                </div>
                <div style="line-height: 20px;"><img src="../assets/swap.svg" style="height: 20px; width: 20px;"
                    @click="changePosition()"></div>
                <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;">
                  <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="uniAmount"
                  @change="calculateRateU()" placeholder="0" suffix="UNI" style="height: 60px;"/> -->
                  <span>
                    <label>
                      <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="erc20Amount"
                        @change="calculateRateU()" placeholder="0" style="width: 70%; height: 40px; " />
                    </label>
                    <label>
                      <a-select :size="size" default-value="uni" style="width: 30%;" @select="handleChangeDes">
                        <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                          v-for="item in optionDes" :key="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </label>
                  </span>
                </div>
              </div>
              <div v-show="changePositionFlag == 1">
                <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%; padding-top: 10%;">
                  <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="uniAmount"
                  @change="calculateRateU()" placeholder="0" suffix="UNI" style="height: 60px;"/> -->
                  <span>
                    <label>
                      <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="erc20Amount"
                        @change="calculateRateU()" placeholder="0" style="width: 70%; height: 40px; " />
                    </label>
                    <label>
                      <a-select :size="size" default-value="uni" style="width: 30%;" @select="handleChangeDes">
                        <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                          v-for="item in optionDes" :key="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </label>
                  </span>
                </div>
                <div style="line-height: 20px;"><img src="../assets/swap.svg" style="height: 20px; width: 20px;"
                    @click="changePosition()"></div>
                <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;">
                  <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount" @change="calculateRateE()"
                  placeholder="0" suffix="ETH" style="height: 60px;" /> -->
                  <span>
                    <label>
                      <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount"
                        @change="calculateRateE()" placeholder="0" style="width: 70%; height: 40px;" />
                    </label>
                    <label>
                      <a-select :size="size" default-value="eth" style="width: 30%;" @select="handleChangeSrc">
                        <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                          v-for="item in optionSrc" :key="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </label>
                  </span>
                </div>
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
              <div v-show="changeLimitedPositionFlag == 0">
                <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%; padding-top: 10%;">
                  <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount" @change="calculateRateE()"
                  placeholder="0" suffix="ETH" style="height: 60px;" /> -->
                  <span>
                    <label>
                      <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethLimitedAmount"
                        placeholder="0" style="width: 70%; height: 40px;" />
                    </label>
                    <label>
                      <a-select :size="size" default-value="eth" style="width: 30%;" @select="handleChangeLimitedSrc">
                        <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                          v-for="item in optionSrc" :key="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </label>
                  </span>
                </div>
                <div style="line-height: 20px;"><img src="../assets/swap.svg" style="height: 20px; width: 20px; "
                    @click="changeLimitedPosition()"></div>
                <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;">
                  <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="uniAmount"
                  @change="calculateRateU()" placeholder="0" suffix="UNI" style="height: 60px;"/> -->
                  <span>
                    <label>
                      <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                        v-model:value="erc20LimitedAmount" placeholder="0" style="width: 70%; height: 40px; " />
                    </label>
                    <label>
                      <a-select :size="size" default-value="uni" style="width: 30%;" @select="handleChangelimitedDes">
                        <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                          v-for="item in optionDes" :key="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </label>
                  </span>
                </div>
              </div>
              <div v-show="changeLimitedPositionFlag == 1">
                <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%; padding-top: 10%;">
                  <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="uniAmount"
                  @change="calculateRateU()" placeholder="0" suffix="UNI" style="height: 60px;"/> -->
                  <span>
                    <label>
                      <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                        v-model:value="erc20LimitedAmount" placeholder="0" style="width: 70%; height: 40px; " />
                    </label>
                    <label>
                      <a-select :size="size" default-value="uni" style="width: 30%;" @select="handleChangelimitedDes">
                        <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                          v-for="item in optionDes" :key="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </label>
                  </span>
                </div>
                <div style="line-height: 20px;"><img src="../assets/swap.svg" style="height: 20px; width: 20px;"
                    @click="changeLimitedPosition()"></div>
                <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;">
                  <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount" @change="calculateRateE()"
                  placeholder="0" suffix="ETH" style="height: 60px;" /> -->
                  <span>
                    <label>
                      <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethLimitedAmount"
                        placeholder="0" style="width: 70%; height: 40px;" />
                    </label>
                    <label>
                      <a-select :size="size" default-value="eth" style="width: 30%;" @select="handleChangeLimitedSrc">
                        <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                          v-for="item in optionSrc" :key="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </label>
                  </span>
                </div>
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
            <a-modal v-model:open="openSetting" title="Setting" ok-text="OK" cancel-text="CX" @ok="hideModal()"
              @cancel="cancelModal()">
              <p style="font-size: medium;">Maximum slip point<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="slipPoint" placeholder="0" suffix="%" style="height: 60px;" /></p>
              <p style="font-size: medium;">Trade deadline<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="deadLine" placeholder="0" suffix="mins" style="height: 60px;" /></p>
              <p style="font-size: medium;">Private Transaction &nbsp<a-switch v-model:checked="PriTxChecked" /></p>
            </a-modal>
            <!--deposit eth modal windows -->
            <a-modal v-model:open="depositEthOpen" title="Deposit" ok-text="OK" cancel-text="CX" @ok="hideEthDeposit()"
              @cancel="cancelEthDeposit()">
              <p style="font-size: medium;">ETH<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="depositEth" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--withdraw eth modal windows -->
            <a-modal v-model:open="withdrawEthOpen" title="Withdraw" ok-text="OK" cancel-text="CX" @ok="hideEthWithdraw()"
              @cancel="cancelEthWithdraw()">
              <p style="font-size: medium;">ETH<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="withdrawEth" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--approve erc20 modal windows -->
            <a-modal v-model:open="approveErc20Open" title="Approve" ok-text="OK" cancel-text="CX"
              @ok="hideErc20Approve()" @cancel="cancelErc20Approve()">
              <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="approveErc20" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--deposit erc20 modal windows -->
            <a-modal v-model:open="depositErc20Open" title="Deposit" ok-text="OK" cancel-text="CX"
              @ok="hideErc20Deposit()" @cancel="cancelErc20Deposit()">
              <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="depositErc20" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--withdraw erc20 modal windows -->
            <a-modal v-model:open="withdrawErc20Open" title="Withdraw" ok-text="OK" cancel-text="CX"
              @ok="hideErc20Withdraw()" @cancel="cancelErc20Withdraw()">
              <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="withdrawErc20" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--drawer of ETH operating-->
            <a-drawer v-model:open="operateEthOpen" class="custom-class" root-class-name="root-class-name"
              :root-style="{ color: 'blue' }" style="color: rgb(24, 18, 18)" title="ETH" placement="right"
              @after-open-change="afterOpenChange">
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
            <a-drawer v-model:open="operateErc20Open" class="custom-class" root-class-name="root-class-name"
              :root-style="{ color: 'blue' }" style="color: rgb(24, 18, 18)" :title="tokenName" placement="right"
              @after-open-change="afterOpenChange">
              <!-- <a-button type="primary" :loading="iconLoadingApproveErc20" @click="showErc20Approve()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Approve
              </a-button> -->
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
              <a-button type="dashed" @click="showDeleteButton()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                ...
              </a-button>
              <a-button v-show="showDeleteFlage" type="primary" danger @click="deleteToken(tokenName)"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Delete Token
              </a-button>
              <!-- <div v-show="showDeleteFlage">
                <a-button type="primary" danger :loading="iconLoadingWithdrawErc20" @click="deleteToken(tokenName)"
                  style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                  <template #icon>
                    <PoweroffOutlined />
                  </template>
                  Delete Token
                </a-button>
              </div> -->
            </a-drawer>
            <!--drawer of ERC20 adding-->
            <a-drawer v-model:open="addErc20Open" class="custom-class" root-class-name="root-class-name"
              :root-style="{ color: 'blue' }" style="color: rgb(24, 18, 18)" title="Add ERC20" placement="bottom"
              @after-open-change="afterOpenChange">
              <span style="position: absolute; width: 80%; left: 10%;line-height: 40px;">
                <a-input oninput="value=value.replace(/[\W]/g,'')" v-model:value="addErc20Address"
                  addon-before="erc20 token address" />
                <a-input oninput="value=value.replace(/[\W]/g,'')" v-model:value="addErc20Symbol"
                  addon-before="erc20 token symbol" />

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
    <!--right bar-->
    <div class="bottom"></div><!--Designed by BlockModel-->
  </div>
</template>

<style scoped lang="less">
/* head */
.header {
  position: absolute;
  line-height: 50px;
  top: 3%; //0px;
  left: 0px;
  right: 0px;
  color: rgb(134, 50, 159);
  font-size: 60px;
  // background-color: #2d3a4b;
}

/* left */
.leftbar {
  position: absolute;
  width: 95%;
  top: 10%; //60px;
  /* 距离上面50像素 */
  left: 3%;
  bottom: 60px;
  overflow-y: auto;
  /* 当内容过多时y轴出现滚动条 */
  // background-color: #f0f4fd;
}

/* right */
.rightbar {
  position: absolute;
  width: 45%;
  top: 15%; //60px;
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

  .btnwallet {
    text-align: left;
    width: 100%;
    height: 100px;
    border-radius: 15px;
  }

  .btnwallet1 {
    text-align: left;
    width: 100%;
    height: 100px;
    border-radius: 15px;
    background-color: #feecf9;
  }


  #contentLeft1,
  #contentLeft2 {
    background: linear-gradient(#ffeef9, #91bee5);
    ;
    height: 500px;
    font-size: 16px;
    line-height: 100px;
    margin-top: 60px;
    border-radius: 15px;
  }

  #contentLeft3 {
    background: linear-gradient(#ffeef9, #91bee5);
    ;
    height: 500px;
    font-size: 16px;
    line-height: 40px;
    margin-top: 60px;
    border-radius: 15px;
  }

  #contentRight0,
  #contentRight1,
  #contentRight2,
  #contentRight3,
  #contentRight4 {
    background: linear-gradient(#cddfca, #f3d789);
    ;
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
import { Modal, notification } from 'ant-design-vue';
import VueMetamask from 'vue-metamask';
import { ethers, utils, BigNumber } from 'ethers';
import { ParticlesBg } from "particles-bg-vue";
import Wallet from '../api/abis/Wallet.json';
import UniswapRouter from "../api/abis/UniswapRouter.json";
import {
  getWeb3Provider,
  initInstances,
  getErc20Balance,
  depositETH,
  approve,
  depositERC20,
  withdrawETH,
  withdrawERC20,
  ethToErc20DataOperationWrapper,
  erc20ToEthDataOperationWrapper,
  ethToErc20LimitedDataOperationWrapper,
  erc20ToEthLimitedDataOperationWrapper,
  getWalletAddress,
  getEthBalance,
} from "../api/contracts";

const axios = require('axios');
const schedule = require('node-schedule');
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
rateMap.set("ethuni", "0x224Cc4e5b50036108C1d862442365054600c260C");// 0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801
//wrap map data set to store contract addresses
let contractAddrMap = new Map();
contractAddrMap.set("eth", "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14");
contractAddrMap.set("uni", "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");

// default null
let wrapObj = [
  // { token: "ETH", address: null, balance: 0 },
  // { token: "WETH", address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", balance: 0 },
  // { token: "UNI", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", balance: 0 },
  // { token: "USDC", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", balance: 0 },
];

// default null
let walletAddr = [
  // { address: "0xCeCd6718a8Fd49c7fA2220d9b034C0f36a8DaA88" }
];

let tokenName = "ERC20";

export default {
  // name: "tableft",
  components: {
    VueMetamask,
    ParticlesBg,
  },
  data() {
    return {
      changePositionFlag: 0,
      changeLimitedPositionFlag: 0,
      // walletIndex: 0,
      walletSalt: 0,//default 0
      showDeleteFlage: ref(false),
      ethLimitedAmount: null,
      erc20LimitedAmount: null,
      PriTxChecked: ref(false),
      addErc20Address: null,
      addErc20Symbol: null,
      tokenName: tokenName,
      object: wrapObj,
      walletObj: walletAddr,
      rateMap: rateMap,
      contractAddrMap: contractAddrMap,
      subKeySrc: "eth",
      subKeyDes: "uni",
      subKeyLimitedSrc: "eth",
      subKeyLimitedDes: "uni",
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
      // user: null,
      registration: null,
      authorization: null,
      buyAddress: null,
      amount: null,
      privateKey: null,
      gasFee: null,
      gasLimit: null,
      slipPoint: 100,
      slipPointfr: null,
      deadLine: null,
      minimumLiquidity: null,
      // wethAddress: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      // uniAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      fee: 3000,
      walletAddress: null,//"0xF3FF08EbF08AAa9705EBC67916548f970E2d5baB",//default null
      routerAddress: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
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
        { option: 'Wallet' },
        { option: 'Balance' },
        { option: 'Order List' },
        // { option: 'History' },
        // { option: 'Strategy' },
      ],
      dataHistory: [],
      orderData: [
        // { orderNo: "1",orderContent: { tokenIn: "eth", tokenOut: "uni", tokenInAmount: "0.0001", tokenOutAmount: "0.0003" } },
        // { orderNo: "2",orderContent: { tokenIn: "eth", tokenOut: "uni", tokenInAmount: "0.0001", tokenOutAmount: "0.0003" } },
      ],
      optionSrc: optionSrc,
      optionDes: optionDes,
    }
  },
  methods: {
    scheduleTask() {
      const scheduleCronstyle = () => {
        //: schedule task will be executed every 5 minutes
        schedule.scheduleJob('*/1 * * * *', () => {
          // console.log('scheduleCronstyle:' + new Date());
          // query limited order status
          axios.post('/api/v1/query_limit_orders', {
            sender: this.walletAddress
          })
            .then(response => {
              console.log(response);
              if (response.data.code == 1000) {
                this.orderData = [];
                // update order status
                if (response.data.data != null && response.data.data.length > 0) {
                  response.data.data.forEach(elementOut => {
                      let tokenInSymbol = null;
                      let tokenOutSymbol = null;
                      this.contractAddrMap.forEach(function (value, key) {
                        if (value == elementOut.TokenIn) {
                          tokenInSymbol = key;
                        }
                        if (value == elementOut.TokenOut) {
                          tokenOutSymbol = key;
                        }
                      });
                      // console.log("tokenInSymbol: ", tokenInSymbol);
                      // console.log("tokenOutSymbol: ", tokenOutSymbol);
                      let limitedOrderTmpObj = { orderNo: elementOut.OrderNo, orderContent: { tokenIn: tokenInSymbol, tokenOut: tokenOutSymbol, tokenInAmount: elementOut.TokenInAmount, tokenOutAmount: elementOut.TokenOutAmount, status: elementOut.Status, txHash: elementOut.TxHash } };
                      if (elementOut.Status != "cancel") {
                        this.orderData.push(limitedOrderTmpObj);
                      }
                  });
                }

                // update eth balance
                getEthBalance(this.walletAddress).then((response) => {
                  if (response.status) {
                    this.object.forEach(element => {
                      if (element.token == "ETH") {
                        // console.log("eth balance:" + String(response.balance));
                        element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                      }
                    })
                  } else {
                    console.log("get ETH balance falied!");
                  }
                });
                // update  erc20 balance
                for (let index = 1; index < this.object.length; index++) {
                  const element = this.object[index];
                  getErc20Balance(this.walletAddress, element.address).then((response) => {
                    if (response.status) {
                      // console.log(element.token + " balance:" + String(response.balance));
                      this.object[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                    } else {
                      console.log("get " + element.token + " balance falied!");
                    }
                  });
                }

              } else {
                console.log("error code: ", response.data.code);
              }
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
      scheduleCronstyle();
    },
    changeLimitedPosition() {
      console.log("before change limited order PositionFlag: ", this.changeLimitedPositionFlag);
      this.changeLimitedPositionFlag = this.changeLimitedPositionFlag == 0 ? 1 : 0;
      console.log("after change limited order PositionFlag: ", this.changeLimitedPositionFlag);
    },
    changePosition() {
      console.log("before change PositionFlag: ", this.changePositionFlag);
      this.changePositionFlag = this.changePositionFlag == 0 ? 1 : 0;
      console.log("after change PositionFlag: ", this.changePositionFlag);
    },
    addWallet() {
      console.log("this function will add a wallet address!");
      // first create account
      if (this.walletObj.length == 0) {
        getWalletAddress(this.user, this.walletSalt, this.addWalletCallback);
      } else {
        this.walletSalt = this.walletSalt + 1;
        getWalletAddress(this.user, this.walletSalt, this.addWalletCallback);
      }
    },
    addWalletCallback(value) {
      console.log("receipt status:", value);
      if (value) {
        // notice: create success
        this.openNotifaction("success", "Create Account Address successfully! Address: " + value);
        this.walletObj.push({
          address: value,
          salt: this.walletSalt
        });
        // default select first address
        if (this.walletSalt == 0) {
          this.walletAddress = value;

          // add new account address into asset list
          if (this.object.length == 0) {
            console.log("asset Address: ", this.walletAddress);
            console.log("asset symbol: ", "ETH");
            let tmpObj = { token: "ETH", address: this.walletAddress, balance: 0 };
            this.object.push(tmpObj);
          }
        }
        // // add new account address into asset list
        // if (this.object = []) {
        //   console.log("asset Address: ", this.walletAddress);
        //   console.log("asset symbol: ", "ETH");
        //   let tmpObj = { token: "ETH", address: this.walletAddress, balance: 0 };
        //   this.object.push(tmpObj);
        // }
        // new smart contract account should be stored into account list
        axios.post('/api/v1/add_contract_account', {
          user: this.user,
          account: value,
          salt: String(this.walletSalt)
        }).then(response => {
          console.log(response);
          if (response.data.code == 1000) {
            console.log("Successfully store new smart contract account.");
          } else {
            console.log("error code: ", response.data.code);
          }
        }).catch(error => {
          console.log(error);
          console.log("wallet salt should subtract 1");
          if (this.walletObj.length > 0) {
            this.walletSalt = this.walletSalt - 1;
          }
        });

      } else {
        this.openNotifaction("error", "Create Account Address Failed!");
        console.log("wallet salt should subtract 1");
        if (this.walletObj.length > 0) {
            this.walletSalt = this.walletSalt - 1;
          }
      }
      // if (this.walletSalt == 0) {
      //     this.walletAddress = value;
      //     let tmpObj = { token: "ETH", address: this.walletAddress, balance: 0 };
      //     this.object.push(tmpObj);
      //   }
      // this.walletSalt = this.walletSalt + 1;
    },
    changeWallet(value) {
      this.walletAddress = value.address;
      this.openNotifaction("success", "wallet address changed! addr: " + this.walletAddress);
      this.object.forEach(element => {
        if (element.token == "ETH") {
          element.address = this.walletAddress;
        }
      })
      console.log(this.object);
      // when user change wallet account, we need recall query_account_assets
      axios.post('/api/v1/query_account_assets', {
                  sender: this.walletAddress
                })
                  .then(response => {
                    console.log(response);
                    if (response.data.code == 1000) {
                      // remove erc20 tokens but keep ETH
                      this.object = [];
                      let tmpObj = { token: "ETH", address: this.walletAddress, balance: 0 };
                      this.object.push(tmpObj);
                      console.log("Successfully obtained user asset list.");
                      if (response.data.data != null && response.data.data.length > 0) {
                        response.data.data.forEach(element => {
                          console.log("asset Address: ", element.Address);
                          console.log("asset symbol: ", element.Token);
                          tmpObj = { token: element.Token, address: element.Address, balance: 0 };
                          this.object.push(tmpObj);

                        })
                      }
                    }

                    // update erc20 balance
                    for (let index = 1; index < this.object.length; index++) {
                      const element = this.object[index];
                      getErc20Balance(this.walletAddress, element.address).then((response) => {
                        if (response.status) {
                          // console.log(element.token + " balance:" + String(response.balance));
                          this.object[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                        } else {
                          console.log("get " + element.token + " balance falied!");
                        }
                      });
                    }
                    this.orderData = [];
                    // query limited order status
                axios.post('/api/v1/query_limit_orders', {
                  sender: this.walletAddress
                })
                  .then(response => {
                    console.log(response);
                    if (response.data.code == 1000) {
                      // update order status
                      if (response.data.data != null && response.data.data.length > 0) {
                        response.data.data.forEach(elementOut => {
                          // console.log("order details: ", elementOut);

                          let tokenInSymbol = null;
                          let tokenOutSymbol = null;
                          this.contractAddrMap.forEach(function (value, key) {
                            if (value == elementOut.TokenIn) {
                              tokenInSymbol = key;
                            }
                            if (value == elementOut.TokenOut) {
                              tokenOutSymbol = key;
                            }
                          });
                          // console.log("tokenInSymbol: ", tokenInSymbol);
                          // console.log("tokenOutSymbol: ", tokenOutSymbol);
                          let limitedOrderTmpObj = { orderNo: elementOut.OrderNo, orderContent: { tokenIn: tokenInSymbol, tokenOut: tokenOutSymbol, tokenInAmount: elementOut.TokenInAmount, tokenOutAmount: elementOut.TokenOutAmount, status: elementOut.Status, txHash: elementOut.TxHash } };
                          if (elementOut.Status != "cancel") {
                            this.orderData.push(limitedOrderTmpObj);
                          }

                          // this.orderData.forEach(elementIn => {
                          //   if (elementOut.OrderNo == elementIn.orderNo && elementOut.Status == "complete") {
                          //     elementIn.status = elementOut.Status;
                          //     elementIn.txHash = elementOut.TxHash;
                          //   }
                          // });
                        });
                      }
                    } else {
                      console.log("error code: ", response.data);
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
                  })
                  .catch(error => {
                    console.log(error);
                  });

      // update eth balance
      getEthBalance(this.walletAddress).then((response) => {
        if (response.status) {
          this.object.forEach(element => {
            if (element.token == "ETH") {
              // console.log("eth balance:" + String(response.balance));
              element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
            }
          })
        } else {
          console.log("get ETH balance falied!");
        }
      });
    },
    deleteToken(value) {
      for (let index = 0; index < this.object.length; index++) {
        const element = this.object[index];
        if (element.token == value) {
          this.object.splice(index, 1);
        }
      }
      this.openNotifaction("success", "delete token successfully!");
      // remove token from asset list
      axios.post('/api/v1/remove_account_asset', {
        sender: this.walletAddress,
        address: this.addErc20Address
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 1000) {
            console.log("Successfully remove asset.");
          } else {
            console.log("error code: ", response.data.code);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    showDeleteButton() {
      this.showDeleteFlage = this.showDeleteFlage == false ? true : false;
    },
    cancelLimitedOrder(orderNo) {
      for (let index = 0; index < this.orderData.length; index++) {
        const element = this.orderData[index];
        if (element.orderNo == orderNo) {
          this.orderData.splice(index, 1);
        }
      }
      this.openNotifaction("success", "cancel successfully!");
      // delete order from limited order list
      axios.post('/api/v1/cancel_limit_order', {
        sender: this.walletAddress,
        order_no: orderNo // timestamp
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 1000) {
            console.log("Successfully remove order.");
          } else {
            console.log("error code: ", response.data.code);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
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
      console.log("token name:", value.token);
      if (value.token == "ETH") {
        this.showOperateEthDrawer();
      } else {
        this.showOperateErc20Drawer(value);
      }
    },
    addCustomToken() {
      if (this.addErc20Address != undefined && this.addErc20Symbol != undefined) {
        console.log("addErc20Address: ", this.addErc20Address);
        console.log("addCustomToken: ", this.addErc20Symbol);
        let tmpObj = { token: this.addErc20Symbol, address: this.addErc20Address, balance: 0 };
        this.object.push(tmpObj);
        this.openNotifaction("success", "Successfully add new asset.");
        // new asset info should be stored into asset list
        axios.post('/api/v1/add_account_asset', {
          sender: this.walletAddress,
          token: this.addErc20Symbol,
          address: this.addErc20Address
        })
          .then(response => {
            console.log(response);
            if (response.data.code == 1000) {
              console.log("Successfully add new asset.");
            } else {
              console.log("error code: ", response.data.code);
            }
          })
          .catch(error => {
            console.log(error);
          });
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
      console.log("get token name:", value.token);
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
    //get limited order select src value
    handleChangeLimitedSrc(value) {
      this.subKeyLimitedSrc = value;
    },
    //get limited order select des value
    handleChangeLimitedDes(value) {
      this.subKeyLimitedDes = value;
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
        this.openNotifaction("info", "Please connect wallet.");
        return;
      }
      if (this.walletAddress == null) {
        this.openNotifaction("info", "Please create smart contract account.");
        return;
      }
      if (this.ethLimitedAmount == undefined || this.erc20LimitedAmount == undefined) {
        this.openNotifaction("info", "Please enter the transaction amount.");
        return;
      }

      console.log("eth limited Amount;", this.ethLimitedAmount);
      console.log("erc20 limited Amount:", this.erc20LimitedAmount);

      if (!this.contractAddrMap.has(this.subKeyLimitedSrc)) {
        console.log("Invaild limited order src contract address");
        return;
      }
      if (!this.contractAddrMap.has(this.subKeyLimitedDes)) {
        console.log("Invaild limited order des contract address");
        return;
      }
      // loading icon
      this.iconLoadingLimited = true;
      let amountOutMinimum = "";

      // get metamask signature
      if (this.changeLimitedPositionFlag == 0) {
        let walletSalt = 0;
        // update walletIndex
        // amountOutMinimum = String(this.erc20LimitedAmount * (1 - this.slipPoint / 100)).substring(0, 8);
        for (let index = 0; index < this.walletObj.length; index++) {
          const element = this.walletObj[index];
          if (element.address == this.walletAddress) {
            walletSalt = element.salt;
            console.log("wallet info: ", element);
          }
        }
        ethToErc20LimitedDataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeyLimitedSrc), this.contractAddrMap.get(this.subKeyLimitedDes), this.fee, this.routerAddress, this.ethLimitedAmount, this.erc20LimitedAmount, this.chainId).then(res => {
          if (res != undefined) {
            console.log("userOperation: ", res);
            let timeStamp = new Date().getTime();
            console.log("current timestamp: ", timeStamp);
            
            // add order to limited order list
            let obj = {
              beneficiary_addr: this.user,
              user_op: {
                call_data: res.callData,
                call_gas_limit: String(res.callGasLimit),
                init_code: res.initCode,
                max_fee_per_gas: String(res.maxFeePerGas),
                max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                nonce: String(res.nonce),
                paymaster_and_data: res.paymasterAndData,
                pre_verification_gas: String(res.preVerificationGas),
                sender: res.sender,
                signature: res.signature,
                verification_gas_limit: String(res.verificationGasLimit)
              },
              order_details: {
                // order_no: timeStamp,// timestamp
                token_in: this.contractAddrMap.get(this.subKeyLimitedSrc),
                amount_in: String(ethers.utils.parseUnits(this.ethLimitedAmount)),
                token_out: this.contractAddrMap.get(this.subKeyLimitedDes),
                amount_out: String(ethers.utils.parseUnits(this.erc20LimitedAmount)),
                fee: 0,
                sender: this.walletAddress,
                amount_out_minimum: String(ethers.utils.parseUnits(this.erc20LimitedAmount)),//String(ethers.utils.parseUnits(this.erc20LimitedAmount))
              }
            };
            console.log("obj string:", JSON.stringify(obj));
            // return;
            axios.post('/api/v1/add_limit_order', {
              beneficiary_addr: this.user,
              user_op: {
                call_data: res.callData,
                call_gas_limit: String(res.callGasLimit),
                init_code: res.initCode,
                max_fee_per_gas: String(res.maxFeePerGas),
                max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                nonce: String(res.nonce),
                paymaster_and_data: res.paymasterAndData,
                pre_verification_gas: String(res.preVerificationGas),
                sender: res.sender,
                signature: res.signature,
                verification_gas_limit: String(res.verificationGasLimit)
              },
              order_details: {
                // order_no: timeStamp,// timestamp
                token_in: this.contractAddrMap.get(this.subKeyLimitedSrc),
                amount_in: String(ethers.utils.parseUnits(this.ethLimitedAmount)),
                token_out: this.contractAddrMap.get(this.subKeyLimitedDes),
                amount_out: String(ethers.utils.parseUnits(this.erc20LimitedAmount)),
                fee: 0,
                sender: this.walletAddress,
                amount_out_minimum: String(ethers.utils.parseUnits(this.erc20LimitedAmount)),//String(ethers.utils.parseUnits(this.erc20LimitedAmount))
              }
            })
              .then(response => {
                console.log(response);
                if (response.data.code == 1000) {
                  this.openNotifaction("success", "Swap successfully!");
                  // this.openNotifaction("success", "Swap successfully! Transaction hash: " + response.data.data);
                  console.log("successfully submit!");

                  // query order list
                  axios.post('/api/v1/query_limit_orders', {
                    sender: this.walletAddress
                  })
                    .then(response => {
                      console.log(response);
                      if (response.data.code == 1000) {
                        this.orderData = [];
                        // update order status
                        if (response.data.data != null && response.data.data.length > 0) {
                          response.data.data.forEach(element => {
                            // console.log("order details: ", element);
                            let tokenInSymbol = null;
                            let tokenOutSymbol = null;
                            this.contractAddrMap.forEach(function(value, key){
                              if (value == element.TokenIn) {
                                tokenInSymbol = key;
                              }
                              if (value == element.TokenOut) {
                                tokenOutSymbol = key;
                              }
                            });
                            // console.log("tokenInSymbol: ",tokenInSymbol);
                            // console.log("tokenOutSymbol: ",tokenOutSymbol);
                            let limitedOrderTmpObj = { orderNo: element.OrderNo, orderContent: { tokenIn: tokenInSymbol, tokenOut: tokenOutSymbol, tokenInAmount: element.TokenInAmount, tokenOutAmount: element.TokenOutAmount, status: element.Status, txHash: element.TxHash } };
                            if (element.Status != "cancel") {
                            this.orderData.push(limitedOrderTmpObj);
                          }
                          });
                        }
                      } else {
                        console.log("error code: ", response.data.code);
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }else {
                  this.openNotifaction("info", "Swap error! error: " + response.data.message);
                  console.log("swap error!");
                  this.iconLoadingLimited = false;
                }
              })
              .catch(error => {
                console.log(error);
              });
          }

          this.iconLoadingLimited = false;
        });
      }
      if (this.changeLimitedPositionFlag == 1) {
        let walletSalt = 0;
        // amountOutMinimum = String(this.ethLimitedAmount * (1 - this.slipPoint / 100)).substring(0, 8);
        // update walletIndex
        for (let index = 0; index < this.walletObj.length; index++) {
          const element = this.walletObj[index];
          if (element.address == this.walletAddress) {
            walletSalt = element.salt;
            console.log("wallet info: ", element);
          }
        }
        erc20ToEthLimitedDataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeyLimitedDes), this.contractAddrMap.get(this.subKeyLimitedSrc), this.fee, this.routerAddress, this.erc20LimitedAmount, this.ethLimitedAmount, this.chainId).then(res => {
          if (res != undefined) {
            console.log("userOperation: ", res);
            let timeStamp = new Date().getTime();
            console.log("current timestamp: ", timeStamp);
            // let limitedOrderTmpObj = { orderNo: timeStamp, orderContent: { tokenIn: this.subKeyLimitedDes, tokenOut: this.subKeyLimitedDes, tokenInAmount: this.erc20LimitedAmount, tokenOutAmount: this.ethLimitedAmount } };
            // this.orderData.push(limitedOrderTmpObj);

            let obj = {
              beneficiary_addr: this.user,
              user_op: {
                call_data: res.callData,
                call_gas_limit: String(res.callGasLimit),
                init_code: res.initCode,
                max_fee_per_gas: String(res.maxFeePerGas),
                max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                nonce: String(res.nonce),
                paymaster_and_data: res.paymasterAndData,
                pre_verification_gas: String(res.preVerificationGas),
                sender: res.sender,
                signature: res.signature,
                verification_gas_limit: String(res.verificationGasLimit)
              },
              order_details: {
                token_in: this.contractAddrMap.get(this.subKeyLimitedDes),
                amount_in: String(ethers.utils.parseUnits(this.erc20LimitedAmount)),
                token_out: this.contractAddrMap.get(this.subKeyLimitedSrc),
                amount_out: String(ethers.utils.parseUnits(this.ethLimitedAmount)),
                fee: 0,
                sender: this.walletAddress,
                amount_out_minimum: String(ethers.utils.parseUnits(this.ethLimitedAmount)),//String(ethers.utils.parseUnits(this.ethLimitedAmount))
              }
            };
            console.log("obj string:", JSON.stringify(obj));
            // return;
            axios.post('/api/v1/add_limit_order', {
              beneficiary_addr: this.user,
              user_op: {
                call_data: res.callData,
                call_gas_limit: String(res.callGasLimit),
                init_code: res.initCode,
                max_fee_per_gas: String(res.maxFeePerGas),
                max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                nonce: String(res.nonce),
                paymaster_and_data: res.paymasterAndData,
                pre_verification_gas: String(res.preVerificationGas),
                sender: res.sender,
                signature: res.signature,
                verification_gas_limit: String(res.verificationGasLimit)
              },
              order_details: {
                token_in: this.contractAddrMap.get(this.subKeyLimitedDes),
                amount_in: String(ethers.utils.parseUnits(this.erc20LimitedAmount)),
                token_out: this.contractAddrMap.get(this.subKeyLimitedSrc),
                amount_out: String(ethers.utils.parseUnits(this.ethLimitedAmount)),
                fee: 0,
                sender: this.walletAddress,
                amount_out_minimum: String(ethers.utils.parseUnits(this.ethLimitedAmount)),//String(ethers.utils.parseUnits(this.ethLimitedAmount))
              }
            })
              .then(response => {
                console.log(response);
                if (response.data.code == 1000) {
                  this.openNotifaction("success", "Swap successfully!");
                  // this.openNotifaction("success", "Swap successfully! Transaction hash: " + response.data.data);
                  console.log("successfully submit!");

                  // query order list
                  axios.post('/api/v1/query_limit_orders', {
                    sender: this.walletAddress
                  })
                    .then(response => {
                      console.log(response);
                      if (response.data.code == 1000) {
                        this.orderData = [];
                        // update order status
                        if (response.data.data != null && response.data.data.length > 0) {
                          response.data.data.forEach(element => {
                            // console.log("order details: ", element);
                            let tokenInSymbol = null;
                            let tokenOutSymbol = null;
                            this.contractAddrMap.forEach(function(value, key){
                              if (value == element.TokenIn) {
                                tokenInSymbol = key;
                              }
                              if (value == element.TokenOut) {
                                tokenOutSymbol = key;
                              }
                            });
                            // console.log("tokenInSymbol: ",tokenInSymbol);
                            // console.log("tokenOutSymbol: ",tokenOutSymbol);
                            let limitedOrderTmpObj = { orderNo: element.OrderNo, orderContent: { tokenIn: tokenInSymbol, tokenOut: tokenOutSymbol, tokenInAmount: element.TokenInAmount, tokenOutAmount: element.TokenOutAmount, status: element.Status, txHash: element.TxHash } };
                            if (element.Status != "cancel") {
                            this.orderData.push(limitedOrderTmpObj);
                          }
                          });
                        }
                        this.iconLoadingLimited = false;
                      } else {
                        console.log("error code: ", response.data.code);
                        this.iconLoadingLimited = false;
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                  
                }else {
                  this.openNotifaction("info", "Swap error! error: " + response.data.message);
                  console.log("swap error!");
                  this.iconLoadingLimited = false;
                }
              })
              .catch(error => {
                console.log(error);
                this.iconLoadingLimited = false;
              });
          }
          this.iconLoadingLimited = false;
        });
      }
      // // update eth balance
      // getEthBalance(this.walletAddress).then((response) => {
      //   if (response.status) {
      //     this.object.forEach(element => {
      //       if (element.token == "ETH") {
      //         console.log("eth balance:" + String(response.balance));
      //         element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
      //       }
      //     })
      //   } else {
      //     console.log("get ETH balance falied!");
      //   }
      // });
      // // update  erc20 balance
      // for (let index = 1; index < this.object.length; index++) {
      //   const element = this.object[index];
      //   getErc20Balance(this.walletAddress, element.address).then((response) => {
      //     if (response.status) {
      //       console.log(element.token + " balance:" + String(response.balance));
      //       this.object[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
      //     } else {
      //       console.log("get " + element.token + " balance falied!");
      //     }
      //   });
      // }

    },
    submitSwap() {
      // console.log("user: ",this.user);
      if (this.user == null) {
        this.openNotifaction("info", "Please connect wallet.");
        return;
      }
      if (this.walletAddress == null) {
        this.openNotifaction("info", "Please create smart contract account.");
        return;
      }
      if (this.ethAmount == undefined || this.erc20Amount == undefined) {
        this.openNotifaction("info", "Please enter the transaction amount.");
        return;
      }
      if (!this.contractAddrMap.has(this.subKeySrc)) {
        console.log("Invaild src contract address");
        return;
      }
      if (!this.contractAddrMap.has(this.subKeyDes)) {
        console.log("Invaild des contract address");
        return;
      }
      // loading icon
      this.iconLoading = true;
      let amountOutMinimum = "";
      if (this.changePositionFlag == 0) {
        console.log("we will swap eth to erc20!");
        amountOutMinimum = String(this.erc20Amount * (1 - this.slipPoint / 100)).substring(0, 8);
        console.log("ethAmount", this.ethAmount);
        console.log("erc20Amount", this.erc20Amount);
        console.log("amountOutMinimum", amountOutMinimum);
        let walletSalt = 0;
        // update walletIndex
        for (let index = 0; index < this.walletObj.length; index++) {
          const element = this.walletObj[index];
          if (element.address == this.walletAddress) {
            walletSalt = element.salt;
            console.log("wallet info: ", element);
          }
        }
        ethToErc20DataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeySrc), this.contractAddrMap.get(this.subKeyDes), this.fee, this.routerAddress, this.ethAmount, amountOutMinimum, this.chainId, this.submitSwapCallback).then(res => {
          // console.log("222222:",res);  
          if (res == undefined) {
            this.iconLoading = false;
            return;
          }
          // call exactInputSingle in relayer
          let obj = {
            beneficiary_addr: this.user,
            user_op: {
              call_data: res.callData,
              call_gas_limit: String(res.callGasLimit),
              init_code: res.initCode,
              max_fee_per_gas: String(res.maxFeePerGas),
              max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
              nonce: String(res.nonce),
              paymaster_and_data: res.paymasterAndData,
              pre_verification_gas: String(res.preVerificationGas),
              sender: res.sender,
              signature: res.signature,
              verification_gas_limit: String(res.verificationGasLimit)
            }
          };
          console.log("obj string:", JSON.stringify(obj));
          axios.post('/api/v1/handle_op', {
            beneficiary_addr: this.user,
            user_op: {
              call_data: res.callData,
              call_gas_limit: String(res.callGasLimit),
              init_code: res.initCode,
              max_fee_per_gas: String(res.maxFeePerGas),
              max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
              nonce: String(res.nonce),
              paymaster_and_data: res.paymasterAndData,
              pre_verification_gas: String(res.preVerificationGas),
              sender: res.sender,
              signature: res.signature,
              verification_gas_limit: String(res.verificationGasLimit)
            }
          })
            .then(response => {
              console.log(response);
              if (response.data.code == 1000) {
                // this.openNotifaction("success", "Swap successfully! Transaction hash: " + response.data.data);
                console.log("swap successfully!");
                this.openNotifaction("success", "Swap successfully!");

                setTimeout(() => {
                  // update eth balance
                  getEthBalance(this.walletAddress).then((response) => {
                    if (response.status) {
                      this.object.forEach(element => {
                        if (element.token == "ETH") {
                          // console.log("eth balance:" + String(response.balance));
                          element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                        }
                      })
                    } else {
                      console.log("get ETH balance falied!");
                    }
                  });
                  // update  erc20 balance
                  for (let index = 1; index < this.object.length; index++) {
                    const element = this.object[index];
                    getErc20Balance(this.walletAddress, element.address).then((response) => {
                      if (response.status) {
                        // console.log(element.token + " balance:" + String(response.balance));
                        this.object[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                      } else {
                        console.log("get " + element.token + " balance falied!");
                      }
                    });
                  }
                  this.openNotifaction("success", "Swap successfully! Transaction hash: " + response.data.data);
                  this.iconLoading = false;
                }, 15000);
              }else {
                  this.openNotifaction("info", "Swap error! error: " + response.data.message);
                  console.log("swap error!");
                  this.iconLoading = false;
              }
            })
            .catch(error => {
              console.log(error);
              this.iconLoading = false;
            });
        });
      };
      if (this.changePositionFlag == 1) {
        console.log("we will swap erc20 to eth!");
        amountOutMinimum = String(this.ethAmount * (1 - this.slipPoint / 100)).substring(0, 8);
        console.log("ethAmount", this.ethAmount);
        console.log("erc20Amount", this.erc20Amount);
        console.log("amountOutMinimum", amountOutMinimum);
        let walletSalt = 0;
        // update walletIndex
        for (let index = 0; index < this.walletObj.length; index++) {
          const element = this.walletObj[index];
          if (element.address == this.walletAddress) {
            walletSalt = element.salt;
            console.log("wallet info: ", element);
          }
        }
        erc20ToEthDataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeyDes), this.contractAddrMap.get(this.subKeySrc), this.fee, this.routerAddress, this.erc20Amount, amountOutMinimum, this.chainId, this.submitSwapCallback).then(res => {
          console.log(res);
          if (res == undefined) {
            this.iconLoading = false;
            return;
          }
          // call exactInputSingle in relayer
          let obj = {
            beneficiary_addr: this.user,
            user_op: {
              call_data: res.callData,
              call_gas_limit: String(res.callGasLimit),
              init_code: res.initCode,
              max_fee_per_gas: String(res.maxFeePerGas),
              max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
              nonce: String(res.nonce),
              paymaster_and_data: res.paymasterAndData,
              pre_verification_gas: String(res.preVerificationGas),
              sender: res.sender,
              signature: res.signature,
              verification_gas_limit: String(res.verificationGasLimit)
            }
          };
          console.log("obj string:", JSON.stringify(obj));
          axios.post('/api/v1/handle_op', {
            beneficiary_addr: this.user,
            user_op: {
              call_data: res.callData,
              call_gas_limit: String(res.callGasLimit),
              init_code: res.initCode,
              max_fee_per_gas: String(res.maxFeePerGas),
              max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
              nonce: String(res.nonce),
              paymaster_and_data: res.paymasterAndData,
              pre_verification_gas: String(res.preVerificationGas),
              sender: res.sender,
              signature: res.signature,
              verification_gas_limit: String(res.verificationGasLimit)
            }
          })
            .then(response => {
              console.log(response);
              if (response.data.code == 1000) {
                // this.openNotifaction("success", "Swap successfully! Transaction hash: " + response.data.data);
                console.log("swap successfully!");
                this.openNotifaction("success", "Swap successfully!");

                setTimeout(() => {
                  // update eth balance
                  getEthBalance(this.walletAddress).then((response) => {
                    if (response.status) {
                      this.object.forEach(element => {
                        if (element.token == "ETH") {
                          // console.log("eth balance:" + String(response.balance));
                          element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                        }
                      })
                    } else {
                      console.log("get ETH balance falied!");
                    }
                  });
                  // update  erc20 balance
                  for (let index = 1; index < this.object.length; index++) {
                    const element = this.object[index];
                    getErc20Balance(this.walletAddress, element.address).then((response) => {
                      if (response.status) {
                        // console.log(element.token + " balance:" + String(response.balance));
                        this.object[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                      } else {
                        console.log("get " + element.token + " balance falied!");
                      }
                    });
                  }
                  this.openNotifaction("success", "Swap successfully! Transaction hash: " + response.data.data);
                  this.iconLoading = false;
                }, 15000);
              }else {
                  this.openNotifaction("info", "Swap error! error: " + response.data.message);
                  console.log("swap error!");
                  this.iconLoading = false;
              }
            })
            .catch(error => {
              console.log(error);
              this.iconLoading = false;
            });
        });
      }
    },
    submitSwapCallback(value) {
      console.log("receipt status:", value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Swap successfully! Transaction hash: " + value.transactionHash);
        // update eth balance
        getEthBalance(this.walletAddress).then((response) => {
          if (response.status) {
            this.object.forEach(element => {
              if (element.token == "ETH") {
                // console.log("eth balance:" + String(response.balance));
                element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
              }
            })
          } else {
            console.log("get ETH balance falied!");
          }
        });
        // update  erc20 balance
        for (let index = 1; index < this.object.length; index++) {
          const element = this.object[index];
          getErc20Balance(this.walletAddress, element.address).then((response) => {
            if (response.status) {
              // console.log(element.token + " balance:" + String(response.balance));
              this.object[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
            } else {
              console.log("get " + element.token + " balance falied!");
            }
          });
        }
      } else {
        this.openNotifaction("error", "Swap Failed!");
      }
      // update loading icon
      this.iconLoading = false;
    },
    submitFrontRun() {
      if (this.user == null) {
        this.openNotifaction("info", "Please connect wallet.");
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
      console.log("slipPoint:", this.slipPoint);
      console.log("deadLine:", this.deadLine);
      console.log("PriTxChecked:", this.PriTxChecked);
      this.openSetting = false;
    },
    cancelModal() {
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
        depositETH(this.walletAddress, this.depositEth, this.hideEthDepositCallback);
        this.depositEth = null;

        this.openNotifaction("info", "Transaction pending.");
      }
      this.depositEthOpen = false;
    },
    hideEthDepositCallback(value) {
      console.log("receipt status:", value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Deposit successfully! Transaction hash: " + value.transactionHash);
        // update  eth balance
        getEthBalance(this.walletAddress).then((response) => {
          if (response.status) {
            // console.log(element.token + " balance:" + response.balance.toNumber());
            this.object.forEach(element => {
              if (element.token == "ETH") {
                element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
              }
            })
          } else {
            console.log("get ETH balance falied!");
          }
        });
        // for (let index = 0; index < this.object.length; index++) {
        //   const element = this.object[index];
        //   getBalance(this.user, element.address).then((response) => {
        //     if (response.status) {
        //       console.log(element.token + " balance:" + response.balance.toNumber());
        //       this.object[index].balance = this.formateNumber(response.balance.toNumber() / 1000000000000000000);
        //     } else {
        //       console.log("get " + element.token + " balance falied!");
        //     }
        //   });
        // }
      } else {
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
          depositERC20(this.walletAddress, this.object[flag].address, this.depositErc20, this.hideErc20DepositCallback);
        } else {
          this.notification("error", "Invaild token address!");
        }
        this.depositErc20 = null;

        this.openNotifaction("info", "Transaction pending.");
      }
      this.depositErc20Open = false;
    },
    hideErc20DepositCallback(value) {
      console.log("receipt status:", value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Deposit successfully! Transaction hash: " + value.transactionHash);
        // update  erc20 balance
        for (let index = 1; index < this.object.length; index++) {
          const element = this.object[index];
          getErc20Balance(this.walletAddress, element.address).then((response) => {
            if (response.status) {
              // console.log(element.token + " balance:" + String(response.balance));
              this.object[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
            } else {
              console.log("get " + element.token + " balance falied!");
            }
          });
        }
      } else {
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
        let walletSalt = 0;
        // update walletIndex
        for (let index = 0; index < this.walletObj.length; index++) {
          const element = this.walletObj[index];
          if (element.address == this.walletAddress) {
            walletSalt = element.salt;
            console.log("wallet info: ", element);
          }
        }
        withdrawETH(this.user, this.walletAddress, walletSalt, this.object[0].address, this.withdrawEth, this.chainId, this.hideEthWithdrawCallback);
        this.withdrawEth = null;

        this.openNotifaction("info", "Transaction pending.");
      }
      this.withdrawEthOpen = false;
    },
    hideEthWithdrawCallback(value) {
      console.log("receipt status:", value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Withdraw successfully! Transaction hash: " + value.transactionHash);
        // update  eth balance
        getEthBalance(this.walletAddress).then((response) => {
          if (response.status) {
            this.object.forEach(element => {
              if (element.token == "ETH") {
                // console.log("eth balance:" + String(response.balance));
                element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
              }
            })
          } else {
            console.log("get ETH balance falied!");
          }
        });
      } else {
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
          let walletSalt = 0;
          // update walletIndex
          for (let index = 0; index < this.walletObj.length; index++) {
            const element = this.walletObj[index];
            if (element.address == this.walletAddress) {
              walletSalt = element.salt;
              console.log("wallet info: ", element);
            }
          }
          withdrawERC20(this.user, this.walletAddress, walletSalt, this.object[flag].address, this.withdrawErc20, this.chainId, this.hideErc20WithdrawCallback);
        } else {
          this.notification("error", "Invaild token address!");
        }
        this.withdrawErc20 = null;

        this.openNotifaction("info", "Transaction pending.");
      }
      this.withdrawErc20Open = false;
    },
    hideErc20WithdrawCallback(value) {
      console.log("receipt status:", value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Withdraw erc20 successfully! Transaction hash: " + value.transactionHash);
        // update  erc20 balance
        for (let index = 1; index < this.object.length; index++) {
          const element = this.object[index];
          getErc20Balance(this.walletAddress, element.address).then((response) => {
            if (response.status) {
              // console.log(element.token + " balance:" + String(response.balance));
              this.object[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
            } else {
              console.log("get " + element.token + " balance falied!");
            }
          });
        }
      } else {
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
        } else {
          this.notification("error", "Invaild token address!");
        }
        this.approveErc20 = null;

        this.openNotifaction("info", "Transaction pending.");
      }
      this.approveErc20Open = false;
    },
    hideErc20ApproveCallback(value) {
      console.log("receipt status:", value);
      if (value) {
        // notice: transaction success
        this.openNotifaction("success", "Approve successfully! Transaction hash: " + value.transactionHash);
      } else {
        this.openNotifaction("error", "Approve Failed!");
      }
      // update loading icon
      this.iconLoadingApproveErc20 = false;
    },
    cancelErc20Approve() {
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
      this.openNotifaction("success", "Log in.");
      // we need get user data from backend service
      // 1. get user smart contract accounts
      axios.post('/api/v1/query_contract_accounts', {
        user: this.user
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 1000) {
            consloe.log("Successfully obtained user smart contract account.");
            if (response.data.data != null && response.data.data.length > 0) {
              response.data.data.forEach(element => {
                this.walletObj.push(
                  {
                    address: element.Account,
                    salt: element.Salt
                  }
                );
                // default select first address
                if (Number(element.Salt) == 0) {
                  this.walletAddress = element.Account;

                  // add first account address into asset list as ETH
                  if (this.object.length == 0) {
                    console.log("asset Address: ", element.Account);
                    console.log("asset symbol: ", "ETH");
                    let tmpObj = { token: "ETH", address: element.Account, balance: 0 };
                    this.object.push(tmpObj);
                  }
                }
                if (Number(element.Salt) > this.walletSalt) {
                  // update user wallet salt
                  this.walletSalt = Number(element.Salt);
                }
              })
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onComplete(data) {
      console.log('data:', data);
      this.scheduleTask();
      if (data.metaMaskAddress == "") {
        this.user = null;
        this.openNotifaction("info", "Log out.");
        this.walletObj = [];
        this.object = [];
        this.orderData = [];
        // this.ethBalance = null;
        // this.uniBalance = null;
      } else {
        this.user = data.metaMaskAddress;
        // this.getTxHistory();
        let provider = getWeb3Provider();
        initInstances(provider).then((response) => {
          if (response.status) {
            console.log("Init success");

          } else {
            console.log("Init failed");
          }
        });

        // we need get user data from backend service
        // 1. get user smart contract accounts
        axios.post('/api/v1/query_contract_accounts', {
          user: this.user
        })
          .then(response => {
            console.log(response);
            if (response.data.code == 1000) {
              console.log("Successfully obtained user smart contract account.");
              if (response.data.data != null && response.data.data.length > 0) {
                response.data.data.forEach(element => {
                  this.walletObj.push(
                    {
                      address: element.Account,
                      salt: element.Salt
                    }
                  );
                  // default select first address
                  if (Number(element.Salt) == 0) {
                    this.walletAddress = element.Account;

                    // add first account address into asset list
                    if (this.object.length == 0) {
                      console.log("asset Address: ", element.Account);
                      console.log("asset symbol: ", "ETH");
                      let tmpObj = { token: "ETH", address: element.Account, balance: 0 };
                      this.object.push(tmpObj);
                    }
                  }
                  if (Number(element.Salt) > this.walletSalt) {
                    // update user wallet salt
                    this.walletSalt = Number(element.Salt);
                  }
                })
              }
              console.log("this wallet address:", this.walletAddress);
              console.log("this wallet salt:", this.walletSalt);

              if (this.walletAddress != null) {
                // before get balances, we need obtain asset list from backend service
                axios.post('/api/v1/query_account_assets', {
                  sender: this.walletAddress
                })
                  .then(response => {
                    console.log(response);
                    if (response.data.code == 1000) {
                      console.log("Successfully obtained user asset list.");
                      if (response.data.data != null && response.data.data.length > 0) {
                        response.data.data.forEach(element => {
                          console.log("asset Address: ", element.Address);
                          console.log("asset symbol: ", element.Token);
                          let tmpObj = { token: element.Token, address: element.Address, balance: 0 };
                          this.object.push(tmpObj);

                        })
                      }
                    }

                    // update erc20 balance
                    for (let index = 1; index < this.object.length; index++) {
                      const element = this.object[index];
                      getErc20Balance(this.walletAddress, element.address).then((response) => {
                        if (response.status) {
                          // console.log(element.token + " balance:" + String(response.balance));
                          this.object[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                        } else {
                          console.log("get " + element.token + " balance falied!");
                        }
                      });
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
                // update  eth balance
                getEthBalance(this.walletAddress).then((response) => {
                  if (response.status) {
                    // console.log(element.token + " balance:" + response.balance.toNumber());
                    this.object.forEach(element => {
                      if (element.token == "ETH") {
                        element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                      }
                    })
                  } else {
                    console.log("get ETH balance falied!");
                  }
                });

                // query limited order status
                axios.post('/api/v1/query_limit_orders', {
                  sender: this.walletAddress
                })
                  .then(response => {
                    console.log(response);
                    if (response.data.code == 1000) {
                      // update order status
                      if (response.data.data != null && response.data.data.length > 0) {
                        response.data.data.forEach(elementOut => {
                          // console.log("order details: ", elementOut);

                          let tokenInSymbol = null;
                          let tokenOutSymbol = null;
                          this.contractAddrMap.forEach(function (value, key) {
                            if (value == elementOut.TokenIn) {
                              tokenInSymbol = key;
                            }
                            if (value == elementOut.TokenOut) {
                              tokenOutSymbol = key;
                            }
                          });
                          // console.log("tokenInSymbol: ", tokenInSymbol);
                          // console.log("tokenOutSymbol: ", tokenOutSymbol);
                          let limitedOrderTmpObj = { orderNo: elementOut.OrderNo, orderContent: { tokenIn: tokenInSymbol, tokenOut: tokenOutSymbol, tokenInAmount: elementOut.TokenInAmount, tokenOutAmount: elementOut.TokenOutAmount, status: elementOut.Status, txHash: elementOut.TxHash } };
                          if (elementOut.Status != "cancel") {
                            this.orderData.push(limitedOrderTmpObj);
                          }

                          // this.orderData.forEach(elementIn => {
                          //   if (elementOut.OrderNo == elementIn.orderNo && elementOut.Status == "complete") {
                          //     elementIn.status = elementOut.Status;
                          //     elementIn.txHash = elementOut.TxHash;
                          //   }
                          // });
                        });
                      }
                    } else {
                      console.log("error code: ", response.data);
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
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
    calculateRateE() {
      let pooladdr = "";
      if (this.rateMap.has(this.subKeySrc + this.subKeyDes)) {
        pooladdr = this.rateMap.get(this.subKeySrc + this.subKeyDes);
      } else {
        console.log("Invalid pool address!");
        return;
      };
      console.log("pool addr:", pooladdr);
      axios.get('https://api.geckoterminal.com/api/v2/networks/sepolia-testnet/pools/' + pooladdr)
        .then(res => {
          if (res.data != null) {
            // alert("fmbb");
            console.log(res.data.data.attributes);
            console.log("ETH to UNI rate: ", res.data.data.attributes.base_token_price_quote_token);
            console.log("UNI to ETH rate: ", res.data.data.attributes.quote_token_price_base_token);
            var rate = res.data.data.attributes.base_token_price_quote_token;
            this.erc20Amount = String(this.ethAmount * Number(rate.substring(0, 8))).substring(0, 8);
            this.$refs.exchangeRate.innerHTML = "rate: 1 " + this.subKeySrc + " = " + rate.substring(0, 8) + " " + this.subKeyDes;

          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    calculateRateU() {
      let pooladdr = "";
      if (this.rateMap.has(this.subKeySrc + this.subKeyDes)) {
        pooladdr = this.rateMap.get(this.subKeySrc + this.subKeyDes);
      } else {
        console.log("Invalid pool address!");
        return;
      };
      axios.get('https://api.geckoterminal.com/api/v2/networks/sepolia-testnet/pools/' + pooladdr)
        .then((res) => {
          if (res.data != null) {
            console.log(res.data.data.attributes);
            console.log("ETH to UNI rate: ", res.data.data.attributes.base_token_price_quote_token);
            console.log("UNI to ETH rate: ", res.data.data.attributes.quote_token_price_base_token);
            var rate = res.data.data.attributes.quote_token_price_base_token;
            this.ethAmount = String(this.erc20Amount * Number(rate.substring(0, 8))).substring(0, 8);
            this.$refs.exchangeRate.innerHTML = "rate: 1 " + this.subKeyDes + " = " + rate.substring(0, 8) + " " + this.subKeySrc;
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getTxHistory() {
      axios.post("https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=" + this.user + "&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=C8EH3QCAH18KHGDVTQIM3HWWVBV9FW3AQ9").then((res) => {
        if (res != null) {
          console.log("Tx history:", res.data.result);
          res.data.result.forEach(element => {
            let tmpObj = {
              blockHash: element.blockHash,
              blockNumber: element.blockNumber,
              timeStamp: element.timeStamp
            };
            this.dataHistory.push(tmpObj);
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