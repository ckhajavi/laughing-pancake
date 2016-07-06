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


function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

//app.use(express.static(__dirname+"/public"));

app.get('/tracking_pixel.gif', function(req, res, next) {

    process.nextTick(function() {
        // do tracking stuff
        console.log("connection opened at: ", getDateTime())
    });


    req.on('close', function(){
        console.log('Client closed the connection at: ', getDateTime());
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