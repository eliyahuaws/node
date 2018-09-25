

var path = require("path");
var TAG = path.basename(__filename+" ");

var mysql = require('mysql');

var isTestEnvirment = false;



if(isTestEnvirment)
{
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
}
else
{

	var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "eliyahu",
});

}

var databaseName = "mydb";


module.exports.createDataBase =  function () {
	con.connect(function(err) {
		if (err)
		{
				console.log(TAG + err);
		
		}
		else
		{
			console.log(TAG +"DataBase Connect");
			con.query("CREATE DATABASE "+databaseName, function (err, result) {
				if (err)
				{
					console.log(TAG  + err);
							createAllTables();
				}else
				{
					console.log(TAG +"Database " +databaseName+  " created");
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



