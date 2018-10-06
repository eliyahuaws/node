var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "user_question";

module.exports.createUserQuestionTable = function (callback) {

	var sql = "CREATE TABLE "+TableName+" (user_questionId VARCHAR(255), agreementId VARCHAR(255), questionId VARCHAR(255), encrypt VARCHAR(255), start_time timestamp , point INT,extraPoint INT,outEncrypt VARCHAR(255));";
	con.query(sql, function (err, result) {
		if (err)
		{
			logger.E(TAG, err);

		} 
		else
		{
			logger.I(TAG ,TableName+" Table created");
		}
		if(callback!=null)
		{
			callback();
		}
	});
};