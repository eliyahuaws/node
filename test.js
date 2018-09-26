var express = require('express');
var app = express();
var insert = require('./GameInsertUser');



app.post('/addUser', function (req, res) {
   // First read existing users.
   insert.inserUser();
   res.end("ok");
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})