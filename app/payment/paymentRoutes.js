/**
 * Created by roshan on 15/6/17.
 */
module.exports = function(app, console){
    var login = require('../login/login.js');
    var utils = require('../common/utils.js');
    var user = require('../user/user.js');
    var payment = require('./payment.js');

    app.post('/api/payment/add', login.verifyToken, payment.verifyaddpaymentapiargs, user.verifyassetpath, function(req, res){
        payment.addpayment(req, res);
    });

    app.post('/api/payment/get', login.verifyToken, payment.verifygetpaymentapiargs, function(req, res){
        payment.getpayment(req, res);
    });

    app.post('/api/payment/getall', login.verifyToken, function(req, res){
        payment.getallpayments(req, res);
    });
};