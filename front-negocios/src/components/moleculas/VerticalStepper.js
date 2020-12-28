import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import MyTextInput from "../atomos/MyTextInput";
import MyButton from "../atomos/MyButton";
import AdvertCard from "../atomos/AdvertCard";
//import MyLink from "../atomos/MyLink";
import ContactInputs from "./ContactInputs";
import SelectLabels from "./SelectLabels";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    //padding: theme.spacing(3),
  },
  formSeccion: {
    display: "flex",
    justifyContent: "center",
  },
}));

function getSteps() {
  return ["Clasifica tu anuncio", "Detalles de tu anuncio", "Contactos"];
}

export default function VerticalStepper({
  PageTitle,
  handleChange,
  advert,
  setAdvert,
  onSubmit,
  setImage,
  loading,
}) {
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <Box m={3}>
        <Typography variant="h4">{PageTitle}</Typography>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography variant="h5">{label}</Typography>
              </StepLabel>
              <StepContent>
                {activeStep === 0 && (
                  <>
                    <SelectLabels advert={advert} setAdvert={setAdvert} />
                  </>
                )}
                {activeStep === 1 && (
                  <Box display="flex" justifyContent="center" mt={4}>
                    <Box width="80%">
                      <MyTextInput
                        onChange={handleChange}
                        defaultValue={advert?.title}
                        name="title"
                        label="Titulo"
                      />
                      <MyTextInput
                        onChange={handleChange}
                        defaultValue={advert?.description}
                        name="description"
                        label="Descripción"
                        multiline
                        rows={4}
                      />
                    </Box>
                  </Box>
                )}
                {activeStep === 2 && (
                  <>
                    <ContactInputs advert={advert} setAdvert={setAdvert} />
                  </>
                )}

                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Atras
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Box paddingY={2}>
              <Box>
                <Typography variant="h5">Selecciona un color:</Typography>
                <input
                  type="color"
                  name="backgroundColor"
                  defaultValue={advert?.backgroundColor}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Typography variant="h5">Sube una imagen:</Typography>
                <input type="file" name="image" onChange={setImage} />
              </Box>
            </Box>
            <Box maxWidth={220} margin="0 auto">
              <AdvertCard advert={advert} />
            </Box>
            <Box paddingY={2}>
              <Box m={2}>
                <MyButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  label="Guardar Anuncio"
                  loading={loading}
                />
              </Box>
              <Box m={2}>
                <MyButton
                  variant="outlined"
                  onClick={handleReset}
                  className={classes.button}
                >
                  Editar
                </MyButton>
              </Box>
            </Box>
          </Paper>
        )}
      </form>
    </div>
  );
}
