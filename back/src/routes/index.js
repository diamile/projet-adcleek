const express = require('express');
const {fetchAllcity,fetchCityDetail,insertCityToDataBase} = require('../controllers')
const router = express.Router();

router.get('/api/cities',fetchAllcity);
router.get('/api/forecast/city/:id_ville',fetchCityDetail)
router.get('/api/seedCity',insertCityToDataBase)

module.exports = router;