
var fs = require('fs');
var util = require('util');
var config = require('./../config/config.js');

if(config.getEnvironment())
{
	var log_file = fs.createWriteStream(__dirname + '/TestLog.log',{'flags': 'a'});
}
else
{
	var log_file = fs.createWriteStream(__dirname + '/ProdLog.log',{'flags': 'a'});
}



console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
};

module.exports.logE = function (tag,info) {
	console.log("Error - " +tag+"--"  + " "+info + " TIME:"+new Date(Date.now()).toLocaleString());
};

module.exports.logI = function (tag,info) {
	console.log("Info - " +tag+"--" +info+ " TIME:"+new Date(Date.now()).toLocaleString());
};

module.exports.logW = function (tag,info) {
	console.log("Warning - " +tag +"--"+info+ " TIME:"+new Date(Date.now()).toLocaleString());
};