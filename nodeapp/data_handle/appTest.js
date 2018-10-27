
var path = require("path");
var TAG = path.basename(__filename+" ");
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var encrypt_decrypt = require('./encrypt_decrypt');
var express = require('express');
var bodyParser = require('body-parser');
var responseHandler = require('./../response/response');

var app = express();
app.use(bodyParser.json());

// encrypt_decrypt.V1_encrypt("10578476","68885ffeeb365647a3c08c3d0bf4514ba7151b77","03527835469",function(out){

// 	logger.I("out out out out --- "+out);

// 	encrypt_decrypt.V1_decrypt(out,"68885ffeeb365647a3c08c3d0bf4514ba7151b77","03527835469",function(o){

// 			logger.I("out1 out1 out1 out1 --- "+o);
// 	});

// });


app.post('/V1/encrypt',function(request,response)
{
	var jsonRequest = request.body;
	var data = con.escape(jsonRequest.data).replace(/'/g,"");
	var questionId = con.escape(jsonRequest.questionId).replace(/'/g,"");
	var encrypt = con.escape(jsonRequest.encrypt).replace(/'/g,"");
	logger.I("in in in  --- "+data +" " + questionId + " " +encrypt);
	encrypt_decrypt.V1_encrypt(data,questionId,encrypt,function(out){
		var jsonResponse = {};
		jsonResponse.status = "ok";
		jsonResponse.dycrypt = out
		responseHandler.setResponseOk(response,jsonResponse);
	})
});

 app.listen(3001);