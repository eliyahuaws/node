var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "user_answer";

module.exports.createUserAnswerTable = function (callback) {

	logger.logI(TAG ,"Connected!");
	var sql = "CREATE TABLE "+TableName+" (user_answerId VARCHAR(255), agreementId VARCHAR(255), questionId INT, start_time timestamp NULL DEFAULT NULL, end_time timestamp NULL DEFAULT NULL, point INT,right_answer INT);";
	con.query(sql, function (err, result) {
		if (err)
		{
			logger.logE(TAG, err);

		} 
		else
		{
			logger.logI(TAG ,TableName+" Table created");
		}
		if(callback!=null)
		{
			callback();
		}
	});
};