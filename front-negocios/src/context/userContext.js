import Axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { getToken, setToken, removeToken } from "../utils/token";
import { decode } from "jsonwebtoken";
import { getAdvertsByOwner } from "../utils/adverts";

const UserContext = React.createContext();
const url = process.env.REACT_APP_SIGNUP_SERVICE;

export function UserProvider(props) {
  const [token] = useState(getToken());
  const [isLogged, setIsLogged] = useState();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState([]);
  const [user, setUser] = useState({});

  Axios.defaults.headers = {
    "Content-Type": "application/json",
    "access-token": token,
  };

  useEffect(() => {
    if (token) {
      console.log("token");
      try {
        const { id } = decode(token);
        console.log(id);
        getUserAndAdverts(id).then((res) => {
          setUser(res);
          setLoading(false);
          setIsLogged(true);
        });
        //setResponse(res.data)
      } catch (error) {
        //setUser({})
        //setIsLogged(false)
        setLoading(false);
      }
    } else {
      console.log("no token");
      setLoading(false);
    }
  }, [token]);

  async function getUserAndAdverts(id) {
    const {
      data: { user },
    } = await Axios.get(`${url}/${id}`);
    const {
      data: { adverts },
    } = await getAdvertsByOwner(user._id);
    return { ...user, adverts };
  }

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
    const { data } = await Axios.post(`${url}/signin`, form);
    if (data.type === "successSignIn") {
      setToken(data.token);
    }
    setResponse(data);
    return data;
  }

  async function signout() {
    removeToken();
    setUser({});
    setIsLogged(false);
    window.location.href = "/";
  }

  const value = useMemo(() => {
    return {
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
  }, [response, isLogged, user, loading]);

  //console.log(loadingUser);
  console.log("user", user);

  return <UserContext.Provider value={value} {...props} />;
}
export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser deberia estar dentro del proveedor UserContext");
  }
  return context;
}
