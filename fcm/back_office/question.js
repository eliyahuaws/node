var path = require("path");
var TAG = path.basename(__filename+" ");
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var responseHandler = require('./../response/response');

var mysql = require('mysql');
var crypto = require('crypto')

var questionDescriptionTable = "question_description";
var questionTable = "question";

var _this = this;

module.exports.createQuestion = function(req, res){

	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();	
	var questionId = crypto.createHash('sha1').update(current_date + random).digest('hex');

	var subsubjectId = null;
	var questionConnectId = null;
	var answer = req.query.right_wrong;
	var questionStageId = req.query.question_stage;
	var diffeculty = req.query.difficulty;
	var time = 10000 + (diffeculty * 1000);
	var point = diffeculty * 100;

	var values = [];
	values.push([questionId,subsubjectId, questionConnectId,questionStageId, answer, diffeculty, time, point]);

	var sql = "INSERT INTO  "+questionTable+" (questionId ,subsubjectId ,questionConnectId,questionStageId ,answer ,diffeculty ,time ,point) VALUES ?";
	con.query(sql,[values], function (err, result) {
		if (err){
			code = 100;
			logger.E(TAG ,"Cannot INSERT QUESTION -"+ err);
			responseHandler.setResponseFaild(res,err,code);
		} 
		else{
			logger.I(TAG,"Insert Question To Question Table - values {"+values+"}");
			var languageId =1;
			var question_description = req.query.question_hebrew;
			var answer_description = req.query.answer_description_hebrew;

			var values = [];

			values.push([questionId,languageId, question_description, answer_description]);

			var sql = "INSERT INTO  "+questionDescriptionTable+" (questionId ,languageId ,question_description ,answer_description) VALUES ?";
			con.query(sql,[values], function (err, result) {
				if (err)
				{
					logger.E(TAG ,"Cannot INSERT QUESTION_DESCRIPTION -"+ err);
					deleteQuestionById(questionId,req,res);
				}
				else
				{
					logger.I(TAG,"Insert Question To QuestionDesctiption Table (hebrew) - values {"+values+"}");
					var languageId =2;
					var question_description = req.query.question_english;
					var answer_description = req.query.answer_description_english;
					var values = [];
					values.push([questionId,languageId, question_description, answer_description]);
					var sql = "INSERT INTO  "+questionDescriptionTable+" (questionId ,languageId ,question_description ,answer_description) VALUES ?";
					con.query(sql,[values], function (err, result) {
						if (err)
						{
							logger.E(TAG ,"Cannot INSERT QUESTION_DESCRIPTION -"+ err);
							deleteQuestionById(questionId,req,res);
						}
						else
						{
							logger.I(TAG,"Insert Question To QuestionDesctiption Table (english) - values {"+values+"}");
							_this.getAllQuestion(req,res);
						}

					});
				}
			});
		}	
	});		
}



module.exports.getAllQuestion = function(req,res)
{

	var sql = "SELECT * FROM question qu INNER JOIN question_description qd ON qu.questionId = qd.questionId INNER JOIN language la ON qd.languageId = la.languageId WHERE la.languageId = 1 OR la.languageId=2";

	con.query(sql, function (err, result) {
		if(err)
		{
			code = 100;
			logger.E(TAG ,"Cannot Select QUESTION -"+ err);
			responseHandler.setResponseFaild(res,err,code);
		}
		else
		{
			res.writeHead(200, {'Content-Type': 'text/html ; charset=utf-8'});
			res.write('<form action="'+req.protocol + '://' + req.get('host')+'/finishClick" method="GET"');
			res.write('<body>');
			res.write('<input type="submit"value="Continue"></br></br>');

			for (var i = 0; i < result.length; i++) {

				res.write('<h>QUESTION_ID-'+result[i].questionId+'</h></br>');
				res.write('<h>SUBSUBJECT_ID-'+result[i].subsubjectId+'</h></br>');
				res.write('<h>CONNECT_ID-'+result[i].questionConnectId+'</h></br>');
				res.write('<h>ANSWER-'+result[i].answer+'</h></br>');
				res.write('<h>DIFFECULTY-'+result[i].diffeculty+'</h></br>');
				res.write('<h>TIME-'+result[i].time+'</h></br>');
				res.write('<h>point-'+result[i].point+'</h></br>');
				res.write('<h>LANGUAGE_DESCRIPTION-'+result[i].language_description+'</h></br>');
				res.write('<h>QUESTION_DESCRIPTION-'+result[i].question_description+'</h></br>');
				res.write('<h>ANSWE_DESCRIPTION-'+result[i].answer_description+'</h></br></br></br>');

			};
			res.write('</body>');
			res.write('</form>');
			res.end();
		}
	});
}

function deleteQuestionById(questionId,req, res)
{
	res.end(JSON.stringify("NEED DELETE QUESTION"));
}


