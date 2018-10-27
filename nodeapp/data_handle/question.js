
var path = require("path");
var TAG = path.basename(__filename+" ");
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var responseHandler = require('./../response/response');
var userDataHandle = require('./users');
var mysql = require('mysql');
var encrypt_decrypt =require('./encrypt_decrypt');

var crypto = require('crypto')

var _this = this;

var TIME_CONNECT_REFRESH = 1000 * 60 *60*24*6;

module.exports.V1_getQuestion = function (response,deviceId,agreementId,ip) {


	var device = con.escape(deviceId).replace(/'/g,"");
	var agreement = con.escape(agreementId).replace(/'/g,"");

	var values = [];
	values.push([device,agreement]);

	var exist = false;

	userDataHandle.checkIfExist(device ,agreement,TIME_CONNECT_REFRESH,ip,response,function(lan,stage)
	{

		var sql = "SELECT * FROM question qu INNER JOIN question_description qd ON qu.questionId = qd.questionId AND qu.questionStageId = ? INNER JOIN language la ON qd.languageId = la.languageId WHERE la.languageId = ? ORDER BY RAND() LIMIT 1";
		logger.W(TAG,sql + " ---- "+stage + " " + lan);
		con.query(sql,[stage,lan], function (err, result) {
			if (err)
			{
				var code = 100;
				logger.E(TAG ,"DEVICE_ID:"+device +" AGREEMENT_ID:"+agreement+" IP:"+ ip +" "+ err);
				responseHandler.setResponseFaild(response,err,code);
			} 
			else
			{
				if(result!=null && result.length >0)
				{

					getGameSession(agreement,response, function(sessionId){
					inserIntoUserQuestion(result,agreement,sessionId,"android","1",response);

					});
				
					// var jsonResponse = {};
					// jsonResponse.status = "ok";
					// jsonResponse.questionId = result[0].questionId;
					// responseHandler.setResponseOk(response,jsonResponse);
				}
				else
				{
					var code = 401;
					logger.E(TAG ,"DEVICE_ID:"+device +" AGREEMENT_ID:"+agreement+" IP:"+ ip +" QUESTION NOT FOUND");
					responseHandler.setResponseFaild(response,err,code);
				}
			}
		});
	});
};


function inserIntoUserQuestion(resultQuestion,agreementId,sessionId,platform,clientVersion,response)
{

	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();	
	var userQuestionId = crypto.createHash('sha1').update(current_date + random).digest('hex');

	var sqlSelect = "SELECT encrypt from version WHERE platformName = ? AND clientVersion = ?";
	con.query(sqlSelect,[platform,clientVersion], function (err, result) {
		if(err || result==null || result.length==0)
		{
				var code = 100;
				err = "CANNOT FIND PLATFORM AND VERSION "+ platform + " " + clientVersion + " " + err;
				responseHandler.setResponseFaild(response,err,code);
		}
		else
		{


			var encrypt = result[0].encrypt;
			var outEncrypt = Math.floor((Math.random() * 9999999) + 1000000);
			var extraPoint = 0;
			var point = resultQuestion[0].point;
			var questionId = resultQuestion[0].questionId;
				var values = [];
			values.push([userQuestionId,agreementId,sessionId,encrypt,questionId,point,0,outEncrypt]);
			var sql = "INSERT INTO user_question (user_questionId ,agreementId ,game_sessionId,encrypt,questionId,point,extraPoint,outEncrypt) VALUES ?;";
			con.query(sql,[values],function(err,result){
					if(err || result.affectedRows==0)
					{
							var code = 100;
							err = "CANNOT INSERT USER QUESTION "+ err;
							responseHandler.setResponseFaild(response,err,code);
					}
					else
					{

						var jsonResponse = {};
						jsonResponse.status = "ok";
						jsonResponse.userQuestionId = userQuestionId;
						jsonResponse.questionDescription = resultQuestion[0].question_description;
						jsonResponse.diffeculty = resultQuestion[0].diffeculty;
						jsonResponse.time = resultQuestion[0].time;
						jsonResponse.point = point;
						jsonResponse.gameSession = sessionId;
						jsonResponse.questionData = outEncrypt;
						responseHandler.setResponseOk(response,jsonResponse);
					}

			});

		}
	});
}



function getGameSession(agremmentId,response, callback)
{

	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();	
	var gameSessionId = crypto.createHash('sha1').update(current_date + random).digest('hex');

	var sql = "INSERT INTO game_session (agreementId ,sessionId ,win,close) VALUES ?;";
					var values = [];
			values.push([agremmentId,gameSessionId,0,0]);
	con.query(sql,[values],function(err,result){
		if(err || result.affectedRows ==0)
		{
					var code = 100;
					err = "CANNOT INSERT GAME SESSION "+ err;
					responseHandler.setResponseFaild(response,err,code);
		}
		else
		{
			logger.W(TAG,"SEND SESSION ID");
				callback(gameSessionId);
		}
	});
}



module.exports.V1_answerQuesion= function (response,userQuesionId,userGameSession,userQuesionData,point,agreementId,deviceId,ip) {


	//var sql = "SELECT * FROM user_question uq INNER JOIN users us ON uq.agreementId = us.agreementId WHERE us.deviceId = ? AND us.agreementId = ?"
	var sql = "SELECT * FROM user_question uq INNER JOIN users us ON uq.agreementId = us.agreementId WHERE us.deviceId = ? AND us.agreementId = ?;"//AND uq.user_questionId = ? AND uq.agreementId = ? AND uq.game_sessionId = ?;"



	var values = [];
	values.push([deviceId,agreementId]);
	con.query(sql,[deviceId,agreementId], function (err, result) {
		if(err || result ==null && result.length==0)
		{
			var code = 100;
			err = "CANNOT FIND USER ANSWER"+ err;
			responseHandler.setResponseFaild(response,err,code);
		}
		else
		{
							// var reversString = userQuesionId.split("").reverse().join("");
							// 	logger.W("lior",userQuesionId + " --- " +reversString );
			encrypt_decrypt.V1_decrypt(userQuesionData,userQuesionId,result[0].encrypt,function(outEncrypt){
		

				if(outEncrypt==result[0].outEncrypt)
				{

						var jsonResponse = {};
						jsonResponse.status = "ok";
						responseHandler.setResponseOk(response,jsonResponse);
				}
				else
				{
						var jsonResponse = {};
						jsonResponse.status = "faild";
						responseHandler.setResponseOk(response,jsonResponse);
				}

			});
		}

	});



	// var exist = false;

	// userDataHandle.checkIfExist(device ,agreement,TIME_CONNECT_REFRESH,ip,response,function(lan,stage)
	// {

	// 	var sql = "SELECT * FROM question qu INNER JOIN question_description qd ON qu.questionId = qd.questionId AND qu.questionStageId = ? INNER JOIN language la ON qd.languageId = la.languageId WHERE la.languageId = ? ORDER BY RAND() LIMIT 1";
	// 	logger.W(TAG,sql + " ---- "+stage + " " + lan);
	// 	con.query(sql,[stage,lan], function (err, result) {
	// 		if (err)
	// 		{
	// 			var code = 100;
	// 			logger.E(TAG ,"DEVICE_ID:"+device +" AGREEMENT_ID:"+agreement+" IP:"+ ip +" "+ err);
	// 			responseHandler.setResponseFaild(response,err,code);
	// 		} 
	// 		else
	// 		{
	// 			if(result!=null && result.length >0)
	// 			{

	// 				getGameSession(agreement,response, function(sessionId){
	// 				inserIntoUserQuestion(result,agreement,sessionId,"android","1",response);

	// 				});
				
	// 				// var jsonResponse = {};
	// 				// jsonResponse.status = "ok";
	// 				// jsonResponse.questionId = result[0].questionId;
	// 				// responseHandler.setResponseOk(response,jsonResponse);
	// 			}
	// 			else
	// 			{
	// 				var code = 401;
	// 				logger.E(TAG ,"DEVICE_ID:"+device +" AGREEMENT_ID:"+agreement+" IP:"+ ip +" QUESTION NOT FOUND");
	// 				responseHandler.setResponseFaild(response,err,code);
	// 			}
	// 		}
	// 	});
	// });
};












