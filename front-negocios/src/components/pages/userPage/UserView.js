import React, { useState } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import AdvertCard from "../../atomos/AdvertCard";
import { deleteAdvert } from "../../../utils/adverts";

const useStyles = makeStyles(() => ({
  userLine: {
    display: "flex",
    overflowX: "auto",
    padding: `0 12px`,
    border: "1px solid",
    minHeight: "50px",
    boxShadow: `
    -moz-box-shadow:    inset 0 0 5px #000000;
    -webkit-box-shadow: inset 0 0 5px #000000;
    box-shadow:         inset 0 0 5px #000000;
 `,
  },
}));
export default function UserView({ user }) {
  const classes = useStyles();

  const [adverts, setAdverts] = useState(user.adverts || []);
  const [publishAdverts, setPublishAdverts] = useState([]);
  async function handleDeleteAdvert(id) {
    await deleteAdvert(id);
    setAdverts(adverts.filter((advert) => advert._id !== id));
  }

  return (
    <Box my={3}>
      <Typography variant="h4">Usuario </Typography>
      <Typography variant="p"> {user.email}</Typography>
      <Typography>
        Credit:<strong> ${user.credit.toFixed(2)}</strong>
      </Typography>

      <Typography variant="h6">Anuncios Publicados</Typography>
      <Box>
        <div className={classes.userLine}>
          {publishAdverts.map((advert) => (
            <Box m={1} item key={advert._id} minWidth="200px">
              <AdvertCard
                advert={advert}
                admin
                handleDelete={handleDeleteAdvert}
              />
            </Box>
          ))}
          <Box width="100%" m={2}>
            <Typography align="center">
              No hay anuncioas publicados aún
            </Typography>
          </Box>
        </div>
      </Box>

      <Typography variant="h6">Anuncios Creados</Typography>
      <Box>
        <div className={classes.userLine}>
          {adverts.reverse().map((advert) => (
            <Box m={1} item key={advert._id} minWidth="200px">
              <AdvertCard
                advert={advert}
                admin
                handleDelete={handleDeleteAdvert}
              />
            </Box>
          ))}
        </div>
      </Box>
    </Box>
  );
}
