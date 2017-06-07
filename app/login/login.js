var mysql = require('../config/mysqlconfig.js');
var jwt = require('jsonwebtoken'); 
var jwtconfig = require('../config/jwtconfig.js');
var utils = require('../common/utils.js');
var bcrypt = require('bcrypt-nodejs');

var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

var validPassword = function(password, passwordrecv) {
    return bcrypt.compareSync(password, passwordrecv);
};

var getUser = function(userjson, callback){
    if ('type' in userjson && userjson.type == 'com.blueciphers.assets.user.localuser'){
	if ('email' in userjson && 'password' in userjson){
	    //var getUserQuery = "select * from assetapi.users, assetapi.assetinfo where users.assetpath = assetinfo.hasassetpath and assetinfo.preftag = 'LOGIN_SETTINGS' and users.usertype = 'in.intellicar.assets.user.localuser' and users.name = ?";
        var getUserQuery = "select * from assets, userinfo where assets.assetpath = userinfo.assetpath and assets.name = ?";
	    mysql.getmysqlconnandrun(callback, mysql.queryErrSucc(getUserQuery, [userjson.email], function(err){
		callback(err, null, "Error while Querying");
	    }, function(userres){
		if (userres != null && userres.length == 1){
		    var i=0;
		    var usermeta = userres[i];
		    console.log(usermeta);
		    if ("password" in usermeta && validPassword(userjson.password, usermeta.password)){
            return callback(null, {"userid":userres[i].assetid, "type":userjson.type, "email":userjson.email, "assetpath":userres[i].assetpath}, "User validated");
		    }else{
            return callback({"msg":"Password not valid"}, null, "Invalid Password");
		    }
		}else
		    return callback({"msg":"email not valid"}, null, "Invalid user");
	    }));
	}else
	    return callback({"msg":"email is required for local login"}, null, "email not in request");
    }else{
	return callback({"msg":"Login type not specified"}, null, "Login type not in request/Not Proper");
    }
};

var getUserWithToken = function(userjson, callback){
    getUser(userjson, function(err, result, msg){
	if (err != null){
	    callback(err, result, msg);
	}else{
	    console.log(result);
	    var token = jwt.sign({"userinfo":result}, jwtconfig.secret, {"expiresIn":3600000});
	    callback(null, {"token":token, "userinfo":result}, "Token successfully generated");
	}
    });
}

var decodeToken = function(token, callback){
    if (token){
	jwt.verify(token, jwtconfig.secret, function(err, decoded) {
	    return callback(err, decoded);
	});
    }else{
	return callback({"msg":"Please give the token"}, null);
    }
};    

var verifyToken = function(req, res, next){
    console.log(req.body);
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token){
	jwt.verify(token, jwtconfig.secret, function(err, decoded) {
	    if (err) {
		return utils.authFailure('Failed to authenticate the token', res);
	    }else{
		console.log("decoded successfully");
		console.log(decoded);
		req.tokend = decoded;
		next();
	    }
	});
    }else{
	utils.authFailure("Token not found", res);
    }
};


exports.generateHash = generateHash;
exports.getUser = getUser;
exports.getUserWithToken = getUserWithToken;
exports.verifyToken = verifyToken;
exports.decodeToken = decodeToken;
exports.validPassword = validPassword;
