var express = require('express');
var app = express();

app.get('/lior',function(request,response)
{

	response.send("sdfsdf");
});



app.listen(3000);

console.log("app listen to port 3000");