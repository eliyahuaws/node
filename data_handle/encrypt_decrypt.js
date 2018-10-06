var path = require("path");
var TAG = path.basename(__filename+" ");
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var responseHandler = require('./../response/response');




module.exports.V1_encrypt = function(number,questionId,crypt,callback)
{
	var outPut ="";
	for (var i = 0; i < number.length; i++) {
		var n1 = number[i];
		var n2 = questionId.charAt(parseInt(crypt[i]));
			changeEncrypt(n1,n2,function(c){
				outPut= outPut+c;
			});
	};
	if(callback!=null)
	{
		callback(outPut)
	}

}

function changeEncrypt(n1,n2,callback)
{
	switchCharToNumber(n1,function(n3){
		switchCharToNumber(n2,function(n4){
			number = n3 + n4;
			switchNumberTochar(number,function(r){
				callback(r);
			});
		});
	});
}

// eccc c1fd99ead4fc8e048a799c8c9444c068b7ad110e 03527835469
module.exports.V1_decrypt = function(cryptText,questionId,crypt,callback)
{
	var outPut ="";
	for (var i = 0; i < cryptText.length; i++) {
			var c = cryptText[i];
			var t = questionId.charAt(parseInt(crypt[i]));
			logger.E(TAG,c + " " + t);
			changeDecrypt(c,t,function(ch){
				outPut = outPut + ch;
			});
	};
	if(callback!=null)
	{
		callback(outPut)
	}
}


function changeDecrypt(c,t,callback)
{
	switchCharToNumber(c,function(n1){
		switchCharToNumber(t,function(n2){
			n = n1 - n2;
			callback(n);
		});
	});
}


// function changeCrypt2(number,c,callback)
// {
// 	switchCharToNumber(c,function(n){
// 		var outNumber = parseInt(n) + parseInt(number);
// 		switchNumberTochar(outNumber,function(outChar){
// 			if(callback!=null)
// 			{
// 				callback(outChar);
// 			}
// 		});
// 	});

// }




// function changeEncrypt(c,questionId,crypt,callback)
// {
// 		// logger.I(TAG,"change");
// 	var returnChar = null;
// 	switch(c)
// 	{
// 		case "0":returnchar = questionId.charAt(parseInt(crypt.charAt(0)));break;
// 		case "1":returnchar = questionId.charAt(parseInt(crypt.charAt(1)));break;
// 		case "2":returnchar = questionId.charAt(parseInt(crypt.charAt(2)));break;
// 		case "3":returnchar = questionId.charAt(parseInt(crypt.charAt(3)));break;
// 		case "4":returnchar = questionId.charAt(parseInt(crypt.charAt(4)));break;
// 		case "5":returnchar = questionId.charAt(parseInt(crypt.charAt(5)));break;
// 		case "6":returnchar = questionId.charAt(parseInt(crypt.charAt(6)));break;
// 		case "7":returnchar = questionId.charAt(parseInt(crypt.charAt(7)));break;
// 		case "8":returnchar = questionId.charAt(parseInt(crypt.charAt(8)));break;
// 		case "9":returnchar = questionId.charAt(parseInt(crypt.charAt(9)));break;
// 	}
// 	changeCrypt2(c,returnchar,callback);

// }


function switchCharToNumber(c,callback)
{
	// abcdefghijklmnopqrstuvwxyz
	var number = null;
	switch(c)
	{
		case "0": number = 0;break;
		case "1": number = 1;break;
		case "2": number = 2;break;
		case "3": number = 3;break;
		case "4": number = 4;break;
		case "5": number = 5;break;
		case "6": number = 6;break;
		case "7": number = 7;break;
		case "8": number = 8;break;
		case "9": number = 9;break;
		case "a": number = 10;break;
		case "b": number = 11;break;
		case "c": number = 12;break;
		case "d": number = 13;break;
		case "e": number = 14;break;
		case "f": number = 15;break;
		case "g": number = 16;break;
		case "h": number = 17;break;
		case "i": number = 18;break;
		case "j": number = 19;break;
		case "k": number = 20;break;
		case "l": number = 21;break;
		case "m": number = 22;break;
		case "n": number = 23;break;
		case "o": number = 24;break;
		case "p": number = 25;break;
		case "q": number = 26;break;
		case "r": number = 27;break;
		case "s": number = 28;break;
		case "t": number = 29;break;
		case "u": number = 30;break;
	}

	if(callback!=null)
	{
		callback(number)
	}
}


function switchNumberTochar(number,callback)
{
	// abcdefghijklmnopqrstuvwxyz
	var c = null;
	switch(number)
	{
		case 0: c="0";break
		case 1: c="1";break
		case 2: c="2";break
		case 3: c="3";break
		case 4: c="4";break
		case 5: c="5";break
		case 6: c="6";break
		case 7: c="7";break
		case 8: c="8";break
		case 9: c="9";break
		case 10: c="a";break
		case 11: c="b";break
		case 12: c="c";break
		case 13: c="d";break
		case 14: c="e";break
		case 15: c="f";break
		case 16: c="g";break
		case 17: c="h";break
		case 18: c="i";break
		case 19: c="j";break
		case 20: c="k";break
		case 21: c="l";break
		case 22: c="m";break
		case 23: c="n";break
		case 24: c="o";break
		case 25: c="p";break
		case 26: c="q";break
		case 27: c="r";break
		case 28: c="s";break
		case 29: c="t";break
		case 30: c="u";break
	}
	if(callback!=null)
	{
		callback(c)
	}
}










