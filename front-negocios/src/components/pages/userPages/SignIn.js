import { Box, Typography } from "@material-ui/core";
import React from "react";
import Alert from "../../Alert";
import SignForm from "./SignForm";
import { useUser } from "../../../context/userContext";
import { Redirect } from "react-router-dom";

export default function SignIn() {
  const { login, response, loading, isLogged } = useUser();

  if (isLogged) return <Redirect to="/perfil" />;

  return (
    <>
      <Box>
        {response?.type === "notEmailConfirmed" && (
          <Alert
            severity="warning"
            message="Revisa tu e-mail para terminar tu subscripción o intentalo otra vez"
            link={{ to: "/registrate", label: "aquí" }}
          />
        )}
        {response?.type === "faildSignIn" && (
          <Alert
            severity="error"
            message="Las credenciales no son validas. Intenta nuevamente o recupera tu contraseña "
            link={{ to: "/forgot-password", label: "aquí" }}
          />
        )}
        {response?.type === "successSignIn" && (
          <Alert severity="success" message="!Bienvendio!" />
        )}
      </Box>
      <Box m={5}>
        <Typography variant="h4">Ingresa</Typography>
      </Box>
      <SignForm onSubmit={login} isLoading={loading} signin />
    </>
  );
}
