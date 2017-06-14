/**
 * Created by roshan on 28/5/17.
 */
var mysql = require('../config/mysqlconfig.js');
var jwt = require('jsonwebtoken');
var jwtconfig = require('../config/jwtconfig.js');
var utils = require('../common/utils.js');
var bcrypt = require('bcrypt-nodejs');
var login = require('../login/login.js');


var createAssetPath = function(pgrouppath, assettypeid, assetid) {
    var assetpath = pgrouppath+'/'+assettypeid+'/'+assetid;
    return assetpath;
};

exports.checkcreateuserargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['email', 'password', 'assettype', 'pgrouppath', 'meta']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};

var verifyassettype = function(req, res, next) {
    var querystr = "select * from bczdash.assettype where type = ?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data && data[0] && data[0].id){
                req.body.assettypeid = data[0].id;
                next()
            } else {
                utils.failReply(err, "assettype not exist", res);
            }
        }
        else {
            utils.failReply(err, msg, res);
        }
    }, mysql.queryReturn(querystr, [req.body.assettype]));

};

exports.verifypgrouppath = function(req, res, next) {
    var querystr = "select * from bczdash.assets where assetpath = ?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data && data[0] && data[0].assetid){
                next()
            } else {
                utils.failReply(err, "assettype not exist", res);
            }
        }
        else {
            utils.failReply(err, msg, res);
        }
    }, mysql.queryReturn(querystr, [req.body.pgrouppath]));

};

exports.checkusername = function(req, res, next) {
    var querystr = "select * from bczdash.assets where name = ?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if(data.length > 0){
                utils.failReply(null, "User already exist", res);
            } else {
                next();
            }
        }
        else {
            next();
        }
    }, mysql.queryReturn(querystr, [req.body.email]));

};


var createUserQuery = function(queryid, req) {
    return [queryid, 'insert into bczdash.assets(name, assettype) values (?,?)', function(results){
        return [req.body.email, req.body.assettypeid];
    }, mysql.transError("create user query failed"), function(results, resultq){
        if(resultq && "insertId" in resultq){
            req.body.assetid = resultq['insertId'];
            req.body.assetpath = createAssetPath(req.body.pgrouppath, req.body.assettypeid, req.body.assetid);
            return [false, resultq, "User Entry created successfully"];
        }else
            mysql.transErrorR(resultq, "insertid not found while creating user");
    }]
};


var updateAssetPathQuery = function(queryid, parentQueryid, req) {
    return [
        queryid, 'update bczdash.assets set assetpath = ? where assetid = ?', function(results){
            return [req.body.assetpath, req.body.assetid]
        }, mysql.transError("assetpath update failed"),function(results, resultq) {
            if (resultq && resultq.affectedRows > 0) {
                return [false, resultq, "assetpath update successful"];
            } else
                mysql.transErrorR(resultq, "assetpath update failed");
        }
    ]
};

var createUserInfo = function(queryid, parentQueryid, req) {
    return [
        queryid, 'insert into bczdash.userinfo (assetpath, password, meta) values (?, ?, ?)', function(results){
            return [req.body.assetpath, login.generateHash(req.body.password), req.body.meta]
        }, mysql.transError("create userinfo failed"),function(results, resultq) {
            if (resultq && resultq.affectedRows > 0) {
                return [false, resultq, "userinfo created successfully"];
            } else
                mysql.transErrorR(resultq, "create userinfo failed");
        }
    ]
};

var createUserQueries = function(req){
    var listofqueries = [];
    listofqueries.push(createUserQuery('createuser', req));
    listofqueries.push(updateAssetPathQuery('updateassetpath', 'createuser', req));
    listofqueries.push(createUserInfo('createuserinfo', 'updateassetpath', req));
    return listofqueries;
};

exports.createUser = function(req, callback) {
    mysql.getmysqlconnandruntran(function(err, data, msg){
        return callback(err, data, msg);
    }, createUserQueries(req));
};

exports.createAssetPath = createAssetPath;
exports.updateAssetPathQuery = updateAssetPathQuery;
exports.verifyassettype = verifyassettype;
