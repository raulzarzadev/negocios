import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";

import NewBarrioForm from "./NewBarrioForm";

import url from "../../../url/url";
import Axios from "axios";
import NoLoggedView from "../../NoLoggedView";
import { useUser } from "../../../context/userContext";



export default function NewBarrio(props) {
  const { isLogged } = useUser();
  const token = localStorage.getItem("access-token");

  const [status, setStatus] = useState({
    loading: false,
    messageError: "",
    error: null,
  });

  async function onSubmit(data) {
    console.log(data);

    setStatus({
      ...status,
      loading: true,
    });
    console.log(token);
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "access-token": token,
        },
        data,
      };
      console.log("peticion enviada");
      let res = await Axios(`${url}/barrios`, config);
      console.log("peticion recibida", res);
      if (!res.data.ok) {
        console.log("peticion rechazada", res);
        setStatus({
          status,
          loading: false,
          messageError: <Alert severity="error">{res.data.message} </Alert>,
        });
      } else {
        console.log("peticion aceptada recuperando token", res.data);
        //setToken(res.da)
        setStatus({
          status,
          loading: false,
          messageError: <Alert severity="success">{res.data.message} </Alert>,
        });
      }
     
    } catch (error) {
      console.log("error capturado", error);

      setStatus({
        loading: false,
        messageError: <Alert severity="error">Error de connección.</Alert>,
        error,
      });
    }
  }

  return (
    <>
      {isLogged ? (
        <NewBarrioForm onSubmit={onSubmit} />
      ) : (
        <NoLoggedView text="Nuevo barrio" />
      )}
    </>
  );
}
