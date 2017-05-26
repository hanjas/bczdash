
var mysql = require('../config/mysqlconfig.js');
var utils = require('../common/utils.js');
var multer = require('multer');
var mime = require('mime-types');
var fs = require('fs');

exports.verifygetintervalapiargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['fromdate', 'todate']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};

exports.verifycreatewidgetapiargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['miles', 'fuel', 'time']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};


exports.getdatarate = function (req, res) {
    var querystr = "select sum(datarate) as data from intellicar.widgets";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []))
};

exports.getfuel = function (req, res) {
    var querystr = "select sum(fuel) as fuel from intellicar.widgets";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []))
};

exports.getTotalFuel = function (req, res) {
    var querystr = "select sum(fuels) as total_fuel from widgetapi.widget ";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []))
};

exports.getFuelInterval = function (req, res) {
    var querystr = "select (select sum(fuels) from widgets where time<= w.time) as fuel, w.time from widget w order by time desc limit 30;";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);    
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []))
};

exports.createWidget = function (req, res) {
    var querystr = "insert into widgetapi.widget(miles, fuels, time) values (?, ?, ?)";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, [req.body.miles, req.body.fuels, req.body.time]))
};