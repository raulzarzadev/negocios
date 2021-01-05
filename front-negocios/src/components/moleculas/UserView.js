import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import UserAdvertsDisplay from "../moleculas/UserAdvertsDisplay";
import MyButton from "../atomos/MyButton";
import MyLink from "../atomos/MyLink";

export default function UserView({ user }) {
  const [adverts] = useState(user.adverts || []);
  const [publishAdverts, setPublishedAdverts] = useState([]);
  console.log(user);

  useEffect(() => {
    setPublishedAdverts(
      adverts.filter((advert) => advert.isPublished === true)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box my={3}>
      <Typography variant="h4">Usuario </Typography>
      <Typography variant="p"> {user.email}</Typography>
      <Typography>
        Credit:<strong> ${user?.credit?.toFixed(2) || "0.00"}</strong>
      </Typography>

      <Box p={2} display="flex" justifyContent="center">
        <Box m={2}>
          <MyButton variant="outlined">
            <MyLink to="/nuevo-barrio">Nuevo Barrio</MyLink>
          </MyButton>
        </Box>
        <Box m={2}>
          <MyButton variant="contained" color="primary">
            <MyLink to="/nuevo-anuncio">Crear anuncio</MyLink>
          </MyButton>
        </Box>
      </Box>

      <UserAdvertsDisplay
        title="Anuncios Publicados"
        noAdvertsTitle="No hay anuncios publicados aún"
        adverts={publishAdverts}
        publishArea={true}
      />

      <UserAdvertsDisplay
        title="Anuncios Creados"
        noAdvertsTitle="No has creado anuncios aún"
        adverts={adverts}
      />
    </Box>
  );
}
