var express = require('express');
var app = express();

app.get('/lior',function(request,response)
{
console.log("app listen to port 3000");
	// response.send("sdfsdf");
});



app.listen(8080);

console.log("app listen to port 3000");