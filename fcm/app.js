var express = require('express');
var app = express();
  // var FCM = require('fcm-node');


 



app.get('/lior',function(request,response){
console.log("push send 1");

      console.log("push send 1.2");
    var serverKey = 'AAAAO337OBw:APA91bH_TA1I_P0vh3YAlkCQPc_cUcWYC-e9mq6LnH7U1jP4Z8pS3_dtd8kwt8qYa8nYKJiP5kcjGqhz2v2RGxI8POHNoh0y7hOftGV6bA-ipAuG6AME87erFQeFKtdi3D68Wev6Q6OT'; 
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