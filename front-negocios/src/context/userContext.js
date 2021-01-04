import Axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { getToken, setToken, removeToken } from "../utils/token";
import { decode } from "jsonwebtoken";

const UserContext = React.createContext();
const url = process.env.REACT_APP_SIGNUP_SERVICE;

export function UserProvider(props) {
  const [token] = useState(getToken());
  const [isLogged, setIsLogged] = useState();
  const [loading, setLoading] = useState(true);
  const [userAdverts] = useState([]);
  const [response, setResponse] = useState([]);
  const [user, setUser] = useState({});

  Axios.defaults.headers = {
    "Content-Type": "application/json",
    "access-token": token,
  };

  useEffect(() => {
    if (token === "undefined" || !token) {
      console.log("no token");
      setLoading(false);
      setIsLogged(false);
      return;
    } else {
      const { id } = decode(token);
      Axios.get(`${url}/${id}`)
        .then((res) => {
          setUser(res.data.user);
          setIsLogged(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [token]);
 

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
    setResponse(data);
    console.log(data);
    if (data.type2 === "successSignIn") {
      const { email } = decode(data.token);
      login({ email, password: form.password });
    }
    return data;
  }

  async function recoverPassword(form, token) {
    const { data } = await Axios.post(`${url}/forgot-password/${token}`, form);
    setResponse(data);
    if (data.type2 === "successSignIn") {
      login({ email: data.user.email, password: form.password });
    }
    return data;
  }

  async function forgotPassword(form) {
    setLoading(true);
    try {
      const { data } = await Axios.post(`${url}/forgot-password`, form);
      setLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
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
      forgotPassword,
      recoverPassword,
      login,
      signout,
      isLogged,
      user,
      loading,
    };
  }, [userAdverts, response, isLogged, user, loading]);

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
