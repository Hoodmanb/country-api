import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFFFFF", 
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#F5F6F8",
      paper: "#f4f6f8", 
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2B3743", // Light blue for dark mode
    },
    secondary: {
      main: "#F9FEFE", // Light purple
    },
    background: {
      default: "#1F2D36",
      paper: "#293641", // Slightly lighter for cards, modals, etc.
    },
    text: {
      primary: "#F9FEFE",
      secondary: "#AAB4BE",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});