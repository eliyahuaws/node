var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "language";

module.exports.createLanguageTable = function (callback) {

	logger.logI(TAG ,"Connected!");
	var sql = "CREATE TABLE "+TableName+" (languageId VARCHAR(255), language_description VARCHAR(255));";
	con.query(sql, function (err, result) {
		if (err)
		{
			logger.logE(TAG, err);

		} 
		else
		{
			logger.logI(TAG ,TableName+" Table created");
		}


	var values = [];
	values.push([1,"hebrew"],[2,"english"]);
	
	var sql = "INSERT INTO "+TableName+" (languageId , language_description) VALUES ?;";
	con.query(sql,[values], function (err, result) {
		if (err)
		{
			var code = 100;
			logger.logE(TAG ,"DEVICE_ID:"+deviceId +" IP:"+ ip +" "+ err);
			responseHandler.setResponseFaild(response,err,code);
		} 
		logger.logI(TAG ,"hebrew and english insert");
		if(callback!=null)
		{
			callback();
		}
	});




	});
};