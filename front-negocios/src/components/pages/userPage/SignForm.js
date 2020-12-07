import React from "react";
import { Box, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import { Link, useParams } from "react-router-dom";

export default function SignInForm({
  onSubmit,
  signForm,
  handleChangeSignForm,
  status,
  handleConfirmEmail
}) {
  const { register, handleSubmit, errors } = useForm();
  const { token } = useParams()
  //console.log(token)
  //console.log(errors);
  //console.log(status);

  if (token) {
    return <>
      <h3>Confirma tus datos</h3>
      {status?.messageError && (
        <Alert severity="warning"> {status?.messageError}</Alert>
      )}
      <form onSubmit={handleSubmit(handleConfirmEmail)} noValidate autoComplete="on">
        <div style={styles.input}>
          <TextField
            type="text"
            name="email"
            inputRef={register({
              required: {
                value: true,
                message: "El correo electronico es necesario",
              },
            })}
            label="Correo"
            variant="outlined"
            helperText={errors.email?.message}
          />
        </div>
        <div style={styles.input}>
          <TextField
            type="password"
            inputRef={register({
              required: { value: true, message: "Este campo es necesario" },
              maxLength: {
                value: 18,
                message: "Maximo 18 caracteres", // <p>error message</p>
              },
              minLength: {
                value: 6,
                message: "Al menos 6 caracteres",
              },
            })}
            helperText={errors.password?.message}
            name="password"
            label="Contraseña"
            variant="outlined"
          />
        </div>
        <div style={styles.input}>
          <Button variant="contained" color="primary" type="submit">
            Confirmar datos
        </Button>
        </div>
      </form>
    </>
  }
  return (
    <div >
      {signForm === "signin" ? <h3>Ingresar</h3> : <h3>Registrate</h3>}
      {status?.messageError && (
        <Alert severity="warning"> {status?.messageError}</Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on">
        <div style={styles.input}>
          <TextField
            type="text"
            name="email"
            inputRef={register({
              required: {
                value: true,
                message: "El correo electronico es necesario",
              },
            })}
            label="Correo"
            variant="outlined"
            helperText={errors.email?.message}
          />
        </div>
        <div style={styles.input}>
          <TextField
            type="password"
            inputRef={register({
              required: { value: true, message: "Este campo es necesario" },
              maxLength: {
                value: 18,
                message: "Maximo 18 caracteres", // <p>error message</p>
              },
              minLength: {
                value: 6,
                message: "Al menos 6 caracteres",
              },
            })}
            helperText={errors.password?.message}
            name="password"
            label="Contraseña"
            variant="outlined"
          />
        </div>
        <div style={styles.input}>
          <Button variant="contained" color="primary" type="submit">
            {signForm === "signin" ? "Ingresa" : "Registrate"}
          </Button>
        </div>
      </form>
      {/*  */}
      <Box m={2}>
        <Link to="/forgot-password">
          Recuperar cotraseña
        </Link>
      </Box>
    </div>
  );
}

const styles = {
  title: {
    margin: "20px 0",
  },
  input: {
    margin: "20px 0",
  },
  linkChangeForm: {
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer",
  },
};
