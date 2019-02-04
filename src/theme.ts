import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#009A49',
        contrastText: '#fff'
    },
    secondary: {
      main: '#FF7900',
      contrastText: '#fff'
    }
  }
});

export default theme;