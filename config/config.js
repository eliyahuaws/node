var config = require('./config.json');
var os = require('os');

var name = config.test_envirment;
var name1 = os.hostname();
console.log(name +" " + name1);
if(name.toString()== name1.toString()){
console.log("test");

}
else
{
console.log("production");
}