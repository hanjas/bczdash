var compression = require('compression');
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var jwt         = require('jsonwebtoken');
var http        = require('http');

var appconfig = require('./app/config/appconfig.js');
var app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./app/testing/testRoutes.js')(app, console);
require('./app/login/loginRoutes.js')(app, console);
require('./app/assets/assetRoutes.js')(app, console);
require('./app/user/userRoutes.js')(app, console);
require('./app/permission/permissionRoutes.js')(app, console);
require('./app/role/roleRoutes.js')(app, console);
require('./app/product/productRoutes.js')(app, console);
require('./app/payment/paymentRoutes.js')(app, console);


var server = http.Server(app);

server.listen(appconfig.apiport, function(){
    console.log('Platform REST API server listening at :' + appconfig.apiport);
});
