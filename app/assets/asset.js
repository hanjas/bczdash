/**
 * Created by roshan on 27/5/17.
 */
var mysql = require('../config/mysqlconfig.js');
var jwt = require('jsonwebtoken');
var jwtconfig = require('../config/jwtconfig.js');
var utils = require('../common/utils.js');
var bcrypt = require('bcrypt-nodejs');
var user = require('../user/user.js');

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
    var isallkeys = utils.checkallkeys(req.body, ['assetname', 'pgrouppath', 'assettype', 'meta']);
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


var createAssetquery = function(queryid, req) {
    return [queryid, 'insert into bczdash.assets(name, assettype) values (?,?)', function(results){
        return [req.body.assetname, req.body.assettypeid];
    }, mysql.transError("create asset query failed"), function(results, resultq){
        if(resultq && "insertId" in resultq){
            req.body.assetid = resultq['insertId'];
            req.body.assetpath = user.createAssetPath(req.body.pgrouppath, req.body.assettypeid, req.body.assetid);
            return [false, resultq, "Asset created successfully"];
        }else
            mysql.transErrorR(resultq, "insertid not found while creating asset");
    }]
};

var createassetinfo = function(queryid, parentQueryid, req) {
    return [
        queryid, 'insert into bczdash.assetinfo (assetpath, meta) values (?, ?)', function(results){
            return [req.body.assetpath, req.body.meta]
        }, mysql.transError("create userinfo failed"),function(results, resultq) {
            if (resultq && resultq.affectedRows > 0) {
                return [false, resultq, "userinfo created successfully"];
            } else
                mysql.transErrorR(resultq, "create userinfo failed");
        }
    ]
};

var createAssetQueries = function(req) {
    var listofqueries = [];
    listofqueries.push(createAssetquery('createasset', req));
    listofqueries.push(user.updateAssetPathQuery('updateassetpath', 'createasset', req));
    listofqueries.push(createassetinfo('createassetinfo', 'updateassetpath', req));
    return listofqueries;
};

exports.createAsset = function(req, callback) {
    mysql.getmysqlconnandruntran(function(err, data, msg){
        return callback(err, data, msg);
    }, createAssetQueries(req));
};