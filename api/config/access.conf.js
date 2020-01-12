const ApiStore = require('../services/apiStore');

module.exports.verifyAccess = (req, res, next)=>{
    const {path} = req;
    const usr = res.locals.authenticatedUser;
    
    if(path === '/bikers' && usr.role === 'Biker')
        return res.status(401).send({message: 'Access Denied for Bikers'})

    next();
}