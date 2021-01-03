import Axios from "axios";
import { decode } from "jsonwebtoken";
import React, { useState, useEffect, useMemo } from "react";
import { getToken, setToken, removeToken } from "../utils/token";

const UserContext = React.createContext();
const url = process.env.REACT_APP_SIGNUP_SERVICE;

export function UserProvider(props) {
  const [token] = useState(getToken());
  const [isLogged, setIsLogged] = useState();
  const [loading, setLoading] = useState(true);
  const [userAdverts, setUserAdverts] = useState([]);
  const [response, setResponse] = useState([]);
  const [user, setUser] = useState({});

  Axios.defaults.headers = {
    "Content-Type": "application/json",
    "access-token": token,
  };

  useEffect(() => {
    if (token === "undefined") {
      setLoading(false);
      setIsLogged(false);
      return;
    } else {
      setLoading(false);
    }
  }, []);

  /* useEffect(() => {
    if (!token) {
      setLoadingUser(false);
      setIsLogged(false);
      return;
    } else {
      loadingUser();
    }
    async function loadingUser() {
      try {
        const { id } = decode(token);
        const { data } = await Axios.get(`${url}/users/${id}`);
        setData(data);
        setIsLogged(data.user);
        setUserAdverts(data.adverts);
        setLoadingUser(false);
      } catch (error) {
        setLoadingUser(false);
        console.log(error, `${url}/users`);
      }
    }
  }, []); */

  async function signup(form) {
    const { data } = await Axios.post(`${url}/signup`, form);
    if (data.type2 === "successSignIn") {
      setUser(data.user);
      setToken(data.token);
      setIsLogged(true);
    }
    setResponse(data);
  }

  async function confirPassword(form, token) {
    const { data } = await Axios.post(`${url}/signup/${token}`, form);
    console.log(data);
    setResponse(data);
    if (data.type2 === "successSignIn") {
      setUser(data.user);
      setToken(data.token);
      setIsLogged(true);
    }
    return data;
  }

  async function login(form) {
    console.log("login sent", form);

    const { data } = await Axios.post(`${url}/signin`, form);
    console.log(data);
    if (data.type === "successSignIn") {
      setUser(data.user);
      setToken(data.token);
      setIsLogged(true);
    }
    setResponse(data);

    return data;
    //setData(data);
  }

  async function signout() {
    removeToken();
    setUser({});
    setIsLogged(false);
    window.location.href = "/";
  }

  const value = useMemo(() => {
    return {
      userAdverts,
      response,
      signup,
      confirPassword,
      login,
      signout,
      isLogged,
      user,
    };
  }, [userAdverts, response, isLogged, user]);

  //console.log(loadingUser);

  return <UserContext.Provider value={value} {...props} />;
}
export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser deberia estar dentro del proveedor UserContext");
  }
  return context;
}
