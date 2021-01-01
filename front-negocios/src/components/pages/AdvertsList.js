import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navigation from "../Navigation";
import AdvertCard from "../atomos/AdvertCard";
import Loading from "../atomos/Loading";
import { getAdvertsByBarrio } from "../../utils/adverts";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

export default function AdvertsList() {
  const { shortName } = useParams();

  const [loading, setLoading] = useState(true);
  const [adverts, setAdverts] = useState([]);
  const [barrio, setBarrio] = useState({});

  useEffect(() => {
    getAdvertsByBarrio(shortName)
      .then((res) => {
        setBarrio(res.data.barrio);
        setAdverts(res.data.adverts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  console.log(adverts)

  if (loading) return <Loading />;

  return (
    <>
      <Navigation />
      <h3>{barrio.name}</h3>
      <p>{barrio.state}</p>
      {adverts.length > 0 ? (
        <Grid container spacing={1}>
          {adverts.map((advert) => (
            <Grid item xs={6} sm={4} md={3} key={advert._id}>
              <AdvertCard advert={advert} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <h4>Aun no hay anuncios publicados aquí</h4>
          <hr />
          <Button variant="contained" color="primary" href="/nuevo-anuncio">
            Crea anuncio
          </Button>
        </>
      )}
    </>
  );
}
