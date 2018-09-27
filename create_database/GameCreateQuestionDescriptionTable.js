var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "question_description";

module.exports.createQuestionDescriptionTable = function (callback) {

	logger.logI(TAG ,"Connected!");
	var sql = "CREATE TABLE "+TableName+" (questionId VARCHAR(255), languageId VARCHAR(255), question_description VARCHAR(255), answer_description VARCHAR(255));";
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