import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { getAllAdverts } from "../../utils/adverts";
import Loading from "../atomos/Loading";
import MyButton from "../atomos/MyButton";
import MyLink from "../atomos/MyLink";
import AdvertManage from "../moleculas/AdverManage";

export default function Dashboard() {
  const {
    data: { user },
  } = useUser();

  const [adverts, setAdverts] = useState([]);
  const [loading, setLoadign] = useState(true);

  useEffect(() => {
    getAllAdverts().then((res) => {
      setAdverts(res?.data?.adverts);
      setLoadign(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <Box my={3}>
      <Typography variant="h4">Usuario </Typography>
      <Typography variant="p"> {user?.email}</Typography>
      <Typography>
        Credit:<strong> ${user?.credit?.toFixed(2)}</strong>
      </Typography>

      <Box p={2} display="flex" justifyContent="center">
        <Box m={2}>
          <MyButton variant="outlined">Nuevo Barrio</MyButton>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6">Lista de anuncios creados</Typography>
        <Grid container>
          <Grid item xs={12} container>
            <Grid item xs={3}>
              <Typography variant="h6" noWrap>
                Titulo
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" noWrap>
                Descripción
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="p" noWrap style={{ fontSize: "14px" }}>
                ¿Publicado?
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6" noWrap>
                Acciones
              </Typography>
            </Grid>
          </Grid>
          {adverts?.map((advert) => (
            <AdvertManage advert={advert} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
