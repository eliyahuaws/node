var path = require("path");
var TAG = path.basename(__filename+" ");
var logger = require('./../logger/GameLogger');
var mysql = require('mysql');
var con = require('./GameDb');
var databaseName = "mydb";

con.connect(function(err) {
	if (err)
	{
		logger.logE(TAG , err);
	}
	else
	{
		logger.I(TAG +"Database Connected!");
		var sql = "drop database "+databaseName;
		con.query(sql, function (err, result) {
			if (err){
				logger.logE(TAG, err);
			} 
			else
			{
				logger.I(TAG ,databaseName+" Delete");
			}
		});
	}
});




