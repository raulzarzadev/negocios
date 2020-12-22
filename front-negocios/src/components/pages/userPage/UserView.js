import React, { useState } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import AdvertCard from "../../atomos/AdvertCard";
import Axios from "axios";
import { getToken } from "../../../utils/user";
import url from "../../../url/url";

const token = getToken();

/* 
import { Link } from 'react-router-dom'; */
const useStyles = makeStyles(() => ({
  userLine: {
    display: "flex",
    overflowX: "auto",
    padding: `0 12px`,
  },
}));
export default function UserView({ user }) {
  const classes = useStyles();

  const [adverts, setAdverts] = useState(user.adverts || []);

  async function handleDeleteAdvert(id) {
    let config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-token": token,
      },
    };
    await Axios(`${url}/adverts/${id}`, config);
    setAdverts(adverts.filter((advert) => advert._id !== id));
  }

  return (
    <Box my={3}>
      <Typography variant="h4">Usuario </Typography>
      <Typography variant="p"> {user.email}</Typography>
      <Typography>
        Credit:<strong> ${user.credit.toFixed(2)}</strong>
      </Typography>

      <Typography variant="h4">Anuncios Publicados</Typography>
      <Box>
        <div className={classes.userLine}>
          {adverts.map((advert) => (
            <Box m={1} item key={advert._id}>
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
