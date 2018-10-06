var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "sub_subject";

module.exports.createSubSubjectTable = function (callback) {

	logger.I(TAG ,"Connected!");
	var sql = "CREATE TABLE "+TableName+" (sub_subjectId VARCHAR(255), sub_subject_hebrew VARCHAR(255), sub_subject_english VARCHAR(255));";
	con.query(sql, function (err, result) {
		if (err)
		{
			logger.E(TAG, err);

		} 
		else
		{
			logger.I(TAG ,TableName+" Table created");
		}


	var values = [];
	values.push([1,"ספורט","sport"],[2,"מטימטיקה","math"]);
	
	var sql = "INSERT INTO "+TableName+" (sub_subjectId , sub_subject_hebrew,sub_subject_english) VALUES ?;";
	con.query(sql,[values], function (err, result) {
		if (err)
		{
		logger.E(TAG, err);
		} 
		logger.I(TAG ,"hebrew and english insert "+values);
		if(callback!=null)
		{
			callback();
		}
	});


	});
};