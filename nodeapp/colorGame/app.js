
var app = require('http').createServer(handler) 
var io = require('socket.io')(app);

var fs = require('fs'); 
var port = process.env.PORT || 3000;

var idMaster = new Map();
var sendToAll = false;
function handler (req, res) {
   // console.log('SSSS');
}
var code1 ="YOU ARE THE MASTER";
var code2 = "CANNOT CONNECT TO MASTER";
var code3 = "Connect To MASTER";
var code4 = "CANNOT START GAME";


var life = 5;
var fire = 5;
var shild = 5;


io.sockets.on('connect', function(socket) {

  // console.log('client connect '+socket.id);//+socket.id);


  socket.on('disconnect', function() {
    // console.log('client left, count = ');

  });


  socket.on('createMaster',function(id,masterName){
     console.log('THIS IS MASTER ID:'+id);
      if(idMaster.has(id))
      {
        idMaster.delete(id);
      }
      var a = [];
      var player = {};
      player.name = masterName;
      player.id = id;
      a.push(player);
      idMaster.set(id,a);
      io.to(socket.id).emit("command",masterName +" " + code1);
      io.to(socket.id).emit("you-are-the-master");
  });


  socket.on('startGame',function(mastertId){
  	   console.log('START startGame');
 		if(idMaster.has(mastertId))
 		{
     		var a = idMaster.get(mastertId);
     		startGame(mastertId,a);
 		}
 		else
 		{
 			    io.to(mastertId).emit("command",code4);
 		}
  });

  socket.on('connectToMaster',function(socketIdMaster,socketIdPlayer,playerName){
    console.log('MASTER ID:'+socketIdMaster);
    console.log('PLAYER ID:'+socketIdPlayer);
		for (var entry of idMaster.entries()) {
		    var key = entry[0],
		        value = entry[1];
		    console.log(key + " = " + value);
		}

  	    console.log("***************************** "+idMaster);
      if(idMaster.has(socketIdMaster))
      {
      	console.log("a");
        var a = idMaster.get(socketIdMaster);
	      var player = {};
	      player.name = playerName;
	      player.id = socketIdPlayer;
      	console.log("b");
        a.push(player);
             	console.log("c");
        idMaster.delete(socketIdMaster);
                     	console.log("d");
        idMaster.set(socketIdMaster,a);
        console.log("e");
        sendMassage(a,socketIdMaster,playerName + " " + code3)
              
      }
      else
      {
       io.to(socketIdPlayer).emit("command",plyearName +" "+ code2);
      }
  });
});


function sendMassage(arr,masterId,code)
{
	console.log("command send to all");
	if(sendToAll)
	{
		  for (var i = 0; i < arr.length; i++) {
		     console.log("command send to "+arr[i]);
		          io.to(arr[i].id).emit("command",code);
		  }
	}
	else
	{
		   io.to(masterId).emit("command",code);
	} 
}

function startGame(masterId,arr)
{
	var a=[];

  for (var i = 0; i < arr.length; i++) {
  			var player = {};
  			player.masterId = masterId;
  			player.id = arr[i].id;
  			player.name = arr[i].name;
  			player.fire = fire;
  			player.life = life;
  			player.shild = shild;
  			player.position = i;
  			a.push(player);
  }

  for (var i = 0; i < arr.length; i++) {
          io.to(arr[i].id).emit("startGame",a);
  }
}


app.listen(3000); //Listening on port 80. change it to 3000 if you have Apache on local machine






// question{
//   deviceId,agreementId,lan,stage,question,answerInfo,answer,startTime,score,limitTime


// }






