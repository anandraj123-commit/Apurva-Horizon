import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField, MenuItem, Box, Container, Button } from '@mui/material';
import Notification from '../../Modules/Notification';
import { useNavigate, useParams } from 'react-router-dom';

const RegionUpdate = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState('');

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');

  const [newsTitle, setNewsTitle] = useState('');
  const [newsDescription, setNewsDescription] = useState('');
  const [displayTime, setDisplayTime] = useState('');
  const [status, setStatus] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const headers = new Headers();
  headers.append("X-CSCAPI-KEY", "Zk10ZVljb0Iybnl1ZE1aU21IY25xUWR0ekpHcXhSSGNMak40S1A3NA==");

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const getCountryData = async () => {
    try {
      const response = await fetch("https://api.countrystatecity.in/v1/countries", requestOptions);
      const res = await response.json();
      setCountries(res);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getStateData = async (countryCode) => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, requestOptions);
      const res = await response.json();
      setStates(res);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getCityData = async (countryCode, stateCode) => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, requestOptions);
      const res = await response.json();
      setCities(res);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getNewsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/regional-news/view/${id}`);
      const data = await response.json();
      const { newsTitle, newsDescription, displayTime, status, selectedCountry, selectedState, selectedCity } = data;
      setNewsTitle(newsTitle);
      setNewsDescription(newsDescription);
      setDisplayTime(displayTime);
      setStatus(status);
      setSelectedCountry(selectedCountry);
      setSelectedState(selectedState);
      setSelectedCity(selectedCity);

      setSelectedCountryName(selectedCountry);
      setSelectedStateName(selectedState);
      setSelectedCityName(selectedCity);

      getStateData(selectedCountry);
      getCityData(selectedCountry, selectedState);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    getCountryData();
    if (id) {
      getNewsData();
    }
  }, [id]);

  useEffect(() => {
    if (selectedCountry) {
      getStateData(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      getCityData(selectedCountry, selectedState);
    }
  }, [selectedState]);

  const handleSubmit = async () => {
    const formData = {
      newsTitle,
      newsDescription,
      displayTime,
      status,
      selectedCountry: selectedCountryName,
      selectedState: selectedStateName,
      selectedCity: selectedCityName,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/regional-news/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Notification.success("Successfully updated");
        navigate('/admin/regional-news/list');
      } else {
        const errorData = await response.json();
        Notification.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Notification.error("Update failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Update News and Region Selector
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="News Title"
                  variant="outlined"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="News Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={newsDescription}
                  onChange={(e) => setNewsDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Display Time"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  value={displayTime}
                  onChange={(e) => setDisplayTime(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Select Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Select Country"
                  value={selectedCountryName}
                  onChange={(e) => {
                    const country = countries.find(c => c.name === e.target.value);
                    setSelectedCountry(country.iso2);
                    setSelectedCountryName(country.name);
                  }}
                >
                  <MenuItem value="">-- Select a Country --</MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.iso2} value={country.name}>{country.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              {selectedCountry && (
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Select State"
                    value={selectedStateName}
                    onChange={(e) => {
                      const state = states.find(s => s.name === e.target.value);
                      setSelectedState(state.iso2);
                      setSelectedStateName(state.name);
                    }}
                  >
                    <MenuItem value="">-- Select a State --</MenuItem>
                    {/* {states.map((state) => (
                      <MenuItem key={state.iso2} value={state.name}>{state.name}</MenuItem>
                    ))} */}
                  </TextField>
                </Grid>
              )}

              {selectedState && (
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Select City"
                    value={selectedCityName}
                    onChange={(e) => {
                      setSelectedCityName(e.target.value);
                    }}
                  >
                    <MenuItem value="">-- Select a City --</MenuItem>
                    {/* {cities.map((city) => (
                      <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
                    ))} */}
                  </TextField>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button variant="contained" color="success" onClick={handleSubmit}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RegionUpdate;
