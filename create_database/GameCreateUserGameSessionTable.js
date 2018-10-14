var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "game_session";

module.exports.createUserSessionGameTable = function (callback) {
			var sql = "CREATE TABLE "+TableName+" (agreementId VARCHAR(255), start_time timestamp  ,sessionId VARCHAR(255), win INT,close INT);";
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
}
