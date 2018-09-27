

var path = require("path");
var TAG = path.basename(__filename);
var mysql = require('mysql');
var config = require('./../config/config.js');
var logger = require('./../logger/GameLogger');

if(config.getEnvironment())
{
	logger.logI(TAG ,"TEST database connection ");
	var con = mysql.createConnection({
		host: config.getMysqlHost(),
		user: config.getMysqlUser(),
		password: config.getMysqlPassword(),
		socketPath: config.getMysqlSocket(),
	});
}
else
{
	logger.logI(TAG ,"PROD database connection ");
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
			logger.logE(TAG , err);
			con.end();
		}
		else
		{
			logger.logI(TAG ,"DataBase Connect");
			con.query("CREATE DATABASE "+databaseName, function (err, result) {
				if (err)
				{
					logger.logE(TAG  , err);
					con.end();
					createAllTables();
				}
				else
				{
					logger.logI(TAG ,"Database " +databaseName+  " created");
					con.end();
					createAllTables();
				}
			});
		}
	});
};


function createAllTables()
{
	createUsersTable();
}

function createUsersTable() {
	var userTable = require('./GameCreateTableUsers');
	userTable.createUsersTable(function() { createStatisticTable();});
}

function createStatisticTable()
{
	var statisticTable = require('./GameCreateStatisticTable');
	statisticTable.createStatisticTable(function(){createQuestionTable();});
}

function createQuestionTable()
{
	var questionTable = require('./GameCreateTableQuestion');
	questionTable.createQuestionTable(function(){createLanguageTable();});
}

function createLanguageTable()
{
	var languageTable = require('./GameCreateLanguageTable');
	languageTable.createLanguageTable(function(){createQuestionDescriprionTable()});
}

function createQuestionDescriprionTable()
{
	var questionDescriptionTable = require('./GameCreateQuestionDescriptionTable');
	questionDescriptionTable.createQuestionDescriptionTable(function(){createSubSubjectTable()});
}

function createSubSubjectTable()
{
	var subSubjectTable = require('./GameCreateSubSubjectTable');
	subSubjectTable.createSubSubjectTable(function(){createUserAnswerTable()});
}

function createUserAnswerTable()
{
	var userAnswerTable = require('./GameCreateUserAnswerTable');
	userAnswerTable.createUserAnswerTable();
}










