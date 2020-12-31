import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import AdvertCard from "../atomos/AdvertCard";

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

export default function UserAdvertsDisplay({
  adverts,
  title,
  noAdvertsTitle,
  publishArea,
}) {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <div className={classes.userLine}>
        {!!adverts.length ? (
          <>
            {adverts.map((advert) => (
              <Box m={1} item key={advert._id} width={200}>
                <AdvertCard publishArea={publishArea} advert={advert} admin />
              </Box>
            ))}
          </>
        ) : (
          <Box width="100%" m={2}>
            <Typography align="center">{noAdvertsTitle}</Typography>
          </Box>
        )}
      </div>
    </Box>
  );
}
