var express = require('express');
var router = express.Router();
const service = require('../services/service');
const jwt = require('../config/jwt.conf')

router.get('/shipments', jwt.verifyJwtToken, service.fetchShipments);

router.get('/bikers', jwt.verifyJwtToken, service.fetchBikers);

router.post('/update-shipment', jwt.verifyJwtToken, service.updateSingleShipment);

router.post('/login', service.authentication);


module.exports = router;
