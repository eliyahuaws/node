var path = require("path");
var TAG = path.basename(__filename+" ");
var logger = require('./../logger/GameLogger');
var errorMassage = "Server Error";

               
module.exports.setResponseOk = function (response,jsonResponse) {

		logger.logI(TAG,"RESPONDE:200 - BODY"+JSON.stringify(jsonResponse));
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
		}

		logger.logE(TAG,"RESPONSE:500 - BODY "+JSON.stringify(errorResponse) + " " + err + " - code:"+code);
		response.setHeader('Content-Type', 'application/json');
		response.status(500).json(errorResponse);
};

