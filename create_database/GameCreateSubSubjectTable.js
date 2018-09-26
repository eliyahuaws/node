var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "sub_subject";

module.exports.createSubSubjectTable = function (callback) {

	logger.log(TAG ,"Connected!");
	var sql = "CREATE TABLE "+TableName+" (sub_subjectId VARCHAR(255), sub_subject_hebrew VARCHAR(255), sub_subject_engish VARCHAR(255));";
	con.query(sql, function (err, result) {
		if (err)
		{
			logger.log(TAG, err);

		} 
		else
		{
			logger.log(TAG ,TableName+" Table created");
		}

		if(callback!=null)
		{
			callback();
		}
	});
};