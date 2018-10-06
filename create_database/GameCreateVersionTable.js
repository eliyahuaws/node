var path = require("path");
var TAG = path.basename(__filename+" ");
var mysql = require('mysql');
var con = require('./GameDb');
var logger = require('./../logger/GameLogger');
var TableName = "version";

module.exports.createQuestionTable = function (callback) {
			var sql = "CREATE TABLE "+TableName+" (platformName VARCHAR(255), clientVersion VARCHAR(255), needUpdate INT,encrypt VARCHAR(255));";
			con.query(sql, function (err, result) {
				if (err)
				{
					logger.E(TAG, err);

				} 
				else
				{
					logger.I(TAG ,TableName+" Table created");
				}
				addData(callback);
			});
};

function addData(callback)
{


	var values = [];
	values.push(["android","1",0,"03527835469"],["iphone","1",0,"03527835469"]);
	
	var sql = "INSERT INTO "+TableName+" (platformName , clientVersion , needUpdate ,encrypt) VALUES ?;";
		con.query(sql,[values], function (err, result) {
		if (err)
		{
			logger.E(TAG, err);
		} 
		logger.I(TAG ,"version and encrypt insert");
		if(callback!=null)
		{
			callback();
		}
	});
}