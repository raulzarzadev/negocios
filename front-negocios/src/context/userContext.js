import Axios from "axios";
import { decode } from "jsonwebtoken";
import React, { useState, useEffect, useMemo } from "react";
import url from "../url/url";
import { getToken, setToken, removeToken } from "../utils/user";

const UserContext = React.createContext();

const token = getToken();
Axios.defaults.headers = {
  "Content-Type": "application/json",
  "access-token": token,
};

export function UserProvider(props) {
  const [isLogged, setIsLogged] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [userAdverts, setUserAdverts] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadingUser() {
      if (!token) {
        setLoadingUser(false);
        setIsLogged(false);
        return;
      }
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
    loadingUser();
  }, []);

  async function signup(form) {
    console.log("signup sent");
    const { data } = await Axios.post(`${url}/users/signup`, form);
    setData(data);
  }

  async function login(form) {
    console.log("login sent");
    const { data } = await Axios.post(`${url}/users/signin`, form);
    setData(data);
    setToken(data.token);
    setIsLogged(data.user);
  }

  async function signout() {
    removeToken();
    setData(null);
    setIsLogged(false);
    window.location.href = "/";
  }

  const value = useMemo(() => {
    return {
      userAdverts,
      loadingUser,
      data,
      signup,
      login,
      signout,
      isLogged,
    };
  }, [loadingUser, userAdverts, data, isLogged]);

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
