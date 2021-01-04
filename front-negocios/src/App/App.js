import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
/* ---Secciones y paginas -- */

import AdvertsList from "../components/pages/AdvertsList";
import Home from "../components/pages/Home";
import NewAdvert from "../components/pages/newAdverts/NewAdvert";
import NewBarrio from "../components/pages/newBarrios/NewBarrio";
import About from "../components/pages/About";
import HowItWorks from "../components/pages/HowItWorks";
import { UserProvider } from "../context/userContext";
import VisulaGuide from "../components/visualGuide/VisulaGuide";
import { MuiThemeProvider } from "@material-ui/core";
import newTheme from "../components/theme/theme";
import MyLayout from "../components/MyLayout";
import Dashboard from "../components/pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Contact from "../components/pages/userPages/Contact";
import ForgotPassword from "../components/pages/userPages/ForgotPassword";
import RecoverPassword from "../components/pages/userPages/RecoverPassword";
import SignIn from "../components/pages/userPages/SignIn";
import SignUp from "../components/pages/userPages/SignUp";
import FinishSignup from "../components/pages/userPages/FinishSignup";
import Profile from '../components/pages/userPages/Profile'
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <MuiThemeProvider theme={newTheme}>
    <UserProvider>
      <App></App>
    </UserProvider>
  </MuiThemeProvider>
);

console.log("Enviroment: ", process.env.NODE_ENV);

function App() {
  return (
    <Router>
      <MyLayout>
        <Switch>
          <PrivateRoute exact path="/perfil" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/nuevo-anuncio" component={NewAdvert} />
          <PrivateRoute exact path="/editar/:id" component={NewAdvert} />
          <PrivateRoute exact path="/nuevo-barrio" component={NewBarrio} />
          <PrivateRoute exact path="/guia-visual" component={VisulaGuide} />

          <Route exact path="/registrate" component={SignUp} />
          <Route exact path="/registrate/:token" component={FinishSignup} />
          <Route exact path="/ingresa" component={SignIn} />

          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/forgot-password/:token"
            component={RecoverPassword}
          />

          <Route exact path="/" component={Home} />
          <Route exact path="/nosotros" component={About} />
          <Route exact path="/contacto" component={Contact} />
          <Route exact path="/como-funciona" component={HowItWorks} />
          <Route exact path="/:shortName" component={AdvertsList} />
        </Switch>
      </MyLayout>
    </Router>
  );
}
