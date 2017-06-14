/**
 * Created by roshan on 14/6/17.
 */
module.exports = function(app, console){
    var login = require('../login/login.js');
    var utils = require('../common/utils.js');
    var product = require('./product.js');
    var user = require('../user/user.js');

    app.post('/api/product/createproduct', login.verifyToken, product.verifycreateproductargs, user.verifyassettype,
        user.verifypgrouppath, function(req, res){
        product.createproduct(req, utils.generalCallback(res));
    });
};