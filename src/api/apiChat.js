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

        //swap textArray example
        // textArray[0] = "Operation submitted: [SWAP]";
        // textArray[1] = "---------------------------------------------------------- ";
        // textArray[2] = "You Pay: 100 ETH(contract address: 0x0000000000000000000000000000000000000000)";
        // textArray[3] = "You Ask: at least 20000 USDC(contract address: 0x55979784068d1BEf37B49F41cAC8040A4b79C4a7)";
        // textArray[3] = "(Asking for a higher price than market rate will turn this into a limit order)";
        let handle = {
            action: null,
            params: []
        };
        // resolve text
        let start = textArray[0].indexOf("[")+1;
        let end = textArray[0].indexOf("]");
        handle.action = textArray[0].substring(start, end);
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
            start = textArray2[5].indexOf(")");
            tokenIn = textArray2[5].substring(0, start);
            console.log("tokenIn ", tokenIn);

            let textArray3 = textArray[3].split(" ");
            let minimalAmountOut = textArray3[4];
            console.log("amountOut: ", minimalAmountOut);
            let tokenOut = null;
            start = textArray3[7].indexOf(")");
            tokenOut = textArray3[7].substring(0, start);
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