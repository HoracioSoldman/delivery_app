let ApiStore = require('./apiStore');
const passport = require('passport');
const jwt = require('jsonwebtoken');

let apiStore = ApiStore.getInstance();

exports.fetchBikers = (req, res)=> {
    
    res.json({label:'List of all Bikers', data: apiStore.allBikers()});
    
}

exports.fetchShipments = (req, res)=> {
    const usr = res.locals.authenticatedUser;
    let filter = usr.role === 'Biker' ? usr.id : null;
    res.json({label:'List of all Shipments', data: apiStore.allShipments(filter)});
    
}

exports.updateSingleShipment = (req, res)=> {
    const usr = res.locals.authenticatedUser;
    const {updatedShipment} = req.body;
    if(usr.role === 'Biker' && 
        (updatedShipment.assignee === null || updatedShipment.assignee.id !== usr.id)){
            res.status(401).send({message: 'Access Denied! You can only update your own shipment!'});
//////////////////////////: SET A HANDLER OF THIS ERROR ON THE FRONT (MAYBE AN ALERT WOULD BE ENOUGH)    
    }else res.json(
        {
            label:'Updated list of all Shipments', 
            data: apiStore.updateShipment(updatedShipment, req)
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
    