import React, {useEffect, useState} from 'react';
import fetchCountries from '../api/fetchCountries';
import { useLocation } from 'react-router-dom';
import '../styles/country.css'

export default function Country() {
    const location = useLocation();
    const data = location.state;
    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data)
      } catch (err) {
        console.error(err);
      }
    };
    loadCountries();
  }, []);

    return (
        <div>
            {data ? (
                <>
                  <img src={data.flags.png} alt={`${data.name} flag`} width={80} />
                    <h2>{data.name}</h2>
                    <h4>Native Name: {data.nativeName}</h4>
                    <h4>Population: {data.population}</h4>
                    <h4>Region: {data.region}</h4>
                    <h4>Sub Region: {data.subregion}</h4>
                    <h4>Capital: {data.capital}</h4>
                    <br></br>
                    <br></br>
                    <h4>Top Level Domain: {data.topLevelDomain}</h4>
                    <h4>Currencies: {data.currencies[0].name}</h4>
                    <h4>Languages: {data.languages.map(lang => lang.name).join(', ')}</h4>
                    <br></br>
                    <br></br>
                    <h2>Border Countries: </h2>
                    <div className="borders">
                    {data.borders && data.borders.map(border => {
                      const country = countries.find(country => country.alpha3Code === border);
                      return country ? <span className="border" key={border}>{country.name}</span> : null;
                    })}
                    </div>
                </>
            ) : (
                <p>No data received</p>
            )}
        </div>
    );
}