let ApiStore = require('./apiStore');
const passport = require('passport');
const jwt = require('jsonwebtoken');

let apiStore = ApiStore.getInstance();

exports.fetchBikers = (req, res)=> {
    
    res.json({label:'List of all Bikers', data: apiStore.allBikers()});
    
}

exports.fetchShipments = (req, res)=> {
    
    res.json({label:'List of all Shipments', data: apiStore.allShipments()});
    
}

exports.updateSingleShipment = (req, res)=> {
    
    res.json(
        {
            label:'Updated list of all Shipments', 
            data: apiStore.updateShipment(req.body.updatedShipment, req)
        }
    );
    
}

exports.authentication = (req, res, next)=> {
    passport.authenticate('local', (err, result) => {    
        
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (result){
            
            if(result.status === 'SUCCESS'){
                result.token = module.exports.generateJwt(result.user);
            }
            
            return res.status(200).json(result);  
          
        } 
        
    })(req, res, next);
    
}


module.exports.generateJwt = function (user) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
    
      user: user,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, "THis$IsMy#321Secret$key");
  }
    