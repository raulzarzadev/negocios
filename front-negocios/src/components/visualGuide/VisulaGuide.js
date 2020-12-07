import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AdvertCart from "../atomos/AdvertCard";
import MyButton from "../atomos/MyButton";
import MyLink from "../atomos/MyLink";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  guideContainer: {
    border: "1px black solid",
  },
  guideItem: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
    border: "1px black solid",
  },
}));
export default function VisulaGuide() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} item className={classes.guideContainer}>
      <Grid item xs={12} className={classes.guideItem}>
        <Typography variant="h3">Guía Visual</Typography>
      </Grid>
      <Grid item xs={6} md={3} className={classes.guideItem}>
        <AdvertCart
          advert={{
            title: "Prueba de guia visual",
            description: "Description de test",
            delivery: true,
          }}
        />
      </Grid>
      <Grid item xs={6} md={3} className={classes.guideItem}>
        <MyLink>Router Link</MyLink>
      </Grid>
      <Grid item xs={6} md={3} className={classes.guideItem}>
        <Box>
          <Box m={2}>
            <MyButton label="Boton Principal" />
          </Box>
          <Box m={2}>
            <MyButton label="Contained" color="primary" variant="contained" />
          </Box>
          <Box m={2}>
            <MyButton label="Contained" color="secondary" variant="outlined" />
          </Box>
          <Box m={2}>
            <MyButton label="cargando False" loading={false} />
          </Box>
          <Box m={2}>
            <MyButton label="Cargando" loading={true} variant="outlined" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6} md={3} className={classes.guideItem}>
        item
      </Grid>
    </Grid>
  );
}
