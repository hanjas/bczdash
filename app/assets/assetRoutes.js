/**
 * Created by roshan on 27/5/17.
 */
module.exports = function(app, console){
    var asset = require('./asset.js');
    var utils = require('../common/utils.js');
    var login = require('../login/login.js');
    var user = require('../user/user.js');

    app.post('/api/assets/createassettype', login.verifyToken, asset.checkcreateassettypeargs, function(req, res){
        asset.createAssetType(req, res);
    });

    app.post('/api/assets/createasset', login.verifyToken, asset.checkcreateassetargs, user.verifyassettype ,function(req, res){
        asset.createAsset(req, utils.generalCallback(res));
    });

    app.post('/api/assets/getmyassets', login.verifyToken, asset.checkgetmyassetargs, function(req, res){
        asset.getMyAssets(req, res);
    });

    app.post('/api/assets/getassettypes', login.verifyToken, function(req, res) {
        asset.getAssettypes(req, res);
    })

};