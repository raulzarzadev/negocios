import { Box, Typography } from "@material-ui/core";
import React from "react";
import Alert from "../../Alert";
import SignForm from "./SignForm";
import { useUser } from "../../../context/userContext";

export default function SignUp() {
  const { signup, response, loading } = useUser();

  return (
    <>
      <Box>
        {response?.type === "alreadyReg" && (
          <Alert
            severity="warning"
            message="Este mail ya esta registrado."
            link={{ to: "/ingresa", label: "Ingresa" }}
          />
        )}
        {response?.type === "emailSent" && (
          <Alert
            severity="success"
            message="Revisa tu correo para continuar el proceso"
          />
        )}
      </Box>
      <Box m={5}>
        <Typography variant="h4">Registrate</Typography>
      </Box>
      <SignForm submit={signup} isLoading={loading} />
    </>
  );
}
