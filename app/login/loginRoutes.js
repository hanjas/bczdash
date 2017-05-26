module.exports = function(app, console){
    var login = require('./login.js');
    var utils = require('../common/utils.js');

    app.post('/gettoken', function(req, res){
	if (req.body.user)
	    login.getUserWithToken(req.body.user, utils.generalCallback(res));
	else
	    utils.failReply({"udfe":"USERDETAILS_INVALID"}, "Please provide user details", res);
    });

    app.post('/verifytoken', login.verifyToken, function(req, res){
	utils.succReply(req.tokend, "Token valid", res);
    });

    app.post('/signup', login.checksignupargs, function(req, res){
        login.createUser(req.body, utils.generalCallback(res));

    });

    console.log("Installing TOKEN Routes");
}
