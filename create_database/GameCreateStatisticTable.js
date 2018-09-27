var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "statistic";

module.exports.createStatisticTable = function (callback) {

			logger.logE(TAG ,"Connected!");
			var sql = "CREATE TABLE "+TableName+" (agreementId VARCHAR(255), right_answer VARCHAR(255), wrong_answer VARCHAR(255), point VARCHAR(255));";
			con.query(sql, function (err, result) {
				if (err)
				{
					logger.logE(TAG, err);

				} 
				else
				{
					logger.logI(TAG ,TableName+" Table created");
				}
				callback();
			});
};