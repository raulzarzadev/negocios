import Axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { getToken, setToken, removeToken } from "../utils/token";
import { decode } from "jsonwebtoken";
import { getAdvertsByOwner } from "../utils/adverts";
import { SIGNUP_SERVICE } from "../URLS";

const UserContext = React.createContext();
const url = SIGNUP_SERVICE;

export function UserProvider(props) {
  const [token] = useState(getToken());
  const [isLogged, setIsLogged] = useState(false);
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
        getUserAndAdverts(id)
          .then((res) => {
            setUser(res);
            setIsLogged(true);
            setLoading(false);
          })
          .catch((err) => console.log(err));
        //setResponse(res.data)
      } catch (error) {
        signout();
      }
    } else {
      setLoading(false);
      setIsLogged(false);
      console.log("no token");
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
    try {
      const { data } = await Axios.post(`${url}/forgot-password`, form);
      return data;
    } catch (err) {
      console.log(err);
      //setLoading(false);
    }
  }
  async function login(form) {
    setLoading(true);
    try {
      const { data } = await Axios.post(`${url}/signin`, form);
      setResponse(data);
      setLoading(false);
      if (data.type === "successSignIn") {
        setToken(data.token);
        window.location.href = "/perfil";
      }
      return data;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function signout() {
    window.location.href = "/";
    setResponse({});
    removeToken();
    setUser({});
    setTimeout(() => {
      setIsLogged(false);
    }, 300);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
