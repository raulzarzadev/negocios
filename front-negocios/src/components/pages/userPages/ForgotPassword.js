import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "../../Alert";
import { useUser } from "../../../context/userContext";

export default function ForgotPassword() {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState();

  const { forgotPassword } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(true);
    setLoading(true);
    setTimeout(() => {
      setAlert(false);
      setLoading(false);
    }, 8000);
    setTimeout(() => {
      setAlert(false);
      //window.location.href = "/";
    }, 8000);

    forgotPassword(form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.value?.length > 5) {
    } else {
    }
  };

  return (
    <>
      {alert && (
        <Alert
          severity="success"
          message="Revisa tu e-mail para recuperar tu contraseña"
        />
      )}
      <Box my={2}>
        <Typography variant="h4">Recupera tu contraseña</Typography>
      </Box>

      <form onSubmit={handleSubmit} noValidate autoComplete="on">
        <Box m={2}>
          <TextField
            autoFocus
            size="small"
            type="text"
            name="email"
            label="Correo"
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
        <Box m={5}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              //disabled={!isValid}
              variant="contained"
              color="primary"
              type="submit"
            >
              Enviar
            </Button>
          )}
        </Box>
      </form>
    </>
  );
}
