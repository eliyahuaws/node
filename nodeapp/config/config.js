var config = require('./config.json');
var os = require('os');


function getPublicEnvironment()
{
	return config.test_environment_name == "test";
}


function getPublicMysqlHost() {
		 return config.mysql_host;
}


function getPublicMysqlUser() {
  return config.mysql_user;
}

function getPublicMysqlSocket() {
  return config.mysql_socket;
}

function getPublicMysqlDatabaseName()
{
	return config.database_name;
}


function getPublicMysqlPassword()
{
	if(getPublicEnvironment())
	{
		return config.mysql_test_pw;
	}
	else
	{

	}
	return config.mysql_production_pw;
}

module.exports = {
  getEnvironment: getPublicEnvironment,
  getMysqlHost: getPublicMysqlHost,
  getMysqlUser: getPublicMysqlUser,
  getMysqlSocket :getPublicMysqlSocket,
  getMysqlDatabaseName:getPublicMysqlDatabaseName,
  getMysqlPassword:getPublicMysqlPassword
};