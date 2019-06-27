let screenStateEnum = {
    "HOME": 1,
    "QR": 2,
    "WAIT_FOR_QR_APPROVE": 3,
    "WAIT_FOR_PHONE_APPROVE": 4,
    "APPROVED": 5,
    "DECLINED": 6
};
Object.freeze(screenStateEnum)

// DOM Ready =============================================================
$(document).ready(function () {
    //Shopping clicks
    $('#goPayButton').on('click', setPayingScreen);
    $('#payButton').on('click', openPaymentPopup);
    $("#phonePrefix").keyup(function () {
        validatePhoneNumber();
    });
    $("#phoneNumber").keyup(function () {
        validatePhoneNumber();
    });
    $('#sendPhoneNumber').on('click', sendPhoneRequest);
    $('#dismissButton').on('click', function (e) {
        setScreenState(screenStateEnum.HOME);
    });
    $('#dismissButton2').on('click', function (e) {
        setScreenState(screenStateEnum.HOME);
    });
    setScreenState(screenStateEnum.HOME);
    setProductScreen();
});

// Functions =============================================================
let qrTimer = 60;
let serverBaseUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
let disableQRCheck = false;
let disablePhoneCheck = false;

// open the Bit payment dialog
async function openPaymentPopup() {
    // create a QR image and start the timers
    generateQRCode();
    setScreenState(screenStateEnum.QR);
};

// Generate a new QR code image and place it in the #payQR element
function generateQRCode() {
    // show the 'generating QR' spinner
    $('#QRSpinner').show();
    $.ajax({
            type: "POST",
            dataType: "json",
            url: serverBaseUrl + '/generateQR'
        })
        .done(function (data) {
            // hide the spinner
            $('#QRSpinner').hide();

            console.debug("generaeQR returned: ", data);

            // Show qr image for user
            let typeNumber = 4;
            let errorCorrectionLevel = 'L';
            let qr = qrcode(typeNumber, errorCorrectionLevel);
            //  put the QR link here (from Bit)
            qr.addData(data.linkAddress);

            qr.make();
            $('#payQR').html(qr.createSvgTag());
            $('#payQR svg').width(265).height(265);

            // start the timer and status loop
            qrTimer = 60;
            qrTimerLoop();
            qrStatusLoop(data.eventSerialId);
        })
        .fail(function (error) {
            console.debug("Error while generating qr code: " + error);
            alert("Erorr!\n" + error.responseText);
            setScreenState(screenStateEnum.HOME);
        }, "json");
}

// update the UI timer every 1 sec and count to 0 (stops at 0)
function qrTimerLoop() {
    if (qrTimer-- > 0) {
        // update the timer text and set up next timer
        $('#timeCounter').text(qrTimer);
        window.setTimeout(qrTimerLoop, 1000);
    }
}

// called every 1 sec to check if the QR has been scanned and paid
async function qrStatusLoop(eventSerialId) {
    if (!disableQRCheck) {
        pollQRPaymentStatus(eventSerialId).then(function (data) {
            console.debug("checkQRStatus returned: ", data.status);
            if (data.status === 'TIMED_OUT') {
                // reset the QR image and reset the timer
                setScreenState(screenStateEnum.QR);
                generateQRCode();
                qrTimer = 60;
            } else if (data.status === 'SCANNED') {
                // user scanned the QR, wait until it's approved or not
                setScreenState(screenStateEnum.WAIT_FOR_QR_APPROVE);
                window.setTimeout(qrStatusLoop(eventSerialId), 1000);
            } else if (data.status === 'CREDIT_SUCCEEDED') {
                // show success message
                setScreenState(screenStateEnum.APPROVED);
            } else if (data.status === 'DECLINED') {
                setScreenState(screenStateEnum.DECLINED);
            } else {
                // wait for status to change
                window.setTimeout(qrStatusLoop(eventSerialId), 1000);
            }
        }).catch(function (error) {
            console.debug("Error while checking qr payment status: " + error);
            alert("Erorr!\n" + error.responseText);
            setScreenState(screenStateEnum.HOME);
        }, "json");
    }
}

