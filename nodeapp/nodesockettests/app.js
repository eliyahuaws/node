
/**
  Creating the server object. launch the createServer method and the handler as the callback.
  The handler is being fired rght after
 **/
require("./QuesrionObject");
var userHandler = require('./../data_handle/users');
var app = require('http').createServer(handler) 
var io = require('socket.io')(app);
var logger = require('./../logger/GameLogger');
var path = require("path");
var TAG = path.basename(__filename+" ");
// var QuesrionObject = require('.QuesrionObject');
// var dataHandleUser = require('./../data_handle/users');
var fs = require('fs'); //We need fs to call index.html
var port = process.env.PORT || 8080;



var dic =  new Map();
var clientsDic = new Map(); //deviceId,agreementId,lan,stage,question,answerInfo,answer,startTime,score,limitTime
var DEVICE_NOT_FOUND = 1;//DEVICE NOT FOUND 

/**
  Callback that fired when http.createServer completed
  var req = the request.
  var res = the result.
 **/


  console.log('START APP');
function handler (req, res) {
  fs.readFile(__dirname + '/index.html', //reading the file
              function (err, data) {  //calback that get fired right after the file was created
                if (err) { //if callback return error.
                  res.writeHead(500);
                  return res.end('Error loading index.html');
                }

                res.writeHead(200); //returning 200
                res.end(data); //printing the data - the index.html content

                /** Starting the interval that transmit to every socket **/
              });
}

/**
 *
 * io event that fires right after connection
 *
 */
io.sockets.on('connect', function(socket) {
  var timer = new TimerEvents(io);
  io.to(socket.id).emit("connect-socket-Id",socket.id);
  // io.clients[socket.id].emit("connect-socket-Id",socket.id);
  console.log('new client connected, count = ' + countConnectedClients() + " soketId" + socket.id );
  if ( countConnectedClients() === 1 ) {
    // first client signed in - start emitting timer events
    timer.start();
  }


  socket.on('disconnect', function() {
    console.log('client left, count = ' + countConnectedClients());
    
    if ( countConnectedClients() === 0 ) {
      // last client left - stop emitting timer events
      timer.stop();
    }
  });



  socket.on('startGame',function(socketId,agreementId,deviceId){
      logger.E(TAG,"START "+deviceId + " " + agreementId);
      userHandler.getUserByAgreementAndDevice(deviceId,agreementId,function(err,result)
      {
          if(err!=null)
          {
              io.to(socket.id).emit("connect-socket-Id","ERROR");
          }
          else
          {
          io.to(socket.id).emit("connect-socket-Id",result.nickName);
          }
      });

    // userHandler.checkIfUserExist(deviceId,agreementId,function(valid)
    // {
    //   if(valid)
    //   {
    //     if(dic.has(agreementId))
    //     {
    //       dic.delete(agreementId);
    //     }

    //   }
    //   else
    //   {

    //   }
    // });
  });


  socket.on('set',function(agreementId,deviceId){
    let a = new Question(new Date().getTime());

    logger.I(TAG,deviceId + " " + agreementId +  " **************** "  +a.time);

      userHandler.checkIfUserExist(deviceId,agreementId,function(ok)
      {
        if(ok)
        {
          if(dic.has(agreementId))
          {
            dic.delete(agreementId);
          }
          dic.set(agreementId,new Date().getTime());
          io.sockets.emit('set-'+agreementId, agreementId + " "+ randomIntInc(1, 10)+"");

        }
        else
        {
                io.sockets.emit('error-'+agreementId, DEVICE_NOT_FOUND);
        }
      });

  });

  socket.on('get',function(data){

    // Object.keys(dic).forEach(function(key) {
    //     console.log("a" +key );//+" "+ dic[key]);
    // });

    //    console.log('new client connected, count = ' +data + " " + dic);
    
    var a = dic.get(data);
    console.log('new client connected, count AAA= ' + a);
    var b = (new Date().getTime() - a);
    console.log('new client connected, count BBB= ' + b);
    io.sockets.emit('get-'+data,b+"");

  });




});




// deviceId,agreementId,lan,stage,question,answerInfo,answer,startTime,score,limitTime
function addQuestionToDic(socketId,deviceId,agreementId,lan,stage,questionDes,answerInfo,score,limitTime,numberOfWin,callback)
{

}



/**
 *
 * @returns {Number}
 */

function countConnectedClients() {
  var ns = io.of("/");    // the default namespace is "/"
  return Object.keys(ns.connected).length;
}

/**
 *
 * creating timer object.
 *
 * @param io
 * @returns {{start: Function, stop: Function}}
 * @constructor
 */

var TimerEvents = function(io) {
    var timer;

    return {
        start: function() {
            timer = setInterval(function(){ //running it every second

                var current_time = getCurrentTime(); //calculating the time
                // console.log("emit "+current_time);
                io.sockets.emit('clock-event', current_time); //emitting the clock-event through the socket
            },  1000);
        },

        stop: function() {
            clearInterval(timer);
        }
    }
};


/** function for printing the hour. Taken from 
http://www.mcterano.com/blog/%D7%A0%D7%99%D7%A1%D7%95%D7%99-17-%D7%A9%D7%A2%D7%95%D7%9F-%D7%A9%D7%9E%D7%AA%D7%A2%D7%93%D7%9B%D7%9F-%D7%91%D7%96%D7%9E%D7%9F-%D7%90%D7%9E%D7%AA-%D7%91%D7%A2%D7%96%D7%A8%D7%AA-node-js/
 **/

function getCurrentTime(){
  var currentDate = new Date();
  var currentHours = addZeroToOneDigit(currentDate.getHours());
  var currentMinutes = addZeroToOneDigit(currentDate.getMinutes());
  var currentSeconds = addZeroToOneDigit(currentDate.getSeconds());
  var currentTime = currentHours + ":" + currentMinutes + ":" + currentSeconds + " - " +randomIntInc(1, 10);
  var html = currentTime; //parseHtml(currentTime);
  return html;
}

function addZeroToOneDigit(digits){
  var result = ((digits).toString().length === 1) ? "0" + digits : digits;
  return result;
}

function parseHtml(currentTime){
  var result = currentTime;
  // var result = '<p style="direction: rtl; font: 12px Tahoma">';
  // result += 'השעה כרגע היא: ' + currentTime;
  // result += '.</p>';
  return result;
}

function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}




class Question{
    constructor(time ) {
        this.time = time;
    }
}







app.listen(port); //Listening on port 80. change it to 3000 if you have Apache on local machine






// question{
//   deviceId,agreementId,lan,stage,question,answerInfo,answer,startTime,score,limitTime


// }






