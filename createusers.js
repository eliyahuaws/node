var mysql = require('mysql');

var con = require('./db');

module.exports.createUsersTable = function () {
	console.log("lioreliyahu!");
	con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE users (id VARCHAR(255),name VARCHAR(255), firenumber VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
};


