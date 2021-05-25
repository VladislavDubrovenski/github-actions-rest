import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#E4610F',
    },
    error: {
      main: red.A400,
    },
   
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});
export const themeTables = createMuiTheme({
  palette: {
    error: {
      main: red.A400,
    },
   
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});