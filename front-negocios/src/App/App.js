import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
/* ---Secciones y paginas -- */

import AdvertsList from "../components/pages/AdvertsList";
import Home from "../components/pages/Home";
import NewAdvert from "../components/pages/newAdverts/NewAdvert";
import NewBarrio from "../components/pages/newBarrios/NewBarrio";
import Profile from "../components/pages/userPage/Profile";
import Credit from "../components/pages/userPage/Credit";
import About from "../components/pages/About";
import HowItWorks from "../components/pages/HowItWorks";
import ForgotPassword from "../components/pages/userPage/ForgotPassword.js";
import RecoverPassword from "../components/pages/userPage/RecoverPassword.js";
import Contact from "../components/pages/userPage/Contact";
import SignUp from "../components/pages/userPage/SignUp";
import SignIn from "../components/pages/userPage/SignIn";
import { UserProvider, useUser } from "../context/userContext";
import VisulaGuide from "../components/visualGuide/VisulaGuide";
import { MuiThemeProvider } from "@material-ui/core";
import newTheme from "../components/theme/theme";
import MyLayout from "../components/MyLayout";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <MuiThemeProvider theme={newTheme}>
    <UserProvider>
      <App></App>
    </UserProvider>
  </MuiThemeProvider>
);

console.log("Enviroment: ", process.env.NODE_ENV)

function App() {
  const { loadingUser, data } = useUser();
  console.log(data);
  return (
    <Router>
      <MyLayout isLoading={loadingUser}>
        <Switch>
          {/* *** user */}
          <Route exact path="/perfil" component={Profile} />
          <Route exact path="/registrate" component={SignUp} />
          <Route exact path="/ingresa" component={SignIn} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/credito" component={Credit} />
          <Route
            exact
            path="/recover-password/:token"
            component={RecoverPassword}
          />
          <Route exact path="/signup/:token" component={Profile} />
          {/* *** autentication required */}
          <Route exact path="/nuevo-anuncio" component={NewAdvert} />
          <Route exact path="/nuevo-barrio" component={NewBarrio} />
          {/* *** always accessible */}
          <Route exact path="/" component={Home} />
          <Route exact path="/guia-visual" component={VisulaGuide} />
          <Route exact path="/nosotros" component={About} />
          <Route exact path="/contacto" component={Contact} />
          <Route exact path="/como-funciona" component={HowItWorks} />
          <Route exact path="/:shortName" component={AdvertsList} />
        </Switch>
      </MyLayout>
    </Router>
  );
}
