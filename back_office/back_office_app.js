
var path = require("path");
var TAG = path.basename(__filename+" ");
var logger = require('./../logger/GameLogger');
var express = require('express');
var config = require('./../config/config.js');

//store the express in a variable 
var app = express();
var questionDataHandler = require('./question');



app.get('/insertquestion.html', function(req, res) {

 if(config.getEnvironment())
 {
   res.sendFile(__dirname + "/" + "insert_question_test.html");
 }
 else
 {
   res.sendFile(__dirname + "/" + "insert_question_prod.html");   }
 });

app.get('/finishClick',function(req,res){
 res.writeHead(301,
 {
   Location: req.protocol + '://' + req.get('host')+'/insertquestion.html' 
 });
 res.end();

});


app.get('/questioninsert', function(req, res){
  questionDataHandler.createQuestion(req,res);

}); 



app.listen(8080);

