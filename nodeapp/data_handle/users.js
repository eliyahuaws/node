var path = require("path");
var TAG = path.basename(__filename+" ");
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var responseHandler = require('./../response/response');

var mysql = require('mysql');
var crypto = require('crypto')

var TableName = "users";

var _this = this;

var TIME_CONNECT_REFRESH = 1000 * 60 *60*24*5;

module.exports.V1_createUser = function (response,nickName,languageId,questionStage,ip) {

	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();	
	var agreementId = crypto.createHash('sha1').update(current_date + random).digest('hex');

	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();	
	var device  = crypto.createHash('sha1').update(current_date + random).digest('hex');

	var name = con.escape(nickName).replace(/'/g,"");
	var lan = con.escape(languageId).replace(/'/g,"");
	var stage = con.escape(questionStage).replace(/'/g,"");
	var values = [];
	values.push([device,agreementId, name,lan,stage]);

		checkIfStageAndLanguageValid(response, ip, lan, stage,function(valid)
		{
			if(valid)
			{
				var sql = "INSERT INTO  "+TableName+" (deviceId ,agreementId ,nickName,languageId,questionStage) VALUES ?";
				con.query(sql,[values], function (err, result) {
					if (err)
					{
						var code = 100;
						if(err.code =="ER_DUP_ENTRY")
						{
							code = 101;
						}
						responseHandler.setResponseFaild(response,err,code);
					} 
					else
					{
						var jsonResponse = {};
						jsonResponse.status = "ok";
						jsonResponse.deviceId = device;
						jsonResponse.agreementId = agreementId;
						jsonResponse.questionStage = stage;
						jsonResponse.languageId = lan;
						jsonResponse.nickName = nickName;
						responseHandler.setResponseOk(response,jsonResponse);		
					}
				});
			}
			else
			{
				var code = 400;
				var err = "DEVICE_ID:"+device +" IP:"+ ip +" Not a valid stage and language";
				responseHandler.setResponseFaild(response,err,code);
			}
		}
	);
};

function checkIfStageAndLanguageValid(response,ip, lan,stage,callback)
{
	var valid = false;
	var sql = "SELECT * FROM language lan INNER JOIN question_stage st WHERE lan.languageId = "+lan + " AND st.questionStageId ="+ stage;
	con.query(sql, function (err, result) {
		if (err)
		{
			var code = 100;
			if(err.code =="ER_DUP_ENTRY")
			{
				code = 101;
			}
			err = "function checkIfStageAndLanguageValid IP:"+ ip +" "+ err;;
			responseHandler.setResponseFaild(response,err,code);
		} 
		else
		{
			if(result !=null && result.length >0)
			{
				valid = true
			}
			callback(valid);	
		}
	});
}

module.exports.V1_getAgreemrntIdByDeviceId= function(response,deviceId,ip)
{
	var device = con.escape(deviceId);

	var sql ="Select agreementId,lastConnection From users WHERE deviceId = "+device;
	con.query(sql,function(err,result){
		if(err)
		{
			var code = 100;
			var err  = "DEVICE_ID:"+deviceId +" IP:"+ ip +" "+ err;
			responseHandler.setResponseFaild(response,err,code);
		}
		else
		{

			try
			{
				if(result.length >0)
				{
					_this.checkLastConnectionValidation(response,deviceId,TIME_CONNECT_REFRESH, result[0].lastConnection,function(){
							var jsonResponse = {};
							jsonResponse.status = "ok";
							jsonResponse.agreementId = result[0].agreementId;
							responseHandler.setResponseOk(response,jsonResponse);
					
					});
				}
				else
				{
					var code = 300;
					responseHandler.setResponseFaild(response,err,code);
				}
			}
			catch(error)
			{
				responseHandler.setResponseFaild(response," excption - * cannot find device id - "+device +" * "+error,300);
			}
		}
	});
}

module.exports.checkLastConnectionValidation =  function (response,deviceId,diff,lastConnection,callback)
{
	var now = new Date().getTime();
	var ok = true;
	if((now - lastConnection.getTime()) >diff)
	{
		_this.removeDeviceId(deviceId);
		var code = 999;
		responseHandler.setResponseFaild(response,"need to refresh deviceId",code);
	}
	else
	{
		callback();
	}
}

module.exports.removeDeviceId = function(deviceId)
{
	if(deviceId==null)
	{
		logger.CE(TAG,"CANNOT CHANGE DEVICE_ID - "+deviceId + " DEVICE_ID = NULL");
	}

	var sql = "UPDATE users SET deviceId = ? , lastDeviceId = ? WHERE deviceId = ?";
	con.query(sql,[null,deviceId,deviceId], function (err, result) {
		if(err)
		{
			logger.CE(TAG,"CANNOT CHANGE DEVICE_ID - "+deviceId + " " + err);
		}
		else
		{
			logger.I(TAG,"REMOVE DEVICE_ID - "+deviceId);
		}
	});

}

module.exports.V1_changeDeviceByDate = function(response,deviceId,change,ip)
{
 	var day = new Date().getDate();
 	var dayResponse = "";
 	var changeDevice = "";
	var values = [];

 	switch (day)
 	{	

 		case 1 : values.push([1,2, 3,4,5]); break;
 		case 2 : values.push([1,2, 3,4,5]); break;
 		case 3 : values.push([1,2, 3,4,5]); break;
 		case 4 : values.push([1,2, 3,4,5]); break;
 		case 5 : values.push([1,2, 3,4,5]); break;
 		case 6 : values.push([1,2, 3,4,5]); break;
 		case 7 : values.push([1,2, 3,4,5]); break;
 		case 8 : values.push([1,2, 3,4,5]); break;
		case 9 : values.push([1,2, 3,4,5]); break;
 		case 10 : values.push([1,2, 3,4,5]); break;
 		case 11 : values.push([1,2, 3,4,5]); break;			
 		case 12 : values.push([1,2, 3,4,5]); break;
 		case 13 : values.push([1,2, 3,4,5]); break;
 		case 14 : values.push([1,2, 3,4,5]); break;
 		case 15 : values.push([1,2, 3,4,5]); break;
 		case 16 : values.push([1,2, 3,4,5]); break;
 		case 17 : values.push([1,2, 3,4,5]); break;
 		case 18 : values.push([1,2, 3,4,5]); break;
		case 19 : values.push([1,2, 3,4,5]); break;
		case 20 : values.push([1,2, 3,4,5]); break;
 		case 21 : values.push([1,2, 3,4,5]); break;
 		case 22 : values.push([1,2, 3,4,5]); break;
 		case 23 : values.push([1,2, 3,4,5]); break;
 		case 24 : values.push([1,2, 3,4,5]); break;
 		case 25 : values.push([1,2, 3,4,5]); break;
 		case 26 : values.push([1,2, 3,4,5]); break;
 		case 27 : values.push([1,2, 3,4,5]); break;
 		case 28 : values.push([1,2, 3,4,5]); break;
		case 29 : values.push([1,2, 3,4,5]); break;
		case 30 : values.push([1,2, 3,4,5]); break;
		case 30 : values.push([1,2, 3,4,5]); break;
		case 31 : values.push([1,2, 3,4,5]); break;
 	}

	getCharFromPosition(deviceId,values,function(text){
		if(text == change)
		{
				insertNewDeviceId(response,deviceId);
		}
		else
		{
				var code = 700;
				var err = "DEVICE_ID:"+deviceId +" IP:"+ ip +" - TRY TO CHANGE DEVICE_ID FROM :"+deviceId+" TO: "+text;
				responseHandler.setResponseFaild(response,err,code);
		}

	});
}

function getCharFromPosition(text,values,callback)
{
	var char1 = text.charAt(values[0][0]);
	var char2 = text.charAt(values[0][1]);
	var char3 = text.charAt(values[0][2]);
	var char4 = text.charAt(values[0][3]);
	var char5 = text.charAt(values[0][4]);
	var returnText = char1+char2+char3+char4+char5;
	callback(returnText);
}

function insertNewDeviceId(response, lastDeviceId)
{
	if(lastDeviceId==null)
	{
		logger.CE(TAG,"CANNOT INSERT NEW DEVICE_ID WHERE LAST_DEVICE_ID :"+lastDeviceId + " DEVICE_ID = NULL");
	}

	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();	
	var device  = crypto.createHash('sha1').update(current_date + random).digest('hex');

	var sql = "UPDATE users SET deviceId = ?,lastDeviceId = ?,lastConnection = ? WHERE lastDeviceId = ?";
	con.query(sql,[device,null,new Date(),lastDeviceId], function (err, result) {
		if(err)
		{
			logger.CE(TAG,"CANNOT INSERT NEW DEVICE_ID WHERE LAST_DEVICE_ID :"+lastDeviceId+ " " + err);
		}
		else
		{

			if(result!=null && result.affectedRows >0)
			{

				logger.I(TAG,"REMOVE LAST_DEVICE_ID - LAST"+lastDeviceId + " NEW - " + device);
				var jsonResponse = {};
				jsonResponse.status = "ok";
				jsonResponse.deviceId = device;
				responseHandler.setResponseOk(response,jsonResponse);
			}
			else
			{
				var code = 701;
				var err = "TRY TO CHANGE DEVICE WHEN THERE NO LAST_DEVICE_ID, DEVICE_ID: " +lastDeviceId;
				responseHandler.setResponseFaild(response,err,code);
			}
		}
	});

}

module.exports.checkIfExist = function(deviceId ,agreementId,diff,ip,response, callback)
{
	if(diff==null)
	{
		diff = TIME_CONNECT_REFRESH;
	}

	var sql = "SELECT * From users WHERE deviceId = ? AND agreementId = ?";
	var lan = null;
	var stage = null;
	con.query(sql,[deviceId,agreementId], function (err, result) {
		if (err)
		{
			var code = 100;
			err = "DEVICE_ID:"+deviceId +" AGREEMENT_ID:"+agreementId+" IP:"+ ip +" "+ err;;
			responseHandler.setResponseFaild(response,err,code);
		} 
		else
		{
			if(result!=null && result.length >0)
			{

				_this.checkLastConnectionValidation(response,deviceId,diff,result[0].lastConnection,function(){
					logger.I(TAG ,"DEVICE_ID:"+deviceId +" AGREEMENT_ID:"+agreementId+" USER FOUND "+result.length);		
					callback(result[0].languageId,result[0].questionStage);	
				});
			}
			else
			{
				var code = 401;
				var err = "DEVICE_ID:"+deviceId +" AGREEMENT_ID:"+agreementId+" IP:"+ ip +" User Not Found";
				responseHandler.setResponseFaild(response,err,code);
			}
		}
	});
}


module.exports.checkIfUserExist = function(deviceId ,agreementId,callback)
{

	var sql = "SELECT * From users WHERE deviceId = ? AND agreementId = ?";

	con.query(sql,[deviceId,agreementId], function (err, result) {
		if (err)
		{
			callback(false);
		} 
		else
		{
			if(result!=null && result.length >0)
			{
					callback(true);
			}
			else
			{
				callback(false);			}
		}
	});
}


module.exports.getUserByAgreementAndDevice = function(deviceId ,agreementId,callback)
{


	var sql = "SELECT * From users WHERE deviceId = ? AND agreementId = ?";

	con.query(sql,[deviceId,agreementId], function (err, result) {
		if (err)
		{
			logger.E(TAG,"=====error=========");
			callback(false);
		} 
		else
		{
				
			if(result!=null && result.length >0)
			{
				logger.E(TAG,"=====ok2========= "+result[0].deviceId);
				var client = {};
				client.deviceId = result[0].deviceId;
				client.nickName = result[0].nickName;
				logger.E(TAG,result[0].deviceId+"======="+client.nickName);
				callback(null,client);
			}
			else
			{
					logger.E(TAG,"=====ok3=========");
				var err = {};
				err.message = "CANNOT FIND USER";
				err.code = 300;
				callback(err,null);	
			}		
		}
	});
}













