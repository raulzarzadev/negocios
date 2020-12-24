import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Box, Chip, FormControlLabel, Switch } from "@material-ui/core";
import MyTextInput from "../atomos/MyTextInput";
import { CHIP_LABELS } from "../../HardData/CHIPS_LABELS";
import MyButton from "../atomos/MyButton";
import AdvertCard from "../atomos/AdvertCard";
import MyLink from "../atomos/MyLink";
import ContactInputs from "./ContactInputs";

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
  form,
  handleDeleteChip,
  hanldeAddToLabelList,
  labelsSelected = [],
  labelDisabled,
  onSubmit,
  setImage,
  submiting,
  contacts,
  setContacts,
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

  const [chipData] = useState(CHIP_LABELS);

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
                    <em>Max 3 etiquetas</em>
                    <div
                      style={{
                        maxWidth: "300px",
                        border: "1px solid black",
                        borderRadius: "16px",
                        padding: "16px",
                        minHeight: "48px",
                        margin: "16px auto",
                      }}
                    >
                      {labelsSelected?.map((chip) => (
                        <Chip
                          style={{ margin: "4px" }}
                          icon={chip.icon}
                          color={chip.color || "primary"}
                          label={chip.label}
                          size="small"
                          onDelete={handleDeleteChip(chip)}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                    {chipData.map((chip) => {
                      return (
                        <Chip
                          disabled={labelDisabled}
                          style={{ margin: "4px" }}
                          icon={chip.icon}
                          color={chip.color || "primary"}
                          label={chip.label}
                          size="small"
                          onClick={() => hanldeAddToLabelList(chip)}
                          className={classes.chip}
                        />
                      );
                    })}
                  </>
                )}
                {activeStep === 1 && (
                  <Box display="flex" justifyContent="center" mt={4}>
                    <Box width="80%">
                      <MyTextInput
                        onChange={handleChange}
                        defaultValue={form.title}
                        name="title"
                        label="Titulo"
                      />
                      <MyTextInput
                        onChange={handleChange}
                        defaultValue={form.description}
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
                    <ContactInputs
                      contacts={contacts}
                      setContacts={setContacts}
                    />
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
                  defaultValue={form.backgroundColor}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Typography variant="h5">Sube una imagen:</Typography>
                <input type="file" name="image" onChange={setImage} />
              </Box>
            </Box>
            <Box maxWidth={220} margin="0 auto">
              <AdvertCard advert={form} />
            </Box>
            <Box paddingY={2}>
              <Box m={2}>
                <MyButton
                  //onClick={() => console.log("guardar", form, labelsSelected)}
                  type="submit"
                  color="primary"
                  variant="contained"
                  label="Guardar y Publicar"
                  loading={submiting}
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
