import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navigation from "../Navigation";
import AdvertCard from "../atomos/AdvertCard";
import Loading from "../atomos/Loading";
import { getAdvertsByBarrio } from "../../utils/adverts";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import NotFound from "./errors/NotFound";

export default function AdvertsList() {
  const { shortName } = useParams();

  const [loading, setLoading] = useState(true);
  const [adverts, setAdverts] = useState([]);
  const [barrio, setBarrio] = useState({});
  const [failBarrio, setFailBarrio] = useState(false);

  useEffect(() => {
    getAdvertsByBarrio(shortName)
      .then((res) => {
        if (res.data.ok) {
          setBarrio(res.data.barrio);
          setAdverts(res.data.adverts);
        } else {
          setFailBarrio(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [shortName]);

  console.log(adverts);

  if (failBarrio) return <NotFound errorMessage="Este lugar aun no existe" />;
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
