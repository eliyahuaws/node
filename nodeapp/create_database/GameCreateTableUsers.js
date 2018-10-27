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
			logger.E(TAG , err);
		}
		else
		{
			logger.I(TAG ,"Connected!");
			var sql = "CREATE TABLE "+TableName+" (deviceId VARCHAR(255) ,agreementId VARCHAR(255),lastDeviceId VARCHAR(255),userName VARCHAR(255),password VARCHAR(255),nickName VARCHAR(255),fireBaseId VARCHAR(255), languageId INT, questionStage INT,lastConnection timestamp,PRIMARY KEY(deviceId, agreementId))";
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
		}
	});
}



