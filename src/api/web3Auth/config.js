import { Web3Auth } from "@web3auth/modal";
import { Web3AuthMPCCoreKit, WEB3AUTH_NETWORK } from "@web3auth/mpc-core-kit";



const coreKitInstance = new Web3AuthMPCCoreKit({
    web3AuthClientId: "BOhofQ2t3prR53hQgQEA_Z-Y0TlYo7uHOOn1aYtewWFh5WvPzQ2UWZce7_2IfkRMe1inPtCLKe_6oH2OSD7RegY",
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

await coreKitInstance.init();



// Initialize within setup()
const web3auth = new Web3Auth({
    clientId: "BOhofQ2t3prR53hQgQEA_Z-Y0TlYo7uHOOn1aYtewWFh5WvPzQ2UWZce7_2IfkRMe1inPtCLKe_6oH2OSD7RegY", // Get your Client ID from the Web3Auth Dashboard
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

await web3auth.initModal();

export { web3auth, coreKitInstance }