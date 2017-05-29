/**
 * Created by roshan on 27/5/17.
 */
module.exports = function(app, console){
    var asset = require('./asset.js');
    var utils = require('../common/utils.js');
    var login = require('../login/login.js');

    app.post('/api/assets/createassettype', login.verifyToken, asset.checkcreateassettypeargs, function(req, res){
        asset.createAssetType(req, res);
    });

    app.post('/api/assets/createasset', login.verifyToken, asset.checkcreateassetargs, function(req, res){
        asset.createAsset(req, res);
    });

};
