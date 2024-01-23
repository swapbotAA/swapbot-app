<template>
    <particles-bg type="cobweb" :bg="true" />
    <div class="header"><img src="../assets/logo.svg" style="height: 100px;width: 100px; padding-right: 10px;">
        Sparky
        <!-- <vue-metamask ref="metamask" @onComplete=""></vue-metamask> -->
        <span>
            <!-- <label>
                <a-button type="primary" danger style="position: absolute; right: 10px; top: 10px;" @click="connect">
                    <span v-if="this.user == null">Connect Wallet</span>
                    <span v-else>{{ this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4) }}</span>
                </a-button>
            </label> -->
            <label>
                <a-button v-if="this.user == null" :loading="iconLoadingLogin" type="primary" danger style="position: absolute; right: 10px; top: 10px;" @click="showLogin()">Login
                    <!-- <span v-if="this.user == null">Login</span>
                    <span v-else>{{ this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4) }}</span> -->
                </a-button>
                <a-button v-if="this.user != null" type="primary" danger style="position: absolute; right: 10px; top: 10px;" @click="showLogin()">
                    {{ this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4) }}
                    <!-- <span v-if="this.user == null">Login</span>
                    <span v-else>{{ this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4) }}</span> -->
                </a-button>
            </label>
            <img @click="changeMode()" src="../assets/transform.svg"
                style="cursor:pointer; position: absolute; right: 20px; top: 70px; height: 25px;width: 20px;">
            <!-- <a-button type="primary" shape="circle" danger style="position: absolute; right: 50px; top: 60px; background-color: yellow; color: black;" @click="addDeviceKey()">Dev</a-button> -->
            <!-- <a-button type="primary" shape="circle" danger style="position: absolute; right: 100px; top: 60px; background-color: green;" @click="backupKey()">MFA</a-button> -->
            <!-- <a-button type="primary" shape="circle" danger style="position: absolute; right: 150px; top: 60px;" @click="resetAcc()">Re</a-button> -->
        </span>
    </div>
    <div class="body">
        <div class="leftbar">
            <div style="position:absolute; top: 3%;left: 5%;">
                <label style="font-weight: bolder;">Smart contract wallet</label>
                <br />
                <label><!--:key={walletAddress}-->
                    <a-select :size="size" :default-value=walletObj[0] :key=walletObj[0]
                        style="position: absolute; width: 450px; left: 0%;" @select="changeWallet">
                        <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                            v-for="item in walletObj" :key="item.value">{{ item.label }}</a-select-option>
                    </a-select>
                    <!-- <button @click="copyWalletAdd('fmbb')" style="cursor:pointer,"><img src="../assets/copy.svg" style="position: absolute; height: 25px;width: 25px;" ></button> -->
                </label>
                <label>
                    <button @click="addWalletHint()" style="cursor:pointer"><img src="../assets/add.svg"
                            style="position: absolute; margin-left: 440px; top: 22px; height: 30px;width: 30px;"></button>
                    <button @click="copyWalletAdd()" style="cursor:pointer"><img src="../assets/copy.svg"
                            style="position: absolute; margin-left: 480px; top: 22px; height: 30px;width: 30px;"></button>
                    <button @click="browser()" style="cursor:pointer"><img src="../assets/web.svg"
                            style="position: absolute; margin-left: 520px; top: 22px; height: 28px;width: 28px;"></button>
                </label>
                <label>
                    <button @click="transfer()" style="cursor:pointer">
                        <img src="../assets/up-arrow.svg"
                            style="position: absolute; left:205px; top: 70px; height: 35px;width: 35px;">
                        <label style="position: absolute; left:190px;top: 105px; height: 25px;width: 20px;">Transfer</label>
                    </button>
                    <button @click="receive()" style="cursor:pointer">
                        <img src="../assets/down-arrow.svg"
                            style="position: absolute; left:370px; top: 70px; height: 35px;width: 35px;">
                        <label style="position: absolute; left:360px; top: 105px; height: 25px;width: 20px;">Receive</label>
                    </button>
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
                    <!-- @click="openNotification('success')" -->
                    <a-button type="primary" shape="circle" @click="showAddErc20Drawer()">+</a-button>
                </div>
                <div id="contentOperation" v-show="number == 1">
                    <span>
                        <a-list size="large" bordered :data-source="operationHistory"
                            style="top: 5%; margin-bottom:8%; width: 90%; margin-left: 5%;text-align: left; background: #feecf9;">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <!--status.code: 0 pending 1 finish success-->
                                    <span v-show="item.action == 'TRANSFER'" style="font-weight: 700;">{{ item.action }}&nbsp
                                        <span v-show="item.status.code == 'pending'">
                                        <img style="width: 25px; height:25px;" src = "../assets/X.svg">
                                        <span style="position: absolute;right: 20px; font-size: large; color: rgb(255 189 89);">Pending</span>
                                        </span>
                                        <span v-show="item.status.code == 'success' || item.status.code == 'failed'">
                                            <img style="width: 25px; height:25px; cursor:pointer" src="../assets/jumpto.svg"
                                                @click="viewTx(item.txHash)">
                                            <span
                                                style="position: absolute;right: 20px; font-size: large; color: green;">Finish</span>
                                        </span>
                                        <br />
                                        <span style="font-size: smaller; font-weight:500;">
                                            {{ item.details.amount }}&nbsp{{ item.details.tokenSymbol }}
                                            <span v-show="item.status.error != ''"
                                                style="position: absolute;right: 20px; font-size: small; ">reason:&nbsp{{
                                                    item.status.error }}</span>
                                        </span>
                                    </span>
                                    <span v-show="item.action == 'SWAP'" style="font-weight: 700;">{{ item.action }}&nbsp
                                        <span v-show="item.status.code == 'pending'">
                                        <img style="width: 25px; height:25px;" src = "../assets/X.svg">
                                        <span style="position: absolute;right: 20px; font-size: large; color: rgb(255 189 89);">Pending</span>
                                        </span>
                                        <span v-show="item.status.code == 'success' || item.status.code == 'failed'">
                                            <img style="width: 25px; height:25px; cursor:pointer" src="../assets/jumpto.svg"
                                                @click="viewTx(item.txHash)">
                                            <span
                                                style="position: absolute;right: 20px; font-size: large; color: green;">Finish</span>
                                        </span>
                                        <br />
                                        <span style="font-size: smaller; font-weight:500;">
                                            from&nbsp{{ item.details.amountIn }}&nbsp{{ item.details.tokenIn }}&nbspfor&nbsp{{
                                                item.details.tokenOut }}
                                            <span v-show="item.status.error != ''"
                                                style="position: absolute;right: 20px; font-size: small; ">reason:&nbsp{{
                                                    item.status.error }}</span>
                                        </span>
                                    </span>
                                    <span v-show="item.action == 'LIMIT_ORDER'" style="font-weight: 700;">{{ item.action }}&nbsp
                                        <span v-show="item.status.code == 'pending'">
                                            <img style="width: 20px; height:20px;" src="../assets/X.svg">
                                            <span
                                                style="position: absolute;right: 20px; font-size: large; color: rgb(255 189 89);">Pending</span>
                                        </span>
                                        <span v-show="item.status.code == 'success' || item.status.code == 'failed'">
                                            <img style="width: 25px; height:25px; cursor:pointer" src="../assets/jumpto.svg"
                                                @click="viewTx(item.txHash)">
                                            <span
                                                style="position: absolute;right: 20px; font-size: large; color: green;">Finish</span>
                                        </span>
                                        <br />
                                        <span style="font-size: smaller; font-weight:500;">
                                            from&nbsp{{ item.details.amountIn }}&nbsp{{ item.details.tokenIn }}&nbspfor&nbsp{{
                                                item.details.amountOut }}&nbsp{{ item.details.tokenOut }}
                                            <span v-show="item.status.error != ''"
                                                style="position: absolute;right: 20px; font-size: small; ">reason:&nbsp{{
                                                    item.status.error }}</span>
                                        </span>
                                    </span>
                                    <span v-show="item.action == 'COPY_ORDER'" style="font-weight: 700;">{{ item.action }}&nbsp
                                        <span v-show="item.status.code == 'active'">
                                            <img style="width: 25px; height:25px;" src = "../assets/X.svg">
                                            <span style="position: absolute;right: 20px; font-size: large; color: rgb(255 189 89);">Active</span>
                                        </span>
                                        <span v-show="item.status.code == 'failed'">
                                            <!-- <img style="width: 25px; height:25px;" src = "../assets/X.svg"> -->
                                            <span style="position: absolute;right: 20px; font-size: large; color: rgb(227, 91, 17);">Failed</span>
                                        </span>
                                        <!-- <a-collapse v-model:activeKey="activeKey" accordion>
                                            <a-collapse-panel key="1" header="copy order list">
                                                <p>
                                                    100 eth
                                                </p>
                                                <p>
                                                    20 uni
                                                </p>
                                                <p>
                                                    50 usdc
                                                </p>
                                            </a-collapse-panel>
                                        </a-collapse> -->
                                        
                                        <br />
                                        
                                    </span>
                                    <!-- <span style="font-weight: 700;">order details:&nbsp</span> -->
                                    <!-- <br /> -->
                                    <!-- <span>token in:&nbsp</span>{{ item.orderContent.tokenIn }}<span>&nbsp
                                amount:&nbsp</span>{{ item.orderContent.tokenInAmount }} -->
                                    <!-- <br /> -->
                                    <!-- <span>token out:&nbsp</span>{{ item.orderContent.tokenOut }}<span>&nbsp
                                amount:&nbsp</span>{{ item.orderContent.tokenOutAmount }} -->
                                    <!-- <br /> -->
                                    <!-- <span v-show="item.orderContent.status == 'pending'" style="font-weight: 700;">status: </span> -->
                                    <!-- <span v-show="item.orderContent.status == 'pending'"  style="color:red; font-weight: 700;">{{ item.orderContent.status }}</span> -->
                                    <!-- <a-button  type="primary" style="height: 40px;width: 100px; margin-left: 30%;">Edit</a-button> -->
                                    <!-- <a-button v-show="item.orderContent.status == 'pending'" danger type="primary" shape="round"
                                @click="cancelLimitedOrder(item.orderNo)" style="height: 30px;width: 80px; margin-left: 278px;"> -->
                                    <!-- Cancel -->
                                    <!-- </a-button> -->

                                    <!-- <span v-show="item.orderContent.status == 'success'" style="font-weight: 700;">status: </span> -->
                                    <!-- <span v-show="item.orderContent.status == 'success'"  style="color:green; font-weight: 700;">{{ item.orderContent.status }}</span> -->
                                    <!-- <br /> -->
                                    <!-- <span v-show="item.orderContent.status == 'success'" style="font-weight: 700;">tx hash: </span> -->
                                    <!-- <span v-show="item.orderContent.status == 'success'" style="font-weight: 700;"><a :href="'https://sepolia.etherscan.io/tx/' + item.orderContent.txHash" target="_blank">{{ item.orderContent.txHash }}</a></span> -->
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
            <!--Add wallet address hint modal windows-->
            <a-modal v-model:open="openAddWalletHint" title="Tips" ok-text="OK" cancel-text="CX" @ok="addWallet()"
                :key=Math.random() style="width:250px;">
                <span>Create a new wallet account?</span>
            </a-modal>
            <!--QR code modal windows-->
            <a-modal v-model:open="openQR" title="" footer="" :key=Math.random() style="width:250px;">
                <span>address: {{ walletAddress }}</span>
                <img @click="copyWalletAdd()" src="../assets/copy.svg"
                    style="cursor:pointer; margin-left:10px; height: 20px;width: 20px;">
                <img :src="qrImgSrc" style="width:200px; height: 200px; border-radius: 20px;">
            </a-modal>
            <!--setting modal windows -->
            <a-modal v-model:open="openSetting" title="Setting" :key=Math.random() ok-text="OK" cancel-text="CX"
                @ok="hideSetting()">
                <p style="font-size: medium;">Maximum slip point<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                        v-model:value="slipPoint" placeholder="0" suffix="%" style="height: 60px;" /></p>
                <p style="font-size: medium;">Trade deadline<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                        v-model:value="deadLine" placeholder="0" suffix="mins" style="height: 60px;" /></p>
                <p style="font-size: medium;">Private Transaction &nbsp<a-switch v-model:checked="PriTxChecked" /></p>
            </a-modal>
            <!--deposit eth modal windows -->
            <a-modal v-model:open="depositEthOpen" :key=Math.random() title="Transfer" ok-text="OK" cancel-text="CX"
                @ok="hideEthTransfer()" @cancel="cancelEthTransfer()">
                <p style="font-size: medium;">Receiver Address<a-input oninput="value=value.replace(/[^\w]/g,'')"
                        v-model:value="depositEthAdd" placeholder="0xabc..." suffix="" style="height: 60px;" /></p>
                <p style="font-size: medium;">ETH<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                        v-model:value="depositEth" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--withdraw eth modal windows -->
            <a-modal v-model:open="withdrawEthOpen" :key=Math.random() title="Receive" ok-text="OK" cancel-text="CX"
                @ok="hideEthWithdraw()" @cancel="cancelEthWithdraw()">
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
                @ok="hideErc20Transfer()" @cancel="cancelErc20Transfer()">
                <p style="font-size: medium;">Receiver Address<a-input oninput="value=value.replace(/[^\w]/g,'')"
                        v-model:value="depositErc20Add" placeholder="0xabc..." suffix="" style="height: 60px;" /></p>
                <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                        v-model:value="depositErc20" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--withdraw erc20 modal windows -->
            <a-modal v-model:open="withdrawErc20Open" :key=Math.random() title="Receive" ok-text="OK" cancel-text="CX"
                @ok="hideErc20Receive()" @cancel="cancelErc20Receive()">
                <p style="font-size: medium;">{{ this.tokenName }}<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                        v-model:value="withdrawErc20" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--Login modal windows-->
            <a-modal v-model:open="openLogin" title="Login" footer="" :key=Math.random() style="width:250px; text-align: center;">
                <label><a-button type="primary" class="login" @click="googleLogin()">Google</a-button></label>
                <br/>
                <label><a-button type="primary" class="login" @click="connect()">Metamask</a-button></label>
            </a-modal>
            <!--Log out hint modal windows-->
            <a-modal v-model:open="openLogoutHint" title="Tips" ok-text="OK" cancel-text="CX" @ok="logOut()"
                :key=Math.random() style="width:250px;">
                <span>Log out?</span>
            </a-modal>
            <!--addDeviceKey modal windows -->
            <a-modal v-model:open="openaddDeviceKey" title="addDeviceKey" :key=Math.random() ok-text="OK" cancel-text="CX"
                @ok="hideAddDeviceKey()">
                <p style="font-size: medium;">Device key<a-input oninput="value=value.replace(/[\W]/g,'')"
                        v-model:value="DeviceKey" placeholder="0" suffix="" style="height: 60px;" /></p>
            </a-modal>
            <!--account management modal windows-->
            <a-modal v-model:open="openAccManagement" title="Login with:" footer="" :key=Math.random() style="width:350px; text-align: center;">
                <label><a-button type="primary" class="account" @click="DeviceFactorKey()">DeviceFactorKey</a-button></label>
                <br/>
                <div style="border-top: 1.5px dashed #ccc; margin-top: 15px; margin-bottom: 15px; width: 116%; margin-left: -24px;"></div>
                <p style="font-size: medium; text-align: left; "><a-input oninput="value=value.replace(/[\W]/g,'')"
                        v-model:value="DeviceKey" placeholder="type in backup factor key" suffix="" style="height: 60px;" /></p>
                <label><a-button type="primary" class="account" @click="BackupFactorKey()">BackupFactorKey</a-button></label>
            </a-modal>
            <!-- drawer list -->
            <!--drawer of ETH operating-->
            <a-drawer v-model:open="operateEthOpen" class="custom-class" root-class-name="root-class-name"
                :root-style="{ color: 'blue' }" style="color: rgb(24, 18, 18)," title="ETH" placement="left"
                @after-open-change="afterOpenChange" :body-style="{ background: '' }" :header-style="{ background: '' }">
                <a-button type="primary" :loading="iconLoadingDepositEth" @click="showEthTransfer()"
                    style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                    <template #icon>
                    </template>
                    Transfer
                </a-button>
                <a-button type="primary" :loading="iconLoadingWithdrawEth" @click="showEthReceive()"
                    style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                    <template #icon>
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
                </template>
                Approve
              </a-button> -->
                <a-button type="primary" :loading="iconLoadingDepositErc20" @click="showErc20Transfer()"
                    style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                    <template #icon>
                    </template>
                    Transfer
                </a-button>
                <a-button type="primary" :loading="iconLoadingWithdrawErc20" @click="showErc20Receive()"
                    style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                    <template #icon>
                    </template>
                    Receive
                </a-button>
                <a-button type="dashed" @click="showDeleteButton()"
                    style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                    <template #icon>
                    </template>
                    ...
                </a-button>
                <a-button v-show="showDeleteFlage" type="primary" danger @click="deleteToken(tokenName)"
                    style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                    <template #icon>
                    </template>
                    Delete Token
                </a-button>
                <!-- <div v-show="showDeleteFlage">
                <a-button type="primary" danger :loading="iconLoadingWithdrawErc20" @click="deleteToken(tokenName)"
                  style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                  <template #icon>
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
                        </template>
                        Add Custom Token
                    </a-button>
                </span>
            </a-drawer>
        </div>
        <div class="rightbar" ref="chatwindow" v-if="this.mode == 'automatic'">
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
            <!-- <MainPage :parentuser="user"></MainPage> -->

            <div style="position:absolute; top: 20%; left: 13%;border-top-style: solid; border-top-color: #bd7eab;">
                <button style="cursor:pointer;" :class="index == numberRight ? 'btn1Right' : 'btnRight'"
                    @click="menuNavigationRight(index)" v-for="(item, index) in dataListRight" :key="index">{{ item.option
                    }}
                </button>
                <div id="contentSwap" v-show="numberRight == 0">
                    <span>
                        <div v-show="changePositionFlag == 0">
                            <div class="components-input-demo-presuffix"
                                style="width: 60%;margin-left: 20%; padding-top: 10%;">
                                <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount" @change="calculateRateE()"
                                placeholder="0" suffix="ETH" style="height: 60px;" /> -->
                                <span>
                                    <label>
                                        <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                                            v-model:value="ethAmount" @change="calculateRateE()" placeholder="0"
                                            style="width: 70%; height: 40px;" />
                                    </label>
                                    <label>
                                        <a-select :size="size" default-value="eth" style="width: 30%;"
                                            @select="handleChangeSrc">
                                            <a-select-option style="text-align: center;" :value="item.value"
                                                :disabled="item.disabled" v-for="item in optionSrc" :key="item.value">{{
                                                    item.label }}</a-select-option>
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
                                        <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                                            v-model:value="erc20Amount" @change="calculateRateU()" placeholder="0"
                                            style="width: 70%; height: 40px; " />
                                    </label>
                                    <label>
                                        <a-select :size="size" default-value="uni" style="width: 30%;"
                                            @select="handleChangeDes">
                                            <a-select-option style="text-align: center;" :value="item.value"
                                                :disabled="item.disabled" v-for="item in optionDes" :key="item.value">{{
                                                    item.label }}</a-select-option>
                                        </a-select>
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div v-show="changePositionFlag == 1">
                            <div class="components-input-demo-presuffix"
                                style="width: 60%;margin-left: 20%; padding-top: 10%;">
                                <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="uniAmount"
                                @change="calculateRateU()" placeholder="0" suffix="UNI" style="height: 60px;"/> -->
                                <span>
                                    <label>
                                        <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                                            v-model:value="erc20Amount" @change="calculateRateU()" placeholder="0"
                                            style="width: 70%; height: 40px; " />
                                    </label>
                                    <label>
                                        <a-select :size="size" default-value="uni" style="width: 30%;"
                                            @select="handleChangeDes">
                                            <a-select-option style="text-align: center;" :value="item.value"
                                                :disabled="item.disabled" v-for="item in optionDes" :key="item.value">{{
                                                    item.label }}</a-select-option>
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
                                        <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                                            v-model:value="ethAmount" @change="calculateRateE()" placeholder="0"
                                            style="width: 70%; height: 40px;" />
                                    </label>
                                    <label>
                                        <a-select :size="size" default-value="eth" style="width: 30%;"
                                            @select="handleChangeSrc">
                                            <a-select-option style="text-align: center;" :value="item.value"
                                                :disabled="item.disabled" v-for="item in optionSrc" :key="item.value">{{
                                                    item.label }}</a-select-option>
                                        </a-select>
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div style="line-height: 50px;" ref="exchangeRate">rate:?</div>
                        <a-button type="primary" :loading="iconLoading" @click="submitSwap()"
                            style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                            <template #icon>
                            </template>
                            Submit
                        </a-button>
                    </span>
                </div>

                <div id="contentLimitOrder" v-show="numberRight == 1">
                    <span>
                        <div v-show="changeLimitedPositionFlag == 0">
                            <div class="components-input-demo-presuffix"
                                style="width: 60%;margin-left: 20%; padding-top: 10%;">
                                <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="ethAmount" @change="calculateRateE()"
                        placeholder="0" suffix="ETH" style="height: 60px;" /> -->
                                <span>
                                    <label>
                                        <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                                            v-model:value="ethLimitedAmount" placeholder="0"
                                            style="width: 70%; height: 40px;" />
                                    </label>
                                    <label>
                                        <a-select :size="size" default-value="eth" style="width: 30%;"
                                            @select="handleChangeLimitedSrc()">
                                            <a-select-option style="text-align: center;" :value="item.value"
                                                :disabled="item.disabled" v-for="item in optionSrc" :key="item.value">{{
                                                    item.label }}</a-select-option>
                                        </a-select>
                                    </label>
                                </span>
                            </div>
                            <div style="line-height: 20px;"><img src="../assets/swap.svg"
                                    style="height: 20px; width: 20px; " @click="changeLimitedPosition()"></div>
                            <div class="components-input-demo-presuffix" style="width: 60%;margin-left: 20%;">
                                <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="uniAmount"
                        @change="calculateRateU()" placeholder="0" suffix="UNI" style="height: 60px;"/> -->
                                <span>
                                    <label>
                                        <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                                            v-model:value="erc20LimitedAmount" placeholder="0"
                                            style="width: 70%; height: 40px; " />
                                    </label>
                                    <label>
                                        <a-select :size="size" default-value="uni" style="width: 30%;"
                                            @select="handleChangelimitedDes()">
                                            <a-select-option style="text-align: center;" :value="item.value"
                                                :disabled="item.disabled" v-for="item in optionDes" :key="item.value">{{
                                                    item.label }}</a-select-option>
                                        </a-select>
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div v-show="changeLimitedPositionFlag == 1">
                            <div class="components-input-demo-presuffix"
                                style="width: 60%;margin-left: 20%; padding-top: 10%;">
                                <!-- <a-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model:value="uniAmount"
                        @change="calculateRateU()" placeholder="0" suffix="UNI" style="height: 60px;"/> -->
                                <span>
                                    <label>
                                        <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                                            v-model:value="erc20LimitedAmount" placeholder="0"
                                            style="width: 70%; height: 40px; " />
                                    </label>
                                    <label>
                                        <a-select :size="size" default-value="uni" style="width: 30%;"
                                            @select="handleChangelimitedDes()">
                                            <a-select-option style="text-align: center;" :value="item.value"
                                                :disabled="item.disabled" v-for="item in optionDes" :key="item.value">{{
                                                    item.label }}</a-select-option>
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
                                        <a-input :size="size" oninput="value=value.replace(/[^0-9.]/g,'')"
                                            v-model:value="ethLimitedAmount" placeholder="0"
                                            style="width: 70%; height: 40px;" />
                                    </label>
                                    <label>
                                        <a-select :size="size" default-value="eth" style="width: 30%;"
                                            @select="handleChangeLimitedSrc()">
                                            <a-select-option style="text-align: center;" :value="item.value"
                                                :disabled="item.disabled" v-for="item in optionSrc" :key="item.value">{{
                                                    item.label }}</a-select-option>
                                        </a-select>
                                    </label>
                                </span>
                            </div>
                        </div>
                        <!-- <div style="line-height: 50px;" ref="exchangeRate">rate:?</div> -->
                        <a-button type="primary" :loading="iconLoadingLimited" @click="submitLimitedSwap()"
                            style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 20px 3px;">
                            <template #icon>
                            </template>
                            Submit Order
                        </a-button>
                    </span>
                </div>

            </div>


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

