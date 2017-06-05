/**
 * Created by roshan on 3/6/17.
 */
module.exports = function(app, console){
    var login = require('../login/login.js');
    var utils = require('../common/utils.js');
    var role = require('./role.js');
    var user = require('../user/user.js');
    var asset = require('../assets/asset.js');

    app.post('/api/role/createrole', asset.checkcreateassetargs, user.verifyassettype ,function(req, res){
        asset.createAsset(req, utils.generalCallback(res));
    });

    app.post('/api/role/assignrole', login.verifyToken, role.verifyassignroleapiargs, role.verifyuserpath, role.verifyrolepath, role.verifyuserrole,function (req, res) {
        role.assignRole(req, res);
    });

    app.post('/api/role/assignperm', login.verifyToken, role.verifyassignpermapiargs, role.verifyrolepath, role.verifyroleperm, function (req, res) {
        role.assignPermission(req, res);
    });


};