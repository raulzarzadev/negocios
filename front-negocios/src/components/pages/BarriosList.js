import React, { useEffect, useState } from "react";
import StateList from "../pages/StateList";
import useAxios from "../myHooks/useAxios";
import FatalError from "../pages/errors/500";
import url from "../../url/url";
import { makeStyles, Typography } from "@material-ui/core";
import Loading from "../atomos/Loading";
import { getAllBarrios, getPublishedAdverts } from "../../utils/adverts";

const useStyles = makeStyles((theme) => ({
  barriosList: {
    marginTop: theme.spacing(4),
    minHeight: "25rem",
  },
}));

export default function BarriosList() {
  const [loading, setLoading] = useState(true);
  const [adverts, setAdverts] = useState([]);
  const [barrios, setBarrios] = useState([]);

  useEffect(() => {
    getAllBarrios().then((res) => {
      setBarrios(res.data.barrios);
    });
    getPublishedAdverts().then((res) => {
      setAdverts(res.data.adverts);
      setLoading(false);
    });
  }, []);
  
  /* const classes = useStyles();
  const { data, loading, error } = useAxios(url + "/barrios");
  console.log("get barrios");
  if (error) return <FatalError />;
  
  let statesList = [];
  let count = 0;
  
  data?.barrios?.map((barrio) => {
    if (!statesList.includes(barrio.state)) {
      statesList.push(barrio.state);
    }
    return statesList;
  });
  
  console.log(data); */
  if (loading) return <Loading />;

  return (
    <div>
      {/*  <Typography variant="h4" paragraph>
        Barrios en México
      </Typography>
      {statesList.map((nameState) => (
        <StateList
          key={nameState}
          nameState={nameState}
          barrios={data.barrios}
          count={count}
        />
      ))} */}
    </div>
  );
}
