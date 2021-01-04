import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import WritePassForm from "../../moleculas/WritePassForm";
import { useUser } from "../../../context/userContext";
import { useParams } from "react-router-dom";

export default function RecoverPassword() {
  const { recoverPassword, loading } = useUser();
  const { token } = useParams();
  const [state, setState] = useState({
    token,
    rol: "user",
    password: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    recoverPassword(state, token)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box m={5}>
        <Typography variant="h4">Ingresa contraseña</Typography>
      </Box>
      <WritePassForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        state={state}
        loading={loading}
      />
    </>
  );
}
