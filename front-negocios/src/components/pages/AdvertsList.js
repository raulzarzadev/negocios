import React from "react";
import { Grid } from "@material-ui/core";

import Navigation from "../Navigation";
import AdvertCard from "../atomos/AdvertCard";
import Button from "@material-ui/core/Button";
import useAxios from "../myHooks/useAxios";
import FatalError from "../pages/errors/500";
import url from "../../url/url";
import Loading from "../atomos/Loading";

export default function AdvertsList(props) {
  const { data, loading, error } = useAxios(
    `${url}/barrios/${props.match.params.shortName}`
  );
  console.log(data);

  if (loading) return <Loading />;
  if (error) return <FatalError />;
  return (
    <>
      <Navigation  />
      <h3>{data.barrio?.name}</h3>
      <p>{data.barrio?.state}</p>
      {data.adverts.length > 0 ? (
        <Grid
          container
          spacing={1}
        >
          {data.adverts.map((advert) => (
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
