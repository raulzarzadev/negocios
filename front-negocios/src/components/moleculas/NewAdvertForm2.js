import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  FormControlLabel,
  makeStyles,
  Paper,
  Switch,
  Typography,
} from "@material-ui/core";
import MyTextInput from "../atomos/MyTextInput";

import MyButton from "../atomos/MyButton";
import VerticalStepper from "./VerticalStepper";
import { CHIP_LABELS } from "../../HardData/CHIPS_LABELS";

const useStyles = makeStyles((theme) => ({
  newAdevertForm: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  formSeccion: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function NewAdvertForm({
  data,
  handleChange,
  onSubmit,
  form,
  labelDisabled,
  labelsSelected = [],
  handleDelete,
  hanldeAddToLabelList,
}) {
  const classes = useStyles();
  const [barriosList, setBarriosList] = useState([]);

  const stateList = data?.barrios?.map((barrio) => barrio.state);
  const stateListCleaned = [...new Set(stateList)];

  useEffect(() => {
    const arr = [];
    if (form?.state) {
      data.barrios.map((barrio) => {
        if (barrio.state === form?.state) {
          arr.push(barrio.name);
        }
        return 0;
      });
    }
    setBarriosList(arr);
  }, [data, form?.state]);

  const [haveLocation] = useState(false);

  const [chipData] = useState(CHIP_LABELS);

  return (
    <Paper className={classes.newAdevertForm}>
      <VerticalStepper />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Typography variant="h4">Nuevo anuncio</Typography>
        <Box className={classes.formSeccion}>
          <Box width="200px">
            <Typography variant="h5">Ubicación</Typography>
            <em>Donde te pueden encontrar</em>

            <MyTextInput
              onChange={handleChange}
              name="state"
              label="Estado"
              select
              options={stateListCleaned}
              placeholder="Seleccionar"
            />
            {form?.state && (
              <MyTextInput
                name="barrio"
                onChange={handleChange}
                label="Barrios"
                select
                options={barriosList}
                placeholder="Seleccionar"
              />
            )}
          </Box>
        </Box>

        <Box width="100%">
          <Typography variant="h5">Detalles de servicio</Typography>
          <em>Qué servicos te destacan</em>

          {form?.barrio && (
            <Box>
              <FormControlLabel
                name="delivery"
                onChange={handleChange}
                control={<Switch color="primary" />}
                label="¿A domicilio?"
                labelPlacement="top"
              />
              <FormControlLabel
                name="location"
                onChange={handleChange}
                //value="location"
                control={<Switch color="primary" />}
                label="¿Ubicación fija?"
                labelPlacement="top"
              />
              {haveLocation && (
                <MyTextInput
                  name="address"
                  label="Dirección / Referencias"
                  multiline
                  rows={2}
                  onChange={handleChange}
                />
              )}
              {/*  <FormControlLabel
                name="schedule"
                onChange={handleChange}
                control={<Switch color="primary" />}
                label="¿Horario?"
                labelPlacement="top"
              /> */}
              <FormControlLabel
                name="middlePoint"
                onChange={handleChange}
                control={<Switch color="primary" />}
                label="¿Punto Medio?"
                labelPlacement="top"
              />
            </Box>
          )}
        </Box>
        <Box width="100%">
          <Typography variant="h5">Giro y etiquetas </Typography>
          <em>Palabras que clasifiquen tu anuncio (3) </em>

          {form?.barrio && (
            <>
              <div
                style={{
                  width: "50%",
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
                    onDelete={handleDelete(chip)}
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
        </Box>
        {labelsSelected?.length > 2 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Box width="80%">
              <Typography variant="h5">Detalles del Anuncio</Typography>
              <MyTextInput
                onChange={handleChange}
                name="title"
                label="Titulo"
              />
              <MyTextInput
                onChange={handleChange}
                name="description"
                label="Descripción"
                multiline
                rows={4}
              />
            </Box>
          </Box>
        )}

        <Box>
          <Typography variant="h5">Imagenes y extras</Typography>
          <em>Pronto podras subir imagenes, menus y más </em>
        </Box>
        <Box>
          <Box m={2}>
            <MyButton
              //onClick={() => console.log("guardar", form, labelsSelected)}
              type="submit"
              color="primary"
              variant="contained"
              label="Guardar y Publicar"
            />
          </Box>
          <Box m={2}>
            <MyButton color="primary" variant="outlined" label="Solo guardar" />
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
