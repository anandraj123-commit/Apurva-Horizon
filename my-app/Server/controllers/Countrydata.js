const axios = require('axios');

// Fetch Countries
const fetchCountries = async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Failed to fetch countries' });
  }
};

// Fetch States
const fetchStates = async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ message: 'Failed to fetch states' });
  }
};

// Fetch Cities
const fetchCities = async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'Failed to fetch cities' });
  }
};

module.exports = { fetchCountries, fetchStates, fetchCities };
