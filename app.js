var dataHandleUsers = require('./data_handle/users');
var express = require('express');
  var bodyParser = require('body-parser');
var logger = require('./logger/GameLogger');

var app = express();
app.use(bodyParser.json());

app.post('/createUser', function(request, response){
     var jsonRequest = request.body;
    dataHandleUsers.createUser(response,jsonRequest.deviceId,jsonRequest.nickName,request.connection.remoteAddress)
	
});

app.post('/getAgreement',function(request,response){
	var jsonRequest = request.body;
	dataHandleUsers.getAgreemrntIdByDeviceId(response,jsonRequest.deviceId);
});


app.listen(3000);