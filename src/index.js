import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './styles/theme.js';

const Root = () => {
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    const prefaredTheme = localStorage.getItem('country-api-theme');
    if (prefaredTheme) {
      setTheme(prefaredTheme === 'dark' ? darkTheme : lightTheme);
    } else {
      localStorage.setItem('country-api-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('country-api-theme', newTheme === darkTheme ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);