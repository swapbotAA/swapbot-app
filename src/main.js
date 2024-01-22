import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';

import { Web3Auth } from "@web3auth/modal";
import { Web3AuthMPCCoreKit, WEB3AUTH_NETWORK } from "@web3auth/mpc-core-kit";

const coreKitInstance = new Web3AuthMPCCoreKit({
    web3AuthClientId: process.env.VUE_APP_CLIENT_ID,
    web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET,
    uxMode: "popup",
    chainConfig: {
        chainNamespace: "eip155",
        chainId: "0xAA36A7",
        rpcTarget: process.env.VUE_APP_RPC_TARGET,
        displayName: "Ethereum Sepolia",
        blockExplorer: "https://sepolia.etherscan.io",
        ticker: "ETH",
        tickerName: "Ethereum",
    },
  });

console.log("##0##");
await coreKitInstance.init();
console.log("coreKitInstance: ", coreKitInstance);
console.log("##1##");
// Initialize within setup()
const web3auth = new Web3Auth({
    clientId: process.env.VUE_APP_CLIENT_ID, // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET, // Web3Auth Network
    chainConfig: {
        chainNamespace: "eip155",
        chainId: "0xAA36A7",
        rpcTarget: process.env.VUE_APP_RPC_TARGET,
        displayName: "Ethereum Sepolia",
        blockExplorer: "https://sepolia.etherscan.io",
        ticker: "ETH",
        tickerName: "Ethereum",
    },
});
// console.log("web3auth: ",web3auth);
await web3auth.initModal();

export { web3auth, coreKitInstance }

const app = createApp(App);

app.directive('scroll', {
        inserted(el) {
            el.scrollIntoView()
        }
    })

app.use(Antd).mount('#app');