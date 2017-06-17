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
    var querystr = "select * from bczdash.transaction where assetpath=?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            utils.succReply(data, "success", res);
        }
        else {
            utils.failReply(err, "no products", res);
        }
    }, mysql.queryReturn(querystr, [req.body.assetpath, req.body.userpath]));
};

exports.getallpayments = function(req, res) {
    var querystr = "select trans.* from assets, user_role, role_perm, permission, assettype, transaction trans where user_role.userpath=? and role_perm.rolepath=user_role.rolepath and permission.permid=role_perm.permid and (permission.w=1 or permission.r=1) and assets.assetpath=permission.assetpath and assettype.type='com.blueciphers.assets.product' and assets.assettype=assettype.id and trans.assetpath=assets.assetpath;";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data && data.length > 0)
                utils.succReply(data, "success", res);
            else
                utils.succReply(data, "no payments", res);
        }
        else {
            utils.failReply(err, "no payments", res);
        }
    }, mysql.queryReturn(querystr, [req.tokend.userinfo.assetpath]));
}