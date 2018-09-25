var createDataBase = require('./GameCreateDataBases');
var userTable = require('./GameCreateTableUsers');
// var deleteDataBase = require('./deletedatabase');
var TAG = __filename+" ";

// deleteDataBase.deleteDataBase();

console.log("lior"");
console.log(TAG + "1");
 CreateDataBase.createDataBase();
 console.log(TAG + "2");
   await sleep(1000)
   console.log(TAG + "3");
  userTable.createUsersTable();
  console.log(TAG + "4");
  // result can be used immediately



// userTable.createUsersTable();	





	// var http = require('http'),
	// fs = require('fs');
	// var formidable = require('formidable');

	// fs.readFile('lior.html', function (err, html) {
	// 	if (err) {
	// 		console.log("dfgdg");
	// 		throw err; 

	// 	}       
	// 	else
	// 	{
	// 		http.createServer(function(req, res) {  
	// 			if (req.url == '/fileupload') {
	// 				var form = new formidable.IncomingForm();
	// 				form.parse(req, function (err, fields, files) {

	// 					if (err)
	// 					{
	// 						res.write('err');
	// 						res.end();
	// 						throw err;
	// 					} 
	// 					else
	// 					{
	// 						res.write('File uploaded and moved!' + files.filetoupload.name);
	// 						res.end();
	// 					}
	// 				});
	// 			} else {
	// 				res.writeHeader(200, {"Content-Type": "text/html"});  
	// 				res.write(html);  
	// 				return res.end();
	// 			}


	// 		}).listen(8080);
	// 	}
	// });