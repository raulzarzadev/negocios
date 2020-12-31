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
import { ESTADOS_LABEL_MX } from "../../../HardData/ESTADOS_MX";
import MySelectInput from "../../atomos/MySelectInput";

const useStyles = makeStyles((theme) => ({
  newBarrioCard: {
    border: "1px solid ",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(2),
  },
  gridStep: {
    minHeight: "10rem",
  },
}));

export default function NewBarrioForm({ onSubmit }) {
  const classes = useStyles();
  const [statesList] = React.useState(ESTADOS_LABEL_MX);
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

  const handleSelectState = (e) => {
    setForm({
      ...form,
      state: e.target.value,
      stateData: statesList.find((state) => state.value === e.target.value),
    });
  };
  console.log(form);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function getSteps() {
    return ["¿Dónde?", "Nombre Completo", "Nombre corto"];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        /* Entre mas info mejor para ti y tus clientes */
        return "Selecciona el lugar donde está este barrio";
      case 1:
        return "Escribe el nombre completo del barrio";
      case 2:
        return "Escribe un nombre corto. Este debe ser único";
      default:
        return "Unknown stepIndex";
    }
  }

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
            <Paper>
              <Box p={2}>
                <Typography className={classes.instructions}>
                  Verifica sí la información es correcta.
                </Typography>
                <Box className={classes.newBarrioCard}>
                  <Typography>
                    <em>Lugar:</em>
                  </Typography>
                  <Typography variant="h5">{form?.stateData?.label}</Typography>
                  <Typography>
                    <em>Nombre:</em>
                  </Typography>
                  <Typography variant="h6">{form?.name}</Typography>
                  <Typography>
                    <em>Nombre corto:</em>
                  </Typography>
                  <Typography variant="h6">{form?.shortName}</Typography>
                </Box>
                <Button onClick={handleReset}>Cancelar</Button>
                <Button type="submit" color="primary" variant="contained">
                  ¿la información es correcta?
                </Button>
              </Box>
            </Paper>
          ) : (
            <div>
              <Paper>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <Grid container className={classes.gridStep}>
                  {activeStep === 0 && (
                    <Box m={2} width="100%">
                      <MySelectInput
                        label="Estado"
                        name="stateLabel"
                        placeholder="Selecciona un Estado"
                        options={statesList}
                        value={form?.stateData?.value}
                        onChange={handleSelectState}
                      />
                    </Box>
                  )}
                  {activeStep === 1 && (
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
                  {activeStep === 2 && (
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
                </Grid>

                <Box m={2} p={2}>
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
                </Box>
              </Paper>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
