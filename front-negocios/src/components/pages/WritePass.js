import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { decode } from "jsonwebtoken";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/userContext";

export default function WritePass() {
  const { confirPassword, login } = useUser();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    token,
    rol: "user",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("submiting", state);

    confirPassword(state, token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.token) {
          const { email } = decode(token);
          login({ password: state?.password, email });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box m={4}>
        <Typography variant="h4">Termina tu Registro</Typography>
      </Box>
      <Box m={2}>
        <TextField
          onChange={handleChange}
          type="password"
          name="password"
          label="Contraseña"
          variant="outlined"
        />
      </Box>
      <Box m={2}>
        <TextField
          type="password"
          /*  inputRef={register({
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
          helperText={errors.password?.message} */
          name="passwordConfirm"
          label="Confirma tu contraseña"
          variant="outlined"
        />
      </Box>
      <Box m={2}>
        {loading ? (
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
