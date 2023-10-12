import { ethers, utils, BigNumber} from 'ethers';
import  Wallet from './abis/Wallet.json';
import UniswapRouter from "./abis/UniswapRouter.json";
import Uni from "./abis/Uni.json";
import SparkyAccountFactory from "./abis/SparkyAccountFactory.json";
// import createTypedDataAndSign from "../utils/signTypedData";

const wallet_address = "0x90CaF385c36b19d9f2BB9B5098398b6844eff8eB";
const uniswapRouter_address = "0x63A62CBFeBaADFE58CA7E876b6b72868C4aA7CB6";
const erc20_address_list = ["0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"];// [0:Uni]

// ETH-Hangzhou branch begin
const sparkyAccountFactory_address = "0x8f22d87aB8124356291e79AABaA2977183D68B07";
// ETH-Hangzhou branch end

let walletInstance = null;
let uniswapRouterInstance = null;
let erc20InstanceList = [];

let sparkyAccountFactoryInstance = null;

//获取 metamask provider
function getWeb3Provider() {

    if (!window.web3Provider) {
        if (!window.ethereum) {
            return null;
        }
        window.web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    }
    return window.web3Provider;
}

async function initInstances(provider) {
    if (provider === null) {
        return false;
    }
    try {
        
        walletInstance = new ethers.Contract(wallet_address, Wallet.abi, window.web3Provider.getSigner());
        uniswapRouterInstance = new ethers.Contract(uniswapRouter_address, UniswapRouter.abi, window.web3Provider.getSigner());
        
        // ETH-Hangzhou branch begin
        sparkyAccountFactoryInstance = new ethers.Contract(sparkyAccountFactory_address, SparkyAccountFactory.abi, window.web3Provider.getSigner());
        // ETH-Hangzhou branch end

        for (let index = 0; index < erc20_address_list.length; index++) {
            const element = erc20_address_list[index];
            console.log("erc20_address_list "+index+": ",element);
            let erc20Instance = new ethers.Contract(element, Uni.abi, window.web3Provider.getSigner());
            erc20InstanceList.push(erc20Instance);
        }
        
        console.log("wallet Instance: ",walletInstance);
        console.log("uniswapRouter Instance:",uniswapRouterInstance);
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
async function getAddress(signerAddr, salt, callback) {
    try {
        await sparkyAccountFactoryInstance.getAddress(signerAddr, salt).then(transactionResponse => {
            console.log("get address receipt status: ", transactionResponse);
            let tmpObj = transactionResponse;
            callback(tmpObj);
        });
    } catch (e) {
        console.error(e);
        callback(0);
    }
}

//get account balance
async function getBalance(user, contractAddress) {
    let amount = await walletInstance.balanceOf(user, contractAddress);
    if (amount != "") {
        return { status: true, balance: amount };
    } else {
        return { status: false, response: null };
    }
}
//deposit ETH
async function depositETH(user, amount, callback) {
    try {
        let someEther = ethers.utils.parseEther(amount);
        await walletInstance.depositETH(user, { value: someEther }).then(transactionResponse => {
            transactionResponse.wait().then(receipt => {
                console.log("deposit receipt status: ", receipt);
                let tmpObj = receipt;
                callback(tmpObj);
                // console.log("deposit finish!");
            })
        });
    } catch (e) {
        console.error(e);
        callback(0);
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
        let erc2Amount = ethers.utils.parseUnits(rawAmount);
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
async function depositERC20(user, erc20Address, rawAmount, callback) {
    try {
        let erc2Amount = ethers.utils.parseUnits(rawAmount);
        await walletInstance.depositERC20(user, erc20Address, erc2Amount).then(transactionResponse => {
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

//withdraw ETH
async function withdrawETH(user, amount, callback) {
    try {
        let someEther = ethers.utils.parseEther(amount);
        await walletInstance.withdrawETH(user, someEther).then(transactionResponse => {
            transactionResponse.wait().then(receipt => {
                console.log("withdraw receipt status: ",receipt);
                let tmpObj = receipt;
                callback(tmpObj);
            })
        });
    } catch (e) {
        console.error(e);
        callback(0);
    }
}

//withdrawERC20
async function withdrawERC20(user,contractAddress, rawAmount, callback) {
    try {
        let erc2Amount = ethers.utils.parseUnits(rawAmount);
        await walletInstance.withdrawERC20(user, contractAddress, erc2Amount).then(transactionResponse => {
            transactionResponse.wait().then(receipt => {
                console.log("withdraw erc20 receipt status: ",receipt);
                let tmpObj = receipt;
                callback(tmpObj);
            })
        });
    } catch (e) {
        console.error(e);
        callback(0);
    }
}


//createTypedDataAndSign
async function createTypedData(tokenIn, tokenOut, fee, routerAddress, amountIn, amountOutMinimum, chainId) {
    try {
        let amountInBig = ethers.utils.parseUnits(amountIn);
        let amountOutMinimumBig = ethers.utils.parseUnits(amountOutMinimum);
        let salt = await randomString(32);
        let saltByte32 = web3.utils.asciiToHex(salt);
        console.log("salt:",saltByte32);
        let { value, r, s, v } = await createTypedDataAndSign(tokenIn, tokenOut, fee, routerAddress, amountInBig, amountOutMinimumBig, window.web3Provider.getSigner(), chainId, saltByte32);
        console.log("sign finish");
        return { value, r, s, v };
    } catch (e) {
        console.error(e);
    }
}

async function randomString(e) {    
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}


async function createTypedDataAndSign(tokenIn, tokenOut, fee, routerAddress, amountIn, amountOutMinimum, signer, chainId, salt) {
    const domain = {
        name: 'UniswapRouter',
        version: '1',
        chainId: chainId,
        verifyingContract: routerAddress
    };
    const types = {
        ExactInputSingleParams: [
            { name: 'tokenIn', type: 'address' },
            { name: 'tokenOut', type: 'address' },
            { name: 'fee', type: 'uint24' },
            { name: 'recipient', type: 'address' },
            { name: 'amountIn', type: 'uint256' },
            { name: 'amountOutMinimum', type: 'uint256' },
            { name: 'sqrtPriceLimitX96', type: 'uint160' },
            { name: 'salt', type: 'bytes32' }
        ],
    };
    let value = {
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        fee: fee,
        recipient: routerAddress,
        amountIn: amountIn,
        amountOutMinimum: amountOutMinimum,
        sqrtPriceLimitX96: 0,
        salt: salt
    }

    let signature = await signer._signTypedData(domain, types, value);
    let r = "0x" + signature.slice(2, 66)
    let s = "0x" + signature.slice(66, 130)
    let v = "0x" + signature.slice(130, 132)
    let res = {
        value: value,
        r: r,
        s: s,
        v: v
    }
    return res
}

export {
  getWeb3Provider,
  initInstances,
  getBalance,
  depositETH,
  approve,
  depositERC20,
  withdrawETH,
  withdrawERC20,
  createTypedData,
  getAddress,
  // approveNFT,
  // registerNFTSale,
  // makeOfferWithETH,
  // confirmTrade
}