import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import MyButton from "../atomos/MyButton";
import MyLink from "../atomos/MyLink";
import UserAdvertsDisplay from "../moleculas/UserAdvertsDisplay";

export default function Dashboard() {
  const {
    data: { user },
  } = useUser();

  const [publishAdverts, setPublishedAdverts] = useState([]);
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
      getAllAdverts()
      return () => {
          cleanup
      }
  }, [input])

  console.log(adverts);

  useEffect(() => {
    setPublishedAdverts(
      adverts.filter((advert) => advert.isPublished === true)
    );
  }, []);

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
    </Box>
  );
}
