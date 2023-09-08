import { ethers, utils, BigNumber} from 'ethers';
import  Wallet from './abis/Wallet.json';
import UniswapRouter from "./abis/UniswapRouter.json";
import Erc20 from "./abis/Uni.json";
// import createTypedDataAndSign from "../utils/signTypedData";

const wallet_address = "0x5c0B9D48f40d46634d1AA383CB15987708Ac39E6";
const uniswapRouter_address = "0xb67e30aDb44c83E516681392FA16cD933B93b7ad";
const erc20_address = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";


let walletInstance = null;
let uniswapRouterInstance = null;
let erc20Instance = null;

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
        erc20Instance = new ethers.Contract(erc20_address, Erc20.abi, window.web3Provider.getSigner());
        console.log("walletInstance: ",walletInstance);
        console.log("uniswapRouterInstance:",uniswapRouterInstance);
        console.log("uniInstance:",erc20Instance);
        return {status: true };
    } catch (e) {
        console.error('could not init contract instances.', e);
        return false;
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
async function depositETH(user, amount) {
    let someEther = ethers.utils.parseEther(amount);
    await walletInstance.depositETH(user,{ value: someEther });
    console.log("deposit finish!");
}

//approve wallet
async function approve(walletAddress, rawAmount) {
    try {
        let erc2Amount = ethers.utils.parseUnits(rawAmount);
        console.log("erc2Amount:",erc2Amount);
        let tx = await erc20Instance.approve(walletAddress, erc2Amount);

        let eventFilter = erc20Instance.filters.Approval();
        // console.log("tx.blockNumber: ",tx.blockNumber);
        let events = await erc20Instance.queryFilter(eventFilter, tx.blockNumber, "latest");
        let eventLen = events.length;
        // console.log("event arg1", events[eventLen-1].args[0]);
        // console.log("event arg2", events[eventLen-1].args[1]);
        // console.log("event arg3", events[eventLen-1].args[2]);

        return { status: "success", response: {owner: events[eventLen-1].args[0], operator: events[eventLen-1].args[1], amount: events[eventLen-1].args[2]}};
    } catch (e) {
        console.error(e);
        return { status: "failed", response: null }
    }
}

//deposit ERC20
async function depositERC20(user, erc20Address, rawAmount) {
    let erc2Amount = ethers.utils.parseUnits(rawAmount);
    await walletInstance.depositERC20(user, erc20Address, erc2Amount);
    console.log("deposit erc20 finish!");
}

//withdraw ETH
async function withdrawETH(user, amount) {
    try {
        let someEther = ethers.utils.parseEther(amount);
        await walletInstance.withdrawETH(user, someEther);
        console.log("withdrawETH finish");
    } catch (e) {
        console.error(e);
    }
}

//withdrawERC20
async function withdrawERC20(user,contractAddress, rawAmount) {
    try {
        let erc2Amount = ethers.utils.parseUnits(rawAmount);
        await walletInstance.withdrawERC20(user, contractAddress, erc2Amount);
        console.log("withdrawERC20 finish");
    } catch (e) {
        console.error(e);
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
        console.log(value,r,s,v);
        // call exactInputSingle in relayer
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
  // removeMinter,
  // approveNFT,
  // registerNFTSale,
  // makeOfferWithETH,
  // confirmTrade
}