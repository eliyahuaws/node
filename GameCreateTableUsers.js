var path = require("path");
var TAG = path.basename(__filename+" ");

var mysql = require('mysql');

var con = require('./GameDb');


var TableName = "users";
module.exports.createUsersTable = function () {
	
	con.connect(function(err) {
		if (err)
			{
				console.log(TAG + err);
	

			}
		else
		{
			console.log(TAG +"Connected!");
			var sql = "CREATE TABLE "+TableName+" (id VARCHAR(255),name VARCHAR(255), firenumber VARCHAR(255))";
			con.query(sql, function (err, result) {
				if (err){
						console.log(TAG+ err);
				} 
				else
				{
				console.log(TAG +TableName+" Table created");
			}
			});
		}
	});
};


