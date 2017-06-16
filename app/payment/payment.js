/**
 * Created by roshan on 15/6/17.
 */
var mysql = require('../config/mysqlconfig.js');
var utils = require('../common/utils.js');
var login = require('../login/login.js');

exports.verifyaddpaymentapiargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['assetpath', 'userpath', 'amount', 'timestamp', 'meta']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};

exports.verifygetpaymentapiargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['assetpath']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};

exports.addpayment = function(req, res) {
    var querystr = "insert into bczdash.transaction (assetpath, userpath, amount, timestamp, meta) values (?,?,?,?,?)";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            utils.succReply(data, "success", res);
        }
        else {
            utils.failReply(err, "no products", res);
        }
    }, mysql.queryReturn(querystr, [req.body.assetpath, req.body.userpath, req.body.amount, req.body.timestamp, req.body.meta]));
};

exports.getpayment = function(req, res) {
    var querystr = "select ";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            utils.succReply(data, "success", res);
        }
        else {
            utils.failReply(err, "no products", res);
        }
    }, mysql.queryReturn(querystr, [req.body.assetpath, req.body.userpath, req.body.amount, req.body.timestamp, req.body.meta]));
};