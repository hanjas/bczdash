/**
 * Created by roshan on 28/5/17.
 */
module.exports = function(app, console){
    var login = require('../login/login.js');
    var utils = require('../common/utils.js');
    var user = require('./user.js');
    var role = require('../role/role.js');

    app.post('/api/user/createuser', login.verifyToken, user.checkcreateuserargs, user.checkusername, user.verifyassettype ,function(req, res){
        user.createUser(req, utils.generalCallback(res));
    });

    app.post('/api/user/assignrole', login.verifyToken, role.verifyassignroleapiargs, role.verifyuserpath, role.verifyrolepath, role.verifyuserrole,function (req, res) {
        role.assignRole(req, res);
    });

};
