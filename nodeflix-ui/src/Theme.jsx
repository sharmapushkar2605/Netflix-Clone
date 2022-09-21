import {createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e50914',
    },
    secondary:{
        main:'#000001'
    },
    text:{
        primary:'#f5f5f1', secondary:'#000000'
      }
  },
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color:'black'
        },
      },
    },
  },
  
});

export default theme;