.btnRight {
    width: 150px;
    height: 40px;
    border: 0;
    border-radius: 5px;
    color: black;
    margin: 20px 3px 0px;
    background-color: #90f6cd;
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

.btn1Right {
    width: 150px;
    height: 40px;
    border: 0;
    border-radius: 5px;
    color: white;
    margin: 20px 3px 0px;
    background-color: #099941;
}

#contentAsset,
#contentOperation {
    background: linear-gradient(#ffeef9, #91bee5);
    height: 500px;
    font-size: 16px;
    line-height: 100px;
    margin-top: 0px;
    border-radius: 15px;
    width: 650px;
    overflow-y: auto;
}

#contentSwap,
#contentLimitOrder {
    background: linear-gradient(#ffeef9, #91bee5);
    height: 500px;
    font-size: 16px;
    line-height: 100px;
    margin-top: 0px;
    border-radius: 15px;
    width: 650px;
    overflow-y: auto;
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
    background: linear-gradient(#cddfca, #f3d789); //linear-gradient(#91bee5, #ffeef9);
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
.login {
    width: 80%;
    height: 40px;
    background-color: #cd7e9b;
    border-radius: 30px;
    margin-top: 10px;
}
.account {
    width: 80%;
    height: 40px;
    background-color: #cd7e9b;
    border-radius: 30px;
    // margin-top: 10px;
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
import { ethers, utils, BigNumber } from 'ethers6';
import { ParticlesBg } from "particles-bg-vue";
import { ref } from "vue";
import useClipboard from "vue-clipboard3";
import Chat from "./chatBot/Chat.vue";
import LeftItem from "./chatBot/LeftItem.vue";
import RightItem from "./chatBot/RightItem.vue";
import MainPage from "./MainPage.vue";
import EthereumQRPlugin from 'ethereum-qr-code';
import VueMetamask from 'vue-metamask';
import { saveAs } from "file-saver";
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
    transferETH,
    transferErc20,
    login,
    logout,
    delegate,
    getDeviceFactor,
    inputBackupFactorKey,
    resetAccount,
    enableMFA,
    RecoveryFactorKeyUsingMnemonic,
    exportMnemonicFactor,
    reload
} from "../api/contracts";

import { responseParser } from "../api/apiChat";
import { getKeyThenIncreaseKey } from 'ant-design-vue/es/message';

const schedule = require('node-schedule');
const { toClipboard } = useClipboard();
const axios = require('axios');

//wrap map data set to store contract addresses
let contractAddrMap = new Map();
contractAddrMap.set("eth", "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14");
contractAddrMap.set("uni", "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");

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
            // drawer params
            afterOpenChange: null,
            // setting params
            slipPoint: 100,
            PriTxChecked: ref(false),
            deadLine: null,
            // smart contract account params
            walletAddress: null,
            walletSalt: 0,//default 0
            user: null,//sessionStorage['user'] != null ? sessionStorage['user'] : null,
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
            openAddWalletHint: ref(false),
            qrImgSrc: " data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjkzMjg0MjA0Njk0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTcwNS45MiA5MTUuODRIMzIwYy0yOC4xNiAwLTUxLjItMjMuMDQtNTEuMi01MS4yVjYzMC40YzAtMjguMTYgMjMuMDQtNTEuMiA1MS4yLTUxLjJoMzg1LjkyYzI4LjE2IDAgNTEuMiAyMy4wNCA1MS4yIDUxLjJ2MjM0Ljg4YzAgMjcuNTItMjMuMDQgNTAuNTYtNTEuMiA1MC41NnoiIGZpbGw9IiNFRUY2RkYiIHAtaWQ9IjE5NjAiPjwvcGF0aD48cGF0aCBkPSJNNzA1LjkyIDkyOC42NEgzMjBjLTM1LjIgMC02NC0yOC44LTY0LTY0VjYzMC40YzAtMzUuMiAyOC44LTY0IDY0LTY0aDM4NS45MmMzNS4yIDAgNjQgMjguOCA2NCA2NHYyMzQuODhjMCAzNS4yLTI4LjggNjMuMzYtNjQgNjMuMzZ6TTMyMCA1OTJjLTIxLjEyIDAtMzguNCAxNy4yOC0zOC40IDM4LjR2MjM0Ljg4YzAgMjEuMTIgMTcuMjggMzguNCAzOC40IDM4LjRoMzg1LjkyYzIxLjEyIDAgMzguNC0xNy4yOCAzOC40LTM4LjRWNjMwLjRjMC0yMS4xMi0xNy4yOC0zOC40LTM4LjQtMzguNEgzMjB6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTYxIj48L3BhdGg+PHBhdGggZD0iTTUxNS4yIDE2My4yQzQxOC41NiAxNjMuMiAzMzkuMiAyNDIuNTYgMzM5LjIgMzM4LjU2VjUxOC40aDM1MlYzMzguNTZjMC05Ni03OS4zNi0xNzUuMzYtMTc2LTE3NS4zNnoiIGZpbGw9IiNFOEU2RkYiIHAtaWQ9IjE5NjIiPjwvcGF0aD48cGF0aCBkPSJNNzA0IDUzMS4ySDMyNi40VjMzOC41NmMwLTEwMy42OCA4NC40OC0xODguMTYgMTg4LjgtMTg4LjE2UzcwNCAyMzQuODggNzA0IDMzOC41NlY1MzEuMnogbS0zNTItMjUuNmgzMjYuNFYzMzguNTZjMC04OS42LTcyLjk2LTE2Mi41Ni0xNjMuMi0xNjIuNTZTMzUyIDI0OC45NiAzNTIgMzM4LjU2VjUwNS42eiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk2MyI+PC9wYXRoPjxwYXRoIGQ9Ik00NTYuMzIgNTE4LjRoMTEydjYwLjhINDU2LjMyeiIgZmlsbD0iI0VFRjZGRiIgcC1pZD0iMTk2NCI+PC9wYXRoPjxwYXRoIGQ9Ik01ODEuNzYgNTkySDQ0My41MlY1MDUuNmgxMzcuNnY4Ni40eiBtLTExMi42NC0yNS42aDg2LjRWNTMxLjJINDY5LjEydjM1LjJ6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTY1Ij48L3BhdGg+PHBhdGggZD0iTTcxNC44OCA0MzEuMzZjLTEyLjggMC0yMy4wNC0xMC4yNC0yMy4wNC0yMy4wNHYtMzguNGMwLTEyLjggMTAuMjQtMjMuMDQgMjMuMDQtMjMuMDRzMjMuMDQgMTAuMjQgMjMuMDQgMjMuMDR2MzguNGMwIDEyLjgtMTAuMjQgMjMuMDQtMjMuMDQgMjMuMDR6IiBmaWxsPSIjRUVGNkZGIiBwLWlkPSIxOTY2Ij48L3BhdGg+PHBhdGggZD0iTTcxNC44OCA0NDQuMTZjLTE5Ljg0IDAtMzUuODQtMTYtMzUuODQtMzUuODR2LTM4LjRjMC0xOS44NCAxNi0zNS44NCAzNS44NC0zNS44NHMzNS44NCAxNiAzNS44NCAzNS44NHYzOC40YzAgMTkuODQtMTYgMzUuODQtMzUuODQgMzUuODR6IG0wLTgzLjg0Yy01Ljc2IDAtMTAuMjQgNC40OC0xMC4yNCAxMC4yNHYzOC40YzAgNS43NiA0LjQ4IDEwLjI0IDEwLjI0IDEwLjI0czEwLjI0LTQuNDggMTAuMjQtMTAuMjR2LTM4LjRjMC01Ljc2LTQuNDgtMTAuMjQtMTAuMjQtMTAuMjR6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTY3Ij48L3BhdGg+PHBhdGggZD0iTTMxMi4zMiA0MjEuMTJjLTEyLjggMC0yMy4wNC0xMC4yNC0yMy4wNC0yMy4wNHYtMzguNGMwLTEyLjggMTAuMjQtMjMuMDQgMjMuMDQtMjMuMDRzMjMuMDQgMTAuMjQgMjMuMDQgMjMuMDR2MzguNGMwIDEyLjgtMTAuODggMjMuMDQtMjMuMDQgMjMuMDR6IiBmaWxsPSIjRUVGNkZGIiBwLWlkPSIxOTY4Ij48L3BhdGg+PHBhdGggZD0iTTMxMi4zMiA0MzMuOTJjLTE5Ljg0IDAtMzUuODQtMTYtMzUuODQtMzUuODR2LTM4LjRjMC0xOS44NCAxNi0zNS44NCAzNS44NC0zNS44NHMzNS44NCAxNiAzNS44NCAzNS44NHYzOC40YzAgMTkuODQtMTYuNjQgMzUuODQtMzUuODQgMzUuODR6IG0wLTgzLjg0Yy01Ljc2IDAtMTAuMjQgNC40OC0xMC4yNCAxMC4yNHYzOC40YzAgNS43NiA0LjQ4IDEwLjI0IDEwLjI0IDEwLjI0czEwLjI0LTQuNDggMTAuMjQtMTAuMjR2LTM4LjRjMC01Ljc2LTUuMTItMTAuMjQtMTAuMjQtMTAuMjR6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTY5Ij48L3BhdGg+PHBhdGggZD0iTTc5NS41MiA3NjMuNTJoLTI1LjZjLTcuMDQgMC0xMi44LTUuNzYtMTIuOC0xMi44di00Ni4wOGMwLTE0LjA4LTIuNTYtMjUuNiAxMS41Mi0yNS42aDI2Ljg4YzE0LjA4IDAgMjUuNiAxMS41MiAyNS42IDI1LjZ2MzMuMjhjMCAxNC4wOC0xMS41MiAyNS42LTI1LjYgMjUuNnoiIGZpbGw9IiNFRUY2RkYiIHAtaWQ9IjE5NzAiPjwvcGF0aD48cGF0aCBkPSJNNzk1LjUyIDc3Ni4zMmgtMjUuNmMtMTQuMDggMC0yNS42LTExLjUyLTI1LjYtMjUuNnYtNDYuMDgtNS4xMmMwLTguOTYtMC42NC0xOS4yIDYuNC0yNi4yNCA0LjQ4LTQuNDggMTAuMjQtNi40IDE3LjkyLTYuNGgyNi44OGMyMS4xMiAwIDM4LjQgMTcuMjggMzguNCAzOC40djMzLjI4YzAgMjAuNDgtMTcuMjggMzcuNzYtMzguNCAzNy43NnogbS0yNi4yNC04NC40OHY1OC44OGgyNS42YzcuMDQgMCAxMi44LTUuNzYgMTIuOC0xMi44di0zMy4yOGMwLTcuMDQtNS43Ni0xMi44LTEyLjgtMTIuOGgtMjUuNnoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5NzEiPjwvcGF0aD48cGF0aCBkPSJNODE2LjY0IDczNC4wOGwtMC42NC0yNS42djEyLjgtMTIuOGM1LjEyIDAgNDgtMy4yIDQ4LTU4LjI0VjQ1NC40aDI1LjZ2MTk2LjQ4YzAgODEuMjgtNzIuMzIgODMuMi03Mi45NiA4My4yeiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk3MiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjguNDggNzYzLjUyaDI1LjZjNy4wNCAwIDEyLjgtNS43NiAxMi44LTEyLjh2LTU4Ljg4YzAtNy4wNC01Ljc2LTEyLjgtMTIuOC0xMi44aC0yNS42Yy0xNC4wOCAwLTI1LjYgMTEuNTItMjUuNiAyNS42djMzLjI4YzAgMTQuMDggMTEuNTIgMjUuNiAyNS42IDI1LjZ6IiBmaWxsPSIjRUVGNkZGIiBwLWlkPSIxOTczIj48L3BhdGg+PHBhdGggZD0iTTI1NC4wOCA3NzYuMzJoLTI1LjZjLTIxLjEyIDAtMzguNC0xNy4yOC0zOC40LTM4LjR2LTMzLjI4YzAtMjEuMTIgMTcuMjgtMzguNCAzOC40LTM4LjRoMjUuNmMxNC4wOCAwIDI1LjYgMTEuNTIgMjUuNiAyNS42djU4Ljg4YzAgMTQuMDgtMTEuNTIgMjUuNi0yNS42IDI1LjZ6IG0tMjUuNi04NC40OGMtNy4wNCAwLTEyLjggNS43Ni0xMi44IDEyLjh2MzMuMjhjMCA3LjA0IDUuNzYgMTIuOCAxMi44IDEyLjhoMjUuNnYtNTguODhoLTI1LjZ6TTUxOS4wNCAxNDAuMTZjLTIzLjY4IDAtNDMuNTItMTkuMi00My41Mi00My41MnMxOS4yLTQzLjUyIDQzLjUyLTQzLjUyIDQzLjUyIDE5LjIgNDMuNTIgNDMuNTItMTkuODQgNDMuNTItNDMuNTIgNDMuNTJ6IG0wLTYxLjQ0Yy05LjYgMC0xNy45MiA4LjMyLTE3LjkyIDE3LjkyczguMzIgMTcuOTIgMTcuOTIgMTcuOTIgMTcuOTItOC4zMiAxNy45Mi0xNy45Mi04LjMyLTE3LjkyLTE3LjkyLTE3LjkyeiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk3NCI+PC9wYXRoPjxwYXRoIGQ9Ik01MDUuNiAxMzQuNGgyNS42djMyaC0yNS42eiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk3NSI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIuNjQgMzA1LjkybS02OS4xMiAwYTY5LjEyIDY5LjEyIDAgMSAwIDEzOC4yNCAwIDY5LjEyIDY5LjEyIDAgMSAwLTEzOC4yNCAwWiIgZmlsbD0iI0ZGRjI3RCIgcC1pZD0iMTk3NiI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIuNjQgMzg3Ljg0Yy00NC44IDAtODEuOTItMzYuNDgtODEuOTItODEuOTJTNDY3LjIgMjI0IDUxMi42NCAyMjRzODEuOTIgMzYuNDggODEuOTIgODEuOTItMzcuMTIgODEuOTItODEuOTIgODEuOTJ6IG0wLTEzOC4yNGMtMzAuNzIgMC01Ni4zMiAyNC45Ni01Ni4zMiA1Ni4zMnMyNC45NiA1Ni4zMiA1Ni4zMiA1Ni4zMiA1Ni4zMi0yNC45NiA1Ni4zMi01Ni4zMi0yNS42LTU2LjMyLTU2LjMyLTU2LjMyeiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk3NyI+PC9wYXRoPjxwYXRoIGQ9Ik02MDQuMTYgNDMzLjI4bS0xMC4yNCAwYTEwLjI0IDEwLjI0IDAgMSAwIDIwLjQ4IDAgMTAuMjQgMTAuMjQgMCAxIDAtMjAuNDggMFoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5NzgiPjwvcGF0aD48cGF0aCBkPSJNNDIyLjQgNjU5LjJIMzM5LjJjLTcuMDQgMC0xMi44LTUuNzYtMTIuOC0xMi44czUuNzYtMTIuOCAxMi44LTEyLjhoODMuMmM3LjA0IDAgMTIuOCA1Ljc2IDEyLjggMTIuOHMtNS43NiAxMi44LTEyLjggMTIuOHoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5NzkiPjwvcGF0aD48cGF0aCBkPSJNNTEyLjY0IDMwNS45Mm0tMTYgMGExNiAxNiAwIDEgMCAzMiAwIDE2IDE2IDAgMSAwLTMyIDBaIiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTgwIj48L3BhdGg+PHBhdGggZD0iTTg3Ni44IDQ3My42Yy0yNy41MiAwLTUxLjItMjEuNzYtNTEuMi00Ni43MiAwLTcuMDQgNS43Ni0xMi44IDEyLjgtMTIuOHMxMi44IDUuNzYgMTIuOCAxMi44YzAgMTAuODggMTIuMTYgMjEuMTIgMjUuNiAyMS4xMnMyNS42LTEwLjI0IDI1LjYtMjEuMTJjMC03LjA0IDUuNzYtMTIuOCAxMi44LTEyLjhzMTIuOCA1Ljc2IDEyLjggMTIuOGMwIDI0Ljk2LTIzLjY4IDQ2LjcyLTUxLjIgNDYuNzJ6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTgxIj48L3BhdGg+PHBhdGggZD0iTTE5NC41NiA3MzQuMDhjLTAuNjQgMC03Mi45Ni0yLjU2LTcyLjk2LTgzLjg0VjQ1NC40aDI1LjZ2MTk2LjQ4YzAgNTUuMDQgNDIuODggNTcuNiA0OCA1OC4yNGwtMC42NCAyNC45NnoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5ODIiPjwvcGF0aD48cGF0aCBkPSJNMTMxLjIgNDczLjZjLTI3LjUyIDAtNTEuMi0yMS43Ni01MS4yLTQ2LjcyIDAtNy4wNCA1Ljc2LTEyLjggMTIuOC0xMi44czEyLjggNS43NiAxMi44IDEyLjhjMCAxMC44OCAxMi4xNiAyMS4xMiAyNS42IDIxLjEyczI1LjYtMTAuMjQgMjUuNi0yMS4xMmMwLTcuMDQgNS43Ni0xMi44IDEyLjgtMTIuOHMxMi44IDUuNzYgMTIuOCAxMi44YzAgMjQuOTYtMjMuMDQgNDYuNzItNTEuMiA0Ni43MnoiIGZpbGw9IiM3MDhEQjciIHAtaWQ9IjE5ODMiPjwvcGF0aD48cGF0aCBkPSJNNTgzLjA0IDgzNy4xMm0tMjMuNjggMGEyMy42OCAyMy42OCAwIDEgMCA0Ny4zNiAwIDIzLjY4IDIzLjY4IDAgMSAwLTQ3LjM2IDBaIiBmaWxsPSIjRkZGMjdEIiBwLWlkPSIxOTg0Ij48L3BhdGg+PHBhdGggZD0iTTU4My4wNCA4NzMuNmMtMTkuODQgMC0zNi40OC0xNi0zNi40OC0zNi40OHMxNi0zNi40OCAzNi40OC0zNi40OCAzNi40OCAxNiAzNi40OCAzNi40OC0xNi42NCAzNi40OC0zNi40OCAzNi40OHogbTAtNDYuNzJjLTUuNzYgMC0xMC44OCA0LjQ4LTEwLjg4IDEwLjg4czQuNDggMTAuODggMTAuODggMTAuODggMTAuODgtNC40OCAxMC44OC0xMC44OC01LjEyLTEwLjg4LTEwLjg4LTEwLjg4eiIgZmlsbD0iIzcwOERCNyIgcC1pZD0iMTk4NSI+PC9wYXRoPjxwYXRoIGQ9Ik02NzIuNjQgODM3LjEybS0yMy42OCAwYTIzLjY4IDIzLjY4IDAgMSAwIDQ3LjM2IDAgMjMuNjggMjMuNjggMCAxIDAtNDcuMzYgMFoiIGZpbGw9IiNGRjk3OTciIHAtaWQ9IjE5ODYiPjwvcGF0aD48cGF0aCBkPSJNNjcyLjY0IDg3My42Yy0xOS44NCAwLTM2LjQ4LTE2LTM2LjQ4LTM2LjQ4czE2LTM2LjQ4IDM2LjQ4LTM2LjQ4IDM2LjQ4IDE2IDM2LjQ4IDM2LjQ4LTE2LjY0IDM2LjQ4LTM2LjQ4IDM2LjQ4eiBtMC00Ni43MmMtNS43NiAwLTEwLjg4IDQuNDgtMTAuODggMTAuODhzNC40OCAxMC44OCAxMC44OCAxMC44OCAxMC44OC00LjQ4IDEwLjg4LTEwLjg4LTUuMTItMTAuODgtMTAuODgtMTAuODh6IiBmaWxsPSIjNzA4REI3IiBwLWlkPSIxOTg3Ij48L3BhdGg+PC9zdmc+",
            openLogin: ref(false),
            openLogoutHint: ref(false),
            DeviceKey: null,
            openaddDeviceKey: ref(false),
            openAccManagement: ref(false),
            // loading icon params
            iconLoadingDepositEth: ref(false),
            iconLoadingWithdrawEth: ref(false),
            iconLoadingApproveErc20: ref(false),
            iconLoadingDepositErc20: ref(false),
            iconLoadingWithdrawErc20: ref(false),
            iconLoading: ref(false),
            iconLoadingLimited: ref(false),
            iconLoadingSend: ref(false),
            iconLoadingLogin: ref(false),
            // chat bot params
            text: '',
            mode: 'automatic',// or automatic manual
            // layout params
            number: 0,
            numberRight: 0,
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
            contractAddrMap: contractAddrMap,
            fee: 3000,
            routerAddress: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
            changePositionFlag: 0,
            changeLimitedPositionFlag: 0,
            subKeySrc: "eth",
            subKeyDes: "uni",
            subKeyLimitedSrc: "eth",
            subKeyLimitedDes: "uni",
            // data sets params
            opHistory: [],
            dataList: [
                { option: 'Asset' },
                { option: 'Operation' },
            ],
            dataListRight: [
                { option: 'Swap' },
                { option: 'Limit order' },
            ],
            msglist: [{
                id: 1,
                type: 1,
                content: 'Welcome!',
                me: false
            }],
            tokenObj: [
                // { token: "ETH", address: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80A", balance: 0 },
                // { token: "WETH", address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", balance: 0 },
                // { token: "UNI", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", balance: 0 },
                // { token: "USDC", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", balance: 0 },
            ],
            size: ref('large'),
            walletObj: [
                // { label: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80A", value: "0x59C70EBA07612e4A694B8896DF9550e2D722fE69", disabled: false, salt: 0},
                // { label: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80a", value: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80a", disabled: false, salt: 1}
            ],
            operationHistory: [
                // { action: "COPY_ORDER", details: { tokenSymbol: "", amount: "" }, status: { code: "active", error: "insufficient balance" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
                // { action: "TRANSFER", details: { tokenSymbol: "ETH", amount: "100" }, status: { code: "1", error: "insufficient balance" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
                // { action: "Swap", details: { tokenIn: "ETH", amountIn: "100", tokenOut: "UNI" }, status: { code: "1", error: "insufficient balance" }, txHash: "" },
                // { action: "Limit order", details: { tokenIn: "ETH", amountIn: "100", tokenOut: "UNI", amountOut: "1" }, status: { code: "0", error: null }, txHash: "" }
                // { orderNo: "1",orderContent: { tokenIn: "eth", tokenOut: "uni", tokenInAmount: "0.0001", tokenOutAmount: "0.0003", status: "pending"}},
                // { orderNo: "2",orderContent: { tokenIn: "eth", tokenOut: "uni", tokenInAmount: "0.0001", tokenOutAmount: "0.0003", status: "pending"}},
            ],
            operation: {
                action: null,
                details: null,
                status: null,
                txHash: null
            },
            orderData: [],
            optionSrc: optionSrc,
            optionDes: optionDes,
            rateMap: rateMap,
            provider: null,
            platform: null,//sessionStorage['platform'] != null ? sessionStorage['platform'] : null,//1 represent web3 platform, such as metamask; 0 represent normal platform, such as google
        }
    },
    created: function() {
        console.log("check coreKitInstance if already exists...");
        reload().then(res => {
            console.log("reload response: ", res);
            if (res == undefined) {
                return;
            }
            console.log("user:", res.userAccounts);
            this.user = res.userAccounts;
            this.platform = res.platform;

            if (res.userAccounts != null) {
                initInstances().then((response) => {
                    if (response.status) {
                        console.log("Init success");

                    } else {
                        console.log("Init failed");
                    }
                });
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
                                                label: element.Account,
                                                value: element.Account,
                                                disabled: false,
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
                                                        this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
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
                                                    element.balance = this.formateNumber(ethers.formatEther(response.balance));
                                                }
                                            })
                                        } else {
                                            console.log("get ETH balance failed!");
                                        }
                                    });
                                    // get operation history
                                    this.quertOpAndOrders();
                                }
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
            }

        });
    },
    methods: {
        DeviceFactorKey() {
            try {
                getDeviceFactor().then(res => {
                    if (res != undefined) {
                        console.log("device factorKey: ", res);
                    }else{
                        this.openNotification("error","device factorKey doesn't exist.");
                    }
                });
                inputBackupFactorKey().then(res => {
                    console.log(res);
                });
            } catch (error) {
                console.log(error);
            }
        },
        resetAcc() {
            resetAccount().then(res => {
                console.log("account is reseted.");
            });
        },
        backupKey() {
            enableMFA().then(res => {
                if (res != undefined) {
                    console.log("key is exported. key: ", res);
                    try {
                        let str = new Blob([res], {type: 'text/plain;charset=utf-8'});
                        saveAs(str,`key.txt`);
                    } catch (error) {
                        console.log(error);
                    }
                }else {
                    this.openNotification("info","MFA already enabled.");
                }
            });
        },
        approveBundler() {
            let walletSalt = 0;
            // update walletIndex
            console.log("this.walletObj: ", this.walletObj);
            for (let index = 0; index < this.walletObj.length; index++) {
                const element = this.walletObj[index];
                if (element.value == this.walletAddress) {
                    walletSalt = element.salt;
                    console.log("wallet info: ", element);
                }
            }
            delegate(this.user, this.walletAddress, this.chainId, this.platform, walletSalt).then(res => {
                if (res != undefined) {
                    console.log("userOperation: ", res);

                    // add order to limited order list
                    let obj = {
                        beneficiary_addr: this.user,
                        user_op: {
                            call_data: res.callData,
                            call_gas_limit: String(res.callGasLimit),
                            init_code: res.initCode,
                            max_fee_per_gas: String(res.maxFeePerGas),
                            max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                            nonce: null,
                            paymaster_and_data: res.paymasterAndData,
                            pre_verification_gas: String(res.preVerificationGas),
                            sender: res.sender,
                            signature: res.signature,
                            verification_gas_limit: String(res.verificationGasLimit)
                        },
                        order_details: {
                            limitAmountIn: null,
                            sender: res.sender,
                            targetAddr: null
                        }
                    };
                    console.log("obj string:", JSON.stringify(obj));
                    // return;
                    axios.post('/api/v1/add_copy_order', obj)
                        .then(response => {
                            console.log(response);
                            if (response.data.code == 1000) {
                                this.openNotification("success", "Add copy order successfully!");
                                // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                console.log("Add copy order successfully!");

                                // query op record
                                this.quertOpAndOrders();
                            } else {
                                this.openNotification("info", "Add copy order error! error: " + response.data.message);
                                console.log("Add copy order error!");
                                // this.iconLoadingLimited = false;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }

            });
        },
        addDeviceKey() {
            this.openaddDeviceKey = true;
        },
        hideAddDeviceKey() {
            if (this.DeviceKey == null) {
                // nothing to do, just hide the window
                this.openaddDeviceKey = false;
                this.openNotification("error","Wrong deviceKey: " + this.DeviceKey);
                this.DeviceKey = null;
                return;
            }
            RecoveryFactorKeyUsingMnemonic(this.DeviceKey);
            this.openaddDeviceKey = false;
            this.DeviceKey = null;
        },
        googleLogin () {
            this.openLogin = false;
            this.iconLoadingLogin = true;
            login().then(response => {
                this.iconLoadingLogin = false;
                    console.log("response: ",response);
                    if (response == undefined) {
                        this.openNotification("info","Required more shares, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution].");
                        this.openAccManagement = true;
                        return;
                    }
                    console.log("userAccounts: ", response.userAccounts);
                    console.log("platform: ", response.platform);
                    if (response.userAccounts != null) {
                        this.user = response.userAccounts;
                    }
                
                    if (response.platform != null) {
                        this.platform = response.platform;
                    }
                    initInstances().then((response) => {
                        if (response.status) {
                            console.log("Init success");

                        } else {
                            console.log("Init failed");
                        }
                    });
                    // return;
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
                                            label: element.Account,
                                            value: element.Account,
                                            disabled: false,
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
                                                    this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
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
                                                element.balance = this.formateNumber(ethers.formatEther(response.balance));
                                            }
                                        })
                                    } else {
                                        console.log("get ETH balance failed!");
                                    }
                                });
                                // get operation history
                                this.quertOpAndOrders();
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });

                    // put user information inro sessionStorage
                    sessionStorage.setItem('user', this.user);
                    sessionStorage.setItem('platform', this.platform);
                    
                });
        },
        showLogin () {
            console.log(this.user);
            if (this.user == null) {
                this.openLogin = true;
                return;    
            }else {
                this.openLogoutHint = true;
                // sign();
            }
            // login();    
        },
        logOut() {
            logout().then(response => {
                console.log("log out: ",response);
                this.user = null;
                this.operationHistory = [];
                this.walletObj = [];
                this.tokenObj = [];
                this.walletSalt = 0;
                this.msglist = [{
                    id: 1,
                    type: 1,
                    content: 'Welcome！',
                    me: false
                }];
                this.walletAddress = null;
                this.openNotification("info", "Log out.");
                this.openLogoutHint = false;
            });  
        },
        quertOpAndOrders () {
            axios.post('/api/v1/query_op_orders', {
                    sender: this.walletAddress
                })
                    .then(response => {
                    console.log(response);
                    if (response.data.code == 1000) {
                        this.operationHistory = [];
                        // update order status
                        if (response.data.data != null && response.data.data.length > 0) {
                            
                            response.data.data.forEach(element => {
                                let operation = {
                                    action: null,
                                    details: null,
                                    status: null,
                                    txHash: null
                                };
                                if (element.Action == "TRANSFER") {
                                    let symbol = null;
                                    for (let index = 0; index < this.tokenObj.length; index++) {
                                        const elem = this.tokenObj[index];
                                        if (elem.address == element.Details.TokenIn) {
                                            symbol = this.tokenObj[index].token;
                                            // console.log("symbol: ", symbol);
                                            break;
                                        }
                                    }
                                    if (symbol == null || element.Details.TokenIn == "0x0000000000000000000000000000000000000000") {
                                        symbol = "eth";
                                    }
                                    let details = {tokenSymbol: symbol, amount: ethers.formatEther(element.Details.TokenInAmount)};
                                    operation.action = element.Action;
                                    operation.details = details;
                                    
                                    let status = {code: element.Status.Stat, error: element.Status.RevertReason};
                                    let txHash = element.TxHash;
                                    operation.status = status;
                                    operation.txHash = txHash;
                                    this.operationHistory.push(operation);
                                }
                                if (element.Action == "SWAP") {
                                    let symbolIn = null;
                                    let symbolOut = null;
                                    for (let index = 0; index < this.tokenObj.length; index++) {
                                        const elem = this.tokenObj[index];
                                        if (elem.address == element.Details.TokenIn) {
                                            symbolIn = this.tokenObj[index].token;
                                            // console.log("symbolIn: ", symbolIn);
                                        }
                                        if (elem.address == element.Details.TokenOut) {
                                            symbolOut = this.tokenObj[index].token;
                                            // console.log("symbolOut: ", symbolOut);
                                        }
                                    }

                                    if (symbolIn == null || element.Details.TokenIn == "0x0000000000000000000000000000000000000000") {
                                        symbolIn = "eth";
                                    }
                                    if (symbolOut == null || element.Details.TokenOut == "0x0000000000000000000000000000000000000000") {
                                        symbolOut = "eth";
                                    }
                                    let details = {tokenIn: symbolIn, amountIn: ethers.formatEther(element.Details.TokenInAmount), tokenOut: symbolOut};
                                    operation.action = element.Action;
                                    operation.details = details;
                                    
                                    let status = {code: element.Status.Stat, error: element.Status.RevertReason};
                                    let txHash = element.TxHash;
                                    operation.status = status;
                                    operation.txHash = txHash;
                                    this.operationHistory.push(operation);
                                }
                                if (element.Action == "LIMIT_ORDER") {
                                    let symbolIn = null;
                                    let symbolOut = null;
                                    for (let index = 0; index < this.tokenObj.length; index++) {
                                        const elem = this.tokenObj[index];
                                        if (elem.address == element.Details.TokenIn) {
                                            symbolIn = this.tokenObj[index].token;
                                            // console.log("symbolIn: ", symbolIn);
                                        }
                                        if (elem.address == element.Details.TokenOut) {
                                            symbolOut = this.tokenObj[index].token;
                                            // console.log("symbolOut: ", symbolOut);
                                        }
                                    }

                                    if (symbolIn == null || element.Details.TokenIn == "0x0000000000000000000000000000000000000000") {
                                        symbolIn = "eth";
                                    }
                                    if (symbolOut == null || element.Details.TokenOut == "0x0000000000000000000000000000000000000000") {
                                        symbolOut = "eth";
                                    }

                                    let details = {tokenIn: symbolIn, amountIn: ethers.formatEther(element.Details.TokenInAmount), tokenOut: symbolOut, amountOut: ethers.formatEther(element.Details.TokenOutAmount)};
                                    operation.action = element.Action;
                                    operation.details = details;
                                    
                                    let status = {code: element.Status.Stat, error: element.Status.RevertReason};
                                    let txHash = element.TxHash;
                                    operation.status = status;
                                    operation.txHash = txHash;
                                    this.operationHistory.push(operation);
                                }
                                if (element.Action == "COPY_ORDER") {
                                    // let symbolIn = null;
                                    // let symbolOut = null;
                                    operation.action = element.Action;
                                    let details = {tokenIn: "", amountIn: "", tokenOut: "", amountOut: ""};
                                    
                                    let status = {code: element.Status.Stat, error: element.Status.RevertReason};
                                    operation.status = status;
                                    operation.details = details;
                                    this.operationHistory.push(operation);
                                
                                }
                            });
                        }
                        console.log("operationHistory: ",this.operationHistory);
                        // update eth balance
                        getEthBalance(this.walletAddress).then((response) => {
                        if (response.status) {
                            this.tokenObj.forEach(element => {
                            if (element.token == "ETH") {
                                // console.log("eth balance:" + String(response.balance));
                                element.balance = this.formateNumber(ethers.formatEther(response.balance));
                            }
                            })
                        } else {
                            console.log("get ETH balance falied!");
                        }
                        });
                        // update  erc20 balance
                        for (let index = 1; index < this.tokenObj.length; index++) {
                        const element = this.tokenObj[index];
                        getErc20Balance(this.walletAddress, element.address).then((response) => {
                            if (response.status) {
                            // console.log(element.token + " balance:" + String(response.balance));
                            this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
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
        },
        scheduleTask() {
            const scheduleCronstyle = () => {
                //: schedule task will be executed every 5 minutes
                schedule.scheduleJob('*/1 * * * *', () => {
                // console.log('scheduleCronstyle:' + new Date());
                // query limited order status
                this.quertOpAndOrders();
                });
            }
            scheduleCronstyle();
            },
        submitLimitedSwap() {
            if (this.user == null) {
                this.openNotification("info", "Please connect wallet.");
                return;
            }
            if (this.walletAddress == null) {
                this.openNotification("info", "Please create smart contract account.");
                return;
            }
            if (this.ethLimitedAmount == undefined || this.erc20LimitedAmount == undefined) {
                this.openNotification("info", "Please enter the transaction amount.");
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
                ethToErc20LimitedDataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeyLimitedSrc), this.contractAddrMap.get(this.subKeyLimitedDes), this.fee, this.routerAddress, this.ethLimitedAmount, this.erc20LimitedAmount, this.chainId, this.platform).then(res => {
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
                                nonce: null,
                                paymaster_and_data: res.paymasterAndData,
                                pre_verification_gas: String(res.preVerificationGas),
                                sender: res.sender,
                                signature: res.signature,
                                verification_gas_limit: String(res.verificationGasLimit)
                            },
                            order_details: {
                                // order_no: timeStamp,// timestamp
                                token_in: this.contractAddrMap.get(this.subKeyLimitedSrc),
                                amount_in: String(ethers.parseUnits(this.ethLimitedAmount)),
                                token_out: this.contractAddrMap.get(this.subKeyLimitedDes),
                                amount_out: String(ethers.parseUnits(this.erc20LimitedAmount)),
                                fee: 0,
                                sender: this.walletAddress,
                                amount_out_minimum: String(ethers.parseUnits(this.erc20LimitedAmount)),//String(ethers.parseUnits(this.erc20LimitedAmount))
                            }
                        };
                        console.log("obj string:", JSON.stringify(obj));
                        // return;
                        axios.post('/api/v1/add_limit_order', obj)
                            .then(response => {
                                console.log(response);
                                if (response.data.code == 1000) {
                                    this.openNotification("success", "Swap successfully!");
                                    // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                    console.log("successfully submit!");

                                    // query op record
                                    this.quertOpAndOrders();
                                } else {
                                    this.openNotification("info", "Swap error! error: " + response.data.message);
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
                erc20ToEthLimitedDataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeyLimitedDes), this.contractAddrMap.get(this.subKeyLimitedSrc), this.fee, this.routerAddress, this.erc20LimitedAmount, this.ethLimitedAmount, this.chainId, this.platform).then(res => {
                    if (res != undefined) {
                        console.log("userOperation: ", res);
                        // let timeStamp = new Date().getTime();
                        // console.log("current timestamp: ", timeStamp);
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
                                nonce: null,
                                paymaster_and_data: res.paymasterAndData,
                                pre_verification_gas: String(res.preVerificationGas),
                                sender: res.sender,
                                signature: res.signature,
                                verification_gas_limit: String(res.verificationGasLimit)
                            },
                            order_details: {
                                token_in: this.contractAddrMap.get(this.subKeyLimitedDes),
                                amount_in: String(ethers.parseUnits(this.erc20LimitedAmount)),
                                token_out: this.contractAddrMap.get(this.subKeyLimitedSrc),
                                amount_out: String(ethers.parseUnits(this.ethLimitedAmount)),
                                fee: 0,
                                sender: this.walletAddress,
                                amount_out_minimum: String(ethers.parseUnits(this.ethLimitedAmount)),//String(ethers.parseUnits(this.ethLimitedAmount))
                            }
                        };
                        console.log("obj string:", JSON.stringify(obj));
                        // return;
                        axios.post('/api/v1/add_limit_order', obj)
                            .then(response => {
                                console.log(response);
                                if (response.data.code == 1000) {
                                    this.openNotification("success", "Swap successfully!");
                                    // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                    console.log("successfully submit!");

                                    // query op record
                                    this.quertOpAndOrders();
                                } else {
                                    this.openNotification("info", "Swap error! error: " + response.data.message);
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
        },
        submitSwap() {
            if (this.user == null) {
                this.openNotification("info", "Please connect wallet.");
                return;
            }
            if (this.walletAddress == null) {
                this.openNotification("info", "Please create smart contract account.");
                return;
            }
            if (this.ethAmount == undefined || this.erc20Amount == undefined) {
                this.openNotification("info", "Please enter the transaction amount.");
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
                ethToErc20DataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeySrc), this.contractAddrMap.get(this.subKeyDes), this.fee, this.routerAddress, this.ethAmount, amountOutMinimum, this.chainId, this.platform,this.submitSwapCallback).then(res => {
                    console.log("res:",res);  
                    if (res == undefined) {
                        this.iconLoading = false;
                        return;
                    }
                    // call exactInputSingle in relayer
                    let obj = {
                        beneficiary_addr: this.user,
                        op_action: "SWAP",
                        order_details: {
                            amount_in: String(ethers.parseUnits(this.ethAmount)),
                            amount_out: String(ethers.parseUnits(this.erc20Amount)),
                            amount_out_minimum: String(ethers.parseUnits(amountOutMinimum)),
                            fee: 0,
                            sender: this.walletAddress,
                            token_in: this.contractAddrMap.get(this.subKeySrc),
                            token_out: this.contractAddrMap.get(this.subKeyDes)
                        },
                        user_op: {
                            call_data: res.callData,
                            call_gas_limit: String(res.callGasLimit),
                            init_code: res.initCode,
                            max_fee_per_gas: String(res.maxFeePerGas),
                            max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                            nonce: null,
                            paymaster_and_data: res.paymasterAndData,
                            pre_verification_gas: String(res.preVerificationGas),
                            sender: res.sender,
                            signature: res.signature,
                            verification_gas_limit: String(res.verificationGasLimit)
                        }
                    };
                    console.log("obj string:", JSON.stringify(obj));
                    // return;
                    axios.post('/api/v1/handle_op', obj)
                        .then(response => {
                            console.log(response);
                            if (response.data.code == 1000) {
                                // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                console.log("swap successfully!");
                                this.openNotification("success", "Swap successfully!");

                                // query op record
                                this.quertOpAndOrders();

                                setTimeout(() => {
                                    // update eth balance
                                    getEthBalance(this.walletAddress).then((response) => {
                                        if (response.status) {
                                            this.tokenObj.forEach(element => {
                                                if (element.token == "ETH") {
                                                    // console.log("eth balance:" + String(response.balance));
                                                    element.balance = this.formateNumber(ethers.formatEther(response.balance));
                                                }
                                            })
                                        } else {
                                            console.log("get ETH balance falied!");
                                        }
                                    });
                                    // update  erc20 balance
                                    for (let index = 1; index < this.tokenObj.length; index++) {
                                        const element = this.tokenObj[index];
                                        getErc20Balance(this.walletAddress, element.address).then((response) => {
                                            if (response.status) {
                                                // console.log(element.token + " balance:" + String(response.balance));
                                                this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                                            } else {
                                                console.log("get " + element.token + " balance falied!");
                                            }
                                        });
                                    }
                                    this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                    this.iconLoading = false;
                                }, 15000);
                            } else {
                                this.openNotification("info", "Swap error! error: " + response.data.message);
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
                erc20ToEthDataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeyDes), this.contractAddrMap.get(this.subKeySrc), this.fee, this.routerAddress, this.erc20Amount, amountOutMinimum, this.chainId, this.platform,this.submitSwapCallback).then(res => {
                    if (res == undefined) {
                        this.iconLoading = false;
                        return;
                    }
                    // call exactInputSingle in relayer
                    let obj = {
                        beneficiary_addr: this.user,
                        op_action: "SWAP",
                        order_details: {
                            amount_in: String(ethers.parseUnits(this.erc20Amount)),
                            amount_out: String(ethers.parseUnits(this.ethAmount)),
                            amount_out_minimum: String(ethers.parseUnits(amountOutMinimum)),
                            fee: 0,
                            sender: this.walletAddress,
                            token_in: this.contractAddrMap.get(this.subKeyDes),
                            token_out: this.contractAddrMap.get(this.subKeySrc)
                        },
                        user_op: {
                            call_data: res.callData,
                            call_gas_limit: String(res.callGasLimit),
                            init_code: res.initCode,
                            max_fee_per_gas: String(res.maxFeePerGas),
                            max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                            nonce: null,
                            paymaster_and_data: res.paymasterAndData,
                            pre_verification_gas: String(res.preVerificationGas),
                            sender: res.sender,
                            signature: res.signature,
                            verification_gas_limit: String(res.verificationGasLimit)
                        }
                    };
                    console.log("obj string:", JSON.stringify(obj));
                    // return;
                    axios.post('/api/v1/handle_op', obj)
                        .then(response => {
                            console.log(response);
                            if (response.data.code == 1000) {
                                // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                console.log("swap successfully!");
                                this.openNotification("success", "Swap successfully!");

                                // query op record
                                this.quertOpAndOrders();

                                setTimeout(() => {
                                    // update eth balance
                                    getEthBalance(this.walletAddress).then((response) => {
                                        if (response.status) {
                                            this.tokenObj.forEach(element => {
                                                if (element.token == "ETH") {
                                                    // console.log("eth balance:" + String(response.balance));
                                                    element.balance = this.formateNumber(ethers.formatEther(response.balance));
                                                }
                                            })
                                        } else {
                                            console.log("get ETH balance falied!");
                                        }
                                    });
                                    // update  erc20 balance
                                    for (let index = 1; index < this.tokenObj.length; index++) {
                                        const element = this.tokenObj[index];
                                        getErc20Balance(this.walletAddress, element.address).then((response) => {
                                            if (response.status) {
                                                // console.log(element.token + " balance:" + String(response.balance));
                                                this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                                            } else {
                                                console.log("get " + element.token + " balance falied!");
                                            }
                                        });
                                    }
                                    this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                    this.iconLoading = false;
                                }, 15000);
                            } else {
                                this.openNotification("info", "Swap error! error: " + response.data.message);
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
                this.openNotification("success", "Swap successfully! Transaction hash: " + value.transactionHash);
                // update eth balance
                getEthBalance(this.walletAddress).then((response) => {
                    if (response.status) {
                        this.tokenObj.forEach(element => {
                            if (element.token == "ETH") {
                                // console.log("eth balance:" + String(response.balance));
                                element.balance = this.formateNumber(ethers.formatEther(response.balance));
                            }
                        })
                    } else {
                        console.log("get ETH balance falied!");
                    }
                });
                // update  erc20 balance
                for (let index = 1; index < this.tokenObj.length; index++) {
                    const element = this.tokenObj[index];
                    getErc20Balance(this.walletAddress, element.address).then((response) => {
                        if (response.status) {
                            // console.log(element.token + " balance:" + String(response.balance));
                            this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                        } else {
                            console.log("get " + element.token + " balance falied!");
                        }
                    });
                }
            } else {
                this.openNotification("error", "Swap Failed!");
            }
            // update loading icon
            this.iconLoading = false;
        },
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
        viewTx(txHash) {
            window.open('https://sepolia.etherscan.io/tx/' + txHash);
        },
        cancelLimitedOrder(orderNo) {
            for (let index = 0; index < this.orderData.length; index++) {
                const element = this.orderData[index];
                if (element.orderNo == orderNo) {
                    this.orderData.splice(index, 1);
                }
            }
            this.openNotification("success", "cancel successfully!");
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
            window.open('https://sepolia.etherscan.io/address/' + this.walletAddress);
        },
        async connect() {
            console.log("connect");
            if (this.user == null) {
                if (window.ethereum) {
                    window.ethereum.enable().then(res => {
                        console.log("res: ",res);
                        this.user = res[0];

                        // this.$refs.metamask.init();
                        getWeb3Provider();
                        this.platform = 1; //1 represent web3 platform, such as metamask
                        initInstances().then((response) => {
                            if (response.status) {
                                console.log("Init success");
                            } else {
                                console.log("Init failed");;
                            }
                        });
                        // this.user = this.$refs.metamask.MetaMaskAddress;
                        // MainPage.user = this.user;
                        console.log('user address:', this.user);
                        this.openLogin = false;
                        this.openNotification("success", "Log in.");
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
                                                    label: element.Account,
                                                    value: element.Account,
                                                    disabled: false,
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
                                                            this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
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
                                                        element.balance = this.formateNumber(ethers.formatEther(response.balance));
                                                    }
                                                })
                                            } else {
                                                console.log("get ETH balance falied!");
                                            }
                                        });

                                        // get operation history
                                        this.quertOpAndOrders();
                                    }
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    });
                }
            } else {
                return;
            }
        },
        // onComplete(data) {
        //     console.log("on complete:", data);
        //     // this.scheduleTask();
        //     // log out
        //     if (data.metaMaskAddress == "") {
        //         this.user = null;
        //         this.operationHistory = [];
        //         this.walletObj = [];
        //         this.tokenObj = [];
        //         // this.openNotification("info", "Log out.");
        //     } else {
        //         this.user = data.metaMaskAddress;
        //         // this.getTxHistory();
        //         getWeb3Provider();
        //         this.platform = 1; //1 represent web3 platform, such as metamask
        //         initInstances().then((response) => {
        //             if (response.status) {
        //                 console.log("Init success");

        //             } else {
        //                 console.log("Init failed");
        //             }
        //         });
        //         // we need get user data from backend service
        //         // 1. get user smart contract accounts
        //         // return;
        //         axios.post('/api/v1/query_contract_accounts', {
        //             user: this.user
        //         })
        //             .then(response => {
        //                 console.log(response);
        //                 if (response.data.code == 1000) {
        //                     console.log("Successfully obtained user smart contract account.");
        //                     if (response.data.data != null && response.data.data.length > 0) {
        //                         response.data.data.forEach(element => {
        //                             this.walletObj.push(
        //                                 {
        //                                     label: element.Account,
        //                                     value: element.Account,
        //                                     disabled: false,
        //                                     salt: element.Salt
        //                                 }
        //                             );
        //                             // default select first address
        //                             if (Number(element.Salt) == 0) {
        //                                 this.walletAddress = element.Account;

        //                                 // add first account address into asset list
        //                                 if (this.tokenObj.length == 0) {
        //                                     console.log("asset Address: ", element.Account);
        //                                     console.log("asset symbol: ", "ETH");
        //                                     let tmpObj = { token: "ETH", address: element.Account, balance: 0 };
        //                                     this.tokenObj.push(tmpObj);
        //                                 }
        //                             }
        //                             if (Number(element.Salt) > this.walletSalt) {
        //                                 // update user wallet salt
        //                                 this.walletSalt = Number(element.Salt);
        //                             }
        //                         })
        //                     }
        //                     console.log("this wallet address:", this.walletAddress);
        //                     console.log("this wallet salt:", this.walletSalt);

        //                     if (this.walletAddress != null) {
        //                         // before get balances, we need obtain asset list from backend service
        //                         axios.post('/api/v1/query_account_assets', {
        //                             sender: this.walletAddress
        //                         })
        //                             .then(response => {
        //                                 console.log(response);
        //                                 if (response.data.code == 1000) {
        //                                     console.log("Successfully obtained user asset list.");
        //                                     if (response.data.data != null && response.data.data.length > 0) {
        //                                         response.data.data.forEach(element => {
        //                                             console.log("asset Address: ", element.Address);
        //                                             console.log("asset symbol: ", element.Token);
        //                                             let tmpObj = { token: element.Token, address: element.Address, balance: 0 };
        //                                             this.tokenObj.push(tmpObj);

        //                                         })
        //                                     }
        //                                 }

        //                                 // update erc20 balance
        //                                 for (let index = 1; index < this.tokenObj.length; index++) {
        //                                     const element = this.tokenObj[index];
        //                                     getErc20Balance(this.walletAddress, element.address).then((response) => {
        //                                         if (response.status) {
        //                                             // console.log(element.token + " balance:" + String(response.balance));
        //                                             this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
        //                                         } else {
        //                                             console.log("get " + element.token + " balance falied!");
        //                                         }
        //                                     });
        //                                 }
        //                             })
        //                             .catch(error => {
        //                                 console.log(error);
        //                             });
        //                         // update  eth balance
        //                         getEthBalance(this.walletAddress).then((response) => {
        //                             if (response.status) {
        //                                 // console.log(element.token + " balance:" + response.balance.toNumber());
        //                                 this.tokenObj.forEach(element => {
        //                                     if (element.token == "ETH") {
        //                                         element.balance = this.formateNumber(ethers.formatEther(response.balance));
        //                                     }
        //                                 })
        //                             } else {
        //                                 console.log("get ETH balance falied!");
        //                             }
        //                         });

        //                         // get operation history
        //                         this.quertOpAndOrders();
        //                     }
        //                 }
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        //     }
        // },
        generateQR() {
            // GetEstimatedGasFee().then(res=>{
            //     console.log("gas fee: ",JSON.stringify(res)+"gwei");
            // });
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
        addWalletHint() {
            this.openAddWalletHint = true;
        },
        addWallet() {
            this.openAddWalletHint = false;
            console.log("this function will add a wallet address!");
            // first create account
            if (this.walletObj.length == 0) {
                console.log("this.walletSalt:",this.walletSalt);
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
                this.openNotification("success", "Create Account Address successfully! Address: " + value);
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
                this.openNotification("error", "Create Account Address Failed!");
                console.log("wallet salt should subtract 1");
                if (this.walletObj.length > 0) {
                    this.walletSalt = this.walletSalt - 1;
                }
            }
        },
        changeWallet(value) {
            this.walletAddress = value;
            this.openNotification("success", "wallet address changed! addr: " + this.walletAddress);
            this.tokenObj.forEach(element => {
                if (element.token == "ETH") {
                    element.address = this.walletAddress;
                }
            })
            console.log(this.tokenObj);
            // return;
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
                                this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                            } else {
                                console.log("get " + element.token + " balance falied!");
                            }
                        });
                    }
                    this.orderData = [];
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
                            element.balance = this.formateNumber(ethers.formatEther(response.balance));
                        }
                    })
                } else {
                    console.log("get ETH balance falied!");
                }
            });
            // get operation history
            this.quertOpAndOrders();
        },
        showEthTransfer() {
            this.depositEthOpen = true;
        },
        hideEthTransfer() {
            if (this.depositEth > 0 && this.depositEthAdd != null) {
                this.iconLoadingDepositEth = true;
                // deposit ETH
                // depositETH(this.walletAddress, this.depositEth, this.hideEthDepositCallback);

                let walletSalt = 0;
                // update walletIndex
                console.log("this.walletObj: ", this.walletObj);
                for (let index = 0; index < this.walletObj.length; index++) {
                    const element = this.walletObj[index];
                    if (element.value == this.walletAddress) {
                        walletSalt = element.salt;
                        console.log("wallet info: ", element);
                    }
                }

                transferETH(this.user, this.walletAddress, this.depositEthAdd, this.depositEth, walletSalt, this.chainId, this.platform, this.hideEthTransferCallback).then(res => {
                    if (res == undefined) {
                        this.iconLoadingDepositEth = false;
                        return;
                    }
                    // call exactInputSingle in relayer
                    let obj = {
                        beneficiary_addr: this.user,
                        op_action: "TRANSFER",
                            order_details: {
                            amount_in: String(ethers.parseUnits(this.depositEth)),
                            amount_out: null,
                            amount_out_minimum: null,
                            fee: 0,
                            sender: this.walletAddress,
                            token_in: "0x0000000000000000000000000000000000000000",
                            token_out: null
                        },
                        user_op: {
                            call_data: res.callData,
                            call_gas_limit: String(res.callGasLimit),
                            init_code: res.initCode,
                            max_fee_per_gas: String(res.maxFeePerGas),
                            max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                            nonce: null,
                            paymaster_and_data: res.paymasterAndData,
                            pre_verification_gas: String(res.preVerificationGas),
                            sender: res.sender,
                            signature: res.signature,
                            verification_gas_limit: String(res.verificationGasLimit)
                        }
                    };
                    console.log("obj string:", JSON.stringify(obj));
                    // return;
                    axios.post('/api/v1/handle_op', obj)
                        .then(response => {
                            console.log(response);
                            if (response.data.code == 1000) {
                                console.log("transfer successfully!");
                                this.openNotification("success", "Transfer successfully!");

                                // query op record
                                this.quertOpAndOrders();

                                setTimeout(() => {
                                    // update eth balance
                                    getEthBalance(this.walletAddress).then((response) => {
                                        if (response.status) {
                                            this.tokenObj.forEach(element => {
                                                if (element.token == "ETH") {
                                                    // console.log("eth balance:" + String(response.balance));
                                                    element.balance = this.formateNumber(ethers.formatEther(response.balance));
                                                }
                                            })
                                        } else {
                                            console.log("get ETH balance falied!");
                                        }
                                    });
                                    this.openNotification("success", "Transfer successfully! Transaction hash: " + response.data.data);
                                }, 15000);
                                this.iconLoadingDepositEth = false;
                            } else {
                                this.openNotification("info", "Transfer error! error: " + response.data.message);
                                console.log("Transfer error!");
                                this.iconLoadingDepositEth = false;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            this.iconLoadingDepositEth = false;
                        });

                    // clear params
                    this.depositEth = null;
                    this.depositEthAdd = null;
                    this.openNotification("info", "Transaction pending.");

                });

            }
            this.depositEthOpen = false;
        },
        hideEthTransferCallback(value) {
            console.log("receipt status:", value);

            // let status = {code: "1", error: null};
            // let txHash = value.transactionHash;
            // this.operation.status = status;
            // this.operation.txHash = txHash;
            // this.operationHistory.push(this.operation);

            if (value) {
                // notice: transaction success
                this.openNotification("success", "Transfer successfully! Transaction hash: " + value.transactionHash);
                // update  eth balance
                getEthBalance(this.walletAddress).then((response) => {
                    if (response.status) {
                        // console.log(element.token + " balance:" + response.balance.toNumber());
                        this.tokenObj.forEach(element => {
                            if (element.token == "ETH") {
                                element.balance = this.formateNumber(ethers.formatEther(response.balance));
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
                this.openNotification("error", "Deposit Failed!");
            }
            // update loading icon
            this.iconLoadingDepositEth = false;
        },
        cancelEthTransfer() {
            this.depositEth = null;
        },
        showErc20Transfer() {
            this.depositErc20Open = true;
        },
        hideErc20Transfer() {
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

                    let walletSalt = 0;
                    // update walletIndex
                    console.log("this.walletObj: ", this.walletObj);
                    for (let index = 0; index < this.walletObj.length; index++) {
                        const element = this.walletObj[index];
                        if (element.value == this.walletAddress) {
                            walletSalt = element.salt;
                            console.log("wallet info: ", element);
                        }
                    }
                    transferErc20(this.user, this.walletAddress, this.depositErc20Add, this.tokenObj[flag].address, this.depositErc20, walletSalt, this.chainId).then(res => {
                        if (res == undefined) {
                            this.iconLoadingDepositErc20 = false;
                            return;
                        }
                        // call exactInputSingle in relayer
                        console.log("this.depositErc20: ",this.depositErc20);
                        let obj = {
                            beneficiary_addr: this.user,
                            op_action: "TRANSFER",
                            order_details: {
                                amount_in: String(ethers.parseUnits(this.depositErc20)),
                                amount_out: null,
                                amount_out_minimum: null,
                                fee: 0,
                                sender: this.walletAddress,
                                token_in: this.tokenObj[flag].address,
                                token_out: null
                            },
                            user_op: {
                                call_data: res.callData,
                                call_gas_limit: String(res.callGasLimit),
                                init_code: res.initCode,
                                max_fee_per_gas: String(res.maxFeePerGas),
                                max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                                nonce: null,
                                paymaster_and_data: res.paymasterAndData,
                                pre_verification_gas: String(res.preVerificationGas),
                                sender: res.sender,
                                signature: res.signature,
                                verification_gas_limit: String(res.verificationGasLimit)
                            }
                        };
                        console.log("obj string:", JSON.stringify(obj));
                        // return;
                        axios.post('/api/v1/handle_op', obj)
                            .then(response => {
                                console.log(response);
                                if (response.data.code == 1000) {
                                    console.log("transfer successfully!");
                                    this.openNotification("success", "Transfer successfully!");

                                    // query op record
                                    this.quertOpAndOrders();

                                    setTimeout(() => {
                                        // update  erc20 balance
                                        for (let index = 1; index < this.tokenObj.length; index++) {
                                            const element = this.tokenObj[index];
                                            getErc20Balance(this.walletAddress, element.address).then((response) => {
                                                if (response.status) {
                                                    // console.log(element.token + " balance:" + String(response.balance));
                                                    this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                                                } else {
                                                    console.log("get " + element.token + " balance falied!");
                                                }
                                            });
                                        }
                                        this.openNotification("success", "Transfer successfully! Transaction hash: " + response.data.data);
                                    }, 15000);
                                    this.iconLoadingDepositErc20 = false;
                                }else {
                                    this.openNotification("error", "Transfer error!");
                                    this.iconLoadingDepositErc20 = false;
                                }
                            }).catch(error => {
                                console.log(error);
                                this.iconLoadingDepositErc20 = false;
                            });
                        
                        // clear params
                        this.depositErc20 = null;
                        this.depositErc20Add = null;
                        this.openNotification("info", "Transaction pending.");

                    }).catch(error => {
                        console.log(error);
                        this.iconLoadingDepositErc20 = false;
                    });


                } else {
                    this.notification("error", "Invaild token address!");
                }
            }
            this.depositErc20Open = false;
        },
        hideErc20TransferCallback(value) {
            console.log("receipt status:", value);

            // let status = {code: "1", error: null};
            // let txHash = value.transactionHash;
            // this.operation.status = status;
            // this.operation.txHash = txHash;
            // this.operationHistory.push(this.operation);

            if (value) {
                // notice: transaction success
                this.openNotification("success", "Transfer successfully! Transaction hash: " + value.transactionHash);
                // update  erc20 balance
                for (let index = 1; index < this.tokenObj.length; index++) {
                    const element = this.tokenObj[index];
                    getErc20Balance(this.walletAddress, element.address).then((response) => {
                        if (response.status) {
                            // console.log(element.token + " balance:" + String(response.balance));
                            this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                        } else {
                            console.log("get " + element.token + " balance falied!");
                        }
                    });
                }
            } else {
                this.openNotification("error", "Deposit Failed!");
            }
            // update loading icon
            this.iconLoadingDepositErc20 = false;
        },
        cancelErc20Transfer() {
            this.depositErc20 = null;
            this.depositErc20Add = null;
        },
        showEthReceive() {
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
                    if (element.value == this.walletAddress) {
                        walletSalt = element.salt;
                        console.log("wallet info: ", element);
                    }
                }
                withdrawETH(this.user, this.walletAddress, walletSalt, this.tokenObj[0].address, this.withdrawEth, this.chainId, this.hideEthWithdrawCallback);
                this.withdrawEth = null;

                this.openNotification("info", "Transaction pending.");
            }
            this.withdrawEthOpen = false;
        },
        hideEthWithdrawCallback(value) {
            console.log("receipt status:", value);
            if (value) {
                // notice: transaction success
                this.openNotification("success", "Withdraw successfully! Transaction hash: " + value.transactionHash);
                // update  eth balance
                getEthBalance(this.walletAddress).then((response) => {
                    if (response.status) {
                        this.tokenObj.forEach(element => {
                            if (element.token == "ETH") {
                                // console.log("eth balance:" + String(response.balance));
                                element.balance = this.formateNumber(ethers.formatEther(response.balance));
                            }
                        })
                    } else {
                        console.log("get ETH balance falied!");
                    }
                });
            } else {
                this.openNotification("error", "Withdraw Failed!");
            }
            // update loading icon
            this.iconLoadingWithdrawEth = false;
        },
        cancelEthWithdraw() {
            this.withdrawEth = null;
        },
        showErc20Receive() {
            // this.withdrawErc20Open = true;
            this.generateQR();
            this.openQR = true;
        },
        hideErc20Receive() {
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
                        if (element.value == this.walletAddress) {
                            walletSalt = element.salt;
                            console.log("wallet info: ", element);
                        }
                    }
                    withdrawERC20(this.user, this.walletAddress, walletSalt, this.tokenObj[flag].address, this.withdrawErc20, this.chainId, this.hideErc20ReceiveCallback);
                } else {
                    this.notification("error", "Invaild token address!");
                }
                this.withdrawErc20 = null;

                this.openNotification("info", "Transaction pending.");
            }
            this.withdrawErc20Open = false;
        },
        hideErc20ReceiveCallback(value) {
            console.log("receipt status:", value);
            if (value) {
                // notice: transaction success
                this.openNotification("success", "Withdraw erc20 successfully! Transaction hash: " + value.transactionHash);
                // update  erc20 balance
                for (let index = 1; index < this.tokenObj.length; index++) {
                    const element = this.tokenObj[index];
                    getErc20Balance(this.walletAddress, element.address).then((response) => {
                        if (response.status) {
                            // console.log(element.token + " balance:" + String(response.balance));
                            this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                        } else {
                            console.log("get " + element.token + " balance falied!");
                        }
                    });
                }
            } else {
                this.openNotification("error", "Withdraw erc20 Failed!");
            }
            // update loading icon
            this.iconLoadingWithdrawErc20 = false;
        },
        cancelErc20Receive() {
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
        openNotification(type, content) {
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
                this.openNotification("success", "Successfully add new asset.");
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
        menuNavigationRight(index) {
            this.numberRight = index;
        },
        send() {
            if (this.walletAddress == null) {
                this.openNotification("info","Please login");
                this.text = '';
                return;
            }
            if (this.text) {
                this.msglist.push({
                    id: this.msglist[this.msglist.length - 1].id + 1,
                    type: 1,
                    content: this.text,
                    me: true
                })
                // make user chat content at the bottom of chatwindow
                this.$nextTick(() => {
                        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
                    });
                if (this.text == "nihao") {
                    this.msglist.push({
                        id: this.msglist[this.msglist.length - 1].id + 1,
                        type: 1,
                        content: this.text,
                        me: false
                    });
                } else {
                    this.getResponse(this.text);
                }
                this.text = ''
            }
        },
        getResponse(text) {
            console.log("wallet address: ", this.walletAddress);
            axios.post('webhooks/rest/webhook', {
                "sender": this.walletAddress,
                "message": text
            }).then(res => {
                if (res != null) {
                    console.log(res);
                    if (res.data.length == 0) {
                        return;
                    }
                    for (let index = 0; index < res.data.length; index++) {
                        // show response data in chat window
                        this.msglist.push({
                            id: this.msglist[this.msglist.length - 1].id + 1,
                            type: 1,
                            content: res.data[index].text,
                            me: false
                        });
                        // make the latest content at the bottom of chatwindow
                        console.log(this.$refs.list);
                        this.$nextTick(() => {
                            this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
                        });
                        // resolve response data and call user operation

                        let data = res.data[index];
                        let operation = responseParser(data);
                        console.log("operation: ", operation);
                        // return;
                        if (operation.handles.length != 0) {
                            operation.handles.forEach(element => {
                                if (element.action == "COPY") {
                                    // call delegate function
                                    if (element.params.lenght != 0) {
                                        element.params.forEach(elem => {
                                            let walletSalt = 0;
                                            // update walletIndex
                                            console.log("this.walletObj: ", this.walletObj);
                                            for (let index = 0; index < this.walletObj.length; index++) {
                                                const element = this.walletObj[index];
                                                if (element.value == this.walletAddress) {
                                                    walletSalt = element.salt;
                                                    console.log("wallet info: ", element);
                                                }
                                            }
                                            delegate(this.user, this.walletAddress, this.chainId, this.platform, walletSalt).then(res => {
                                                if (res != undefined) {
                                                    console.log("userOperation: ", res);

                                                    // add order to limited order list
                                                    let obj = {
                                                        beneficiary_addr: this.user,
                                                        user_op: {
                                                            call_data: res.callData,
                                                            call_gas_limit: String(res.callGasLimit),
                                                            init_code: res.initCode,
                                                            max_fee_per_gas: String(res.maxFeePerGas),
                                                            max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                                                            nonce: null,
                                                            paymaster_and_data: res.paymasterAndData,
                                                            pre_verification_gas: String(res.preVerificationGas),
                                                            sender: res.sender,
                                                            signature: res.signature,
                                                            verification_gas_limit: String(res.verificationGasLimit)
                                                        },
                                                        order_details: {
                                                            limitAmountIn: String(ethers.parseUnits(elem.limitAmountIn)),
                                                            sender: res.sender,
                                                            targetAddr: elem.targetAddr
                                                        }
                                                    };
                                                    console.log("obj string:", JSON.stringify(obj));
                                                    // return;
                                                    axios.post('/api/v1/add_copy_order', obj)
                                                        .then(response => {
                                                            console.log(response);
                                                            if (response.data.code == 1000) {
                                                                this.openNotification("success", "Add copy order successfully!");
                                                                // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                                                console.log("Add copy order successfully!");

                                                                // query op record
                                                                this.quertOpAndOrders();
                                                            } else {
                                                                this.openNotification("info", "Add copy order error! error: " + response.data.message);
                                                                console.log("Add copy order error!");
                                                                // this.iconLoadingLimited = false;
                                                            }
                                                        })
                                                        .catch(error => {
                                                            console.log(error);
                                                        });
                                                    }
                                            });
                                        });
                                    }
                                }
                                if (element.action == "TRANSFER") {
                                    // call transfer function
                                    if (element.params.length != 0) {
                                        element.params.forEach(elem => {
                                            if (elem.token == "0x0000000000000000000000000000000000000000") {
                                                // call ETH transfer
                                                if (this.user == null) {
                                                    this.openNotification("info", "Please connect wallet.");
                                                    return;
                                                }
                                                if (this.walletAddress == null) {
                                                    this.openNotification("info", "Please create smart contract account.");
                                                    return;
                                                }
                                                let walletSalt = 0;
                                                // update walletIndex
                                                console.log("this.walletObj: ", this.walletObj);
                                                for (let index = 0; index < this.walletObj.length; index++) {
                                                    const element = this.walletObj[index];
                                                    if (element.value == this.walletAddress) {
                                                        walletSalt = element.salt;
                                                        console.log("wallet info: ", element);
                                                    }
                                                }
                                                
                                                transferETH(this.user, elem.sender, elem.receiver, elem.amount, walletSalt, this.chainId, this.platform,this.transferEthCallback).then(res => {
                                                    if (res == undefined) {
                                                        this.iconLoadingDepositEth = false;
                                                        return;
                                                    }
                                                    // call exactInputSingle in relayer
                                                    let obj = {
                                                        beneficiary_addr: this.user,
                                                        op_action: "TRANSFER",
                                                            order_details: {
                                                            amount_in: String(ethers.parseUnits(elem.amount)),
                                                            amount_out: null,
                                                            amount_out_minimum: null,
                                                            fee: 0,
                                                            sender: this.walletAddress,
                                                            token_in: "0x0000000000000000000000000000000000000000",
                                                            token_out: null
                                                        },
                                                        user_op: {
                                                            call_data: res.callData,
                                                            call_gas_limit: String(res.callGasLimit),
                                                            init_code: res.initCode,
                                                            max_fee_per_gas: String(res.maxFeePerGas),
                                                            max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                                                            nonce: null,
                                                            paymaster_and_data: res.paymasterAndData,
                                                            pre_verification_gas: String(res.preVerificationGas),
                                                            sender: res.sender,
                                                            signature: res.signature,
                                                            verification_gas_limit: String(res.verificationGasLimit)
                                                        }
                                                    };
                                                    console.log("obj string:", JSON.stringify(obj));
                                                    // return;
                                                    axios.post('/api/v1/handle_op', obj)
                                                        .then(response => {
                                                            console.log(response);
                                                            if (response.data.code == 1000) {
                                                                console.log("transfer successfully!");
                                                                this.openNotification("success", "Transfer successfully!");

                                                                // query op record
                                                                this.quertOpAndOrders();

                                                                setTimeout(() => {
                                                                    // update eth balance
                                                                    getEthBalance(this.walletAddress).then((response) => {
                                                                        if (response.status) {
                                                                            this.tokenObj.forEach(element => {
                                                                                if (element.token == "ETH") {
                                                                                    // console.log("eth balance:" + String(response.balance));
                                                                                    element.balance = this.formateNumber(ethers.formatEther(response.balance));
                                                                                }
                                                                            })
                                                                        } else {
                                                                            console.log("get ETH balance falied!");
                                                                        }
                                                                    });
                                                                    this.openNotification("success", "Transfer successfully! Transaction hash: " + response.data.data);
                                                                }, 15000);
                                                                // this.iconLoadingDepositEth = false;
                                                            } else {
                                                                this.openNotification("info", "Transfer error! error: " + response.data.message);
                                                                console.log("Transfer error!");
                                                                // this.iconLoadingDepositEth = false;
                                                            }
                                                        })
                                                        .catch(error => {
                                                            console.log(error);
                                                            // this.iconLoadingDepositEth = false;
                                                        });

                                                });
                                            } else {
                                                // call ERC20 transfer
                                                if (this.user == null) {
                                                    this.openNotification("info", "Please connect wallet.");
                                                    return;
                                                }
                                                if (this.walletAddress == null) {
                                                    this.openNotification("info", "Please create smart contract account.");
                                                    return;
                                                }
                                                let walletSalt = 0;
                                                // update walletIndex
                                                console.log("this.walletObj: ", this.walletObj);
                                                for (let index = 0; index < this.walletObj.length; index++) {
                                                    const element = this.walletObj[index];
                                                    if (element.value == this.walletAddress) {
                                                        walletSalt = element.salt;
                                                        console.log("wallet info: ", element);
                                                    }
                                                }
                                                let symbol = null;
                                                for (let index = 0; index < this.tokenObj.length; index++) {
                                                    const element = this.tokenObj[index];
                                                    if (element.address == elem.token) {
                                                        symbol = this.tokenObj[index].token;
                                                        console.log("symbol: ", symbol);
                                                    }
                                                }
                                                if (symbol == null) {
                                                    this.openNotification("info", "You don't have this asset.");
                                                    return;
                                                }
                                                
                                                transferErc20(this.user, elem.sender, elem.receiver, elem.token, elem.amount, walletSalt, this.chainId, this.platform,this.transferErc20Callback).then(res => {
                                                    if (res == undefined) {
                                                        this.iconLoadingDepositErc20 = false;
                                                        return;
                                                    }
                                                    // call exactInputSingle in relayer
                                                    let obj = {
                                                        beneficiary_addr: this.user,
                                                        op_action: "TRANSFER",
                                                        order_details: {
                                                            amount_in: String(ethers.parseUnits(elem.amount)),
                                                            amount_out: null,
                                                            amount_out_minimum: null,
                                                            fee: 0,
                                                            sender: this.walletAddress,
                                                            token_in: elem.token,
                                                            token_out: null
                                                        },
                                                        user_op: {
                                                            call_data: res.callData,
                                                            call_gas_limit: String(res.callGasLimit),
                                                            init_code: res.initCode,
                                                            max_fee_per_gas: String(res.maxFeePerGas),
                                                            max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                                                            nonce: null,
                                                            paymaster_and_data: res.paymasterAndData,
                                                            pre_verification_gas: String(res.preVerificationGas),
                                                            sender: res.sender,
                                                            signature: res.signature,
                                                            verification_gas_limit: String(res.verificationGasLimit)
                                                        }
                                                    };
                                                    console.log("obj string:", JSON.stringify(obj));
                                                    // return;
                                                    axios.post('/api/v1/handle_op', obj)
                                                        .then(response => {
                                                            console.log(response);
                                                            if (response.data.code == 1000) {
                                                                console.log("transfer successfully!");
                                                                this.openNotification("success", "Transfer successfully!");

                                                                // query op record
                                                                this.quertOpAndOrders();

                                                                setTimeout(() => {
                                                                    // update  erc20 balance
                                                                    for (let index = 1; index < this.tokenObj.length; index++) {
                                                                        const element = this.tokenObj[index];
                                                                        getErc20Balance(this.walletAddress, element.address).then((response) => {
                                                                            if (response.status) {
                                                                                // console.log(element.token + " balance:" + String(response.balance));
                                                                                this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                                                                            } else {
                                                                                console.log("get " + element.token + " balance falied!");
                                                                            }
                                                                        });
                                                                    }
                                                                    this.openNotification("success", "Transfer successfully! Transaction hash: " + response.data.data);
                                                                }, 15000);
                                                                // this.iconLoadingDepositErc20 = false;
                                                            }else {
                                                                this.openNotification("error", "Transfer error!");
                                                            }
                                                        }).catch(error => {
                                                            console.log(error);
                                                            // this.iconLoadingDepositErc20 = false;
                                                        });

                                                }).catch(error => {
                                                    console.log(error);
                                                    // this.iconLoadingDepositErc20 = false;
                                                });
                                            }
                                        });
                                    }
                                }
                                if (element.action == "SWAP") {
                                    if (this.user == null) {
                                        this.openNotification("info", "Please connect wallet.");
                                        return;
                                    }
                                    if (this.walletAddress == null) {
                                        this.openNotification("info", "Please create smart contract account.");
                                        return;
                                    }

                                    // call swap function
                                    if (element.params.lenght != 0) {
                                        element.params.forEach(elem => {
                                            if (elem.minimalAmountOut == "0") {
                                                // market order
                                                // if tokenIn is eth call ethToErc20DataOperationWrapper
                                                if (elem.tokenIn == "0x0000000000000000000000000000000000000000") {
                                                    let walletSalt = 0;
                                                    // update walletIndex
                                                    console.log("this.walletObj: ", this.walletObj);
                                                    for (let index = 0; index < this.walletObj.length; index++) {
                                                        const element = this.walletObj[index];
                                                        if (element.value == this.walletAddress) {
                                                            walletSalt = element.salt;
                                                            console.log("wallet info: ", element);
                                                        }
                                                    }

                                                    let symbol = null;
                                                    for (let index = 0; index < this.tokenObj.length; index++) {
                                                        const element = this.tokenObj[index];
                                                        if (element.address == elem.tokenOut) {
                                                            symbol = this.tokenObj[index].token;
                                                            console.log("symbol: ", symbol);
                                                        }

                                                    }
                                                    if (symbol == null) {
                                                        this.openNotification("info", "You don't have this asset.");
                                                        return;
                                                    }
                                                    ethToErc20DataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get("eth"), elem.tokenOut, this.fee, this.routerAddress, elem.amountIn, elem.minimalAmountOut, this.chainId, this.platform).then(res => {
                                                        console.log("===res===:", res);
                                                        if (res == undefined) {
                                                            this.iconLoading = false;
                                                            return;
                                                        }
                                                        // call exactInputSingle in relayer
                                                        let obj = {
                                                            beneficiary_addr: this.user,
                                                            op_action: "SWAP",
                                                            order_details: {
                                                                amount_in: String(ethers.parseUnits(elem.amountIn)),
                                                                amount_out: String(ethers.parseUnits(elem.minimalAmountOut)),
                                                                amount_out_minimum: String(ethers.parseUnits(elem.minimalAmountOut)),
                                                                fee: 0,
                                                                sender: this.walletAddress,
                                                                token_in: this.contractAddrMap.get("eth"),
                                                                token_out: elem.tokenOut
                                                            },
                                                            user_op: {
                                                                call_data: res.callData,
                                                                call_gas_limit: String(res.callGasLimit),
                                                                init_code: res.initCode,
                                                                max_fee_per_gas: String(res.maxFeePerGas),
                                                                max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                                                                // nonce: String(res.nonce),
                                                                paymaster_and_data: res.paymasterAndData,
                                                                pre_verification_gas: String(res.preVerificationGas),
                                                                sender: res.sender,
                                                                signature: res.signature,
                                                                verification_gas_limit: String(res.verificationGasLimit)
                                                            }
                                                        };
                                                        console.log("obj string:", JSON.stringify(obj));
                                                        // return;
                                                        axios.post('/api/v1/handle_op', obj)
                                                            .then(response => {
                                                                console.log(response);
                                                                if (response.data.code == 1000) {
                                                                    // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                                                    console.log("swap successfully!");
                                                                    this.openNotification("success", "Swap successfully!");

                                                                    // query op record
                                                                    this.quertOpAndOrders();

                                                                    setTimeout(() => {
                                                                        // update eth balance
                                                                        getEthBalance(this.walletAddress).then((response) => {
                                                                            if (response.status) {
                                                                                this.tokenObj.forEach(element => {
                                                                                    if (element.token == "ETH") {
                                                                                        // console.log("eth balance:" + String(response.balance));
                                                                                        element.balance = this.formateNumber(ethers.formatEther(response.balance));
                                                                                    }
                                                                                })
                                                                            } else {
                                                                                console.log("get ETH balance falied!");
                                                                            }
                                                                        });
                                                                        // update  erc20 balance
                                                                        for (let index = 1; index < this.tokenObj.length; index++) {
                                                                            const element = this.tokenObj[index];
                                                                            getErc20Balance(this.walletAddress, element.address).then((response) => {
                                                                                if (response.status) {
                                                                                    // console.log(element.token + " balance:" + String(response.balance));
                                                                                    this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                                                                                } else {
                                                                                    console.log("get " + element.token + " balance falied!");
                                                                                }
                                                                            });
                                                                        }
                                                                        this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                                                        // this.iconLoading = false;
                                                                    }, 15000);
                                                                } else {
                                                                    this.openNotification("info", "Swap error! error: " + response.data.message);
                                                                    console.log("swap error!");
                                                                    // this.iconLoading = false;
                                                                }
                                                            })
                                                            .catch(error => {
                                                                console.log(error);
                                                                // this.iconLoading = false;
                                                            });
                                                    });
                                                } else {
                                                    // call erc20ToEthDataOperationWrapper
                                                    let walletSalt = 0;
                                                    // update walletIndex
                                                    console.log("this.walletObj: ", this.walletObj);
                                                    for (let index = 0; index < this.walletObj.length; index++) {
                                                        const element = this.walletObj[index];
                                                        if (element.value == this.walletAddress) {
                                                            walletSalt = element.salt;
                                                            console.log("wallet info: ", element);
                                                        }
                                                    }

                                                    let symbol = null;
                                                    for (let index = 0; index < this.tokenObj.length; index++) {
                                                        const element = this.tokenObj[index];
                                                        if (element.address == elem.tokenIn) {
                                                            symbol = this.tokenObj[index].token;
                                                            console.log("symbol: ", symbol);
                                                        }

                                                    }
                                                    if (symbol == null) {
                                                        this.openNotification("info", "You don't have this asset.");
                                                        return;
                                                    }
                                                    erc20ToEthDataOperationWrapper(this.user, this.walletAddress, walletSalt, elem.tokenIn, this.contractAddrMap.get("eth"), this.fee, this.routerAddress, elem.amountIn, elem.minimalAmountOut, this.chainId, this.platform).then(res => {
                                                        console.log("===res===:", res);
                                                        if (res == undefined) {
                                                            this.iconLoading = false;
                                                            return;
                                                        }
                                                        // call exactInputSingle in relayer
                                                        let obj = {
                                                            beneficiary_addr: this.user,
                                                            op_action: "SWAP",
                                                            order_details: {
                                                                amount_in: String(ethers.parseUnits(elem.amountIn)),
                                                                amount_out: String(ethers.parseUnits(elem.minimalAmountOut)),
                                                                amount_out_minimum: String(ethers.parseUnits(elem.minimalAmountOut)),
                                                                fee: 0,
                                                                sender: this.walletAddress,
                                                                token_in: elem.tokenIn,
                                                                token_out: this.contractAddrMap.get("eth")
                                                            },
                                                            user_op: {
                                                                call_data: res.callData,
                                                                call_gas_limit: String(res.callGasLimit),
                                                                init_code: res.initCode,
                                                                max_fee_per_gas: String(res.maxFeePerGas),
                                                                max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                                                                // nonce: String(res.nonce),
                                                                paymaster_and_data: res.paymasterAndData,
                                                                pre_verification_gas: String(res.preVerificationGas),
                                                                sender: res.sender,
                                                                signature: res.signature,
                                                                verification_gas_limit: String(res.verificationGasLimit)
                                                            }
                                                        };
                                                        console.log("obj string:", JSON.stringify(obj));
                                                        // return;
                                                        axios.post('/api/v1/handle_op', obj)
                                                            .then(response => {
                                                                console.log(response);
                                                                if (response.data.code == 1000) {
                                                                    // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                                                    console.log("swap successfully!");
                                                                    this.openNotification("success", "Swap successfully!");

                                                                    // query op record
                                                                    this.quertOpAndOrders();

                                                                    setTimeout(() => {
                                                                        // update eth balance
                                                                        getEthBalance(this.walletAddress).then((response) => {
                                                                            if (response.status) {
                                                                                this.tokenObj.forEach(element => {
                                                                                    if (element.token == "ETH") {
                                                                                        // console.log("eth balance:" + String(response.balance));
                                                                                        element.balance = this.formateNumber(ethers.formatEther(response.balance));
                                                                                    }
                                                                                })
                                                                            } else {
                                                                                console.log("get ETH balance falied!");
                                                                            }
                                                                        });
                                                                        // update  erc20 balance
                                                                        for (let index = 1; index < this.tokenObj.length; index++) {
                                                                            const element = this.tokenObj[index];
                                                                            getErc20Balance(this.walletAddress, element.address).then((response) => {
                                                                                if (response.status) {
                                                                                    // console.log(element.token + " balance:" + String(response.balance));
                                                                                    this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                                                                                } else {
                                                                                    console.log("get " + element.token + " balance falied!");
                                                                                }
                                                                            });
                                                                        }
                                                                        this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                                                        // this.iconLoading = false;
                                                                    }, 15000);
                                                                } else {
                                                                    this.openNotification("info", "Swap error! error: " + response.data.message);
                                                                    console.log("swap error!");
                                                                    // this.iconLoading = false;
                                                                }
                                                            })
                                                            .catch(error => {
                                                                console.log(error);
                                                                // this.iconLoading = false;
                                                            });
                                                    });
                                                }
                                            } else {
                                                // limited order
                                                if (this.user == null) {
                                                    this.openNotification("info", "Please connect wallet.");
                                                    return;
                                                }
                                                if (this.walletAddress == null) {
                                                    this.openNotification("info", "Please create smart contract account.");
                                                    return;
                                                }
                                                // if tokenIn is eth call ethToErc20LimitedDataOperationWrapper
                                                if (elem.tokenIn == "0x0000000000000000000000000000000000000000") {

                                                    let walletSalt = 0;
                                                    // update walletIndex
                                                    console.log("this.walletObj: ", this.walletObj);
                                                    for (let index = 0; index < this.walletObj.length; index++) {
                                                        const element = this.walletObj[index];
                                                        if (element.value == this.walletAddress) {
                                                            walletSalt = element.salt;
                                                            console.log("wallet info: ", element);
                                                        }
                                                    }

                                                    
                                                    let symbol = null;
                                                    for (let index = 0; index < this.tokenObj.length; index++) {
                                                        const element = this.tokenObj[index];
                                                        if (element.address == elem.tokenOut) {
                                                            symbol = this.tokenObj[index].token;
                                                            console.log("symbol: ", symbol);
                                                        }

                                                    }
                                                    if (symbol == null) {
                                                    this.openNotification("info", "You don't have this asset.");
                                                    return;
                                                    }
                                                    
                                                    ethToErc20LimitedDataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get("eth"), elem.tokenOut, this.fee, this.routerAddress, elem.amountIn, elem.minimalAmountOut, this.chainId, this.platform).then(res => {

                                                        if (res != undefined) {
                                                            console.log("userOperation: ", res);

                                                            // add order to limited order list
                                                            let obj = {
                                                                beneficiary_addr: this.user,
                                                                user_op: {
                                                                    call_data: res.callData,
                                                                    call_gas_limit: String(res.callGasLimit),
                                                                    init_code: res.initCode,
                                                                    max_fee_per_gas: String(res.maxFeePerGas),
                                                                    max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                                                                    nonce: null,
                                                                    paymaster_and_data: res.paymasterAndData,
                                                                    pre_verification_gas: String(res.preVerificationGas),
                                                                    sender: res.sender,
                                                                    signature: res.signature,
                                                                    verification_gas_limit: String(res.verificationGasLimit)
                                                                },
                                                                order_details: {
                                                                    // order_no: timeStamp,// timestamp
                                                                    token_in: this.contractAddrMap.get("eth"),
                                                                    amount_in: String(ethers.parseUnits(elem.amountIn)),
                                                                    token_out: elem.tokenOut,
                                                                    amount_out: String(ethers.parseUnits(elem.minimalAmountOut)),
                                                                    fee: 0,
                                                                    sender: this.walletAddress,
                                                                    amount_out_minimum: String(ethers.parseUnits(elem.minimalAmountOut)),//String(ethers.parseUnits(this.erc20LimitedAmount))
                                                                }
                                                            };

                                                            console.log("obj string:", JSON.stringify(obj));
                                                            // return;
                                                            axios.post('/api/v1/add_limit_order', obj)
                                                                .then(response => {
                                                                    console.log(response);
                                                                    if (response.data.code == 1000) {
                                                                        this.openNotification("success", "Swap successfully!");
                                                                        // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                                                        console.log("successfully submit!");

                                                                        // query op record
                                                                        this.quertOpAndOrders();
                                                                    } else {
                                                                        this.openNotification("info", "Swap error! error: " + response.data.message);
                                                                        console.log("swap error!");
                                                                        // this.iconLoadingLimited = false;
                                                                    }
                                                                })
                                                                .catch(error => {
                                                                    console.log(error);
                                                                });
                                                        }

                                                        // this.iconLoadingLimited = false;
                                                    });
                                                } else {
                                                    let walletSalt = 0;
                                                    // update walletIndex
                                                    console.log("this.walletObj: ", this.walletObj);
                                                    for (let index = 0; index < this.walletObj.length; index++) {
                                                        const element = this.walletObj[index];
                                                        if (element.value == this.walletAddress) {
                                                            walletSalt = element.salt;
                                                            console.log("wallet info: ", element);
                                                        }
                                                    }

                                                    let symbol = null;
                                                    for (let index = 0; index < this.tokenObj.length; index++) {
                                                        const element = this.tokenObj[index];
                                                        if (element.address == elem.tokenOut) {
                                                            symbol = this.tokenObj[index].token;
                                                            console.log("symbol: ", symbol);
                                                        }

                                                    }
                                                    if (symbol == null) {
                                                        this.openNotification("info", "You don't have this asset.");
                                                        return;
                                                    }

                                                    erc20ToEthLimitedDataOperationWrapper(this.user, this.walletAddress, walletSalt, elem.tokenIn, this.contractAddrMap.get("eth"), this.fee, this.routerAddress, elem.amountIn, elem.minimalAmountOut, this.chainId, this.platform).then(res => {
                                                        if (res != undefined) {
                                                            console.log("userOperation: ", res);

                                                            let obj = {
                                                                beneficiary_addr: this.user,
                                                                user_op: {
                                                                    call_data: res.callData,
                                                                    call_gas_limit: String(res.callGasLimit),
                                                                    init_code: res.initCode,
                                                                    max_fee_per_gas: String(res.maxFeePerGas),
                                                                    max_priority_fee_per_gas: String(res.maxPriorityFeePerGas),
                                                                    nonce: null,
                                                                    paymaster_and_data: res.paymasterAndData,
                                                                    pre_verification_gas: String(res.preVerificationGas),
                                                                    sender: res.sender,
                                                                    signature: res.signature,
                                                                    verification_gas_limit: String(res.verificationGasLimit)
                                                                },
                                                                order_details: {
                                                                    token_in: elem.tokenIn,
                                                                    amount_in: String(ethers.parseUnits(elem.amountIn)),
                                                                    token_out: this.contractAddrMap.get("eth"),
                                                                    amount_out: String(ethers.parseUnits(elem.minimalAmountOut)),
                                                                    fee: 0,
                                                                    sender: this.walletAddress,
                                                                    amount_out_minimum: String(ethers.parseUnits(elem.minimalAmountOut)),//String(ethers.parseUnits(this.ethLimitedAmount))
                                                                }
                                                            };
                                                            console.log("obj string:", JSON.stringify(obj));
                                                            // return;
                                                            axios.post('/api/v1/add_limit_order', obj)
                                                                .then(response => {
                                                                    console.log(response);
                                                                    if (response.data.code == 1000) {
                                                                        this.openNotification("success", "Swap successfully!");
                                                                        // this.openNotification("success", "Swap successfully! Transaction hash: " + response.data.data);
                                                                        console.log("successfully submit!");

                                                                        // query op record
                                                                        this.quertOpAndOrders();
                                                                    } else {
                                                                        this.openNotification("info", "Swap error! error: " + response.data.message);
                                                                        console.log("swap error!");
                                                                    }
                                                                })
                                                                .catch(error => {
                                                                    console.log(error);
                                                                });
                                                        }
                                                    });

                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            })
        },
        transferEthCallback(value) {
            console.log("receipt status:", value);
            if (value) {
                // notice: transaction success
                this.openNotification("success", "Transfer successfully! Transaction hash: " + value.transactionHash);
                let status = { code: "1", error: null };
                let txHash = value.transactionHash;
                this.operation.status = status;
                this.operation.txHash = txHash;
                this.operationHistory.push(this.operation);
                // update  eth balance
                getEthBalance(this.walletAddress).then((response) => {
                    if (response.status) {
                        // console.log(element.token + " balance:" + response.balance.toNumber());
                        this.tokenObj.forEach(element => {
                            if (element.token == "ETH") {
                                element.balance = this.formateNumber(ethers.formatEther(response.balance));
                            }
                        })
                    } else {
                        console.log("get ETH balance falied!");
                    }
                });
            } else {
                this.openNotification("error", "Transfer Failed!");
            }
        },
        changeMode() {
            this.mode = this.mode == "automatic" ? "manual" : "automatic";
        },
        async copyWalletAdd() {
            console.log("current wallet address: ", this.walletAddress);
            try {
                await toClipboard(this.walletAddress);
                // alert("c");
                this.openNotification("success", "Address copyed.");
            } catch (e) {
                console.error(e);
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
    }

}

</script>