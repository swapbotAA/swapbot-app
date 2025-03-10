import { ethers, BigNumber} from 'ethers6';
import  Wallet from './abis/Wallet.json';
import UniswapRouter from "./abis/UniswapRouter.json";
import Uni from "./abis/Uni.json";
import WETH9 from "./abis/Weth.json";
import Usdc from "./abis/Usdc.json";
import LinkToken from "./abis/Link.json";
import Usdt from "./abis/Usdt.json";
import SparkyAccountFactory from "./abis/SparkyAccountFactory.json";
import EntryPoint from "./abis/EntryPoint.json";
import BN from 'bn.js';
import Web3 from 'web3';
import bowser from "bowser";
// import { storeWebBrowserFactor, keyToMnemonic, mnemonicToKey, COREKIT_STATUS } from "@web3auth/mpc-core-kit";
import { TssShareType, getWebBrowserFactor, generateFactorKey, COREKIT_STATUS, keyToMnemonic, mnemonicToKey, parseToken } from "@web3auth/mpc-core-kit";
// web3auth
import { Web3Auth } from "@web3auth/modal";
import { web3auth, coreKitInstance } from "../main";
// import BN from 'bn.js'
let provider = null;
let signer = null;
// web3auth end

let coreKitStatus = null;
let backupFactorKey = "";
let mnemonicFactor = "";

// =====switch to Eth begin=====
const wallet_address = "0x90CaF385c36b19d9f2BB9B5098398b6844eff8eB";
const uniswapRouter_address = "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E";

// [uni,weth,usdc,link,usdt]
const erc20_address_list = ["0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984","0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14","0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8","0x779877A7B0D9E8603169DdbD7836e478b4624789","0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0"];
const abi_name_list = ["Uni", "Weth", "Usdc", "Link", "Usdt"];

const sparkyAccountFactory_address = "0x97e4Ac7528c1F797Fe5269B0EECCd25D897b3917";//"0xf8F3f05Bb80Ecd7cbF5925598966ea5C9C0857A1";//"0x81003ED6857971b34967dEC7C979a6d51C793Ef4";
const entryPoint_address = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const sparkyPaymaster_address = "0x7BC827dF7aAdD95fCd1F670Bc2c36a860b4518AD";
// =====end=====

// =====switch to BSC begin=====
// sparkyAccountFactory_address = ""
// sparkyPaymaster_address = ""
// const erc20_address_list = ["0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984","0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14","0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8","0x779877A7B0D9E8603169DdbD7836e478b4624789","0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0"];
// const abi_name_list = ["Uni", "Weth", "Usdc", "Link", "Usdt"];
// =====end=====

let walletInstance = null;
let uniswapRouterInstance = null;
let erc20InstanceList = [];

let sparkyAccountFactoryInstance = null;
let entryPointInstance = null;

const bundler_address = "0x8e19ffB632A8e74F172cfe3082493ACfa8a1556B";
// async function login() {

//     // alert('Button cliked!');
//     let web3authProvider = await web3auth.connect();

//     let web3 = new Web3(web3authProvider);
//     let user = await web3auth.getUserInfo();
//     console.log(JSON.stringify(user));

//     let userAccounts = await web3.eth.getAccounts();
//     console.log(userAccounts);
//     // const privateKey = await web3auth.provider.request({
//     //     method: "eth_private_key"
//     // });
//     // console.log(privateKey);

//     provider = new ethers.BrowserProvider(web3authProvider); 
//     let platform = 0;// 0 represent normal platform, such as google
//     if (JSON.stringify(user) == "{}") {
//         // alert("metamask");
//         platform = 1;//1 represent web3 platform, such as metamask
//     }
//     return {
//         userAccounts: userAccounts, 
//         platform: platform
//     };
// }

// async function logout() {
//     if (!web3auth) {
//         uiConsole("web3auth not initialized yet");
//         return;
//     }
//     await web3auth.logout();
// }

// async function signTx(content) {

//     const web3authProvider = await web3auth.connect();
//     // let ethersProvider = new ethers.BrowserProvider(web3authProvider); // web3auth.provider
//     const signer = await provider.getSigner();

//     // Get user's Ethereum public address
//     const address = signer.getAddress();
//     console.log("user's Ethereum public address: ", address);
//     // const originalMessage = "Hello World";
//     console.log("content string: ",JSON.stringify(content));
//     const signedMessage = await signer.signMessage(JSON.stringify(content));
//     console.log("signed message: ", signedMessage);
//     return signedMessage;
// }
//##################################single factor login above##############################################
async function reload() {
    console.log("COREKIT_STATUS: ", COREKIT_STATUS);
    console.log("current status: ", coreKitInstance.status);
    // reload google login
    if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        const user = await coreKitInstance.getUserInfo();
        console.log("User info", user);
        const detail = await coreKitInstance.getKeyDetails();
        console.log("key details", detail);
    
        const web3authProvider = await coreKitInstance.provider;
        provider = new ethers.BrowserProvider(web3authProvider); 
        signer = await provider.getSigner();
        const userAccounts = await signer.getAddress();
        console.log("userAccounts: ",userAccounts);
        const email = user.email;
        console.log("email: ",email);
        let platform = 0;// 0 represent normal platform, such as google

        return {
            userAccounts: userAccounts, 
            platform: platform,
            emailAddress: email
        };
    }
    // reload metamask login
    if (localStorage.getItem("userAccounts") != null) {
        let platform = 1;// 1 represent web3 platform, such as metaMask
        console.log("userAccounts: ", localStorage.getItem("userAccounts"));
        return {
            userAccounts: localStorage.getItem("userAccounts"), 
            platform: platform
        };
    }

    return false;
}

async function login() {
    try {
        await coreKitInstance.loginWithOauth({
            subVerifierDetails: {
                typeOfLogin: "google",
                verifier: "sparky-test-verifier", // you verifier name
                clientId: process.env.VUE_APP_VERIFIER_ID, // your client id recieved from google
            },
        });
        console.log("Login succeed");
        const user = await coreKitInstance.getUserInfo();
        if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
            console.log("required more shares, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]");
            return;
          }
        console.log("User info", user);
        const detail = await coreKitInstance.getKeyDetails();
        console.log("key details", detail);
    
        const web3authProvider = await coreKitInstance.provider;
        provider = new ethers.BrowserProvider(web3authProvider); 
        signer = await provider.getSigner();
        const userAccounts = await signer.getAddress();
        console.log("userAccounts: ",userAccounts);
        const email = user.email;
        console.log("email: ",email);
        let platform = 0;// 0 represent normal platform, such as google

        return {
            userAccounts: userAccounts, 
            platform: platform,
            emailAddress: email
        };
    } catch (error) {
        console.log(error);
    }

}

