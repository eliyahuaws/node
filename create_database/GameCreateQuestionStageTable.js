var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "question_stage";

module.exports.createquestionStageTable = function (callback) {

	var sql = "CREATE TABLE "+TableName+" (questionStageId INT, questionStageHebrewDesctiption VARCHAR(255),questionStageEnglishDesctiption VARCHAR(255));";
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
		values.push([1,"ילד","children"],[2,"מבוגר","adult"],[3,"חוכנת חיים","Wisdom"]);
		
		var sql = "INSERT INTO "+TableName+" (questionStageId , questionStageHebrewDesctiption,questionStageEnglishDesctiption) VALUES ?;";
		con.query(sql,[values], function (err, result) {
			if (err)
			{
				logger.E(TAG ,err);
			} 
			logger.I(TAG ,"question_stage hebrew and english insert");
			if(callback!=null)
			{
				callback();
			}
		});
	});
};