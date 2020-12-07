import React, { useState, useEffect } from "react";
import url from "../../../url/url";
import SignForm from "./SignForm";
import UserView from "./UserView";
import Axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../../../utils/user";
import { makeStyles } from "@material-ui/core";
import Loading from "../../atomos/Loading";
//import negdelbar_logo from "../../assets/negdelbar_logo.png";
const useStyles = makeStyles((theme) => ({
  profileContent: {
    margin: theme.spacing(4, 0),
  },
}));
export default function NewUser(props) {
  const classes = useStyles();
  console.log(props);
  const signupToken = props.match.params.token;
  const history = useHistory();
  const [user, setUser] = useState(false);
  const [signForm, setSignForm] = useState("signin");
  const [status, setStatus] = useState({
    loading: true,
    messageError: null,
    error: null,
  });

  const onSubmit = (data) => {
    postForm(url, signForm, data);
  };

  const handleChangeSignForm = (e) => {
    e.preventDefault();
    signForm === "signin" ? setSignForm("signup") : setSignForm("signin");
  };

  const handleConfirmEmail = (data) => {
    console.log(data, signupToken);
    Axios.post(`${url}/users/signup/${signupToken}`, data)
      .then((res) => {
        if (res.data.ok) {
          postForm(url, "signin", data);
        } else {
          setStatus({
            ...status,
            messageError: "Este correo ya fue validado. Inicia sesion",
          });
          setTimeout(() => {
            history.push("/perfil");
          }, 1000);
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  function postForm(url, signForm, data) {
    Axios.post(`${url}/users/${signForm}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.ok) {
          localStorage.setItem("access-token", res.data.token);
          const { id } = jwt.decode(res.data.token);
          setUserId(id);
          //setUser(res.data.user)
          setStatus({
            status,
            loading: false,
            messageError: res.data.message,
          });
        } else {
          //setUser(res.data.user)
          setStatus({
            status,
            loading: false,
            messageError: res.data.message,
          });
        }
      })
      .catch((error) => {
        setStatus({
          loading: false,
          messageError: "Ups! error de coneccion",
          error,
        });
      });
  }

  const authenticatedUser = isAuthenticated();
  const [userId, setUserId] = useState(authenticatedUser.id);
  useEffect(() => {
    if (userId) {
      Axios.get(`${url}/users/${userId}`).then((res) => {
        setUser(res.data);
        setStatus({
          ...status,
          loading: false,
        });
      });
    } else {
      setStatus({
        ...status,
        loading: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (status.loading) return <Loading />;

  return (
    <div className={classes.profileContent}>
      {user ? (
        <UserView data={user} message={status.messageError} />
      ) : (
        <SignForm
          onSubmit={onSubmit}
          handleChangeSignForm={handleChangeSignForm}
          signForm={signForm}
          status={status}
          handleConfirmEmail={handleConfirmEmail}
        />
      )}
    </div>
  );
}
