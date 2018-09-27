var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var responseHandler = require('./../response/response');
var TableName = "users";

module.exports.inserUser = function (response,deviceId,nickName,ip) {


	var device = con.escape(deviceId);
	var name = con.escape(nickName);

	var values = [];
	values.push([device,name]);

	var sql = "INSERT INTO  "+TableName+" (deviceId  ,nickName) VALUES ?";
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
			responseHandler.setResponseOk(response,jsonResponse);
			
		}
	});
};