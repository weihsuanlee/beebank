import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3682ff",
    },
    secondary: {
      main: "#36d48f",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f8f9fa",
          color: "#495057",
          fontFamily: "'Noto Sans', sans-serif",
        },
      },
    },
  },
});

export default theme;
