/**
 * Created by roshan on 2/6/17.
 */
var mysql = require('../config/mysqlconfig.js');
var jwt = require('jsonwebtoken');
var jwtconfig = require('../config/jwtconfig.js');
var utils = require('../common/utils.js');
var bcrypt = require('bcrypt-nodejs');
var login = require('../login/login.js');

exports.verifycreatepermargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['assetpath', 'r', 'w']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};

var verifyassetpath = function(req, res, next) {
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
    }, mysql.queryReturn(querystr, [req.body.assetpath]));
};

exports.createPermission = function(req, res) {
    var querystr = "insert into bczdash.permission (r, w, assetpath) values (?,?,?)";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            utils.succReply(data, "permission created successfully", res);
        }
        else {
            utils.failReply(err, "create permission failed", res);
        }
    }, mysql.queryReturn(querystr, [req.body.r, req.body.w, req.body.assetpath]));
};


exports.verifyassetpath = verifyassetpath;