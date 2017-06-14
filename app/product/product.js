/**
 * Created by roshan on 14/6/17.
 */
var mysql = require('../config/mysqlconfig.js');
var utils = require('../common/utils.js');
var login = require('../login/login.js');
var user = require('../user/user.js');


exports.verifycreateproductargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['productname', 'assettype', 'pgrouppath', 'meta', 'productcost', 'discount']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};

var createproductQuery = function(queryid, req) {
    return [queryid, 'insert into bczdash.assets(name, assettype) values (?,?)', function(results){
        return [req.body.productname, req.body.assettypeid];
    }, mysql.transError("create product query failed"), function(results, resultq){
        if(resultq && "insertId" in resultq){
            req.body.assetid = resultq['insertId'];
            req.body.assetpath = user.createAssetPath(req.body.pgrouppath, req.body.assettypeid, req.body.assetid);
            return [false, resultq, "product Entry created successfully"];
        }else
            mysql.transErrorR(resultq, "insertid not found while creating product");
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

var createproductInfo = function(queryid, parentQueryid, req) {
    return [
        queryid, 'insert into bczdash.productinfo (assetpath, productcost, discount, meta) values (?, ?, ?, ?)', function(results){
            return [req.body.assetpath, req.body.productcost, req.body.discount, req.body.meta]
        }, mysql.transError("create productinfo failed"),function(results, resultq) {
            if (resultq && resultq.affectedRows > 0) {
                return [false, resultq, "productinfo created successfully"];
            } else
                mysql.transErrorR(resultq, "create productinfo failed");
        }
    ]
};

var createproductQueries = function(req){
    var listofqueries = [];
    listofqueries.push(createproductQuery('createproduct', req));
    listofqueries.push(updateAssetPathQuery('updateassetpath', 'createproduct', req));
    listofqueries.push(createproductInfo('createproductinfo', 'updateassetpath', req));
    return listofqueries;
};

exports.createproduct = function(req, callback) {
    mysql.getmysqlconnandruntran(function(err, data, msg){
        return callback(err, data, msg);
    }, createproductQueries(req));
};