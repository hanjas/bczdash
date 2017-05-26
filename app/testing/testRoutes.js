
module.exports = function(app, console) {
    var utils = require('../common/utils.js');


    app.post('/api/widget/getfuel', function (req, res) {
        // widget.getfuel(req, res);
        utils.succReply('','test success',res);
    });

};