var path = require("path");
var TAG = path.basename(__filename+" ");
var createDataBase = require('./GameCreateDataBases');
var logger = require('./../logger/GameLogger');

logger.I(TAG,"start config game");
createDataBase.createDataBase();
