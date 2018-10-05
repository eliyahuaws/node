var dataHandleUsers = require('./data_handle/users');
var dataHandleQuestions = require('./data_handle/question');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./logger/GameLogger');
var con = require('./create_database/GameDb');
var responseHandler = require('./response/response');

var app = express();
app.use(bodyParser.json());

app.post('/V1/createUser', function(request, response){
     var jsonRequest = request.body;
    dataHandleUsers.V1_createUser(response,jsonRequest.nickName,jsonRequest.languageId,jsonRequest.questionStage,request.connection.remoteAddress)
	
});

app.post('/V1/getAgreemrntIdByDeviceId',function(request,response){
	var jsonRequest = request.body;
	dataHandleUsers.V1_getAgreemrntIdByDeviceId(response,jsonRequest.deviceId);
});

app.post('/V1/getQuestion',function(request,response){
	var jsonRequest = request.body;
	dataHandleQuestions.V1_getQuestion(response,jsonRequest.deviceId,jsonRequest.agreementId,request.connection.remoteAddress);
});

app.get('/V1/getServerDate',function(request,response)
{
	var jsonResponse = {};
	jsonResponse.status = "ok";
	jsonResponse.dateTime = new Date().getTime();
	jsonResponse.date = new Date();
	responseHandler.setResponseOk(response,jsonResponse);
});

app.post('/V1/changeDevice',function(request,response){
	var jsonRequest = request.body;
	var device = con.escape(jsonRequest.deviceId).replace(/'/g,"");
	var change = con.escape(jsonRequest.changeId).replace(/'/g,"");
	dataHandleUsers.V1_changeDeviceByDate(response,device,change,request.connection.remoteAddress);
});

app.listen(3000);