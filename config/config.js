var config = require('./config.json');
var os = require('os');


if(os.hostname() = config.test_envirment_name = ){
console.log("test");

}
else
{
console.log("production");
}