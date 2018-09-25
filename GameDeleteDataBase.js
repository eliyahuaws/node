var path = require("path");
var TAG = path.basename(__filename+" ");

var mysql = require('mysql');

var con = require('./GameDb');


var databaseName = "mydb";
	
	con.connect(function(err) {
		if (err)
			{
				console.log(TAG + err);
	

			}
		else
		{
			console.log(TAG +"Connected!");
			var sql = "drop database "+databaseName;
			con.query(sql, function (err, result) {
				if (err){
						console.log(TAG+ err);
				} 
				else
				{
				console.log(TAG +databaseName+" Delete");
			}
			});
		}
	});




