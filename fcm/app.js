var express = require('express');
var app = express();







app.get('/lior',function(request,response)
{
console.log("push send 1");

    var FCM = require('fcm-node');
     console.log("push send 1.2");
    var serverKey = 'AIzaSyDxwijC7tI9nUyo7j4ViVfx9SVJyiVg9U8'; 
      console.log("push send 1.3");//put your server key here
    var fcm = new FCM(serverKey);
      console.log("push send 1.4");
 console.log("push send 2");
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'reEwmzGNabN8:APA91bEbh4hizDvyu9GigIPmB3mXhihKiYV6BO0e7Ba3S1Uh0U_MbEMbAFom-Vfh59HGwazbs5cbNht8MkU-P1OOQejmFV-JmvFVSA-_kkkRyuMv8KAZIdsIRjnKc1mU2jESqwVI_MtJ', 
  
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
     console.log("push send 3");
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

     console.log("push send 4");
	 response.send("sdfsdf");
});



app.listen(8080);

console.log("app listen to port 3000");