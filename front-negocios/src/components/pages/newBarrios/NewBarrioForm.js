import React from "react";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { ESTADOS_MX } from "../../../HardData/estadosMX";

const useStyles = makeStyles((theme) => ({
  newBarrioContent: {},
  input: {
    padding: theme.spacing(2),
  },
  gridStep: {
    minHeight: "10rem",
  },
}));

export default function NewBarrioForm({ onSubmit }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  //console.log(watch("name"));
  const [form, setForm] = React.useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);
  const classes = useStyles();
  return (
    <div className={classes.newBarrioContent}>
      <Box m={3}>
        <Typography variant="h4">Nuevo barrio</Typography>
      </Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          autoComplete="on"
        >
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                ¡Listo! Da click en crear para terminar terminar el proceso.
              </Typography>
              <Button onClick={handleReset}>Cancelar</Button>
              <Button type="submit" color="primary" variant="contained">
                Crear
              </Button>
            </div>
          ) : (
            <div>
              <Paper>
                <Grid container className={classes.gridStep}>
                  {activeStep === 0 && (
                    <Grid item xs={12} className={classes.input}>
                      <FormControl>
                        <TextField
                          value={form.name}
                          size="small"
                          name="name"
                          onChange={handleChange}
                          label="Nombre del barrio"
                          variant="outlined"
                          helperText="[Ej. Villas de La Hacienda, Atizapán]"
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {activeStep === 1 && (
                    <Grid item xs={12} className={classes.input}>
                      <FormControl>
                        <TextField
                          value={form.shortName}
                          size="small"
                          name="shortName"
                          label="Nombre corto"
                          variant="outlined"
                          onChange={handleChange}
                          helperText="[ Ej. lasvillas]"
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {activeStep === 2 && (
                    <Grid item xs={12} className={classes.input}>
                      <FormControl variant="outlined">
                        <Select name="state" native onChange={handleChange}>
                          <option aria-label="" value="">
                            Selecciona un estado
                          </option>
                          {ESTADOS_MX.map((estado) => (
                            <option key={estado} value={estado}>
                              {estado}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
              </Paper>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Atras
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Termina" : "Siguiente"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function getSteps() {
  return [
    "Comienza por el nombre del barrio / colonia / pueblo",
    "Un nombre corto para identificarlo mas rapido",
    "Selecciona la ubicación",
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      /* Entre mas info mejor para ti y tus clientes */
      return "Escribe los datos de arriba";
    case 1:
      return "Selecciona el estado donde quieres publicar este anuncio";
    case 2:
      return "Agrega una foto que refleje lo que vendes";

    default:
      return "Unknown stepIndex";
  }
}
