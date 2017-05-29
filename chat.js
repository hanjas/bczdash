/**
 * Created by roshan on 28/5/17.
 */
var compression = require('compression');
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var http        = require('http');
var appconfig = require('./app/config/appconfig.js');

var app = express();

var apiport = 3100;
var server = http.Server(app);
var io          = require('socket.io')(server);

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

io.on('connection',function (socket) {
    socket.on('chatMessage',function (from, msg) {
        io.emit('chatMessage',from,msg);
    });
    socket.on('notifyUser',function (user) {
        io.emit('notifyUser',user);
    });
});

app.get('/', function(req, res){
    res.send('what???', 404);
});


server.listen(apiport, function(){
    console.log('Platform REST API server listening at :' + apiport);
});
