<template>
    <particles-bg type="cobweb" :bg="true" />
    <div class="header"><img src="../assets/robot.svg" style="height: 100px;width: 100px; padding-right: 10px;">
        Sparky
        <vue-metamask ref="metamask" @onComplete="onComplete"></vue-metamask>
        <span>
            <label>
                <a-button type="primary" danger style="position: absolute; right: 10px; top: 10px;" @click="connect">
                    <span v-if="this.user == null">Connect Wallet</span>
                    <span v-else>{{ this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4) }}</span>
                </a-button>
            </label>
            <label>
                <buttom @click="changeMode()" style="cursor:pointer">
                    <img src="../assets/transform.svg" style="position: absolute; right: 20px; top: 70px; height: 25px;width: 20px;" >
                    <!-- <label style="position: absolute; right: 20px; top: 65px; font-size: 16px;">switch mode</label> -->
                </buttom>

            </label>
        </span>
    </div>
    <div class="body">
        <div class="leftbar">
            <div style="position:absolute; top: 3%;left: 5%;">
                <label style="font-weight: bolder;">Smart contract wallet</label>
                <br/>
                <label>
                    <a-select :size="size" :default-value=walletObj[0] style="position: absolute; width: 500px; left: 0%;" @select="changeWallet">
                    <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                        v-for="item in walletObj" :key="item.value">{{ item.label }}</a-select-option>
                    </a-select>
                    <!-- <buttom @click="copyWalletAdd('fmbb')" style="cursor:pointer,"><img src="../assets/copy.svg" style="position: absolute; height: 25px;width: 25px;" ></buttom> -->
                </label>
                <label>
                    <buttom @click="addWallet()" style="cursor:pointer"><img src="../assets/add.svg" style="position: absolute; margin-left: 440px; top: 22px; height: 30px;width: 30px;" ></buttom>
                    <buttom @click="copyWalletAdd()" style="cursor:pointer"><img src="../assets/copy.svg" style="position: absolute; margin-left: 480px; top: 22px; height: 30px;width: 30px;" ></buttom>
                    <buttom @click="browser()" style="cursor:pointer"><img src="../assets/web.svg" style="position: absolute; margin-left: 520px; top: 22px; height: 28px;width: 28px;" ></buttom>
                </label>
                <label>
                    <buttom @click="transfer()" style="cursor:pointer">
                        <img src="../assets/up-arrow.svg" style="position: absolute; left:205px; top: 70px; height: 35px;width: 35px;" >
                        <label style="position: absolute; left:190px;top: 105px; height: 25px;width: 20px;">Transfer</label>
                    </buttom>
                    <buttom @click="receive()" style="cursor:pointer">
                        <img src="../assets/down-arrow.svg" style="position: absolute; left:370px; top: 70px; height: 35px;width: 35px;" >
                        <label style="position: absolute; left:360px; top: 105px; height: 25px;width: 20px;">Receive</label>
                    </buttom>
                </label>
            </div>
            <!-- <div style="position:absolute; top: 19%; width: 95%; height:1px;background-color: #772b2b;"></div> -->
            <div style="position:absolute; top: 20%; left: 5%;border-top-style: solid; border-top-color: #bd7eab;">
                <button style="cursor:pointer;" :class="index == number ? 'btn1' : 'btn'" @click="menuNavigation(index)"
                    v-for="(item, index) in dataList" :key="index">{{ item.option }}
                </button>
                <img src="../assets/setting-fill.svg"
                    style="width: 40px; height: 40px; cursor:pointer; position: absolute;right: 10%;top: 4%;right: 10%;"
                    @click="showSetting()" />
                <div id="contentAsset" v-show="number == 0">
                    <span ref="tokenList">
                        <span v-for="value in tokenObj">
                            <a-button type="text" style="text-align: left; width: 100%; height: 100px; border-radius: 15px;"
                            @click="showOperateDrawer(value)">
                            <span>{{ value.token }}</span><span>:&nbsp</span><span>{{ value.balance }}</span>
                            </a-button>
                        </span>
                    </span>
                    <!-- @click="openNotifaction('success')" -->
                    <a-button type="primary" shape="circle" @click="showAddErc20Drawer()">+</a-button>
                </div>
                <div id="contentOperation" v-show="number == 1">
                    <span>
                        <a-list size="large" bordered :data-source="orderData"
                            style="top: 5%; width: 90%; margin-left: 5%;text-align: left; background: #feecf9;">
                            <template #renderItem="{ item }">
                            <a-list-item>
                                <span style="font-weight: 700;">order number:&nbsp</span>{{ item.orderNo }}
                                <br />
                                <span style="font-weight: 700;">order details:&nbsp</span>
                                <br />
                                <span>token in:&nbsp</span>{{ item.orderContent.tokenIn }}<span>&nbsp
                                amount:&nbsp</span>{{ item.orderContent.tokenInAmount }}
                                <br />
                                <span>token out:&nbsp</span>{{ item.orderContent.tokenOut }}<span>&nbsp
                                amount:&nbsp</span>{{ item.orderContent.tokenOutAmount }}
                                <br />
                                <span v-show="item.orderContent.status == 'pending'" style="font-weight: 700;">status: </span>
                                <span v-show="item.orderContent.status == 'pending'"  style="color:red; font-weight: 700;">{{ item.orderContent.status }}</span>
                                <!-- <a-button  type="primary" style="height: 40px;width: 100px; margin-left: 30%;">Edit</a-button> -->
                                <a-button v-show="item.orderContent.status == 'pending'" danger type="primary" shape="round"
                                @click="cancelLimitedOrder(item.orderNo)" style="height: 30px;width: 80px; margin-left: 278px;">
                                Cancel
                                </a-button>

                                <span v-show="item.orderContent.status == 'success'" style="font-weight: 700;">status: </span>
                                <span v-show="item.orderContent.status == 'success'"  style="color:green; font-weight: 700;">{{ item.orderContent.status }}</span>
                                <br />
                                <span v-show="item.orderContent.status == 'success'" style="font-weight: 700;">tx hash: </span>
                                <span v-show="item.orderContent.status == 'success'" style="font-weight: 700;"><a :href="'https://sepolia.etherscan.io/tx/' + item.orderContent.txHash" target="_blank">{{ item.orderContent.txHash }}</a></span>
                                <!-- <a-button  type="primary" style="height: 40px;width: 100px; margin-left: 30%;">Edit</a-button> -->
                                <!-- <a-button v-show="item.orderContent.status == 'complete'" danger type="disabled" shape="round"
                            style="height: 30px;width: 80px; margin-left: 270px;">
                            Cancel
                            </a-button> -->
                            </a-list-item>
                            </template>
                        </a-list>
                    </span>
                </div>
            </div>
            <!--transfer token list modal windows ok-text="OK" cancel-text="CX" @ok="hideTransfer()"-->
            <a-modal v-model:open="openTransfer" title="Please select a token" footer="">
                <span ref="tokenList">
                        <span v-for="value in tokenObj">
                            <a-button type="text" style="text-align: left; width: 100%; height: 100px; border-radius: 15px;"
                            @click="showOperateTransfer(value)">
                            <span>{{ value.token }}</span><span>:&nbsp</span><span>{{ value.balance }}</span>
                            </a-button>
                        </span>
                    </span>
            </a-modal>
            <!--receive token list modal wondows-->
            <a-modal v-model:open="openReceive" title="Please select a token" footer="">
                <span ref="tokenList">
                        <span v-for="value in tokenObj">
                            <a-button type="text" style="text-align: left; width: 100%; height: 100px; border-radius: 15px;"
                            @click="showQRCode(value)">
                            <span>{{ value.token }}</span><span>:&nbsp</span><span>{{ value.balance }}</span>
                            </a-button>
                        </span>
                    </span>
            </a-modal>
            <!--QR code modal windows-->
            <a-modal v-model:open="openQR" title="" footer="" :key=Math.random() style="width:250px;">
                <span>address: 0xab63c766c4ea5df59d61e36b28cdc6c1c6f197a6</span>
                <buttom @click="copyWalletAdd()" style="cursor:pointer"><img src="../assets/copy.svg" style="margin-left:10px; height: 20px;width: 20px;" ></buttom>
                <img :src="qrImgSrc" style="width:200px; height: 200px; border-radius: 20px;">
            </a-modal>
            <!--setting modal windows -->
            <a-modal v-model:open="openSetting" title="Setting" :key=Math.random() ok-text="OK" cancel-text="CX" @ok="hideSetting()">
              <p style="font-size: medium;">Maximum slip point<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="slipPoint" placeholder="0" suffix="%" style="height: 60px;" /></p>
              <p style="font-size: medium;">Trade deadline<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="deadLine" placeholder="0" suffix="mins" style="height: 60px;" /></p>
              <p style="font-size: medium;">Private Transaction &nbsp<a-switch v-model:checked="PriTxChecked" /></p>
            </a-modal>
            <!--deposit eth modal windows -->
            <a-modal v-model:open="depositEthOpen" :key=Math.random() title="Transfer" ok-text="OK" cancel-text="CX" @ok="hideEthDeposit()"
              @cancel="cancelEthDeposit()">
              <p style="font-size: medium;">Receiver Address<a-input oninput="value=value.replace(/[^\w]/g,'')"
                  v-model:value="depositEthAdd" placeholder="0xabc..." suffix="" style="height: 60px;" /></p>
              <p style="font-size: medium;">ETH<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="depositEth" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--withdraw eth modal windows -->
            <a-modal v-model:open="withdrawEthOpen" :key=Math.random() title="Receive" ok-text="OK" cancel-text="CX" @ok="hideEthWithdraw()"
              @cancel="cancelEthWithdraw()">
              <p style="font-size: medium;">ETH<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="withdrawEth" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--approve erc20 modal windows -->
            <a-modal v-model:open="approveErc20Open" :key=Math.random() title="Approve" ok-text="OK" cancel-text="CX"
              @ok="hideErc20Approve()" @cancel="cancelErc20Approve()">
              <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="approveErc20" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--deposit erc20 modal windows -->
            <a-modal v-model:open="depositErc20Open" :key=Math.random() title="Transfer" ok-text="OK" cancel-text="CX"
              @ok="hideErc20Deposit()" @cancel="cancelErc20Deposit()">
              <p style="font-size: medium;">Receiver Address<a-input oninput="value=value.replace(/[^\w]/g,'')"
                  v-model:value="depositErc20Add" placeholder="0xabc..." suffix="" style="height: 60px;" /></p>
              <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="depositErc20" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--withdraw erc20 modal windows -->
            <a-modal v-model:open="withdrawErc20Open" :key=Math.random() title="Receive" ok-text="OK" cancel-text="CX"
              @ok="hideErc20Withdraw()" @cancel="cancelErc20Withdraw()">
              <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                  v-model:value="withdrawErc20" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!-- drawer list -->
            <!--drawer of ETH operating-->
            <a-drawer v-model:open="operateEthOpen" class="custom-class" root-class-name="root-class-name"
                :root-style="{ color: 'blue' }" style="color: rgb(24, 18, 18)," title="ETH" placement="left"
                @after-open-change="afterOpenChange" 
                :body-style="{background: ''}"
                :header-style="{background: ''}">
                <a-button type="primary" :loading="iconLoadingDepositEth" @click="showEthDeposit()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                    <PoweroffOutlined />
                </template>
                Transfer
                </a-button>
                <a-button type="primary" :loading="iconLoadingWithdrawEth" @click="showEthWithdraw()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                    <PoweroffOutlined />
                </template>
                Receive
                </a-button>
            </a-drawer>
            <!--drawer of ERC20 operating-->
            <a-drawer v-model:open="operateErc20Open" class="custom-class" root-class-name="root-class-name"
              :root-style="{ color: 'blue' }" style="color: rgb(24, 18, 18)" :title="tokenName" placement="left"
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
                Transfer
              </a-button>
              <a-button type="primary" :loading="iconLoadingWithdrawErc20" @click="showErc20Withdraw()"
                style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                <template #icon>
                  <PoweroffOutlined />
                </template>
                Receive
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
        <div class="rightbar" v-if="this.mode == 'automatic'">
            <div class="list" id="list" ref="list">
                <ul style="padding: 0; margin: 0;">
                    <li style="list-style: none;" v-for="(item, index) in msglist" :key="index">
                        <RightItem :id="item.id" :type="item.type" :content="item.content" v-if="item.me"></RightItem>
                        <LeftItem :id="item.id" :type="item.type" :content="item.content" v-else></LeftItem>
                        <div v-scroll style="height: 0"></div>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <!-- <div class="line"></div> -->
                <span class="input-send">
                    <label><a-input v-model:value="text" placeholder="Please type here..." class="input"
                            @keyup.enter="send" /></label>
                    <label><a-button type="primary" class="send" @click="send">Send</a-button></label>
                </span>
            </div>
        </div>
        <div class="rightbar" v-if="this.mode == 'manual'">
            <MainPage></MainPage>
        </div>
    </div>
    <div>
        <div class="feet">
            <img src="../assets/robot.svg" style="height: 100%;width: 100%;">
        </div>
    </div>
