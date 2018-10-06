var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "question";

module.exports.createQuestionTable = function (callback) {

			logger.I(TAG ,"Connected!");
			var sql = "CREATE TABLE "+TableName+" (questionId VARCHAR(255), subsubjectId VARCHAR(255), questionConnectId INT,questionStageId INT, answer INT, diffeculty INT, time INT,point INT);";
			con.query(sql, function (err, result) {
				if (err)
				{
					logger.E(TAG, err);

				} 
				else
				{
					logger.I(TAG ,TableName+" Table created");
				}
				callback();
			});
};