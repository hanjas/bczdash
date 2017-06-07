/**
 * Created by roshan on 3/6/17.
 */
var mysql = require('../config/mysqlconfig.js');
var utils = require('../common/utils.js');
var login = require('../login/login.js');

exports.verifycreateroleapiargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['assetpath', 'r', 'w']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key not found " + isallkeys[1], res);
    else
        next()
};

exports.verifyassignroleapiargs = function(req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['userpath', 'rolepath']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key not fount " + isallkeys[1], res);
    else
        next()
};

exports.verifyassignpermapiargs = function(req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['rolepath', 'permid']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key not fount " + isallkeys[1], res);
    else
        next()
};

exports.verifyuserpath = function(req, res, next) {
    var querystr = "select * from bczdash.assets where assetpath = ?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if(data.length > 0){
                next();
            } else {
                utils.failReply(null, "assetpath not exist", res);
            }
        }
        else {
            utils.failReply(null, "assetpath not exist", res);
        }
    }, mysql.queryReturn(querystr, [req.body.userpath]));
};

exports.verifyrolepath = function(req, res, next) {
    var querystr = "select * from bczdash.assets where assetpath = ?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if(data.length > 0){
                next();
            } else {
                utils.failReply(null, "assetpath not exist", res);
            }
        }
        else {
            utils.failReply(null, "assetpath not exist", res);
        }
    }, mysql.queryReturn(querystr, [req.body.rolepath]));
};

exports.verifypermid = function(req, res, next) {
    var querystr = "select * from bczdash.permission where permid = ?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if(data.length > 0){
                next();
            } else {
                utils.failReply(null, "assetpath not exist", res);
            }
        }
        else {
            utils.failReply(null, "assetpath not exist", res);
        }
    }, mysql.queryReturn(querystr, [req.body.permid]));
};

exports.verifyuserrole = function(req, res, next) {
    var querystr = "select * from bczdash.user_role where userpath = ? and rolepath = ?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if(data.length > 0){
                utils.failReply(null, "already assigned", res);
            } else {
                next();
            }
        }
        else {
            next();
        }
    }, mysql.queryReturn(querystr, [req.body.userpath, req.body.rolepath]));
};

exports.verifyroleperm = function(req, res, next) {
    var querystr = "select * from bczdash.role_perm where rolepath = ? and permid = ?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if(data.length > 0){
                utils.failReply(null, "already assigned", res);
            } else {
                next();
            }
        }
        else {
            next();
        }
    }, mysql.queryReturn(querystr, [req.body.rolepath, req.body.permid]));
};

exports.assignRole = function(req, res) {
    var querystr = "insert into bczdash.user_role (userpath, rolepath) values (?,?)";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            utils.succReply(data, "role assign successfully", res);
        }
        else {
            utils.failReply(err, "role assign failed", res);
        }
    }, mysql.queryReturn(querystr, [req.body.userpath, req.body.rolepath]));
};

exports.assignPermission = function(req, res) {
    var querystr = "insert into bczdash.role_perm (rolepath, permid) values (?,?)";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            utils.succReply(data, "role assign successfully", res);
        }
        else {
            utils.failReply(err, "role assign failed", res);
        }
    }, mysql.queryReturn(querystr, [req.body.rolepath, req.body.permid]));
};
