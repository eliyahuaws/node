var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "question";

module.exports.createQuestionTable = function (callback) {

			logger.log(TAG ,"Connected!");
			var sql = "CREATE TABLE "+TableName+" (questionId VARCHAR(255), subsubjectId VARCHAR(255), questionConnectId INT, answer VARCHAR(255), diffeculty INT, time INT,point INT);";
			con.query(sql, function (err, result) {
				if (err)
				{
					logger.log(TAG, err);

				} 
				else
				{
					logger.log(TAG ,TableName+" Table created");
				}
				callback();
			});
};