async function logout() {
    if (!coreKitInstance) {
        uiConsole("coreKitInstance not initialized yet");
        return;
    }
    try {
        await coreKitInstance.logout();
        if (localStorage.getItem("userAccounts") != null) {
            localStorage.removeItem("userAccounts");
        }
        // clear variables
        provider = null;
        signer = null;
        
        coreKitStatus = null;
        backupFactorKey = "";
        mnemonicFactor = "";
    } catch (error) {
        console.log(error);
    }
}

async function resetAccount() {
    await coreKitInstance.tKey.storageLayer.setMetadata({
        privKey: new BN(coreKitInstance.metadataKey, "hex"),
        input: { message: "KEY_NOT_FOUND" },
      });
    console.log("reset");
    // ========================
    // try {
    //     await getDeviceFactor();
    //     await inputBackupFactorKey();
    //   } catch (e) {
    //       console.log(e);
    //   }
}

async function getDeviceFactor() {
    try {
      const factorKey = await getWebBrowserFactor(coreKitInstance);
      backupFactorKey = factorKey;
      console.log("Device share: ", factorKey);
      return factorKey;
    } catch (e) {
        console.log(e);
    }
}

async function inputBackupFactorKey () {
    if (!coreKitInstance) {
      return new Error("coreKitInstance not found");
    }
    if (!backupFactorKey) {
      return new Error("backupFactorKey not found");
    }
    const factorKey = new BN(backupFactorKey, "hex")
    await coreKitInstance.inputFactorKey(factorKey);

    coreKitStatus = coreKitInstance.status;

    if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
      console.log("required more shares even after inputing backup factor key, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]");
    }
    console.log("=========");
    const detail = await coreKitInstance.getKeyDetails();
    console.log("key details", detail);
    const web3authProvider = await coreKitInstance.provider;
    provider = new ethers.BrowserProvider(web3authProvider); 
    signer = await provider.getSigner();
    const userAccounts = await signer.getAddress();
    console.log("userAccounts: ",userAccounts);
}

async function enableMFA() {
    // return "apart climb quarter minimum okay direct medal soft venue pulse valid quality next chronic garden notable alone nominee frozen uniform bachelor current blue this";
    try {
        const factorKey = await coreKitInstance.enableMFA({});
        const factorKeyMnemonic = keyToMnemonic(factorKey);
        console.log("MFA enabled, device factor stored in local store, deleted hashed cloud key, your backup factor key: ", factorKeyMnemonic);
        return factorKeyMnemonic;
    } catch (error) {
        console.log(error);
        return;
    }
}

async function RecoveryFactorKeyUsingMnemonic(DeviceKey) {
    if (!coreKitInstance) {
        throw new Error("coreKitInstance is not set");
      }
      try {
        const factorKey = await mnemonicToKey(DeviceKey);
        backupFactorKey = factorKey;
        return factorKey;
      } catch (error) {
        console.log(error);
      }
}

async function exportMnemonicFactor() {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set");
    }
    uiConsole("export share type: ", TssShareType.RECOVERY);
    const factorKey = generateFactorKey();
    await coreKitInstance.createFactor({
      shareType: TssShareType.RECOVERY,
      factorKey: factorKey.private
    });
    const factorKeyMnemonic = await keyToMnemonic(factorKey.private.toString("hex"));
    console.log("Export factor key mnemonic: ", factorKeyMnemonic);
}

async function signTx(UserOperationWithoutSig, chainId) {

    const domain = {
        name: 'SparkyAccount',
        version: '1',
        chainId: chainId,
        verifyingContract: UserOperationWithoutSig.sender
    };
    const types = {
        UserOperationWithoutSig: [
            { name: 'sender', type: 'address' },
            // { name: 'nonce', type: 'uint256' },
            { name: 'initCode', type: 'bytes' },
            { name: 'callData', type: 'bytes' },
            { name: 'callGasLimit', type: 'uint256' },
            { name: 'verificationGasLimit', type: 'uint256' },
            { name: 'preVerificationGas', type: 'uint256' },
            { name: 'maxFeePerGas', type: 'uint256' },
            { name: 'maxPriorityFeePerGas', type: 'uint256' },
            { name: 'paymasterAndData', type: 'bytes' },
        ],
    };

    console.log("signer: ",signer);
    console.log("UserOperationWithoutSig: ",UserOperationWithoutSig);
    let signature = await signer.signTypedData(domain, types, { ...UserOperationWithoutSig });
    console.log("signed message: ", signature);
    return signature;
}

