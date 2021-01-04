import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { useUser } from "../../../context/userContext";
import WritePassForm from "../../moleculas/WritePassForm";

export default function FinishSignup() {
  const { confirPassword, loading } = useUser();
  const { token } = useParams();
  const [state, setState] = useState();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    confirPassword(state, token)
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
