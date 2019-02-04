import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Material UI
import theme from './theme';
import { MuiThemeProvider } from "@material-ui/core/styles";

// Components
import AppView from './components/AppView';

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <AppView />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
)

export default App;
