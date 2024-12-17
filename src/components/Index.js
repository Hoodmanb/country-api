import React, { useState, useEffect } from 'react';
import fetchCountries from '../api/fetchCountries';
import { styled, alpha, useTheme } from '@mui/material/styles';
import '../styles/Index.css';
import { Link } from 'react-router-dom';
import { Box, Button, TextField, Menu, MenuItem, InputAdornment, IconButton } from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';

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
    color: theme.palette.text.primary,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.primary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Home({ toggleTheme }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme(); // Get the theme from Material UI

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <div className="body">
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: "primary.main",
        padding: '20px 15px'
      }}>
        <h5 className="where">Where in the world?</h5>
        <IconButton onClick={toggleTheme}>
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <BedtimeIcon />}
        </IconButton>
      </Box>
      <Box sx={{ padding: '30px 15px' }}>

        <TextField
          label="Search For A Country..."
          variant="outlined"
          type="search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <div className='filter'>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            width={"50%"}
          >
            Find By region
          </Button>
        </div>

        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { filter('Asia'); handleClose(); }} disableRipple>
            Asia
          </MenuItem>

          <MenuItem onClick={() => { filter('Africa'); handleClose(); }} disableRipple>
            Africa
          </MenuItem>

          <MenuItem onClick={() => { filter('Americas'); handleClose(); }} disableRipple>
            Americas
          </MenuItem>

          <MenuItem onClick={() => { filter('Europe'); handleClose(); }} disableRipple>
            Europe
          </MenuItem>

          <MenuItem onClick={() => { filter('Oceania'); handleClose(); }} disableRipple>
            Oceania
          </MenuItem>
        </StyledMenu>

      </Box>

      {filteredCountries.length > 0 ? (
        <div className="cont">
          {filteredCountries.map((country) => (
            <Link to={`/country?name=${country.name}`} className="link" state={country} key={country.name}>
              <Box className="container" sx={{ bgcolor: "primary.main", color: "text.primary" }}>
                <img className='img' src={country.flags.png} alt={`${country.name} flag`} />
                <div className="details">
                  <span className="name">{country.name}</span>
                  <span><b>Population</b>: {country.population}</span>
                  <span><b>Region</b>: {country.region}</span>
                  <span><b>Capital</b>: {country.capital}</span>
                </div>
              </Box>
              <br />
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading countries...</p>
      )}
    </div>
  );
}