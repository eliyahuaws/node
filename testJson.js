// var request = require("request");

// var options = { method: 'POST',
//   url: 'http://localhost:3000/',
//   headers: 
//    { 'postman-token': 'a0f357bc-ebad-8344-542f-06eb0e9c07f6',
//      'cache-control': 'no-cache',
//      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
//   formData: { deviceId: '"sdfsdf"', nickName: '"sdfsdf"' } };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

var insert = require('./insert/GameInsertUser');
var express = require('express');
  var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.post('/', function(request, response){
    console.log(request.body);      // your JSON
  console.log( " fgdfgdfgd");
     var jsonRequest = request.body;
     console.log(request.headers  + " fgdfgdfgd");
var ip = request.headers['x-forwarded-for'] || 
     request.connection.remoteAddress || 
     request.socket.remoteAddress ||
     (request.connection.socket ? request.connection.socket.remoteAddress : null);

    insert.inserUser(response,jsonRequest.deviceId,jsonRequest.nickName,ip)
//     response.setHeader('Content-Type', 'application/json');
// response.status(500).json(jsonResponse);
     // response.send(jsonResponse.result);
});





app.listen(3000);