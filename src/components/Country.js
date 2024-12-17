import React, { useEffect, useState } from 'react';
import fetchCountries from '../api/fetchCountries';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/country.css';
import { IconButton, Box } from '@mui/material';
import WestIcon from '@mui/icons-material/West';

export default function Country() {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate for navigation
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(null);

    // Get the 'name' query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const countryNameParam = queryParams.get('name');

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await fetchCountries();
                setCountries(data);

                // Filter the country by name based on the URL parameter
                const matchedCountry = data.find(
                    (country) => country.name.toLowerCase() === countryNameParam?.toLowerCase()
                );
                setCountry(matchedCountry);
            } catch (err) {
                console.error(err);
            }
        };

        loadCountries();
    }, [countryNameParam]); 

    return (
        <Box sx={{ padding: '20px' }}>
            <IconButton sx={{ border: '2px solid grey', borderRadius: '5px', width: '3em', height: '30px' }} onClick={() => navigate(-1)}>
                <WestIcon />
            </IconButton>
            {country ? (
                <Box sx={{ marginTop: '30px' }}>
                    <img src={country.flags.png} alt={`${country.name} flag`} width={'100%'} height={'220px'} />
                    <h2 className="name">{country.name}</h2>
                    <h4><b>Native Name</b>: {country.nativeName}</h4>
                    <h4><b>Population</b>: {country.population}</h4>
                    <h4><b>Region</b>: {country.region}</h4>
                    <h4><b>Sub Region</b>: {country.subregion}</h4>
                    <h4><b>Capital</b>: {country.capital}</h4>
                    <br />
                    <br />
                    <h4><b>Top Level Domain</b>: {country.topLevelDomain}</h4>
                    <h4><b>Currencies</b>: {country.currencies[0].name}</h4>
                    <h4><b>Languages</b>: {country.languages.map((lang) => lang.name).join(', ')}</h4>
                    <br />
                    <br />
                    <h2><b>Border Countries</b>: </h2>
                    <div className="borders">
                        {country.borders &&
                            country.borders.map((border) => {
                                const borderCountry = countries.find((country) => country.alpha3Code === border);
                                return borderCountry ? <span className="border" key={border}>{borderCountry.name}</span> : null;
                            })}
                    </div>
                </Box>
            ) : (
                <p>No matching country found or no data received</p>
            )}
        </Box>
    );
}