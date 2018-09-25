

var path = require("path");
var TAG = path.basename(__filename);
var mysql = require('mysql');
var config = require('./config/config.js');
var logger = require('./logger/GameLogger');

if(config.getEnvironment())
{
	var con = mysql.createConnection({
		host: config.getMysqlHost(),
		user: config.getMysqlUser(),
		password: config.getMysqlPassword(),
		socketPath: config.getMysqlSocket(),
	});
}
else
{
	var con = mysql.createConnection({
		host: config.getMysqlHost(),
		user: config.getMysqlUser(),
		password: config.getMysqlPassword(),
	});
}

var databaseName = config.getMysqlDatabaseName();

module.exports.createDataBase =  function () {
	con.connect(function(err) {
		if (err)
		{
			logger.log(TAG , err);
		}
		else
		{
			logger.log(TAG ,"DataBase Connect");
			con.query("CREATE DATABASE "+databaseName, function (err, result) {
				if (err)
				{
					logger.log(TAG  , err);
					createAllTables();
				}
				else
				{
					logger.log(TAG ,"Database " +databaseName+  " created");
					createAllTables();
				}
			});
		}
	});
};


var createAllTables = function()
{
	createUsersTable();
}


var createUsersTable = function(){
	var userTable = require('./GameCreateTableUsers');
	userTable.createUsersTable();
}



