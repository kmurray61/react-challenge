import React, { Fragment } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import defaultUnitPlugin from "jss-plugin-default-unit";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import store from "./store";
import App from "./components/App";

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const jss = create({
  ...jssPreset()
});

jss.use(defaultUnitPlugin);

const theme = createMuiTheme({
    // your code here
    palette: {
        primary: purple,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});

render(
  <Fragment>
    <CssBaseline />
    <JssProvider jss={jss} generateClassName={createGenerateClassName()}>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  </Fragment>,
  document.getElementById("client-container")
);
