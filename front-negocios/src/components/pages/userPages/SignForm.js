import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";

export default function SignForm({ submit, isLoading, signin }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(submit)} noValidate autoComplete="on">
      <Box m={2}>
        <TextField
          autoFocus
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
      </Box>
      {signin && (
        <Box m={2}>
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
        </Box>
      )}
      <Box m={2}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" type="submit">
            Enviar
          </Button>
        )}
      </Box>
    </form>
  );
}
