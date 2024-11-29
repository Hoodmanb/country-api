import React, { useState, useEffect } from 'react';
import fetchCountries from '../api/fetchCountries';
import { styled, alpha } from '@mui/material/styles';
import '../styles/Index.css';
import { Link } from 'react-router-dom';
import {Box, Button, TextField, Menu, MenuItem} from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadCountries();
  }, []);

  const filter = (region) => {
    const filtered = countries.filter(country => country.region === region);
    setFilteredCountries(filtered);
  };

  return (
    <div>
    <Box>
      <h5>Where in the world?</h5>
      <h5>
      <BedtimeIcon/> Dark Mode
      </h5>
    </Box>
    <Box>
    <TextField
      label="Search"
      variant="outlined"
      type="search"
    />
    
          <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          
          Duplicate
        </MenuItem>
      
        <MenuItem onClick={handleClose} disableRipple>
          
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          
          More
        </MenuItem>
      </StyledMenu>

    </Box>
      <button className="filter" onClick={() => filter('Asia')}>Asia</button>
      <button className="filter" onClick={() => filter('Africa')}>Africa</button>
      <button className="filter" onClick={() => filter('Americas')}>Americas</button>
      <button className="filter" onClick={() => filter('Europe')}>Europe</button>
      <button className="filter" onClick={() => filter('Oceania')}>Oceania</button>
      
      {filteredCountries.length > 0 ? (
        <ul>
          {filteredCountries.map((country) => (
          <Link to="/country" className="link" state={country}>
            <React.Fragment key={country.name}>
              <li>Name: {country.name}</li>
              <li>Population: {country.population}</li>
              <li>Region: {country.region}</li>
              <li>Capital: {country.capital}</li>
              <li>
                <img src={country.flags.png} alt={`${country.name} flag`} width={50} />
              </li>
              <br />
            </React.Fragment>
            </Link>
          ))}
        </ul>
      ) : (
        <p>Loading countries...</p>
      )}
    </div>
  );
}