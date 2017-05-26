
module.exports = function(app, console) {
    var widget = require('./widget.js');
    var utils = require('../common/utils.js');

    // app.post('/api/widget/getdatarate', function (req, res) {
    //     widget.getdatarate(req, res);
    // });
    //
    // app.post('/api/widget/getfuel', function (req, res) {
    //     widget.getfuel(req, res);
    // });
    app.post('/api/widget/getfuel', function (req, res) {
        widget.getfuel(req, res);
    });

    // app.post('/api/widget/gettotalfuel', function (req, res) {
    //     widget.getTotalFuel(req, res);
    // });
    //
    // app.post('/api/widget/getfuelinterval', function (req, res) {
    //     widget.getFuelInterval(req, res);
    // });
    //
    // app.post('/api/widget/createwidget', widget.verifycreatewidgetapiargs, function (req, res) {
    //     widget.createWidget(req, res);
    // });

};