</template>
<style scoped lang="less">
.btn {
    width: 150px;
    height: 40px;
    border: 0;
    border-radius: 5px;
    color: black;
    margin: 20px 3px 0px;
    background-color: #dbc8fd;
  }

  /*选中时*/
  .btn1 {
    width: 150px;
    height: 40px;
    border: 0;
    border-radius: 5px;
    color: white;
    margin: 20px 3px 0px;
    background-color: #8c55ec;
  }

#contentAsset,
#contentOperation {
    background: linear-gradient(#ffeef9, #91bee5);
    ;
    height: 500px;
    font-size: 16px;
    line-height: 100px;
    margin-top: 0px;
    border-radius: 15px;
    width: 650px;
  }
/* head */
.header {
    position: absolute;
    line-height: 50px;
    top: 0px; //0px;
    left: 0px;
    right: 0px;
    color: rgb(134, 50, 159);
    font-size: 60px;
    font-weight: bolder;
    // background-color: #2d3a4b;
}

.body {
    position: absolute;
    width: 100%;
    top: 11%;
    height: 84%;
    // bottom: 60px;
    overflow-y: auto;
}

.leftbar {
    position: absolute;
    width: 42%;
    top: 0%; //60px;
    /* 距离上面50像素 */
    left: 3%;
    height: 100%;
    overflow-y: auto;
    background: linear-gradient(#cddfca, #f3d789);
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-right-style: solid;
    // border-style: solid;
}
// .li {
//         list-style: none;

//     }
.rightbar {
    position: absolute;
    width: 52%;
    top: 0%; //60px;
    /* 距离上面50像素 */
    right: 3%;
    height: 100%;
    overflow-y: auto;
    // border-style: solid;
    background: linear-gradient(#cddfca, #f3d789);//linear-gradient(#91bee5, #ffeef9);
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    .list {
        width: 100%;
        height: 94%;
        // margin-bottom: 45px;
        overflow-y: scroll;
    }

    .bottom {
        width: 100%;
        position: absolute;
        // bottom: 0;

        // margin-top: 65%;

        .line {
            width: 100%;
            height: 1px;
            background-color: #ddd;
        }

        .input-send {
            // display: flex;
            // justify-content: space-between;
            // background-color: #fff;

            .input {
                // padding-right: 10px;
                width: 85%;
                // left: 2%;
                height: 40px;
            }

            .send {
                width: 10%;
                height: 40px;
                background-color: #cd7e9b;
                // right: 2%;
                // margin-top: 7px;
                // margin-right: 10px;
            }
        }

    }


}

.feet {
    position: absolute;
    width: 100%;
    top: 95%;
    height: 5%;
    // background-color: #2d3a4b;
}
</style>

<script>
import { Modal, notification } from 'ant-design-vue';
import { ParticlesBg } from "particles-bg-vue";
import { ref } from "vue";
import useClipboard from "vue-clipboard3";
import Chat from "./chatBot/Chat.vue";
import LeftItem from "./chatBot/LeftItem.vue";
import RightItem from "./chatBot/RightItem.vue";
import MainPage from "./MainPage.vue";
import EthereumQRPlugin from 'ethereum-qr-code';
import VueMetamask from 'vue-metamask';
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
  GetEstimatedGasFee,
} from "../api/contracts";

const { toClipboard } = useClipboard();
const axios = require('axios');
export default {
    name: "BaseLayout",
    components: { 
        VueMetamask,
        Chat, 
        ParticlesBg,
        LeftItem, 
        RightItem, 
        MainPage 
    },
    data: () => {
        return {
            // setting params
            slipPoint: 100,
            // smart contract account params
            walletAddress: null,
            walletSalt: 0,//default 0
            user: null,
            openSetting: ref(false),
            depositErc20Open: ref(false),
            depositEthOpen: ref(false),
            withdrawErc20Open: ref(false),
            withdrawEthOpen: ref(false),
            approveErc20Open: ref(false),
            operateEthOpen: ref(false),
            operateErc20Open: ref(false),
            addErc20Open: ref(false),
            showDeleteFlage: ref(false),
            openTransfer: ref(false),
            openReceive: ref(false),
            openQR: ref(false),
            qrImgSrc: " data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjkzMjg0MjA0Njk0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTcwNS45MiA5MTUuODRIMzIwYy0yOC4xNiAwLTUxLjItMjMuMDQtNTEuMi01MS4yVjYzMC40YzAtMjguMTYgMjMuMDQtNTEuMiA1MS4yLTUxLjJoMzg1LjkyYzI4LjE2IDAgNTEuMiAyMy4wNCA1MS4yIDUxLjJ2MjM0Ljg4YzAgMjcuNTItMjMuMDQgNTAuNTYtNTEuMiA1MC41NnoiIGZpbGw9IiNFRUY2RkYiIHAtaWQ9IjE5NjAiPjwvcGF0aD48cGF0aCBkPSJNNzA1LjkyIDkyOC42NEgzMjBjLTM1LjIgMC02NC0yOC44LTY0LTY0VjYzMC40YzAtMzUuMiAyOC44LTY0IDY0LTY0aDM4NS45MmMzNS4yIDAgNjQgMjguOCA2NCA2NHYyMzQuODhjMCAzNS4yLTI4LjggNjMuMzYtNjQgNjMuMzZ6TTMyMCA1OTJjLTIxLjEyIDAtMzguNCAxNy4yOC0zOC40IDM4LjR2MjM0Ljg4YzAgMjEuMTIgMTcuMjggMzguNCAzOC40IDM4LjRoMzg1LjkyYzIxLjEyIDAgMzguNC0xNy4yOCAzOC40LTM4LjRWNjMwLjRjMC0yMS4xMi0xNy4yOC0zOC40LTM4LjQtMzguNEgzMjB6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTYxIj48L3BhdGg+PHBhdGggZD0iTTUxNS4yIDE2My4yQzQxOC41NiAxNjMuMiAzMzkuMiAyNDIuNTYgMzM5LjIgMzM4LjU2VjUxOC40aDM1MlYzMzguNTZjMC05Ni03OS4zNi0xNzUuMzYtMTc2LTE3NS4zNnoiIGZpbGw9IiNFOEU2RkYiIHAtaWQ9IjE5NjIiPjwvcGF0aD48cGF0aCBkPSJNNzA0IDUzMS4ySDMyNi40VjMzOC41NmMwLTEwMy42OCA4NC40OC0xODguMTYgMTg4LjgtMTg4LjE2UzcwNCAyMzQuODggNzA0IDMzOC41NlY1MzEuMnogbS0zNTItMjUuNmgzMjYuNFYzMzguNTZjMC04OS42LTcyLjk2LTE2Mi41Ni0xNjMuMi0xNjIuNTZTMzUyIDI0OC45NiAzNTIgMzM4LjU2VjUwNS42eiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk2MyI+PC9wYXRoPjxwYXRoIGQ9Ik00NTYuMzIgNTE4LjRoMTEydjYwLjhINDU2LjMyeiIgZmlsbD0iI0VFRjZGRiIgcC1pZD0iMTk2NCI+PC9wYXRoPjxwYXRoIGQ9Ik01ODEuNzYgNTkySDQ0My41MlY1MDUuNmgxMzcuNnY4Ni40eiBtLTExMi42NC0yNS42aDg2LjRWNTMxLjJINDY5LjEydjM1LjJ6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTY1Ij48L3BhdGg+PHBhdGggZD0iTTcxNC44OCA0MzEuMzZjLTEyLjggMC0yMy4wNC0xMC4yNC0yMy4wNC0yMy4wNHYtMzguNGMwLTEyLjggMTAuMjQtMjMuMDQgMjMuMDQtMjMuMDRzMjMuMDQgMTAuMjQgMjMuMDQgMjMuMDR2MzguNGMwIDEyLjgtMTAuMjQgMjMuMDQtMjMuMDQgMjMuMDR6IiBmaWxsPSIjRUVGNkZGIiBwLWlkPSIxOTY2Ij48L3BhdGg+PHBhdGggZD0iTTcxNC44OCA0NDQuMTZjLTE5Ljg0IDAtMzUuODQtMTYtMzUuODQtMzUuODR2LTM4LjRjMC0xOS44NCAxNi0zNS44NCAzNS44NC0zNS44NHMzNS44NCAxNiAzNS44NCAzNS44NHYzOC40YzAgMTkuODQtMTYgMzUuODQtMzUuODQgMzUuODR6IG0wLTgzLjg0Yy01Ljc2IDAtMTAuMjQgNC40OC0xMC4yNCAxMC4yNHYzOC40YzAgNS43NiA0LjQ4IDEwLjI0IDEwLjI0IDEwLjI0czEwLjI0LTQuNDggMTAuMjQtMTAuMjR2LTM4LjRjMC01Ljc2LTQuNDgtMTAuMjQtMTAuMjQtMTAuMjR6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTY3Ij48L3BhdGg+PHBhdGggZD0iTTMxMi4zMiA0MjEuMTJjLTEyLjggMC0yMy4wNC0xMC4yNC0yMy4wNC0yMy4wNHYtMzguNGMwLTEyLjggMTAuMjQtMjMuMDQgMjMuMDQtMjMuMDRzMjMuMDQgMTAuMjQgMjMuMDQgMjMuMDR2MzguNGMwIDEyLjgtMTAuODggMjMuMDQtMjMuMDQgMjMuMDR6IiBmaWxsPSIjRUVGNkZGIiBwLWlkPSIxOTY4Ij48L3BhdGg+PHBhdGggZD0iTTMxMi4zMiA0MzMuOTJjLTE5Ljg0IDAtMzUuODQtMTYtMzUuODQtMzUuODR2LTM4LjRjMC0xOS44NCAxNi0zNS44NCAzNS44NC0zNS44NHMzNS44NCAxNiAzNS44NCAzNS44NHYzOC40YzAgMTkuODQtMTYuNjQgMzUuODQtMzUuODQgMzUuODR6IG0wLTgzLjg0Yy01Ljc2IDAtMTAuMjQgNC40OC0xMC4yNCAxMC4yNHYzOC40YzAgNS43NiA0LjQ4IDEwLjI0IDEwLjI0IDEwLjI0czEwLjI0LTQuNDggMTAuMjQtMTAuMjR2LTM4LjRjMC01Ljc2LTUuMTItMTAuMjQtMTAuMjQtMTAuMjR6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTY5Ij48L3BhdGg+PHBhdGggZD0iTTc5NS41MiA3NjMuNTJoLTI1LjZjLTcuMDQgMC0xMi44LTUuNzYtMTIuOC0xMi44di00Ni4wOGMwLTE0LjA4LTIuNTYtMjUuNiAxMS41Mi0yNS42aDI2Ljg4YzE0LjA4IDAgMjUuNiAxMS41MiAyNS42IDI1LjZ2MzMuMjhjMCAxNC4wOC0xMS41MiAyNS42LTI1LjYgMjUuNnoiIGZpbGw9IiNFRUY2RkYiIHAtaWQ9IjE5NzAiPjwvcGF0aD48cGF0aCBkPSJNNzk1LjUyIDc3Ni4zMmgtMjUuNmMtMTQuMDggMC0yNS42LTExLjUyLTI1LjYtMjUuNnYtNDYuMDgtNS4xMmMwLTguOTYtMC42NC0xOS4yIDYuNC0yNi4yNCA0LjQ4LTQuNDggMTAuMjQtNi40IDE3LjkyLTYuNGgyNi44OGMyMS4xMiAwIDM4LjQgMTcuMjggMzguNCAzOC40djMzLjI4YzAgMjAuNDgtMTcuMjggMzcuNzYtMzguNCAzNy43NnogbS0yNi4yNC04NC40OHY1OC44OGgyNS42YzcuMDQgMCAxMi44LTUuNzYgMTIuOC0xMi44di0zMy4yOGMwLTcuMDQtNS43Ni0xMi44LTEyLjgtMTIuOGgtMjUuNnoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5NzEiPjwvcGF0aD48cGF0aCBkPSJNODE2LjY0IDczNC4wOGwtMC42NC0yNS42djEyLjgtMTIuOGM1LjEyIDAgNDgtMy4yIDQ4LTU4LjI0VjQ1NC40aDI1LjZ2MTk2LjQ4YzAgODEuMjgtNzIuMzIgODMuMi03Mi45NiA4My4yeiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk3MiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjguNDggNzYzLjUyaDI1LjZjNy4wNCAwIDEyLjgtNS43NiAxMi44LTEyLjh2LTU4Ljg4YzAtNy4wNC01Ljc2LTEyLjgtMTIuOC0xMi44aC0yNS42Yy0xNC4wOCAwLTI1LjYgMTEuNTItMjUuNiAyNS42djMzLjI4YzAgMTQuMDggMTEuNTIgMjUuNiAyNS42IDI1LjZ6IiBmaWxsPSIjRUVGNkZGIiBwLWlkPSIxOTczIj48L3BhdGg+PHBhdGggZD0iTTI1NC4wOCA3NzYuMzJoLTI1LjZjLTIxLjEyIDAtMzguNC0xNy4yOC0zOC40LTM4LjR2LTMzLjI4YzAtMjEuMTIgMTcuMjgtMzguNCAzOC40LTM4LjRoMjUuNmMxNC4wOCAwIDI1LjYgMTEuNTIgMjUuNiAyNS42djU4Ljg4YzAgMTQuMDgtMTEuNTIgMjUuNi0yNS42IDI1LjZ6IG0tMjUuNi04NC40OGMtNy4wNCAwLTEyLjggNS43Ni0xMi44IDEyLjh2MzMuMjhjMCA3LjA0IDUuNzYgMTIuOCAxMi44IDEyLjhoMjUuNnYtNTguODhoLTI1LjZ6TTUxOS4wNCAxNDAuMTZjLTIzLjY4IDAtNDMuNTItMTkuMi00My41Mi00My41MnMxOS4yLTQzLjUyIDQzLjUyLTQzLjUyIDQzLjUyIDE5LjIgNDMuNTIgNDMuNTItMTkuODQgNDMuNTItNDMuNTIgNDMuNTJ6IG0wLTYxLjQ0Yy05LjYgMC0xNy45MiA4LjMyLTE3LjkyIDE3LjkyczguMzIgMTcuOTIgMTcuOTIgMTcuOTIgMTcuOTItOC4zMiAxNy45Mi0xNy45Mi04LjMyLTE3LjkyLTE3LjkyLTE3LjkyeiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk3NCI+PC9wYXRoPjxwYXRoIGQ9Ik01MDUuNiAxMzQuNGgyNS42djMyaC0yNS42eiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk3NSI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIuNjQgMzA1LjkybS02OS4xMiAwYTY5LjEyIDY5LjEyIDAgMSAwIDEzOC4yNCAwIDY5LjEyIDY5LjEyIDAgMSAwLTEzOC4yNCAwWiIgZmlsbD0iI0ZGRjI3RCIgcC1pZD0iMTk3NiI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIuNjQgMzg3Ljg0Yy00NC44IDAtODEuOTItMzYuNDgtODEuOTItODEuOTJTNDY3LjIgMjI0IDUxMi42NCAyMjRzODEuOTIgMzYuNDggODEuOTIgODEuOTItMzcuMTIgODEuOTItODEuOTIgODEuOTJ6IG0wLTEzOC4yNGMtMzAuNzIgMC01Ni4zMiAyNC45Ni01Ni4zMiA1Ni4zMnMyNC45NiA1Ni4zMiA1Ni4zMiA1Ni4zMiA1Ni4zMi0yNC45NiA1Ni4zMi01Ni4zMi0yNS42LTU2LjMyLTU2LjMyLTU2LjMyeiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk3NyI+PC9wYXRoPjxwYXRoIGQ9Ik02MDQuMTYgNDMzLjI4bS0xMC4yNCAwYTEwLjI0IDEwLjI0IDAgMSAwIDIwLjQ4IDAgMTAuMjQgMTAuMjQgMCAxIDAtMjAuNDggMFoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5NzgiPjwvcGF0aD48cGF0aCBkPSJNNDIyLjQgNjU5LjJIMzM5LjJjLTcuMDQgMC0xMi44LTUuNzYtMTIuOC0xMi44czUuNzYtMTIuOCAxMi44LTEyLjhoODMuMmM3LjA0IDAgMTIuOCA1Ljc2IDEyLjggMTIuOHMtNS43NiAxMi44LTEyLjggMTIuOHoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5NzkiPjwvcGF0aD48cGF0aCBkPSJNNTEyLjY0IDMwNS45Mm0tMTYgMGExNiAxNiAwIDEgMCAzMiAwIDE2IDE2IDAgMSAwLTMyIDBaIiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTgwIj48L3BhdGg+PHBhdGggZD0iTTg3Ni44IDQ3My42Yy0yNy41MiAwLTUxLjItMjEuNzYtNTEuMi00Ni43MiAwLTcuMDQgNS43Ni0xMi44IDEyLjgtMTIuOHMxMi44IDUuNzYgMTIuOCAxMi44YzAgMTAuODggMTIuMTYgMjEuMTIgMjUuNiAyMS4xMnMyNS42LTEwLjI0IDI1LjYtMjEuMTJjMC03LjA0IDUuNzYtMTIuOCAxMi44LTEyLjhzMTIuOCA1Ljc2IDEyLjggMTIuOGMwIDI0Ljk2LTIzLjY4IDQ2LjcyLTUxLjIgNDYuNzJ6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTgxIj48L3BhdGg+PHBhdGggZD0iTTE5NC41NiA3MzQuMDhjLTAuNjQgMC03Mi45Ni0yLjU2LTcyLjk2LTgzLjg0VjQ1NC40aDI1LjZ2MTk2LjQ4YzAgNTUuMDQgNDIuODggNTcuNiA0OCA1OC4yNGwtMC42NCAyNC45NnoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5ODIiPjwvcGF0aD48cGF0aCBkPSJNMTMxLjIgNDczLjZjLTI3LjUyIDAtNTEuMi0yMS43Ni01MS4yLTQ2LjcyIDAtNy4wNCA1Ljc2LTEyLjggMTIuOC0xMi44czEyLjggNS43NiAxMi44IDEyLjhjMCAxMC44OCAxMi4xNiAyMS4xMiAyNS42IDIxLjEyczI1LjYtMTAuMjQgMjUuNi0yMS4xMmMwLTcuMDQgNS43Ni0xMi44IDEyLjgtMTIuOHMxMi44IDUuNzYgMTIuOCAxMi44YzAgMjQuOTYtMjMuMDQgNDYuNzItNTEuMiA0Ni43MnoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5ODMiPjwvcGF0aD48cGF0aCBkPSJNNTgzLjA0IDgzNy4xMm0tMjMuNjggMGEyMy42OCAyMy42OCAwIDEgMCA0Ny4zNiAwIDIzLjY4IDIzLjY4IDAgMSAwLTQ3LjM2IDBaIiBmaWxsPSIjRkZGMjdEIiBwLWlkPSIxOTg0Ij48L3BhdGg+PHBhdGggZD0iTTU4My4wNCA4NzMuNmMtMTkuODQgMC0zNi40OC0xNi0zNi40OC0zNi40OHMxNi0zNi40OCAzNi40OC0zNi40OCAzNi40OCAxNiAzNi40OCAzNi40OC0xNi42NCAzNi40OC0zNi40OCAzNi40OHogbTAtNDYuNzJjLTUuNzYgMC0xMC44OCA0LjQ4LTEwLjg4IDEwLjg4czQuNDggMTAuODggMTAuODggMTAuODggMTAuODgtNC40OCAxMC44OC0xMC44OC01LjEyLTEwLjg4LTEwLjg4LTEwLjg4eiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk4NSI+PC9wYXRoPjxwYXRoIGQ9Ik02NzIuNjQgODM3LjEybS0yMy42OCAwYTIzLjY4IDIzLjY4IDAgMSAwIDQ3LjM2IDAgMjMuNjggMjMuNjggMCAxIDAtNDcuMzYgMFoiIGZpbGw9IiNGRjk3OTciIHAtaWQ9IjE5ODYiPjwvcGF0aD48cGF0aCBkPSJNNjcyLjY0IDg3My42Yy0xOS44NCAwLTM2LjQ4LTE2LTM2LjQ4LTM2LjQ4czE2LTM2LjQ4IDM2LjQ4LTM2LjQ4IDM2LjQ4IDE2IDM2LjQ4IDM2LjQ4LTE2LjY0IDM2LjQ4LTM2LjQ4IDM2LjQ4eiBtMC00Ni43MmMtNS43NiAwLTEwLjg4IDQuNDgtMTAuODggMTAuODhzNC40OCAxMC44OCAxMC44OCAxMC44OCAxMC44OC00LjQ4IDEwLjg4LTEwLjg4LTUuMTItMTAuODgtMTAuODgtMTAuODh6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTg3Ij48L3BhdGg+PC9zdmc+",
            // loading icon params
            iconLoadingDepositEth: ref(false),
            iconLoadingWithdrawEth: ref(false),
            iconLoadingApproveErc20: ref(false),
            iconLoadingDepositErc20: ref(false),
            iconLoadingWithdrawErc20: ref(false),
            iconLoading: ref(false),
            iconLoadingLimited: ref(false),
            iconLoadingSend: ref(false),
            // chat bot params
            text: '',
            mode: 'automatic',// or automatic
            // layout params
            number: 0,
            // everionment params
            chainId: "11155111",
            // operation params
            ethAmount: null,
            erc20Amount: null,
            depositEth: null,
            depositErc20: null,
            depositErc20Add: null,
            depositEthAdd: null,
            withdrawEth: null,
            withdrawErc20: null,
            addErc20Address: null,
            addErc20Symbol: null,
            tokenName: "ERC20",
            ethLimitedAmount: null,
            erc20LimitedAmount: null,
            // data sets params
            opHistory: [],
            dataList: [
                { option: 'Asset' },
                { option: 'Operation' },
            ],
            msglist: [{
                id: 1,
                type: 1,
                content: 'Welcome！',
                me: false
            }],
            tokenObj : [
            { token: "ETH", address: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80A", balance: 0 },
            { token: "WETH", address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", balance: 0 },
            { token: "UNI", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", balance: 0 },
            // { token: "USDC", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", balance: 0 },
            ],
            walletObj:[
            { label: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80A", value: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80A", disabled: false, salt: 0},
            { label: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80a", value: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80a", disabled: false, salt: 1}
            ],
            orderData: [
                { orderNo: "1",orderContent: { tokenIn: "eth", tokenOut: "uni", tokenInAmount: "0.0001", tokenOutAmount: "0.0003", status: "pending"}},
                { orderNo: "2",orderContent: { tokenIn: "eth", tokenOut: "uni", tokenInAmount: "0.0001", tokenOutAmount: "0.0003", status: "pending"}},
            ],
        }
    },
    methods: {
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
        browser() {
            window.open('https://sepolia.etherscan.io/address/'+this.walletAddress);
        },
        connect() {
            console.log("connect");
            if (this.user == null) {
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
                                        if (this.tokenObj.length == 0) {
                                            console.log("asset Address: ", element.Account);
                                            console.log("asset symbol: ", "ETH");
                                            let tmpObj = { token: "ETH", address: element.Account, balance: 0 };
                                            this.tokenObj.push(tmpObj);
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
            } else {
                return;
            }
        },
        onComplete(data) {
            console.log("on complete:", data);
            // log out
            if (data.metaMaskAddress == "") {
                this.user = null;
                this.openNotifaction("info", "Log out.");
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
                                        if (this.tokenObj.length == 0) {
                                            console.log("asset Address: ", element.Account);
                                            console.log("asset symbol: ", "ETH");
                                            let tmpObj = { token: "ETH", address: element.Account, balance: 0 };
                                            this.tokenObj.push(tmpObj);
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
                                                    this.tokenObj.push(tmpObj);

                                                })
                                            }
                                        }

                                        // update erc20 balance
                                        for (let index = 1; index < this.tokenObj.length; index++) {
                                            const element = this.tokenObj[index];
                                            getErc20Balance(this.walletAddress, element.address).then((response) => {
                                                if (response.status) {
                                                    // console.log(element.token + " balance:" + String(response.balance));
                                                    this.tokenObj[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
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
                                        this.tokenObj.forEach(element => {
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
        generateQR() {
            GetEstimatedGasFee().then(res=>{
                console.log("gas fee: ",res+"gwei");
            });
            const qr = new EthereumQRPlugin();
            const qrCode = qr.toDataUrl({
                to: '0xab63c766c4ea5df59d61e36b28cdc6c1c6f197a6',
                gas: 21000,
            });
            qrCode.then((code) => {
                console.log('Your QR id generated:', code) //> 'data:image/png;base64,iVBORw0KGgoA....'
                this.qrImgSrc = code.dataURL;
            });
            // const qrCode = qr.toCanvas({
            //     to: '0xab63c766c4ea5df59d61e36b28cdc6c1c6f197a6',
            //     gas: 21000,
            // }, {
            //     selector: '#qr-code',
            // });
            // qrCode.then((code) => {
            //     console.log('Your QR is generated!')
            //     console.log(code.value)
            // });
        },
        showQRCode(value) {
            this.hideReceive();
            console.log("erc20 address: ", value);
            this.generateQR();
            this.openQR = true;
        },
        transfer() {
            this.openTransfer = true;
        },
        receive() {
            this.openReceive = true;
        },
        showDeleteButton() {
            this.showDeleteFlage = this.showDeleteFlage == false ? true : false;
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
                    label: value,
                    value: value,
                    disabled: false,
                    salt: this.walletSalt
                });
                // default select first address
                if (this.walletSalt == 0) {
                    this.walletAddress = value;

                    // add new account address into asset list
                    if (this.tokenObj.length == 0) {
                        console.log("asset Address: ", this.walletAddress);
                        console.log("asset symbol: ", "ETH");
                        let tmpObj = { token: "ETH", address: this.walletAddress, balance: 0 };
                        this.tokenObj.push(tmpObj);
                    }
                }
                // add new account address into asset list
                // if (this.tokenObj = []) {
                //   console.log("asset Address: ", this.walletAddress);
                //   console.log("asset symbol: ", "ETH");
                //   let tmpObj = { token: "ETH", address: this.walletAddress, balance: 0 };
                //   this.tokenObj.push(tmpObj);
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
        },
        changeWallet(value) {
            this.walletAddress = value;
            this.openNotifaction("success", "wallet address changed! addr: " + this.walletAddress);
            this.tokenObj.forEach(element => {
                if (element.token == "ETH") {
                    element.address = this.walletAddress;
                }
            })
            console.log(this.tokenObj);
            return;
            // when user change wallet account, we need recall query_account_assets
            axios.post('/api/v1/query_account_assets', {
                sender: this.walletAddress
            })
                .then(response => {
                    console.log(response);
                    if (response.data.code == 1000) {
                        // remove erc20 tokens but keep ETH
                        this.tokenObj = [];
                        let tmpObj = { token: "ETH", address: this.walletAddress, balance: 0 };
                        this.tokenObj.push(tmpObj);
                        console.log("Successfully obtained user asset list.");
                        if (response.data.data != null && response.data.data.length > 0) {
                            response.data.data.forEach(element => {
                                console.log("asset Address: ", element.Address);
                                console.log("asset symbol: ", element.Token);
                                tmpObj = { token: element.Token, address: element.Address, balance: 0 };
                                this.tokenObj.push(tmpObj);

                            })
                        }
                    }

                    // update erc20 balance
                    for (let index = 1; index < this.tokenObj.length; index++) {
                        const element = this.tokenObj[index];
                        getErc20Balance(this.walletAddress, element.address).then((response) => {
                            if (response.status) {
                                // console.log(element.token + " balance:" + String(response.balance));
                                this.tokenObj[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
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
                    this.tokenObj.forEach(element => {
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
        showEthDeposit() {
            this.depositEthOpen = true;
        },
        hideEthDeposit() {
            if (this.depositEth > 0 && this.depositEthAdd != null) {
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
                        this.tokenObj.forEach(element => {
                            if (element.token == "ETH") {
                                element.balance = this.formateNumber(ethers.utils.formatEther(response.balance));
                            }
                        })
                    } else {
                        console.log("get ETH balance falied!");
                    }
                });
                // for (let index = 0; index < this.tokenObj.length; index++) {
                //   const element = this.tokenObj[index];
                //   getBalance(this.user, element.address).then((response) => {
                //     if (response.status) {
                //       console.log(element.token + " balance:" + response.balance.toNumber());
                //       this.tokenObj[index].balance = this.formateNumber(response.balance.toNumber() / 1000000000000000000);
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
            if (this.depositErc20 > 0 && this.depositErc20Add != null) {
                // we need get current erc20 token index in tokenObj
                this.iconLoadingDepositErc20 = true;
                let flag = null;
                for (let index = 0; index < this.tokenObj.length; index++) {
                    const element = this.tokenObj[index];
                    if (this.tokenName == element.token) {
                        flag = index;
                    }
                }
                if (flag != null) {
                    console.log("match success! index is:", flag);
                    console.log("token address: ", this.tokenObj[flag].address);
                    depositERC20(this.walletAddress, this.tokenObj[flag].address, this.depositErc20, this.hideErc20DepositCallback);
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
                for (let index = 1; index < this.tokenObj.length; index++) {
                    const element = this.tokenObj[index];
                    getErc20Balance(this.walletAddress, element.address).then((response) => {
                        if (response.status) {
                            // console.log(element.token + " balance:" + String(response.balance));
                            this.tokenObj[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
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
            this.depositErc20Add = null;
        },
        showEthWithdraw() {
            // this.withdrawEthOpen = true;
            this.generateQR();
            this.openQR = true;
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
                withdrawETH(this.user, this.walletAddress, walletSalt, this.tokenObj[0].address, this.withdrawEth, this.chainId, this.hideEthWithdrawCallback);
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
                        this.tokenObj.forEach(element => {
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
            // this.withdrawErc20Open = true;
            this.generateQR();
            this.openQR = true;
        },
        hideErc20Withdraw() {
            if (this.withdrawErc20 > 0) {
                // we need get current erc20 token index in tokenObj
                this.iconLoadingWithdrawErc20 = true;
                let flag = null;
                for (let index = 0; index < this.tokenObj.length; index++) {
                    const element = this.tokenObj[index];
                    if (this.tokenName == element.token) {
                        flag = index;
                    }
                }
                if (flag != null) {
                    console.log("match success! index is:", flag);
                    console.log("token address: ", this.tokenObj[flag].address);
                    let walletSalt = 0;
                    // update walletIndex
                    for (let index = 0; index < this.walletObj.length; index++) {
                        const element = this.walletObj[index];
                        if (element.address == this.walletAddress) {
                            walletSalt = element.salt;
                            console.log("wallet info: ", element);
                        }
                    }
                    withdrawERC20(this.user, this.walletAddress, walletSalt, this.tokenObj[flag].address, this.withdrawErc20, this.chainId, this.hideErc20WithdrawCallback);
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
                for (let index = 1; index < this.tokenObj.length; index++) {
                    const element = this.tokenObj[index];
                    getErc20Balance(this.walletAddress, element.address).then((response) => {
                        if (response.status) {
                            // console.log(element.token + " balance:" + String(response.balance));
                            this.tokenObj[index].balance = this.formateNumber(ethers.utils.formatEther(response.balance));
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
        showSetting() {
            this.openSetting = true;
        },
        hideTransfer() {
            this.openTransfer = false;
        },
        hideReceive() {
            this.openReceive = false;
        },
        hideSetting() {
            console.log("slipPoint:", this.slipPoint);
            console.log("deadLine:", this.deadLine);
            console.log("PriTxChecked:", this.PriTxChecked);
            this.openSetting = false;
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
        addCustomToken() {
            if (this.addErc20Address != undefined && this.addErc20Symbol != undefined) {
                console.log("addErc20Address: ", this.addErc20Address);
                console.log("addCustomToken: ", this.addErc20Symbol);
                let tmpObj = { token: this.addErc20Symbol, address: this.addErc20Address, balance: 0 };
                this.tokenObj.push(tmpObj);
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
        showOperateTransfer(value) {
            // close transfer modal windows
            this.hideTransfer();
            if (value.token == "ETH") {
                this.depositEthOpen = true;
            } else {
                this.depositErc20Open = true;
                this.tokenName = value.token;
            }
        },
        showOperateDrawer(value) {
            console.log("token name:", value.token);
            if (value.token == "ETH") {
                this.operateEthOpen = true;
            } else {
                console.log("get erc20 name:", value.token);
                this.operateErc20Open = true;
                this.tokenName = value.token;
            }
        },
        showAddErc20Drawer() {
            this.addErc20Open = true;
        },
        // handleChangeWallet(walletAddress) {
        //     console.log("wallet address: ", walletAddress);
        // },
        menuNavigation(index) {
            this.number = index;
        },
        send() {
            if (this.text) {
                this.msglist.push({
                    id: this.msglist[this.msglist.length - 1].id + 1,
                    type: 1,
                    content: this.text,
                    me: true
                })
                if (this.text === '图片') {
                    this.msglist.push({
                        id: this.msglist[this.msglist.length - 1].id + 1,
                        type: 1,
                        content: '/src/assets/usdc.svg',
                        me: false
                    })
                } else {
                    this.getResponse(this.text)
                }
                this.text = ''
            }
        },
        getResponse(text) {
            getChatResponse(text).then(res => {
                console.log(res)
                this.msglist.push({
                    id: this.msglist[this.msglist.length - 1].id + 1,
                    type: 1,
                    content: res.data.answer,
                    me: false
                })
            })
        },
        changeMode() {
            this.mode = this.mode == "automatic" ? "manual" : "automatic";
        },
        async copyWalletAdd () {
            console.log("current wallet address: ", this.walletAddress);
            try {
                await toClipboard(this.walletAddress);
                // alert("c");
                this.openNotifaction("success","Copy success.");
            } catch (e) {
                console.error(e);
            }
        }
    }
        
}

</script>