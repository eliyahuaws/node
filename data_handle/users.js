var path = require("path");
var TAG = path.basename(__filename+" ");
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var responseHandler = require('./../response/response');

var mysql = require('mysql');
var crypto = require('crypto')

var TableName = "users";

module.exports.createUser = function (response,deviceId,nickName,ip) {

	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();	
	var agreementId = crypto.createHash('sha1').update(current_date + random).digest('hex');

	var device = con.escape(deviceId).replace(/'/g,"");
	var name = con.escape(nickName).replace(/'/g,"");


	var values = [];
	values.push([device,agreementId, name]);

	var sql = "INSERT INTO  "+TableName+" (deviceId ,agreementId ,nickName) VALUES ?";
	con.query(sql,[values], function (err, result) {
		if (err)
		{
			var code = 100;
			if(err.code =="ER_DUP_ENTRY")
			{
				code = 101;
			}
			logger.logE(TAG ,"DEVICE_ID:"+deviceId +" IP:"+ ip +" "+ err);
			responseHandler.setResponseFaild(response,err,code);
		} 
		else
		{
			var jsonResponse = {};
			jsonResponse.status = "ok";
			jsonResponse.agreementId = agreementId;
			responseHandler.setResponseOk(response,jsonResponse);
			
		}
	});
};


module.exports.getAgreemrntIdByDeviceId= function(response,deviceId,ip)
{

	var device = con.escape(deviceId);

	var sql ="Select agreementId From users WHERE deviceId = "+device;
	con.query(sql,function(err,result){
		if(err)
		{
			var code = 100;
			logger.logE(TAG ,"DEVICE_ID:"+deviceId +" IP:"+ ip +" "+ err);
			responseHandler.setResponseFaild(response,err,code);
		}
		else
		{
			try
			{
				var jsonResponse = {};
				jsonResponse.status = "ok";
				jsonResponse.agreementId = result[0].agreementId;

				responseHandler.setResponseOk(response,jsonResponse);
			}
			catch(error)
			{
				responseHandler.setResponseFaild(response," * cannot find device id - "+device +" * "+error,300);
			}

		}
	});
}
