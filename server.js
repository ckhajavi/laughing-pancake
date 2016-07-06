var express = require('express');
var emptygif = require('emptygif');
var app = express();
var middleWare = require('./middleWare.js');
var callbacks = function(){
	console.log("gothere");
}


app.use(emptygif.emptyGif([{path:'/erreport', maxAge: 0,  callback:function(req) { console.log("gothere")} }]));

app.get('/about',middleWare.Auth,function(request,response){
	    
});



//app.use(express.static(__dirname+"/public"));

app.get('/tracking_pixel.gif', function(req, res, next) {

    process.nextTick(function() {
        // do tracking stuff
        console.log(Date.now())
    });

    console.log(Date.now())

    req.on("end", function() {
  // request ended normally
  		console.log("it ended")
	});

    req.on('close', function(){
        console.log('Client closed the connection');
        emptygif.sendEmptyGif(req, res, {
            'Content-Type' : 'image/gif',
            'Content-Length' : emptygif.emptyGifBufferLength,
            'Cache-Control' : 'public, max-age=0' // or specify expiry to make sure it will call everytime
        });
    });

});

app.listen(3100,function(){
	console.log('Server running on port number 3100');
});
