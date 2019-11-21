const jwt = require('jsonwebtoken');
const ApiStore = require('../services/apiStore');
const apiStore = ApiStore.getInstance();

//This is to check if the user does exist for every request with a token attached to the header 
module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if (req.headers.authorization)
        token = req.headers.authorization.split(' ')[1];
    
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, "THis$IsMy#321Secret$key",
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    let usr = decoded.user;
                    
                    let authResult = apiStore.verifyUser(usr.id);
                    if(authResult.status === 'SUCCESS')
                        next();
                    else return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                }
            }
        )
    }
}