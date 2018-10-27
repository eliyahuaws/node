var path = require("path");
var TAG = path.basename(__filename+" ");
var logger = require('./../logger/GameLogger');
var errorMassage = "Server Error";

               
module.exports.setResponseOk = function (response,jsonResponse) {

		logger.I(TAG,"RESPONDE:200 - BODY"+JSON.stringify(jsonResponse));
		response.setHeader('Content-Type', 'application/json');
		response.status(200).json(jsonResponse);
	
};

module.exports.setResponseFaild = function (response,err,code) {
		var errorResponse = {};
		errorResponse.status = "500"
		errorResponse.message = errorMassage;
		errorResponse.messageCode = code;

		switch(code)
		{
			case 100: errorResponse.message = "Sql Syntax Error"; break;
			case 101: errorResponse.message = "User Alrady Exist";break;
			case 300: errorResponse.message = "Device Id Not Exist";break;
			case 400: errorResponse.message = "Not Valid Params";break;
			case 401: errorResponse.message = "User Not Found";break;
			case 402: errorResponse.message = "Question Not Found";break;
			case 700: errorResponse.message = "Cannot Change Id";break;
			case 701: errorResponse.message = "Cannot Change Id";break;
			case 999: errorResponse.message = "Something Go Wrong";break;

		}

		logger.E(TAG,"RESPONSE:500 - BODY "+JSON.stringify(errorResponse) + " " + err + " - code:"+code);
		response.setHeader('Content-Type', 'application/json');
		response.status(500).json(errorResponse);
};

