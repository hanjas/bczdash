/**
 * Created by roshan on 27/5/17.
 */
var mysql = require('../config/mysqlconfig.js');
var jwt = require('jsonwebtoken');
var jwtconfig = require('../config/jwtconfig.js');
var utils = require('../common/utils.js');
var bcrypt = require('bcrypt-nodejs');

exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

exports.checkcreateassettypeargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['assettype']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};

exports.checkcreateassetargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['name', 'pgrouppath', 'assettype', 'meta']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};

exports.createAssetType = function(req, res) {
    var querystr = "insert into bczdash.assettype (type) values (?)";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            utils.succReply(data, msg, res);
        }
        else {
            utils.failReply(err, msg, res);
        }
    }, mysql.queryReturn(querystr, [req.body.assettype]));
};

exports.createAsset = function(req, res) {

};