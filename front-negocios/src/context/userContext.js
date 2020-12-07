import Axios from "axios";
import { decode } from "jsonwebtoken";
import React, { useState, useEffect, useMemo } from "react";
import url from "../url/url";
import { getToken, setToken, removeToken } from "../utils/user";

const UserContext = React.createContext();

export function UserProvider(props) {
  const [loadingUser, setLoadingUser] = useState(true);
  const [userAdverts, setUserAdverts] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadingUser() {
      const token = getToken();
      if (!token) {
        setLoadingUser(false);
        return;
      }
      try {
        const { id } = decode(token);
        const { data } = await Axios.get(`${url}/users/${id}`);
        setData(data);
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
    console.log(form);
    const { data } = await Axios.post(`${url}/users/signup`, form);
    setData(data);
  }
  async function login(form) {
    console.log(form);
    const { data } = await Axios.post(`${url}/users/signin`, form);
    setData(data);
    setToken(data.token);
  }

  async function signout() {
    removeToken();
    setData(null);
  }

  const value = useMemo(() => {
    return {
      userAdverts,
      loadingUser,
      data,
      signup,
      login,
      signout,
    };
  }, [loadingUser, userAdverts, data]);

  console.log(loadingUser);

  return <UserContext.Provider value={value} {...props} />;
}
export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser deberia estar dentro del proveedor UserContext");
  }
  return context;
}