//获取 provider
async function getWeb3Provider() {
    console.log("###provider###: ", provider);
    if (provider === null) {
        // if (!window.ethereum) {
        //     return null;
        // }
        provider = new ethers.BrowserProvider(window.ethereum, "any");
        signer = await provider.getSigner();
        const userAccounts = await signer.getAddress();
        console.log("user account: ", userAccounts.toLowerCase());
        console.log("localStorage userAccounts: ",localStorage.getItem("userAccounts"));
        if (localStorage.getItem("userAccounts") == null) {
            localStorage.setItem("userAccounts", userAccounts.toLowerCase());
        }
        // provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    }
    // return window.web3Provider;
}

async function initInstances() {
    if (provider === null) {
        return false;
    }
    try {
        console.log("provider@: ", provider);
        if (erc20InstanceList.length > 0) {
            erc20InstanceList = [];
        }
        walletInstance = new ethers.Contract(wallet_address, Wallet.abi, provider);//.getSigner());
        uniswapRouterInstance = new ethers.Contract(uniswapRouter_address, UniswapRouter.abi, provider);//.getSigner());
        entryPointInstance = new ethers.Contract(entryPoint_address, EntryPoint.abi, provider);//.getSigner());
        // ETH-Hangzhou branch begin
        sparkyAccountFactoryInstance = new ethers.Contract(sparkyAccountFactory_address, SparkyAccountFactory.abi, provider);//.getSigner());
        // ETH-Hangzhou branch end

        for (let index = 0; index < erc20_address_list.length; index++) {
            const element = erc20_address_list[index];
            console.log("erc20_address_list "+index+": ",element);
            if (element == "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984") {
                console.log("init uni instance...");
                let erc20Instance = new ethers.Contract(element, Uni.abi, provider);//.getSigner());
                erc20InstanceList.push(erc20Instance);
            }
            if (element == "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14") {
                console.log("init weth instance...");
                let erc20Instance = new ethers.Contract(element, WETH9.abi, provider);//.getSigner());
                erc20InstanceList.push(erc20Instance);
            }
            if (element == "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8") {
                console.log("init usdc instance...");
                let erc20Instance = new ethers.Contract(element, Usdc.abi, provider);//.getSigner());
                erc20InstanceList.push(erc20Instance);
            }
            if (element == "0x779877A7B0D9E8603169DdbD7836e478b4624789") {
                console.log("init link instance...");
                let erc20Instance = new ethers.Contract(element, LinkToken.abi, provider);//.getSigner());
                erc20InstanceList.push(erc20Instance);
            }
            if (element == "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0") {
                console.log("init usdt instance...");
                let erc20Instance = new ethers.Contract(element, Usdt.abi, provider);//.getSigner());
                erc20InstanceList.push(erc20Instance);
            }
        }
        
        console.log("wallet Instance: ",walletInstance);
        console.log("uniswapRouter Instance:",uniswapRouterInstance);
        console.log("entryPoint Instance:",entryPointInstance);
        console.log("SparkyAccountFactory Instance:",sparkyAccountFactoryInstance);
        erc20InstanceList.forEach(element => {
            console.log("erc20 Instance:",element);
        });
        return {status: true };
    } catch (e) {
        console.error('could not init contract instances.', e);
        return false;
    }
}

// calculate account address
async function getWalletAddress(signerAddr, salt, callback) {
    try {
        console.log("signerAddr: ",signerAddr);
        console.log("salt: ",salt);
        await sparkyAccountFactoryInstance.findAddress(signerAddr, salt).then(transactionResponse => {
            console.log("get address receipt status: ", transactionResponse);
            let tmpObj = transactionResponse;
            callback(tmpObj);
        });
    } catch (e) {
        console.error(e);
        callback(0);
    }
}

// get account balance ETH-Hangzhou
async function getEthBalance(addr) {
    let amount = await provider.getBalance(addr);
    console.log("eth amount: ",amount);
    if (amount != null) {
        return { status: true, balance: amount };
    } else {
        return { status: false, response: null };
    }
}

//get account balance ETH-Hangzhou
async function getErc20Balance(addr, erc20Address) {
    let flag = null;
    console.log("erc20Address: ", erc20Address);
    for (let index = 0; index < erc20_address_list.length; index++) {
        if(erc20_address_list[index] == erc20Address) {
            flag = index;
        }
    }
    if (flag == null) {
        console.log("Invalid erc20Address!");
        return { status: false, response: null };
    }
    let amount = await erc20InstanceList[flag].balanceOf(addr);
    console.log("erc20 amount: ",amount);
    if (amount != null) {
        return { status: true, balance: amount };
    } else {
        return { status: false, response: null };
    }
}
//deposit ETH
async function depositETH(toAddr, amount, callback) {
    try {
        let someEther = ethers.parseEther(amount);
        await provider.getSigner().sendTransaction({
            to: toAddr,
            value: someEther
        }).then(transactionResponse => {
            transactionResponse.wait().then(receipt => {
                console.log("deposit receipt status: ", receipt);
                let tmpObj = receipt;
                callback(tmpObj);
            })
        });
        // await walletInstance.depositETH(user, { value: someEther }).then(transactionResponse => {
        //     transactionResponse.wait().then(receipt => {
        //         console.log("deposit receipt status: ", receipt);
        //         let tmpObj = receipt;
        //         callback(tmpObj);
        //         // console.log("deposit finish!");
        //     })
        // });
    } catch (e) {
        console.error(e);
        callback(0);
    }
}

// approve bundler
async function delegate(user, addr, chainId, platform, salt) {
    try {
        const VerificationGasLimit = 350000;
        // 构造调用数据-授权
        let delegatee = bundler_address;
        let bool = true;
        console.log(1);
        let calldata = createCallData("delegate", [delegatee, bool]);
        console.log(2);
        let feeData = await GetEstimatedGasFee();
        // get tx nonce
        let nonce = await entryPointInstance.getNonce(addr, 0);
        console.log("tx nonce: ",nonce);
        console.log("salt: ", salt);
        // if nonce is 0, we need to deploy smart contract account
        let initCode = "0x";
        if (String(nonce) == "0") {
            // create initcode salt == nonce
            initCode = createInitCode(sparkyAccountFactory_address, user, salt);
        };
        // create UserOperationWithouSig
        let userOperationWithoutSig = new UserOperationWithoutSig(
            addr, // wallet addr
            initCode, 
            calldata,
            300000, // You can use this value temporarily, and then increase it
            VerificationGasLimit, // You can use this value temporarily, and then increase it
            100000, // You can use this value temporarily, and then increase it
            String(Math.round(1*ethers.formatUnits(feeData.maxFeePerGas, "wei"))), // value can be adjusted according to the actual situation
            ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"),// value can be adjusted according to the actual situation
            sparkyPaymaster_address, // sparkyPaymaster address
        );
        // user sign 
        let sig = null;
        if (platform) {
            sig = await createTypedDataAndSign(userOperationWithoutSig, chainId, signer);
        }else {
            // let r = window.confirm("Sign this Tx?");
            let r = await new Promise((resolve) => {
                setTimeout(() => {
                  const userResponse = window.confirm("Sign this Tx?");
                  resolve(userResponse);
                }, 2000); // 使用setTimeout来确保在下一个事件循环中执行
              });
            if (r) {
                sig = await signTx(userOperationWithoutSig,chainId); 
            }else{
                return;
            }
        }
        // add user signature to userOperation
        let userOperation = userOperationWithoutSig.addSig(sig);
        return userOperation;
    } catch (e) {
        console.error(e);
    }
}

// transfer eth
async function transferETH(user ,addr, toAddr, amount, salt, chainId, platform, callback) {
    try {
        let func = "0x";
        let someEther = ethers.parseEther(amount);
        let calldata = createCallData("execute", [toAddr, someEther, func]);
        let feeData = await GetEstimatedGasFee();
        // get tx nonce
        let nonce = await entryPointInstance.getNonce(addr, 0);
        console.log("tx nonce: ",nonce);
        console.log("salt: ", salt);
        // if nonce is 0, we need to deploy smart contract account
        let initCode = "0x";
        if (String(nonce) == "0") {
            // create initcode salt == nonce
            initCode = createInitCode(sparkyAccountFactory_address, user, salt);
        }
        // create UserOperationWithouSig
        let userOperationWithoutSig = new UserOperationWithoutSig(
            addr, // wallet addr
            // nonce, // nonce
            initCode, 
            calldata,
            300000, // You can use this value temporarily, and then increase it
            300000, // You can use this value temporarily, and then increase it
            100000, // You can use this value temporarily, and then increase it
            String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei"))), // value can be adjusted according to the actual situation
            ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"),// value can be adjusted according to the actual situation
            sparkyPaymaster_address, // sparkyPaymaster address
        );
        // user sign 
        let sig = null;
        if (platform) {
            sig = await createTypedDataAndSign(userOperationWithoutSig, chainId, signer);
        }else {
            // let r = window.confirm("Sign this Tx?");
            let r = await new Promise((resolve) => {
                setTimeout(() => {
                  const userResponse = window.confirm("Sign this Tx?");
                  resolve(userResponse);
                }, 2000); // 使用setTimeout来确保在下一个事件循环中执行
              });
            if (r) {
                sig = await signTx(userOperationWithoutSig, chainId, signer); 
            }else{
                return;
            }
        }
        // add user signature to userOperation
        let userOperation = userOperationWithoutSig.addSig(sig);

        // userOperation.nonce = nonce; //为userOperation添加nonce值

        
        // await entryPointInstance.handleOps([userOperation], user, {gasLimit: 1000000}).then(transactionResponse => {
        //     transactionResponse.wait().then(receipt => {
        //         console.log("transfer eth receipt status: ", receipt);
        //         let tmpObj = receipt;
        //         callback(tmpObj);
        //     });
        // });

        return userOperation;
    } catch (e) {
        console.error(e);
        // callback(0);
    }
}
// transfer erc20
async function transferErc20(user ,addr, toAddr, tokenAddr, amount, salt, chainId, platform, callback) {
    try {
        let someEther = ethers.parseEther(amount);
        let func = createCallData("transfer", [toAddr, someEther])
        
        let calldata = createCallData("execute", [tokenAddr, 0, func]);
        let feeData = await GetEstimatedGasFee();
        // get tx nonce
        let nonce = await entryPointInstance.getNonce(addr, 0);
        console.log("tx nonce: ",nonce);
        console.log("salt: ", salt);
        // if nonce is 0, we need to deploy smart contract account
        let initCode = "0x";
        if (String(nonce) == "0") {
            // create initcode salt == nonce
            initCode = createInitCode(sparkyAccountFactory_address, user, salt);
        }
        // create UserOperationWithouSig
        let userOperationWithoutSig = new UserOperationWithoutSig(
            addr, // wallet addr
            // nonce, // nonce
            initCode, 
            calldata,
            300000, // You can use this value temporarily, and then increase it
            300000, // You can use this value temporarily, and then increase it
            100000, // You can use this value temporarily, and then increase it
            String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei"))), // value can be adjusted according to the actual situation
            ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"),// value can be adjusted according to the actual situation
            sparkyPaymaster_address, // sparkyPaymaster address
        );
        // user sign 
        let sig = null;
        if (platform) {
            sig = await createTypedDataAndSign(userOperationWithoutSig, chainId, signer);
        }else {
            // let r = window.confirm("Sign this Tx?");
            let r = await new Promise((resolve) => {
                setTimeout(() => {
                  const userResponse = window.confirm("Sign this Tx?");
                  resolve(userResponse);
                }, 2000); // 使用setTimeout来确保在下一个事件循环中执行
              });
            if (r) {
                sig = await signTx(userOperationWithoutSig,chainId); 
            }else{
                return;
            }
        }
        // add user signature to userOperation
        let userOperation = userOperationWithoutSig.addSig(sig);


        // userOperation.nonce = nonce; //为userOperation添加nonce值


        // await entryPointInstance.handleOps([userOperation], user, {gasLimit: 1000000}).then(transactionResponse => {
        //     transactionResponse.wait().then(receipt => {
        //         console.log("transfer eth receipt status: ", receipt);
        //         let tmpObj = receipt;
        //         callback(tmpObj);
        //     });
        // });
        return userOperation;
    } catch (e) {
        console.error(e);
        // callback(0);
    }
}

//approve wallet
async function approve(walletAddress, erc20Address, rawAmount, callback) {
    try {
        let flag = null;
        for (let index = 0; index < erc20_address_list.length; index++) {
            if(erc20_address_list[index] == erc20Address) {
                flag = index;
            }
        }
        if (flag == null) {
            console.log("Invalid erc20Address!");
            callback(0);
            return;
        }
        let erc2Amount = ethers.parseUnits(rawAmount);
        console.log("erc2Amount:",erc2Amount);
        await erc20InstanceList[flag].approve(walletAddress, erc2Amount).then(transactionResponse => {
            transactionResponse.wait().then(receipt => {
                console.log("approve erc20 receipt status: ", receipt);
                let tmpObj = receipt;
                callback(tmpObj);
                // console.log("approve finish!");
            })
        });

        // let eventFilter = erc20Instance.filters.Approval();
        // console.log("tx.blockNumber: ",tx.blockNumber);
        // let events = await erc20Instance.queryFilter(eventFilter, tx.blockNumber, "latest");
        // let eventLen = events.length;
        // console.log("event arg1", events[eventLen-1].args[0]);
        // console.log("event arg2", events[eventLen-1].args[1]);
        // console.log("event arg3", events[eventLen-1].args[2]);

        // return { status: "success", response: {owner: events[eventLen-1].args[0], operator: events[eventLen-1].args[1], amount: events[eventLen-1].args[2]}};
    } catch (e) {
        console.error(e);
        callback(0);
    }
}


//deposit ERC20
async function depositERC20(addr, erc20Address, rawAmount, callback){
    try {
        let flag = null;
        for (let index = 0; index < erc20_address_list.length; index++) {
            if(erc20_address_list[index] == erc20Address) {
                flag = index;
            }
        }
        if (flag == null) {
            console.log("Invalid erc20Address!");
            callback(0);
            return;
        }
        let erc2Amount = ethers.parseUnits(rawAmount);
        await erc20InstanceList[flag].transfer(addr, erc2Amount).then(transactionResponse => {
            transactionResponse.wait().then(receipt => {
                console.log("deposit erc20 receipt status: ", receipt);
                let tmpObj = receipt;
                callback(tmpObj);
            })
        });
    } catch (e) {
        console.error(e);
        callback(0);
    }
}
//deposit ERC20
// async function depositERC20(user, erc20Address, rawAmount, callback) {
//     try {
//         let erc2Amount = ethers.parseUnits(rawAmount);
//         await walletInstance.depositERC20(user, erc20Address, erc2Amount).then(transactionResponse => {
//             transactionResponse.wait().then(receipt => {
//                 console.log("deposit erc20 receipt status: ", receipt);
//                 let tmpObj = receipt;
//                 callback(tmpObj);
//             })
//         });
//     } catch (e) {
//         console.error(e);
//         callback(0);
//     }
// }

//withdraw ETH
async function withdrawETH(user, addr, salt, wethAddr, amount, chainId, callback) {
    try {
        let feeData = await GetEstimatedGasFee();
        let someEther = ethers.parseEther(amount);
        // get tx nonce
        let nonce = await entryPointInstance.getNonce(addr, 0);
        console.log("tx nonce: ",nonce);
        // if nonce is 0, we need to deploy smart contract account
        let initCode = "0x";
        if (String(nonce) == "0") {
            // create initcode salt == nonce
            initCode = createInitCode(sparkyAccountFactory_address, user, salt);
        }
        // create call data
        // let func = createCallData("transfer", [user, someEther]);
        let func = "0x";
        let calldata = createCallData("execute",[user, someEther, func]);
        //createCallData("execute", [wethAddr, 0, func]);
        // create UserOperationWithouSig
        let userOperationWithoutSig = new UserOperationWithoutSig(
            addr, // wallet addr
            // nonce, // nonce
            initCode, 
            calldata,
            300000, // You can use this value temporarily, and then increase it
            300000, // You can use this value temporarily, and then increase it
            100000, // You can use this value temporarily, and then increase it
            String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei"))), // value can be adjusted according to the actual situation
            ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"),// value can be adjusted according to the actual situation
            sparkyPaymaster_address, // sparkyPaymaster address
        );
        // user sign 
        let sig = await createTypedDataAndSign(userOperationWithoutSig, chainId, signer);
        // add user signature to userOperation
        let userOperation = userOperationWithoutSig.addSig(sig);
        await entryPointInstance.handleOps([userOperation], user, {gasLimit: 1000000}).then(transactionResponse => {
            transactionResponse.wait().then(receipt => {
                console.log("withdraw eth receipt status: ", receipt);
                let tmpObj = receipt;
                callback(tmpObj);
            });
        });
    } catch (e) {
        console.error(e);
        callback(0);
    }
}

//withdrawERC20
async function withdrawERC20(user, addr, salt, uniAddr, rawAmount, chainId, callback) {
    try {
        let feeData = await GetEstimatedGasFee();
        let erc2Amount = ethers.parseUnits(rawAmount);
        // get tx nonce
        let nonce = await entryPointInstance.getNonce(addr, 0);
        console.log("tx nonce: ",nonce);
        // if nonce is 0, we need to deploy smart contract account
        let initCode = "0x";
        if (String(nonce) == "0") {
            // create initcode salt == nonce
            initCode = createInitCode(sparkyAccountFactory_address, user, salt);
        }
        // create call data
        let func = createCallData("transfer", [user, erc2Amount]);
        // let func = "0x";
        // let calldata = createCallData("execute",[user, someEther, func]);
        let calldata = createCallData("execute", [uniAddr, 0, func]);
        // create UserOperationWithouSig
        let userOperationWithoutSig = new UserOperationWithoutSig(
            addr, // wallet addr
            // nonce, // nonce
            initCode, 
            calldata,
            300000, // You can use this value temporarily, and then increase it
            300000, // You can use this value temporarily, and then increase it
            100000, // You can use this value temporarily, and then increase it
            String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei"))), // value can be adjusted according to the actual situation
            ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"),// value can be adjusted according to the actual situation
            sparkyPaymaster_address, // sparkyPaymaster address
        );
        // user sign 
        let sig = await createTypedDataAndSign(userOperationWithoutSig, chainId, signer);
        // add user signature to userOperation
        let userOperation = userOperationWithoutSig.addSig(sig);
        await entryPointInstance.handleOps([userOperation], user, {gasLimit: 1000000}).then(transactionResponse => {
            transactionResponse.wait().then(receipt => {
                console.log("withdraw erc20 receipt status: ", receipt);
                let tmpObj = receipt;
                callback(tmpObj);
            });
        });
    } catch (e) {
        console.error(e);
        callback(0);
    }
}
//erc20ToEthDataOperationWrapper
async function erc20ToEthDataOperationWrapper(user, addr, salt, tokenIn, tokenOut, fee, routerAddress, amountIn, amountOutMinimum, chainId, platform,callback) {
    console.log("erc20 To Eth DataOperation Wrapper start:");
    try {
        let feeData = await GetEstimatedGasFee();
        let amountInBig = ethers.parseUnits(amountIn);
        let amountOutMinimumBig = ethers.parseUnits(amountOutMinimum);
        let func_approve = createCallData("approve", [routerAddress, amountInBig]);
        // get tx nonce
        let nonce = await entryPointInstance.getNonce(addr, 0);
        console.log("tx nonce: ",nonce);
        // if nonce is 0, we need to deploy smart contract account
        let initCode = "0x";
        if (String(nonce) == "0") {
            // create initcode salt == nonce
            initCode = createInitCode(sparkyAccountFactory_address, user, salt);
        }
        // wrap params
        let params = {
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee,
            recipient: addr,
            amountIn: amountInBig,
            amountOutMinimum: amountOutMinimumBig,
            sqrtPriceLimitX96: 0
        };
        let func_swap = createCallData("exactInputSingle", [params]);
        // merge tx
        let calldata = createCallData("executeBatch", [[tokenIn, routerAddress], [0, 0], [func_approve, func_swap]]);
        let userOperationWithoutSig = new UserOperationWithoutSig(
            addr,
            // nonce,
            initCode,
            calldata,
            300000,
            300000,
            100000,
            String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei"))), // value can be adjusted according to the actual situation
            ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"),// value can be adjusted according to the actual situation
            sparkyPaymaster_address,
        );
        // user sign 
        let sig = null;
        if (platform) {
            sig = await createTypedDataAndSign(userOperationWithoutSig, chainId, signer);
        }else {
            // let r = window.confirm("Sign this Tx?");
            let r = await new Promise((resolve) => {
                setTimeout(() => {
                  const userResponse = window.confirm("Sign this Tx?");
                  resolve(userResponse);
                }, 2000); // 使用setTimeout来确保在下一个事件循环中执行
              });
            if (r) {
                sig = await signTx(userOperationWithoutSig,chainId); 
            }else{
                return;
            }
        }
        let userOperation = userOperationWithoutSig.addSig(sig);
        // await entryPointInstance.handleOps([userOperation], user, {gasLimit: 1000000}).then(transactionResponse => {
        //     transactionResponse.wait().then(receipt => {
        //         console.log("withdraw erc20 receipt status: ", receipt);
        //         let tmpObj = receipt;
        //         callback(tmpObj);
        //     });
        // });
        return userOperation;
    } catch (e) {
        console.error(e);
    }
}

//ethToErc20DataOperationWrapper
async function ethToErc20DataOperationWrapper(user, addr, salt, tokenIn, tokenOut, fee, routerAddress, amountIn, amountOutMinimum, chainId, platform,callback) {
    console.log("eth To Erc20 DataOperation Wrapper start:");
    try {
        let feeData = await GetEstimatedGasFee();
        let amountInBig = ethers.parseUnits(amountIn);
        let amountOutMinimumBig = ethers.parseUnits(amountOutMinimum);
        // get tx nonce
        let nonce = await entryPointInstance.getNonce(addr, 0);
        console.log("tx nonce: ",nonce);
        // if nonce is 0, we need to deploy smart contract account
        let initCode = "0x";
        if (String(nonce) == "0") {
            // create initcode salt == nonce
            initCode = createInitCode(sparkyAccountFactory_address, user, salt);
        }

        // wrap params
        let params = {
            tokenIn: tokenIn, 
            tokenOut: tokenOut,
            fee: fee,
            recipient: addr, 
            amountIn: amountInBig, 
            amountOutMinimum: amountOutMinimumBig, // calculate according to slip point
            sqrtPriceLimitX96: 0
        }
        console.log("params: ",params);
        let func_swap = createCallData("exactInputSingle", [params]);
        // function execute(dest,value,func)
        // dest is func call destination address，here is ROUTER address，value is tranfer amount，func_swap is calldata
        let calldata = createCallData("execute", [routerAddress, amountInBig, func_swap]);
        let userOperationWithoutSig = new UserOperationWithoutSig(
            addr,
            // nonce,
            initCode,
            calldata,
            300000,
            300000,
            100000,
            String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei"))), // value can be adjusted according to the actual situation
            ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"),// value can be adjusted according to the actual situation
            sparkyPaymaster_address,
        );
        // user sign 
        let sig = null;
        if (platform) {
            sig = await createTypedDataAndSign(userOperationWithoutSig, chainId, signer);
        }else {
            // let r = window.confirm("Sign this Tx?");
            let r = await new Promise((resolve) => {
                setTimeout(() => {
                  const userResponse = window.confirm("Sign this Tx?");
                  resolve(userResponse);
                }, 2000); // 使用setTimeout来确保在下一个事件循环中执行
              });
            if (r) {
                sig = await signTx(userOperationWithoutSig,chainId); 
            }else{
                return;
            }
        }
        let userOperation = userOperationWithoutSig.addSig(sig);

        // userOperation.nonce = nonce; //为userOperation添加nonce值

        // await entryPointInstance.handleOps([userOperation], user, {gasLimit: 1000000}).then(transactionResponse => {
        //     transactionResponse.wait().then(receipt => {
        //         console.log("withdraw erc20 receipt status: ", receipt);
        //         let tmpObj = receipt;
        //         callback(tmpObj);
        //     });
        // });

        return userOperation;
    } catch (e) {
        console.error(e);
    }
}
//ethToErc20LimitedDataOperationWrapper
async function ethToErc20LimitedDataOperationWrapper(user, addr, salt, tokenIn, tokenOut, fee, routerAddress, amountIn, amountOutMinimum, chainId, platform,callback) {
    console.log("eth To Erc20 limited orders DataOperation Wrapper start:");
    try {
        let feeData = await GetEstimatedGasFee();
        let amountInBig = ethers.parseUnits(amountIn);
        let amountOutMinimumBig = ethers.parseUnits(amountOutMinimum);
        // get tx nonce
        let nonce = await entryPointInstance.getNonce(addr, 0);
        console.log("tx nonce: ",nonce);
        // if nonce is 0, we need to deploy smart contract account
        let initCode = "0x";
        if (String(nonce) == "0") {
            // create initcode salt == nonce
            initCode = createInitCode(sparkyAccountFactory_address, user, salt);
        }

        // wrap params
        let params = {
            tokenIn: tokenIn, 
            tokenOut: tokenOut,
            fee: fee,
            recipient: addr, 
            amountIn: amountInBig, 
            amountOutMinimum: amountOutMinimumBig, // calculate according to slip point
            sqrtPriceLimitX96: 0
        }
        console.log("params: ",params);
        let func_swap = createCallData("exactInputSingle", [params]);
        // function execute(dest,value,func)
        // dest is func call destination address，here is ROUTER address，value is tranfer amount，func_swap is calldata
        let calldata = createCallData("execute", [routerAddress, amountInBig, func_swap]);
        let userOperationWithoutSig = new UserOperationWithoutSig(
            addr,
            // nonce,
            initCode,
            calldata,
            300000,
            300000,
            100000,
            String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei"))), // value can be adjusted according to the actual situation
            ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"),// value can be adjusted according to the actual situation
            sparkyPaymaster_address,
        );
        // user sign 
        let sig = null;
        if (platform) {
            sig = await createTypedDataAndSign(userOperationWithoutSig, chainId, signer);
        }else {
            // let r = window.confirm("Sign this Tx?");
            let r = await new Promise((resolve) => {
                setTimeout(() => {
                  const userResponse = window.confirm("Sign this Tx?");
                  resolve(userResponse);
                }, 2000); // 使用setTimeout来确保在下一个事件循环中执行
              });
            if (r) {
                sig = await signTx(userOperationWithoutSig,chainId); 
            }else{
                return;
            }
        }
        let userOperation = userOperationWithoutSig.addSig(sig);

        // await entryPointInstance.handleOps([userOperation], user, {gasLimit: 1000000}).then(transactionResponse => {
        //     transactionResponse.wait().then(receipt => {
        //         console.log("withdraw erc20 receipt status: ", receipt);
        //         let tmpObj = receipt;
        //         callback(tmpObj);
        //     });
        // });

        return userOperation;
    } catch (e) {
        console.error(e);
    }
}
//erc20ToEthLimitedDataOperationWrapper
async function erc20ToEthLimitedDataOperationWrapper(user, addr, salt, tokenIn, tokenOut, fee, routerAddress, amountIn, amountOutMinimum, chainId, platform,callback) {
    console.log("erc20 To eth limited orders DataOperation Wrapper start:");
    try {
        let feeData = await GetEstimatedGasFee();
        let amountInBig = ethers.parseUnits(amountIn);
        let amountOutMinimumBig = ethers.parseUnits(amountOutMinimum);
        let func_approve = createCallData("approve", [routerAddress, amountInBig]);
        // get tx nonce
        let nonce = await entryPointInstance.getNonce(addr, 0);
        console.log("tx nonce: ",nonce);
        // if nonce is 0, we need to deploy smart contract account
        let initCode = "0x";
        if (String(nonce) == "0") {
            // create initcode salt == nonce
            initCode = createInitCode(sparkyAccountFactory_address, user, salt);
        }
        // wrap params
        let params = {
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee,
            recipient: addr,
            amountIn: amountInBig,
            amountOutMinimum: amountOutMinimumBig,
            sqrtPriceLimitX96: 0
        };
        console.log("params amountOutMinimum: ",String(params.amountOutMinimum));
        let func_swap = createCallData("exactInputSingle", [params]);
        // merge tx
        let calldata = createCallData("executeBatch", [[tokenIn, routerAddress], [0, 0], [func_approve, func_swap]]);
        let userOperationWithoutSig = new UserOperationWithoutSig(
            addr,
            // nonce,
            initCode,
            calldata,
            300000,
            300000,
            100000,
            String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei"))), // value can be adjusted according to the actual situation
            ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"),// value can be adjusted according to the actual situation
            sparkyPaymaster_address,
        );
        // user sign 
        let sig = null;
        if (platform) {
            sig = await createTypedDataAndSign(userOperationWithoutSig, chainId, signer);
        }else {
            // let r = window.confirm("Sign this Tx?");
            let r = await new Promise((resolve) => {
                setTimeout(() => {
                  const userResponse = window.confirm("Sign this Tx?");
                  resolve(userResponse);
                }, 2000); // 使用setTimeout来确保在下一个事件循环中执行
              });
            if (r) {
                sig = await signTx(userOperationWithoutSig,chainId); 
            }else{
                return;
            }
        }
        let userOperation = userOperationWithoutSig.addSig(sig);
        // await entryPointInstance.handleOps([userOperation], user, {gasLimit: 1000000}).then(transactionResponse => {
        //     transactionResponse.wait().then(receipt => {
        //         console.log("withdraw eth receipt status: ", receipt);
        //         // let tmpObj = receipt;
        //         // callback(tmpObj);
        //     });
        // });

        return userOperation;
    } catch (e) {
        console.error(e);
    }
}
// async function randomString(e) {    
//     e = e || 32;
//     var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
//     a = t.length,
//     n = "";
//     for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
//     return n;
// }


async function GetEstimatedGasFee() {
    let feeData = await provider.getFeeData();
    console.log(JSON.stringify(feeData));
    console.log("gasPrice: ",ethers.formatUnits(feeData.gasPrice, "wei"));
    // console.log("lastBaseFeePerGas: ",ethers.formatUnits(feeData.lastBaseFeePerGas, "wei"));
    console.log("maxFeePerGas: ",String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei"))));// x 1.2
    console.log("maxPriorityFeePerGas: ",ethers.formatUnits(feeData.maxPriorityFeePerGas, "wei"));
    // console.log(String(1.2*String(Math.round(1.2*ethers.formatUnits(feeData.maxFeePerGas, "wei")))));
    return feeData;//ethers.formatUnits(feeData.maxFeePerGas, "gwei");
}

// function createInitCode(
//     factory,
//     sender,
//     nonce
// ) {

//     let abi = ["function createAccount(address owner,uint salt)"];
//     let iface = new ethers.Interface(abi);
//     let calldata = iface.encodeFunctionData("createAccount", [sender, nonce])
//     let res = factory + calldata.slice(2)
//     return res

// }

// function createCallData(
//     funcName,
//     funcParams
// ) {
//     let abi = [
//         "function transfer(address to, uint amount)",
//         "function approve(address spender, uint amount)",
//         "function execute(address dest, uint value, bytes func)",
//         "function executeBatch(address[] dest, uint[] value, bytes[] func)",
//         "function exactInputSingle(tuple(address tokenIn,address tokenOut,uint24 fee,address recipient,uint amountIn,uint amountOutMinimum,uint160 sqrtPriceLimitX96) params)"
//     ];
//     let iface = new ethers.Interface(abi);
//     return iface.encodeFunctionData(funcName, funcParams)
// }
function createInitCode(
    factory,
    sender,
    nonce
) {

    let abi = ["function createAccount(address owner,uint salt)"];
    let iface = new ethers.Interface(abi);
    let calldata = iface.encodeFunctionData("createAccount", [sender, nonce])
    let res = factory + calldata.slice(2)
    return res

}

function createCallData(
    funcName,
    funcParams
) {
    let abi = [
        "function transfer(address to, uint amount)",
        "function approve(address spender, uint amount)",
        "function execute(address dest, uint value, bytes func)",
        "function executeBatch(address[] dest, uint[] value, bytes[] func)",
        "function exactInputSingle(tuple(address tokenIn,address tokenOut,uint24 fee,address recipient,uint amountIn,uint amountOutMinimum,uint160 sqrtPriceLimitX96) params)",
        "function delegate(address delegatee, bool val)"
    ];
    let iface = new ethers.Interface(abi);
    return iface.encodeFunctionData(funcName, funcParams)
}

// class UserOperationWithoutSig {
//     constructor(sender,  initCode, callData, callGasLimit, verificationGasLimit, preVerificationGas, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData) {
//         this.sender = sender,
//             // this.nonce = nonce,
//             this.initCode = initCode,
//             this.callData = callData,
//             this.callGasLimit = callGasLimit,
//             this.verificationGasLimit = verificationGasLimit,
//             this.preVerificationGas = preVerificationGas,
//             this.maxFeePerGas = maxFeePerGas,
//             this.maxPriorityFeePerGas = maxPriorityFeePerGas,
//             this.paymasterAndData = paymasterAndData
//     }
//     addSig(signature) {
//         let UserOperation = {
//             sender: this.sender,
//             // nonce: this.nonce,
//             initCode: this.initCode,
//             callData: this.callData,
//             callGasLimit: this.callGasLimit,
//             verificationGasLimit: this.verificationGasLimit,
//             preVerificationGas: this.preVerificationGas,
//             maxFeePerGas: this.maxFeePerGas,
//             maxPriorityFeePerGas: this.maxPriorityFeePerGas,
//             paymasterAndData: this.paymasterAndData,
//             signature,
//         }

//         return UserOperation
//     }
// }
// async function createTypedDataAndSign(UserOperationWithoutSig, chainId, signer) {
//     const domain = {
//         name: 'SparkyAccount',
//         version: '1',
//         chainId: chainId,
//         verifyingContract: UserOperationWithoutSig.sender
//     };
//     const types = {
//         UserOperationWithoutSig: [
//             { name: 'sender', type: 'address' },
//             // { name: 'nonce', type: 'uint256' },
//             { name: 'initCode', type: 'bytes' },
//             { name: 'callData', type: 'bytes' },
//             { name: 'callGasLimit', type: 'uint256' },
//             { name: 'verificationGasLimit', type: 'uint256' },
//             { name: 'preVerificationGas', type: 'uint256' },
//             { name: 'maxFeePerGas', type: 'uint256' },
//             { name: 'maxPriorityFeePerGas', type: 'uint256' },
//             { name: 'paymasterAndData', type: 'bytes' },
//         ],
//     };
//     // let typedDataEncoder = new ethers._TypedDataEncoder.from(types) 
//     // console.log(typedDataEncoder)
//     // console.log(typedDataEncoder.hashDomain(domain))
//     // console.log(ethers._TypedDataEncoder.hash(domain, types, { ...UserOperationWithoutSig }))
//     // console.log(ethers._TypedDataEncoder.encode(domain, types, { ...UserOperationWithoutSig }))
//     // console.log(ethers._TypedDataEncoder.hashDomain(domain))

//     // console.log(signer)

//     let signature = await signer._signTypedData(domain, types, { ...UserOperationWithoutSig });
//     return signature;
// }

class UserOperationWithoutSig {
    constructor(sender, initCode, callData, callGasLimit, verificationGasLimit, preVerificationGas, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData) {
        this.sender = sender,
            // this.nonce = nonce,
            this.initCode = initCode,
            this.callData = callData,
            this.callGasLimit = callGasLimit,
            this.verificationGasLimit = verificationGasLimit,
            this.preVerificationGas = preVerificationGas,
            this.maxFeePerGas = maxFeePerGas,
            this.maxPriorityFeePerGas = maxPriorityFeePerGas,
            this.paymasterAndData = paymasterAndData
    }
    addSig(signature) {
        let UserOperation = {
            sender: this.sender,
            // nonce: this.nonce,
            initCode: this.initCode,
            callData: this.callData,
            callGasLimit: this.callGasLimit,
            verificationGasLimit: this.verificationGasLimit,
            preVerificationGas: this.preVerificationGas,
            maxFeePerGas: this.maxFeePerGas,
            maxPriorityFeePerGas: this.maxPriorityFeePerGas,
            paymasterAndData: this.paymasterAndData,
            signature,
        }
        return UserOperation
    }
    addNonce(nonce) {
        let UserOperation = {
            sender: this.sender,
            nonce,
            initCode: this.initCode,
            callData: this.callData,
            callGasLimit: this.callGasLimit,
            verificationGasLimit: this.verificationGasLimit,
            preVerificationGas: this.preVerificationGas,
            maxFeePerGas: this.maxFeePerGas,
            maxPriorityFeePerGas: this.maxPriorityFeePerGas,
            paymasterAndData: this.paymasterAndData,
            signature: this.signature,
        }
        return UserOperation
    }

}



async function createTypedDataAndSign(UserOperationWithoutSig, chainId, signer) {
    const domain = {
        name: 'SparkyAccount',
        version: '1',
        chainId: chainId,
        verifyingContract: UserOperationWithoutSig.sender
    };
    const types = {
        UserOperationWithoutSig: [
            { name: 'sender', type: 'address' },
            // { name: 'nonce', type: 'uint256' },
            { name: 'initCode', type: 'bytes' },
            { name: 'callData', type: 'bytes' },
            { name: 'callGasLimit', type: 'uint256' },
            { name: 'verificationGasLimit', type: 'uint256' },
            { name: 'preVerificationGas', type: 'uint256' },
            { name: 'maxFeePerGas', type: 'uint256' },
            { name: 'maxPriorityFeePerGas', type: 'uint256' },
            { name: 'paymasterAndData', type: 'bytes' },
        ],
    };
    // let typedDataEncoder = new ethers._TypedDataEncoder.from(types) 
    // console.log(typedDataEncoder)
    // console.log(typedDataEncoder.hashDomain(domain))
    // console.log(ethers._TypedDataEncoder.hash(domain, types, { ...UserOperationWithoutSig }))
    // console.log(ethers._TypedDataEncoder.encode(domain, types, { ...UserOperationWithoutSig }))
    // console.log(ethers._TypedDataEncoder.hashDomain(domain))

    console.log(signer);
    console.log("UserOperationWithoutSig: ",UserOperationWithoutSig);
    let signature = await signer.signTypedData(domain, types, { ...UserOperationWithoutSig });
    return signature;
}

export {
  getWeb3Provider,
  initInstances,
  getErc20Balance,
  getEthBalance,
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
  GetEstimatedGasFee,
  transferETH,
  transferErc20,
  login,
  logout,
  getDeviceFactor,
  delegate,
  inputBackupFactorKey,
  resetAccount,
  enableMFA,
  RecoveryFactorKeyUsingMnemonic,
  exportMnemonicFactor,
  reload
}