// check the status of a pending QR payment
async function pollQRPaymentStatus(eventSerialId) {
    let result;

    try {
        result = await $.ajax({
            type: "GET",
            dataType: "json",
            data: {
                "eventSerialId": eventSerialId
            },
            url: serverBaseUrl + '/checkQRStatus'
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// send payment request via phone number
function sendPhoneRequest() {
    let prefix = $('#phonePrefix').val();
    let phoneNumber = $('#phoneNumber').val();
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            "phonePrefix": prefix,
            "phoneNumber": phoneNumber
        },
        url: serverBaseUrl + '/sendPhonePayment'
    }).done(function (data) {
        console.debug("sendPhoneRequest returned ref number: ", data.refNumber);
        setScreenState(screenStateEnum.WAIT_FOR_PHONE_APPROVE);
        phoneStatusLoop(data.refNumber)
    }).fail(function (error) {
        console.debug("Error while sending phone request: " + error);
        alert("Erorr!\n" + error.responseText);
        setScreenState(screenStateEnum.HOME);
    }, "json");
}

// called every 1 sec to check if the QR has been scanned and paid
function phoneStatusLoop(refNumber) {
    if (!disablePhoneCheck) {
        pollPhonePaymentStatus(refNumber).then(function (data) {
            console.debug("phoneStatusLoop returned: ", data.status);
            if (data.status === 2) {
                setScreenState(screenStateEnum.APPROVED);
            } else if (data.status === 3) {
                setScreenState(screenStateEnum.DECLINED);
            } else {
                // wait for status to change
                window.setTimeout(phoneStatusLoop(refNumber), 1000);
            }
        }).catch(function (error) {
            console.debug("Error while checking phone payment status: " + error);
            alert("Erorr!\n" + error.responseText);
            setScreenState(screenStateEnum.HOME);
        }, "json");
    }
}

// check the status of a pending phone payment
async function pollPhonePaymentStatus(refNumber) {
    let result;

    try {
        result = await $.ajax({
            type: "GET",
            dataType: "json",
            data: {
                "refNumber": refNumber
            },
            url: serverBaseUrl + '/checkPhoneStatus'
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function setScreenState(state) {
    $('#payPopup1').hide();
    $('#payPopup2').hide();
    $('#payPopup3').hide();
    $('#payPopup4').hide();
    switch (state) {
        case screenStateEnum.HOME: {
                disablePhoneCheck = false;
                disableQRCheck = false;
                break;
        } case screenStateEnum.QR: {
                $('#payPopup1').show();
                break;
        } case screenStateEnum.WAIT_FOR_QR_APPROVE: {
                disablePhoneCheck = true;
                $('#payPopup2').show();
                break;
        } case screenStateEnum.WAIT_FOR_PHONE_APPROVE: {
                disableQRCheck = true;
                $('#payPopup2').show();
                break;
        } case screenStateEnum.APPROVED: {
                $('#payPopup3').show();
                break;
        } case screenStateEnum.DECLINED: {
                $('#payPopup4').show();
                break;
        }
    }
}

// enable the "send phone number" button only if the phone number is valid
function validatePhoneNumber() {
    let regex = RegExp("05\\d{1}-\\d{7}");
    let phoneNumber = $('#phonePrefix').val() + "-" + $('#phoneNumber').val();
    let valid = regex.test(phoneNumber);
    $('#sendPhoneNumber').prop('disabled', !valid);
}
//====================================================

function setProductScreen() {
    setBackground("productScreen.png");
}

function setPayingScreen() {
    setBackground("payingScreen.png");
}

function setBackground(backgroundImage) {
    document.getElementById("imgShoppingCart").src="/images/" + backgroundImage;
};