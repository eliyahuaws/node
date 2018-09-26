var insert = require('./insert/GameInsertUser');
var express = require('express');
  var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());






app.post('/addUser', function(request, response){
     var jsonRequest = request.body;
    insert.inserUser(response,jsonRequest.deviceId,jsonRequest.nickName,request.connection.remoteAddress)
});


app.listen(8080);