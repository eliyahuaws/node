var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "users";

module.exports.createUsersTable = function (callback) {
	
	con.connect(function(err) {
		if (err)
		{
			logger.log(TAG , err);
		}
		else
		{
			logger.log(TAG ,"Connected!");
			var sql = "CREATE TABLE "+TableName+" (deviceId VARCHAR(255) PRIMARY KEY,agreementId VARCHAR(255), nickName VARCHAR(255), fireBaseId VARCHAR(255))";
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
		}
	});
}



