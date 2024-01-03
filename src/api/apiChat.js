// import request from "@/api/base/request";
// import md5 from 'js-md5';
const axios = require('axios');

// function getChatResponse(walletAddress, text) {
//     axios.post('webhooks/rest/webhook', {
//         sender: walletAddress,
//         message: text
//     })
//         .then(response => {
//             console.log(response);
//             console.log("Get response from ai server.");
//             return response.data;
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }
// dataExample:[
//     {
//         "recipient_id": "0x1234567890123456789012345678901234567890",
//         "text": "Operation submitted: [TRANSFER]\n---------------------------------------------------------- \nYou Send: 100 ETH(contract address: 0x0000000000000000000000000000000000000000)\nRecepient: 0x0000000000000000000000000000000000000000"
//     }
// ]
function responseParser(data) {
    const operation = {
        sender: null,
        handles: []
    };
    if (data.recipient_id != null && data.text != null) {
        let textArray = data.text.split('\n');
        //transfer textArray example
        // textArray[0] = "Operation submitted: [TRANSFER]";
        // textArray[1] = "---------------------------------------------------------- ";
        // textArray[2] = "You Send: 100 ETH(contract address: 0x0000000000000000000000000000000000000000)";
        // textArray[3] = "Recepient: 0x0000000000000000000000000000000000000000";

        // swap market price textArray example
        // textArray[0] = "Operation submitted: [SWAP]";
        // textArray[1] = "----------------------------------------------------------";
        // textArray[2] = "You Pay: 0.01 ETH (contract address: 0x0000000000000000000000000000000000000000)";
        // textArray[3] = "You Ask: UNI (contract address: 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984)";

        // swap limit order textArray example
        // textArray[0] = "Operation submitted: [SWAP]";
        // textArray[1] = "---------------------------------------------------------- ";
        // textArray[2] = "You Pay: 100 ETH(contract address: 0x0000000000000000000000000000000000000000)";
        // textArray[3] = "You Ask: 0.05 UNI (contract address: 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984)";
        
        // copy transactions example
        // textArray[0] = "Operation submitted: [COPY]";
        // textArray[1] = "----------------------------------------------------------";
        // textArray[2] = "You Copy Transactions from: 0xB178e99e401cBbd7F1a9bdafaa7D2D027B42d80A";
        // textArray[3] = "Cap amount of paid ETH in each transaction: 0.002";

        let handle = {
            action: null,
            params: []
        };
        // resolve text
        let start = textArray[0].indexOf("[")+1;
        let end = textArray[0].indexOf("]");
        handle.action = textArray[0].substring(start, end);
        if (handle.action == "COPY") {
            let param = {
                limitAmountIn: null,
                targetAddr: null
            };
            let textArray2 = textArray[2].split(" ");
            let targetAddr = textArray2[4];
            let textArray3 = textArray[3].split(" ");
            let limitAmountIn = textArray3[8];

            param.limitAmountIn = limitAmountIn;
            param.targetAddr = targetAddr;

            handle.params.push(param);
        }
        if (handle.action == "TRANSFER") {
            let param = {
                sender: null,
                amount: null,
                token: null,
                receiver: null
            };
            let sender = data.recipient_id;
            let textArray2 = textArray[2].split(" ");
            let amount = textArray2[2];
            console.log("amount: ", amount);
            let start = 0;
            let token = null;
            start = textArray2[5].indexOf(")");
            token = textArray2[5].substring(0, start);
            console.log("token: ", token);

            let textArray3 = textArray[3].split(" ");
            let receiver = textArray3[1];
            console.log("receiver: ", receiver);
            param.sender = sender;
            param.amount = amount;
            param.token = token;
            param.receiver = receiver;

            handle.params.push(param);
        } 
        if (handle.action == "SWAP") {
            let param = {
                tokenIn: null,
                amountIn: null,
                tokenOut: null,
                minimalAmountOut: null
            };
            let textArray2 = textArray[2].split(" ");
            let amountIn = textArray2[2];
            console.log("amountIn: ", amountIn);
            let start = 0;
            let tokenIn = null;
            start = textArray2[6].indexOf(")");
            tokenIn = textArray2[6].substring(0, start);
            // tokenIn = textArray[2].match("\b0x[0-9a-fA-F]{40}\b");
            console.log("tokenIn ", tokenIn);

            let textArray3 = textArray[3].split(" ");
            let minimalAmountOut = 0;
            if (textArray3.length == 6) {
                minimalAmountOut = 0;
            }
            if (textArray3.length == 7) {
                minimalAmountOut = textArray3[2];
            }
            console.log("amountOut: ", minimalAmountOut);
            let tokenOut = null;
            start = textArray3[6].indexOf(")");
            tokenOut = textArray3[6].substring(0, start);
            // tokenOut = textArray[3].match("\b0x[0-9a-fA-F]{40}\b");
            console.log("tokenOut: ", tokenOut);

            param.amountIn = amountIn;
            param.tokenIn = tokenIn;
            param.minimalAmountOut = minimalAmountOut;
            param.tokenOut = tokenOut;

            handle.params.push(param);
        }
        // wrap operation
        operation.sender = data.recipient_id;
        operation.handles.push(handle);
        // console.log("operation: ", operation);
        return operation;
    }
    
}

// function getChatParams(text) {
//     let app_id = 2151744249;
//     let app_key = 'AWNcQGMMWi0OUceN';
//     let nonce_str = 'fa577ce340859f9fe';
//     let question = encodeURIComponent(text);
//     let session = 10000;
//     let time_stamp = parseInt(Date.now() / 1000);

//     let params = 'app_id=' + app_id + '&nonce_str=' + nonce_str + '&question=' + question + '&session=' + session + '&time_stamp=' + time_stamp + '&app_key=' + app_key;
//     let sign = null;//md5(params).toUpperCase()

//     return params+'&sign='+sign
// }

export {
    // getChatResponse, 
    responseParser
}