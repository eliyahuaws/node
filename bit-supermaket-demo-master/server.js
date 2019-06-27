require('console-stamp')(console, {
    pattern: 'dd/mm/yy HH:MM:ss',
    extend: {
        debug: 5,
        fatal: 0,
    },
    include: ['debug', 'info', 'warn', 'error', 'fatal'],
    level: 'debug'
});

const http = require('http');
const requestlib = require('request-promise');
const cors = require('cors')
let express = require('express');
let app = express();

// App settings
let bodyParser = require('body-parser');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.set('http-port', process.env.PORT || 3200);
app.use(express.static('client'))

let bitBaseUrl = "https://bit.bankhapoalim.co.il/ServerServices";
let paymentRequestDescription = "Amazon order no. #14-881-946";
let payTo = process.env.PAY_TO || "osher";

let payToArr = {
    osher: {
        accountId: "B120BE5A-0831-496A-A409-9044B1750BAF",
        agreementSerialId: "a9df7156-2fba-4d8e-b09e-1035fc1e3877",
        deviceId: "0a264cb16e4745baa5a427e6824a65a83e1175c926a44a249877962c4effaf84ee19ba06efab461f8504e90085457ed213071e3c8e4c44a9839640658dc3af5c"
    },
    lior: {
        accountId: "C05F4EFC-87DC-4D5B-B7F6-11B314946985",
        agreementSerialId: "ff81024e-c03c-4586-8022-0b5feba08c6d",
        deviceId: "51993C1B38644F11B23E1DFA2EBEC4B95538F0A4410744C0819679DCD4C05FD2B56AD91C85E847FBA8E7AABBF74A7435DE6FEAE830DE4CAD9FDCE767B56B8811"
    },
    erez: {
        accountId: "7811CF26-14F1-4445-A670-5F514ACFB64A",
        agreementSerialId: "c4f807ce-8fe6-44ab-80bc-70eea125ef11",
        deviceId: "c92e7dda1fbf48118d0684881e6b27b3d9705da8d48e48099ef5a30548377b8969b4675a92b74c049c5c791057e8801db3fce93154774e77a5d3105bc933815e"
    },
    arik: {
        accountId: "015BCE6F-5C8F-49CA-9A58-594BC6BFE6AE",
        agreementSerialId: "240cc5ab-7dc6-4cfb-903b-296a32de24d0",
        deviceId: "D777147855B54A8B9FCD7CDDF918EF38E0448A0FE4F34136979627192D765F6F6553155645B9468DAB48960E3AC32175C390855494FA4CE5B01387ABBFE0FAC4"
    }
};

app.post('/generateQR', function(request, response) {
    return (async () => {
        try {
            let qrRes = await requestQRPayment(payToArr[payTo].accountId, payToArr[payTo].agreementSerialId, payToArr[payTo].deviceId, 1, paymentRequestDescription);
            let retToClinet = {};

            if (qrRes.messageCode === 274) {
                console.debug("generateQR got error 274, too many attempts");
                response.status(429);
                retToClinet = {message: qrRes.messageException}
            } else if (qrRes.linkAddress == null || qrRes.eventSerialId == null) {
                console.debug("generateQR: either linkAddress or eventSerialId is not defined. sending error to client.");
                response.status(500);
                retToClinet = {message: "התרחשה שגיאה בעת ניסיון יצירת ה QR: " + JSON.stringify(qrRes)}
            } else {
                retToClinet = {linkAddress: qrRes.linkAddress, eventSerialId: qrRes.eventSerialId};//.split("=").pop()
            }

            console.debug("generateQR returning: ", JSON.stringify(retToClinet));
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(retToClinet));
        } catch(error) {
            response.setHeader('Content-Type', 'application/json');
            response.status(500);
            if (error.message) {
                response.send(error.message);
            } else {
                response.send(error);
            }
        }
    })();
});

app.get('/checkQRStatus', function(request, response) {
    return (async () => {
        try {
            let resJson = await checkQRPaymentStatus(payToArr[payTo].agreementSerialId, payToArr[payTo].deviceId, request.query.eventSerialId);
            console.debug("checkQRStatus returning to client: ", resJson);
            response.send(JSON.stringify({status: resJson}));
        } catch(error) {
            response.setHeader('Content-Type', 'application/json');
            response.status(500);
            if (error.message) {
                response.send(error.message);
            } else {
                response.send(error);
            }
        }
    })();
});

app.post('/sendPhonePayment', function(request, response) {
    return (async () => {
        try {
            let phoneResponse = await requestPhonePayment(payToArr[payTo].accountId, payToArr[payTo].agreementSerialId, payToArr[payTo].deviceId, 1, paymentRequestDescription, request.body.phonePrefix, request.body.phoneNumber)
            let retToClinet = {};

            if (phoneResponse.messageCode === 276) {
                console.debug("sendPhonePayment got error 276, too many attempts");
                response.status(429);
                retToClinet = {message: phoneResponse.messageException}
            } else if (phoneResponse.transactionData == null || phoneResponse.transactionData.referenceNumber == null) {
                console.debug("sendPhonePayment: phoneResponse.transactionData.referenceNumber is not defined. sending error to client.");
                response.status(500);
                retToClinet = {message: "התרחשה שגיאה בעת ניסיון יצירת הבקשה" + JSON.stringify(phoneResponse)}
            } else {
                retToClinet = {refNumber: phoneResponse.transactionData.referenceNumber};
            }

            console.debug("sendPhonePayment returning: ", JSON.stringify(retToClinet));
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(retToClinet));
        } catch(error) {
            response.setHeader('Content-Type', 'application/json');
            response.status(500);
            if (error.message) {
                response.send(error.message);
            } else {
                response.send(error);
            }
        }
    })();
});

