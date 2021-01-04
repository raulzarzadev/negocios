import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  listItem: {
    textDecoration: "none",
    padding: 0,
  },
}));

export default function StateList({ barrios }) {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">Barrios</Typography>
      {barrios.map((state) => (
        <Box m={4}>
          <Box m={2}>
            <Typography variant="h6">
              {state.label} ({state?.barrios?.length})
            </Typography>
          </Box>
          {state?.barrios?.map((barrio) => (
            <ul className={classes.list}>
              <li key={barrio._id} className={classes.listItem}>
                <Link to={`/${barrio.shortName}`}> {barrio.name} </Link>
              </li>
            </ul>
          ))}
        </Box>
      ))}
    </div>
  );
}
