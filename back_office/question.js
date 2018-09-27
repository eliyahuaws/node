var path = require("path");
var TAG = path.basename(__filename+" ");
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var responseHandler = require('./../response/response');

var mysql = require('mysql');
var crypto = require('crypto')

var questionDescriptionTable = "question_description";
var questionTable = "question";


module.exports.createQuestion = function(req, res){

	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();	
	var questionId = crypto.createHash('sha1').update(current_date + random).digest('hex');

	var subsubjectId = null;
	var questionConnectId = null;
	var answer = req.query.right_wrong;
	var diffeculty = req.query.difficulty;
	var time = 10000 + (diffeculty * 1000);
	var point = diffeculty * 100;

	var values = [];
	values.push([questionId,subsubjectId, questionConnectId, answer, diffeculty, time, point]);

	var sql = "INSERT INTO  "+questionTable+" (questionId ,subsubjectId ,questionConnectId ,answer ,diffeculty ,time ,point) VALUES ?";
	con.query(sql,[values], function (err, result) {
		if (err){
			logger.logE(TAG ,"Cannot INSERT QUESTION -"+ err);
			responseHandler.setResponseFaild(response,err,code);
		} 
		else{
			var languageId =1;
			var question_description = req.query.question_hebrew;
			var answer_description = req.query.answer_description_hebrew;

			var values = [];

			values.push([questionId,languageId, question_description, answer_description]);
			logger.logE(TAG,values);
			var sql = "INSERT INTO  "+questionDescriptionTable+" (questionId ,languageId ,question_description ,answer_description) VALUES ?";
			con.query(sql,[values], function (err, result) {
				if (err)
				{
					logger.logE(TAG ,"Cannot INSERT QUESTION_DESCRIPTION -"+ err);
					deleteQuestionById(questionId,req,res);
				}
				else
				{

					var languageId =2;
					var question_description = req.query.question_english;
					var answer_description = req.query.answer_description_english;
					var values = [];
					values.push([questionId,languageId, question_description, answer_description]);
					var sql = "INSERT INTO  "+questionDescriptionTable+" (questionId ,languageId ,question_description ,answer_description) VALUES ?";
					con.query(sql,[values], function (err, result) {
						if (err)
						{
							logger.logE(TAG ,"Cannot INSERT QUESTION_DESCRIPTION -"+ err);
							deleteQuestionById(questionId,req,res);
						}
						else
						{
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.write('<form action="'req.protocol + '://' + req.get('host')/finishclick+' method="GET"');
						res.write('<p>question insert-'+questionId+'</p>');
						res.write('<input type="submit"value="Continue">');
						res.write('</form>');
						res.end();
						}

					});
				}

				
			});

		}

	});

}


function deleteQuestionById(questionId,req, res)
{
	res.end(JSON.stringify("NEED DELETE QUESTION"));
}


