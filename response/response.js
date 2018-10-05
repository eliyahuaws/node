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

		errorResponse.massage = errorMassage;
		errorResponse.massageCode = code;

		switch(code)
		{
			case 100: errorResponse.massage = "Sql Syntax Error"; break;
			case 101: errorResponse.massage = "User Alrady Exist";break;
			case 300: errorResponse.massage = "Device Id Not Exist";break;
			case 400: errorResponse.massage = "Not Valid Params";break;
			case 401: errorResponse.massage = "User Not Found";break;
			case 402: errorResponse.massage = "Question Not Found";break;
			case 700: errorResponse.massage = "Cannot Change Id";break;
			case 701: errorResponse.massage = "Cannot Change Id";break;
			case 999: errorResponse.massage = "Something Go Wrong";break;

		}

		logger.E(TAG,"RESPONSE:500 - BODY "+JSON.stringify(errorResponse) + " " + err + " - code:"+code);
		response.setHeader('Content-Type', 'application/json');
		response.status(500).json(errorResponse);
};

