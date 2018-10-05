var path = require("path");
var TAG = path.basename(__filename+" ");
var logger = require('./../logger/GameLogger');
var mysql = require('mysql');
var config = require('./../config/config.js');


if(config.getEnvironment())
{
		logger.I(TAG,"get TEST database connection");
		var connection = mysql.createConnection({
		host: config.getMysqlHost(),
		user: config.getMysqlUser(),
		password: config.getMysqlPassword(),
		socketPath: config.getMysqlSocket(),
		database: config.getMysqlDatabaseName()
	});
}
else
{
		logger.I(TAG,"get PROD database connection");
		var connection = mysql.createConnection({
		host: config.getMysqlHost(),
		user: config.getMysqlUser(),
		password: config.getMysqlPassword(),
		database: config.getMysqlDatabaseName()
	});
}


module.exports = connection;