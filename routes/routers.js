const express = require('express');
const {adminApiHandler, customersInfo} = require('../controllers/admin');
const shopifyApiConfig = require('../config/shopifyApiConfig');
const router = express.Router();

router.get('/', adminApiHandler);
router.get('/customersinfo', customersInfo);

module.exports = router;