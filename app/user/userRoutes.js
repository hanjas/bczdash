/**
 * Created by roshan on 28/5/17.
 */
module.exports = function(app, console){
    var login = require('../login/login.js');
    var utils = require('../common/utils.js');
    var user = require('./user.js');

    app.post('/api/user/createuser', user.checkcreateuserargs, user.checkusername, user.verifyassettype ,function(req, res){
        user.createUser(req, utils.generalCallback(res));
    });

};