app.get('/checkPhoneStatus', function(request, response) {
    return (async () => {
        try {
            let resJson = await checkPhonePaymentStatus(payToArr[payTo].agreementSerialId, payToArr[payTo].deviceId, request.query.refNumber);
            console.debug("checkPhoneStatus returning to client: ", resJson);
            response.send(JSON.stringify({status: resJson}));
        } catch(error) {
            response.setHeader('Content-Type', 'application/json');
            response.status(500);
            if (error.message) {
                response.send(error.message);
            } else {
                response.send(error);
            }
        }
    })();
});

// Server start
http.createServer(app).listen(app.get('http-port'), function(){
    console.info("HTTP Server listening on port: ", app.get('http-port'));
    console.info("Paying to: ", payTo);
});

async function requestQRPayment(accountId, agreementSerialId, deviceId, requestedAmount, requestDescription) {
    let headers = {
        'VariousChannelTypeCode': '6',
        'Content-Type': 'application/json;charset=UTF-8',
        'queueSerialId': 'E03'
    };

    let jsonBody = {
        "currencyTypeCode": 1,
        "paymentMeanSerialId": accountId,
        "requestAmount": requestedAmount,
        "requestSubjectDescription": requestDescription
    };

    let uri = bitBaseUrl + "/p2p/v1/transactions/" + agreementSerialId + "/" + deviceId + "/events/random";

    try {
        let response = await sendHTTPRequest("POST", headers, jsonBody, uri);
        return response;
    } catch (error) {
        console.error("Error while trying to create qr payment request: ", error);
        throw error;
    }
}

async function requestPhonePayment(accountId, agreementSerialId, deviceId, requestedAmount, requestDescription, phonePrefix, phoneNumber) {
    let headers = {
        'VariousChannelTypeCode': '6',
        'Content-Type': 'application/json;charset=UTF-8',
        'queueSerialId': 'E03'
    };

    let jsonBody = {
        "currencyTypeCode": 1,
        "paymentMeanSerialId": accountId,
        "requestAmount": requestedAmount,
        "requestSubjectDescription": requestDescription,
        "sendeeDataList": [
            {
                "sendeePhoneNumber": phoneNumber,
                "sendeePhoneNumberPrefix": phonePrefix
            }
        ]
    };
    let uri = bitBaseUrl + "/p2p/v1/transactions/" + agreementSerialId + "/" + deviceId + "/requests";
    try {
        let response = await sendHTTPRequest("POST", headers, jsonBody, uri);
        return response;
    } catch (error) {
        console.error("Error while trying to create phone payment request: ", error);
        throw error;
    }
}

async function checkQRPaymentStatus(agreementSerialId, deviceId, eventSerialId) {
    let headers = {
        'VariousChannelTypeCode': '6',
        'queueSerialId': 'E03'
    };
    let uri = bitBaseUrl + "/p2p/v1/transactions/recipients/" + agreementSerialId + "/" + deviceId + "/events/random/" + eventSerialId + "/states";
    try {
        let response = await sendHTTPRequest("GET", headers, null, uri);
        return JSON.parse(response).status;
    } catch (error) {
        console.error("Error while trying check QR payment status: ", error);
        throw error;
    }
}

async function checkPhonePaymentStatus(agreementSerialId, deviceId, refNumber) {
    let headers = {
        'VariousChannelTypeCode': '6',
        'queueSerialId': 'E03'
    };
    let uri = bitBaseUrl + "/p2p/v1/transactions/" + agreementSerialId + "/" + deviceId
    try {
        let resStatus = -1;
        let response = await sendHTTPRequest("GET", headers, null, uri);
        // search for the ref number
        JSON.parse(response).completedTransactionsData.completedTransactions.forEach(function(element) {
            if (element.referenceNumber == refNumber) {
                console.debug("Found the transaction, status is: ", element.eventStatusCode);
                resStatus = element.eventStatusCode;
            }
        });

        return resStatus;
    } catch (error) {
        console.error("Error while trying check phone payment status: ", error);
        throw error;
    }
}

async function sendHTTPRequest(method, headers, jsonBody, uri) {
    let options = {
        method: method
        ,headers: headers
        ,json: jsonBody
        ,uri: uri
    };

    let response = await requestlib(options);
    return response;
}

async function tester() {
    let retObj = await requestQRPayment(payToArr[payTo].accountId, payToArr[payTo].agreementSerialId, payToArr[payTo].deviceId, 1, paymentRequestDescription)
    console.debug("requestQRPayment returned: ", retObj);

    let phoneString = await requestPhonePayment(payToArr[payTo].accountId, payToArr[payTo].agreementSerialId, payToArr[payTo].deviceId, 1, paymentRequestDescription, "058", "6909192")
    console.debug("phoneString returned: ", phoneString);

    let paymentStatus = await checkPaymentStatus(payToArr[payTo].agreementSerialId, payToArr[payTo].deviceId, payToArr[payTo].retObj.eventSerialId)
    console.debug("checkPaymentStatus returned: ", paymentStatus);
}