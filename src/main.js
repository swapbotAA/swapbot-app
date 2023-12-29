import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';

import { Web3Auth } from "@web3auth/modal";
import { Web3AuthMPCCoreKit, WEB3AUTH_NETWORK } from "@web3auth/mpc-core-kit";

const coreKitInstance = new Web3AuthMPCCoreKit({
    web3AuthClientId: "BCYR7_dZTbqDreDE1MHniuCP8AMN441M_A-bRnMUrqjIGaeERgaYZ6IyobbjdNvjaG6-cp-b3lbso9VIXyRYF7Y",
    web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET,
    uxMode: "popup",
    chainConfig: {
        chainNamespace: "eip155",
        chainId: "0xAA36A7",
        rpcTarget: "https://sepolia.infura.io/v3/b6b76cf6eef242a197dd2916d295210c",
        displayName: "Ethereum Sepolia",
        blockExplorer: "https://sepolia.etherscan.io",
        ticker: "ETH",
        tickerName: "Ethereum",
    },
  });
// console.log("coreKitInstance: ",coreKitInstance);
await coreKitInstance.init();



// Initialize within setup()
const web3auth = new Web3Auth({
    clientId: "BCYR7_dZTbqDreDE1MHniuCP8AMN441M_A-bRnMUrqjIGaeERgaYZ6IyobbjdNvjaG6-cp-b3lbso9VIXyRYF7Y", // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET, // Web3Auth Network
    chainConfig: {
        chainNamespace: "eip155",
        chainId: "0xAA36A7",
        rpcTarget: "https://sepolia.infura.io/v3/b6b76cf6eef242a197dd2916d295210c",
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