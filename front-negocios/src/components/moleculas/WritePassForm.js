import React from "react";
import { Box, Button, CircularProgress, TextField } from "@material-ui/core";

export default function WritePassForm({ handleChange, handleSubmit, loading }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
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
