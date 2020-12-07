/* import { React, useState } from "react";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";

const Submiting = (url, form, token) => {
  const [status, setStatus] = useState({});

  const submitResource = async (e) => {
    setStatus({
      status,
      loading: true,
    });
    e.preventDefault();
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "access-token": token,
        },
        data: form,
      };
      console.log("peticion enviada");
      let res = await Axios(`${url}`, config);
      console.log("peticion recibida", res);
      if (!res.ok) {
        setStatus({
          ...status,
          loading: false,
          messageError: <Alert severity="error">{res.message} </Alert>,
        });
      } else {
        setToken(res);
        console.log("res", res);
        localStorage.setItem("access-token", res.token);
        setStatus({
          status,
          loading: false,
          messageError: <Alert severity="success">{res.message} </Alert>,
        });
        console.log(form);
      }
      //props.history.push('/')
    } catch (error) {
      console.log("peticion fallida", error);
      setStatus({
        loading: false,
        messageError: <Alert severity="error">Error </Alert>,
        error,
      });
    }
  };
  submitResource();

  return { status };
};

export default Submiting;
 */