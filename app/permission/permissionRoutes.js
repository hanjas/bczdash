/**
 * Created by roshan on 2/6/17.
 */
module.exports = function(app, console){
    var login = require('../login/login.js');
    var utils = require('../common/utils.js');
    var permission = require('./permission.js');

    app.post('/api/permission/createpermission', login.verifyToken, permission.verifycreatepermargs, permission.verifyassetpath, function(req, res){
        permission.createPermission(req, res);
    });
};
