var insert = require('./insert/GameInsertUser');
var express = require('express');
  var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());






app.post('/addUser', function(request, response){
var ip = request.headers['x-forwarded-for'] || 
     request.connection.remoteAddress || 
     request.socket.remoteAddress ||
     (request.connection.socket ? request.connection.socket.remoteAddress : null);

    console.log(request.body + " "+request.connection.remoteAddress + " ip:"+ip);
          // your JSON
     var jsonRequest = request.body;
    insert.inserUser(response,jsonRequest.deviceId,jsonRequest.nickName)
});













app.listen(8080);