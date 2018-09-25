var createDataBase = require('./GameCreateDataBases');

// var deleteDataBase = require('./deletedatabase');




createDataBase.createDataBase();





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