var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./logger/GameLogger');
var TableName = "users";

module.exports.createUsersTable = function () {
	
	con.connect(function(err) {
		if (err)
		{
			logger.log(TAG , err);
		}
		else
		{
			logger.log(TAG ,"Connected!");
			var sql = "CREATE TABLE "+TableName+" (id VARCHAR(255),name VARCHAR(255), firenumber VARCHAR(255))";
			con.query(sql, function (err, result) {
				if (err)
				{
					logger.log(TAG, err);
				} 
				else
				{
					logger.log(TAG ,TableName+" Table created");
				}
			});
		}
	});
};


