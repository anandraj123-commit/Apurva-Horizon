const express = require('express');
const { fetchCountries, fetchStates, fetchCities } = require('../controllers/Countrydata');

const router = express.Router();

router.get('/countries', fetchCountries);
router.get('/states', fetchStates);
router.get('/cities', fetchCities);


module.exports = router;
