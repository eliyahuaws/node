
var path = require("path");
var TAG = path.basename(__filename+" ");
var con = require('./../create_database/GameDb');
var logger = require('./../logger/GameLogger');
var encrypt_decrypt = require('./encrypt_decrypt');



encrypt_decrypt.V1_encrypt("123456789","f3ab2e88de8c356c9d26cc3d1d3bc8ed372d2171","03527835469",function(out){

	logger.I("out out out out --- "+out);

	encrypt_decrypt.V1_decrypt(out,"f3ab2e88de8c356c9d26cc3d1d3bc8ed372d2171","03527835469",function(o){

			logger.I("out1 out1 out1 out1 --- "+o);
	});

});