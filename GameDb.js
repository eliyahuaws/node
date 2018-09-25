var mysql = require('mysql');

var isTestEnvirment = false;



if(isTestEnvirment)
{
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
	database: 'mydb'
});
}
else
{

	var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "eliyahu",
		database: 'mydb'
});

}


module.exports = connection;