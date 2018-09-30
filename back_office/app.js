var path = require("path");
var TAG = path.basename(__filename+" ");
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var express = require('express');
//store the express in a variable 
var app = express();
var questionDataHandler = require('./question');



app.get('/insertquestion.html', function(req, res) {
       res.sendFile(__dirname + "/" + "insertquestion.html");
    });

app.get('/finishClick',function(req,res){
                         res.writeHead(301,
                         {
                             Location: req.protocol + '://' + req.get('host')+'/insertquestion.html' 
                         });
 res.end();

});


app.get('/questioninsert', function(req, res){
	try
	{
        questionDataHandler.createQuestion(req,res);
	}
	catch(err)
	{
		logger.logW(TAG,err);
	}

    }); 




app.listen(8080);

