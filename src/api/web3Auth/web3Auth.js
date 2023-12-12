import { Web3Auth } from "@web3auth/modal";
import { web3auth, coreKitInstance } from "../../main";
import { Web3 } from "web3";
// import BN from 'bn.js'
// import { getWebBrowserFactor } from "@web3auth/mpc-core-kit";
import { ethers } from "ethers6";

async function login() {

    // alert('Button cliked!');
    const web3authProvider = await web3auth.connect();

    const web3 = new Web3(web3authProvider);
    const user = await web3auth.getUserInfo();
    console.log(user);

    const userAccounts = await web3.eth.getAccounts();
    console.log(userAccounts);
    // const privateKey = await web3auth.provider.request({
    //     method: "eth_private_key"
    // });
    // console.log(privateKey);
    return userAccounts;


}
async function logout() {
    if (!web3auth) {
        uiConsole("web3auth not initialized yet");
        return;
    }
    await web3auth.logout();
}

async function sign() {

    const web3authProvider = await web3auth.connect();
    let ethersProvider = new ethers.BrowserProvider(web3authProvider); // web3auth.provider
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.getAddress();
    console.log("address: ", address)
    const originalMessage = "Hello World";

    const signedMessage = await signer.signMessage(originalMessage);
    console.log("signed message: ", signedMessage)
}

export {
    login,
    logout,
    sign
}