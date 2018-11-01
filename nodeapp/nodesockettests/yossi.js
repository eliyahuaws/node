
/**
  Creating the server object. launch the createServer method and the handler as the callback.
  The handler is being fired rght after
 **/

var app = require('http').createServer(handler) 
var io = require('socket.io')(app);


// var QuesrionObject = require('.QuesrionObject');
// var dataHandleUser = require('./../data_handle/users');
var fs = require('fs'); //We need fs to call index.html
var port = process.env.PORT || 3000;


//DEVICE NOT FOUND 

/**
  Callback that fired when http.createServer completed
  var req = the request.
  var res = the result.
 **/



function handler (req, res) {
    console.log('SSSS');
  // fs.readFile(__dirname + '/index.html', //reading the file
  //             function (err, data) {  //calback that get fired right after the file was created
  //               if (err) { //if callback return error.
  //                 res.writeHead(500);
  //                 return res.end('Error loading index.html');
  //               }

  //               res.writeHead(200); //returning 200
  //               res.end(data); //printing the data - the index.html content

  //               /** Starting the interval that transmit to every socket **/
  //             });
}

/**
 *
 * io event that fires right after connection
 *
 */


     console.log('AAA' + io);
io.sockets.on('connect', function(socket) {
    console.log('START APP');


  // // io.clients[socket.id].emit("connect-socket-Id",socket.id);
  // console.log('new client connected, count = ' + countConnectedClients() + " soketId" + socket.id );
  // if ( countConnectedClients() === 1 ) {
  //   // first client signed in - start emitting timer events
  //   timer.start();
  // }


  socket.on('disconnect', function() {
    console.log('client left, count = ' + countConnectedClients());

  });



  socket.on('startGame',function(){
   console.log('START startGame');
            io.sockets.emit('error', "sdfsd");


  });






});
 console.log('BBB');


      

app.listen(3000); //Listening on port 80. change it to 3000 if you have Apache on local machine






// question{
//   deviceId,agreementId,lan,stage,question,answerInfo,answer,startTime,score,limitTime


// }






