<template>
  <a-layout style="height: 100vh;">
    <a-layout-header style="height: 7vh; background: #f5f5f5; padding: 0; text-align: left; font-weight: bolder; font-size: 30px;">
      <img src="../assets/logo.svg" style="height: 55px;width: 55px; padding-left: 10px;  padding-bottom: 5px; cursor: pointer" @click="homePage()">
      Sparky
      <!-- <img src="../assets/trumpet.svg" style="height: 20px;width: 20px; margin-left: 20px;"> -->
      <span style="font-size: 15px; font-weight: 400; margin-left: 5px;">
        <label style="position: absolute; width: 1050px; height: 50px;margin-top: 5px; margin-left: 10px;">
          <!-- <NoticeBar style="position: relative; width: 70%;"></NoticeBar> -->
        </label>
        <span style="position: absolute; width: 1600px; right: 0%;">
          <label style="height:7vh; position: absolute; width: 100px; right: 23%; top: 0px;">
            <span>
              <img src="../assets/bsc.svg" style="height: 18px;width: 18px; margin-left: 0px;">
              BSC
            </span>
          </label>
          <label style="height:7vh; padding-left: 10px;position: absolute;right: 9%;border-left-style: solid;border-left-color: rgb(204, 204, 204); border-left-width: thin;">
            <!-- <a-dropdown v-if="this.walletAddress != null">
              <a class="ant-dropdown-link" @click.prevent>
                {{ this.walletAddress.substring(0, 10) + '...' + this.walletAddress.substring(this.walletAddress.length - 10) }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu @click="changeWallet">
                  <a-menu-item v-for="item in walletObj" :key="item.value">{{ item.label.substring(0, 10) + '...' + item.label.substring(item.label.length - 10) }}</a-menu-item>
                  
                </a-menu>
              </template>
            </a-dropdown> -->
            <!-- <a-dropdown v-else>
              <a class="ant-dropdown-link" @click.prevent>
                <DownOutlined />
              </a>
            </a-dropdown> -->
            <PlusCircleOutlined style="padding-right: 10px;" @click="addWalletHint"/>
            <a-select :size="size" :default-value=walletObj[0] :key=walletObj[0]
              style="width: 200px; border: 0px;" @select="changeWallet">
              <a-select-option style="text-align: center;" :value="item.value" :disabled="item.disabled"
                v-for="item in walletObj" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
            <a-dropdown placement="bottom" >
              <a class="ant-dropdown-link" @click.prevent>
                <SmallDashOutlined style="padding-left: 10px;"/>
              </a>
              <template #overlay>
                <a-menu style="text-align: center;">
                  <a-menu-item :key="1" style="font-size: 15px;" @click="copyWalletAdd">Copy address</a-menu-item>
                  <a-menu-item :key="2" style="font-size: 15px;" @click="browser">View in BscScan</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </label>
          <label style="height:7vh; padding-left: 10px;position: absolute;right: 25px;border-left-style: solid;border-left-color: rgb(204, 204, 204); border-left-width: thin;">
            <a-dropdown v-if="this.user == null" placement="bottom">
              <a class="ant-dropdown-link" @click.prevent>
                Login
                <DownOutlined v-if="iconLoadingLogin == false"/>
                <LoadingOutlined v-else/>
              </a>
              <template #overlay>
                <a-menu style="text-align: center;">
                  <a-menu-item :key="1" style="font-size: 15px;" @click="googleLogin">Google</a-menu-item>
                  <a-menu-item :key="2" style="font-size: 15px;" @click="connect">MetaMask</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-dropdown v-else placement="bottom">
              <a class="ant-dropdown-link" @click.prevent>
                {{ this.platform == 0 ? this.emailAddress.substring(0, 4) + '...' + this.emailAddress.substring(this.emailAddress.length - 4) : this.user.substring(0, 4) + '...' + this.user.substring(this.user.length - 4) }}
                <DownOutlined/>
              </a>
              <template #overlay>
                <a-menu @click="showLogin" style="text-align: center;">
                  <a-menu-item :key="1" style="font-size: 15px;">Logout</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <!-- <a-button v-if="this.user == null" :loading="iconLoadingLogin" type="primary" danger
              style="position: absolute; right: 10px; top: 15px; background-color: rgb(128, 221, 243);" @click="showLogin()">Login
              </a-button>
            <a-button v-if="this.user != null" type="primary" danger style="position: absolute; right: 10px; top: 15px; background-color: rgb(128, 221, 243);"
              @click="showLogin()">
              {{ this.user.substring(0, 5) + '...' + this.user.substring(this.user.length - 4) }}
              </a-button> -->
          </label>
        </span>
      </span>
    </a-layout-header>

    <a-layout>
      <!-- <a-layout-header style="background: #d2e193; padding: 0">Sparky</a-layout-header> -->
      <a-layout-sider :defaultCollapsed=true>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="1">
            <DollarOutlined />
            <span>Asset</span>
          </a-menu-item>
          <a-menu-item key="2">
            <CommentOutlined />
            <span>Chat</span>
          </a-menu-item>
          <a-menu-item key="3">
            <HistoryOutlined />
            <span>History</span>
          </a-menu-item>
          <a-menu-item key="4">
            <SettingOutlined />
            <span>Setting</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" collapsible collapsedWidth="0.01" theme="light"
          :style="{background: 'white', overflow: 'auto', }">
          <!-- <div style="color: black;">abc</div>
          <div style="color: black;">def</div> -->
          <div id="contentAsset" v-show="selectedKeys == 1">
            <span class="menuTitle">Assets</span>
              <span ref="tokenList">
                  <span v-for="value in tokenObj">
                      <a-button type="text" style="text-align: center; width: 100%; height: 50px; border-radius: 0px;margin-left: 0px;"
                          @click="showOperateDrawer(value)">
                          <DollarOutlined />
                          <span>{{ value.token }}</span><span>:&nbsp</span><span>{{ value.balance }}</span>
                      </a-button>
                  </span>
              </span>
              <!-- @click="openNotification('success')" -->
              <PlusCircleFilled style="padding-top: 10px;" @click="showAddErc20Drawer"/>
              <!-- <a-button type="primary" shape="circle" @click="showAddErc20Drawer()" style="background: #80ddf3;">+</a-button> -->
          </div>
          <div id="chatManagement" v-show="selectedKeys == 2">
            <span class="menuTitle">Chat List</span>
            <a-button style="margin-top: 10px; width: 175px; background-color:#ccc; color: #f5f5f5;">+ create new chat</a-button>
            <span>
              <span v-for="value in chatObj">
                <a-button type="text" style=" text-align: center; width: 100%; height: 40px; border-radius: 0px;">
                    <CommentOutlined />
                    <span style="width: 100px;">{{ value.title }}</span>
                    <EditOutlined />
                    <DeleteOutlined />
                </a-button>  
              </span>
            </span>
          </div>
          <div id="operationHistory" v-show="selectedKeys == 3">
            <span class="menuTitle">History</span>
              <span>
                  <a-list size="large" :split="true" :data-source="operationHistory"
                      style="margin-top: 5%; margin-bottom:8%; width: 90%; margin-left: 5%;text-align: left; background: white;">
                      <template #renderItem="{ item }">
                          <a-list-item>
                              <!--status.code: 0 pending 1 finish success-->
                              <span v-show="item.action == 'TRANSFER'" style="font-weight: 700; font-size: 11px;">{{ item.action }}&nbsp
                                  <span v-show="item.status.code == 'pending'">
                                  <img style="width: 15px; height:15px;" src = "../assets/X.svg">
                                  <span style="position: absolute;right: 10px; font-size: 12px; color: rgb(255 189 89);">Pending</span>
                                  </span>
                                  <span v-show="item.status.code == 'success' || item.status.code == 'failed'">
                                      <img style="width: 20px; height:20px; cursor:pointer" src="../assets/jumpto.svg"
                                          @click="viewTx(item.txHash)">
                                      <span v-if="item.status.code == 'success'"
                                          style="position: absolute;right: 10px; font-size: 12px; color: green;">Finish</span>
                                      <span v-if="item.status.code == 'failed'"
                                          style="position: absolute;right: 10px; font-size: 12px; color: rgb(227, 91, 17);">Failed</span>
                                  </span>
                                  <br />
                                  <span v-if="item.status.code == 'success'" style="font-size: smaller; font-weight:500;">
                                      {{ item.details.amount }}&nbsp{{ item.details.tokenSymbol }}
                                  </span>
                                  <span v-if="item.status.code == 'failed'" v-show="item.status.error != ''"
                                      style="position: absolute;right: 20px; font-size: smaller; ">reason:&nbsp{{
                                          item.status.error }}</span>
                              </span>
                              <span v-show="item.action == 'SWAP'" style="font-weight: 700; font-size: 11px;">{{ item.action }}&nbsp
                                  <span v-show="item.status.code == 'pending'">
                                  <img style="width: 15px; height:15px;" src = "../assets/X.svg">
                                  <span style="position: absolute;right: 10px; font-size: 12px; color: rgb(255 189 89);">Pending</span>
                                  </span>
                                  <span v-show="item.status.code == 'success' || item.status.code == 'failed'">
                                      <img style="width: 20px; height:20px; cursor:pointer" src="../assets/jumpto.svg"
                                          @click="viewTx(item.txHash)">
                                      <span v-if="item.status.code == 'success'"
                                          style="position: absolute;right: 10px; font-size: 12px; color: green;">Finish</span>
                                      <span v-if="item.status.code == 'failed'"
                                      style="position: absolute;right: 10px; font-size: 12px; color: rgb(227, 91, 17);">Failed</span>
                                  </span>
                                  <br />
                                  <span v-if="item.status.code == 'success'" style="font-size: smaller; font-weight:500;">
                                      from&nbsp{{ item.details.amountIn }}&nbsp{{ item.details.tokenIn }}&nbspfor&nbsp{{
                                          item.details.tokenOut }}
                                  </span>
                                  <span v-if="item.status.code == 'failed'" v-show="item.status.error != ''"
                                    style="position: absolute;right: 20px; font-size: smaller; ">reason:&nbsp{{
                                        item.status.error }}</span>
                              </span>
                              <span v-show="item.action == 'LIMIT_ORDER'" style="font-weight: 700; font-size: 11px;">{{ item.action }}&nbsp
                                  <span v-show="item.status.code == 'pending'">
                                      <img style="width: 15px; height:15px;" src="../assets/X.svg">
                                      <span
                                          style="position: absolute;right: 10px; font-size: 11px; color: rgb(255 189 89);">Pending</span>
                                  </span>
                                  <span v-show="item.status.code == 'success' || item.status.code == 'failed'">
                                      <img style="width: 20px; height:20px; cursor:pointer" src="../assets/jumpto.svg"
                                          @click="viewTx(item.txHash)">
                                      <span v-if="item.status.code == 'success'"
                                          style="position: absolute;right: 10px; font-size: 12px; color: green;">Finish</span>
                                      <span v-if="item.status.code == 'failed'"
                                          style="position: absolute;right: 10px; font-size: 12px; color: rgb(227, 91, 17);">Failed</span>
                                  </span>
                                  <br />
                                  <span v-if="item.status.code == 'success'" style="font-size: smaller; font-weight:500;">
                                      from&nbsp{{ item.details.amountIn }}&nbsp{{ item.details.tokenIn }}&nbspfor&nbsp{{
                                          item.details.amountOut }}&nbsp{{ item.details.tokenOut }}
                                  </span>
                                  <span v-if="item.status.code == 'failed'" v-show="item.status.error != ''"
                                          style="position: absolute;right: 20px; font-size: smaller; ">reason:&nbsp{{
                                              item.status.error }}</span>
                              </span>
                              <span v-show="item.action == 'COPY_ORDER'" style="font-weight: 700; font-size: 11px;">{{ item.action }}&nbsp
                                  <span v-show="item.status.code == 'active'">
                                      <img style="width: 15px; height:15px;" src = "../assets/X.svg">
                                      <span style="position: absolute;right: 10px; font-size: 12px; color: rgb(255 189 89);">Active</span>
                                  </span>
                                  <span v-show="item.status.code == 'failed'">
                                      <!-- <img style="width: 25px; height:25px;" src = "../assets/X.svg"> -->
                                      <span style="position: absolute;right: 10px; font-size: 12px; color: rgb(227, 91, 17);">Failed</span>
                                  </span>
                                  <br /> 
                              </span>
                          </a-list-item>
                      </template>
                      <template #footer>
                        <div>&nbsp</div>
                      </template>
                  </a-list>
              </span>
          </div>
          <div id="setting" v-show="selectedKeys == 4">
            <span class="menuTitle">Setting</span>
            <p style="font-size: 12px; font-weight: bolder; margin: 10px 55px 10px 10px;">Maximum slip point</p>
            <!-- <p style="font-size: medium;">Trade deadline<a-input oninput="value=value.replace(/[^0-9.]/g,'')"
                    v-model:value="deadLine" placeholder="0" suffix="mins" style="height: 60px;" /></p>
            <p style="font-size: medium;">Private Transaction &nbsp<a-switch v-model:checked="PriTxChecked" /></p> -->
            <a-row>
              <a-col :span="15">
                <a-slider v-model:value="slipPoint" :min="1" :max="100" />
              </a-col>
              <a-input oninput="value = Number(value.replace(/[^0-9.]/g,''))"
                    v-model:value="slipPoint" placeholder="0" suffix="%" style="height: 35px; margin-left: 5px; width: 65px;" />
            </a-row>
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
                :root-style="{ color: 'blue' }" style="color: rgb(24, 18, 18)," title="ETH" placement="left" width="210px"
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
                :root-style="{ color: 'blue' }" style="color: rgb(24, 18, 18)" :title="tokenName" placement="left" width="210px"
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
            <!--drawer of asset adding-->
            <a-drawer v-model:open="addErc20Open" class="custom-class" root-class-name="root-class-name"
                :root-style="{ color: 'blue' }" style="color: rgb(24, 18, 18)" title="Add Asset" placement="bottom" height="230px"
                @after-open-change="afterOpenChange">
                <span style="position: absolute; width: 80%; left: 10%;line-height: 40px;">
                    <a-input oninput="value=value.replace(/[\W]/g,'')" v-model:value="addErc20Address"
                        addon-before="token address" />
                    <a-input oninput="value=value.replace(/[\W]/g,'')" v-model:value="addErc20Symbol"
                        addon-before="token symbol" />

                    <a-button type="primary" @click="addCustomToken()"
                        style="width: 150px;height: 40px;border: 0;border-radius: 5px;margin: 10px 3px;">
                        <template #icon>
                        </template>
                        Add Custom Token
                    </a-button>
                </span>
            </a-drawer>
        </a-layout-sider>
        <a-layout-content style="height:93vh; background: white;"><!--linear-gradient(to right, #80ddf3, #7bebc3)-->
          <div class="rightbar" ref="chatwindow">
            <div class="list" id="list" ref="list">
              <ul style="padding: 0; margin: 0;" v-if="greeting == false">
                <li style="list-style: none;" v-for="(item, index) in msglist" :key="index">
                  <RightItem :id="item.id" :type="item.type" :content="item.content" v-if="item.me"></RightItem>
                  <!-- <LeftItem :id="item.id" :type="item.type" :content="item.content" v-else></LeftItem> -->
                  <TypeWriter :id="item.id" :type="item.type" :contentList="item.content" :loading="iconLoadingLoginsend" v-else></TypeWriter>
                  <!-- <div v-scroll style="height: 0"></div> -->
                </li>
              </ul>
              <ul style="padding: 0; margin: 0;" v-else>
                <img src="../assets/logo.svg" style="margin-top: 30%; width: 70px; height: 70px;">
                <div style="font-size: 25px;font-weight: bolder; margin-top:10px; font-family: 'Miriam Libre', sans-serif;">How may I assist you with your Dex-trading journey?</div>
              </ul>
            </div>
            <div class="bottom">
              <div>
                <a-tooltip placement="top">
                <!-- <a-popover title="" trigger="hover"> -->
                  <template #title>
                    <p style="height: 10px;">Quick chat button</p>
                  </template>
                  <ExclamationCircleOutlined style="margin-right: 5px;"/>
                <!-- </a-popover> -->
                </a-tooltip>
                <a-button class="hotOperation" v-for="value in hotOperations" @click="addChatContent(value)">{{ value }}</a-button>
              </div>
              <span class="input-send">
                <a-tooltip placement="leftBottom">
                  <template #title>
                    <span>Clear content</span>
                  </template>
                  <img src="../assets/broom.svg" style="height: 25px;width: 25px; margin-right: 1%;" @click="clearContent()">
                </a-tooltip>
                <a-tooltip placement="leftBottom">
                  <template #title>
                    <span>Restart chat</span>
                  </template>
                  <img src="../assets/restart.svg" style="height: 25px;width: 25px; margin-right: 1%;" @click="restartChat()">
                </a-tooltip>
                <label><a-input v-model:value="text" placeholder="Please type here..." class="input"
                    @keyup.enter="send" /></label>
                <label><a-button :loading="iconLoadingLoginsend" type="primary" class="send" @click="send">Send</a-button></label>
              </span>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!-- <a-layout-footer style="text-align: center">
      Sparky can make mistakes. Consider checking important information.
    </a-layout-footer> -->
  </a-layout>
</template>
<style scoped lang="less">
.hotOperation {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 5px;
}
.menuTitle {
  display: inline-block;
  font-size: 15px;
  font-weight: bolder;
  margin: 10px 120px 10px 10px;
}
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.rightbar {
  // position: absolute;
  width: 90%;
  top: 0%; //60px;
  // padding-left: 4%;
  margin-left: 4%;
  height: 100%;
  overflow-y: auto;
  // border-style: solid;
  // background: linear-gradient(#cddfca, #f3d789); //linear-gradient(#91bee5, #ffeef9);
  // border-top-right-radius: 15px;
  // border-bottom-right-radius: 15px;

  .list {
    width: 100%;
    height: 86%;//94%;
    // margin-bottom: 45px;
    overflow-y: scroll;
  }

  .bottom {
    width: 100%;
    // position: absolute;
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
        width: 80%;
        // left: 2%;
        height: 40px;
      }

      .send {
        width: 10%;
        height: 40px;
        // background-color: rgb(128, 221, 243);
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

</style>
<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { 
        CommentOutlined, DollarOutlined, 
        SettingOutlined, HistoryOutlined, 
        PlusCircleOutlined,EditOutlined,
        DeleteOutlined,DownOutlined,
        DownCircleOutlined,SmallDashOutlined,
        PlusCircleFilled,ExclamationCircleOutlined,
        RedoOutlined,LoadingOutlined
       } from '@ant-design/icons-vue';

import { Modal, notification } from 'ant-design-vue';
import { ethers, utils, BigNumber } from 'ethers6';
import { ParticlesBg } from "particles-bg-vue";
// import { ref } from "vue";
import useClipboard from "vue-clipboard3";
import Chat from "./chatBot/Chat.vue";
import LeftItem from "./chatBot/LeftItem.vue";
import RightItem from "./chatBot/RightItem.vue";
import MainPage from "./MainPage.vue";
import TypeWriter from "./chatBot/TypeWriter.vue";
import NoticeBar from "./utils/NoticeBar.vue";

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

var dom;
var observer;

const schedule = require('node-schedule');
const { toClipboard } = useClipboard();
const axios = require('axios');

//wrap map data set to store contract addresses
let contractAddrMap = new Map();
contractAddrMap.set("eth", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
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
  name: "LayoutTest",
  setup() {
    onMounted(() => {
      dom = document.getElementById("list");
      // Select the properties you want to observe
      var config = {attributes: true, childList: true, subtree: true  };
      console.log("---dom---: ", dom);
      // callback function for operate dom when dom in changed
      var callback = function (mutationsList) {
        mutationsList.forEach(function (item, index) {
          // console.log("this.$refs.list.scrollHeight: ",dom.scrollHeight);
          dom.scrollTop = dom.scrollHeight;
        });
      };
      // create a observer instance linking to callback
      observer = new MutationObserver(callback);
      // start observing target dom node
      observer.observe(dom, config);
    });
    onUnmounted(() => {
      // leave current route, destroy the observer
      observer.disconnect();
    });
  },
  components: {
    VueMetamask,Chat,ParticlesBg,LeftItem,RightItem,MainPage,
    CommentOutlined,DollarOutlined,SettingOutlined,HistoryOutlined,
    PlusCircleOutlined,EditOutlined, DeleteOutlined,TypeWriter,
    NoticeBar,DownOutlined,DownCircleOutlined,SmallDashOutlined,
    PlusCircleFilled,ExclamationCircleOutlined,RedoOutlined,
    LoadingOutlined
  },
  data: () => {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
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
      iconLoadingLoginsend: ref(false),
      greeting: ref(true),
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
      routerAddress: "0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2",//"0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
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
        content: ["Welcome!"],
        // content: 'Itis also very simple to use and get started with. DOMPurify was started in February 2014 and, meanwhile, has reached version v3.0.8.',
        me: false
      }],
      tokenObj: [
        // { token: "ETH", address: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80A", balance: 0 },
        // { token: "WETH", address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", balance: 0 },
        // { token: "UNI", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", balance: 0 },
        // { token: "USDC", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", balance: 0 },
      ],
      size: ref('default'),
      walletObj: [
        // { label: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80A", value: "0x59C70EBA07612e4A694B8896DF9550e2D722fE69", disabled: false, salt: 0},
        // { label: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80a", value: "0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80a", disabled: false, salt: 1}
      ],
      operationHistory: [
        // { action: "COPY_ORDER", details: { tokenSymbol: "", amount: "" }, status: { code: "active", error: "" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        // { action: "COPY_ORDER", details: { tokenSymbol: "", amount: "" }, status: { code: "failed", error: "insufficient balance" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        
        // { action: "TRANSFER", details: { tokenSymbol: "ETH", amount: "100" }, status: { code: "success", error: "" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        // { action: "TRANSFER", details: { tokenSymbol: "ETH", amount: "" }, status: { code: "failed", error: "insufficient balance" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        // { action: "TRANSFER", details: { tokenSymbol: "ETH", amount: "" }, status: { code: "pending", error: "" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        // { action: "SWAP", details: { tokenIn: "ETH", amountIn: "100", tokenOut: "UNI" }, status: { code: "success", error: "" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        // { action: "SWAP", details: { tokenIn: "ETH", amountIn: "100", tokenOut: "UNI" }, status: { code: "pending", error: "" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        // { action: "SWAP", details: { tokenIn: "ETH", amountIn: "100", tokenOut: "UNI" }, status: { code: "failed", error: "insufficient balance" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        // { action: "LIMIT_ORDER", details: { tokenIn: "ETH", amountIn: "100", tokenOut: "UNI", amountOut: "0.1" }, status: { code: "success", error: "" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        // { action: "LIMIT_ORDER", details: { tokenIn: "ETH", amountIn: "100", tokenOut: "UNI", amountOut: "0.1"  }, status: { code: "pending", error: "" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        // { action: "LIMIT_ORDER", details: { tokenIn: "ETH", amountIn: "100", tokenOut: "UNI", amountOut: "0.1"  }, status: { code: "failed", error: "insufficient balance" }, txHash: "0x61c73a77fbe04ec22fad93c84564261c08a0bc092bfdcf94fa666fa302c27037" },
        
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
      chatObj: [
        {title: "I want to tran..."},
        {title: "I want to swap..."},
        {title: "I want to copy..."}
      ],
      hotOperations: [
        "What is going on in tech?",
        "I wanna swap eth for uni.",
        "Is it a good time to buy eth?",
        "I wanna copy a transaction."
      ],
      emailAddress: null,
      // contentList: ["Itis also very simple to use and get started with. DOMPurify was started in February 2014 and, meanwhile, has reached version v3.0.8."]
    }
  },
  created: function () {
    console.log("check if user is already logined in...");
    reload().then(res => {
      console.log("reload response: ", res);
      if (!res) {
        console.log("nothing to do.");
        return;
      }
      console.log("user:", res.userAccounts);
      this.user = res.userAccounts;
      this.platform = res.platform;
      if (this.platform == 0) {
        this.emailAddress = res.emailAddress;
      }
      console.log("this.user: ", this.user);
      if (this.user != null) {
        if (this.platform == 1) {
          // if metaMask has been already logined, reload page must initliaze web3 provider
          getWeb3Provider();
        }
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
                let saltTemp = response.data.data[0].Salt;
                console.log("saltTemp: ", saltTemp);
                response.data.data.forEach(element => {
                  this.walletObj.push(
                    {
                      label: element.Account,
                      value: element.Account,
                      disabled: false,
                      salt: element.Salt
                    }
                  );
                  // default select first address(which salt is the Minimum value)
                  if (Number(element.Salt) <= saltTemp) {
                    this.walletAddress = element.Account;

                    // add first account address into asset list
                    if (this.tokenObj.length == 0) {
                      console.log("asset Address: ", element.Account);
                      console.log("asset symbol: ", "BNB");
                      let tmpObj = { token: "BNB", address: element.Account, balance: "0.0" };
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
                          let tmpObj = { token: element.Token, address: element.Address, balance: "0.0" };
                          this.tokenObj.push(tmpObj);

                        })
                      }
                    }
                    this.queryOpAndOrders();
                    // this.scheduleTask();
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
    });
  },
  methods: {
    restartChat() {
      if (this.walletAddress == null) {
        this.openNotification("info", "Please login");
        this.text = '';
        return;
      }
      try {
        axios.post('webhooks/rest/webhook', {
        "sender": this.walletAddress,
        "message": "/restart"
        }).then(res => {
          if (res != null) {
            console.log(res);
            if (res.data.length == 0) {
              this.openNotification("info", "Chat has been reset.");
            }
          }
        });
      } catch (error) {
        this.openNotification("error", "Reset failed.");
        console.log("restart chat error: ", error);
      }
    },
    addChatContent(value) {
      console.log("hot operation: ", value);
      this.text = value;
    },
    clearContent() {
      console.log("clear chat content...");
      this.msglist = [{
        id: 1,
        type: 1,
        content: ["Welcome!"],
        me: false
      }];
    },
    DeviceFactorKey() {
      try {
        getDeviceFactor().then(res => {
          if (res != undefined) {
            console.log("device factorKey: ", res);
          } else {
            this.openNotification("error", "device factorKey doesn't exist.");
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
            let str = new Blob([res], { type: 'text/plain;charset=utf-8' });
            saveAs(str, `key.txt`);
          } catch (error) {
            console.log(error);
          }
        } else {
          this.openNotification("info", "MFA already enabled.");
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
                this.queryOpAndOrders();
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
        this.openNotification("error", "Wrong deviceKey: " + this.DeviceKey);
        this.DeviceKey = null;
        return;
      }
      RecoveryFactorKeyUsingMnemonic(this.DeviceKey);
      this.openaddDeviceKey = false;
      this.DeviceKey = null;
    },
    googleLogin() {
      this.openLogin = false;
      this.iconLoadingLogin = true;
      login().then(response => {
        this.iconLoadingLogin = false;
        console.log("response: ", response);
        if (response == undefined) {
          this.openNotification("info", "Required more shares, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution].");
          this.openAccManagement = true;
          return;
        }
        console.log("userAccounts: ", response.userAccounts);
        console.log("platform: ", response.platform);
        console.log("emailAddress: ", response.emailAddress);
        if (response.userAccounts != null) {
          this.user = response.userAccounts;
        }

        if (response.platform != null) {
          this.platform = response.platform;
        }

        if (response.emailAddress != null) {
          this.emailAddress = response.emailAddress;
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
                let saltTemp = response.data.data[0].Salt;
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
                  if (Number(element.Salt) <= saltTemp) {
                    this.walletAddress = element.Account;

                    // add first account address into asset list
                    if (this.tokenObj.length == 0) {
                      console.log("asset Address: ", element.Account);
                      console.log("asset symbol: ", "BNB");
                      let tmpObj = { token: "BNB", address: element.Account, balance: "0.0" };
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
                          let tmpObj = { token: element.Token, address: element.Address, balance: "0.0" };
                          this.tokenObj.push(tmpObj);

                        })
                      }
                    }
                    this.queryOpAndOrders();
                    // this.scheduleTask();
                    // update erc20 balance
                    // for (let index = 1; index < this.tokenObj.length; index++) {
                    //     const element = this.tokenObj[index];
                    //     getErc20Balance(this.walletAddress, element.address).then((response) => {
                    //         if (response.status) {
                    //             // console.log(element.token + " balance:" + String(response.balance));
                    //             this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                    //         } else {
                    //             console.log("get " + element.token + " balance falied!");
                    //         }
                    //     });
                    // }
                  })
                  .catch(error => {
                    console.log(error);
                  });
                // update  eth balance
                // getEthBalance(this.walletAddress).then((response) => {
                //     if (response.status) {
                //         // console.log(element.token + " balance:" + response.balance.toNumber());
                //         this.tokenObj.forEach(element => {
                //             if (element.token == "ETH") {
                //                 element.balance = this.formateNumber(ethers.formatEther(response.balance));
                //             }
                //         })
                //     } else {
                //         console.log("get ETH balance failed!");
                //     }
                // });
                // get operation history
                // this.queryOpAndOrders();
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
    showLogin() {
      console.log(this.user);
      if (this.user == null) {
        this.openLogin = true;
        return;
      } else {
        this.openLogoutHint = true;
        // sign();
      }
      // login();    
    },
    logOut() {
      logout().then(response => {
        console.log("log out: ", response);
        this.user = null;
        this.operationHistory = [];
        this.walletObj = [];
        this.tokenObj = [];
        this.walletSalt = 0;
        this.msglist = [{
          id: 1,
          type: 1,
          content: ["Welcome!"],
          me: false
        }];
        this.walletAddress = null;
        this.openNotification("info", "Log out.");
        this.openLogoutHint = false;
        this.greeting = true;
        this.iconLoadingLogin = false;

        console.log("cancel schedule jobs ...");
        for (const job in schedule.scheduledJobs) schedule.cancelJob(job);
      });
    },
    queryOpAndOrders() {
      // return;
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
                  let details = { tokenSymbol: symbol, amount: ethers.formatEther(element.Details.TokenInAmount != "" ? element.Details.TokenInAmount : 0) };
                  operation.action = element.Action;
                  operation.details = details;

                  let status = { code: element.Status.Stat, error: element.Status.RevertReason };
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
                  let details = { tokenIn: symbolIn, amountIn: ethers.formatEther(element.Details.TokenInAmount != "" ? element.Details.TokenInAmount : 0), tokenOut: symbolOut };
                  operation.action = element.Action;
                  operation.details = details;

                  let status = { code: element.Status.Stat, error: element.Status.RevertReason };
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

                  let details = { tokenIn: symbolIn, amountIn: ethers.formatEther(element.Details.TokenInAmount != "" ? element.Details.TokenInAmount : 0), tokenOut: symbolOut, amountOut: ethers.formatEther(element.Details.TokenOutAmount != "" ? element.Details.TokenOutAmount : 0) };
                  operation.action = element.Action;
                  operation.details = details;

                  let status = { code: element.Status.Stat, error: element.Status.RevertReason };
                  let txHash = element.TxHash;
                  operation.status = status;
                  operation.txHash = txHash;
                  this.operationHistory.push(operation);
                }
                if (element.Action == "COPY_ORDER") {
                  // let symbolIn = null;
                  // let symbolOut = null;
                  operation.action = element.Action;
                  let details = { tokenIn: "", amountIn: "", tokenOut: "", amountOut: "" };

                  let status = { code: element.Status.Stat, error: element.Status.RevertReason };
                  operation.status = status;
                  operation.details = details;
                  this.operationHistory.push(operation);

                }
              });
            }
            console.log("operationHistory: ", this.operationHistory);

          } else {
            console.log("error code: ", response.data.code);
          }
        })
        .catch(error => {
          console.log(error);
        });
      // update eth balance
      getEthBalance(this.walletAddress).then((response) => {
        if (response.status) {
          this.tokenObj.forEach(element => {
            if (element.token == "BNB") {
              // console.log("eth balance:" + String(response.balance));
              element.balance = this.formateNumber(ethers.formatEther(response.balance));
            }
          })
        } else {
          console.log("get ETH balance falied!");
        }
      });
      // update  erc20 balance
      console.log("this.tokenObj: ",this.tokenObj);
      for (let index = 1; index < this.tokenObj.length; index++) {
        const element = this.tokenObj[index];
        getErc20Balance(this.walletAddress, element.address).then((response) => {
          if (response.status) {
            // console.log(element.token + " balance:" + String(response.balance));
            let point = this.formateNumber(ethers.formatEther(response.balance)).indexOf(".");
            this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance)).substring(0, point+5);
          } else {
            console.log("get " + element.token + " balance falied!");
          }
        });
      }
    },
    scheduleTask() {
      const scheduleCronstyle = () => {
        //: schedule task will be executed every 5 minutes
        schedule.scheduleJob('*/1 * * * *', () => {
          // console.log('scheduleCronstyle:' + new Date());
          // query limited order status
          this.queryOpAndOrders();
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
                  this.queryOpAndOrders();
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
                  this.queryOpAndOrders();
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
        ethToErc20DataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeySrc), this.contractAddrMap.get(this.subKeyDes), this.fee, this.routerAddress, this.ethAmount, amountOutMinimum, this.chainId, this.platform, this.submitSwapCallback).then(res => {
          console.log("res:", res);
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
                this.queryOpAndOrders();

                setTimeout(() => {
                  // update eth balance
                  getEthBalance(this.walletAddress).then((response) => {
                    if (response.status) {
                      this.tokenObj.forEach(element => {
                        if (element.token == "BNB") {
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
        erc20ToEthDataOperationWrapper(this.user, this.walletAddress, walletSalt, this.contractAddrMap.get(this.subKeyDes), this.contractAddrMap.get(this.subKeySrc), this.fee, this.routerAddress, this.erc20Amount, amountOutMinimum, this.chainId, this.platform, this.submitSwapCallback).then(res => {
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
                this.queryOpAndOrders();

                setTimeout(() => {
                  // update eth balance
                  getEthBalance(this.walletAddress).then((response) => {
                    if (response.status) {
                      this.tokenObj.forEach(element => {
                        if (element.token == "BNB") {
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
              if (element.token == "BNB") {
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
      window.open('https://bscscan.com/tx/' + txHash);
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
      window.open('https://bscscan.com/address/' + this.walletAddress);
      // window.open('https://sepolia.etherscan.io/address/' + this.walletAddress);
    },
    homePage() {
      window.open('https://www.sparkybot.xyz');
    },
    async connect() {
      console.log("connect");
      if (this.user == null) {
        if (window.ethereum) {
          window.ethereum.enable().then(res => {
            console.log("res: ", res);
            this.user = res[0];

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
                    let saltTemp = response.data.data[0].Salt;
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
                      if (Number(element.Salt) <= saltTemp) {
                        this.walletAddress = element.Account;

                        // add first account address into asset list as ETH
                        if (this.tokenObj.length == 0) {
                          console.log("asset Address: ", element.Account);
                          console.log("asset symbol: ", "BNB");
                          let tmpObj = { token: "BNB", address: element.Account, balance: "0.0" };
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
                              let tmpObj = { token: element.Token, address: element.Address, balance: "0.0" };
                              this.tokenObj.push(tmpObj);

                            })
                          }
                        }
                        this.queryOpAndOrders();
                        // update erc20 balance
                        // for (let index = 1; index < this.tokenObj.length; index++) {
                        //     const element = this.tokenObj[index];
                        //     getErc20Balance(this.walletAddress, element.address).then((response) => {
                        //         if (response.status) {
                        //             // console.log(element.token + " balance:" + String(response.balance));
                        //             this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
                        //         } else {
                        //             console.log("get " + element.token + " balance falied!");
                        //         }
                        //     });
                        // }
                      })
                      .catch(error => {
                        console.log(error);
                      });
                    // update  eth balance
                    // getEthBalance(this.walletAddress).then((response) => {
                    //     if (response.status) {
                    //         // console.log(element.token + " balance:" + response.balance.toNumber());
                    //         this.tokenObj.forEach(element => {
                    //             if (element.token == "ETH") {
                    //                 element.balance = this.formateNumber(ethers.formatEther(response.balance));
                    //             }
                    //         })
                    //     } else {
                    //         console.log("get ETH balance falied!");
                    //     }
                    // });

                    // get operation history
                    // this.queryOpAndOrders();
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          });
        } else {
          this.openNotification("info", "Please install metaMask.");
        }
      } else {
        return;
      }
    },
    // onComplete(data) {
    //     console.log("on complete:", data);
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
    //                         this.queryOpAndOrders();
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
        console.log("this.walletSalt:", this.walletSalt);
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
            console.log("asset symbol: ", "BNB");
            let tmpObj = { token: "BNB", address: this.walletAddress, balance: "0.0" };
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
      console.log("tokenObj: ", this.tokenObj);
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
            let tmpObj = { token: "BNB", address: this.walletAddress, balance: "0.0" };
            this.tokenObj.push(tmpObj);
            console.log("Successfully obtained user asset list.");
            if (response.data.data != null && response.data.data.length > 0) {
              response.data.data.forEach(element => {
                console.log("asset Address: ", element.Address);
                console.log("asset symbol: ", element.Token);
                tmpObj = { token: element.Token, address: element.Address, balance: "0.0" };
                this.tokenObj.push(tmpObj);

              })
            }
            this.queryOpAndOrders();
            // // update erc20 balance
            // for (let index = 1; index < this.tokenObj.length; index++) {
            //     const element = this.tokenObj[index];
            //     getErc20Balance(this.walletAddress, element.address).then((response) => {
            //         if (response.status) {
            //             console.log(element.token + " balance:" + String(response.balance));
            //             this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance));
            //         } else {
            //             console.log("get " + element.token + " balance falied!");
            //         }
            //     });
            // }
          }
          // this.orderData = [];
        })
        .catch(error => {
          console.log(error);
        });

      // update eth balance
      // getEthBalance(this.walletAddress).then((response) => {
      //     if (response.status) {
      //         this.tokenObj.forEach(element => {
      //             if (element.token == "ETH") {
      //                 // console.log("eth balance:" + String(response.balance));
      //                 element.balance = this.formateNumber(ethers.formatEther(response.balance));
      //             }
      //         })
      //     } else {
      //         console.log("get ETH balance falied!");
      //     }
      // });
      // get operation history
      // this.queryOpAndOrders();
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
                this.queryOpAndOrders();

                setTimeout(() => {
                  // update eth balance
                  getEthBalance(this.walletAddress).then((response) => {
                    if (response.status) {
                      this.tokenObj.forEach(element => {
                        if (element.token == "BNB") {
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
              if (element.token == "BNB") {
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
            console.log("this.depositErc20: ", this.depositErc20);
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
                  this.queryOpAndOrders();

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
                } else {
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
              if (element.token == "BNB") {
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
        let tmpObj = { token: this.addErc20Symbol, address: this.addErc20Address, balance: "0.0" };
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
        this.addErc20Address = null;
        this.addErc20Symbol = null;
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
        this.openNotification("info", "Please login");
        this.text = '';
        return;
      }
      if (this.text) {
        this.greeting = false;
        this.msglist.push({
          id: this.msglist[this.msglist.length - 1].id + 1,
          type: 1,
          content: [this.text],
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
            content: [this.text],
            me: false
          });
        } else {
          this.iconLoadingLoginsend = true;
          this.msglist.push({
              id: this.msglist[this.msglist.length - 1].id + 1,
              type: 1,
              content: ['<LoadingOutlined/>'],
              me: false
          });
          this.getResponse(this.text);
        }
        this.text = ''
      }
    },
    getResponse(text) {
      console.log("wallet address: ", this.walletAddress);
      try {
        axios.post('webhooks/rest/webhook', {
        "sender": this.walletAddress,
        "message": text
        }).then(res => {
          if (res != null) {
            console.log(res);
            this.iconLoadingLoginsend = false;
            this.msglist.splice(this.msglist.length-1, 1);
            if (res.data.length == 0) {
              return;
            }
            let contentTmp = [];
            for (let index = 0; index < res.data.length; index++) {
              contentTmp.push(res.data[index].text+"\n");
            }
            this.msglist.push({
                id: this.msglist[this.msglist.length - 1].id + 1,
                type: 1,
                content: contentTmp,
                me: false
            });
            // make the latest content at the bottom of chatwindow
            // console.log("#ref list: ", this.$refs.list);
            // this.$nextTick(() => {
            //   console.log("#ref list scrollTop before: ", this.$refs.list.scrollTop);
            //   this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
            //   console.log("#ref list scrollTop after: ", this.$refs.list.scrollTop);
            // });
            for (let index = 0; index < res.data.length; index++) {
              // show response data in chat window
              // this.msglist.push({
              //   id: this.msglist[this.msglist.length - 1].id + 1,
              //   type: 1,
              //   content: [res.data[index].text],
              //   me: false
              // });
              
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
                                  this.queryOpAndOrders();
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

                          transferETH(this.user, elem.sender, elem.receiver, elem.amount, walletSalt, this.chainId, this.platform, this.transferEthCallback).then(res => {
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
                                  this.queryOpAndOrders();

                                  setTimeout(() => {
                                    // update eth balance
                                    getEthBalance(this.walletAddress).then((response) => {
                                      if (response.status) {
                                        this.tokenObj.forEach(element => {
                                          if (element.token == "BNB") {
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

                          transferErc20(this.user, elem.sender, elem.receiver, elem.token, elem.amount, walletSalt, this.chainId, this.platform, this.transferErc20Callback).then(res => {
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
                                  this.queryOpAndOrders();

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
                                } else {
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
                                    this.queryOpAndOrders();

                                    setTimeout(() => {
                                      // update eth balance
                                      getEthBalance(this.walletAddress).then((response) => {
                                        if (response.status) {
                                          this.tokenObj.forEach(element => {
                                            if (element.token == "BNB") {
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
                                            let point = this.formateNumber(ethers.formatEther(response.balance)).indexOf(".");
                                            this.tokenObj[index].balance = this.formateNumber(ethers.formatEther(response.balance)).substring(0, point+5);
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
                                    this.queryOpAndOrders();

                                    setTimeout(() => {
                                      // update eth balance
                                      getEthBalance(this.walletAddress).then((response) => {
                                        if (response.status) {
                                          this.tokenObj.forEach(element => {
                                            if (element.token == "BNB") {
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
                                      this.queryOpAndOrders();
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
                                      this.queryOpAndOrders();
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
      } catch (error) {
        console.log(error);
      }
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
              if (element.token == "BNB") {
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